#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSocialManifest } from "./lib/social-manifest.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const postsRoot = path.join(rootDir, "content", "posts");
const defaultOutputPath = path.join(rootDir, "out", "social", "social-manifest.json");
const siteUrl = "https://anomo06822.github.io/personal-site";
const basePath = "/personal-site";

function resolveOutputPath() {
  const rawArg = process.argv[2]?.trim();
  if (!rawArg) {
    return defaultOutputPath;
  }

  return path.isAbsolute(rawArg)
    ? rawArg
    : path.resolve(process.cwd(), rawArg);
}

async function main() {
  const outputPath = resolveOutputPath();
  const manifest = buildSocialManifest({
    postsRoot,
    siteUrl,
    basePath,
  });

  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`Social manifest written to ${outputPath}`);
  console.log(`Published articles: ${manifest.articles.length}`);
  console.log(`Article groups: ${manifest.articleGroups.length}`);

  if (manifest.warnings.length > 0) {
    for (const warning of manifest.warnings) {
      console.warn(`Warning: ${warning}`);
    }
  }
}

await main();
