"use client";

import Link from "next/link";
import {
  startTransition,
  useDeferredValue,
  useState,
} from "react";
import { getRouteHref } from "@/lib/site";
import {
  formatLongDate,
  groupItemsByMonth,
  isRecentPost,
} from "@/lib/utils";
import type { BlogPostMeta, Locale } from "@/lib/types";
import {
  formatPostTagLabel,
  getVisiblePostTags,
  PostSignalBadges,
} from "@/components/post-signals";

type BlogFilterProps = {
  locale: Locale;
  posts: BlogPostMeta[];
  allTopicsLabel: string;
  allFormatsLabel: string;
  contentTypeLabels: Record<BlogPostMeta["contentType"], string>;
  emptyState: string;
  readTimeLabel: string;
  newBadgeLabel: string;
  buildTimestamp: string;
};

export function BlogFilter({
  locale,
  posts,
  allTopicsLabel,
  allFormatsLabel,
  contentTypeLabels,
  emptyState,
  readTimeLabel,
  newBadgeLabel,
  buildTimestamp,
}: BlogFilterProps) {
  const contentTypes = Array.from(new Set(posts.map((post) => post.contentType)));
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort(
    (left, right) => left.localeCompare(right),
  );
  const hasTagFilter = tags.length > 0;
  const hasTypeFilter = contentTypes.length > 0;
  const [activeTag, setActiveTag] = useState("all");
  const [activeContentType, setActiveContentType] = useState<"all" | BlogPostMeta["contentType"]>("all");
  const deferredTag = useDeferredValue(activeTag);
  const deferredContentType = useDeferredValue(activeContentType);
  const visiblePosts = posts.filter((post) => {
    const typeMatches = deferredContentType === "all" || post.contentType === deferredContentType;
    const tagMatches = deferredTag === "all" || post.tags.includes(deferredTag);
    return typeMatches && tagMatches;
  });
  const visibleGroups = groupItemsByMonth(locale, visiblePosts);

  return (
    <div className="space-y-8">
      {hasTypeFilter || hasTagFilter ? (
        <div className="card-surface p-5 sm:p-6">
          {hasTypeFilter ? (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => startTransition(() => setActiveContentType("all"))}
                className={`tag-chip ${activeContentType === "all" ? "tag-chip-active" : ""}`}
              >
                {allFormatsLabel}
              </button>
              {contentTypes.map((contentType) => (
                <button
                  key={contentType}
                  type="button"
                  onClick={() => startTransition(() => setActiveContentType(contentType))}
                  className={`tag-chip ${activeContentType === contentType ? "tag-chip-active" : ""}`}
                >
                  {contentTypeLabels[contentType]}
                </button>
              ))}
            </div>
          ) : null}

          {hasTagFilter ? (
            <div className={`${hasTypeFilter ? "mt-4" : ""} flex flex-wrap gap-3`}>
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
                  {formatPostTagLabel(tag)}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {visibleGroups.length === 0 ? (
        <div className="card-surface p-8 text-base text-ink-muted">
          {emptyState}
        </div>
      ) : (
        <div className="space-y-10">
          {visibleGroups.map((group) => (
            <section
              key={group.key}
              className="grid gap-4 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-6"
            >
              <div className="flex items-center justify-between gap-4 lg:items-start lg:pt-2">
                <div className="eyebrow text-accent">{group.label}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
                  {String(group.items.length).padStart(2, "0")}
                </div>
              </div>

              <div className="relative space-y-5 before:absolute before:bottom-4 before:left-[0.41rem] before:top-4 before:w-px before:bg-line-strong/80">
                {group.items.map((post) => {
                  const showNewBadge = isRecentPost(
                    post.publishedAt,
                    buildTimestamp,
                  );

                  return (
                    <Link
                      key={`${post.locale}-${post.slug}`}
                      href={getRouteHref(locale, "blog", post.slug)}
                      className="group relative block pl-6"
                    >
                      <span className="absolute left-0 top-6 h-[14px] w-[14px] rounded-full border-2 border-accent bg-canvas shadow-[0_0_0_6px_color-mix(in_srgb,var(--canvas)_86%,transparent)] transition group-hover:scale-110" />

                      <article className="card-surface p-6 transition group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:bg-panel-strong/90 sm:p-7">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="eyebrow">
                            {formatLongDate(locale, post.publishedAt)}
                          </div>
                          <span className="rounded-full border border-line-strong/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                            {contentTypeLabels[post.contentType]}
                          </span>
                          <PostSignalBadges locale={locale} post={post} />
                          {showNewBadge ? (
                            <span className="rounded-full border border-accent/35 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                              {newBadgeLabel}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div className="max-w-3xl space-y-3">
                            <h2 className="text-2xl font-semibold tracking-tight text-ink">
                              {post.title}
                            </h2>
                            <p className="text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
                              {post.description}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-4 text-sm text-ink-muted lg:pt-1">
                            <span>
                              {post.readingTime} {readTimeLabel}
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                              Open /
                            </span>
                          </div>
                        </div>

                        {getVisiblePostTags(post).length ? (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {getVisiblePostTags(post).map((tag) => (
                              <span key={tag} className="tag-chip">
                                {formatPostTagLabel(tag)}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </article>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
