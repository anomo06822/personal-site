import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createHash, randomUUID } from 'node:crypto';

export const canonical = value => JSON.stringify(value, (_, item) => item && typeof item === 'object' && !Array.isArray(item)
  ? Object.fromEntries(Object.keys(item).sort().map(key => [key, item[key]])) : item);
export const hash = value => createHash('sha256').update(typeof value === 'string' || Buffer.isBuffer(value) ? value : canonical(value)).digest('hex');
export const uuid = value => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value ?? '');
export function requireId(id) { if (!uuid(id)) throw new Error('release ID must be a lowercase UUID'); return id; }
export const exists = file => fs.stat(file).then(() => true, e => { if (e.code === 'ENOENT') return false; throw e; });
export const readJson = async file => JSON.parse(await fs.readFile(file, 'utf8'));

export async function canonicalPath(target) {
  let ancestor = path.resolve(target); const missing = [];
  while (!await exists(ancestor)) { missing.unshift(path.basename(ancestor)); ancestor = path.dirname(ancestor); }
  return path.join(await fs.realpath(ancestor), ...missing);
}

export async function atomicJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temp = `${file}.${randomUUID()}.tmp`;
  const handle = await fs.open(temp, 'wx', 0o600);
  try { await handle.writeFile(JSON.stringify(value, null, 2) + '\n'); await handle.sync(); }
  finally { await handle.close(); }
  await fs.rename(temp, file);
  const directory = await fs.open(path.dirname(file), 'r');
  try { await directory.sync(); } finally { await directory.close(); }
}

export class Store {
  constructor(root = process.env.PUBLISHING_HOME || path.join(os.homedir(), '.local/share/personal-site-publishing')) {
    this.root = path.resolve(root);
  }
  file(id, name) { return path.join(this.root, 'releases', requireId(id), `${name}.json`); }
  async locked(action) {
    await fs.mkdir(this.root, { recursive: true, mode: 0o700 });
    const lock = path.join(this.root, 'writer.lock');
    try { await fs.mkdir(lock, { mode: 0o700 }); }
    catch (error) {
      if (error.code === 'EEXIST') throw new Error(`Publishing store is locked: ${lock}. Check owner.json; remove this lock only after its process has stopped.`);
      throw error;
    }
    try {
      await atomicJson(path.join(lock, 'owner.json'), { pid: process.pid, hostname: os.hostname(), startedAt: new Date().toISOString() });
      return await action();
    } finally { await fs.rm(lock, { recursive: true }); }
  }
  async list() {
    const root = path.join(this.root, 'releases');
    if (!await exists(root)) return [];
    const results = [];
    for (const id of (await fs.readdir(root)).filter(uuid).sort()) {
      if (!await exists(this.file(id, 'snapshot'))) continue;
      const snapshot = await this.load(id);
      results.push({ releaseId: id, title: snapshot.release.title, articleId: snapshot.release.articleId, slug: snapshot.release.slug, snapshotHash: snapshot.snapshotHash });
    }
    return results;
  }
  async load(id, expectedHash) {
    const snapshot = await readJson(this.file(id, 'snapshot'));
    if (snapshot.release.releaseId !== id || hash(snapshot.release) !== snapshot.snapshotHash) throw new Error('Snapshot integrity check failed');
    if (expectedHash !== undefined && snapshot.snapshotHash !== expectedHash) throw new Error('Reviewed snapshot hash does not match');
    return snapshot;
  }
  async receipt(id) {
    const file = this.file(id, 'receipt');
    return await exists(file) ? readJson(file) : { releaseId: id, website: { status: 'pending' }, channels: {}, resolutions: [] };
  }
  async saveReceipt(id, receipt) { await atomicJson(this.file(id, 'receipt'), { ...receipt, updatedAt: new Date().toISOString() }); }
}
