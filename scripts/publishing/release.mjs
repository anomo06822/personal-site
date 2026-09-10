import fs from 'node:fs/promises';
import path from 'node:path';
import { atomicJson, canonical, exists, hash, requireId } from './store.mjs';

function text(value, field, max) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw new Error(`Invalid ${field} (required, max ${max} characters)`);
}
export function validateRelease(r) {
  if (r.schemaVersion !== 'personal-site-release-v2') throw new Error('Use personal-site-release-v2; convert legacy exports explicitly using the documented example');
  requireId(r.releaseId);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.slug) || r.slug.length > 150) throw new Error('slug must be lower kebab case, max 150 characters');
  text(r.articleId, 'articleId', 200);
  if (!['zh-TW', 'en'].includes(r.locale)) throw new Error('locale must be zh-TW or en');
  if (!['pillar', 'news-analysis'].includes(r.contentType)) throw new Error('Invalid contentType');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.publishedAt) || new Date(r.publishedAt).toISOString().slice(0, 10) !== r.publishedAt) throw new Error('publishedAt must be a calendar date');
  if (!Array.isArray(r.tags) || r.tags.length > 20 || r.tags.some(tag => typeof tag !== 'string' || !tag.trim() || tag.length > 80)) throw new Error('Invalid tags');
  const source = new URL(r.sourceUrl);
  if (source.protocol !== 'https:' || source.host !== 'app.heptabase.com' || source.username || source.password || !/^\/[^/]+\/card\/[^/]+$/.test(source.pathname)) throw new Error('sourceUrl must be a Heptabase card deep link');
  if (r.sourceUpdatedAtUtc != null && (!/Z$/.test(r.sourceUpdatedAtUtc) || !Number.isFinite(Date.parse(r.sourceUpdatedAtUtc)))) throw new Error('sourceUpdatedAtUtc must be a UTC timestamp');
  if (typeof r.evidenceMarkdown !== 'string' || r.evidenceMarkdown.length > 16000) throw new Error('Invalid private evidence');
  if (!Array.isArray(r.localizations) || r.localizations.length !== 1 || r.localizations[0].locale !== (r.locale === 'en' ? 'zh-TW' : 'en')) throw new Error('Exactly one mirrored locale is required');
  for (const variant of [r, ...r.localizations]) {
    text(variant.title, 'title', 200); text(variant.description, 'description', 500); text(variant.bodyMarkdown, 'bodyMarkdown', 100000);
    if (/app\.heptabase\.com|<PRIVATE_|^#{1,6}\s+(Brief|Editorial Frame|Distribution Pack|Hero Image Brief|Reusable Hook Notes|SEO \/ Publish Gate)\s*$/im.test(variant.bodyMarkdown)) throw new Error('Remove private source links/internal sections from the public body');
  }
  if (!Array.isArray(r.channels) || r.channels.length > 10) throw new Error('Invalid channels');
  const ids = new Set();
  for (const channel of r.channels) {
    if (!/^[a-z0-9][a-z0-9-]{0,49}$/.test(channel.id) || ids.has(channel.id)) throw new Error('Channel IDs must be unique lower kebab case');
    ids.add(channel.id);
    if (!['linkedin', 'x'].includes(channel.provider) || !Array.isArray(channel.posts) || !channel.posts.length || channel.posts.length > 25) throw new Error('Invalid channel provider/posts');
    if (channel.provider === 'linkedin' && channel.posts.length !== 1) throw new Error('LinkedIn requires exactly one final post');
    for (const post of channel.posts) {
      text(post, 'final social post', channel.provider === 'linkedin' ? 3000 : 10000);
      // Conservative bound: URLs count as 23; all non-ASCII code points as 2.
      const weighted = post.replace(/https?:\/\/[^\s]+/g, 'x'.repeat(23));
      if (channel.provider === 'x' && [...weighted].reduce((n, char) => n + (char.codePointAt(0) > 0x7f ? 2 : 1), 0) > 280) throw new Error('X post exceeds conservative 280 weighted-character limit');
      if (/app\.heptabase\.com|<PRIVATE_/i.test(post)) throw new Error('Remove private source links from social posts');
    }
  }
  if (r.heroImage) {
    const { extension, dataBase64 } = r.heroImage;
    if (!['png', 'jpg', 'webp'].includes(extension) || typeof dataBase64 !== 'string' || !dataBase64 || dataBase64.length > 14_000_000 || Buffer.from(dataBase64, 'base64').toString('base64') !== dataBase64) throw new Error('heroImage must contain a base64 PNG/JPG/WebP, max 10 MB');
    const bytes = Buffer.from(dataBase64, 'base64');
    if (!(extension === 'png' && bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) || extension === 'jpg' && bytes[0] === 255 && bytes[1] === 216 || extension === 'webp' && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP')) throw new Error('heroImage bytes do not match extension');
  }
  if (r.heroImageAssetId) throw new Error('Legacy DB asset IDs are retired; use --hero to freeze a local image');
  return r;
}

export async function assembleRelease(input, heroPath) {
  const release = structuredClone(input);
  if (heroPath) {
    const extension = path.extname(heroPath).slice(1).toLowerCase().replace('jpeg', 'jpg');
    release.heroImage = { extension, dataBase64: (await fs.readFile(heroPath)).toString('base64') };
  }
  return validateRelease(release);
}

export async function prepare(store, input, heroPath) {
  const release = await assembleRelease(input, heroPath);
  const snapshotHash = hash(release);
  return store.locked(async () => {
    if (await exists(store.file(release.releaseId, 'snapshot'))) {
      await store.load(release.releaseId, snapshotHash);
      return { releaseId: release.releaseId, snapshotHash, reused: true };
    }
    for (const other of await store.list()) if (other.articleId === release.articleId || other.slug === release.slug) throw new Error('Article ID/slug already has a release. Edit an existing published article through reviewed Git changes.');
    await atomicJson(store.file(release.releaseId, 'snapshot'), { snapshotHash, release });
    return { releaseId: release.releaseId, snapshotHash, reused: false };
  });
}

const xml = value => value.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);
export function renderFiles({ release: r, snapshotHash }) {
  const result = {};
  for (const variant of [r, ...r.localizations]) {
    const imagePath = `social/blog/${variant.locale}/${r.slug}.${r.heroImage?.extension || 'svg'}`;
    const frontmatter = { articleId: r.articleId, slug: r.slug, locale: variant.locale, title: variant.title, description: variant.description,
      publishedAt: r.publishedAt, contentType: r.contentType, articleRole: 'primary', aiGenerated: true, tags: r.tags,
      published: true, heroImagePath: `/${imagePath}`, releaseHash: snapshotHash };
    result[`content/posts/${variant.locale}/${r.slug}.mdx`] = Buffer.from(`---\n${Object.entries(frontmatter).map(([key, value]) => `${key}: ${canonical(value)}`).join('\n')}\n---\n\n${variant.bodyMarkdown.trim()}\n`);
    result[`public/${imagePath}`] = r.heroImage ? Buffer.from(r.heroImage.dataBase64, 'base64') : Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#111827"/><text x="64" y="140" font-family="sans-serif" font-size="28" fill="#94a3b8">Jarvis · ${xml(variant.locale)}</text><text x="64" y="310" font-family="sans-serif" font-size="40" fill="#f8fafc" textLength="1072" lengthAdjust="spacingAndGlyphs">${xml(variant.title)}</text></svg>\n`);
  }
  return result;
}
