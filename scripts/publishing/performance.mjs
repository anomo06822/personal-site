import path from 'node:path';
import { atomicJson, exists, readJson } from './store.mjs';

export function settings(env = process.env) {
  const propertyId = env.GA4_PROPERTY_ID;
  if (!/^\d+$/.test(propertyId || '')) throw new Error('Set GA4_PROPERTY_ID to the numeric GA4 property ID');
  return { propertyId };
}
async function accessToken(env, fetcher) {
  if (env.GOOGLE_ANALYTICS_ACCESS_TOKEN) return env.GOOGLE_ANALYTICS_ACCESS_TOKEN;
  const clientId = env.GOOGLE_ANALYTICS_CLIENT_ID;
  const clientSecret = env.GOOGLE_ANALYTICS_CLIENT_SECRET;
  const refreshToken = env.GOOGLE_ANALYTICS_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) throw new Error('Inject GA4 access token or OAuth client ID/secret/refresh token through BWS');
  const response = await fetcher('https://oauth2.googleapis.com/token', { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30000), body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' }) });
  if (!response.ok) throw new Error(`Google token refresh failed: HTTP ${response.status}`);
  const json = await response.json();
  if (!json.access_token) throw new Error('Google returned no access token');
  return json.access_token;
}
export function dayWindow(days, now = new Date()) {
  if (!Number.isInteger(days) || days < 1 || days > 90) throw new Error('days must be an integer from 1 to 90');
  const start = new Date(now); start.setUTCDate(start.getUTCDate() - days + 1);
  return { startDate: start.toISOString().slice(0, 10), endDate: now.toISOString().slice(0, 10) };
}
export async function refreshPerformance(store, days = 30, { env = process.env, fetcher = fetch, now = new Date() } = {}) {
  const { propertyId } = settings(env);
  const window = dayWindow(days, now);
  const token = await accessToken(env, fetcher);
  const dimensions = ['date', 'unifiedPagePathScreen', 'sessionSource', 'sessionMedium', 'sessionCampaignName'];
  const metrics = ['sessions', 'screenPageViews', 'engagedSessions', 'averageSessionDuration'];
  const rows = [];
  const seen = new Set();
  let expectedRowCount;
  for (let offset = 0; ; ) {
    const response = await fetcher(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateRanges: [window], dimensions: dimensions.map(name => ({ name })), metrics: metrics.map(name => ({ name })),
        orderBys: dimensions.map(dimensionName => ({ dimension: { dimensionName } })),
        dimensionFilter: { filter: { fieldName: 'unifiedPagePathScreen', stringFilter: { matchType: 'CONTAINS', value: '/blog/' } } }, offset: String(offset), limit: '10000', keepEmptyRows: false }),
    });
    if (!response.ok) throw new Error(`GA4 runReport failed: HTTP ${response.status}`);
    const page = await response.json();
    if (!Number.isSafeInteger(page.rowCount ?? 0) || (page.rowCount ?? 0) < 0 || page.rowCount > 1_000_000) throw new Error('Unexpected GA4 row count; previous snapshot retained');
    expectedRowCount ??= page.rowCount || 0;
    if (expectedRowCount !== (page.rowCount || 0)) throw new Error('GA4 row count changed during pagination; retry for a complete snapshot');
    for (const row of page.rows || []) {
      if (row.dimensionValues?.length !== dimensions.length || row.metricValues?.length !== metrics.length) throw new Error('Unexpected GA4 report schema');
      const key = JSON.stringify(row.dimensionValues.map(value => value.value));
      if (seen.has(key) || row.metricValues.some(value => !Number.isFinite(Number(value.value)) || Number(value.value) < 0)) throw new Error('Duplicate or invalid GA4 report rows; previous snapshot retained');
      seen.add(key);
      rows.push(Object.fromEntries([...dimensions.map((key, i) => [key, row.dimensionValues[i].value]), ...metrics.map((key, i) => [key, Number(row.metricValues[i].value)])]));
    }
    offset += page.rows?.length || 0;
    if (offset > expectedRowCount) throw new Error('GA4 returned more rows than its declared row count');
    if (offset >= (page.rowCount || 0)) break;
    if (!page.rows?.length) throw new Error('Incomplete GA4 pagination; previous snapshot retained');
  }
  const report = { propertyId, ...window, fetchedAt: now.toISOString(), rows };
  await store.locked(async () => {
    const root = path.join(store.root, 'performance', propertyId);
    await atomicJson(path.join(root, `${window.startDate}_${window.endDate}.json`), report);
    await atomicJson(path.join(root, 'latest.json'), report);
  });
  return { propertyId, ...window, rows: rows.length, file: path.join(store.root, 'performance', propertyId, 'latest.json') };
}
export async function showPerformance(store, env = process.env) {
  const { propertyId } = settings(env);
  const file = path.join(store.root, 'performance', propertyId, 'latest.json');
  if (!await exists(file)) return { propertyId, status: 'no-snapshot' };
  return readJson(file);
}
