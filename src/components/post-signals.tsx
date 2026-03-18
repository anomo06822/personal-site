import { siteCopy } from "@/lib/site";
import type { BlogPostMeta, Locale } from "@/lib/types";

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

export function isTechNewsPost(post: Pick<BlogPostMeta, "tags">) {
  return post.tags.some((tag) => normalizeTag(tag) === "tech-news");
}

export function getVisiblePostTags(post: Pick<BlogPostMeta, "tags">) {
  return post.tags.filter((tag) => normalizeTag(tag) !== "tech-news");
}

export function formatPostTagLabel(tag: string) {
  const normalized = normalizeTag(tag);
  if (normalized === "tech-news") return "Tech News";
  if (normalized === "zh-tw") return "ZH-TW";
  if (normalized === ".net") return ".NET";
  if (normalized === "next.js") return "Next.js";
  return tag;
}

export function PostSignalBadges({
  locale,
  post
}: {
  locale: Locale;
  post: Pick<BlogPostMeta, "tags" | "aiGenerated">;
}) {
  const copy = siteCopy[locale];

  return (
    <>
      {isTechNewsPost(post) ? (
        <span className="rounded-full border border-accent/40 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          {copy.blog.techNewsLabel}
        </span>
      ) : null}
      {post.aiGenerated ? (
        <span className="rounded-full border border-line-strong/70 bg-canvas-elevated/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          {copy.blog.aiGeneratedLabel}
        </span>
      ) : null}
    </>
  );
}
