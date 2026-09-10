import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { Store, readJson } from './store.mjs';
import { prepare, renderFiles, validateRelease } from './release.mjs';
import { command, configuration, stageWebsite, publishWebsite, isPublishedHtml } from './website.mjs';
import { distribute, ProviderFailure, postSocial, reconcile, selectChannels, socialAccount } from './social.mjs';
import { refreshPerformance, showPerformance } from './performance.mjs';
import { main } from '../publish.mjs';

const input = () => ({ schemaVersion: 'personal-site-release-v2', releaseId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', articleId: 'test-article', slug: 'test-article', locale: 'zh-TW', publishedAt: '2026-09-11', title: '測試「文章」', description: '測試摘要', contentType: 'pillar', tags: ['engineering'], bodyMarkdown: '# 測試\n\n公開正文。', sourceUrl: 'https://app.heptabase.com/workspace/card/card-id', sourceUpdatedAtUtc: null, evidenceMarkdown: 'PRIVATE EVIDENCE SENTINEL', channels: [{ id: 'x-main', provider: 'x', posts: ['First post', 'Second post', 'Third post'] }, { id: 'linkedin-main', provider: 'linkedin', posts: ['Final LinkedIn post'] }], localizations: [{ locale: 'en', title: 'An "article": example', description: 'Description', bodyMarkdown: '# Article\n\nPublic body.' }] });

async function fixture(t, withGit = false) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'publishing-test-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const repo = path.join(root, 'site'); await fs.mkdir(repo);
  const store = new Store(path.join(root, 'private'));
  const result = await prepare(store, input()); const snapshot = await store.load(result.releaseId);
  if (withGit) {
    await command(root, 'git', ['init', '--bare', 'origin.git']);
    await command(repo, 'git', ['init', '-b', 'main']);
    await command(repo, 'git', ['config', 'user.email', 'test@example.invalid']);
    await command(repo, 'git', ['config', 'user.name', 'Publication test']);
    await command(repo, 'git', ['config', 'commit.gpgsign', 'false']);
    await fs.writeFile(path.join(repo, 'README.md'), 'Initial\n');
    await command(repo, 'git', ['add', '.']); await command(repo, 'git', ['commit', '-m', 'Initial']);
    await command(repo, 'git', ['remote', 'add', 'origin', path.join(root, 'origin.git')]);
    await command(repo, 'git', ['push', 'origin', 'main']);
  }
  return { root, repo, store, snapshot };
}
const configFor = repo => configuration(repo, { PUBLISHING_SITE_URL: 'https://example.invalid/site' });
const accountResolver = provider => ({ actor: provider === 'x' ? '1' : 'urn:li:person:abc', token: 'fake' });

test('prepare is immutable and deduplicated; exports are private and hash-checked', async t => {
  const { store, snapshot, repo } = await fixture(t);
  assert.equal((await prepare(store, input())).reused, true);
  assert.equal((await store.list()).length, 1);
  assert.deepEqual(await fs.readdir(repo), []);
  const changed = input(); changed.title = 'Changed';
  await assert.rejects(prepare(store, changed), /hash/);
  assert.equal((await fs.stat(store.file(snapshot.release.releaseId, 'snapshot'))).mode & 0o777, 0o600);
  const data = await readJson(store.file(snapshot.release.releaseId, 'snapshot')); data.release.title = 'Tampered';
  await fs.writeFile(store.file(snapshot.release.releaseId, 'snapshot'), JSON.stringify(data));
  await assert.rejects(store.load(snapshot.release.releaseId), /integrity/);
});

test('public artifacts omit source/evidence and safely encode frontmatter', async t => {
  const { snapshot } = await fixture(t);
  const files = renderFiles(snapshot);
  assert.equal(Object.keys(files).length, 4);
  for (const file of Object.values(files)) {
    assert.doesNotMatch(file.toString(), /PRIVATE EVIDENCE SENTINEL|app.heptabase.com/);
  }
  assert.match(files['content/posts/en/test-article.mdx'].toString(), /releaseHash:/);
});

test('invalid locale, private source leakage, unsafe paths and legacy input are rejected', () => {
  for (const mutation of [r => r.localizations = [], r => r.slug = '../escape', r => r.sourceUrl = 'https://example.com/card', r => r.bodyMarkdown += '\nhttps://app.heptabase.com/private', r => r.schemaVersion = 'publishing-release-v1', r => r.channels[0].posts = ['字'.repeat(141)]]) {
    const release = input(); mutation(release); assert.throws(() => validateRelease(release));
  }
});

test('store lock prevents two concurrent writers without breaking a live lock', async t => {
  const { store } = await fixture(t);
  await store.locked(async () => { await assert.rejects(store.locked(() => {}), /locked/); });
  await store.locked(async () => assert.ok(true));
});

test('stage writes reviewable files without commit or push; refuses changed files', async t => {
  const { repo, store, snapshot } = await fixture(t, true); const config = await configFor(repo);
  const before = await command(repo, 'git', ['rev-parse', 'HEAD']); const receipt = await store.receipt(snapshot.release.releaseId);
  await stageWebsite(store, snapshot, receipt, config);
  assert.equal(await command(repo, 'git', ['rev-parse', 'HEAD']), before);
  assert.equal(await command(repo, 'git', ['diff', '--cached', '--name-only']), '');
  await fs.appendFile(path.join(repo, 'content/posts/en/test-article.mdx'), 'Unreviewed change');
  await assert.rejects(stageWebsite(store, snapshot, receipt, config), /differs/);
});

test('stage rejects unrelated tracked edits and existing articles under another slug', async t => {
  const { repo, store, snapshot } = await fixture(t, true); const config = await configFor(repo);
  await fs.appendFile(path.join(repo, 'README.md'), 'Unrelated');
  await assert.rejects(stageWebsite(store, snapshot, await store.receipt(snapshot.release.releaseId), config), /unrelated/);
  await command(repo, 'git', ['restore', 'README.md']);
  await fs.mkdir(path.join(repo, 'content/posts/en'), { recursive: true });
  await fs.writeFile(path.join(repo, 'content/posts/en/other.mdx'), '---\narticleId: test-article\n---\nOld');
  await command(repo, 'git', ['add', '.']); await command(repo, 'git', ['commit', '-m', 'Other article']);
  await assert.rejects(stageWebsite(store, snapshot, await store.receipt(snapshot.release.releaseId), config), /already exists/);
});

test('stage refuses symlinked publication directories', async t => {
  const { repo, root, store, snapshot } = await fixture(t, true); const config = await configFor(repo);
  await fs.mkdir(path.join(root, 'elsewhere')); await fs.symlink(path.join(root, 'elsewhere'), path.join(repo, 'public'));
  // Commit the symlink to exercise path validation instead of the dirty-check gate.
  await command(repo, 'git', ['add', '.']); await command(repo, 'git', ['commit', '-m', 'Symlink']);
  await assert.rejects(stageWebsite(store, snapshot, await store.receipt(snapshot.release.releaseId), config), /symlink/);
});

test('interrupted commit is recovered; delayed deployment retries do not rebuild or republish', async t => {
  const { repo, store, snapshot } = await fixture(t, true); const config = await configFor(repo);
  let builds = 0, interrupted = false, pushes = 0, live = false;
  const run = async (cwd, program, args) => {
    if (program === 'pnpm') { builds++; return ''; }
    if (args[0] === 'push') pushes++;
    const value = await command(cwd, program, args);
    if (args[0] === 'commit' && !interrupted) { interrupted = true; throw new Error('simulated crash after commit'); }
    return value;
  };
  const probe = async () => ({ live, pages: [] });
  await assert.rejects(publishWebsite(store, snapshot, await store.receipt(snapshot.release.releaseId), config, { run, probe }), /simulated/);
  let receipt = await store.receipt(snapshot.release.releaseId);
  assert.equal(receipt.website.status, 'committing');
  assert.equal(await publishWebsite(store, snapshot, receipt, config, { run, probe }), false);
  assert.equal(receipt.website.status, 'awaiting-deployment');
  live = true;
  receipt = await store.receipt(snapshot.release.releaseId);
  assert.equal(await publishWebsite(store, snapshot, receipt, config, { run, probe }), true);
  assert.equal(builds, 1); assert.equal(pushes, 1);
  assert.equal(await command(repo, 'git', ['rev-list', '--count', 'HEAD']), '2');
});

test('local unpublished commits cannot be included in a release push', async t => {
  const { repo, store, snapshot } = await fixture(t, true); const config = await configFor(repo);
  await fs.appendFile(path.join(repo, 'README.md'), 'Unpublished');
  await command(repo, 'git', ['add', '.']); await command(repo, 'git', ['commit', '-m', 'Unrelated local commit']);
  await assert.rejects(publishWebsite(store, snapshot, await store.receipt(snapshot.release.releaseId), config), /Local and remote/);
});

test('publication verifies both actual article markup and exact deployed release', async t => {
  const { snapshot } = await fixture(t);
  const valid = `<meta content="${snapshot.snapshotHash}" name="ps:release-hash"><meta name="ps:locale" content="en"><article>Content</article>`;
  assert.equal(isPublishedHtml(valid, snapshot, 'en'), true);
  assert.equal(isPublishedHtml(valid.replace('<article>', '<div>'), snapshot, 'en'), false);
  assert.equal(isPublishedHtml(valid.replace(snapshot.snapshotHash, 'wrong'), snapshot, 'en'), false);
  assert.equal(isPublishedHtml(valid + '__next_error__', snapshot, 'en'), false);
  assert.equal(isPublishedHtml(valid, snapshot, 'zh-TW'), false);
});

test('partial X thread retry resumes after the last confirmed post and skips successful LinkedIn', async t => {
  const { store, snapshot } = await fixture(t); const receipt = await store.receipt(snapshot.release.releaseId); receipt.target = { baseUrl: 'https://example.invalid/site' };
  const calls = []; let fail = true;
  const send = async (provider, text, parent) => {
    calls.push([provider, text, parent]);
    if (text === 'Second post' && fail) throw new ProviderFailure('HTTP 429');
    return { id: provider === 'linkedin' ? 'urn:li:share:1' : String(['First post', 'Second post', 'Third post'].indexOf(text) + 1) };
  };
  await distribute(store, snapshot, receipt, snapshot.release.channels, { accountResolver, send });
  assert.equal(receipt.status, 'partial'); fail = false;
  await distribute(store, snapshot, receipt, snapshot.release.channels, { accountResolver, send });
  assert.equal(receipt.status, 'published');
  assert.equal(calls.filter(c => c[1] === 'First post').length, 1);
  assert.equal(calls.filter(c => c[0] === 'linkedin').length, 1);
  assert.deepEqual(calls.at(-2), ['x', 'Second post', '1']);
  assert.deepEqual(calls.at(-1), ['x', 'Third post', '2']);
});

test('uncertain network result is not retried until reconciled using evidence', async t => {
  const { store, snapshot } = await fixture(t); const receipt = await store.receipt(snapshot.release.releaseId); receipt.target = { baseUrl: 'https://example.invalid' };
  let calls = 0; const channels = [snapshot.release.channels[0]];
  const send = async () => { calls++; throw new Error('connection lost'); };
  await distribute(store, snapshot, receipt, channels, { accountResolver, send });
  await distribute(store, snapshot, receipt, channels, { accountResolver, send });
  assert.equal(calls, 1);
  assert.throws(() => reconcile(snapshot, receipt, 'x-main', 0, { notPublished: true }), /evidence/);
  reconcile(snapshot, receipt, 'x-main', 0, { postId: '10', evidence: 'Confirmed the matching post in provider account history.' });
  const parents = [];
  await distribute(store, snapshot, receipt, channels, { accountResolver, send: async (_, text, parent) => { parents.push(parent); return { id: text === 'Second post' ? '11' : '12' }; } });
  assert.deepEqual(parents, ['10', '11']);
});

test('provider adapters distinguish rejected and uncertain requests and preserve reply IDs', async () => {
  const account = { actor: '1', token: 'secret-must-not-leak' };
  await assert.rejects(postSocial('x', 'test', null, account, async () => new Response('', { status: 500 })), e => e.uncertain && !e.message.includes(account.token));
  await assert.rejects(postSocial('x', 'test', null, account, async () => new Response('', { status: 429 })), e => !e.uncertain);
  let payload;
  const result = await postSocial('x', 'second', '123', account, async (_, init) => { payload = JSON.parse(init.body); return Response.json({ data: { id: '456' } }); });
  assert.equal(payload.reply.in_reply_to_tweet_id, '123'); assert.equal(result.id, '456');
  await assert.rejects(postSocial('x', 'test', null, account, async () => Response.json({ data: {} })), e => e.uncertain);
});

test('channel selection rejects duplicates and multiple variants for one provider', () => {
  const r = input(); r.channels.push({ ...r.channels[0], id: 'x-alt' });
  assert.throws(() => selectChannels(r, ['x-main', 'x-main']));
  assert.throws(() => selectChannels(r, ['x-main', 'x-alt']));
});

test('X validates the token account before posting and a changed actor cannot resume a thread', async t => {
  const env = { X_ACCESS_TOKEN: 'test-token', X_USER_ID: '1' };
  await assert.rejects(socialAccount('x', env, async () => Response.json({ data: { id: '2' } })), /different account/);
  const { store, snapshot } = await fixture(t); const receipt = await store.receipt(snapshot.release.releaseId);
  receipt.target = { baseUrl: 'https://example.invalid' };
  receipt.channels['x-main'] = { provider: 'x', actor: '2', posts: [{ status: 'published', id: '42' }] };
  let sent = false;
  await assert.rejects(distribute(store, snapshot, receipt, [snapshot.release.channels[0]], { accountResolver, send: async () => { sent = true; } }), /account changed/);
  assert.equal(sent, false);
});

test('GA4 paginates and replaces the window snapshot; errors retain the previous complete report', async t => {
  const { store } = await fixture(t); const offsets = [];
  const env = { GA4_PROPERTY_ID: '123', GOOGLE_ANALYTICS_ACCESS_TOKEN: 'test-secret' };
  const row = pathValue => ({ dimensionValues: ['20260911', pathValue, 'x', 'social', 'test'].map(value => ({ value })), metricValues: ['2', '4', '1', '12.5'].map(value => ({ value })) });
  const fetcher = async (_, init) => {
    const body = JSON.parse(init.body); offsets.push(body.offset);
    return Response.json({ rowCount: 2, rows: [row(body.offset === '0' ? '/en/blog/one/' : '/en/blog/two/')] });
  };
  await refreshPerformance(store, 30, { env, fetcher, now: new Date('2026-09-11T12:00:00Z') });
  const first = await showPerformance(store, env); assert.equal(first.rows.length, 2); assert.deepEqual(offsets, ['0', '1']);
  assert.equal(first.startDate, '2026-08-13');
  await refreshPerformance(store, 30, { env, fetcher, now: new Date('2026-09-11T12:00:00Z') });
  assert.equal((await showPerformance(store, env)).rows.length, 2);
  await assert.rejects(refreshPerformance(store, 30, { env, fetcher: async () => new Response('', { status: 503 }) }), /503/);
  assert.deepEqual(await showPerformance(store, env), first);
});

test('CLI rejects private state/export in public repo and requires snapshot before mutation', async t => {
  const { repo, store, snapshot } = await fixture(t);
  await assert.rejects(main(['doctor', '--store', path.join(repo, 'private')], repo), /outside/);
  await assert.rejects(main(['release', 'stage', snapshot.release.releaseId, '--store', store.root], repo), /snapshot/);
  await assert.rejects(main(['release', 'export', snapshot.release.releaseId, '--store', store.root, '--output', path.join(repo, 'private.json')], repo), /public repository/);
  await assert.rejects(main(['release', 'publish', snapshot.release.releaseId, '--store', store.root, '--snapshot', 'wrong'], repo), /hash/);
});

test('GA4 refreshes its token in memory and rejects duplicate paginated rows', async t => {
  const { store } = await fixture(t);
  const env = { GA4_PROPERTY_ID: '123', GOOGLE_ANALYTICS_CLIENT_ID: 'client', GOOGLE_ANALYTICS_CLIENT_SECRET: 'secret', GOOGLE_ANALYTICS_REFRESH_TOKEN: 'refresh' };
  let tokens = 0;
  const fetcher = async (url, init) => {
    if (url.includes('oauth2')) { tokens++; assert.equal(init.body.get('grant_type'), 'refresh_token'); return Response.json({ access_token: 'transient' }); }
    assert.equal(init.headers.Authorization, 'Bearer transient');
    return Response.json({ rowCount: 2, rows: [{ dimensionValues: ['20260911', '/en/blog/test/', 'x', 'social', 'test'].map(value => ({ value })), metricValues: ['1', '1', '1', '1'].map(value => ({ value })) }] });
  };
  await assert.rejects(refreshPerformance(store, 1, { env, fetcher }), /Duplicate/);
  assert.equal(tokens, 1); assert.equal((await showPerformance(store, env)).status, 'no-snapshot');
});
