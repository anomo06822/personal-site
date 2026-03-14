"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { ProjectShowcase, ShowcaseProjectItem } from "@/lib/types";

const tabOrder = ["personal", "core"] as const;
type ShowcaseTabKey = (typeof tabOrder)[number];

type ProjectShowcaseProps = {
  tabs: Record<ShowcaseTabKey, string>;
  items: ProjectShowcase;
  tabsAriaLabel: string;
  imageSlotLabel: string;
};

function ShowcaseCard({
  item,
  tabLabel,
  imageSlotLabel,
}: {
  item: ShowcaseProjectItem;
  tabLabel: string;
  imageSlotLabel: string;
}) {
  return (
    <article className="card-surface overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? `${item.title} preview`}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 14% 18%, color-mix(in srgb, var(--accent) 28%, transparent) 0, transparent 32%), radial-gradient(circle at 82% 74%, color-mix(in srgb, var(--ink) 10%, transparent) 0, transparent 30%), linear-gradient(135deg, color-mix(in srgb, var(--panel-strong) 92%, transparent) 0%, color-mix(in srgb, var(--surface-subtle) 96%, transparent) 100%)",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_42%,rgba(255,255,255,0.08)_42%,transparent_56%)]" />
            <div className="absolute left-5 top-5">
              <div className="eyebrow">{tabLabel}</div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 -translate-y-1/2">
              <div className="max-w-[16rem] text-2xl font-semibold tracking-tight text-ink sm:text-[1.85rem]">
                {item.title}
              </div>
              {item.subtitle ? (
                <div className="mt-2 text-sm leading-6 text-ink-muted">
                  {item.subtitle}
                </div>
              ) : null}
            </div>
            <div className="absolute bottom-5 right-5 rounded-full border border-accent/20 bg-canvas-elevated/85 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
              {imageSlotLabel}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-5 p-6 sm:p-7">
        <header className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-ink">
            {item.title}
          </h3>
          {item.subtitle ? (
            <div className="text-sm leading-7 text-ink-muted">{item.subtitle}</div>
          ) : null}
        </header>

        <p className="text-sm leading-7 text-ink-muted">{item.summary}</p>

        <ul className="space-y-3 text-sm leading-7 text-ink-muted">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
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
          <div className="rounded-2xl border border-accent/20 bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-ink-muted">
            {item.note}
          </div>
        ) : null}

        {item.href && item.hrefLabel ? (
          <div className="pt-1">
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

export function ProjectShowcase({
  tabs,
  items,
  tabsAriaLabel,
  imageSlotLabel,
}: ProjectShowcaseProps) {
  const [activeTab, setActiveTab] = useState<ShowcaseTabKey>("personal");
  const tabRefs = useRef<Record<ShowcaseTabKey, HTMLButtonElement | null>>({
    personal: null,
    core: null,
  });
  const baseId = useId();

  function moveToTab(nextTab: ShowcaseTabKey) {
    setActiveTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveToTab(tabOrder[(currentIndex + 1) % tabOrder.length]);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveToTab(tabOrder[(currentIndex - 1 + tabOrder.length) % tabOrder.length]);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      moveToTab(tabOrder[0]);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      moveToTab(tabOrder[tabOrder.length - 1]);
    }
  }

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label={tabsAriaLabel}
        className="inline-flex rounded-full border border-line bg-canvas-elevated/75 p-1.5 shadow-[var(--shadow-soft)]"
      >
        {tabOrder.map((tab, index) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              ref={(node) => {
                tabRefs.current[tab] = node;
              }}
              id={`${baseId}-${tab}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-${tab}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`rounded-full px-4 py-2.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                isActive
                  ? "bg-[var(--accent-soft)] text-ink shadow-[inset_0_0_0_1px_var(--accent-line)]"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {tabs[tab]}
            </button>
          );
        })}
      </div>

      <div className="grid">
        {tabOrder.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <div
              key={tab}
              id={`${baseId}-${tab}-panel`}
              role="tabpanel"
              aria-labelledby={`${baseId}-${tab}-tab`}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className={`col-start-1 row-start-1 transition-opacity duration-200 ${
                isActive ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="grid gap-4 xl:grid-cols-3">
                {items[tab].map((item) => (
                  <ShowcaseCard
                    key={item.title}
                    item={item}
                    tabLabel={tabs[tab]}
                    imageSlotLabel={imageSlotLabel}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
