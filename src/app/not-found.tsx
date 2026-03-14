import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="card-surface max-w-xl space-y-6 p-8 text-center sm:p-10">
        <div className="eyebrow">404 / Not Found</div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          This page does not exist in the exported site.
        </h1>
        <p className="text-base leading-8 text-ink-muted">
          Use one of the language entry points to continue browsing the resume
          and blog.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/zh-TW"
            className="inline-flex min-h-11 items-center rounded-full border border-accent/60 bg-accent/14 px-5 text-sm text-ink transition hover:bg-accent/20"
          >
            中文
          </Link>
          <Link
            href="/en"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-ink transition hover:border-accent/50 hover:bg-white/4"
          >
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
