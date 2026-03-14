import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const entries = [
    {
      href: "/zh-TW",
      label: "中文",
      title: "履歷、技術筆記與聯絡頁",
      summary:
        "聚焦平台架構、後端工程、工程交付與實戰整理，保留可公開的專案與技術觀點。",
    },
    {
      href: "/en",
      label: "English",
      title: "Resume, writing, and contact",
      summary:
        "A clean editorial site covering experience, architecture notes, and selected technical essays.",
    },
  ] as const;

  return (
    <main className="min-h-screen px-6 py-8 text-ink sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <div className="mb-12 flex items-center justify-between border-b border-line/80 pb-4">
          <div className="space-y-1">
            <div className="eyebrow">Jarvis Huang / Personal Site</div>
            <div className="text-sm text-ink-muted">
              Next.js, React, TypeScript, and GitHub Pages
            </div>
          </div>
          <ThemeToggle locale="en" />
        </div>

        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Resume, technical writing, and a bilingual home for platform
              engineering work.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-muted sm:text-xl">
              Claude Code light as the default reading surface, dark mode when
              needed, and a cleaner path from overview to proof.
            </p>
          </div>

          <div className="subtle-panel space-y-6 p-6 sm:p-7">
            <div className="flex items-center justify-between text-sm text-ink-muted">
              <span>Version</span>
              <span className="font-mono">v1 / static export</span>
            </div>
            <div className="h-px bg-line" />
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
                  Stack
                </dt>
                <dd className="mt-2 text-sm leading-7 text-ink">
                  Next.js 16
                  <br />
                  React 19
                  <br />
                  TypeScript
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
                  Scope
                </dt>
                <dd className="mt-2 text-sm leading-7 text-ink">
                  Resume
                  <br />
                  Blog
                  <br />
                  Contact
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
                  Deploy
                </dt>
                <dd className="mt-2 text-sm leading-7 text-ink">
                  GitHub Pages
                  <br />
                  /personal-site
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="card-surface group flex min-h-[250px] flex-col justify-between p-6 transition hover:border-accent/50 hover:bg-panel-strong sm:p-7"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{entry.label}</span>
                  <span className="font-mono text-sm text-accent transition group-hover:translate-x-1">
                    Enter /
                  </span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {entry.title}
                </h2>
                <p className="max-w-xl text-base leading-8 text-ink-muted">
                  {entry.summary}
                </p>
              </div>
              <div className="mt-8 border-t border-line pt-5 text-sm text-ink-muted">
                Minimal, bilingual, privacy-aware
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
