import Link from "next/link";

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
    <main className="relative min-h-screen overflow-hidden px-6 py-10 text-ink sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-between">
        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <div className="eyebrow">Jarvis Huang / Personal Site</div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Resume, technical writing, and a bilingual home for platform
                engineering work.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-ink-muted sm:text-xl">
                Built with Next.js, React, and TypeScript for GitHub Pages.
                Clean structure first, sharp details second. Choose a language
                to enter.
              </p>
            </div>
          </div>

          <div className="card-surface space-y-6 p-7 sm:p-8">
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
              className="group card-surface flex min-h-[260px] flex-col justify-between p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-panel-strong/90 sm:p-8"
            >
              <div className="space-y-5">
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
              <div className="mt-8 flex items-center justify-between border-t border-line pt-5 text-sm text-ink-muted">
                <span>Minimal, bilingual, privacy-aware</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
                  {entry.label}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
