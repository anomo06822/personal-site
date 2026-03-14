import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
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
    title: locale === "zh-TW" ? "聯絡" : "Contact",
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
      <PageHero
        eyebrow={copy.contact.eyebrow}
        title={copy.contact.title}
        intro={copy.contact.intro}
        asideTitle={copy.contact.privacyTitle}
        asideItems={[copy.contact.privacyNote]}
      />

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-5">
          {siteConfig.socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="card-surface p-6 transition hover:-translate-y-1 hover:border-accent/50 hover:bg-panel-strong/90"
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

        <aside className="card-surface p-6 sm:p-7">
          <div className="eyebrow">{copy.contact.privacyTitle}</div>
          <div className="mt-4 space-y-4 text-base leading-8 text-ink-muted">
            <p>{copy.contact.privacyNote}</p>
            <p>{copy.contact.followUpNote}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
