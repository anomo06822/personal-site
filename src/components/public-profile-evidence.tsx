import type { ReactNode } from "react";
import {
  formatLongDate,
  formatNumber,
  formatShortMonth,
} from "@/lib/utils";
import type {
  GitHubProfileStats,
  LeetCodeDifficultyCount,
  LeetCodeProfileStats,
  Locale,
} from "@/lib/types";

type PublicProfileEvidenceProps = {
  locale: Locale;
  github: GitHubProfileStats;
  leetcode: LeetCodeProfileStats;
  title: string;
  intro: string;
  generatedLabel: string;
  unavailableTitle: string;
  unavailableBody: string;
  githubTitle: string;
  githubBody: string;
  githubCtaLabel: string;
  githubTotalLabel: string;
  githubRecentReposLabel: string;
  githubNoReposLabel: string;
  githubLegendLowLabel: string;
  githubLegendHighLabel: string;
  leetcodeTitle: string;
  leetcodeBody: string;
  leetcodeCtaLabel: string;
  leetcodeSolvedLabel: string;
  leetcodeRankingLabel: string;
  leetcodeReputationLabel: string;
  leetcodeStreakLabel: string;
  leetcodeActiveDaysLabel: string;
  leetcodeContestLabel: string;
  leetcodeDifficultyLabel: string;
  leetcodeMissingLabel: string;
  leetcodeUnavailableLabel: string;
};

function EvidenceShell({
  title,
  body,
  ctaLabel,
  ctaHref,
  meta,
  children,
}: {
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <article className="relative overflow-hidden rounded-[30px] border border-line/80 bg-[linear-gradient(180deg,var(--panel)_0%,color-mix(in_srgb,var(--surface-subtle)_96%,transparent)_100%)] p-6 shadow-[var(--shadow-panel)] sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 12% 14%, color-mix(in srgb, var(--accent) 12%, transparent) 0, transparent 28%), radial-gradient(circle at 88% 14%, color-mix(in srgb, var(--ink) 8%, transparent) 0, transparent 28%)",
        }}
      />

      <div className="relative flex h-full flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <h3 className="text-3xl font-semibold tracking-tight text-ink">
              {title}
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
              {body}
            </p>
          </div>

          {meta ? (
            <div className="rounded-full border border-accent/18 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              {meta}
            </div>
          ) : null}
        </div>

        {children}

        {ctaHref && ctaLabel ? (
          <div className="mt-auto pt-1">
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
            >
              {ctaLabel}
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function EvidenceUnavailable({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-line bg-canvas-elevated/62 p-5">
      <div className="space-y-3">
        <div className="eyebrow">{title}</div>
        <p className="text-sm leading-7 text-ink-muted">{body}</p>
      </div>
    </div>
  );
}

function GitHubHeatmap({
  locale,
  github,
  lowLabel,
  highLabel,
}: {
  locale: Locale;
  github: GitHubProfileStats;
  lowLabel: string;
  highLabel: string;
}) {
  const weekdayLabels =
    locale === "zh-TW"
      ? ["日", "一", "二", "三", "四", "五", "六"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const visibleWeeks = github.weeks.slice(-53);

  return (
    <div className="rounded-[24px] border border-line/80 bg-canvas-elevated/72 p-4">
      <div className="mb-3 flex items-center justify-between gap-4 text-xs text-ink-muted">
        <span>
          {formatShortMonth(locale, visibleWeeks[0]?.firstDay || github.generatedAt)}
        </span>
        <span>
          {formatShortMonth(
            locale,
            visibleWeeks.at(-1)?.firstDay || github.generatedAt,
          )}
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max gap-3">
          <div className="grid grid-rows-7 gap-1 pt-[1px] text-[10px] text-ink-muted">
            {weekdayLabels.map((label) => (
              <div key={label} className="flex h-3 items-center justify-end pr-1">
                {label}
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            {visibleWeeks.map((week) => (
              <div
                key={week.firstDay}
                className="grid grid-rows-7 gap-1"
                aria-label={week.firstDay}
              >
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    className="h-3 w-3 rounded-[4px] border border-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    style={{ backgroundColor: day.color }}
                    title={`${formatLongDate(locale, day.date)} · ${formatNumber(locale, day.count)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        <span>{lowLabel}</span>
        <div className="flex gap-1">
          {github.legend.map((item) => (
            <span
              key={item.level}
              className="h-3 w-3 rounded-[4px] border border-black/5"
              style={{ backgroundColor: item.color }}
            />
          ))}
        </div>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

function DifficultyBar({
  locale,
  item,
  total,
}: {
  locale: Locale;
  item: LeetCodeDifficultyCount & { difficulty: "Easy" | "Medium" | "Hard" };
  total: number;
}) {
  const difficultyLabelMap = {
    Easy: locale === "zh-TW" ? "簡單" : "Easy",
    Medium: locale === "zh-TW" ? "中等" : "Medium",
    Hard: locale === "zh-TW" ? "困難" : "Hard",
  };
  const colorMap = {
    Easy: "#16a34a",
    Medium: "#d97706",
    Hard: "#dc2626",
  };
  const width =
    total > 0 && item.count > 0
      ? Math.max(8, Math.round((item.count / total) * 100))
      : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-sm text-ink">
        <span>{difficultyLabelMap[item.difficulty]}</span>
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
          {formatNumber(locale, item.count)}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-canvas/85">
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            backgroundColor: colorMap[item.difficulty],
          }}
        />
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-line/75 bg-canvas-elevated/75 p-4">
      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        {value}
      </div>
    </div>
  );
}

function GitHubEvidenceCard({
  locale,
  github,
  generatedLabel,
  unavailableTitle,
  unavailableBody,
  title,
  body,
  ctaLabel,
  totalLabel,
  recentReposLabel,
  noReposLabel,
  legendLowLabel,
  legendHighLabel,
}: {
  locale: Locale;
  github: GitHubProfileStats;
  generatedLabel: string;
  unavailableTitle: string;
  unavailableBody: string;
  title: string;
  body: string;
  ctaLabel: string;
  totalLabel: string;
  recentReposLabel: string;
  noReposLabel: string;
  legendLowLabel: string;
  legendHighLabel: string;
}) {
  return (
    <EvidenceShell
      title={title}
      body={body}
      ctaLabel={ctaLabel}
      ctaHref={github.profileUrl}
      meta={`${generatedLabel} · ${formatLongDate(locale, github.generatedAt)}`}
    >
      {github.available ? (
        <div className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
            <div className="rounded-[24px] border border-line/80 bg-canvas-elevated/78 p-5">
              <div className="eyebrow">{totalLabel}</div>
              <div className="mt-4 text-5xl font-semibold tracking-tight text-ink">
                {formatNumber(locale, github.yearTotal)}
              </div>
              <p className="mt-4 text-sm leading-7 text-ink-muted">
                {github.username}
              </p>
            </div>

            <GitHubHeatmap
              locale={locale}
              github={github}
              lowLabel={legendLowLabel}
              highLabel={legendHighLabel}
            />
          </div>

          <div className="space-y-3">
            <div className="eyebrow">{recentReposLabel}</div>

            {github.recentRepositories.length ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {github.recentRepositories.map((repository) => (
                  <a
                    key={repository.url}
                    href={repository.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[22px] border border-line/75 bg-canvas-elevated/72 p-4 transition hover:border-accent/45 hover:bg-panel-strong"
                  >
                    <div className="space-y-3">
                      <div>
                        <div className="text-base font-semibold tracking-tight text-ink">
                          {repository.name}
                        </div>
                        {repository.pushedAt ? (
                          <div className="mt-1 text-xs text-ink-muted">
                            {formatLongDate(locale, repository.pushedAt)}
                          </div>
                        ) : null}
                      </div>

                      {repository.description ? (
                        <p className="text-sm leading-7 text-ink-muted">
                          {repository.description}
                        </p>
                      ) : null}

                      {repository.primaryLanguage?.name ? (
                        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                          {repository.primaryLanguage.name}
                        </div>
                      ) : null}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-[22px] border border-dashed border-line bg-canvas-elevated/68 p-4 text-sm leading-7 text-ink-muted">
                {noReposLabel}
              </div>
            )}
          </div>
        </div>
      ) : (
        <EvidenceUnavailable title={unavailableTitle} body={unavailableBody} />
      )}
    </EvidenceShell>
  );
}

function LeetCodeEvidenceCard({
  locale,
  leetcode,
  generatedLabel,
  unavailableTitle,
  title,
  body,
  ctaLabel,
  solvedLabel,
  rankingLabel,
  reputationLabel,
  streakLabel,
  activeDaysLabel,
  contestLabel,
  difficultyLabel,
  missingLabel,
  unavailableLabel,
}: {
  locale: Locale;
  leetcode: LeetCodeProfileStats;
  generatedLabel: string;
  unavailableTitle: string;
  title: string;
  body: string;
  ctaLabel: string;
  solvedLabel: string;
  rankingLabel: string;
  reputationLabel: string;
  streakLabel: string;
  activeDaysLabel: string;
  contestLabel: string;
  difficultyLabel: string;
  missingLabel: string;
  unavailableLabel: string;
}) {
  const difficultyCounts = leetcode.difficultyCounts.filter(
    (item) => item.difficulty !== "All",
  ) as Array<LeetCodeDifficultyCount & { difficulty: "Easy" | "Medium" | "Hard" }>;
  const fallbackBody = leetcode.username ? unavailableLabel : missingLabel;

  return (
    <EvidenceShell
      title={title}
      body={body}
      ctaLabel={leetcode.profileUrl ? ctaLabel : undefined}
      ctaHref={leetcode.profileUrl}
      meta={`${generatedLabel} · ${formatLongDate(locale, leetcode.generatedAt)}`}
    >
      {leetcode.available ? (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard
              label={solvedLabel}
              value={formatNumber(locale, leetcode.solvedCount)}
            />
            <MetricCard
              label={streakLabel}
              value={formatNumber(locale, leetcode.streakOrActiveDays.streak)}
            />
            <MetricCard
              label={activeDaysLabel}
              value={formatNumber(locale, leetcode.streakOrActiveDays.totalActiveDays)}
            />
            <MetricCard
              label={leetcode.contest ? contestLabel : rankingLabel}
              value={
                leetcode.contest
                  ? formatNumber(locale, Math.round(leetcode.contest.rating))
                  : leetcode.ranking
                    ? `#${formatNumber(locale, leetcode.ranking)}`
                    : "-"
              }
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {leetcode.reputation !== undefined ? (
              <MetricCard
                label={reputationLabel}
                value={formatNumber(locale, leetcode.reputation)}
              />
            ) : null}

            {leetcode.contest ? (
              <MetricCard
                label={locale === "zh-TW" ? "Contest 場次" : "Contests attended"}
                value={formatNumber(locale, leetcode.contest.attendedContestsCount)}
              />
            ) : null}
          </div>

          {difficultyCounts.length ? (
            <div className="rounded-[24px] border border-line/80 bg-canvas-elevated/72 p-5">
              <div className="eyebrow">{difficultyLabel}</div>
              <div className="mt-4 space-y-4">
                {difficultyCounts.map((item) => (
                  <DifficultyBar
                    key={item.difficulty}
                    locale={locale}
                    item={item}
                    total={leetcode.solvedCount}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <EvidenceUnavailable title={unavailableTitle} body={fallbackBody} />
      )}
    </EvidenceShell>
  );
}

export function PublicProfileEvidence({
  locale,
  github,
  leetcode,
  title,
  intro,
  generatedLabel,
  unavailableTitle,
  unavailableBody,
  githubTitle,
  githubBody,
  githubCtaLabel,
  githubTotalLabel,
  githubRecentReposLabel,
  githubNoReposLabel,
  githubLegendLowLabel,
  githubLegendHighLabel,
  leetcodeTitle,
  leetcodeBody,
  leetcodeCtaLabel,
  leetcodeSolvedLabel,
  leetcodeRankingLabel,
  leetcodeReputationLabel,
  leetcodeStreakLabel,
  leetcodeActiveDaysLabel,
  leetcodeContestLabel,
  leetcodeDifficultyLabel,
  leetcodeMissingLabel,
  leetcodeUnavailableLabel,
}: PublicProfileEvidenceProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
          {title}
        </h2>
        <p className="max-w-4xl text-base leading-8 text-ink-muted">
          {intro}
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
        <GitHubEvidenceCard
          locale={locale}
          github={github}
          generatedLabel={generatedLabel}
          unavailableTitle={unavailableTitle}
          unavailableBody={unavailableBody}
          title={githubTitle}
          body={githubBody}
          ctaLabel={githubCtaLabel}
          totalLabel={githubTotalLabel}
          recentReposLabel={githubRecentReposLabel}
          noReposLabel={githubNoReposLabel}
          legendLowLabel={githubLegendLowLabel}
          legendHighLabel={githubLegendHighLabel}
        />

        <LeetCodeEvidenceCard
          locale={locale}
          leetcode={leetcode}
          generatedLabel={generatedLabel}
          unavailableTitle={unavailableTitle}
          title={leetcodeTitle}
          body={leetcodeBody}
          ctaLabel={leetcodeCtaLabel}
          solvedLabel={leetcodeSolvedLabel}
          rankingLabel={leetcodeRankingLabel}
          reputationLabel={leetcodeReputationLabel}
          streakLabel={leetcodeStreakLabel}
          activeDaysLabel={leetcodeActiveDaysLabel}
          contestLabel={leetcodeContestLabel}
          difficultyLabel={leetcodeDifficultyLabel}
          missingLabel={leetcodeMissingLabel}
          unavailableLabel={leetcodeUnavailableLabel}
        />
      </div>
    </section>
  );
}
