import Link from "next/link";
import { siteConfig } from "@/lib/site";
import type { ContactIcon, Locale } from "@/lib/types";

type ProfileLinkGridProps = {
  locale: Locale;
  variant?: "hero" | "default" | "compact";
};

const iconStyles: Record<
  ContactIcon,
  {
    monogram: string;
    className: string;
  }
> = {
  linkedin: {
    monogram: "IN",
    className:
      "border-[#0a66c2]/18 bg-[#0a66c2]/10 text-[#0a66c2]",
  },
  github: {
    monogram: "GH",
    className:
      "border-[#24292f]/14 bg-[#24292f]/8 text-[#24292f]",
  },
  career: {
    monogram: "104",
    className:
      "border-[#ff7a00]/18 bg-[#ff7a00]/10 text-[#c45a00]",
  },
};

function getDisplayHref(href: string) {
  try {
    const url = new URL(href);
    const hostname = url.hostname.replace(/^www\./, "");
    const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");

    return `${hostname}${pathname}`;
  } catch {
    return href;
  }
}

function getCardClassName(variant: NonNullable<ProfileLinkGridProps["variant"]>, index: number) {
  const classes = [
    "group",
    "relative",
    "overflow-hidden",
    "rounded-[28px]",
    "border",
    "border-line",
    "bg-[linear-gradient(180deg,var(--panel-strong)_0%,var(--surface-subtle)_100%)]",
    "p-6",
    "shadow-[var(--shadow-soft)]",
    "transition",
    "duration-300",
    "hover:-translate-y-1",
    "hover:border-accent/55",
  ];

  if (variant === "hero") {
    classes.push(index === 0 ? "md:row-span-2 md:min-h-[22rem]" : "md:min-h-[10.5rem]");
  }

  if (variant === "compact") {
    classes.push("rounded-[22px]", "p-5");
  }

  return classes.join(" ");
}

function ProfileIcon({ icon }: { icon: ContactIcon }) {
  const style = iconStyles[icon];

  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-[18px] border font-mono text-[0.7rem] font-semibold tracking-[0.24em] ${style.className}`}
      aria-hidden="true"
    >
      {style.monogram}
    </span>
  );
}

export function ProfileLinkGrid({
  locale,
  variant = "default",
}: ProfileLinkGridProps) {
  const isCompact = variant === "compact";
  const footerLabel = locale === "zh-TW" ? "公開入口" : "Public path";
  const visitLabel = locale === "zh-TW" ? "前往檔案" : "Visit profile";
  const wrapperClassName =
    variant === "hero"
      ? "grid gap-4 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:auto-rows-fr"
      : variant === "compact"
        ? "grid gap-3 sm:grid-cols-3"
        : "grid gap-4 lg:grid-cols-3";

  return (
    <div className={wrapperClassName}>
      {siteConfig.socialLinks.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className={getCardClassName(variant, index)}
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(172,100,48,0.14),transparent_34%)] opacity-90 ${
              index === 0 ? "" : "md:opacity-70"
            }`}
          />

          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <ProfileIcon icon={link.icon} />
                <div className="space-y-1">
                  <div className="eyebrow">{link.label}</div>
                  <div className="text-xs leading-6 text-ink-muted">
                    {getDisplayHref(link.href)}
                  </div>
                </div>
              </div>
              <span className="rounded-full border border-accent/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                Open
              </span>
            </div>

            <h2
              className={`mt-6 font-semibold tracking-tight text-ink ${
                variant === "hero" && index === 0
                  ? "max-w-sm text-[1.95rem] leading-tight"
                  : isCompact
                    ? "text-xl"
                    : "text-2xl"
              }`}
            >
              {link.localeLabel[locale]}
            </h2>

            {link.note ? (
              <p
                className={`mt-4 text-sm leading-7 text-ink-muted ${
                  isCompact ? "max-w-none" : "max-w-xl"
                }`}
              >
                {link.note[locale]}
              </p>
            ) : null}

            <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-xs leading-6 text-ink-muted">
              <span className="font-mono uppercase tracking-[0.18em]">{footerLabel}</span>
              <span className="transition group-hover:translate-x-0.5">
                {visitLabel}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
