import Image from "next/image";
import type { ResumePresentationContent } from "@/lib/types";

type ResumePresentationPreviewProps = {
  presentation: ResumePresentationContent;
  downloadHref: string;
  ctaLabel: string;
  previewLabel: string;
  fallbackNote: string;
  slideCountLabel: string;
  languageBadgeLabel: string;
};

function PresentationPreviewPlaceholder({
  title,
  summary,
  previewLabel,
}: {
  title: string;
  summary: string;
  previewLabel: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${title} preview placeholder`}
      className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-line/80 p-6 sm:p-8"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--accent) 22%, transparent) 0, transparent 30%), radial-gradient(circle at 86% 24%, color-mix(in srgb, var(--ink) 10%, transparent) 0, transparent 30%), linear-gradient(135deg, color-mix(in srgb, var(--panel-strong) 96%, transparent) 0%, color-mix(in srgb, var(--surface-subtle) 98%, transparent) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_47%,rgba(255,255,255,0.08)_47%,transparent_62%)]" />

      <div className="relative flex h-full flex-col justify-between gap-6">
        <div className="eyebrow text-accent">{previewLabel}</div>

        <div className="space-y-3">
          <div className="max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
            {title}
          </div>
          <p className="max-w-xl text-sm leading-7 text-ink-muted">{summary}</p>
        </div>
      </div>
    </div>
  );
}

export function ResumePresentationPreview({
  presentation,
  downloadHref,
  ctaLabel,
  previewLabel,
  fallbackNote,
  slideCountLabel,
  languageBadgeLabel,
}: ResumePresentationPreviewProps) {
  const slideCount = String(presentation.slideCount).padStart(2, "0");

  return (
    <article className="card-surface overflow-hidden p-6 sm:p-7">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.94fr)] xl:items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="eyebrow">{previewLabel}</div>
            <div className="space-y-3">
              <h3 className="text-3xl font-semibold tracking-tight text-ink">
                {presentation.title}
              </h3>
              <p className="max-w-3xl text-base leading-8 text-ink-muted">
                {presentation.summary}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,168px)_minmax(0,1fr)]">
            <div className="rounded-[24px] border border-line bg-canvas-elevated/72 p-5">
              <div className="font-mono text-4xl uppercase tracking-[0.18em] text-accent">
                {slideCount}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-ink-muted">
                {slideCountLabel}
              </div>
            </div>

            {presentation.languageLabel ? (
              <div className="rounded-[24px] border border-line bg-canvas-elevated/72 p-5">
                <div className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                  {languageBadgeLabel}
                </div>
                <div className="mt-3 text-base font-medium text-ink">
                  {presentation.languageLabel}
                </div>
              </div>
            ) : null}
          </div>

          {presentation.note ? (
            <p className="max-w-3xl text-sm leading-7 text-ink-muted">
              {presentation.note}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={downloadHref}
              download={presentation.fileName}
              className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
            >
              {ctaLabel}
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
              {presentation.fileName}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {presentation.previewImageSrc ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-line/80 bg-canvas-elevated/72">
              <Image
                src={presentation.previewImageSrc}
                alt={presentation.previewImageAlt}
                fill
                sizes="(min-width: 1280px) 38vw, (min-width: 768px) 70vw, 100vw"
                className="object-cover object-top"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.04)_0%,rgba(14,12,10,0.02)_36%,rgba(14,12,10,0.22)_100%)]" />
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[rgba(14,12,10,0.42)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white">
                {previewLabel}
              </div>
            </div>
          ) : (
            <PresentationPreviewPlaceholder
              title={presentation.title}
              summary={presentation.summary}
              previewLabel={previewLabel}
            />
          )}

          {!presentation.previewImageSrc ? (
            <p className="text-sm leading-7 text-ink-muted">{fallbackNote}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
