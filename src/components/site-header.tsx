"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import {
  getAlternateLocale,
  getRouteHref,
  siteConfig,
} from "@/lib/site";
import { stripBasePath } from "@/lib/utils";
import type { Locale, RouteKey } from "@/lib/types";

function resolveRoute(segments: string[]): { routeKey: RouteKey; slug?: string } {
  if (segments[0] === "resume") {
    return { routeKey: "resume" };
  }

  if (segments[0] === "blog") {
    return { routeKey: "blog", slug: segments[1] };
  }

  if (segments[0] === "contact") {
    return { routeKey: "contact" };
  }

  return { routeKey: "home" };
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const current = resolveRoute(segments);
  const alternateLocale = getAlternateLocale(locale);
  const alternateHref =
    current.routeKey === "blog" && current.slug
      ? getRouteHref(alternateLocale, "blog", current.slug)
      : getRouteHref(alternateLocale, current.routeKey);
  const normalizedPath = stripBasePath(pathname, siteConfig.basePath);

  return (
    <header className="card-surface sticky top-6 z-20 mb-8 px-5 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href={getRouteHref(locale, "home")} className="space-y-1">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
              Jarvis Huang
            </div>
            <div className="text-sm text-ink">
              Tech Lead / Backend Architect
            </div>
          </Link>
          <Link
            href={alternateHref}
            className="inline-flex items-center rounded-full border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted transition hover:border-accent/60 hover:text-ink lg:hidden"
          >
            {siteConfig.localeNames[alternateLocale]}
          </Link>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-2">
            {siteConfig.navigation[locale].map((item) => {
              const href = getRouteHref(locale, item.key);
              const isActive =
                current.routeKey === item.key ||
                normalizedPath === href;

              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`inline-flex items-center rounded-full border px-3 py-2 text-sm transition ${
                    isActive
                      ? "border-accent/60 bg-accent/12 text-ink"
                      : "border-line text-ink-muted hover:border-accent/50 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href={alternateHref}
            className="hidden min-h-10 items-center rounded-full border border-line px-4 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted transition hover:border-accent/60 hover:text-ink lg:inline-flex"
          >
            {siteConfig.localeNames[alternateLocale]}
          </Link>
        </div>
      </div>
    </header>
  );
}
