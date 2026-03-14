import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecruiterHome } from "@/components/recruiter-home";
import { getHomeContent } from "@/lib/home";
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
    title: locale === "zh-TW" ? "概覽" : "Overview",
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

  return (
    <RecruiterHome
      home={home}
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
