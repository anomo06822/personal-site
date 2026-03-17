"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useState } from "react";
import { withBasePath } from "@/lib/site";
import type { PersonalProjectDetailImage } from "@/lib/types";

type ProjectCardPreviewProps = {
  title: string;
  summary: string;
  detailImage: PersonalProjectDetailImage;
  previewLabel: string;
  previewZoomLabel: string;
  closePreviewLabel: string;
  placeholderPreviewLabel: string;
};

export function ProjectCardPreview({
  title,
  summary,
  detailImage,
  previewLabel,
  previewZoomLabel,
  closePreviewLabel,
  placeholderPreviewLabel,
}: ProjectCardPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const previewImage =
    detailImage.kind === "gallery" && detailImage.images.length
      ? detailImage.images[0]
      : null;

  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => handleEscape(event);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (!previewImage) {
    return (
      <div
        role="img"
        aria-label={detailImage.alt}
        className="relative overflow-hidden rounded-[28px] border border-line/80 bg-[linear-gradient(155deg,color-mix(in_srgb,var(--panel-strong)_94%,transparent)_0%,color-mix(in_srgb,var(--surface-subtle)_98%,transparent)_100%)] p-5 shadow-[var(--shadow-soft)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle at 14% 18%, color-mix(in srgb, var(--accent) 18%, transparent) 0, transparent 32%), linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 52%, transparent 66%)",
          }}
        />

        <div className="relative space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              {previewLabel}
            </div>
            <div className="rounded-full border border-line bg-canvas-elevated/72 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              {placeholderPreviewLabel}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
            <p className="text-sm leading-7 text-ink-muted">{summary}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block w-full overflow-hidden rounded-[28px] border border-line/80 bg-canvas-elevated/78 p-3 text-left shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-accent/45"
      >
        <div className="flex items-center justify-between gap-3 px-2 pb-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
            {previewLabel}
          </div>
          <div className="rounded-full border border-accent/18 bg-[var(--accent-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent">
            {previewZoomLabel}
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-line/75 bg-[#17110E]">
          <Image
            src={withBasePath(previewImage.src)}
            alt={previewImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 360px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="space-y-1 px-2 pt-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {previewImage.label}
          </div>
          <p className="line-clamp-2 text-sm leading-6 text-ink-muted">
            {previewImage.caption}
          </p>
        </div>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-[rgba(18,14,10,0.82)] px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8"
          onClick={() => setIsOpen(false)}
        >
          <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
            <div
              className="w-full overflow-hidden rounded-[32px] border border-[rgba(255,248,239,0.12)] bg-[color-mix(in_srgb,var(--canvas-elevated)_86%,#0F1115_14%)] shadow-[0_36px_120px_rgba(0,0,0,0.36)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-line/70 px-5 py-4 sm:px-6">
                <div className="space-y-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                    {previewLabel}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-canvas-elevated/72 px-4 text-sm text-ink transition hover:border-accent/45 hover:bg-panel-strong"
                >
                  {closePreviewLabel}
                </button>
              </div>

              <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.34fr)]">
                <div className="relative overflow-hidden rounded-[26px] border border-line/75 bg-[#110E0C]">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={withBasePath(previewImage.src)}
                      alt={previewImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-[26px] border border-line/75 bg-canvas/78 p-5">
                  <div className="space-y-2">
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                      {previewImage.label}
                    </div>
                    <p className="text-sm leading-7 text-ink-muted">
                      {previewImage.caption}
                    </p>
                  </div>

                  <div className="mt-auto rounded-[20px] border border-accent/16 bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-ink-muted">
                    {previewZoomLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
