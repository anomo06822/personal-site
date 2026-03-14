import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPublishedPostParams, getPostBySlug, getPostMetaBySlug } from "@/lib/posts";
import { getRouteHref, isLocale, siteCopy } from "@/lib/site";
import { formatLongDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPublishedPostParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const post = getPostMetaBySlug(locale, slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale];
  const post = await getPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <section className="card-surface p-7 sm:p-8">
        <Link
          href={getRouteHref(locale, "blog")}
          className="eyebrow text-accent"
        >
          {copy.common.backToBlog}
        </Link>
        <div className="mt-5 space-y-4">
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {post.meta.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-ink-muted">
            {post.meta.description}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          <span>{formatLongDate(locale, post.meta.publishedAt)}</span>
          <span className="h-1 w-1 rounded-full bg-line-strong" />
          <span>
            {post.meta.readingTime} {copy.common.readTime}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.meta.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="card-surface p-7 sm:p-8">
        <div className="prose-article">{post.content}</div>
      </section>
    </article>
  );
}
