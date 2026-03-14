import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { getRouteHref, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = siteConfig.locales.flatMap((locale) => [
    {
      url: `${siteConfig.siteUrl}${getRouteHref(locale, "home")}`,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}${getRouteHref(locale, "resume")}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.siteUrl}${getRouteHref(locale, "blog")}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.siteUrl}${getRouteHref(locale, "contact")}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  const postRoutes = siteConfig.locales.flatMap((locale) =>
    getPublishedPosts(locale).map((post) => ({
      url: `${siteConfig.siteUrl}${getRouteHref(locale, "blog", post.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...postRoutes];
}
