import Image from "next/image";
import { getBlogSocialImagePath } from "@/lib/site";
import type { Locale } from "@/lib/types";

type BlogHeroImageProps = {
  locale: Locale;
  slug: string;
  heroImagePath?: string | null;
  title: string;
  priority?: boolean;
  size?: "hero" | "card";
  className?: string;
};

export function BlogHeroImage({
  locale,
  slug,
  heroImagePath,
  title,
  priority = false,
  size = "card",
  className = "",
}: BlogHeroImageProps) {
  const src = getBlogSocialImagePath(locale, slug, heroImagePath);
  const containerClassName =
    size === "hero"
      ? "rounded-[30px] border border-line/80 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--panel)_96%,transparent)_0%,color-mix(in_srgb,var(--surface-subtle)_100%,transparent)_100%)] p-2 shadow-[var(--shadow-panel)]"
      : "rounded-[24px] border border-line/80 bg-canvas-elevated/72 p-2 shadow-[var(--shadow-soft)]";
  const imageClassName =
    size === "hero" ? "rounded-[24px]" : "rounded-[18px]";
  const sizes =
    size === "hero"
      ? "(max-width: 1024px) 100vw, 960px"
      : "(max-width: 1024px) 100vw, 420px";

  return (
    <div className={`${containerClassName} ${className}`.trim()}>
      <div className="relative aspect-[120/63] overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          priority={priority}
          unoptimized
          sizes={sizes}
          className={`${imageClassName} object-cover`}
        />
      </div>
    </div>
  );
}
