import Link from "next/link";
import { siteConfig, siteCopy } from "@/lib/site";
import type { Locale } from "@/lib/types";
import { SiteHeader } from "./site-header";

export function SiteShell({
  locale,
  children,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  const copy = siteCopy[locale];

  return (
    <div className="relative min-h-screen px-5 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SiteHeader locale={locale} />
        <main className="space-y-8 pb-12">{children}</main>
        <footer className="card-surface mt-10 grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            <div className="eyebrow">About this site</div>
            <p className="max-w-xl text-sm leading-7 text-ink-muted">
              {copy.common.builtWith}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {siteConfig.socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-[22px] border border-line px-4 py-4 transition hover:border-accent/50 hover:bg-white/4"
              >
                <div className="font-medium text-ink">{link.label}</div>
                <div className="mt-1 text-sm text-ink-muted">
                  {link.localeLabel[locale]}
                </div>
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
