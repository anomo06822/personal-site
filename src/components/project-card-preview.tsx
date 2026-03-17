import Image from "next/image";
import { withBasePath } from "@/lib/site";
import type { PersonalProjectDetailImage } from "@/lib/types";

type ProjectCardPreviewProps = {
  title: string;
  summary: string;
  detailImage: PersonalProjectDetailImage;
  previewLabel: string;
  placeholderPreviewLabel: string;
};

export function ProjectCardPreview({
  title,
  summary,
  detailImage,
  previewLabel,
  placeholderPreviewLabel,
}: ProjectCardPreviewProps) {
  const previewImage =
    detailImage.kind === "gallery" && detailImage.images.length
      ? detailImage.images[0]
      : null;

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
    <div className="group relative block w-full overflow-hidden rounded-[28px] border border-line/80 bg-canvas-elevated/78 p-3 shadow-[var(--shadow-soft)]">
      <div className="px-2 pb-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          {previewLabel}
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-line/75 bg-[#17110E]">
        <Image
          src={withBasePath(previewImage.src)}
          alt={previewImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 360px"
          className="object-cover"
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
    </div>
  );
}
