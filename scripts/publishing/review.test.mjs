import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createReview, verifyReview } from './review.mjs';
import { Store, readJson } from './store.mjs';
import { prepare } from './release.mjs';
import { command } from './website.mjs';
import { main } from '../publish.mjs';

// A tiny deterministic PNG fixture; this is never a user-facing generated cover.
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64');

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'publication-review-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const repo = path.join(root, 'site'); await fs.mkdir(repo);
  const input = await readJson(new URL('../../docs/release.example.json', import.meta.url));
  const heroPath = path.join(root, 'generated-hero.png'); await fs.writeFile(heroPath, png);
  const target = { repo: await fs.realpath(repo), remote: 'origin', branch: 'main', baseUrl: 'https://example.invalid/site', remoteUrl: 'git@example.invalid:owner/site.git' };
  const args = { input, heroPath, target, summary: '核心論點\n\n- 讀者：工程主管\n- 圖片：已生成並檢視\n- 待確認：無', output: path.join(root, 'review-r1') };
  return { root, repo, input, args };
}

test('review includes actual image/full text and explicit destinations without freezing a release or touching the repo', async t => {
  const { root, repo, args } = await fixture(t);
  await fs.writeFile(path.join(repo, 'unrelated.txt'), 'Existing work');
  const result = await createReview({ ...args, selectedChannels: ['linkedin-main'] });
  const verified = await verifyReview(args.output, result.reviewHash);
  assert.equal(verified.verified, true);
  assert.deepEqual(verified.selectedChannels, ['linkedin-main']);
  const html = await fs.readFile(result.reviewHtml, 'utf8');
  assert.ok(html.includes(`data:image/png;base64,${png.toString('base64')}`));
  assert.match(html, /linkedin-main · 本次發佈/);
  assert.match(html, /x-main · 備用稿，不發佈/);
  assert.ok(html.includes(args.input.bodyMarkdown));
  assert.ok(html.includes(args.input.localizations[0].bodyMarkdown));
  assert.deepEqual(await fs.readdir(repo), ['unrelated.txt']);
  assert.deepEqual(await new Store(path.join(root, 'private')).list(), []);
  assert.equal((await fs.stat(args.output)).mode & 0o777, 0o700);
  assert.equal((await fs.stat(result.reviewHtml)).mode & 0o777, 0o600);
  const publicMdx = await fs.readFile(path.join(args.output, 'artifacts/content/posts/zh-TW/example-publication.mdx'), 'utf8');
  assert.ok(!publicMdx.includes(args.input.sourceUrl));
  assert.ok(!publicMdx.includes(args.input.evidenceMarkdown));
});

test('revisions preserve old review and freeze exactly the chosen content/image after review', async t => {
  const { root, args } = await fixture(t);
  const r1 = await createReview(args);
  const updated = { ...args.input, title: '修改後的標題' };
  const r2 = await createReview({ ...args, input: updated, output: path.join(root, 'review-r2') });
  assert.notEqual(r1.snapshotHash, r2.snapshotHash);
  assert.equal((await verifyReview(args.output, r1.reviewHash)).verified, true);
  await assert.rejects(createReview(args), error => error.code === 'EEXIST');
  const store = new Store(path.join(root, 'private'));
  const prepared = await prepare(store, await readJson(r2.candidate));
  assert.equal(prepared.snapshotHash, r2.snapshotHash);
  assert.deepEqual(Buffer.from((await store.load(prepared.releaseId)).release.heroImage.dataBase64, 'base64'), png);
});

test('review verification rejects changed prose, image, candidate, artifacts and selected destinations', async t => {
  const { args } = await fixture(t);
  const result = await createReview(args);
  for (const name of ['summary.md', 'hero.png', 'candidate.json', 'review.html', 'artifacts/content/posts/en/example-publication.mdx']) {
    const file = path.join(args.output, name); const original = await fs.readFile(file);
    await fs.appendFile(file, 'Changed after review');
    await assert.rejects(verifyReview(args.output, result.reviewHash), /changed/);
    await fs.writeFile(file, original);
  }
  const manifest = await readJson(path.join(args.output, 'review.json'));
  manifest.selectedChannels.push('x-main');
  await fs.writeFile(path.join(args.output, 'review.json'), JSON.stringify(manifest));
  await assert.rejects(verifyReview(args.output, result.reviewHash), /manifest changed/);
});

test('review requires a real image and keeps private preview out of public repo including symlink aliases', async t => {
  const { root, repo, args } = await fixture(t);
  await assert.rejects(createReview({ ...args, heroPath: undefined }), /Generate and inspect/);
  await assert.rejects(createReview({ ...args, output: path.join(repo, 'preview') }), /outside/);
  const alias = path.join(root, 'alias'); await fs.symlink(repo, alias);
  await assert.rejects(createReview({ ...args, output: path.join(alias, 'preview') }), /outside/);
  assert.deepEqual(await fs.readdir(repo), []);
});

test('HTML displays untrusted text as text and loads no external image or script', async t => {
  const { args } = await fixture(t);
  const injection = '<script>alert("unsafe")</script><img src="https://example.invalid/pixel">';
  const result = await createReview({ ...args, summary: injection, input: { ...args.input, title: injection } });
  const html = await fs.readFile(result.reviewHtml, 'utf8');
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('<img src="https://'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.match(html, /default-src 'none'; img-src data:/);
});

test('CLI review and verification preserve Git and reject a changed publication target', async t => {
  const { root, repo, args } = await fixture(t);
  await command(repo, 'git', ['init', '-b', 'main']);
  await command(repo, 'git', ['remote', 'add', 'origin', 'git@example.invalid:owner/site.git']);
  const draft = path.join(root, 'draft.json'); await fs.writeFile(draft, JSON.stringify(args.input));
  const summary = path.join(root, 'summary.md'); await fs.writeFile(summary, args.summary);
  const flags = ['--store', path.join(root, 'private')];
  const before = await command(repo, 'git', ['status', '--porcelain']);
  const result = await main(['release', 'review', '--input', draft, '--hero', args.heroPath, '--summary', summary, '--output', args.output, ...flags], repo);
  assert.equal(await command(repo, 'git', ['status', '--porcelain']), before);
  assert.equal((await main(['release', 'verify-review', '--input', args.output, '--review-hash', result.reviewHash, ...flags], repo)).verified, true);
  await command(repo, 'git', ['remote', 'set-url', 'origin', 'git@example.invalid:other/site.git']);
  await assert.rejects(main(['release', 'verify-review', '--input', args.output, '--review-hash', result.reviewHash, ...flags], repo), /target changed/);
});
