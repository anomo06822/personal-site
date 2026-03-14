import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImpactRibbon } from "@/components/impact-ribbon";
import { ProjectShowcase } from "@/components/project-showcase";
import { ResumeHero } from "@/components/resume-hero";
import { getResume, getResumePdfDownloadHref } from "@/lib/resume";
import { isLocale, siteConfig, siteCopy, withBasePath } from "@/lib/site";
import type { ExperienceEntry, FeaturedItem, ProjectItem } from "@/lib/types";
import { parseResumePeriod } from "@/lib/utils";

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

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
      {title}
    </h2>
  );
}

function ExperienceTimelineItem({
  experience,
}: {
  experience: ExperienceEntry;
}) {
  const period = parseResumePeriod(experience.period);

  return (
    <article className="grid grid-cols-[24px_minmax(0,1fr)] gap-4 pb-8 last:pb-0 sm:grid-cols-[140px_24px_minmax(0,1fr)] sm:gap-6">
      <div className="hidden pt-1 text-right sm:block">
        <div className="font-mono text-sm uppercase tracking-[0.18em] text-accent">
          {period.startLabel}
        </div>
        <div className="mt-2 text-base font-medium leading-7 text-ink-muted">
          {period.endLabel}
        </div>
      </div>

      <div className="relative flex justify-center">
        <span className="mt-2 h-3 w-3 rounded-full border-2 border-accent bg-canvas" />
      </div>

      <div className="card-surface p-6 sm:p-7">
        <div className="space-y-5">
          <header className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-ink">
                {experience.role}
              </h3>
              <div className="text-base text-ink">{experience.company}</div>
            </div>

            <div className="text-sm leading-7 text-ink-muted sm:text-right">
              <div className="font-mono text-sm tracking-[0.14em] text-accent sm:hidden">
                {period.rangeLabel}
              </div>
              <div>{experience.location}</div>
            </div>
          </header>

          <ul className="space-y-3 text-sm leading-7 text-ink-muted">
            {experience.impactBullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function FeaturedCard({ item }: { item: FeaturedItem }) {
  const content = (
    <>
      <h3 className="text-xl font-semibold tracking-tight text-ink">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-ink-muted">{item.summary}</p>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-ink-muted">
        {item.proofPoints.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="subtle-panel block p-6 transition hover:border-accent/50 hover:bg-panel-strong"
      >
        {content}
      </Link>
    );
  }

  return <article className="subtle-panel p-6">{content}</article>;
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <article className="subtle-panel p-6 sm:p-7">
      <div className="space-y-5">
        <header className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-ink">
            {item.title}
          </h3>
          {item.subtitle ? (
            <div className="text-sm leading-7 text-ink-muted">{item.subtitle}</div>
          ) : null}
        </header>

        <ul className="space-y-3 text-sm leading-7 text-ink-muted">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {item.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
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
  const aboutBody = resume.about.slice(1);
  const resumePdfHref = getResumePdfDownloadHref(locale);

  return (
    <div className="space-y-12">
      <ResumeHero
        name={resume.profile.name}
        englishName={resume.profile.englishName}
        locationLabel={resume.profile.locationLabel}
        headlinePrimary={resume.positioning.headlinePrimary}
        headlineSecondary={resume.positioning.headlineSecondary}
        intro={resume.about[0]}
        rolesEyebrow={copy.resume.rolesEyebrow}
        openToRoles={resume.positioning.openToRoles}
        portraitSrc={withBasePath(resume.profile.portraitSrc)}
        portraitAlt={resume.profile.portraitAlt}
        downloadHref={resumePdfHref}
        downloadLabel={copy.resume.downloadPdfLabel}
        downloadFileName={resume.pdf.fileName}
      />

      <section className="space-y-4">
        <SectionHeading title={copy.resume.highlightsTitle} />
        <ImpactRibbon items={resume.highlights} />
      </section>

      {aboutBody.length ? (
        <section className="space-y-4">
          <SectionHeading title={copy.resume.aboutTitle} />
          <div className="space-y-3">
            {aboutBody.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-4xl text-base leading-8 text-ink-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-5">
        <SectionHeading title={copy.resume.experienceTitle} />
        <div className="relative">
          <div className="absolute bottom-3 left-[11px] top-3 w-px bg-line-strong sm:left-[152px]" />
          <div>
            {resume.experiences.map((experience) => (
              <ExperienceTimelineItem
                key={experience.company + experience.period}
                experience={experience}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title={copy.resume.skillsTitle} />
        <article className="subtle-panel p-6 sm:p-7">
          <div className="flex flex-wrap gap-2">
            {resume.topSkills.map((skill) => (
              <span key={skill} className="tag-chip tag-chip-active">
                {skill}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <SectionHeading title={copy.resume.featuredTitle} />
        <div className="grid gap-4 lg:grid-cols-3">
          {resume.featured.map((item) => (
            <FeaturedCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title={copy.resume.showcaseTitle} />
        <p className="max-w-4xl text-base leading-8 text-ink-muted">
          {copy.resume.showcaseIntro}
        </p>
        <ProjectShowcase
          locale={locale}
          tabs={{
            personal: copy.resume.showcasePersonalTab,
            core: copy.resume.showcaseCoreTab,
          }}
          items={resume.projectShowcase}
          tabsAriaLabel={copy.resume.showcaseTabsAriaLabel}
          imageSlotLabel={copy.resume.showcaseImageSlotLabel}
          personalCtaLabel={copy.resume.showcasePersonalCtaLabel}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading title={copy.resume.projectsTitle} />
        <div className="space-y-4">
          {resume.projects.map((item) => (
            <ProjectCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading title={copy.resume.certificationsTitle} />
        <article className="subtle-panel p-6 sm:p-7">
          <div className="space-y-4">
            {resume.certifications.map((item) => (
              <div
                key={item.title}
                className="border-b border-line pb-4 last:border-b-0 last:pb-0"
              >
                <div className="text-base font-medium text-ink">{item.title}</div>
                <div className="mt-1 text-sm leading-7 text-ink-muted">
                  {item.issuer} / {item.year}
                </div>
                {item.note ? (
                  <div className="mt-1 text-sm leading-7 text-ink-muted">
                    {item.note}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
