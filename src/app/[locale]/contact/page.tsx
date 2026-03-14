import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, siteConfig, siteCopy } from "@/lib/site";

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
    title: locale === "zh-TW" ? "聯繫" : "Connect",
    description: siteConfig.siteDescription[locale],
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale];

  return (
    <div className="space-y-8">
      <section className="space-y-4 border-b border-line/80 pb-10">
        <div className="eyebrow">{copy.contact.eyebrow}</div>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {copy.contact.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-ink-muted">
          {copy.contact.intro}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          {copy.contact.methodsTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {siteConfig.socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="subtle-panel p-6 transition hover:border-accent/50 hover:bg-panel-strong"
            >
              <div className="eyebrow">{link.label}</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
                {link.localeLabel[locale]}
              </h2>
              {link.note ? (
                <p className="mt-4 text-base leading-8 text-ink-muted">
                  {link.note[locale]}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="subtle-panel p-6 sm:p-7">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {copy.contact.collaborationTitle}
          </h2>
          <ul className="space-y-3 text-base leading-8 text-ink-muted">
            {copy.contact.collaborationTopics.map((topic) => (
              <li key={topic} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="subtle-panel p-6 sm:p-7">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {copy.contact.responseTitle}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {copy.contact.responseBody}
          </p>
        </div>
      </section>

      <section className="subtle-panel p-6 sm:p-7">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            {copy.contact.privacyTitle}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-ink-muted">
            {copy.contact.privacyNote}
          </p>
        </div>
      </section>
    </div>
  );
}
