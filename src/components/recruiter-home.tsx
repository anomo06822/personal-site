import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/site";
import type {
  HomeContent,
  HomeGithubSignal,
  HomePathwayItem,
  HomeProofItem,
  HomeTeamGalleryItem,
  ResumeContent,
  RouteKey,
} from "@/lib/types";

type RecruiterHomeProps = {
  home: HomeContent;
  resume: ResumeContent;
  githubHref: string;
  pathwayHrefs: Record<Exclude<RouteKey, "home">, string>;
};

function ProofMetric({ item }: { item: HomeProofItem }) {
  return (
    <article className="subtle-panel relative overflow-hidden p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 18%, transparent) 0, transparent 34%), linear-gradient(180deg, color-mix(in srgb, var(--panel-strong) 92%, transparent) 0%, transparent 100%)",
        }}
      />
      <div className="relative space-y-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          {item.value}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          {item.label}
        </h3>
        <p className="text-sm leading-7 text-ink-muted">{item.detail}</p>
      </div>
    </article>
  );
}

function GithubSignalCard({ item }: { item: HomeGithubSignal }) {
  return (
    <article className="card-surface h-full p-6 sm:p-7">
      <div className="flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="eyebrow">{item.updatedLabel}</div>
            <h3 className="text-2xl font-semibold tracking-tight text-ink">
              {item.title}
            </h3>
            <div className="text-sm leading-7 text-ink-muted">{item.subtitle}</div>
          </div>
          <span className="rounded-full border border-accent/25 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            {item.status}
          </span>
        </div>

        <p className="text-sm leading-7 text-ink-muted">{item.summary}</p>

        <ul className="space-y-3 text-sm leading-7 text-ink-muted">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{highlight}</span>
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

        {item.note ? (
          <div className="rounded-[22px] border border-accent/18 bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-ink-muted">
            {item.note}
          </div>
        ) : null}

        {item.href && item.hrefLabel ? (
          <div className="mt-auto pt-1">
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
            >
              {item.hrefLabel}
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function TeamGalleryCard({ item }: { item: HomeTeamGalleryItem }) {
  const isPrimary = item.variant !== "secondary";
  const frameClassName = isPrimary
    ? "aspect-[16/11] min-h-[24rem]"
    : "aspect-[16/10] min-h-[11.5rem]";

  return (
    <article className={`card-surface overflow-hidden ${frameClassName}`}>
      <div className="relative h-full">
        {item.imageSrc ? (
          <Image
            src={withBasePath(item.imageSrc)}
            alt={item.imageAlt ?? item.title}
            fill
            sizes={isPrimary ? "(min-width: 1280px) 40vw, 100vw" : "(min-width: 1280px) 24vw, 100vw"}
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--accent) 18%, transparent) 0, transparent 28%), radial-gradient(circle at 82% 78%, color-mix(in srgb, var(--ink) 10%, transparent) 0, transparent 28%), linear-gradient(140deg, color-mix(in srgb, var(--panel-strong) 94%, transparent) 0%, color-mix(in srgb, var(--surface-subtle) 96%, transparent) 100%)",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(130deg,transparent_0%,transparent_44%,rgba(255,255,255,0.08)_44%,transparent_58%)]" />
            <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2">
              <div className="eyebrow">{item.contextLabel}</div>
              <div className="mt-3 max-w-[22rem] text-2xl font-semibold tracking-tight text-ink">
                {item.title}
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.06)_0%,rgba(14,12,10,0.22)_52%,rgba(14,12,10,0.9)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="rounded-[24px] border border-white/12 bg-[rgba(17,15,13,0.68)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[rgba(247,238,227,0.72)]">
              {item.contextLabel}
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-[rgba(250,245,238,0.96)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[rgba(247,238,227,0.82)]">
              {item.caption}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function PathwayCard({
  item,
  href,
}: {
  item: HomePathwayItem;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="card-surface group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:border-accent/50 hover:bg-panel-strong sm:p-7"
    >
      <div className="space-y-4">
        <div className="eyebrow">{item.eyebrow}</div>
        <h3 className="text-2xl font-semibold tracking-tight text-ink">
          {item.title}
        </h3>
        <p className="text-sm leading-7 text-ink-muted">{item.description}</p>
      </div>

      <div className="mt-auto pt-8">
        <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-canvas-elevated/75 px-5 text-sm text-ink transition group-hover:border-accent/45">
          {item.hrefLabel}
        </span>
      </div>
    </Link>
  );
}

export function RecruiterHome({
  home,
  resume,
  githubHref,
  pathwayHrefs,
}: RecruiterHomeProps) {
  const primaryGallery =
    home.teamGallery.find((item) => item.variant !== "secondary") ??
    home.teamGallery[0];
  const secondaryGallery = home.teamGallery.filter(
    (item) => item !== primaryGallery,
  );
  const secondarySignals = home.secondarySignals ?? [];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden border-b border-line/80 pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full opacity-95"
          style={{
            background:
              "radial-gradient(circle at 10% 16%, color-mix(in srgb, var(--accent) 16%, transparent) 0, transparent 32%), radial-gradient(circle at 86% 18%, color-mix(in srgb, var(--ink) 8%, transparent) 0, transparent 28%), linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--surface-subtle) 82%, transparent) 100%)",
          }}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] xl:items-start">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="eyebrow">{home.heroEyebrow}</div>
              <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
                {home.heroTitle}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-ink">
                {home.heroIntro}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {resume.positioning.openToRoles.map((role) => (
                <span key={role} className="tag-chip tag-chip-active">
                  {role}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={pathwayHrefs.resume}
                className="inline-flex min-h-11 items-center rounded-full border border-accent/50 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/70"
              >
                {home.resumeCtaLabel}
              </Link>
              <a
                href={githubHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-canvas-elevated/70 px-5 text-sm text-ink transition hover:border-accent/60"
              >
                {home.githubCtaLabel}
              </a>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="subtle-panel overflow-hidden p-6">
              <div className="space-y-5">
                <div className="eyebrow">{home.proofBoardEyebrow}</div>
                <p className="max-w-xl text-base leading-8 text-ink-muted">
                  {home.proofBoardTitle}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {home.homeProofBoard.map((item) => (
                    <ProofMetric key={item.value + item.label} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow">{home.githubEyebrow}</div>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.35rem]">
            {home.githubTitle}
          </h2>
          <p className="max-w-4xl text-base leading-8 text-ink-muted">
            {home.githubIntro}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {home.githubSignals.map((item) => (
            <GithubSignalCard key={item.title} item={item} />
          ))}
        </div>

        {secondarySignals.length ? (
          <div className="subtle-panel p-5 sm:p-6">
            <div className="space-y-4">
              {home.secondarySignalsTitle ? (
                <div className="eyebrow">{home.secondarySignalsTitle}</div>
              ) : null}
              <div className="grid gap-3 lg:grid-cols-3">
                {secondarySignals.map((item) => (
                  <div
                    key={item.label + item.value}
                    className="rounded-[22px] border border-line bg-canvas-elevated/72 p-4"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                      {item.label}
                    </div>
                    <div className="mt-2 text-lg font-semibold tracking-tight text-ink">
                      {item.value}
                    </div>
                    {item.note ? (
                      <p className="mt-2 text-sm leading-7 text-ink-muted">
                        {item.note}
                      </p>
                    ) : null}
                    {item.href && item.hrefLabel ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm text-ink transition hover:border-accent/50"
                      >
                        {item.hrefLabel}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow">{home.teamEyebrow}</div>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.35rem]">
            {home.teamTitle}
          </h2>
          <p className="max-w-4xl text-base leading-8 text-ink-muted">
            {home.teamIntro}
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)]">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.92fr)]">
            {primaryGallery ? <TeamGalleryCard item={primaryGallery} /> : null}

            <div className="space-y-4">
              {secondaryGallery.map((item) => (
                <TeamGalleryCard
                  key={item.contextLabel + item.title}
                  item={item}
                />
              ))}
            </div>
          </div>

          <aside className="subtle-panel p-6 sm:p-7">
            <div className="space-y-5">
              <div className="eyebrow">{home.leadershipProofTitle}</div>
              <div className="space-y-4">
                {home.leadershipProofs.map((item) => (
                  <div
                    key={item.value + item.label}
                    className="border-b border-line pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                      {item.value}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-ink-muted">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow">{home.nextEyebrow}</div>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.35rem]">
            {home.nextTitle}
          </h2>
          <p className="max-w-4xl text-base leading-8 text-ink-muted">
            {home.nextIntro}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {home.pathways.map((item) => (
            <PathwayCard
              key={item.routeKey}
              item={item}
              href={pathwayHrefs[item.routeKey]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
