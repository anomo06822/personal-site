import test from "node:test";
import assert from "node:assert/strict";
import { buildArticleGroups, extractExcerpt, parsePostFile } from "./lib/social-manifest.mjs";

test("extractExcerpt returns the first readable paragraph", () => {
  const source = `---
title: Sample
---

# Heading

- list item

This is the first readable paragraph with **markdown** formatting.

Another paragraph.
`;

  assert.equal(
    extractExcerpt(source),
    "This is the first readable paragraph with markdown formatting.",
  );
});

test("parsePostFile preserves articleId and canonicalUrl", () => {
  const entry = parsePostFile({
    locale: "zh-TW",
    fileName: "sample-post.mdx",
    siteUrl: "https://example.com/site",
    basePath: "/site",
    source: `---
articleId: shared-sample
slug: sample-post
locale: zh-TW
title: Sample
description: Sample description
publishedAt: 2026-03-01
tags:
  - Delivery
published: true
---

Paragraph one.
`,
  });

  assert.equal(entry.articleId, "shared-sample");
  assert.equal(entry.canonicalUrl, "https://example.com/site/zh-TW/blog/sample-post/");
  assert.equal(entry.excerpt, "Paragraph one.");
});

test("buildArticleGroups warns when a locale pair is missing", () => {
  const { groups, warnings } = buildArticleGroups([
    {
      articleId: "shared-sample",
      locale: "zh-TW",
      slug: "sample-post",
      title: "Sample",
      description: "Description",
      excerpt: "Excerpt",
      publishedAt: "2026-03-01",
      tags: ["Delivery"],
      canonicalUrl: "https://example.com/site/zh-TW/blog/sample-post/",
      published: true,
    },
  ]);

  assert.equal(groups.length, 1);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /missing locale/i);
});
