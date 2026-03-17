"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackOverviewRouteClick } from "@/lib/analytics";
import type { RouteKey } from "@/lib/types";

type OverviewRouteLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  sourceSection: string;
  audiencePath: string;
  targetRoute: Exclude<RouteKey, "home">;
  ariaLabel?: string;
};

export function OverviewRouteLink({
  href,
  className,
  children,
  sourceSection,
  audiencePath,
  targetRoute,
  ariaLabel,
}: OverviewRouteLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={() =>
        trackOverviewRouteClick({
          sourceSection,
          audiencePath,
          targetRoute,
        })
      }
    >
      {children}
    </Link>
  );
}
