import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  asideTitle?: string;
  asideItems?: readonly string[];
  ctas?: Array<{
    href: string;
    label: string;
    variant?: "primary" | "secondary";
  }>;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  asideTitle,
  asideItems,
  ctas,
}: PageHeroProps) {
  return (
    <section className="border-b border-line/80 pb-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start">
        <div className="space-y-6">
          <div className="eyebrow">{eyebrow}</div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-ink-muted">{intro}</p>
          </div>
          {ctas && ctas.length > 0 ? (
            <div className="flex flex-wrap gap-3 pt-1">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={
                    cta.variant === "secondary"
                      ? "inline-flex min-h-11 items-center rounded-full border border-line bg-canvas-elevated/70 px-5 text-sm text-ink transition hover:border-accent/60"
                      : "inline-flex min-h-11 items-center rounded-full border border-accent/50 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/70"
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {asideItems && asideItems.length > 0 ? (
          <aside className="subtle-panel space-y-4 p-5">
            {asideTitle ? (
              <h2 className="eyebrow text-ink-muted">{asideTitle}</h2>
            ) : null}
            <ul className="space-y-3 text-sm leading-7 text-ink-muted">
              {asideItems.map((item) => (
                <li
                  key={item}
                  className="border-b border-line/70 pb-3 last:border-b-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
