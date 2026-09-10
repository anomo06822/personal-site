import { siteUrl } from './website.mjs';

export class ProviderFailure extends Error {
  constructor(message, uncertain = false) { super(message); this.uncertain = uncertain; }
}
export async function socialAccount(provider, env = process.env, fetcher = fetch) {
  const token = env[provider === 'x' ? 'X_ACCESS_TOKEN' : 'LINKEDIN_ACCESS_TOKEN'];
  const actor = env[provider === 'x' ? 'X_USER_ID' : 'LINKEDIN_PUBLISHING_ACTOR'];
  if (!token || !actor) throw new Error(`${provider} requires its access token and publishing account in the process environment (inject through BWS)`);
  if (provider === 'x' && !/^\d+$/.test(actor)) throw new Error('X_USER_ID must be numeric');
  if (provider === 'linkedin' && !/^urn:li:(person|organization):[\w-]+$/.test(actor)) throw new Error('Invalid LinkedIn publishing actor');
  const version = env.LINKEDIN_API_VERSION || '202603';
  if (!/^\d{6}$/.test(version)) throw new Error('Invalid LinkedIn API version');
  if (provider === 'x') {
    const response = await fetcher('https://api.x.com/2/users/me', { redirect: 'error', signal: AbortSignal.timeout(15000), headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error(`X account verification failed: HTTP ${response.status}`);
    if ((await response.json()).data?.id !== actor) throw new Error('X token belongs to a different account than X_USER_ID');
  }
  return { actor, token, version };
}

export async function postSocial(provider, text, parentId, account, fetcher = fetch) {
  const linkedin = provider === 'linkedin';
  const body = linkedin ? { author: account.actor, commentary: text, visibility: 'PUBLIC', distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] }, lifecycleState: 'PUBLISHED', isReshareDisabledByAuthor: false }
    : { text, ...(parentId ? { reply: { in_reply_to_tweet_id: parentId } } : {}) };
  let response;
  try {
    response = await fetcher(linkedin ? 'https://api.linkedin.com/rest/posts' : 'https://api.x.com/2/tweets', {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { Authorization: `Bearer ${account.token}`, 'Content-Type': 'application/json', ...(linkedin ? { 'LinkedIn-Version': account.version, 'X-Restli-Protocol-Version': '2.0.0' } : {}) },
      body: JSON.stringify(body),
    });
  } catch { throw new ProviderFailure('Provider outcome unknown after network failure; reconcile before retrying', true); }
  if (!response.ok) throw new ProviderFailure(`Provider returned HTTP ${response.status}`, response.status >= 500 || response.status === 408 || response.status < 400);
  let id;
  try { id = linkedin ? response.headers.get('x-restli-id') || (await response.json()).id : (await response.json()).data?.id; }
  catch { throw new ProviderFailure('Provider accepted request but returned no usable post ID', true); }
  if (!validPostId(provider, id)) throw new ProviderFailure('Provider accepted request but returned no usable post ID', true);
  return { id, url: postUrl(provider, id), publishedAt: new Date().toISOString() };
}
export const validPostId = (provider, id) => typeof id === 'string' && (provider === 'x' ? /^\d+$/.test(id) : /^urn:li:(share|ugcPost):\d+$/.test(id));
export const postUrl = (provider, id) => provider === 'x' ? `https://x.com/i/web/status/${id}` : `https://www.linkedin.com/feed/update/${id}/`;

export function selectChannels(release, selected) {
  const providers = new Set();
  const ids = new Set();
  return selected.map(id => {
    const channel = release.channels.find(c => c.id === id);
    if (!channel || ids.has(id)) throw new Error(`Invalid/duplicate channel selection: ${id}`);
    if (providers.has(channel.provider)) throw new Error('Select one variant per provider');
    providers.add(channel.provider); ids.add(id); return channel;
  });
}

export async function distribute(store, snapshot, receipt, channels, { env = process.env, send = postSocial, accountResolver = socialAccount } = {}) {
  const id = snapshot.release.releaseId;
  for (const channel of channels) {
    let state = receipt.channels[channel.id];
    // Once a variant has any attempted post, a second variant risks duplicating it.
    if (Object.entries(receipt.channels).some(([key, value]) => key !== channel.id && value.provider === channel.provider && value.posts?.length)) throw new Error('Another variant for this provider was already attempted');
    if (state?.posts.length === channel.posts.length && state.posts.every(p => p.status === 'published')) continue;
    const account = await accountResolver(channel.provider, env);
    if (state && state.actor !== account.actor) throw new Error('Publishing account changed; retries must use the original account');
    state ??= receipt.channels[channel.id] = { provider: channel.provider, actor: account.actor, posts: [] };
    for (let index = 0; index < channel.posts.length; index++) {
      const previous = state.posts[index];
      if (previous?.status === 'published') continue;
      if (previous && ['sending', 'uncertain'].includes(previous.status)) {
        previous.status = 'uncertain'; await store.saveReceipt(id, receipt); break;
      }
      state.posts[index] = { status: 'sending', attempt: (previous?.attempt || 0) + 1, startedAt: new Date().toISOString() };
      await store.saveReceipt(id, receipt);
      try {
        const result = await send(channel.provider, channel.posts[index], index ? state.posts[index - 1].id : null, account);
        if (!validPostId(channel.provider, result.id)) throw new ProviderFailure('Unusable provider ID', true);
        Object.assign(state.posts[index], result, { status: 'published' });
      } catch (error) {
        // Unclassified exceptions may follow a successful external write.
        state.posts[index].status = error instanceof ProviderFailure && !error.uncertain ? 'failed' : 'uncertain';
        state.posts[index].error = error instanceof ProviderFailure ? error.message : 'Provider outcome unknown; reconcile before retrying';
        await store.saveReceipt(id, receipt); break;
      }
      await store.saveReceipt(id, receipt);
    }
  }
  receipt.status = channels.every(channel => receipt.channels[channel.id]?.posts.length === channel.posts.length && receipt.channels[channel.id].posts.every(post => post.status === 'published')) ? 'published' : 'partial';
  receipt.externalUrl = siteUrl(snapshot.release, snapshot.release.locale, receipt.target.baseUrl);
  await store.saveReceipt(id, receipt);
  return receipt;
}

export function reconcile(snapshot, receipt, channelId, index, { postId, notPublished, evidence }) {
  if (!evidence || evidence.trim().length < 10) throw new Error('Record concrete provider verification evidence before resolving an uncertain post');
  const channel = snapshot.release.channels.find(c => c.id === channelId);
  const post = receipt.channels[channelId]?.posts[index];
  if (!channel || !Number.isInteger(index) || !post || !['sending', 'uncertain'].includes(post.status)) throw new Error('Only an uncertain post can be resolved');
  if (Boolean(postId) === Boolean(notPublished)) throw new Error('Choose a verified post ID or confirmed not-published');
  if (postId && !validPostId(channel.provider, postId)) throw new Error('Invalid provider post ID');
  receipt.resolutions.push({ channelId, index, evidence, postId: postId || null, notPublished: Boolean(notPublished), resolvedAt: new Date().toISOString() });
  Object.assign(post, postId ? { status: 'published', id: postId, url: postUrl(channel.provider, postId) } : { status: 'failed', error: 'Confirmed not published; retry permitted' });
}
