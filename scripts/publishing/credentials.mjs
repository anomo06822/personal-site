import { execFileSync } from 'node:child_process';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const publishingKeys = ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_PUBLISHING_ACTOR', 'LINKEDIN_API_VERSION',
  'X_ACCESS_TOKEN', 'X_USER_ID', 'GA4_PROPERTY_ID', 'GOOGLE_ANALYTICS_ACCESS_TOKEN',
  'GOOGLE_ANALYTICS_CLIENT_ID', 'GOOGLE_ANALYTICS_CLIENT_SECRET', 'GOOGLE_ANALYTICS_REFRESH_TOKEN'];
const oauthKeys = ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET'];
const safeEnvironmentKeys = ['PATH', 'HOME', 'TMPDIR', 'LANG', 'LC_ALL', 'TZ', 'SSH_AUTH_SOCK', 'SSH_AGENT_PID',
  'PUBLISHING_HOME', 'PUBLISHING_SITE_URL', 'PUBLISHING_REMOTE', 'PUBLISHING_BRANCH'];

export function validateBindings(config) {
  if (config.schemaVersion !== 'personal-site-credentials-v1' || !uuid.test(config.projectId || '') ||
      !config.secretIds || typeof config.secretIds !== 'object' || Array.isArray(config.secretIds)) {
    throw new Error('Invalid private BWS credential bindings');
  }
  for (const [key, id] of Object.entries(config.secretIds)) {
    if (![...publishingKeys, ...oauthKeys].includes(key) || !uuid.test(id)) throw new Error('Unsupported BWS credential binding');
  }
  if (config.keychainService !== 'personal-site-publishing.bws' || config.keychainAccount !== config.projectId) {
    throw new Error('Unexpected BWS Keychain binding');
  }
  return config;
}

export function publisherEnvironment(inherited, values) {
  return { ...Object.fromEntries(safeEnvironmentKeys.filter(k => inherited[k]).map(k => [k, inherited[k]])), ...values };
}

export function loadBoundSecrets(config, names, { env = process.env, exec = execFileSync } = {}) {
  validateBindings(config);
  for (const name of names) if (!config.secretIds[name]) throw new Error(`Missing BWS binding: ${name}`);
  let machineToken = env.BWS_ACCESS_TOKEN;
  if (!machineToken) {
    try {
      machineToken = exec('/usr/bin/security', ['find-generic-password', '-s', config.keychainService,
        '-a', config.keychainAccount, '-w'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000 }).trim();
    } catch { throw new Error('BWS machine token unavailable; unlock/configure its macOS Keychain entry or inject BWS_ACCESS_TOKEN'); }
  }
  if (!machineToken) throw new Error('BWS machine token is empty');
  const bwsEnv = Object.fromEntries(['PATH', 'HOME', 'TMPDIR'].filter(k => env[k]).map(k => [k, env[k]]));
  bwsEnv.BWS_ACCESS_TOKEN = machineToken;
  const values = {};
  for (const name of names) {
    let secret;
    try {
      const output = exec('bws', ['secret', 'get', config.secretIds[name], '--output', 'json'],
        { env: bwsEnv, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 30000, maxBuffer: 1024 * 1024 });
      secret = JSON.parse(output);
    } catch { throw new Error(`Could not read BWS credential: ${name}`); }
    if (secret.id !== config.secretIds[name] || secret.key !== name ||
        (secret.projectId ?? secret.project_id) !== config.projectId || typeof secret.value !== 'string' || !secret.value) {
      throw new Error(`BWS credential binding mismatch: ${name}`);
    }
    values[name] = secret.value;
  }
  return values;
}

export async function verifyLinkedIn(values, { expectedActor, fetchImpl = fetch } = {}) {
  const token = values.LINKEDIN_ACCESS_TOKEN;
  const actor = values.LINKEDIN_PUBLISHING_ACTOR;
  if (!token || !/^urn:li:person:[A-Za-z0-9_-]+$/.test(actor || '') || actor !== expectedActor) {
    throw new Error('LinkedIn personal actor differs from the verified credential binding');
  }
  async function json(url, options) {
    let response;
    try { response = await fetchImpl(url, { ...options, signal: AbortSignal.timeout(20000), redirect: 'error' }); }
    catch { throw new Error('LinkedIn verification connection failed'); }
    if (!response.ok) throw new Error(`LinkedIn verification returned HTTP ${response.status}`);
    try { return await response.json(); } catch { throw new Error('LinkedIn verification returned invalid JSON'); }
  }
  const inspected = await json('https://www.linkedin.com/oauth/v2/introspectToken', { method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: values.LINKEDIN_CLIENT_ID, client_secret: values.LINKEDIN_CLIENT_SECRET, token }) });
  const scopes = String(inspected.scope || '').split(/[,\s]+/).filter(Boolean);
  if (inspected.active !== true || inspected.client_id !== values.LINKEDIN_CLIENT_ID ||
      !['openid', 'profile', 'w_member_social'].every(s => scopes.includes(s)) ||
      !Number.isFinite(inspected.expires_at) || inspected.expires_at * 1000 <= Date.now()) {
    throw new Error('LinkedIn token is inactive, expired, or missing required scopes');
  }
  const person = await json('https://api.linkedin.com/v2/userinfo', { headers: { Authorization: `Bearer ${token}` } });
  if (`urn:li:person:${person.sub}` !== actor) throw new Error('LinkedIn token belongs to a different person');
  return { provider: 'linkedin', verified: true, name: person.name, actor, scopes,
    expiresAt: new Date(inspected.expires_at * 1000).toISOString(), posted: false };
}
