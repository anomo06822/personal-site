import Link from "next/link";
import type {
  HomeContent,
  HomeJourneyItem,
  HomeTabItem,
  RouteKey,
} from "@/lib/types";

type RecruiterHomeProps = {
  home: HomeContent;
  routeHrefs: Record<RouteKey, string>;
};

function HeroTabMapCard({
  item,
  href,
  index,
}: {
  item: HomeTabItem;
  href: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-[24px] border p-4 transition hover:-translate-y-0.5 ${
        item.routeKey === "home"
          ? "border-accent/35 bg-[linear-gradient(180deg,var(--accent-soft)_0%,color-mix(in_srgb,var(--panel-strong)_92%,transparent)_100%)]"
          : "border-line bg-canvas-elevated/76 hover:border-accent/35"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          {item.eyebrow}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink">
        {item.title}
      </h2>
      <p className="mt-2 text-sm leading-7 text-ink-muted">{item.description}</p>
    </Link>
  );
}

function TabGuideCard({
  item,
  href,
  index,
}: {
  item: HomeTabItem;
  href: string;
  index: number;
}) {
  return (
    <article
      className="group relative overflow-hidden rounded-[28px] border border-line bg-[linear-gradient(180deg,var(--panel)_0%,var(--surface-subtle)_100%)] p-6 shadow-[var(--shadow-panel)] transition hover:-translate-y-1 sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 12%, transparent) 0, transparent 28%)",
        }}
      />

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="eyebrow">{item.eyebrow}</div>
            <h3 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.15rem]">
              {item.title}
            </h3>
          </div>
          <span className="rounded-full border border-line bg-canvas-elevated/78 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="max-w-2xl text-base leading-8 text-ink-muted">
          {item.description}
        </p>

        <ul className="space-y-3 text-sm leading-7 text-ink-muted">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-canvas-elevated/78 px-5 text-sm text-ink transition group-hover:border-accent/45"
          >
            {item.hrefLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

function JourneyCard({
  item,
  routeHrefs,
  tabLabelMap,
}: {
  item: HomeJourneyItem;
  routeHrefs: Record<RouteKey, string>;
  tabLabelMap: Map<RouteKey, string>;
}) {
  return (
    <article className="card-surface h-full p-6 sm:p-7">
      <div className="flex h-full flex-col gap-5">
        <div className="space-y-3">
          <div className="eyebrow">{item.audience}</div>
          <h3 className="text-2xl font-semibold tracking-tight text-ink">
            {item.title}
          </h3>
          <p className="text-sm leading-7 text-ink-muted">{item.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {item.routeKeys.map((routeKey, index) => (
            <div key={routeKey} className="flex items-center gap-2">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted"
                >
                  →
                </span>
              ) : null}
              <Link
                href={routeHrefs[routeKey]}
                className="inline-flex min-h-10 items-center rounded-full border border-line bg-canvas-elevated/72 px-4 text-sm text-ink transition hover:border-accent/45"
              >
                {tabLabelMap.get(routeKey) ?? routeKey}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-auto rounded-[22px] border border-accent/18 bg-[var(--accent-soft)] px-4 py-3 text-sm leading-7 text-ink-muted">
          {item.note}
        </div>
      </div>
    </article>
  );
}

export function RecruiterHome({ home, routeHrefs }: RecruiterHomeProps) {
  const tabLabelMap = new Map(
    home.tabs.map((item) => [item.routeKey, item.title] as const),
  );
  const primaryTabs = home.tabs.filter((item) => item.routeKey !== "home");

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden border-b border-line/80 pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full opacity-95"
          style={{
            background:
              "radial-gradient(circle at 8% 18%, color-mix(in srgb, var(--accent) 16%, transparent) 0, transparent 30%), radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--ink) 10%, transparent) 0, transparent 28%), linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--surface-subtle) 82%, transparent) 100%)",
          }}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.94fr)] xl:items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="eyebrow">{home.heroEyebrow}</div>
              <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
                {home.heroTitle}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-ink sm:text-lg">
                {home.heroIntro}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {primaryTabs.map((item) => (
                <Link
                  key={item.routeKey}
                  href={routeHrefs[item.routeKey]}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-canvas-elevated/78 px-5 text-sm text-ink transition hover:border-accent/45 hover:bg-panel-strong"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="impact-card max-w-2xl p-5 sm:p-6">
              <div className="space-y-3">
                <div className="eyebrow">{home.heroNoticeTitle}</div>
                <p className="text-base leading-8 text-ink-muted">
                  {home.heroNoticeBody}
                </p>
              </div>
            </div>
          </div>

          <aside className="card-surface overflow-hidden p-3 sm:p-4">
            <div className="space-y-4">
              <div className="px-2 pt-2">
                <div className="eyebrow">{home.heroMapEyebrow}</div>
                <p className="mt-3 max-w-md text-sm leading-7 text-ink-muted">
                  {home.heroMapIntro}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {home.tabs.map((item, index) => (
                  <HeroTabMapCard
                    key={item.routeKey}
                    item={item}
                    href={routeHrefs[item.routeKey]}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow">{home.tabsEyebrow}</div>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.35rem]">
            {home.tabsTitle}
          </h2>
          <p className="max-w-4xl text-base leading-8 text-ink-muted">
            {home.tabsIntro}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {home.tabs.map((item, index) => (
            <TabGuideCard
              key={item.routeKey}
              item={item}
              href={routeHrefs[item.routeKey]}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow">{home.journeysEyebrow}</div>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.35rem]">
            {home.journeysTitle}
          </h2>
          <p className="max-w-4xl text-base leading-8 text-ink-muted">
            {home.journeysIntro}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {home.journeys.map((item) => (
            <JourneyCard
              key={item.audience + item.title}
              item={item}
              routeHrefs={routeHrefs}
              tabLabelMap={tabLabelMap}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
