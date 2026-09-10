import test from 'node:test';
import assert from 'node:assert/strict';
import { loadBoundSecrets, publisherEnvironment, verifyLinkedIn } from './credentials.mjs';
const projectId = '11111111-1111-4111-8111-111111111111';
const id = '22222222-2222-4222-8222-222222222222';
const config = { schemaVersion: 'personal-site-credentials-v1', projectId,
  keychainService: 'personal-site-publishing.bws', keychainAccount: projectId, secretIds: { LINKEDIN_ACCESS_TOKEN: id } };

test('BWS reads only bound secrets; machine token never enters argv or publisher environment', () => {
  let calls = 0;
  const values = loadBoundSecrets(config, ['LINKEDIN_ACCESS_TOKEN'], { env: { PATH: '/bin', HOME: '/tmp', BWS_ACCESS_TOKEN: 'machine-secret', UNRELATED_TOKEN: 'other' },
    exec(command, args, options) {
      calls++;
      assert.equal(command, 'bws');
      assert.deepEqual(args, ['secret', 'get', id, '--output', 'json']);
      assert.equal(options.env.BWS_ACCESS_TOKEN, 'machine-secret');
      assert.equal(options.env.UNRELATED_TOKEN, undefined);
      return JSON.stringify({ id, key: 'LINKEDIN_ACCESS_TOKEN', value: 'linkedin-secret', projectId });
    } });
  assert.equal(calls, 1);
  const env = publisherEnvironment({ PATH: '/bin', BWS_ACCESS_TOKEN: 'machine-secret', GEMINI_API_TOKEN: 'unrelated' }, values);
  assert.deepEqual(env, { PATH: '/bin', LINKEDIN_ACCESS_TOKEN: 'linkedin-secret' });
});

test('BWS rejects wrong project and redacts malformed/failed credential subprocesses', () => {
  const options = { env: { BWS_ACCESS_TOKEN: 'machine-secret' }, exec: () => JSON.stringify({ id, key: 'LINKEDIN_ACCESS_TOKEN', value: 'secret', projectId: id }) };
  assert.throws(() => loadBoundSecrets(config, ['LINKEDIN_ACCESS_TOKEN'], options), /binding mismatch/);
  options.exec = () => { throw new Error('accidental-secret-output'); };
  assert.throws(() => loadBoundSecrets(config, ['LINKEDIN_ACCESS_TOKEN'], options), e => !e.message.includes('accidental-secret-output') && /Could not read/.test(e.message));
});

test('Keychain bootstrap stays captured and credential bindings reject unknown env keys', () => {
  const calls = [];
  loadBoundSecrets(config, ['LINKEDIN_ACCESS_TOKEN'], { env: {}, exec(command, args, options) {
    calls.push(command);
    if (command === '/usr/bin/security') { assert.equal(options.stdio[1], 'pipe'); return 'machine-secret\n'; }
    assert.equal(options.env.BWS_ACCESS_TOKEN, 'machine-secret');
    return JSON.stringify({ id, key: 'LINKEDIN_ACCESS_TOKEN', value: 'secret', project_id: projectId });
  } });
  assert.deepEqual(calls, ['/usr/bin/security', 'bws']);
  assert.throws(() => loadBoundSecrets({ ...config, secretIds: { NODE_OPTIONS: id } }, []), /Unsupported/);
});

test('LinkedIn verification checks active scope and exact identity without posting', async () => {
  const values = { LINKEDIN_ACCESS_TOKEN: 'secret', LINKEDIN_PUBLISHING_ACTOR: 'urn:li:person:person123', LINKEDIN_CLIENT_ID: 'client', LINKEDIN_CLIENT_SECRET: 'client-secret' };
  const calls = [];
  let person = 'person123';
  let active = true;
  const fetchImpl = async (url, options) => {
    calls.push([url, options.method || 'GET']);
    return { ok: true, json: async () => url.endsWith('introspectToken')
      ? { active, client_id: 'client', scope: 'openid,profile,w_member_social', expires_at: Math.floor(Date.now()/1000)+3600 }
      : { sub: person, name: 'Example' } };
  };
  const result = await verifyLinkedIn(values, { expectedActor: values.LINKEDIN_PUBLISHING_ACTOR, fetchImpl });
  assert.equal(result.verified, true); assert.equal(result.posted, false);
  assert.deepEqual(calls, [['https://www.linkedin.com/oauth/v2/introspectToken','POST'], ['https://api.linkedin.com/v2/userinfo','GET']]);
  person = 'other';
  await assert.rejects(verifyLinkedIn(values, { expectedActor: values.LINKEDIN_PUBLISHING_ACTOR, fetchImpl }), /different person/);
  active = false;
  await assert.rejects(verifyLinkedIn(values, { expectedActor: values.LINKEDIN_PUBLISHING_ACTOR, fetchImpl }), /inactive/);
});
