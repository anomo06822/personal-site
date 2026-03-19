import { OverviewRouteLink } from "@/components/overview-route-link";
import { BlogHeroImage } from "@/components/blog-hero-image";
import type { ReactNode } from "react";
import { formatLongDate } from "@/lib/utils";
import type {
  BlogPostMeta,
  HomeContent,
  HomeGuideItem,
  HomeJourneyItem,
  HomeTabItem,
  Locale,
  PersonalProjectItem,
  ResumeImpactPoint,
  RouteKey,
} from "@/lib/types";
import {
  formatPostTagLabel,
  getVisiblePostTags,
  PostSignalBadges,
} from "@/components/post-signals";

type DecisionRoute = Exclude<RouteKey, "home">;

type RecruiterHomeProps = {
  locale: Locale;
  home: HomeContent;
  routeHrefs: Record<RouteKey, string>;
  featuredProjects: PersonalProjectItem[];
  totalProjectCount: number;
  featuredPosts: BlogPostMeta[];
  totalPostCount: number;
  resumeHighlights: ResumeImpactPoint[];
};

function buildTabMap(tabs: HomeTabItem[]) {
  return new Map(tabs.map((item) => [item.routeKey, item] as const));
}

function getRouteCopy(
  tabMap: Map<RouteKey, HomeTabItem>,
  routeKey: DecisionRoute,
) {
  const item = tabMap.get(routeKey);

  if (!item) {
    throw new Error(`Missing home tab copy for route ${routeKey}.`);
  }

  return item;
}

function AudiencePathCard({
  item,
  routeHrefs,
  tabMap,
}: {
  item: HomeJourneyItem;
  routeHrefs: Record<RouteKey, string>;
  tabMap: Map<RouteKey, HomeTabItem>;
}) {
  const primaryRoute = item.routeKeys[0] as DecisionRoute;
  const secondaryRoute = item.routeKeys[1] as DecisionRoute;
  const primaryTab = getRouteCopy(tabMap, primaryRoute);
  const secondaryTab = getRouteCopy(tabMap, secondaryRoute);

  return (
    <article className="relative overflow-hidden rounded-[30px] border border-line/80 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--panel)_96%,transparent)_0%,color-mix(in_srgb,var(--surface-subtle)_100%,transparent)_100%)] p-6 shadow-[var(--shadow-panel)] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at top right, color-mix(in srgb, var(--accent) 16%, transparent) 0, transparent 30%), linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.06) 56%, transparent 72%)",
        }}
      />

      <div className="relative flex h-full flex-col gap-5">
        <div className="eyebrow">{item.audience}</div>

        <div className="space-y-3">
          <h3 className="max-w-xl text-[1.85rem] font-semibold tracking-tight text-ink sm:text-[2rem]">
            {item.title}
          </h3>
          <p className="text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
            {item.summary}
          </p>
        </div>

        <div className="rounded-[22px] border border-line/80 bg-canvas/65 px-4 py-3 text-sm leading-7 text-ink-muted">
          {item.note}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-1">
          <OverviewRouteLink
            href={routeHrefs[primaryRoute]}
            sourceSection="hero_path_primary"
            audiencePath={item.id}
            targetRoute={primaryRoute}
            className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
          >
            {primaryTab.hrefLabel}
          </OverviewRouteLink>

          <OverviewRouteLink
            href={routeHrefs[secondaryRoute]}
            sourceSection="hero_path_secondary"
            audiencePath={item.id}
            targetRoute={secondaryRoute}
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-canvas-elevated/78 px-5 text-sm text-ink transition hover:border-accent/45 hover:bg-panel-strong"
          >
            {secondaryTab.hrefLabel}
          </OverviewRouteLink>
        </div>
      </div>
    </article>
  );
}

function EvidenceCardFrame({
  eyebrow,
  title,
  description,
  meta,
  cta,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  cta: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="relative overflow-hidden rounded-[30px] border border-line/80 bg-[linear-gradient(180deg,var(--panel)_0%,color-mix(in_srgb,var(--surface-subtle)_96%,transparent)_100%)] p-6 shadow-[var(--shadow-panel)] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 12% 14%, color-mix(in srgb, var(--accent) 12%, transparent) 0, transparent 26%), radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--ink) 7%, transparent) 0, transparent 30%)",
        }}
      />

      <div className="relative flex h-full flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="eyebrow">{eyebrow}</div>
            <div className="space-y-3">
              <h3 className="text-3xl font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
                {description}
              </p>
            </div>
          </div>

          {meta ? (
            <div className="rounded-full border border-accent/18 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              {meta}
            </div>
          ) : null}
        </div>

        {children}

        <div className="mt-auto pt-1">{cta}</div>
      </div>
    </article>
  );
}

function ResumeEvidenceCard({
  locale,
  tab,
  href,
  resumeHighlights,
}: {
  locale: Locale;
  tab: HomeTabItem;
  href: string;
  resumeHighlights: ResumeImpactPoint[];
}) {
  return (
    <EvidenceCardFrame
      eyebrow={tab.eyebrow}
      title={tab.title}
      description={tab.description}
      meta={
        locale === "zh-TW"
          ? `${resumeHighlights.length} 個關鍵訊號`
          : `${resumeHighlights.length} key signals`
      }
      cta={
        <OverviewRouteLink
          href={href}
          sourceSection="evidence_resume"
          audiencePath="all"
          targetRoute="resume"
          className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
        >
          {tab.hrefLabel}
        </OverviewRouteLink>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {resumeHighlights.map((item) => (
          <div
            key={item.value + item.label}
            className="rounded-[22px] border border-line/75 bg-canvas-elevated/75 p-4"
          >
            <div className="text-3xl font-semibold tracking-tight text-ink">
              {item.value}
            </div>
            <div className="mt-2 text-sm font-medium leading-7 text-ink">
              {item.label}
            </div>
            <p className="mt-3 text-sm leading-7 text-ink-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </EvidenceCardFrame>
  );
}

function ProjectEvidenceCard({
  locale,
  tab,
  href,
  featuredProjects,
  totalProjectCount,
}: {
  locale: Locale;
  tab: HomeTabItem;
  href: string;
  featuredProjects: PersonalProjectItem[];
  totalProjectCount: number;
}) {
  const countLabel =
    locale === "zh-TW"
      ? `${totalProjectCount} 個公開專案`
      : `${totalProjectCount} public builds`;

  return (
    <EvidenceCardFrame
      eyebrow={tab.eyebrow}
      title={tab.title}
      description={tab.description}
      meta={countLabel}
      cta={
        <OverviewRouteLink
          href={href}
          sourceSection="evidence_projects"
          audiencePath="all"
          targetRoute="projects"
          className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
        >
          {tab.hrefLabel}
        </OverviewRouteLink>
      }
    >
      <div className="space-y-4">
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className="rounded-[24px] border border-line/75 bg-canvas-elevated/70 p-5"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {project.subtitle ? (
                  <div className="eyebrow">{project.subtitle}</div>
                ) : null}
                {project.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold tracking-tight text-ink">
                  {project.title}
                </h4>
                <p className="text-sm leading-7 text-ink-muted">
                  {project.summary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </EvidenceCardFrame>
  );
}

function WritingEvidenceCard({
  locale,
  tab,
  href,
  featuredPosts,
  totalPostCount,
}: {
  locale: Locale;
  tab: HomeTabItem;
  href: string;
  featuredPosts: BlogPostMeta[];
  totalPostCount: number;
}) {
  const countLabel =
    locale === "zh-TW"
      ? `${totalPostCount} 篇公開文章`
      : `${totalPostCount} published essays`;

  return (
    <EvidenceCardFrame
      eyebrow={tab.eyebrow}
      title={tab.title}
      description={tab.description}
      meta={countLabel}
      cta={
        <OverviewRouteLink
          href={href}
          sourceSection="evidence_blog"
          audiencePath="all"
          targetRoute="blog"
          className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
        >
          {tab.hrefLabel}
        </OverviewRouteLink>
      }
    >
      <div className="space-y-4">
        {featuredPosts.map((post) => (
          <div
            key={post.slug}
            className="rounded-[24px] border border-line/75 bg-canvas-elevated/70 p-5"
          >
            <div className="space-y-4">
              <BlogHeroImage
                locale={locale}
                slug={post.slug}
                heroImagePath={post.heroImagePath}
                title={post.title}
              />
              <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
                <div className="eyebrow">{formatLongDate(locale, post.publishedAt)}</div>
                <span>
                  {post.readingTime} {locale === "zh-TW" ? "分鐘閱讀" : "min read"}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-semibold tracking-tight text-ink">
                  {post.title}
                </h4>
                <p className="text-sm leading-7 text-ink-muted">
                  {post.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <PostSignalBadges locale={locale} post={post} />
              </div>

              {getVisiblePostTags(post).length ? (
                <div className="flex flex-wrap gap-2">
                  {getVisiblePostTags(post).slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-chip">
                      {formatPostTagLabel(tag)}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </EvidenceCardFrame>
  );
}

function ContactPrompt({
  locale,
  tab,
  href,
}: {
  locale: Locale;
  tab: HomeTabItem;
  href: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-line/80 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--accent-soft)_90%,transparent)_0%,color-mix(in_srgb,var(--canvas-elevated)_94%,transparent)_100%)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="eyebrow">{tab.eyebrow}</div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight text-ink">
              {locale === "zh-TW"
                ? "方向已經明確的話，直接開始對話。"
                : "If the direction already fits, skip straight to contact."}
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
              {tab.description}
            </p>
          </div>
        </div>

        <OverviewRouteLink
          href={href}
          sourceSection="evidence_contact"
          audiencePath="all"
          targetRoute="contact"
          className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-accent/35 bg-canvas-elevated/85 px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
        >
          {tab.hrefLabel}
        </OverviewRouteLink>
      </div>
    </section>
  );
}

function GuideCard({ item }: { item: HomeGuideItem }) {
  return (
    <article className="h-full rounded-[28px] border border-line/80 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--panel)_96%,transparent)_0%,color-mix(in_srgb,var(--surface-subtle)_100%,transparent)_100%)] p-6 shadow-[var(--shadow-soft)] sm:p-7">
      <div className="space-y-4">
        <div className="eyebrow">{item.eyebrow}</div>
        <h3 className="text-2xl font-semibold tracking-tight text-ink">
          {item.title}
        </h3>
        <p className="text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function RecruiterHome({
  locale,
  home,
  routeHrefs,
  featuredProjects,
  totalProjectCount,
  featuredPosts,
  totalPostCount,
  resumeHighlights,
}: RecruiterHomeProps) {
  const tabMap = buildTabMap(home.tabs);
  const resumeTab = getRouteCopy(tabMap, "resume");
  const projectTab = getRouteCopy(tabMap, "projects");
  const blogTab = getRouteCopy(tabMap, "blog");
  const contactTab = getRouteCopy(tabMap, "contact");

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden border-b border-line/80 pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full opacity-95"
          style={{
            background:
              "radial-gradient(circle at 10% 16%, color-mix(in srgb, var(--accent) 18%, transparent) 0, transparent 30%), radial-gradient(circle at 92% 12%, color-mix(in srgb, var(--ink) 10%, transparent) 0, transparent 30%), linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--surface-subtle) 84%, transparent) 100%)",
          }}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.98fr)] xl:items-start">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="eyebrow">{home.heroEyebrow}</div>
              <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.55rem]">
                {home.heroTitle}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-ink sm:text-lg">
                {home.heroIntro}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {home.heroTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-canvas-elevated/78 px-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="space-y-3">
              <div className="eyebrow">{home.journeysEyebrow}</div>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-ink">
                {home.journeysTitle}
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
                {home.journeysIntro}
              </p>
            </div>

            <div className="grid gap-4">
              {home.journeys.map((item) => (
                <AudiencePathCard
                  key={item.id}
                  item={item}
                  routeHrefs={routeHrefs}
                  tabMap={tabMap}
                />
              ))}
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

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <ResumeEvidenceCard
            locale={locale}
            tab={resumeTab}
            href={routeHrefs.resume}
            resumeHighlights={resumeHighlights}
          />

          <div className="grid gap-4">
            <ProjectEvidenceCard
              locale={locale}
              tab={projectTab}
              href={routeHrefs.projects}
              featuredProjects={featuredProjects}
              totalProjectCount={totalProjectCount}
            />

            <WritingEvidenceCard
              locale={locale}
              tab={blogTab}
              href={routeHrefs.blog}
              featuredPosts={featuredPosts}
              totalPostCount={totalPostCount}
            />
          </div>
        </div>

        <ContactPrompt
          locale={locale}
          tab={contactTab}
          href={routeHrefs.contact}
        />
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <div className="eyebrow">{home.guideEyebrow}</div>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.35rem]">
            {home.guideTitle}
          </h2>
          <p className="max-w-4xl text-base leading-8 text-ink-muted">
            {home.guideIntro}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {home.guideItems.map((item) => (
            <GuideCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
