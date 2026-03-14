"use client";

import dynamic from "next/dynamic";

const GoogleAnalytics = dynamic(
  () =>
    import("./google-analytics").then((module) => module.GoogleAnalytics),
  { ssr: false },
);

export function AnalyticsSlot() {
  return <GoogleAnalytics />;
}
