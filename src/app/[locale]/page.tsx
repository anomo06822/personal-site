import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecruiterHome } from "@/components/recruiter-home";
import { getHomeContent } from "@/lib/home";
import { getPublishedPosts } from "@/lib/posts";
import { getPersonalProjects, getResume } from "@/lib/resume";
import { getRouteHref, isLocale, siteConfig } from "@/lib/site";

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
    title: locale === "zh-TW" ? "入口" : "Start",
    description: siteConfig.siteDescription[locale],
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const home = getHomeContent(locale);
  const projects = getPersonalProjects(locale);
  const posts = getPublishedPosts(locale);
  const resume = getResume(locale);

  return (
    <RecruiterHome
      locale={locale}
      home={home}
      featuredProjects={projects.slice(0, 2)}
      totalProjectCount={projects.length}
      featuredPosts={posts.slice(0, 2)}
      totalPostCount={posts.length}
      resumeHighlights={resume.highlights.slice(0, 3)}
      routeHrefs={{
        home: getRouteHref(locale, "home"),
        projects: getRouteHref(locale, "projects"),
        resume: getRouteHref(locale, "resume"),
        blog: getRouteHref(locale, "blog"),
        contact: getRouteHref(locale, "contact"),
      }}
    />
  );
}
