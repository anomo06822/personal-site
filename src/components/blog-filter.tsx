"use client";

import Link from "next/link";
import {
  startTransition,
  useDeferredValue,
  useState,
} from "react";
import { getRouteHref } from "@/lib/site";
import { formatMonthYear } from "@/lib/utils";
import type { BlogPostMeta, Locale } from "@/lib/types";

type BlogFilterProps = {
  locale: Locale;
  posts: BlogPostMeta[];
  allTopicsLabel: string;
  emptyState: string;
  readTimeLabel: string;
};

export function BlogFilter({
  locale,
  posts,
  allTopicsLabel,
  emptyState,
  readTimeLabel,
}: BlogFilterProps) {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort(
    (left, right) => left.localeCompare(right),
  );
  const [activeTag, setActiveTag] = useState("all");
  const deferredTag = useDeferredValue(activeTag);
  const visiblePosts =
    deferredTag === "all"
      ? posts
      : posts.filter((post) => post.tags.includes(deferredTag));

  return (
    <div className="space-y-6">
      <div className="card-surface p-5 sm:p-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => startTransition(() => setActiveTag("all"))}
            className={`tag-chip ${activeTag === "all" ? "tag-chip-active" : ""}`}
          >
            {allTopicsLabel}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => startTransition(() => setActiveTag(tag))}
              className={`tag-chip ${activeTag === tag ? "tag-chip-active" : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="card-surface p-8 text-base text-ink-muted">
          {emptyState}
        </div>
      ) : (
        <div className="grid gap-5">
          {visiblePosts.map((post) => (
            <Link
              key={`${post.locale}-${post.slug}`}
              href={getRouteHref(locale, "blog", post.slug)}
              className="card-surface grid gap-5 p-6 transition hover:-translate-y-1 hover:border-accent/50 hover:bg-panel-strong/90 lg:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="space-y-4 border-b border-line pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
                <div className="eyebrow">
                  {formatMonthYear(locale, post.publishedAt)}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink">
                  {post.title}
                </h2>
                <p className="text-sm leading-7 text-ink-muted">
                  {post.description}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-ink-muted">
                  <span>
                    {post.readingTime} {readTimeLabel}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                    Open /
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
