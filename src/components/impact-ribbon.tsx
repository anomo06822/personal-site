import type { ResumeImpactPoint } from "@/lib/types";

type ImpactRibbonProps = {
  items: ResumeImpactPoint[];
  compact?: boolean;
};

export function ImpactRibbon({
  items,
  compact = false,
}: ImpactRibbonProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className={`impact-card p-5 ${compact ? "" : "sm:min-h-[188px]"}`}
        >
          <div className="font-mono text-sm uppercase tracking-[0.24em] text-accent">
            {item.value}
          </div>
          <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink">
            {item.label}
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink-muted">
            {item.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
