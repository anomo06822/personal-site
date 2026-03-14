import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogFilter } from "@/components/blog-filter";
import { getPublishedPosts } from "@/lib/posts";
import { isLocale, siteConfig, siteCopy } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: locale === "zh-TW" ? "技術文章" : "Writing",
    description: siteConfig.siteDescription[locale],
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale];
  const posts = getPublishedPosts(locale);
  const buildTimestamp = new Date().toISOString();

  return (
    <div className="space-y-8">
      <section className="space-y-6 border-b border-line/80 pb-10">
        <div className="space-y-4">
          <div className="eyebrow">{copy.blog.eyebrow}</div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {copy.blog.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-ink-muted">
            {copy.blog.intro}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          {copy.blog.listTitle}
        </h2>

        <BlogFilter
          locale={locale}
          posts={posts}
          allTopicsLabel={copy.blog.allTopics}
          emptyState={copy.blog.emptyState}
          readTimeLabel={copy.common.readTime}
          newBadgeLabel={copy.blog.newBadgeLabel}
          buildTimestamp={buildTimestamp}
        />
      </section>
    </div>
  );
}
