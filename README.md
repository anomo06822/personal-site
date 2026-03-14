# Jarvis Personal Site

Next.js App Router site for a bilingual personal resume and technical blog, designed for GitHub Pages static hosting.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- MDX content rendered at build time

## Local Development

```bash
pnpm install
pnpm dev
```

With `basePath` enabled for GitHub Pages, open:

```text
http://localhost:3000/personal-site/
```

## Commands

```bash
pnpm dev
pnpm build
pnpm build:release
pnpm lint
pnpm typecheck
```

To generate the downloadable resume PDFs locally, install Chromium once:

```bash
pnpm exec playwright install chromium
pnpm build:release
```

## Content Structure

- `content/resume/zh-TW.ts`: Chinese resume content
- `content/resume/en.ts`: English resume content
- `content/posts/zh-TW/*.mdx`: Chinese blog posts
- `content/posts/en/*.mdx`: English blog posts
- `content/site/links.ts`: public contact links

## Deployment

This project is configured for GitHub Pages project-site deployment at:

```text
https://anomo06822.github.io/personal-site/
```

The included GitHub Actions workflow publishes the static `out/` directory to Pages.

`pnpm build:release` also generates:

- `out/downloads/jarvis-huang-resume-en.pdf`
- `out/downloads/jarvis-huang-resume-zh-tw.pdf`
