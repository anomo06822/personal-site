"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useState } from "react";
import { withBasePath } from "@/lib/site";
import type { PersonalProjectDetailImage } from "@/lib/types";

type GalleryDetailImage = Extract<PersonalProjectDetailImage, { kind: "gallery" }>;

type ProjectDetailGalleryProps = {
  title: string;
  summary: string;
  tags?: string[];
  previewLabel: string;
  previewNote?: string;
  detailImage: GalleryDetailImage;
  zoomLabel: string;
  closeLabel: string;
};

export function ProjectDetailGallery({
  title,
  summary,
  tags,
  previewLabel,
  previewNote,
  detailImage,
  zoomLabel,
  closeLabel,
}: ProjectDetailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage =
    selectedIndex === null ? null : detailImage.images[selectedIndex] ?? null;
  function closePreview() {
    setSelectedIndex(null);
  }

  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closePreview();
    }
  });

  useEffect(() => {
    if (selectedIndex === null) {
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
  }, [selectedIndex]);

  return (
    <>
      <div className="space-y-4">
        <div className="overflow-hidden rounded-[32px] border border-line/80 bg-canvas-elevated/78 p-4 shadow-[0_24px_60px_rgba(10,12,12,0.14)] sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(220px,0.38fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-[28px] border border-accent/16 bg-[linear-gradient(155deg,#1D1511_0%,#241A14_55%,#120E0C_100%)] p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(227,154,99,0.24),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_48%)]" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                {detailImage.logoSrc ? (
                  <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/8 bg-black/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <Image
                      src={withBasePath(detailImage.logoSrc)}
                      alt={detailImage.logoAlt ?? title}
                      width={52}
                      height={52}
                      className="h-11 w-11"
                    />
                  </div>
                ) : null}

                <div className="space-y-4">
                  <div className="eyebrow text-accent">{previewLabel}</div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-[2.3rem]">
                      {title}
                    </h3>
                    <p className="text-sm leading-7 text-[rgba(255,243,230,0.74)]">
                      {summary}
                    </p>
                  </div>
                </div>

                {tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[rgba(255,243,230,0.78)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {detailImage.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group overflow-hidden rounded-[28px] border border-line/80 bg-canvas text-left transition duration-300 hover:-translate-y-0.5 hover:border-accent/45"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line/75 bg-[#17110E]">
                    <Image
                      src={withBasePath(image.src)}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute right-3 top-3 rounded-full border border-[rgba(255,248,239,0.14)] bg-[rgba(21,16,12,0.72)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[rgba(255,243,230,0.88)]">
                      {zoomLabel}
                    </div>
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                      {image.label}
                    </div>
                    <p className="text-sm leading-7 text-ink-muted">{image.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {previewNote ? (
          <p className="max-w-4xl text-sm leading-7 text-ink-muted">{previewNote}</p>
        ) : null}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[120] overflow-y-auto bg-[rgba(17,12,8,0.86)] p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
          onClick={() => closePreview()}
        >
          <div className="mx-auto flex min-h-full max-w-6xl items-center justify-center">
            <div
              className="w-full overflow-hidden rounded-[32px] border border-[rgba(255,248,239,0.12)] bg-[color-mix(in_srgb,var(--canvas-elevated)_92%,#120F0D_8%)] shadow-[0_36px_120px_rgba(0,0,0,0.38)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-line/70 px-5 py-4 sm:px-6">
                <div className="space-y-1">
                  <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                    {selectedImage.label}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
                </div>

                <button
                  type="button"
                  onClick={() => closePreview()}
                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-canvas-elevated/72 px-4 text-sm text-ink transition hover:border-accent/45 hover:bg-panel-strong"
                >
                  {closeLabel}
                </button>
              </div>

              <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.34fr)]">
                <div className="flex items-center justify-center overflow-hidden rounded-[26px] border border-line/75 bg-[#110E0C]">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={withBasePath(selectedImage.src)}
                      alt={selectedImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-[26px] border border-line/75 bg-canvas/78 p-5">
                  <div className="space-y-2">
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                      {selectedImage.label}
                    </div>
                    <p className="text-sm leading-7 text-ink-muted">
                      {selectedImage.caption}
                    </p>
                  </div>

                  <div className="mt-auto rounded-[20px] border border-accent/16 bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-ink-muted">
                    {closeLabel}
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
