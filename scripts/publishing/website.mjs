import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import matter from 'gray-matter';
import { exists, hash } from './store.mjs';
import { renderFiles } from './release.mjs';

const exec = promisify(execFile);
export async function command(repo, program, args) {
  try { return (await exec(program, args, { cwd: repo, maxBuffer: 8 * 1024 * 1024, timeout: 600000 })).stdout.trimEnd(); }
  catch { throw new Error(`${program} ${args[0]} failed; inspect the repository/build before retrying`); }
}
export const siteUrl = (release, locale, baseUrl) => `${baseUrl.replace(/\/$/, '')}/${locale}/blog/${encodeURIComponent(release.slug)}/`;
export async function configuration(repo, env = process.env) {
  const remote = env.PUBLISHING_REMOTE || 'origin';
  const branch = env.PUBLISHING_BRANCH || 'main';
  const baseUrl = env.PUBLISHING_SITE_URL || 'https://anomo06822.github.io/personal-site';
  const url = new URL(baseUrl);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error('PUBLISHING_SITE_URL must be a public HTTPS base URL');
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/.test(branch) || branch.includes('..') || !/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(remote)) throw new Error('Invalid Git remote/branch');
  return { repo: await fs.realpath(repo), remote, branch, baseUrl: baseUrl.replace(/\/$/, ''), remoteUrl: await command(repo, 'git', ['remote', 'get-url', remote]) };
}

async function safePath(repo, relative) {
  const target = path.resolve(repo, relative);
  if (!target.startsWith(repo + path.sep)) throw new Error('Output escaped repository');
  let cursor = target;
  while (cursor !== repo) {
    try { if ((await fs.lstat(cursor)).isSymbolicLink()) throw new Error('Publication paths must not contain symlinks'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    cursor = path.dirname(cursor);
  }
  return target;
}

async function verifyFiles(repo, files) {
  for (const [name, bytes] of Object.entries(files)) {
    const target = await safePath(repo, name);
    if (!await exists(target) || hash(await fs.readFile(target)) !== hash(bytes)) throw new Error(`Reviewed artifact changed: ${name}`);
  }
}

async function ensureScope(repo, files) {
  const dirty = await command(repo, 'git', ['status', '--porcelain=v1', '-z', '--untracked-files=all']);
  for (const entry of dirty.split('\0').filter(Boolean)) {
    if (entry[0] === 'R' || entry[0] === 'C' || !Object.hasOwn(files, entry.slice(3))) throw new Error('Repository contains unrelated changes; commit or isolate them before publishing');
  }
}

async function verifyCommit(repo, commit, baseHead, files, run) {
  if (await run(repo, 'git', ['rev-parse', `${commit}^`]) !== baseHead) throw new Error('Publication commit has an unexpected parent');
  const names = (await run(repo, 'git', ['diff-tree', '--no-commit-id', '--name-only', '-r', commit])).split('\n').sort();
  if (JSON.stringify(names) !== JSON.stringify(Object.keys(files).sort())) throw new Error('Publication commit includes unexpected files');
  for (const [name, expected] of Object.entries(files)) {
    const { stdout } = await exec('git', ['show', `${commit}:${name}`], { cwd: repo, encoding: 'buffer', maxBuffer: 16 * 1024 * 1024 });
    if (hash(stdout) !== hash(expected)) throw new Error(`Publication commit differs from snapshot: ${name}`);
  }
}

export async function stageWebsite(store, snapshot, receipt, config, run = command) {
  const files = renderFiles(snapshot);
  if (receipt.target && JSON.stringify(receipt.target) !== JSON.stringify(config)) throw new Error('Publication target changed; use the original repository, remote, branch and site URL');
  receipt.target = config;
  if (receipt.website.baseHead) {
    // Recover a partially written staging operation without overwriting edits.
    for (const [name, bytes] of Object.entries(files)) {
      const target = await safePath(config.repo, name);
      if (await exists(target) && hash(await fs.readFile(target)) !== hash(bytes)) throw new Error(`Existing file differs: ${name}`);
    }
  } else {
    await ensureScope(config.repo, {});
    // Prevent duplicates under a different slug as well as path overwrites.
    for (const locale of ['zh-TW', 'en']) {
      const root = path.join(config.repo, 'content/posts', locale);
      if (!await exists(root)) continue;
      for (const name of await fs.readdir(root)) {
        if (!name.endsWith('.mdx')) continue;
        const { data } = matter(await fs.readFile(path.join(root, name), 'utf8'));
        if (data.articleId === snapshot.release.articleId || name === `${snapshot.release.slug}.mdx`) throw new Error('Article already exists in personal-site; use reviewed Git edits for revisions');
      }
    }
    for (const name of Object.keys(files)) if (await exists(await safePath(config.repo, name))) throw new Error(`Refusing to overwrite existing media: ${name}`);
    receipt.website.baseHead = await run(config.repo, 'git', ['rev-parse', 'HEAD']);
    receipt.website.status = 'staging';
    await store.saveReceipt(snapshot.release.releaseId, receipt);
  }
  for (const [name, bytes] of Object.entries(files)) {
    const target = await safePath(config.repo, name);
    if (await exists(target)) continue;
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, bytes, { flag: 'wx' });
  }
  await verifyFiles(config.repo, files);
  await ensureScope(config.repo, files);
  if (['pending', 'staging'].includes(receipt.website.status)) receipt.website.status = 'staged';
  await store.saveReceipt(snapshot.release.releaseId, receipt);
  return Object.keys(files);
}

export function isPublishedHtml(html, snapshot, locale) {
  if (!/<article(?:\s|>)/i.test(html) || /__next_error__/i.test(html)) return false;
  const meta = new Map();
  for (const tag of html.match(/<meta\s[^>]+>/gi) || []) {
    const attrs = new Map([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m => [m[1].toLowerCase(), m[2]]));
    meta.set(attrs.get('name'), attrs.get('content'));
  }
  return meta.get('ps:release-hash') === snapshot.snapshotHash && meta.get('ps:locale') === locale;
}

export async function verifyDeployment(snapshot, config, fetcher = fetch) {
  const pages = [];
  for (const locale of [snapshot.release.locale, snapshot.release.localizations[0].locale]) {
    const url = siteUrl(snapshot.release, locale, config.baseUrl);
    try {
      const response = await fetcher(url, { signal: AbortSignal.timeout(15000), redirect: 'error', headers: { 'Cache-Control': 'no-cache' } });
      pages.push({ locale, url, live: response.ok && isPublishedHtml(await response.text(), snapshot, locale) });
    } catch { pages.push({ locale, url, live: false }); }
  }
  return { live: pages.every(page => page.live), pages };
}

export async function publishWebsite(store, snapshot, receipt, config, { run = command, probe = verifyDeployment } = {}) {
  const id = snapshot.release.releaseId;
  const files = renderFiles(snapshot);
  if (!receipt.website.commitHash) {
    await stageWebsite(store, snapshot, receipt, config, run);
    if (await run(config.repo, 'git', ['branch', '--show-current']) !== config.branch) throw new Error(`Website publication requires branch ${config.branch}`);
    const head = await run(config.repo, 'git', ['rev-parse', 'HEAD']);
    const message = `publish: ${snapshot.release.articleId}\n\nRelease: ${id} ${snapshot.snapshotHash}`;
    if (receipt.website.status === 'committing' && head !== receipt.website.baseHead) {
      const parent = await run(config.repo, 'git', ['rev-parse', 'HEAD^']);
      const actualMessage = await run(config.repo, 'git', ['log', '-1', '--format=%B']);
      const names = (await run(config.repo, 'git', ['diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD'])).split('\n').sort();
      if (parent !== receipt.website.baseHead || actualMessage.trim() !== message || JSON.stringify(names) !== JSON.stringify(Object.keys(files).sort())) throw new Error('Interrupted commit is ambiguous; inspect Git before retrying');
      await verifyFiles(config.repo, files);
      // Confirm HEAD contains those exact bytes, not merely a matching working tree.
      for (const name of Object.keys(files)) {
        const expected = await run(config.repo, 'git', ['hash-object', '--', name]);
        if (await run(config.repo, 'git', ['rev-parse', `HEAD:${name}`]) !== expected) throw new Error('Interrupted commit artifact differs');
      }
      receipt.website.commitHash = head;
    } else {
      if (head !== receipt.website.baseHead) throw new Error('Git HEAD changed after staging; review the repository before publishing');
      const remoteHead = (await run(config.repo, 'git', ['ls-remote', config.remote, `refs/heads/${config.branch}`])).split(/\s+/)[0];
      if (remoteHead !== head) throw new Error('Local and remote branch must match before publication; do not push unrelated commits');
      await run(config.repo, 'pnpm', ['run', 'build:publishing']);
      await verifyFiles(config.repo, files);
      await ensureScope(config.repo, files);
      if (await run(config.repo, 'git', ['rev-parse', 'HEAD']) !== head) throw new Error('Git HEAD changed during build');
      receipt.website.status = 'committing';
      await store.saveReceipt(id, receipt);
      await run(config.repo, 'git', ['add', '--', ...Object.keys(files)]);
      await run(config.repo, 'git', ['commit', '-m', message]);
      receipt.website.commitHash = await run(config.repo, 'git', ['rev-parse', 'HEAD']);
    }
    await verifyCommit(config.repo, receipt.website.commitHash, receipt.website.baseHead, files, run);
    receipt.website.status = 'committed';
    await store.saveReceipt(id, receipt);
  }
  if (['committed', 'pushing'].includes(receipt.website.status)) {
    await verifyCommit(config.repo, receipt.website.commitHash, receipt.website.baseHead, files, run);
    receipt.website.status = 'pushing';
    await store.saveReceipt(id, receipt);
    // Push the recorded commit only; retries cannot include newer local commits.
    const remoteHead = (await run(config.repo, 'git', ['ls-remote', config.remote, `refs/heads/${config.branch}`])).split(/\s+/)[0];
    if (remoteHead !== receipt.website.commitHash) {
      if (remoteHead !== receipt.website.baseHead) {
        // A lost push response can be followed by a newer legitimate remote commit.
        await run(config.repo, 'git', ['fetch', '--no-tags', config.remote, config.branch]);
        await run(config.repo, 'git', ['merge-base', '--is-ancestor', receipt.website.commitHash, 'FETCH_HEAD']);
      } else await run(config.repo, 'git', ['push', config.remote, `${receipt.website.commitHash}:refs/heads/${config.branch}`]);
    }
    receipt.website.status = 'awaiting-deployment';
    await store.saveReceipt(id, receipt);
  }
  const verification = await probe(snapshot, config);
  receipt.website.verification = verification;
  receipt.website.status = verification.live ? 'published' : 'awaiting-deployment';
  await store.saveReceipt(id, receipt);
  return verification.live;
}
