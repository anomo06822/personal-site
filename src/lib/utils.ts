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

export function getMonthGroupKey(value: string) {
  return value.slice(0, 7);
}

export function groupItemsByMonth<T extends { publishedAt: string }>(
  locale: Locale,
  items: T[],
) {
  return items.reduce<Array<{ key: string; label: string; items: T[] }>>(
    (groups, item) => {
      const key = getMonthGroupKey(item.publishedAt);
      const lastGroup = groups.at(-1);

      if (lastGroup?.key === key) {
        lastGroup.items.push(item);
        return groups;
      }

      groups.push({
        key,
        label: formatMonthYear(locale, item.publishedAt),
        items: [item],
      });

      return groups;
    },
    [],
  );
}

export function isRecentPost(
  publishedAt: string,
  now: string,
  windowDays = 7,
) {
  const published = new Date(`${publishedAt}T00:00:00Z`);
  const current = new Date(now);

  if (Number.isNaN(published.getTime()) || Number.isNaN(current.getTime())) {
    return false;
  }

  const publishedDay = Date.UTC(
    published.getUTCFullYear(),
    published.getUTCMonth(),
    published.getUTCDate(),
  );
  const currentDay = Date.UTC(
    current.getUTCFullYear(),
    current.getUTCMonth(),
    current.getUTCDate(),
  );
  const diffDays = (currentDay - publishedDay) / 86_400_000;

  return diffDays >= 0 && diffDays <= windowDays;
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

export function parseResumePeriod(period: string) {
  const [startLabel, rawEndLabel] = period.split(/\s*-\s*/, 2);
  const normalizedEnd = rawEndLabel?.trim().toLowerCase();
  const isPresent =
    normalizedEnd === "present" ||
    normalizedEnd === "至今" ||
    normalizedEnd === "current";
  const endLabel = rawEndLabel?.trim() || startLabel.trim();

  return {
    startLabel: startLabel.trim(),
    endLabel,
    isPresent,
    rangeLabel: rawEndLabel ? `${startLabel.trim()} - ${endLabel}` : startLabel.trim(),
  };
}
