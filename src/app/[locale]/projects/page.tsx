import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPersonalProjects } from "@/lib/resume";
import { getProjectHref, isLocale, siteCopy } from "@/lib/site";
import type { Locale, PersonalProjectItem } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = siteCopy[locale].projects;

  return {
    title: copy.title,
    description: copy.intro,
  };
}

function ProjectListItem({
  item,
  index,
  locale,
  detailCtaLabel,
}: {
  item: PersonalProjectItem;
  index: number;
  locale: Locale;
  detailCtaLabel: string;
}) {
  return (
    <article className="card-surface group relative overflow-hidden p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 14%, transparent) 0, transparent 32%), linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 90%, transparent) 0%, transparent 100%)",
        }}
      />

      <div className="relative grid gap-5 lg:grid-cols-[72px_minmax(0,1fr)_auto] lg:items-start">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent/22 bg-[var(--accent-soft)] font-mono text-[13px] uppercase tracking-[0.26em] text-accent">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="space-y-4">
          <header className="space-y-2">
            {item.subtitle ? <div className="eyebrow">{item.subtitle}</div> : null}
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
              {item.title}
            </h2>
            <p className="max-w-3xl text-base leading-8 text-ink-muted">
              {item.summary}
            </p>
          </header>

          {item.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {item.note ? (
            <div className="rounded-[22px] border border-accent/18 bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-ink-muted">
              {item.note}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
          <Link
            href={getProjectHref(locale, item.slug)}
            className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition group-hover:border-accent/60 group-hover:bg-panel-strong"
          >
            {detailCtaLabel}
          </Link>

          {item.href && item.hrefLabel ? (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-canvas-elevated/72 px-5 text-sm text-ink transition hover:border-accent/50 hover:bg-panel-strong"
            >
              {item.hrefLabel}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale].projects;
  const projects = getPersonalProjects(locale);
  const countLabel =
    locale === "zh-TW"
      ? `${projects.length} 個個人專案`
      : `${projects.length} personal projects`;

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden border-b border-line/80 pb-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full opacity-90"
          style={{
            background:
              "radial-gradient(circle at 14% 18%, color-mix(in srgb, var(--accent) 16%, transparent) 0, transparent 30%), radial-gradient(circle at 86% 22%, color-mix(in srgb, var(--ink) 8%, transparent) 0, transparent 28%), linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--surface-subtle) 74%, transparent) 100%)",
          }}
        />

        <div className="space-y-5">
          <div className="eyebrow">{copy.eyebrow}</div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {copy.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-ink-muted">
                {copy.intro}
              </p>
            </div>

            <div className="inline-flex items-center rounded-full border border-accent/22 bg-[var(--accent-soft)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              {countLabel}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
          {copy.listTitle}
        </h2>

        {projects.length ? (
          <div className="space-y-4">
            {projects.map((item, index) => (
              <ProjectListItem
                key={item.slug}
                item={item}
                index={index}
                locale={locale}
                detailCtaLabel={copy.detailCtaLabel}
              />
            ))}
          </div>
        ) : (
          <div className="subtle-panel p-6 sm:p-7">
            <p className="max-w-3xl text-base leading-8 text-ink-muted">
              {copy.emptyState}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
