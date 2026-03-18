import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPublishedPostParams,
  getAlternatePostByArticleId,
  getPostBySlug,
  getPostMetaBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import {
  getAbsoluteSiteUrl,
  getAlternateLocale,
  getBlogSocialImagePath,
  getRouteHref,
  isLocale,
  siteCopy,
} from "@/lib/site";
import {
  formatPostTagLabel,
  getVisiblePostTags,
  PostSignalBadges,
} from "@/components/post-signals";
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

  const alternateLocale = getAlternateLocale(locale);
  const alternatePost = getAlternatePostByArticleId(post.articleId, alternateLocale);
  const canonicalUrl = getAbsoluteSiteUrl(getRouteHref(locale, "blog", post.slug));
  const socialImageUrl = getAbsoluteSiteUrl(getBlogSocialImagePath(locale, post.slug, post.heroImagePath));

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatePost
        ? {
            [alternatePost.locale]: getAbsoluteSiteUrl(
              getRouteHref(alternatePost.locale, "blog", alternatePost.slug),
            ),
          }
        : undefined,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonicalUrl,
      images: [{ url: socialImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [socialImageUrl],
    },
    other: {
      "ps:article-id": post.articleId,
      "ps:locale": locale,
    },
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

  const relatedPosts = getRelatedPosts(locale, post.meta.articleId, 3);
  const canonicalUrl = getAbsoluteSiteUrl(getRouteHref(locale, "blog", post.meta.slug));
  const socialImageUrl = getAbsoluteSiteUrl(
    getBlogSocialImagePath(locale, post.meta.slug, post.meta.heroImagePath),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.publishedAt,
    dateModified: post.meta.publishedAt,
    inLanguage: locale,
    mainEntityOfPage: canonicalUrl,
    image: [socialImageUrl],
    keywords: post.meta.tags,
    author: {
      "@type": "Person",
      name: "Jarvis Huang",
    },
    publisher: {
      "@type": "Person",
      name: "Jarvis Huang",
    },
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          <span className="tag-chip">{post.meta.contentType}</span>
          <PostSignalBadges locale={locale} post={post.meta} />
          {getVisiblePostTags(post.meta).map((tag) => (
            <span key={tag} className="tag-chip">
              {formatPostTagLabel(tag)}
            </span>
          ))}
        </div>
        {post.meta.aiGenerated ? (
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-muted">
            {copy.blog.aiGeneratedNote}
          </p>
        ) : null}
      </section>

      <section className="card-surface p-7 sm:p-8">
        <div className="prose-article">{post.content}</div>
      </section>

      <section className="subtle-panel p-6 sm:p-7">
        <div className="space-y-6">
          <div className="eyebrow">{copy.blog.endCtaTitle}</div>
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {copy.blog.endCtaBody}
          </p>
          {relatedPosts.length ? (
            <div className="grid gap-3 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.articleId}
                  href={getRouteHref(locale, "blog", relatedPost.slug)}
                  className="rounded-[1.75rem] border border-line/80 bg-panel-strong/80 p-5 transition hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="eyebrow text-accent">{copy.blog.relatedPostsTitle}</div>
                  <h2 className="mt-3 text-lg font-semibold tracking-tight text-ink">
                    {relatedPost.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-ink-muted">
                    {relatedPost.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <Link
              href={getRouteHref(locale, "blog")}
              className="inline-flex min-h-11 items-center rounded-full border border-accent/50 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/70"
            >
              {copy.common.backToBlog}
            </Link>
            <Link
              href={getRouteHref(locale, "resume")}
              className="inline-flex min-h-11 items-center rounded-full border border-line-strong/80 px-5 text-sm text-ink-muted transition hover:border-accent/40 hover:text-ink"
            >
              {copy.blog.resumeSecondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
