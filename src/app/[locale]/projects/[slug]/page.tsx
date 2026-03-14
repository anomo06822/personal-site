import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PersonalProjectFeedbackForm } from "@/components/personal-project-feedback-form";
import { getAllPersonalProjectParams, getPersonalProject } from "@/lib/resume";
import { getRouteHref, isLocale, siteConfig, siteCopy } from "@/lib/site";
import type { PersonalProjectItem } from "@/lib/types";

function SectionHeading({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-28 space-y-3">
      <div className="eyebrow">{title}</div>
      <h2 className="text-3xl font-semibold tracking-tight text-ink">{title}</h2>
    </div>
  );
}

function ProjectPreviewPlaceholder({
  item,
  previewLabel,
  previewNote,
}: {
  item: PersonalProjectItem;
  previewLabel: string;
  previewNote: string;
}) {
  return (
    <div className="space-y-4">
      <div
        role="img"
        aria-label={item.detailImage.alt}
        className="card-surface relative aspect-[16/9] overflow-hidden p-6 sm:p-8"
        style={{
          background:
            "radial-gradient(circle at 16% 18%, color-mix(in srgb, var(--accent) 28%, transparent) 0, transparent 30%), radial-gradient(circle at 82% 26%, color-mix(in srgb, var(--ink) 10%, transparent) 0, transparent 30%), linear-gradient(135deg, color-mix(in srgb, var(--panel-strong) 96%, transparent) 0%, color-mix(in srgb, var(--surface-subtle) 98%, transparent) 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(255,255,255,0.08)_48%,transparent_62%)]" />
        <div className="relative flex h-full flex-col justify-between gap-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="eyebrow text-accent">{previewLabel}</div>
            {item.subtitle ? (
              <div className="rounded-full border border-accent/20 bg-canvas-elevated/80 px-3 py-1 text-xs leading-6 text-ink-muted">
                {item.subtitle}
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.4rem]">
              {item.title}
            </div>
            <p className="max-w-2xl text-sm leading-7 text-ink-muted">
              {item.summary}
            </p>
          </div>

          {item.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="tag-chip tag-chip-active">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <p className="max-w-3xl text-sm leading-7 text-ink-muted">{previewNote}</p>
    </div>
  );
}

export function generateStaticParams() {
  return getAllPersonalProjectParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const project = getPersonalProject(locale, slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${siteConfig.siteName}`,
      description: project.summary,
      url: `${siteConfig.siteUrl}/${locale}/projects/${slug}/`,
    },
  };
}

export default async function PersonalProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale].resume;
  const projectsCopy = siteCopy[locale].projects;
  const project = getPersonalProject(locale, slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <section className="space-y-6 border-b border-line/80 pb-10">
        <Link
          href={getRouteHref(locale, "projects")}
          className="inline-flex min-h-10 items-center rounded-full border border-line bg-canvas-elevated/80 px-4 text-sm text-ink-muted transition hover:border-accent/50 hover:text-ink"
        >
          {projectsCopy.backToProjectsLabel}
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)]">
          <div className="space-y-5">
            <div className="eyebrow">{copy.projectDetailEyebrow}</div>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {project.title}
              </h1>
              {project.subtitle ? (
                <p className="text-base leading-8 text-ink-muted">{project.subtitle}</p>
              ) : null}
              <p className="max-w-3xl text-lg leading-8 text-ink">{project.summary}</p>
            </div>

            {project.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-chip tag-chip-active">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <nav className="flex flex-wrap gap-2 pt-1">
              <a href="#image" className="tag-chip tag-chip-active">
                {copy.projectDetailImageLabel}
              </a>
              <a href="#overview" className="tag-chip tag-chip-active">
                {copy.projectDetailOverviewLabel}
              </a>
              <a href="#feedback" className="tag-chip tag-chip-active">
                {copy.projectDetailFeedbackLabel}
              </a>
            </nav>
          </div>

          <aside className="subtle-panel space-y-4 p-6">
            {project.note ? (
              <p className="text-sm leading-7 text-ink-muted">{project.note}</p>
            ) : null}

            {project.href && project.hrefLabel ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
              >
                {project.hrefLabel}
              </a>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="image" title={copy.projectDetailImageLabel} />
        <ProjectPreviewPlaceholder
          item={project}
          previewLabel={copy.projectDetailPreviewLabel}
          previewNote={copy.projectDetailPreviewNote}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading id="overview" title={copy.projectDetailOverviewLabel} />
        <div className="subtle-panel space-y-5 p-6 sm:p-7">
          <p className="max-w-4xl text-base leading-8 text-ink">{project.summary}</p>

          <div className="space-y-3">
            {project.detailIntro.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-4xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="space-y-3 text-sm leading-7 text-ink-muted">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading id="feedback" title={copy.projectDetailFeedbackLabel} />

        {project.feedback.type === "github-issue" ? (
          <PersonalProjectFeedbackForm
            projectTitle={project.title}
            repoUrl={project.feedback.repoUrl}
            intro={copy.projectDetailFeedbackIntro}
            titleLabel={copy.projectDetailFeedbackTitleLabel}
            messageLabel={copy.projectDetailFeedbackMessageLabel}
            emailLabel={copy.projectDetailFeedbackEmailLabel}
            emailHint={copy.projectDetailFeedbackEmailHint}
            submitLabel={copy.projectDetailFeedbackSubmitLabel}
            openedLabel={copy.projectDetailFeedbackOpenedLabel}
            validationLabel={copy.projectDetailFeedbackValidationLabel}
          />
        ) : (
          <div className="subtle-panel space-y-3 p-6 sm:p-7">
            <h3 className="text-xl font-semibold tracking-tight text-ink">
              {copy.projectDetailFeedbackDisabledLabel}
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-ink-muted">
              {project.feedback.message}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
