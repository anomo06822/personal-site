import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImpactRibbon } from "@/components/impact-ribbon";
import { getResume } from "@/lib/resume";
import { isLocale, siteConfig, siteCopy } from "@/lib/site";
import type { ExperienceEntry, Locale, SkillGroup } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: locale === "zh-TW" ? "履歷" : "Resume",
    description: siteConfig.siteDescription[locale],
  };
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="space-y-3">
      <div className="eyebrow">{eyebrow}</div>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}

function ExperienceCard({ experience }: { experience: ExperienceEntry }) {
  return (
    <article className="card-surface p-6 sm:p-7 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <div className="space-y-3">
          <div className="eyebrow">{experience.period}</div>
          <h3 className="text-2xl font-semibold tracking-tight text-ink">
            {experience.role}
          </h3>
          <div className="space-y-1 text-sm leading-7 text-ink-muted">
            <div>{experience.company}</div>
            <div>{experience.location}</div>
          </div>
        </div>

        <div className="space-y-5 border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="text-base leading-8 text-ink">
            {experience.mission}
          </p>
          <ul className="space-y-3 text-sm leading-7 text-ink-muted">
            {experience.impactBullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {experience.keywords.map((keyword) => (
              <span key={keyword} className="tag-chip">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function StackCluster({ cluster }: { cluster: SkillGroup }) {
  return (
    <article className="subtle-panel p-5">
      <div className="eyebrow">{cluster.title}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {cluster.items.map((item) => (
          <span key={item} className="tag-chip">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function getResumeCopy(locale: Locale) {
  return locale === "zh-TW"
    ? {
        recentTitle: "近年經歷主軸",
        recentDescription:
          "只展開最能支持目前角色定位的三段經歷，優先呈現 scope、impact 與可搜尋關鍵字。",
        winsTitle: "支撐主軸的案例與證明",
        winsDescription:
          "保留最能證明架構、交付與落地能力的案例，避免再次回到平均分配權重的 project wall。",
        appendixTitle: "附錄與背景脈絡",
        appendixDescription:
          "把早期 QA、自我延伸技術關鍵字與證照收斂在最後，保留背景但不搶走主線。",
      }
    : {
        recentTitle: "Recent experience aligned to the positioning",
        recentDescription:
          "Only the three roles that best support the current positioning stay expanded here, with scope, outcomes, and searchable keywords.",
        winsTitle: "Proof that supports the positioning",
        winsDescription:
          "The strongest proof points stay visible here without rebuilding the old equal-weight project wall.",
        appendixTitle: "Appendix and background context",
        appendixDescription:
          "Earlier QA work, keyword clusters, and certifications stay here as background without competing with the main narrative.",
      };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale];
  const resume = getResume(locale);
  const localCopy = getResumeCopy(locale);
  const featuredExperiences = resume.experiences.filter(
    (experience) => experience.emphasis === "featured",
  );
  const earlierExperiences = resume.experiences.filter(
    (experience) => experience.emphasis === "earlier",
  );

  return (
    <div className="space-y-14">
      <section className="space-y-8 border-b border-line/80 pb-10">
        <div className="space-y-4">
          <div className="eyebrow">{copy.resume.eyebrow}</div>
          <div className="flex flex-wrap items-center gap-3 text-sm leading-7 text-ink-muted">
            <span className="font-medium text-ink">{resume.profile.englishName}</span>
            <span>{resume.profile.name}</span>
            <span>{resume.profile.locationLabel}</span>
          </div>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.45rem]">
            {resume.positioning.headline}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-ink">
            {resume.positioning.valueProposition}
          </p>
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {copy.resume.intro}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {resume.positioning.targetRoles.map((role) => (
            <span key={role} className="tag-chip tag-chip-active">
              {role}
            </span>
          ))}
        </div>

        <ImpactRibbon items={resume.selectedImpact} />

        <div className="space-y-4">
          <div className="eyebrow">{copy.resume.summaryTitle}</div>
          <div className="space-y-4 text-base leading-8 text-ink-muted">
            {resume.executiveSummary.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t border-line/80 pt-6">
          <div className="eyebrow">{copy.resume.keywordsTitle}</div>
          <div className="flex flex-wrap gap-2">
            {resume.positioning.recruiterKeywords.map((keyword) => (
              <span key={keyword} className="tag-chip">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow={copy.resume.experienceTitle}
          title={localCopy.recentTitle}
          description={localCopy.recentDescription}
        />
        <div className="space-y-4">
          {featuredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.company + experience.period}
              experience={experience}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow={copy.resume.winsTitle}
          title={localCopy.winsTitle}
          description={localCopy.winsDescription}
        />
        <div className="space-y-4">
          {resume.selectedWins.map((win) => (
            <article key={win.title} className="subtle-panel p-6">
              <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)]">
                <div className="space-y-2">
                  <div className="eyebrow">{win.period}</div>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">
                    {win.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-base leading-8 text-ink-muted">
                    {win.summary}
                  </p>
                  <ul className="space-y-3 text-sm leading-7 text-ink-muted">
                    {win.proofPoints.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {win.tags.map((tag) => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow={copy.resume.closingTitle}
          title={localCopy.appendixTitle}
          description={localCopy.appendixDescription}
        />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <article className="subtle-panel p-6 sm:p-7">
            <div className="eyebrow">{copy.resume.earlierCareerTitle}</div>
            <div className="mt-5 space-y-5">
              {earlierExperiences.map((experience) => (
                <div
                  key={experience.company + experience.period}
                  className="border-b border-line pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="eyebrow">{experience.period}</div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
                    {experience.role}
                  </h3>
                  <div className="mt-2 text-sm leading-7 text-ink-muted">
                    {experience.company} / {experience.location}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink-muted">
                    {experience.mission}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-5">
            <article className="subtle-panel p-6 sm:p-7">
              <div className="eyebrow">{copy.resume.stackTitle}</div>
              <div className="mt-5 grid gap-4">
                {resume.coreStack.map((cluster) => (
                  <StackCluster key={cluster.title} cluster={cluster} />
                ))}
              </div>
            </article>

            <article className="subtle-panel p-6 sm:p-7">
              <div className="eyebrow">{copy.resume.certificationsTitle}</div>
              <div className="mt-5 space-y-4">
                {resume.certifications.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-line pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="text-base font-medium text-ink">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm text-ink-muted">
                      {item.issuer} / {item.year}
                    </div>
                    {item.note ? (
                      <div className="mt-1 text-sm text-ink-muted">
                        {item.note}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-ink-muted">
                {resume.contactNote}
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
