import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DEFAULT_LOCALES = ["zh-TW", "en"];

function requireString(value, fieldName, fallback) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (typeof fallback === "string" && fallback.trim().length > 0) {
    return fallback.trim();
  }

  throw new Error(`Expected non-empty string for ${fieldName}.`);
}

function normalizeDate(value) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  throw new Error("Expected valid publishedAt date.");
}

function normalizeTags(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry) => typeof entry === "string" && entry.trim().length > 0);
}

function stripMarkdownInline(value) {
  return value
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    .replace(/<[^>]+>/g, " ");
}

function joinCanonicalUrl({ siteUrl, basePath, pathname }) {
  const normalizedSiteUrl = requireString(siteUrl, "siteUrl").replace(/\/+$/, "");
  const normalizedBasePath = basePath?.trim().replace(/\/+$/, "") || "";
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (!normalizedBasePath) {
    return `${normalizedSiteUrl}${normalizedPathname}`.replace(/([^:]\/)\/+/g, "$1");
  }

  const siteUrlEndsWithBasePath = normalizedSiteUrl === normalizedBasePath
    || normalizedSiteUrl.endsWith(normalizedBasePath);
  const effectiveBasePath = siteUrlEndsWithBasePath ? "" : normalizedBasePath;

  return `${normalizedSiteUrl}${effectiveBasePath}${normalizedPathname}`.replace(/([^:]\/)\/+/g, "$1");
}

export function extractExcerpt(source) {
  const withoutFrontmatter = source.replace(/^---[\s\S]*?---\s*/, "");
  const blocks = withoutFrontmatter
    .split(/\n\s*\n/g)
    .map((block) => block.trim())
    .filter(Boolean);

  for (const block of blocks) {
    if (
      block.startsWith("#")
      || block.startsWith("- ")
      || block.startsWith("* ")
      || block.startsWith("> ")
      || block.startsWith("```")
    ) {
      continue;
    }

    const normalized = stripMarkdownInline(block)
      .replace(/\s+/g, " ")
      .trim();

    if (normalized.length > 0) {
      return normalized;
    }
  }

  return "";
}

export function parsePostFile({ locale, fileName, source, siteUrl, basePath }) {
  const { data } = matter(source);
  const slugFromFile = fileName.replace(/\.mdx$/, "");
  const slug = requireString(data.slug, "slug", slugFromFile);
  const articleId = requireString(data.articleId, "articleId", slug);
  const declaredLocale = requireString(data.locale, "locale", locale);

  if (declaredLocale !== locale) {
    throw new Error(`Post ${fileName} declares locale ${declaredLocale} but is stored in ${locale}.`);
  }

  const canonicalPath = `/${locale}/blog/${slug}/`;

  return {
    articleId,
    locale,
    slug,
    title: requireString(data.title, "title"),
    description: requireString(data.description, "description"),
    contentType: data.contentType === "news-analysis" ? "news-analysis" : "pillar",
    excerpt: extractExcerpt(source),
    publishedAt: normalizeDate(data.publishedAt),
    tags: normalizeTags(data.tags),
    canonicalUrl: joinCanonicalUrl({
      siteUrl,
      basePath,
      pathname: canonicalPath,
    }),
    published: Boolean(data.published),
  };
}

export function buildArticleGroups(articles, locales = DEFAULT_LOCALES) {
  const warnings = [];
  const groups = new Map();

  for (const article of articles) {
    const current = groups.get(article.articleId) ?? {
      articleId: article.articleId,
      publishedAt: article.publishedAt,
      locales: [],
      tags: new Set(),
      titleByLocale: {},
      descriptionByLocale: {},
      excerptByLocale: {},
      canonicalUrlByLocale: {},
    };

    current.locales.push(article.locale);
    current.titleByLocale[article.locale] = article.title;
    current.descriptionByLocale[article.locale] = article.description;
    current.excerptByLocale[article.locale] = article.excerpt;
    current.canonicalUrlByLocale[article.locale] = article.canonicalUrl;
    for (const tag of article.tags) {
      current.tags.add(tag);
    }

    if (article.publishedAt > current.publishedAt) {
      current.publishedAt = article.publishedAt;
    }

    groups.set(article.articleId, current);
  }

  const sortedGroups = Array.from(groups.values())
    .map((group) => {
      const availableLocales = Array.from(new Set(group.locales)).sort((left, right) => left.localeCompare(right));
      const missingLocales = locales.filter((locale) => !availableLocales.includes(locale));

      if (missingLocales.length > 0) {
        warnings.push(`articleId=${group.articleId} missing locale(s): ${missingLocales.join(", ")}`);
      }

      return {
        articleId: group.articleId,
        publishedAt: group.publishedAt,
        locales: availableLocales,
        tags: Array.from(group.tags.values()).sort((left, right) => left.localeCompare(right)),
        contentType: group.locales
          .map((locale) => group.titleByLocale[locale] ? locale : null)
          .filter(Boolean).length > 0
          ? articles.find((article) => article.articleId === group.articleId)?.contentType ?? "pillar"
          : "pillar",
        titleByLocale: group.titleByLocale,
        descriptionByLocale: group.descriptionByLocale,
        excerptByLocale: group.excerptByLocale,
        canonicalUrlByLocale: group.canonicalUrlByLocale,
      };
    })
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt) || left.articleId.localeCompare(right.articleId));

  return {
    groups: sortedGroups,
    warnings,
  };
}

export function buildSocialManifest({
  postsRoot,
  siteUrl,
  basePath,
  locales = DEFAULT_LOCALES,
}) {
  const entries = [];

  for (const locale of locales) {
    const localeDir = path.join(postsRoot, locale);

    if (!fs.existsSync(localeDir)) {
      continue;
    }

    const files = fs.readdirSync(localeDir).filter((fileName) => fileName.endsWith(".mdx"));

    for (const fileName of files) {
      const source = fs.readFileSync(path.join(localeDir, fileName), "utf8");
      const entry = parsePostFile({
        locale,
        fileName,
        source,
        siteUrl,
        basePath,
      });

      if (entry.published) {
        entries.push(entry);
      }
    }
  }

  entries.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt) || left.locale.localeCompare(right.locale) || left.slug.localeCompare(right.slug));

  const { groups, warnings } = buildArticleGroups(entries, locales);

  return {
    schemaVersion: 1,
    generatedAtUtc: new Date().toISOString(),
    sourceSystem: "personal-site",
    siteUrl,
    locales,
    articles: entries,
    articleGroups: groups,
    warnings,
  };
}
