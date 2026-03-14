import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume";
import { getRouteHref, isLocale, siteConfig, siteCopy } from "@/lib/site";
import type { ExperienceEntry, Locale, SkillGroup } from "@/lib/types";

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
    title: locale === "zh-TW" ? "履歷" : "Resume",
    description: siteConfig.siteDescription[locale],
  };
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="space-y-3">
      <div className="eyebrow">{eyebrow}</div>
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}

function ExperienceCard({
  experience,
  compact = false,
}: {
  experience: ExperienceEntry;
  compact?: boolean;
}) {
  return (
    <article className="card-surface relative overflow-hidden p-6 sm:p-7 lg:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <div className="space-y-3">
          <div className="eyebrow">{experience.period}</div>
          <h3
            className={
              compact
                ? "text-xl font-semibold tracking-tight text-ink"
                : "text-2xl font-semibold tracking-tight text-ink"
            }
          >
            {experience.role}
          </h3>
          <div className="space-y-1 text-sm leading-7 text-ink-muted">
            <div>{experience.company}</div>
            <div>{experience.location}</div>
          </div>
        </div>

        <div className="space-y-5 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p
            className={
              compact
                ? "text-sm leading-7 text-ink-muted"
                : "text-base leading-8 text-ink"
            }
          >
            {experience.mission}
          </p>
          <ul className="space-y-3 text-sm leading-7 text-ink-muted">
            {experience.impactBullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {experience.keywords.map((keyword) => (
              <span key={keyword} className="tag-chip">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function StackCluster({ cluster }: { cluster: SkillGroup }) {
  return (
    <article className="rounded-[24px] border border-line bg-black/12 p-5">
      <div className="eyebrow">{cluster.title}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {cluster.items.map((item) => (
          <span key={item} className="tag-chip">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function getResumeCopy(locale: Locale) {
  return {
    recentTitle:
      locale === "zh-TW" ? "近年經歷主軸" : "Recent experience aligned to the positioning",
    recentDescription:
      locale === "zh-TW"
        ? "只展開最近三段最相關的經歷，聚焦 scope、結果與 recruiter 真正在意的關鍵字。"
        : "Expanded only for the three most relevant roles, with scope, outcomes, and recruiter-friendly keywords up front.",
    earlierTitle:
      locale === "zh-TW" ? "早期經歷收斂為背景優勢" : "Earlier work kept as context, not the headline",
    earlierDescription:
      locale === "zh-TW"
        ? "QA automation 被保留為系統觀與品質思維的起點，但不與近年的 Tech Lead 經歷競爭版面。"
        : "QA automation stays here as part of the systems and quality foundation, without competing with the more recent leadership narrative.",
    winsTitle:
      locale === "zh-TW" ? "支撐主軸的案例與證明" : "Proof that supports the positioning",
    winsDescription:
      locale === "zh-TW"
        ? "保留最能證明平台架構、交付節奏與落地能力的案例，不再鋪滿平均權重的 project cards。"
        : "Only the strongest proof points remain here, centered on platform architecture, delivery rhythm, and execution depth.",
    stackTitle:
      locale === "zh-TW"
        ? "讓 recruiter 一眼看懂的核心關鍵字"
        : "Core keyword clusters recruiters can scan quickly",
    stackDescription:
      locale === "zh-TW"
        ? "技能呈現改成 recruiter-friendly cluster，而不是平均展開的技術清單。"
        : "Skills are grouped into recruiter-friendly clusters instead of an equal-weight wall of tools.",
  };
}

export default async function ResumePage({
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
  const localCopy = getResumeCopy(locale);
  const featuredExperiences = resume.experiences.filter(
    (experience) => experience.emphasis === "featured",
  );
  const earlierExperiences = resume.experiences.filter(
    (experience) => experience.emphasis === "earlier",
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="card-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(224,161,100,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
        <div className="relative space-y-8 p-7 sm:p-8 lg:p-10">
          <div className="space-y-4">
            <div className="eyebrow">{copy.resume.eyebrow}</div>
            <div className="flex flex-wrap items-center gap-3 text-sm leading-7 text-ink-muted">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-accent-strong">
                {resume.profile.englishName}
              </span>
              <span>{resume.profile.name}</span>
              <span>{resume.profile.locationLabel}</span>
            </div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.45rem]">
              {resume.positioning.headline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-ink">
              {resume.positioning.valueProposition}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-ink-muted">
              {copy.resume.intro}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {resume.positioning.targetRoles.map((role) => (
              <span key={role} className="tag-chip tag-chip-active">
                {role}
              </span>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
            <aside className="order-1 rounded-[28px] border border-line bg-black/14 p-6 lg:order-2">
              <div className="eyebrow">{copy.resume.impactTitle}</div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {resume.selectedImpact.map((impact) => (
                <article
                  key={impact.label}
                  className="rounded-[24px] border border-line bg-black/12 p-5"
                >
                  <div className="font-mono text-sm uppercase tracking-[0.24em] text-accent">
                    {impact.value}
                  </div>
                  <div className="mt-4 text-xl font-semibold tracking-tight text-ink">
                    {impact.label}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">
                    {impact.detail}
                  </p>
                </article>
              ))}
              </div>
            </aside>

            <div className="order-2 space-y-6 lg:order-1">
              <div className="space-y-4">
                <div className="eyebrow">{copy.resume.summaryTitle}</div>
                <div className="space-y-4 text-base leading-8 text-ink-muted">
                  {resume.executiveSummary.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>

              <aside className="rounded-[26px] border border-line bg-black/12 p-5">
                <div className="eyebrow">{copy.resume.keywordsTitle}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {resume.positioning.recruiterKeywords.map((keyword) => (
                    <span key={keyword} className="tag-chip">
                      {keyword}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          eyebrow={copy.resume.experienceTitle}
          title={localCopy.recentTitle}
          description={localCopy.recentDescription}
        />
        <div className="space-y-4">
          {featuredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.company + experience.period}
              experience={experience}
            />
          ))}
        </div>
      </section>

      {earlierExperiences.length > 0 ? (
        <section className="space-y-4">
          <SectionHeading
            eyebrow={copy.resume.earlierCareerTitle}
            title={localCopy.earlierTitle}
            description={localCopy.earlierDescription}
          />
          <div className="space-y-4">
            {earlierExperiences.map((experience) => (
              <ExperienceCard
                key={experience.company + experience.period}
                experience={experience}
                compact
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="space-y-5">
          <SectionHeading
            eyebrow={copy.resume.winsTitle}
            title={localCopy.winsTitle}
            description={localCopy.winsDescription}
          />
          <div className="space-y-4">
            {resume.selectedWins.map((win) => (
              <article key={win.title} className="card-surface p-6 sm:p-7">
                <div className="eyebrow">{win.period}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                  {win.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-ink-muted">
                  {win.summary}
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-ink-muted">
                  {win.proofPoints.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {win.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <SectionHeading
            eyebrow={copy.resume.stackTitle}
            title={localCopy.stackTitle}
            description={localCopy.stackDescription}
          />
          <div className="space-y-4">
            {resume.coreStack.map((cluster) => (
              <StackCluster key={cluster.title} cluster={cluster} />
            ))}
          </div>

          <article className="card-surface p-6">
            <div className="eyebrow">{copy.resume.certificationsTitle}</div>
            <div className="mt-5 space-y-4">
              {resume.certifications.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-line pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="text-base font-medium text-ink">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm text-ink-muted">
                    {item.issuer} / {item.year}
                  </div>
                  {item.note ? (
                    <div className="mt-1 text-sm text-ink-muted">
                      {item.note}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="card-surface p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="space-y-3">
            <div className="eyebrow">{copy.resume.closingTitle}</div>
            <p className="text-base leading-8 text-ink-muted">
              {resume.contactNote}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={getRouteHref(locale, "contact")}
              className="inline-flex min-h-11 items-center rounded-full border border-accent/60 bg-accent/14 px-5 text-sm text-ink transition hover:bg-accent/20"
            >
              {copy.common.contactCta}
            </Link>
            <Link
              href={getRouteHref(locale, "blog")}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-white/4"
            >
              {copy.home.blogCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
