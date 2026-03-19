import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetailGallery } from "@/components/project-detail-gallery";
import { PersonalProjectFeedbackForm } from "@/components/personal-project-feedback-form";
import { getAllPersonalProjectParams, getPersonalProject } from "@/lib/resume";
import { getRouteHref, isLocale, siteConfig, siteCopy, withBasePath } from "@/lib/site";
import type {
  PersonalProjectDetailSection,
  PersonalProjectDetailVideo,
  PersonalProjectItem,
} from "@/lib/types";

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
  previewNote?: string;
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

      {previewNote ? (
        <p className="max-w-3xl text-sm leading-7 text-ink-muted">{previewNote}</p>
      ) : null}
    </div>
  );
}

function ProjectPreviewGallery({
  item,
  previewLabel,
  previewNote,
  zoomLabel,
  closeLabel,
}: {
  item: PersonalProjectItem;
  previewLabel: string;
  previewNote?: string;
  zoomLabel: string;
  closeLabel: string;
}) {
  if (item.detailImage.kind !== "gallery") {
    return null;
  }

  return (
    <ProjectDetailGallery
      title={item.title}
      summary={item.summary}
      tags={item.tags}
      previewLabel={previewLabel}
      previewNote={previewNote}
      detailImage={item.detailImage}
      zoomLabel={zoomLabel}
      closeLabel={closeLabel}
    />
  );
}

function ProjectPreviewSurface({
  item,
  previewLabel,
  previewNote,
  zoomLabel,
  closeLabel,
}: {
  item: PersonalProjectItem;
  previewLabel: string;
  previewNote?: string;
  zoomLabel: string;
  closeLabel: string;
}) {
  if (item.detailImage.kind === "gallery") {
    return (
      <ProjectPreviewGallery
        item={item}
        previewLabel={previewLabel}
        previewNote={previewNote}
        zoomLabel={zoomLabel}
        closeLabel={closeLabel}
      />
    );
  }

  return (
    <ProjectPreviewPlaceholder
      item={item}
      previewLabel={previewLabel}
      previewNote={previewNote}
    />
  );
}

function ProjectPreviewVideo({ video }: { video: PersonalProjectDetailVideo }) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-line/80 bg-canvas-elevated/78 p-4 shadow-[0_24px_60px_rgba(10,12,12,0.14)] sm:p-6">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-[28px] border border-line/75 bg-[#0F1115]">
          <video
            controls
            preload="metadata"
            className="block h-auto w-full"
            aria-label={video.alt}
            poster={video.posterSrc ? withBasePath(video.posterSrc) : undefined}
          >
            <source src={withBasePath(video.src)} type="video/mp4" />
          </video>
        </div>

        <div className="space-y-2 px-1">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {video.label}
          </div>
          <p className="max-w-4xl text-sm leading-7 text-ink-muted">{video.caption}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectStorySection({
  section,
}: {
  section: PersonalProjectDetailSection;
}) {
  const hasCards = Boolean(section.cards?.length);

  return (
    <section className="space-y-4">
      <SectionHeading id={section.id} title={section.title} />

      <div
        className={
          hasCards
            ? "grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)]"
            : "space-y-5"
        }
      >
        <div className="space-y-5">
          {section.spotlight ? (
            <div className="overflow-hidden rounded-[32px] border border-line/80 bg-canvas-elevated/78 p-4 shadow-[0_24px_60px_rgba(10,12,12,0.14)] sm:p-6">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[28px] border border-line/75 bg-[#110E0C]">
                  <Image
                    src={withBasePath(section.spotlight.src)}
                    alt={section.spotlight.alt}
                    width={1536}
                    height={1024}
                    className="h-auto w-full"
                  />
                </div>

                <div className="space-y-2 px-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    {section.spotlight.label}
                  </div>
                  <p className="max-w-4xl text-sm leading-7 text-ink-muted">
                    {section.spotlight.caption}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="subtle-panel space-y-5 p-6 sm:p-7">
            {section.eyebrow ? (
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                {section.eyebrow}
              </div>
            ) : null}

            {section.intro ? (
              <p className="max-w-4xl text-base leading-8 text-ink">{section.intro}</p>
            ) : null}

            {section.paragraphs?.length ? (
              <div className="space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-4xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {section.bullets?.length ? (
              <ul className="space-y-3 text-sm leading-7 text-ink-muted">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {section.note ? (
              <div className="rounded-[24px] border border-accent/16 bg-[var(--accent-soft)] px-5 py-4 text-sm leading-7 text-ink-muted">
                {section.note}
              </div>
            ) : null}
          </div>
        </div>

        {hasCards ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {section.cards?.map((card) => (
              <div
                key={`${card.title}-${card.body}`}
                className="subtle-panel space-y-3 p-5 sm:p-6"
              >
                {card.eyebrow ? (
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    {card.eyebrow}
                  </div>
                ) : null}
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  {card.title}
                </h3>
                <p className="text-sm leading-7 text-ink-muted">{card.body}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectSidebarMark({ item }: { item: PersonalProjectItem }) {
  if (item.detailImage.kind !== "gallery" || !item.detailImage.logoSrc) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 rounded-[24px] border border-accent/18 bg-[var(--accent-soft)] px-4 py-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] border border-accent/18 bg-[#17110E] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <Image
          src={withBasePath(item.detailImage.logoSrc)}
          alt={item.detailImage.logoAlt ?? item.title}
          width={50}
          height={50}
          className="h-10 w-10"
        />
      </div>

      <div className="min-w-0 space-y-1">
        <div className="text-sm font-semibold tracking-tight text-ink">{item.title}</div>
        {item.subtitle ? (
          <div className="truncate text-xs leading-6 text-ink-muted">{item.subtitle}</div>
        ) : null}
      </div>
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

  const brandIcon =
    project.detailImage.kind === "gallery" ? project.detailImage.logoSrc : undefined;

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${siteConfig.siteName}`,
      description: project.summary,
      url: `${siteConfig.siteUrl}/${locale}/projects/${slug}/`,
    },
    icons: brandIcon
      ? {
          icon: withBasePath(brandIcon),
          shortcut: withBasePath(brandIcon),
        }
      : undefined,
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
  const previewNote =
    project?.previewNote ??
    (project?.detailImage.kind === "placeholder"
      ? copy.projectDetailPreviewNote
      : undefined);
  const detailSections = project?.detailSections ?? [];

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
              {detailSections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="tag-chip tag-chip-active">
                  {section.navLabel}
                </a>
              ))}
              <a href="#overview" className="tag-chip tag-chip-active">
                {copy.projectDetailOverviewLabel}
              </a>
              <a href="#feedback" className="tag-chip tag-chip-active">
                {copy.projectDetailFeedbackLabel}
              </a>
            </nav>
          </div>

          <aside className="subtle-panel space-y-4 p-6">
            <ProjectSidebarMark item={project} />

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
        <ProjectPreviewSurface
          item={project}
          previewLabel={copy.projectDetailPreviewLabel}
          previewNote={previewNote}
          zoomLabel={copy.projectDetailImageZoomLabel}
          closeLabel={copy.projectDetailClosePreviewLabel}
        />
        {project.detailVideo ? <ProjectPreviewVideo video={project.detailVideo} /> : null}
      </section>

      {detailSections.map((section) => (
        <ProjectStorySection key={section.id} section={section} />
      ))}

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
