"use client";

import { startTransition, useState, type FormEvent } from "react";

type PersonalProjectFeedbackFormProps = {
  projectTitle: string;
  repoUrl: string;
  intro: string;
  titleLabel: string;
  messageLabel: string;
  emailLabel: string;
  emailHint: string;
  submitLabel: string;
  openedLabel: string;
  validationLabel: string;
};

function buildIssueUrl({
  repoUrl,
  projectTitle,
  title,
  message,
  email,
}: {
  repoUrl: string;
  projectTitle: string;
  title: string;
  message: string;
  email: string;
}) {
  const normalizedRepoUrl = repoUrl.replace(/\.git$/, "").replace(/\/$/, "");
  const issueUrl = new URL(`${normalizedRepoUrl}/issues/new`);
  const body = [
    `## Project`,
    projectTitle,
    ``,
    `## Feedback`,
    message,
    ``,
    `## Contact`,
    email || "Not provided",
    ``,
    `---`,
    `Submitted from Jarvis Huang personal site`,
  ].join("\n");

  issueUrl.searchParams.set("title", title);
  issueUrl.searchParams.set("body", body);

  return issueUrl.toString();
}

export function PersonalProjectFeedbackForm({
  projectTitle,
  repoUrl,
  intro,
  titleLabel,
  messageLabel,
  emailLabel,
  emailHint,
  submitLabel,
  openedLabel,
  validationLabel,
}: PersonalProjectFeedbackFormProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("title") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!title || !message) {
      startTransition(() => {
        setStatusMessage(validationLabel);
      });
      return;
    }

    const issueUrl = buildIssueUrl({
      repoUrl,
      projectTitle,
      title,
      message,
      email,
    });

    window.open(issueUrl, "_blank", "noopener,noreferrer");
    form.reset();

    startTransition(() => {
      setStatusMessage(openedLabel);
    });
  }

  return (
    <div className="subtle-panel p-6 sm:p-7">
      <div className="space-y-5">
        <p className="max-w-3xl text-sm leading-7 text-ink-muted">{intro}</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-ink">{titleLabel}</span>
            <input
              name="title"
              type="text"
              required
              className="min-h-12 w-full rounded-[18px] border border-line bg-canvas-elevated/80 px-4 text-sm text-ink outline-none transition focus:border-accent/60"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-ink">{messageLabel}</span>
            <textarea
              name="message"
              required
              rows={6}
              className="w-full rounded-[18px] border border-line bg-canvas-elevated/80 px-4 py-3 text-sm leading-7 text-ink outline-none transition focus:border-accent/60"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-ink">{emailLabel}</span>
            <input
              name="email"
              type="email"
              className="min-h-12 w-full rounded-[18px] border border-line bg-canvas-elevated/80 px-4 text-sm text-ink outline-none transition focus:border-accent/60"
            />
            <span className="block text-xs leading-6 text-ink-muted">
              {emailHint}
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-full border border-accent/35 bg-[var(--accent-soft)] px-5 text-sm text-ink transition hover:border-accent/60 hover:bg-panel-strong"
            >
              {submitLabel}
            </button>

            {statusMessage ? (
              <span className="text-sm leading-7 text-ink-muted" aria-live="polite">
                {statusMessage}
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
