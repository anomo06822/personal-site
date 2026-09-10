import fs from 'node:fs/promises';
import path from 'node:path';
import { assembleRelease, renderFiles, validateRelease } from './release.mjs';
import { canonicalPath, hash, readJson } from './store.mjs';
import { selectChannels } from './social.mjs';
import { siteUrl } from './website.mjs';

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const prose = value => `<pre>${escape(value)}</pre>`;

function reviewText(snapshot, summary, channels, target, imageName) {
  const r = snapshot.release;
  const chosen = new Set(channels.map(c => c.id));
  const destinations = ['personal-site（Git push → GitHub Pages CI/CD）', ...channels.map(c => `${c.provider} / ${c.id}（網站部署完成後）`)];
  const md = [
    `# 發文審閱：${r.title}`, '', `![發文封面](${imageName})`, '',
    '## 彙總', '', summary, '',
    '## 本次發佈範圍', '', ...destinations.map(value => `- ${value}`), '',
    `預計日期：${r.publishedAt}`, `文章 slug：${r.slug}`, `Git：${target.remote} / ${target.branch}`,
    `稿件版本：${snapshot.snapshotHash}`, '',
    '圖片、中英文全文與所選社群文案確認後，才提交並推送 Git。修改任一項後會建立新的審閱版本。', '',
    ...[r, ...r.localizations].flatMap(v => [`## ${v.locale} — ${v.title}`, '', v.description, '', `網址：${siteUrl(r, v.locale, target.baseUrl)}`, '', v.bodyMarkdown, '']),
    '## 社群文案', '',
    ...r.channels.flatMap(c => [`### ${c.provider} / ${c.id} — ${chosen.has(c.id) ? '本次發佈' : '備用稿，不發佈'}`, '', ...c.posts.flatMap((post, index) => [`第 ${index + 1} 則：`, '', post, ''])]),
    '## 私人來源與研究證據', '', r.sourceUrl, '', r.evidenceMarkdown, '',
  ].join('\n');
  const image = r.heroImage;
  const imageType = image.extension === 'jpg' ? 'jpeg' : image.extension;
  const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">
<title>${escape(r.title)} — 發文審閱</title>
<style>
:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f4f2ed;color:#202621;font:16px/1.7 system-ui,sans-serif}main{max-width:980px;margin:auto;padding:40px 24px 72px}header{margin-bottom:32px}h1{font-size:clamp(28px,4vw,44px);line-height:1.25;margin:8px 0 24px}h2{font-size:23px;margin-top:0}h3{font-size:19px}section{background:#fff;padding:28px;margin:20px 0;border:1px solid #dadfd7;border-radius:12px}img{display:block;width:100%;max-height:600px;object-fit:contain;background:#e6ebe3;border-radius:10px}.label{color:#4c674f;font-size:13px;letter-spacing:.08em;font-weight:650}.meta{color:#58625a;font-size:14px;overflow-wrap:anywhere}pre{font:inherit;white-space:pre-wrap;overflow-wrap:anywhere;margin:16px 0}code{font-size:12px;overflow-wrap:anywhere}a{color:#286946}li{margin:6px 0}.post{border-top:1px solid #e3e7df;padding-top:14px}details{padding:20px 0}summary{cursor:pointer;font-weight:600}@media print{body{background:white}main{padding:0}section{break-inside:avoid}img{max-height:380px}}
</style></head><body><main>
<header><div class="label">發文審閱 · 尚未發佈</div><h1>${escape(r.title)}</h1><img src="data:image/${imageType};base64,${image.dataBase64}" alt="${escape(r.title)}的發文封面"></header>
<section><h2>彙總</h2>${prose(summary)}</section>
<section><h2>本次發佈範圍</h2><ul>${destinations.map(d => `<li>${escape(d)}</li>`).join('')}</ul><p>確認這份圖片與內容後，才執行 Git 推送及 CI/CD。備用稿不會發佈。</p><p class="meta">日期 ${escape(r.publishedAt)} · ${escape(target.remote)} / ${escape(target.branch)}<br>Snapshot <code>${snapshot.snapshotHash}</code></p></section>
${[r, ...r.localizations].map(v => `<section><div class="label">${escape(v.locale)} · 全文（保留 Markdown 標記）</div><h2>${escape(v.title)}</h2><p>${escape(v.description)}</p><p class="meta">${escape(siteUrl(r, v.locale, target.baseUrl))}</p>${prose(v.bodyMarkdown)}</section>`).join('')}
<section><h2>社群文案</h2>${r.channels.length ? r.channels.map(c => `<h3>${escape(c.provider)} / ${escape(c.id)} · ${chosen.has(c.id) ? '本次發佈' : '備用稿，不發佈'}</h3>${c.posts.map((post, index) => `<div class="post"><div class="label">第 ${index + 1} 則</div>${prose(post)}</div>`).join('')}`).join('') : '<p>本次沒有社群文案。</p>'}</section>
<details><summary>私人來源與研究證據（不進入網站）</summary><p>${escape(r.sourceUrl)}</p>${prose(r.evidenceMarkdown)}</details>
</main></body></html>`;
  return { md, html };
}

export async function createReview({ input, heroPath, summary, selectedChannels = [], output, target }) {
  if (typeof summary !== 'string' || !summary.trim() || summary.length > 20000) throw new Error('Supply a concise review summary with --summary FILE (max 20000 characters)');
  const release = await assembleRelease(input, heroPath);
  if (!release.heroImage) throw new Error('Generate and inspect the publication image first, then pass --hero IMAGE');
  const channels = selectChannels(release, selectedChannels);
  const destination = await canonicalPath(output);
  const repo = await fs.realpath(target.repo);
  if (destination === repo || destination.startsWith(repo + path.sep)) throw new Error('Review packets must stay outside the public repository');
  const snapshot = { release, snapshotHash: hash(release) };
  const imageName = `hero.${release.heroImage.extension}`;
  const { md, html } = reviewText(snapshot, summary, channels, target, imageName);
  const files = {
    'candidate.json': Buffer.from(JSON.stringify(release, null, 2) + '\n'),
    'summary.md': Buffer.from(summary),
    [imageName]: Buffer.from(release.heroImage.dataBase64, 'base64'),
    'review.md': Buffer.from(md), 'review.html': Buffer.from(html),
    ...Object.fromEntries(Object.entries(renderFiles(snapshot)).map(([name, bytes]) => [`artifacts/${name}`, bytes])),
  };
  const manifest = { schemaVersion: 'publication-review-v1', releaseId: release.releaseId, snapshotHash: snapshot.snapshotHash,
    createdAt: new Date().toISOString(), target, selectedChannels: channels.map(c => c.id),
    website: true, files: Object.fromEntries(Object.entries(files).map(([name, bytes]) => [name, hash(bytes)])) };
  const reviewHash = hash(manifest);
  // A new directory for each revision preserves the exact packet the user saw.
  await fs.mkdir(path.dirname(destination), { recursive: true, mode: 0o700 });
  await fs.mkdir(destination, { mode: 0o700 });
  for (const [name, bytes] of Object.entries(files)) {
    const file = path.join(destination, name);
    await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
    await fs.writeFile(file, bytes, { flag: 'wx', mode: 0o600 });
  }
  await fs.writeFile(path.join(destination, 'review.json'), JSON.stringify({ ...manifest, reviewHash }, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
  return { releaseId: release.releaseId, snapshotHash: snapshot.snapshotHash, reviewHash, selectedChannels: manifest.selectedChannels,
    reviewHtml: path.join(destination, 'review.html'), reviewMarkdown: path.join(destination, 'review.md'), image: path.join(destination, imageName), candidate: path.join(destination, 'candidate.json') };
}

export async function verifyReview(directory, expectedReviewHash) {
  if (!/^[a-f0-9]{64}$/.test(expectedReviewHash || '')) throw new Error('Pass the review hash shown with the approved packet');
  const root = await fs.realpath(directory);
  const { reviewHash, ...manifest } = await readJson(path.join(root, 'review.json'));
  if (reviewHash !== expectedReviewHash || hash(manifest) !== reviewHash || manifest.schemaVersion !== 'publication-review-v1') throw new Error('Review manifest changed since it was presented');
  for (const [name, digest] of Object.entries(manifest.files)) {
    const file = await fs.realpath(path.resolve(root, name));
    if (!file.startsWith(root + path.sep) || hash(await fs.readFile(file)) !== digest) throw new Error(`Review file changed: ${name}`);
  }
  const release = validateRelease(await readJson(path.join(root, 'candidate.json')));
  if (release.releaseId !== manifest.releaseId || hash(release) !== manifest.snapshotHash) throw new Error('Candidate no longer matches reviewed snapshot');
  selectChannels(release, manifest.selectedChannels);
  return { releaseId: manifest.releaseId, snapshotHash: manifest.snapshotHash, reviewHash, target: manifest.target,
    selectedChannels: manifest.selectedChannels, candidate: path.join(root, 'candidate.json'), verified: true };
}
