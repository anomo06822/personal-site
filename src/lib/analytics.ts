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
