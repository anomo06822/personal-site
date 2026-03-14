import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume";
import { isLocale, siteConfig, siteCopy } from "@/lib/site";
import type {
  ContactLink,
  ExperienceEntry,
  FeaturedItem,
  ProjectItem,
  ResumeImpactPoint,
} from "@/lib/types";
import { parseResumePeriod } from "@/lib/utils";

function getDisplayHref(href: string) {
  try {
    const url = new URL(href);
    const hostname = url.hostname.replace(/^www\./, "");
    const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");

    return `${hostname}${pathname}`;
  } catch {
    return href;
  }
}

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
    title: locale === "zh-TW" ? "履歷 PDF" : "Resume PDF",
    description: siteConfig.siteDescription[locale],
    robots: {
      index: false,
      follow: false,
    },
  };
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="resume-print-heading">{title}</h2>;
}

function PublicLinkItem({
  link,
  locale,
}: {
  link: ContactLink;
  locale: "zh-TW" | "en";
}) {
  return (
    <li className="resume-print-item border-b border-slate-200/80 pb-3 last:border-b-0 last:pb-0">
      <a href={link.href} className="block">
        <div className="text-sm font-medium text-slate-900">{link.localeLabel[locale]}</div>
        <div className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">
          {getDisplayHref(link.href)}
        </div>
      </a>
    </li>
  );
}

function HighlightCard({ item }: { item: ResumeImpactPoint }) {
  return (
    <article className="resume-print-card">
      <div className="font-mono text-[0.78rem] uppercase tracking-[0.24em] text-slate-500">
        {item.label}
      </div>
      <div className="mt-2 text-[1.8rem] font-semibold tracking-tight text-slate-950">
        {item.value}
      </div>
      <p className="mt-2 text-[0.84rem] leading-5 text-slate-600">{item.detail}</p>
    </article>
  );
}

function ExperienceCard({ experience }: { experience: ExperienceEntry }) {
  const period = parseResumePeriod(experience.period);

  return (
    <article className="resume-print-card resume-print-experience">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-[1rem] font-semibold tracking-tight text-slate-950">
            {experience.role}
          </h3>
          <div className="mt-0.5 text-[0.84rem] font-medium text-slate-700">
            {experience.company}
          </div>
        </div>

        <div className="text-[0.82rem] leading-5 text-slate-500 sm:text-right">
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">
            {period.rangeLabel}
          </div>
          <div className="mt-0.5">{experience.location}</div>
        </div>
      </div>

      <ul className="resume-print-list mt-3">
        {experience.impactBullets.map((item) => (
          <li key={item}>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function FeaturedCard({ item }: { item: FeaturedItem }) {
  return (
    <article className="resume-print-item border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
      <h3 className="text-base font-semibold tracking-tight text-slate-950">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
      <ul className="resume-print-list mt-3">
        {item.proofPoints.map((point) => (
          <li key={point}>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <article className="resume-print-item border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
      <h3 className="text-base font-semibold tracking-tight text-slate-950">
        {item.title}
      </h3>
      {item.subtitle ? (
        <div className="mt-1 text-sm font-medium text-slate-600">{item.subtitle}</div>
      ) : null}
      <ul className="resume-print-list mt-3">
        {item.bullets.map((bullet) => (
          <li key={bullet}>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {item.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="resume-print-chip">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default async function PrintResumePage({
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

  return (
    <div className="resume-print-page" data-pdf-ready="true">
      <div className="resume-print-shell">
        <header className="resume-print-section border-b border-slate-200 pb-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <div className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-slate-500">
                Jarvis Huang / Resume
              </div>
              <div>
                <h1 className="text-[2.4rem] font-semibold tracking-tight text-slate-950">
                  {resume.profile.englishName}
                </h1>
                <div className="mt-1 text-sm leading-6 text-slate-500">
                  {resume.profile.name} · {resume.profile.locationLabel}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[1.25rem] font-semibold leading-8 text-slate-950">
                  {resume.positioning.headlinePrimary}
                </div>
                <div className="max-w-3xl text-base leading-7 text-slate-600">
                  {resume.positioning.headlineSecondary}
                </div>
              </div>
            </div>

            <aside className="resume-print-card md:w-[17rem]">
              <SectionHeading title={copy.resume.rolesEyebrow} />
              <div className="mt-4 flex flex-wrap gap-2">
                {resume.positioning.openToRoles.map((role) => (
                  <span key={role} className="resume-print-chip">
                    {role}
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <section className="resume-print-card">
              <SectionHeading title={copy.resume.pdfSummaryTitle} />
              <ul className="resume-print-list mt-4">
                {resume.pdf.summary.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-print-card">
              <SectionHeading title={copy.contact.methodsTitle} />
              <ul className="mt-4 space-y-3">
                {siteConfig.socialLinks.map((link) => (
                  <PublicLinkItem key={link.href} link={link} locale={locale} />
                ))}
              </ul>
            </section>
          </div>
        </header>

        <section className="resume-print-section pt-4">
          <SectionHeading title={copy.resume.highlightsTitle} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {resume.highlights.map((item) => (
              <HighlightCard key={item.label} item={item} />
            ))}
          </div>
        </section>

        <section className="resume-print-section pt-4">
          <SectionHeading title={copy.resume.experienceTitle} />
          <div className="mt-4 space-y-3">
            {resume.experiences.map((experience) => (
              <ExperienceCard
                key={experience.company + experience.period}
                experience={experience}
              />
            ))}
          </div>
        </section>

        <section className="resume-print-section pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="resume-print-card">
              <SectionHeading title={copy.resume.skillsTitle} />
              <div className="mt-4 flex flex-wrap gap-2">
                {resume.topSkills.map((skill) => (
                  <span key={skill} className="resume-print-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>

            <article className="resume-print-card">
              <SectionHeading title={copy.resume.featuredTitle} />
              <div className="mt-4 space-y-4">
                {resume.pdf.featured.map((item) => (
                  <FeaturedCard key={item.title} item={item} />
                ))}
              </div>
            </article>

            <article className="resume-print-card">
              <SectionHeading title={copy.resume.projectsTitle} />
              <div className="mt-4 space-y-4">
                {resume.pdf.projects.map((item) => (
                  <ProjectCard key={item.title} item={item} />
                ))}
              </div>
            </article>

            <article className="resume-print-card">
              <SectionHeading title={copy.resume.certificationsTitle} />
              <div className="mt-4 space-y-4">
                {resume.certifications.map((item) => (
                  <div
                    key={item.title}
                    className="resume-print-item border-b border-slate-200 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="text-sm font-medium text-slate-900">{item.title}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">
                      {item.issuer} / {item.year}
                    </div>
                    {item.note ? (
                      <div className="mt-1 text-sm leading-6 text-slate-500">
                        {item.note}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
