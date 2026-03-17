import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdx-components";
import {
  locales,
  type BlogPost,
  type BlogPostFrontmatter,
  type BlogPostMeta,
  type Locale,
} from "./types";
import { estimateReadingTime, sortByPublishedAtDesc } from "./utils";

const postsRoot = path.join(process.cwd(), "content", "posts");

type ParsedPostFile = {
  meta: BlogPostMeta;
  source: string;
};

function requireString(value: unknown, fallback?: string) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (fallback) {
    return fallback;
  }

  throw new Error("Expected a non-empty string in post frontmatter.");
}

function requireDateString(value: unknown) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  throw new Error("Expected a valid date value in post frontmatter.");
}

function parseTags(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is string => typeof entry === "string");
}

function parseContentType(value: unknown): BlogPostMeta["contentType"] {
  return value === "news-analysis" ? "news-analysis" : "pillar";
}

const readLocalePosts = cache((locale: Locale): ParsedPostFile[] => {
  const localeDir = path.join(postsRoot, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs
    .readdirSync(localeDir)
    .filter((fileName) => fileName.endsWith(".mdx"));

  const parsed = files.map((fileName) => {
    const source = fs.readFileSync(path.join(localeDir, fileName), "utf8");
    const { data } = matter(source);
    const frontmatter = data as Partial<BlogPostFrontmatter>;
    const slugFromFile = fileName.replace(/\.mdx$/, "");
    const slug = requireString(frontmatter.slug, slugFromFile);
    const declaredLocale = frontmatter.locale ?? locale;

    if (declaredLocale !== locale) {
      throw new Error(
        `Post ${fileName} declares locale ${String(declaredLocale)} but lives in ${locale}.`,
      );
    }

    return {
      meta: {
        articleId: requireString(frontmatter.articleId, slug),
        slug,
        locale,
        title: requireString(frontmatter.title),
        description: requireString(frontmatter.description),
        publishedAt: requireDateString(frontmatter.publishedAt),
        contentType: parseContentType(frontmatter.contentType),
        tags: parseTags(frontmatter.tags),
        readingTime: estimateReadingTime(source),
        published: frontmatter.published ?? false,
      },
      source,
    };
  });

  return sortByPublishedAtDesc(parsed.map((entry) => entry.meta)).map(
    (meta) => parsed.find((entry) => entry.meta.slug === meta.slug)!,
  );
});

export const getPublishedPosts = cache((locale: Locale) =>
  readLocalePosts(locale)
    .map((entry) => entry.meta)
    .filter((post) => post.published),
);

export const getFeaturedPosts = cache((locale: Locale, count = 2) =>
  getPublishedPosts(locale).slice(0, count),
);

export const getPostMetaBySlug = cache((locale: Locale, slug: string) =>
  readLocalePosts(locale)
    .map((entry) => entry.meta)
    .find((entry) => entry.slug === slug && entry.published) ?? null,
);

export async function getPostBySlug(
  locale: Locale,
  slug: string,
): Promise<BlogPost | null> {
  const file = readLocalePosts(locale).find(
    (entry) => entry.meta.slug === slug && entry.meta.published,
  );

  if (!file) {
    return null;
  }

  const { content } = await compileMDX<BlogPostFrontmatter>({
    source: file.source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    meta: file.meta,
    content,
  };
}

export function getAllPublishedPostParams() {
  return locales.flatMap((locale) =>
    getPublishedPosts(locale).map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export const getAvailableTags = cache((locale: Locale) => {
  const tags = new Set<string>();

  getPublishedPosts(locale).forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags.values()).sort((left, right) =>
    left.localeCompare(right),
  );
});

export const getAvailableContentTypes = cache((locale: Locale) =>
  Array.from(new Set(getPublishedPosts(locale).map((post) => post.contentType))).sort(),
);

export const getAlternatePostByArticleId = cache(
  (articleId: string, locale: Locale) =>
    getPublishedPosts(locale).find((post) => post.articleId === articleId) ?? null,
);

export const getRelatedPosts = cache(
  (locale: Locale, articleId: string, count = 3) => {
    const current = getPublishedPosts(locale).find((post) => post.articleId === articleId);

    if (!current) {
      return [];
    }

    return getPublishedPosts(locale)
      .filter((post) => post.articleId !== articleId)
      .map((post) => {
        const sharedTags = post.tags.filter((tag) => current.tags.includes(tag)).length;
        const sameTypeBonus = post.contentType === current.contentType ? 2 : 0;
        return {
          post,
          score: sharedTags * 3 + sameTypeBonus,
        };
      })
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }

        return (
          new Date(right.post.publishedAt).getTime() -
          new Date(left.post.publishedAt).getTime()
        );
      })
      .slice(0, count)
      .map((entry) => entry.post);
  },
);
