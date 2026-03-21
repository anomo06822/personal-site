import { formatLongDate } from "@/lib/utils";
import type { CloudCredential, Locale } from "@/lib/types";

type CloudCertificationsProps = {
  locale: Locale;
  items: CloudCredential[];
  title: string;
  intro: string;
  verifyLabel: string;
  issuedLabel: string;
  expiresLabel: string;
  issuerLabel: string;
  credentialIdLabel: string;
  noteLabel: string;
  activeLabel: string;
  expiredLabel: string;
  noExpiryLabel: string;
};

function getProviderLabel(provider: CloudCredential["provider"]) {
  return provider === "microsoft-azure" ? "Microsoft Azure" : "Google Cloud";
}

function getStatus(
  expiresAt: string | undefined,
  activeLabel: string,
  expiredLabel: string,
  noExpiryLabel: string,
) {
  if (!expiresAt) {
    return {
      label: noExpiryLabel,
      className:
        "border-line/80 bg-canvas-elevated/80 text-ink-muted",
    };
  }

  const expiryDate = new Date(expiresAt);

  if (Number.isNaN(expiryDate.getTime())) {
    return {
      label: noExpiryLabel,
      className:
        "border-line/80 bg-canvas-elevated/80 text-ink-muted",
    };
  }

  expiryDate.setHours(23, 59, 59, 999);

  const isExpired = expiryDate.getTime() < Date.now();

  return isExpired
    ? {
        label: expiredLabel,
        className:
          "border-rose-300/60 bg-rose-50/80 text-rose-700 dark:border-rose-400/25 dark:bg-rose-500/10 dark:text-rose-200",
      }
    : {
        label: activeLabel,
        className:
          "border-emerald-300/70 bg-emerald-50/80 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500/10 dark:text-emerald-200",
      };
}

export function CloudCertifications({
  locale,
  items,
  title,
  intro,
  verifyLabel,
  issuedLabel,
  expiresLabel,
  issuerLabel,
  credentialIdLabel,
  noteLabel,
  activeLabel,
  expiredLabel,
  noExpiryLabel,
}: CloudCertificationsProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
          {title}
        </h2>
        <p className="max-w-4xl text-base leading-8 text-ink-muted">{intro}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => {
          const status = getStatus(
            item.expiresAt,
            activeLabel,
            expiredLabel,
            noExpiryLabel,
          );

          return (
            <article
              key={`${item.provider}:${item.title}:${item.issuedAt}`}
              className="relative overflow-hidden rounded-[30px] border border-line/80 bg-[linear-gradient(180deg,var(--panel)_0%,color-mix(in_srgb,var(--surface-subtle)_96%,transparent)_100%)] p-6 shadow-[var(--shadow-panel)] sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                  background:
                    "radial-gradient(circle at 14% 14%, color-mix(in srgb, var(--accent) 12%, transparent) 0, transparent 30%), radial-gradient(circle at 86% 16%, color-mix(in srgb, var(--ink) 7%, transparent) 0, transparent 26%)",
                }}
              />

              <div className="relative space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-accent/18 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                        {getProviderLabel(item.provider)}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.08em] ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <h3 className="max-w-3xl text-2xl font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                  </div>

                  <a
                    href={item.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
                  >
                    {verifyLabel}
                  </a>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-line/75 bg-canvas-elevated/75 p-4">
                    <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">
                      {issuedLabel}
                    </div>
                    <div className="mt-3 text-base font-medium text-ink">
                      {formatLongDate(locale, item.issuedAt)}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-line/75 bg-canvas-elevated/75 p-4">
                    <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">
                      {expiresLabel}
                    </div>
                    <div className="mt-3 text-base font-medium text-ink">
                      {item.expiresAt
                        ? formatLongDate(locale, item.expiresAt)
                        : noExpiryLabel}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-line/75 bg-canvas-elevated/75 p-4">
                    <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">
                      {issuerLabel}
                    </div>
                    <div className="mt-3 text-base font-medium text-ink">
                      {item.issuer}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-line/75 bg-canvas-elevated/75 p-4">
                    <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">
                      {credentialIdLabel}
                    </div>
                    <div className="mt-3 break-all text-base font-medium text-ink">
                      {item.credentialId || "—"}
                    </div>
                  </div>
                </div>

                {item.note ? (
                  <div className="rounded-[24px] border border-line/80 bg-canvas-elevated/72 p-5">
                    <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-muted">
                      {noteLabel}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-ink-muted">
                      {item.note}
                    </p>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
