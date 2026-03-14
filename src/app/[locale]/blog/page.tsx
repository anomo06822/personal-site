import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogFilter } from "@/components/blog-filter";
import { PageHero } from "@/components/page-hero";
import { getPublishedPosts } from "@/lib/posts";
import { getRouteHref, isLocale, siteConfig, siteCopy } from "@/lib/site";

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
    title: "Blog",
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

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow={copy.blog.eyebrow}
        title={copy.blog.title}
        intro={copy.blog.intro}
        asideTitle={copy.common.relatedTopics}
        asideItems={[
          "Architecture",
          "Operability",
          "Delivery",
          "Azure",
          "Platform Design",
        ]}
        ctas={[
          { href: getRouteHref(locale, "resume"), label: copy.home.resumeCta, variant: "secondary" },
          { href: getRouteHref(locale, "contact"), label: copy.common.contactCta },
        ]}
      />

      <BlogFilter
        locale={locale}
        posts={posts}
        allTopicsLabel={copy.blog.allTopics}
        emptyState={copy.blog.emptyState}
        readTimeLabel={copy.common.readTime}
      />
    </div>
  );
}
