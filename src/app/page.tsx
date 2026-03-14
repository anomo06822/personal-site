"use client";

import Link from "next/link";
import { useEffect } from "react";
import { withBasePath } from "@/lib/site";

export default function Home() {
  const redirectTarget = withBasePath("/zh-TW");
  const linkTarget = "/zh-TW";

  useEffect(() => {
    window.location.replace(redirectTarget);
  }, [redirectTarget]);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="card-surface max-w-lg space-y-5 p-8 text-center sm:p-10">
        <div className="eyebrow">Redirecting</div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          Opening the recruiter-first profile view.
        </h1>
        <p className="text-base leading-8 text-ink-muted">
          If the redirect does not happen automatically, continue to the Chinese
          profile home.
        </p>
        <div className="pt-2">
          <Link
            href={linkTarget}
            className="inline-flex min-h-11 items-center rounded-full border border-accent/50 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/70"
          >
            Continue to /zh-TW
          </Link>
        </div>
      </div>
    </main>
  );
}
