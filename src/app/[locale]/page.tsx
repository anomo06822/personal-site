import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImpactRibbon } from "@/components/impact-ribbon";
import { getFeaturedPosts } from "@/lib/posts";
import { getResume } from "@/lib/resume";
import { getRouteHref, isLocale, siteConfig, siteCopy } from "@/lib/site";
import { formatMonthYear } from "@/lib/utils";

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

function getHomeCopy(locale: "zh-TW" | "en") {
  return locale === "zh-TW"
    ? {
        selectedExperienceIntro:
          "兩段最能代表後端、平台與交付領導經驗的經歷預覽。",
        latestWritingIntro:
          "最近的技術文章，聚焦架構、可維運性與工程交付。",
      }
    : {
        selectedExperienceIntro:
          "Two role previews that best represent backend, platform, and delivery leadership.",
        latestWritingIntro:
          "Recent writing focused on architecture, operability, and engineering delivery.",
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

  const copy = siteCopy[locale];
  const localCopy = getHomeCopy(locale);
  const resume = getResume(locale);
  const posts = getFeaturedPosts(locale, 2);
  const featuredExperiences = resume.experiences.slice(0, 2);

  return (
    <div className="space-y-14">
      <section className="space-y-8 border-b border-line/80 pb-10">
        <div className="space-y-4">
          <div className="eyebrow">{copy.home.eyebrow}</div>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {copy.home.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-ink">
            {resume.about[0]}
          </p>
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {copy.home.intro}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {resume.positioning.openToRoles.map((role) => (
            <span key={role} className="tag-chip tag-chip-active">
              {role}
            </span>
          ))}
        </div>

        <ImpactRibbon items={resume.highlights} compact />

        <div className="flex flex-wrap gap-3">
          <Link
            href={getRouteHref(locale, "resume")}
            className="inline-flex min-h-11 items-center rounded-full border border-accent/50 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/70"
          >
            {copy.home.resumeCta}
          </Link>
          <Link
            href={getRouteHref(locale, "blog")}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-canvas-elevated/70 px-5 text-sm text-ink transition hover:border-accent/60"
          >
            {copy.home.blogCta}
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow">{copy.home.featuredExperienceTitle}</div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              {copy.home.featuredExperienceTitle}
            </h2>
            <Link
              href={getRouteHref(locale, "resume")}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
            >
              {copy.common.viewAll}
            </Link>
          </div>
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {localCopy.selectedExperienceIntro}
          </p>
        </div>

        <div className="space-y-4">
          {featuredExperiences.slice(0, 2).map((experience) => (
            <article key={experience.company + experience.period} className="card-surface p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="space-y-2">
                  <div className="eyebrow">{experience.period}</div>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">
                    {experience.role}
                  </h3>
                  <div className="text-sm leading-7 text-ink-muted">
                    {experience.company}
                    <br />
                    {experience.location}
                  </div>
                </div>

                <div className="space-y-4 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                  <p className="text-sm leading-7 text-ink-muted">
                    {experience.impactBullets[0]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {experience.keywords.slice(0, 5).map((keyword) => (
                      <span key={keyword} className="tag-chip">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow">{copy.home.latestPostsTitle}</div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              {copy.home.latestPostsTitle}
            </h2>
            <Link
              href={getRouteHref(locale, "blog")}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
            >
              {copy.common.viewAll}
            </Link>
          </div>
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {localCopy.latestWritingIntro}
          </p>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={getRouteHref(locale, "blog", post.slug)}
              className="subtle-panel block p-5 transition hover:border-accent/50 hover:bg-panel-strong"
            >
              <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start">
                <div className="space-y-2 text-sm leading-7 text-ink-muted">
                  <div className="eyebrow">
                    {formatMonthYear(locale, post.publishedAt)}
                  </div>
                  <div>
                    {post.readingTime} {copy.common.readTime}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">
                    {post.title}
                  </h3>
                  <p className="max-w-3xl text-base leading-8 text-ink-muted">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
