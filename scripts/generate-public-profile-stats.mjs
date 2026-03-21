#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(
  rootDir,
  "content",
  "generated",
  "public-profile-stats.json",
);

const defaultGitHubLegend = [
  { level: 0, color: "#ebedf0" },
  { level: 1, color: "#9be9a8" },
  { level: 2, color: "#40c463" },
  { level: 3, color: "#30a14e" },
  { level: 4, color: "#216e39" },
];

const githubContributionLevelMap = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const githubUsername =
  process.env.GITHUB_PROFILE_STATS_USERNAME?.trim() || "anomo06822";
const githubToken = process.env.GITHUB_PROFILE_STATS_TOKEN?.trim() || "";
const leetcodeUsername = process.env.LEETCODE_USERNAME?.trim() || "";
const generatedAt = new Date().toISOString();

function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

function createUnavailableGitHubStats(error) {
  return {
    username: githubUsername,
    profileUrl: `https://github.com/${githubUsername}`,
    yearTotal: 0,
    generatedAt,
    weeks: [],
    legend: defaultGitHubLegend,
    recentRepositories: [],
    available: false,
    source: "unavailable",
    ...(error ? { error } : {}),
  };
}

function createUnavailableLeetCodeStats(error) {
  return {
    username: leetcodeUsername,
    ...(leetcodeUsername
      ? { profileUrl: `https://leetcode.com/u/${leetcodeUsername}/` }
      : {}),
    generatedAt,
    solvedCount: 0,
    difficultyCounts: [],
    streakOrActiveDays: {
      streak: 0,
      totalActiveDays: 0,
    },
    available: false,
    source: "unavailable",
    ...(error ? { error } : {}),
  };
}

async function fetchJson(url, init) {
  const response = await fetch(url, init);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${text.slice(0, 240)}`);
  }

  return JSON.parse(text);
}

async function fetchText(url, init) {
  const response = await fetch(url, init);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${text.slice(0, 240)}`);
  }

  return text;
}

function parseCountFromTooltip(tooltipText) {
  const normalized = tooltipText.replace(/,/g, "");
  const match = normalized.match(/(\d+)\s+contributions?/i);
  return match ? Number(match[1]) : 0;
}

function getGitHubRepoHeaders() {
  if (!githubToken) {
    return {
      Accept: "application/vnd.github+json",
      "User-Agent": "personal-site-build",
    };
  }

  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${githubToken}`,
    "User-Agent": "personal-site-build",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchGitHubRecentRepositories() {
  const url = `https://api.github.com/users/${githubUsername}/repos?sort=pushed&per_page=3&type=owner`;
  const repositories = await fetchJson(url, {
    headers: getGitHubRepoHeaders(),
  });

  return repositories
    .filter((repository) => !repository.fork)
    .slice(0, 3)
    .map((repository) => ({
      name: repository.name,
      url: repository.html_url,
      description: repository.description || undefined,
      pushedAt: repository.pushed_at || undefined,
      primaryLanguage: repository.language
        ? {
            name: repository.language,
          }
        : undefined,
    }));
}

async function fetchGitHubGraphqlContributionCalendar() {
  if (!githubToken) {
    throw new Error("GITHUB_PROFILE_STATS_TOKEN is not configured.");
  }

  const from = new Date();
  from.setUTCDate(from.getUTCDate() - 364);
  from.setUTCHours(0, 0, 0, 0);

  const to = new Date();
  to.setUTCHours(23, 59, 59, 999);

  const query = `
    query PersonalSiteContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              firstDay
              contributionDays {
                color
                contributionCount
                contributionLevel
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const payload = await fetchJson("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json",
      "User-Agent": "personal-site-build",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: githubUsername,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  const calendar =
    payload.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    throw new Error(`GitHub contribution calendar was empty for ${githubUsername}.`);
  }

  const legendColors =
    Array.isArray(calendar.colors) && calendar.colors.length === 5
      ? calendar.colors
      : defaultGitHubLegend.map((item) => item.color);

  return {
    yearTotal: calendar.totalContributions ?? 0,
    legend: legendColors.map((color, index) => ({
      level: index,
      color,
    })),
    weeks: (calendar.weeks ?? []).map((week) => ({
      firstDay: week.firstDay,
      contributionDays: (week.contributionDays ?? []).map((day) => ({
        date: day.date,
        count: day.contributionCount ?? 0,
        color: day.color,
        level:
          githubContributionLevelMap[day.contributionLevel] ??
          (day.contributionCount > 0 ? 1 : 0),
        weekday: day.weekday ?? 0,
      })),
    })),
  };
}

function parseGitHubContributionRows(html) {
  const headingMatch = html.match(
    /<h2[^>]*>\s*([\d,]+)\s*contributions?\s*in the last year/i,
  );
  const total = headingMatch ? Number(headingMatch[1].replace(/,/g, "")) : 0;
  const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/i);

  if (!tbodyMatch) {
    throw new Error("GitHub contribution HTML did not include a contribution table.");
  }

  const tooltipMap = new Map(
    [...html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g)].map(
      ([, id, tooltipText]) => [id, tooltipText],
    ),
  );

  const rows = [...tbodyMatch[1].matchAll(/<tr[\s\S]*?<\/tr>/g)]
    .map((match) => {
      return [...match[0].matchAll(/(<td[^>]*data-date="[^"]+"[^>]*><\/td>)/g)]
        .map(([, cellHtml]) => {
          const id = cellHtml.match(/id="([^"]+)"/)?.[1];
          const date = cellHtml.match(/data-date="([^"]+)"/)?.[1];
          const level = cellHtml.match(/data-level="([^"]+)"/)?.[1];

          if (!id || !date || !level) {
            return null;
          }

          return {
            date,
            count: parseCountFromTooltip(tooltipMap.get(id) || ""),
            level: Number(level),
          };
        })
        .filter(Boolean);
    })
    .filter((row) => row.length > 0);

  if (!rows.length) {
    throw new Error("GitHub contribution HTML did not include any contribution cells.");
  }

  const weekCount = Math.max(...rows.map((row) => row.length));
  const weeks = Array.from({ length: weekCount }, (_, weekIndex) => {
    const contributionDays = rows
      .map((row, weekday) => {
        const day = row[weekIndex];

        if (!day) {
          return null;
        }

        return {
          date: day.date,
          count: day.count,
          color: defaultGitHubLegend[day.level]?.color || defaultGitHubLegend[0].color,
          level: day.level,
          weekday,
        };
      })
      .filter(Boolean);

    return {
      firstDay: contributionDays[0]?.date || "",
      contributionDays,
    };
  }).filter((week) => week.firstDay);

  return {
    yearTotal: total,
    weeks,
    legend: defaultGitHubLegend,
  };
}

async function fetchGitHubContributionHtmlFallback() {
  const url = `https://github.com/${githubUsername}?action=show&controller=profiles&tab=contributions&user_id=${githubUsername}`;
  const html = await fetchText(url, {
    headers: {
      Accept: "text/html",
      "User-Agent": "personal-site-build",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return parseGitHubContributionRows(html);
}

async function buildGitHubStats(warnings) {
  const recentRepositories = await fetchGitHubRecentRepositories().catch((error) => {
    warnings.push(`GitHub repository summary fetch failed: ${getErrorMessage(error)}`);
    return [];
  });

  try {
    const contributionStats = githubToken
      ? await fetchGitHubGraphqlContributionCalendar()
      : await fetchGitHubContributionHtmlFallback();

    return {
      username: githubUsername,
      profileUrl: `https://github.com/${githubUsername}`,
      generatedAt,
      yearTotal: contributionStats.yearTotal,
      weeks: contributionStats.weeks,
      legend: contributionStats.legend,
      recentRepositories,
      available: contributionStats.weeks.length > 0,
      source: githubToken ? "graphql" : "html-fallback",
    };
  } catch (primaryError) {
    warnings.push(`GitHub contribution fetch failed: ${getErrorMessage(primaryError)}`);

    if (githubToken) {
      try {
        const fallbackStats = await fetchGitHubContributionHtmlFallback();

        warnings.push("GitHub contribution data fell back to public HTML parsing.");

        return {
          username: githubUsername,
          profileUrl: `https://github.com/${githubUsername}`,
          generatedAt,
          yearTotal: fallbackStats.yearTotal,
          weeks: fallbackStats.weeks,
          legend: fallbackStats.legend,
          recentRepositories,
          available: fallbackStats.weeks.length > 0,
          source: "html-fallback",
        };
      } catch (fallbackError) {
        warnings.push(`GitHub HTML fallback failed: ${getErrorMessage(fallbackError)}`);
      }
    }

    return {
      ...createUnavailableGitHubStats(getErrorMessage(primaryError)),
      recentRepositories,
    };
  }
}

async function fetchLeetCodeGraphql(operationName, query, variables) {
  const payload = await fetchJson("https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "personal-site-build",
    },
    body: JSON.stringify({
      query,
      variables,
      operationName,
    }),
  });

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  return payload.data;
}

async function buildLeetCodeStats(warnings) {
  if (!leetcodeUsername) {
    warnings.push("LeetCode username is not configured. Skipping LeetCode evidence.");
    return createUnavailableLeetCodeStats("LEETCODE_USERNAME is not configured.");
  }

  const queries = {
    profile: fetchLeetCodeGraphql(
      "userPublicProfile",
      `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
            }
          }
        }
      `,
      { username: leetcodeUsername },
    ),
    progress: fetchLeetCodeGraphql(
      "userSessionProgress",
      `
        query userSessionProgress($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      { username: leetcodeUsername },
    ),
    calendar: fetchLeetCodeGraphql(
      "userProfileCalendar",
      `
        query userProfileCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            userCalendar(year: $year) {
              streak
              totalActiveDays
            }
          }
        }
      `,
      { username: leetcodeUsername, year: null },
    ),
    contest: fetchLeetCodeGraphql(
      "userContestRankingInfo",
      `
        query userContestRankingInfo($username: String!) {
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
          }
        }
      `,
      { username: leetcodeUsername },
    ),
  };

  const [profileResult, progressResult, calendarResult, contestResult] =
    await Promise.allSettled([
      queries.profile,
      queries.progress,
      queries.calendar,
      queries.contest,
    ]);

  if (profileResult.status !== "fulfilled") {
    warnings.push(`LeetCode public profile fetch failed: ${getErrorMessage(profileResult.reason)}`);
    return createUnavailableLeetCodeStats(getErrorMessage(profileResult.reason));
  }

  if (progressResult.status !== "fulfilled") {
    warnings.push(`LeetCode progress fetch failed: ${getErrorMessage(progressResult.reason)}`);
    return createUnavailableLeetCodeStats(getErrorMessage(progressResult.reason));
  }

  if (calendarResult.status !== "fulfilled") {
    warnings.push(`LeetCode calendar fetch failed: ${getErrorMessage(calendarResult.reason)}`);
    return createUnavailableLeetCodeStats(getErrorMessage(calendarResult.reason));
  }

  const matchedUser = profileResult.value?.matchedUser;
  const progressUser = progressResult.value?.matchedUser;
  const calendarUser = calendarResult.value?.matchedUser;

  if (!matchedUser || !progressUser || !calendarUser) {
    warnings.push(`LeetCode matched user was empty for ${leetcodeUsername}.`);
    return createUnavailableLeetCodeStats("LeetCode matched user was empty.");
  }

  const difficultyCounts = (progressUser.submitStats?.acSubmissionNum ?? []).map((item) => ({
    difficulty: item.difficulty,
    count: item.count ?? 0,
    submissions: item.submissions ?? 0,
  }));
  const solvedCount =
    difficultyCounts.find((item) => item.difficulty === "All")?.count ?? 0;
  const contest =
    contestResult.status === "fulfilled" && contestResult.value?.userContestRanking
      ? {
          rating: Number(contestResult.value.userContestRanking.rating ?? 0),
          attendedContestsCount:
            contestResult.value.userContestRanking.attendedContestsCount ?? 0,
          globalRanking: contestResult.value.userContestRanking.globalRanking ?? 0,
          topPercentage: Number(contestResult.value.userContestRanking.topPercentage ?? 0),
        }
      : null;

  return {
    username: matchedUser.username,
    profileUrl: `https://leetcode.com/u/${matchedUser.username}/`,
    generatedAt,
    solvedCount,
    ranking: matchedUser.profile?.ranking ?? undefined,
    reputation: matchedUser.profile?.reputation ?? undefined,
    difficultyCounts,
    streakOrActiveDays: {
      streak: calendarUser.userCalendar?.streak ?? 0,
      totalActiveDays: calendarUser.userCalendar?.totalActiveDays ?? 0,
    },
    contest,
    available: solvedCount > 0 || difficultyCounts.length > 0,
    source: "graphql",
  };
}

async function main() {
  const warnings = [];
  const [github, leetcode] = await Promise.all([
    buildGitHubStats(warnings),
    buildLeetCodeStats(warnings),
  ]);

  const payload = {
    github,
    leetcode,
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Public profile stats written to ${outputPath}`);
  console.log(`GitHub evidence: ${github.available ? "ready" : "fallback"}`);
  console.log(`LeetCode evidence: ${leetcode.available ? "ready" : "fallback"}`);

  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }
}

await main();
