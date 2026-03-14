import { ProfileLinkGrid } from "@/components/profile-link-grid";
import { siteCopy } from "@/lib/site";
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
    <div className="relative min-h-screen px-5 pb-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SiteHeader locale={locale} />
        <main className="space-y-14 pb-8">{children}</main>
        <footer className="mt-16 border-t border-line/80 pb-10 pt-7">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-3">
              <div className="eyebrow">About this site</div>
              <p className="max-w-xl text-sm leading-7 text-ink-muted">
                {copy.common.builtWith}
              </p>
            </div>
            <ProfileLinkGrid locale={locale} variant="compact" />
          </div>
        </footer>
      </div>
    </div>
  );
}
