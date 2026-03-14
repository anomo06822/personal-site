import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecruiterHome } from "@/components/recruiter-home";
import { getHomeContent } from "@/lib/home";
import { getResume } from "@/lib/resume";
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
    title: locale === "zh-TW" ? "概覽" : "Profile",
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
  const resume = getResume(locale);
  const githubHref =
    siteConfig.socialLinks.find((item) => item.icon === "github")?.href ??
    "https://github.com/anomo06822";

  return (
    <RecruiterHome
      home={home}
      resume={resume}
      githubHref={githubHref}
      pathwayHrefs={{
        resume: getRouteHref(locale, "resume"),
        blog: getRouteHref(locale, "blog"),
        contact: getRouteHref(locale, "contact"),
      }}
    />
  );
}
