# Jarvis Personal Site

Next.js App Router site for a bilingual personal experience page and technical blog, designed for GitHub Pages static hosting.

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
pnpm generate-public-profile-stats
pnpm export-social-manifest
pnpm lint
pnpm typecheck
```

## Public Profile Evidence

The personal experience page includes a build-time evidence module for GitHub and LeetCode. The build generates `content/generated/public-profile-stats.json` before `next build`, so the exported site stays fully static.

### Environment Variables

- `GITHUB_PROFILE_STATS_USERNAME`: GitHub username to fetch. Defaults to `anomo06822` when unset.
- `GITHUB_PROFILE_STATS_TOKEN`: Optional GitHub token for GraphQL contribution calendar access. When missing, the build falls back to parsing the public GitHub profile page.
- `LEETCODE_USERNAME`: Optional LeetCode username. When missing or the request fails, the build writes a fallback payload and the site renders an unavailable state instead of failing.

### Local Usage

```bash
pnpm generate-public-profile-stats
pnpm build
```

### GitHub Actions Configuration

- Add `GITHUB_PROFILE_STATS_TOKEN` as a repository secret if you want the GitHub GraphQL path.
- Add `GITHUB_PROFILE_STATS_USERNAME` and `LEETCODE_USERNAME` as repository variables for the Pages deploy workflow.
- None of these values are exposed to the client bundle except the generated public stats JSON.

## GA4 Analytics

This site supports GA4 in a strict pageview-only mode.

- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` at build time to enable analytics.
- The GitHub Pages workflow reads this value from the repository Actions variable `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Analytics only loads on the production hostname and only sends manual `page_view` events for localized content pages.
- Root redirect pages, print pages, form input, outbound links, downloads, and search terms are not tracked.

### Public vs Sensitive GA Data

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` is public by design. It will appear in the client bundle when enabled.
- Do not place GA API secrets, Measurement Protocol secrets, service-account JSON, or any other credential in `public/`, committed files, or client-side env vars.
- In the GA4 Web Data Stream UI, keep Enhanced Measurement disabled so outbound clicks, downloads, search, and form interactions are not auto-collected.

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
- `out/social/social-manifest.json`
