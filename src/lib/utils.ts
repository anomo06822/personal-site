import type { Locale } from "./types";

const localeMap: Record<Locale, string> = {
  "zh-TW": "zh-TW",
  en: "en-US",
};

export function formatLongDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function formatMonthYear(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(localeMap[locale], {
    year: "numeric",
    month: "short",
  }).format(new Date(value));
}

export function estimateReadingTime(source: string) {
  const withoutFrontmatter = source.replace(/^---[\s\S]*?---/, " ");
  const withoutCode = withoutFrontmatter.replace(/```[\s\S]*?```/g, " ");
  const latinWords = withoutCode.split(/\s+/).filter(Boolean).length;
  const cjkChars = (withoutCode.match(/[\u3400-\u9FFF]/g) ?? []).length;
  const byWords = latinWords / 180;
  const byChars = cjkChars / 320;

  return Math.max(1, Math.ceil(Math.max(byWords, byChars)));
}

export function sortByPublishedAtDesc<T extends { publishedAt: string }>(
  items: T[],
) {
  return [...items].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() -
      new Date(left.publishedAt).getTime(),
  );
}

export function stripBasePath(pathname: string, basePath: string) {
  if (pathname.startsWith(basePath)) {
    const stripped = pathname.slice(basePath.length);
    return stripped.length > 0 ? stripped : "/";
  }

  return pathname;
}
