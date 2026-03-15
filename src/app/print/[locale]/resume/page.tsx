import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResume } from "@/lib/resume";
import { isLocale, siteConfig, siteCopy, withBasePath } from "@/lib/site";
import type {
  ContactIcon,
  ContactLink,
  ExperienceEntry,
  FeaturedItem,
  Locale,
  ProjectItem,
  ResumeImpactPoint,
} from "@/lib/types";
import { parseResumePeriod } from "@/lib/utils";

const linkMonograms: Record<ContactIcon, string> = {
  linkedin: "IN",
  github: "GH",
  email: "EM",
};

const printEyebrows: Record<
  Locale,
  {
    dossier: string;
    summary: string;
    contact: string;
    highlights: string;
    experience: string;
    skills: string;
    featured: string;
    projects: string;
    certifications: string;
  }
> = {
  "zh-TW": {
    dossier: "Public Resume / Dossier",
    summary: "履歷摘要",
    contact: "公開入口",
    highlights: "關鍵訊號",
    experience: "經歷主線",
    skills: "核心技能",
    featured: "代表成果",
    projects: "作品證明",
    certifications: "證照與獎項",
  },
  en: {
    dossier: "Public Resume / Dossier",
    summary: "Profile Digest",
    contact: "Public Paths",
    highlights: "Impact Signals",
    experience: "Operating History",
    skills: "Core Stack",
    featured: "Selected Wins",
    projects: "Build Proof",
    certifications: "Credentials",
  },
};

function getDisplayHref(href: string) {
  if (href.startsWith("mailto:")) {
    return href.replace(/^mailto:/, "");
  }

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

function SectionHeading({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow: string;
}) {
  return (
    <div className="resume-print-heading-group">
      <div className="resume-print-eyebrow">{eyebrow}</div>
      <h2 className="resume-print-heading">{title}</h2>
      <div className="resume-print-heading-rule" />
    </div>
  );
}

function PublicLinkItem({
  link,
  locale,
}: {
  link: ContactLink;
  locale: "zh-TW" | "en";
}) {
  return (
    <li className="resume-print-item">
      <a href={link.href} className="resume-print-link-card">
        <span className="resume-print-link-mark" data-link-icon={link.icon}>
          {linkMonograms[link.icon]}
        </span>
        <div className="min-w-0">
          <div className="resume-print-link-label">{link.localeLabel[locale]}</div>
          <div className="resume-print-link-url">{getDisplayHref(link.href)}</div>
        </div>
      </a>
    </li>
  );
}

function HighlightCard({ item }: { item: ResumeImpactPoint }) {
  return (
    <article className="resume-print-card resume-print-stat-card">
      <div className="resume-print-eyebrow">{item.label}</div>
      <div className="resume-print-stat-value">{item.value}</div>
      <p className="resume-print-stat-detail">{item.detail}</p>
    </article>
  );
}

function ExperienceCard({ experience }: { experience: ExperienceEntry }) {
  const period = parseResumePeriod(experience.period);

  return (
    <article className="resume-print-card resume-print-experience">
      <div className="resume-print-experience-header">
        <div>
          <h3 className="resume-print-experience-title">{experience.role}</h3>
          <div className="resume-print-experience-company">{experience.company}</div>
        </div>

        <div className="resume-print-experience-meta">
          <div className="resume-print-experience-period">
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
    <article className="resume-print-item border-b border-[var(--resume-line)] pb-4 last:border-b-0 last:pb-0">
      <h3 className="resume-print-panel-title">{item.title}</h3>
      <p className="mt-2 text-[0.82rem] leading-5 text-[var(--resume-muted)]">
        {item.summary}
      </p>
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
    <article className="resume-print-item border-b border-[var(--resume-line)] pb-4 last:border-b-0 last:pb-0">
      <h3 className="resume-print-panel-title">{item.title}</h3>
      {item.subtitle ? (
        <div className="mt-1 text-[0.82rem] font-medium text-[var(--resume-muted)]">
          {item.subtitle}
        </div>
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
  const eyebrowCopy = printEyebrows[locale];

  return (
    <div className="resume-print-page" data-locale={locale} data-pdf-ready="true">
      <div className="resume-print-shell">
        <header className="resume-print-section resume-print-header">
          <div className="resume-print-hero-grid">
            <div className="space-y-4">
              <div className="resume-print-eyebrow">{eyebrowCopy.dossier}</div>
              <div>
                <h1 className="resume-print-title">{resume.profile.englishName}</h1>
                <div className="resume-print-name-row">
                  {resume.profile.name} · {resume.profile.locationLabel}
                </div>
              </div>
              <div className="space-y-3">
                <div className="resume-print-hero-lead">
                  {resume.positioning.headlinePrimary}
                </div>
                <div className="resume-print-hero-subtitle">
                  {resume.positioning.headlineSecondary}
                </div>
                <p className="resume-print-standfirst">{resume.about[0]}</p>
              </div>
            </div>

            <aside className="resume-print-identity-card">
              <div className="resume-print-portrait-frame">
                <Image
                  src={withBasePath(resume.profile.portraitSrc)}
                  alt={resume.profile.portraitAlt}
                  width={132}
                  height={164}
                  priority
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="space-y-3">
                <div className="resume-print-eyebrow">{copy.resume.rolesEyebrow}</div>
                <div className="flex flex-wrap gap-2">
                  {resume.positioning.openToRoles.map((role) => (
                    <span key={role} className="resume-print-chip">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div className="resume-print-overview-grid">
            <section className="resume-print-card resume-print-card-emphasis">
              <SectionHeading
                title={copy.resume.pdfSummaryTitle}
                eyebrow={eyebrowCopy.summary}
              />
              <ul className="resume-print-list mt-4">
                {resume.pdf.summary.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-print-card">
              <SectionHeading
                title={copy.contact.methodsTitle}
                eyebrow={eyebrowCopy.contact}
              />
              <ul className="mt-4 grid gap-2.5">
                {siteConfig.socialLinks.map((link) => (
                  <PublicLinkItem key={link.href} link={link} locale={locale} />
                ))}
              </ul>
            </section>
          </div>
        </header>

        <section className="resume-print-section pt-4">
          <SectionHeading
            title={copy.resume.highlightsTitle}
            eyebrow={eyebrowCopy.highlights}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {resume.highlights.map((item) => (
              <HighlightCard key={item.label} item={item} />
            ))}
          </div>
        </section>

        <section className="resume-print-section pt-4">
          <SectionHeading
            title={copy.resume.experienceTitle}
            eyebrow={eyebrowCopy.experience}
          />
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
          <div className="resume-print-detail-grid grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
            <article className="resume-print-card resume-print-card-emphasis">
              <SectionHeading
                title={copy.resume.skillsTitle}
                eyebrow={eyebrowCopy.skills}
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {resume.topSkills.map((skill) => (
                  <span key={skill} className="resume-print-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>

            <article className="resume-print-card">
              <SectionHeading
                title={copy.resume.featuredTitle}
                eyebrow={eyebrowCopy.featured}
              />
              <div className="mt-4 space-y-4">
                {resume.pdf.featured.map((item) => (
                  <FeaturedCard key={item.title} item={item} />
                ))}
              </div>
            </article>

            <article className="resume-print-card">
              <SectionHeading
                title={copy.resume.projectsTitle}
                eyebrow={eyebrowCopy.projects}
              />
              <div className="mt-4 space-y-4">
                {resume.pdf.projects.map((item) => (
                  <ProjectCard key={item.title} item={item} />
                ))}
              </div>
            </article>

            <article className="resume-print-card">
              <SectionHeading
                title={copy.resume.certificationsTitle}
                eyebrow={eyebrowCopy.certifications}
              />
              <div className="mt-4 space-y-4">
                {resume.certifications.map((item) => (
                  <div
                    key={item.title}
                    className="resume-print-item border-b border-[var(--resume-line)] pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="resume-print-panel-title">{item.title}</div>
                    <div className="mt-1 text-[0.82rem] leading-5 text-[var(--resume-muted)]">
                      {item.issuer} / {item.year}
                    </div>
                    {item.note ? (
                      <div className="mt-1 text-[0.8rem] leading-5 text-[var(--resume-muted)]">
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
