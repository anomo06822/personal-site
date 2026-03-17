import type { RouteKey } from "./types";
import { siteConfig, withBasePath } from "./site";
import { stripBasePath } from "./utils";

export const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

type OverviewRouteClickParams = {
  sourceSection: string;
  audiencePath: string;
  targetRoute: Exclude<RouteKey, "home">;
};

type AnalyticsGtag = (
  command: "event",
  eventName: string,
  params: Record<string, string>,
) => void;

const analyticsHost = new URL(siteConfig.siteUrl).hostname;

function normalizePathname(pathname: string) {
  const strippedPath = stripBasePath(pathname, siteConfig.basePath) || "/";
  const normalizedPath = strippedPath.startsWith("/")
    ? strippedPath
    : `/${strippedPath}`;

  if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
    return normalizedPath.slice(0, -1);
  }

  return normalizedPath;
}

function isLocaleContentPath(pathname: string) {
  return siteConfig.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export function isAnalyticsHost(hostname: string) {
  return hostname === analyticsHost;
}

export function getTrackableAnalyticsPath(pathname: string) {
  const normalizedPath = normalizePathname(pathname);

  if (
    normalizedPath === "/" ||
    normalizedPath === "/print" ||
    normalizedPath.startsWith("/print/")
  ) {
    return null;
  }

  if (!isLocaleContentPath(normalizedPath)) {
    return null;
  }

  return withBasePath(normalizedPath).replace(/\/$/, "");
}

export function buildAnalyticsPageLocation(origin: string, pagePath: string) {
  return `${origin}${pagePath}`;
}

export function trackOverviewRouteClick({
  sourceSection,
  audiencePath,
  targetRoute,
}: OverviewRouteClickParams) {
  if (typeof window === "undefined" || !isAnalyticsHost(window.location.hostname)) {
    return;
  }

  const gtag = (window as Window & {
    gtag?: (
      command: "event",
      eventName: string,
      params: Record<string, string>,
    ) => void;
  }).gtag;

  if (typeof gtag !== "function") {
    return;
  }

  gtag("event", "overview_route_click", {
    source_section: sourceSection,
    audience_path: audiencePath,
    target_route: targetRoute,
  });
}

export function getWhitelistedAttribution(searchParams: URLSearchParams) {
  const source = searchParams.get("utm_source")?.trim() ?? "";
  const medium = searchParams.get("utm_medium")?.trim() ?? "";
  const campaign = searchParams.get("utm_campaign")?.trim() ?? "";
  const content = searchParams.get("utm_content")?.trim() ?? "";

  if (!source && !medium && !campaign && !content) {
    return null;
  }

  return {
    source,
    medium,
    campaign,
    content,
  };
}

export function getReferrerHost(referrer: string) {
  if (!referrer) {
    return "";
  }

  try {
    return new URL(referrer).hostname;
  } catch {
    return "";
  }
}

export function readAnalyticsMeta(name: string) {
  if (typeof document === "undefined") {
    return "";
  }

  return (
    document
      .querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
      ?.content?.trim() ?? ""
  );
}

export function trackWhitelistedAttribution(
  gtag: AnalyticsGtag,
  searchParams: URLSearchParams,
) {
  const attribution = getWhitelistedAttribution(searchParams);

  if (!attribution) {
    return;
  }

  gtag("event", "whitelisted_landing_attribution", {
    utm_source: attribution.source,
    utm_medium: attribution.medium,
    utm_campaign: attribution.campaign,
    utm_content: attribution.content,
    article_id: readAnalyticsMeta("ps:article-id"),
    locale: readAnalyticsMeta("ps:locale"),
    referrer_host: getReferrerHost(document.referrer),
  });
}
