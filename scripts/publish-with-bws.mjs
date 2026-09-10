#!/usr/bin/env node
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateBindings, loadBoundSecrets, publishingKeys, publisherEnvironment, verifyLinkedIn } from './publishing/credentials.mjs';

try {
  const repo = fileURLToPath(new URL('..', import.meta.url));
  const bindingPath = await fs.realpath(process.env.PUBLISHING_CREDENTIALS_FILE ||
    path.join(os.homedir(), '.local/share/personal-site-publishing/credentials.json'));
  if (bindingPath.startsWith(await fs.realpath(repo) + path.sep)) throw new Error('Credential bindings must stay outside the public repository');
  const config = validateBindings(JSON.parse(await fs.readFile(bindingPath, 'utf8')));
  const args = process.argv.slice(2);
  if (args[0] === 'verify-linkedin') {
    if (args.length !== 1) throw new Error('verify-linkedin accepts no additional arguments');
    const values = loadBoundSecrets(config, ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_PUBLISHING_ACTOR', 'LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET']);
    console.log(JSON.stringify(await verifyLinkedIn(values, { expectedActor: config.actor }), null, 2));
  } else {
    const names = publishingKeys.filter(k => config.secretIds[k]);
    if (!names.length) throw new Error('No publishing credential bindings configured');
    const values = loadBoundSecrets(config, names);
    if (values.LINKEDIN_PUBLISHING_ACTOR && values.LINKEDIN_PUBLISHING_ACTOR !== config.actor) {
      throw new Error('LinkedIn actor changed; verify and update the private credential binding');
    }
    const cleanEnv = publisherEnvironment(process.env, values);
    for (const key of Object.keys(process.env)) delete process.env[key];
    Object.assign(process.env, cleanEnv);
    const { main } = await import('./publish.mjs');
    const result = await main(args, repo);
    console.log(JSON.stringify(result, null, 2));
    if (result?.status === 'awaiting-deployment' || result?.status === 'partial') process.exitCode = 2;
  }
} catch (error) {
  // Credential subprocess/API failures are sanitized before reaching this boundary.
  console.error(error.code === 'ENOENT' ? 'Private BWS credential bindings not configured' : error.message);
  process.exitCode = 1;
}
