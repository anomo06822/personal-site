"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ExperienceGalleryItem } from "@/lib/types";

type ExperienceGalleryProps = {
  intro: string;
  items: ExperienceGalleryItem[];
  badgeLabel: string;
  previousLabel: string;
  nextLabel: string;
};

type ScrollState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

function ExperienceGalleryPlaceholder({
  item,
  index,
  badgeLabel,
}: {
  item: ExperienceGalleryItem;
  index: number;
  badgeLabel: string;
}) {
  return (
    <div
      role="img"
      aria-label={item.imageAlt}
      className="relative flex aspect-[4/5] items-end overflow-hidden rounded-[26px] border border-line/80 p-5"
      style={{
        background:
          "radial-gradient(circle at 18% 18%, color-mix(in srgb, var(--accent) 18%, transparent) 0, transparent 28%), radial-gradient(circle at 84% 22%, color-mix(in srgb, var(--ink) 9%, transparent) 0, transparent 30%), linear-gradient(160deg, color-mix(in srgb, var(--panel-strong) 96%, transparent) 0%, color-mix(in srgb, var(--surface-subtle) 94%, transparent) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_54%,rgba(255,255,255,0.08)_54%,transparent_70%)]" />

      <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3">
        <span className="rounded-full border border-accent/25 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-accent">
          {badgeLabel}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-ink-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 space-y-3">
        <div className="eyebrow text-accent">{item.period}</div>
        <div className="max-w-[18rem] text-2xl font-semibold tracking-tight text-ink">
          {item.title}
        </div>
      </div>
    </div>
  );
}

function ExperienceGalleryCard({
  item,
  index,
  badgeLabel,
}: {
  item: ExperienceGalleryItem;
  index: number;
  badgeLabel: string;
}) {
  return (
    <article className="group flex h-full w-[min(82vw,22rem)] shrink-0 snap-start flex-col rounded-[30px] border border-line bg-[linear-gradient(180deg,var(--panel-strong)_0%,var(--surface-subtle)_100%)] p-4 shadow-[var(--shadow-panel)] transition sm:w-[22rem] xl:w-[24rem]">
      <div className="relative">
        {item.imageSrc ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-line/80 bg-canvas-elevated/72">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 1280px) 24rem, (min-width: 640px) 22rem, 82vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.04)_0%,rgba(14,12,10,0.02)_36%,rgba(14,12,10,0.28)_100%)]" />
          </div>
        ) : (
          <ExperienceGalleryPlaceholder
            item={item}
            index={index}
            badgeLabel={badgeLabel}
          />
        )}

        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/18 bg-[rgba(14,12,10,0.42)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <div className="eyebrow">{item.period}</div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
          {item.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-ink-muted">{item.caption}</p>
      </div>
    </article>
  );
}

export function ExperienceGallery({
  intro,
  items,
  badgeLabel,
  previousLabel,
  nextLabel,
}: ExperienceGalleryProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollPrev: false,
    canScrollNext: items.length > 1,
  });

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const syncScrollState = () => {
      const maxScrollLeft = rail.scrollWidth - rail.clientWidth;

      setScrollState({
        canScrollPrev: rail.scrollLeft > 8,
        canScrollNext: rail.scrollLeft < maxScrollLeft - 8,
      });
    };

    syncScrollState();
    rail.addEventListener("scroll", syncScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(syncScrollState);
    resizeObserver.observe(rail);

    return () => {
      rail.removeEventListener("scroll", syncScrollState);
      resizeObserver.disconnect();
    };
  }, [items.length]);

  const handleStep = (direction: "prev" | "next") => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const card = rail.firstElementChild as HTMLElement | null;
    const gap = 16;
    const step =
      (card?.getBoundingClientRect().width ?? rail.clientWidth * 0.86) + gap;

    rail.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <article className="card-surface overflow-hidden p-6 sm:p-7">
      <div className="flex flex-col gap-5 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-3xl text-base leading-8 text-ink-muted">{intro}</p>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => handleStep("prev")}
            disabled={!scrollState.canScrollPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-canvas-elevated/78 text-lg text-ink transition hover:border-accent/45 hover:bg-panel-strong disabled:cursor-not-allowed disabled:opacity-35"
            aria-label={previousLabel}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => handleStep("next")}
            disabled={!scrollState.canScrollNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-canvas-elevated/78 text-lg text-ink transition hover:border-accent/45 hover:bg-panel-strong disabled:cursor-not-allowed disabled:opacity-35"
            aria-label={nextLabel}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <ExperienceGalleryCard
            key={`${item.title}-${item.period}`}
            item={item}
            index={index}
            badgeLabel={badgeLabel}
          />
        ))}
      </div>
    </article>
  );
}
