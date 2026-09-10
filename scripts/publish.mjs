#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { Store, canonicalPath, readJson } from './publishing/store.mjs';
import { prepare, validateRelease } from './publishing/release.mjs';
import { configuration, stageWebsite, publishWebsite, verifyDeployment } from './publishing/website.mjs';
import { distribute, selectChannels, reconcile } from './publishing/social.mjs';
import { refreshPerformance, showPerformance } from './publishing/performance.mjs';
import { createReview, verifyReview } from './publishing/review.mjs';

const help = `personal-site publication CLI (Node 22+; no AIPW service/database)
  doctor
  release review --input FILE --hero IMAGE --summary FILE --output PRIVATE_DIRECTORY [--channels ID,ID]
  release verify-review --input PRIVATE_DIRECTORY --review-hash SHA256
  release prepare --input FILE [--hero IMAGE]
  release list
  release show ID
  release export ID --output FILE
  release stage ID --snapshot SHA256
  release publish|retry ID --snapshot SHA256 [--channels ID,ID] [--social-only]
  release resolve ID --snapshot SHA256 --channel ID --index N --evidence TEXT (--post-id ID | --not-published)
  performance show
  performance refresh [--days 30]
  archive list --archive DIRECTORY
  archive show --archive DIRECTORY --article ID
Options: --store PRIVATE_DIRECTORY, --help
prepare/stage are local. publish/retry can commit, push and post externally.
Use the hash and destinations already authorized in your Codex conversation.
Uncertain provider outcomes require evidence-based resolution before retrying.
`;

export async function main(args = process.argv.slice(2), repo = fileURLToPath(new URL('..', import.meta.url))) {
  const { values, positionals } = parseArgs({ args, allowPositionals: true, strict: true,
    options: Object.fromEntries(['input', 'hero', 'output', 'summary', 'review-hash', 'snapshot', 'channels', 'channel', 'index', 'evidence', 'post-id', 'store', 'days', 'archive', 'article'].map(key => [key, { type: 'string' }]).concat(['social-only', 'not-published', 'help'].map(key => [key, { type: 'boolean' }]))) });
  if (values.help || !positionals.length) return { help };
  const [group, action, id, ...extra] = positionals;
  if (extra.length) throw new Error('Unexpected positional arguments');
  const store = new Store(values.store);
  const privateRoot = await canonicalPath(store.root);
  const repoRoot = await fs.realpath(repo);
  if (privateRoot === repoRoot || privateRoot.startsWith(repoRoot + path.sep)) throw new Error('Publishing store must be outside the public personal-site repository');
  if (group === 'doctor') return { mode: 'heptabase-codex-git', repo: repoRoot, privateStore: store.root,
    prerequisites: { node: process.versions.node, database: false, apiServer: false },
    credentials: { linkedin: Boolean(process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_PUBLISHING_ACTOR), x: Boolean(process.env.X_ACCESS_TOKEN && process.env.X_USER_ID), ga4: Boolean(process.env.GA4_PROPERTY_ID && (process.env.GOOGLE_ANALYTICS_ACCESS_TOKEN || process.env.GOOGLE_ANALYTICS_CLIENT_ID && process.env.GOOGLE_ANALYTICS_CLIENT_SECRET && process.env.GOOGLE_ANALYTICS_REFRESH_TOKEN)) } };
  if (group === 'archive') {
    if (!values.archive) throw new Error('--archive DIRECTORY is required');
    const manifest = await readJson(path.join(values.archive, 'manifest.json'));
    if (action === 'list') return manifest;
    if (action === 'show' && values.article) {
      const rows = (await fs.readFile(path.join(values.archive, 'ContentArticles.jsonl'), 'utf8')).split('\n').filter(Boolean).map(JSON.parse);
      const article = rows.find(row => row.Id === values.article || row.ArticleId === values.article);
      if (!article) throw new Error('Archived article not found');
      return article;
    }
  }
  if (group === 'performance') {
    if (action === 'show') return showPerformance(store);
    if (action === 'refresh') return refreshPerformance(store, Number(values.days || 30));
  }
  if (group === 'release') {
    if (action === 'review') {
      if (!values.input || !values.summary || !values.output) throw new Error('Review requires --input FILE --summary FILE --output PRIVATE_DIRECTORY');
      return createReview({ input: await readJson(values.input), heroPath: values.hero, summary: await fs.readFile(values.summary, 'utf8'),
        output: values.output, selectedChannels: values.channels ? values.channels.split(',') : [], target: await configuration(repoRoot) });
    }
    if (action === 'verify-review') {
      if (!values.input) throw new Error('--input REVIEW_DIRECTORY is required');
      const verified = await verifyReview(values.input, values['review-hash']);
      if (JSON.stringify(verified.target) !== JSON.stringify(await configuration(repoRoot))) throw new Error('Publication target changed since review');
      return verified;
    }
    if (action === 'prepare') {
      if (!values.input) throw new Error('--input FILE is required');
      return prepare(store, await readJson(values.input), values.hero);
    }
    if (action === 'list') return store.list();
    if (action === 'show') return { ...await store.load(id), receipt: await store.receipt(id) };
    if (action === 'export') {
      if (!values.output) throw new Error('--output FILE is required');
      const output = await canonicalPath(values.output);
      if (output === repoRoot || output.startsWith(repoRoot + path.sep)) throw new Error('Private source export cannot be written inside the public repository');
      const snapshot = await store.load(id);
      await fs.writeFile(output, JSON.stringify({ ...snapshot, receipt: await store.receipt(id) }, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
      return { output };
    }
    if (['stage', 'publish', 'retry', 'resolve'].includes(action)) {
      if (!values.snapshot) throw new Error('--snapshot SHA256 is required');
      return store.locked(async () => {
        const snapshot = await store.load(id, values.snapshot); validateRelease(snapshot.release);
        const receipt = await store.receipt(id);
        if (action === 'resolve') {
          reconcile(snapshot, receipt, values.channel, values.index === undefined ? NaN : Number(values.index), { postId: values['post-id'], notPublished: values['not-published'], evidence: values.evidence });
          await store.saveReceipt(id, receipt); return receipt;
        }
        const config = await configuration(repoRoot);
        if (receipt.target && JSON.stringify(receipt.target) !== JSON.stringify(config)) throw new Error('Publication target changed');
        if (action === 'stage') return { releaseId: id, files: await stageWebsite(store, snapshot, receipt, config), receipt };
        const channels = selectChannels(snapshot.release, values.channels ? values.channels.split(',') : []);
        if (values['social-only'] && !channels.length) throw new Error('--social-only requires selected channels');
        for (const channel of channels) {
          if ((receipt.selectedChannels || []).some(key => key !== channel.id && snapshot.release.channels.find(c => c.id === key)?.provider === channel.provider)) throw new Error('A different variant was already selected for this provider');
        }
        receipt.target ??= config;
        // The receipt is cumulative: a completed destination stays completed across retries.
        receipt.selectedChannels = [...new Set([...(receipt.selectedChannels || []), ...channels.map(c => c.id)])];
        let live;
        if (values['social-only']) {
          receipt.website.verification = await verifyDeployment(snapshot, config);
          live = receipt.website.verification.live;
          receipt.website.status = live ? 'published' : 'awaiting-deployment';
        } else live = await publishWebsite(store, snapshot, receipt, config);
        if (!live) { receipt.status = 'awaiting-deployment'; await store.saveReceipt(id, receipt); return receipt; }
        await distribute(store, snapshot, receipt, channels);
        receipt.status = receipt.selectedChannels.every(key => {
          const channel = snapshot.release.channels.find(c => c.id === key);
          const result = receipt.channels[key];
          return result?.posts.length === channel.posts.length && result.posts.every(post => post.status === 'published');
        }) ? 'published' : 'partial';
        await store.saveReceipt(id, receipt); return receipt;
      });
    }
  }
  throw new Error(`Unknown command.\n${help}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(result => { process.stdout.write(JSON.stringify(result, null, 2) + '\n'); if (['partial', 'awaiting-deployment'].includes(result?.status)) process.exitCode = 2; })
    .catch(error => { process.stderr.write(JSON.stringify({ error: error.message }) + '\n'); process.exitCode = 1; });
}
