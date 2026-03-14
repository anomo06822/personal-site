import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { getFeaturedPosts } from "@/lib/posts";
import { getResume } from "@/lib/resume";
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
    title:
      locale === "zh-TW"
        ? "首頁"
        : "Home",
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

  const copy = siteCopy[locale];
  const resume = getResume(locale);
  const posts = getFeaturedPosts(locale, 2);
  const featuredExperiences = resume.experiences.filter(
    (experience) => experience.emphasis === "featured",
  );

  return (
    <div className="space-y-8">
      <PageHero
        eyebrow={copy.home.eyebrow}
        title={copy.home.title}
        intro={copy.home.intro}
        asideTitle={copy.home.focusTitle}
        asideItems={copy.home.focusItems}
        ctas={[
          { href: getRouteHref(locale, "resume"), label: copy.home.resumeCta },
          {
            href: getRouteHref(locale, "blog"),
            label: copy.home.blogCta,
            variant: "secondary",
          },
        ]}
      />

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card-surface p-6 sm:p-7">
          <div className="eyebrow">
            {resume.positioning.targetRoles.slice(0, 2).join(" / ")}
          </div>
          <div className="mt-4 text-2xl font-semibold tracking-tight text-ink">
            {resume.profile.englishName}
          </div>
          <div className="mt-2 text-sm text-ink-muted">
            {resume.profile.locationLabel}
          </div>
          <p className="mt-6 text-base leading-8 text-ink">
            {resume.positioning.valueProposition}
          </p>
          <div className="mt-6 space-y-4 text-base leading-8 text-ink-muted">
            {resume.executiveSummary.slice(0, 1).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {resume.selectedImpact.map((metric) => (
            <div key={metric.label} className="card-surface p-6">
              <div className="font-mono text-sm uppercase tracking-[0.24em] text-accent">
                {metric.value}
              </div>
              <div className="mt-4 text-sm leading-7 text-ink-muted">
                {metric.label}
              </div>
              <div className="mt-3 text-sm leading-7 text-ink-muted/80">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {copy.home.featuredExperienceTitle}
          </h2>
          <Link
            href={getRouteHref(locale, "resume")}
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
          >
            {copy.common.viewAll}
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredExperiences.slice(0, 2).map((experience) => (
            <article key={experience.company + experience.period} className="card-surface p-6 sm:p-7">
              <div className="eyebrow">{experience.period}</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                {experience.role}
              </h3>
              <div className="mt-2 text-sm text-ink-muted">
                {experience.company} / {experience.location}
              </div>
              <p className="mt-5 text-base leading-8 text-ink-muted">
                {experience.mission}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {experience.keywords.slice(0, 5).map((item) => (
                  <span key={item} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {copy.home.latestPostsTitle}
          </h2>
          <Link
            href={getRouteHref(locale, "blog")}
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
          >
            {copy.common.viewAll}
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={getRouteHref(locale, "blog", post.slug)}
              className="card-surface p-6 transition hover:-translate-y-1 hover:border-accent/50 hover:bg-panel-strong/90"
            >
              <div className="eyebrow">{post.publishedAt}</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                {post.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-ink-muted">
                {post.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
