"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { getAlternateLocale, getRouteHref, siteConfig } from "@/lib/site";
import { stripBasePath } from "@/lib/utils";
import type { Locale, RouteKey } from "@/lib/types";
import { ThemeToggle } from "./theme-toggle";

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
    <header className="sticky top-0 z-30 -mx-5 mb-10 border-b border-line/80 bg-canvas/88 backdrop-blur-sm sm:-mx-8 lg:-mx-12">
      <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href={getRouteHref(locale, "home")} className="space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
                Jarvis Huang
              </div>
              <div className="text-sm text-ink">
                Tech Lead / Backend Architect
              </div>
            </Link>

            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href={alternateHref}
                className="inline-flex min-h-10 items-center rounded-full border border-line bg-canvas-elevated/80 px-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted transition hover:border-accent/60 hover:text-ink"
              >
                {siteConfig.localeNames[alternateLocale]}
              </Link>
              <ThemeToggle locale={locale} />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
            <nav className="flex flex-wrap gap-5">
              {siteConfig.navigation[locale].map((item) => {
                const href = getRouteHref(locale, item.key);
                const isActive =
                  current.routeKey === item.key ||
                  normalizedPath === href;

                return (
                  <Link
                    key={item.key}
                    href={href}
                    className={`relative pb-1 text-sm transition after:absolute after:-bottom-px after:left-0 after:h-px after:bg-accent after:transition-all after:content-[''] ${
                      isActive
                        ? "text-ink after:w-full"
                        : "text-ink-muted hover:text-ink after:w-0 hover:after:w-full"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href={alternateHref}
                className="inline-flex min-h-10 items-center rounded-full border border-line bg-canvas-elevated/80 px-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted transition hover:border-accent/60 hover:text-ink"
              >
                {siteConfig.localeNames[alternateLocale]}
              </Link>
              <ThemeToggle locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
