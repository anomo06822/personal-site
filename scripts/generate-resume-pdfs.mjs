#!/usr/bin/env node

import { createServer } from "node:http";
import net from "node:net";
import { readFile, mkdir, rm, cp, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "out");
const previewRoot = path.join(rootDir, ".preview");
const mountedPreviewDir = path.join(previewRoot, "personal-site");
const manifestPath = path.join(rootDir, "content", "resume", "pdf-manifest.json");
const preferredPort = Number(process.env.RESUME_PDF_PORT || 4321);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

async function preparePreviewRoot() {
  await rm(mountedPreviewDir, { recursive: true, force: true });
  await mkdir(previewRoot, { recursive: true });
  await cp(outDir, mountedPreviewDir, { recursive: true });
}

async function resolveFilePath(rootPath, requestPath) {
  const normalizedPath = requestPath.endsWith("/")
    ? `${requestPath}index.html`
    : requestPath;
  const candidate = path.normalize(path.join(rootPath, `.${normalizedPath}`));

  if (!candidate.startsWith(rootPath)) {
    return null;
  }

  try {
    const fileStat = await stat(candidate);
    if (fileStat.isDirectory()) {
      return path.join(candidate, "index.html");
    }

    return candidate;
  } catch {
    return null;
  }
}

function startStaticServer(rootPath, listenPort) {
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const filePath = await resolveFilePath(rootPath, requestUrl.pathname);

      if (!filePath) {
        response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      const file = await readFile(filePath);
      const contentType =
        contentTypes.get(path.extname(filePath).toLowerCase()) ||
        "application/octet-stream";

      response.writeHead(200, { "content-type": contentType });
      response.end(file);
    } catch (error) {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end(
        error instanceof Error ? error.message : "Unexpected server error",
      );
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(listenPort, "127.0.0.1", () => {
      resolve(server);
    });
  });
}

async function canListenOnPort(listenPort) {
  return new Promise((resolve) => {
    const probe = net.createServer();

    probe.once("error", () => {
      resolve(false);
    });

    probe.listen(listenPort, "127.0.0.1", () => {
      probe.close(() => {
        resolve(true);
      });
    });
  });
}

async function resolveListenPort() {
  if (await canListenOnPort(preferredPort)) {
    return preferredPort;
  }

  return new Promise((resolve, reject) => {
    const probe = net.createServer();

    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      const resolvedPort =
        typeof address === "object" && address ? address.port : preferredPort;

      probe.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(resolvedPort);
      });
    });
  });
}

async function waitForPageReady(page) {
  await page.locator("[data-pdf-ready='true']").waitFor({ state: "visible" });
  await page.evaluate(async () => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
    await document.fonts.ready;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
}

async function main() {
  const outStat = await stat(outDir).catch(() => null);
  if (!outStat?.isDirectory()) {
    throw new Error("Static export directory ./out was not found. Run `pnpm build` first.");
  }

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  await mkdir(path.join(outDir, "downloads"), { recursive: true });
  await preparePreviewRoot();

  const port = await resolveListenPort();
  const server = await startStaticServer(previewRoot, port);
  const browser = await chromium.launch();

  try {
    for (const [locale, config] of Object.entries(manifest)) {
      const page = await browser.newPage({
        viewport: { width: 1400, height: 1800 },
      });

      try {
        const encodedLocale = encodeURIComponent(locale);
        const pdfPath = path.join(outDir, "downloads", config.fileName);
        const url = `http://127.0.0.1:${port}/personal-site/print/${encodedLocale}/resume/`;

        await page.emulateMedia({ media: "print", colorScheme: "light" });
        await page.goto(url, { waitUntil: "networkidle" });
        await waitForPageReady(page);
        await page.pdf({
          path: pdfPath,
          format: "A4",
          preferCSSPageSize: true,
          printBackground: true,
          scale: 0.95,
        });
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

await main();
