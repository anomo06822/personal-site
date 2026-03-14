import Image from "next/image";

type ResumeHeroProps = {
  name: string;
  englishName: string;
  locationLabel: string;
  headlinePrimary: string;
  headlineSecondary: string;
  intro: string;
  portraitSrc: string;
  portraitAlt: string;
  downloadHref: string;
  downloadLabel: string;
  downloadFileName: string;
};

export function ResumeHero({
  name,
  englishName,
  locationLabel,
  headlinePrimary,
  headlineSecondary,
  intro,
  portraitSrc,
  portraitAlt,
  downloadHref,
  downloadLabel,
  downloadFileName,
}: ResumeHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line/80 pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full opacity-90"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--accent) 14%, transparent) 0, transparent 30%), radial-gradient(circle at 88% 26%, color-mix(in srgb, var(--ink) 7%, transparent) 0, transparent 28%), linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--surface-subtle) 72%, transparent) 100%)",
        }}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,390px)] lg:items-end xl:gap-10">
        <div className="space-y-6 lg:space-y-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-7 text-ink-muted">
            <span className="font-medium text-ink">{englishName}</span>
            <span>{name}</span>
            <span>{locationLabel}</span>
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
              {headlinePrimary}
            </h1>

            <div className="flex max-w-3xl gap-4">
              <div className="mt-1 hidden w-px shrink-0 bg-accent/45 sm:block" />
              <p className="text-xl leading-8 text-accent sm:text-[1.7rem] sm:leading-10">
                {headlineSecondary}
              </p>
            </div>

            <p className="max-w-3xl text-base leading-8 text-ink-muted sm:text-lg">
              {intro}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={downloadHref}
                download={downloadFileName}
                className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
              >
                {downloadLabel}
              </a>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                {downloadFileName}
              </span>
            </div>
          </div>
        </div>

        <article className="card-surface overflow-hidden">
          <div className="relative aspect-[4/5]">
            <Image
              src={portraitSrc}
              alt={portraitAlt}
              fill
              priority
              sizes="(min-width: 1280px) 390px, (min-width: 1024px) 34vw, (min-width: 768px) 70vw, 100vw"
              className="object-cover object-[center_58%]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0)_34%,rgba(14,12,10,0.08)_64%,rgba(14,12,10,0.28)_100%)]" />
          </div>
        </article>
      </div>
    </section>
  );
}
