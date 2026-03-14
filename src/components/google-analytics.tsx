"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  buildAnalyticsPageLocation,
  gaMeasurementId,
  getTrackableAnalyticsPath,
  isAnalyticsHost,
} from "@/lib/analytics";

type GtagConsentConfig = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
};

type GtagConfig = {
  send_page_view: boolean;
  allow_google_signals: boolean;
  allow_ad_personalization_signals: boolean;
};

type PageViewEvent = {
  page_title: string;
  page_location: string;
  page_path: string;
};

interface Gtag {
  (command: "js", value: Date): void;
  (command: "config", targetId: string, config: GtagConfig): void;
  (
    command: "consent",
    mode: "default",
    config: GtagConsentConfig,
  ): void;
  (command: "event", eventName: "page_view", params: PageViewEvent): void;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    __ga4BootstrappedMeasurementId?: string;
  }
}

const GA_SCRIPT_ID = "ga4-gtag-script";

function ensureGtagScript(measurementId: string) {
  if (document.getElementById(GA_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

function ensureGtagBootstrap(measurementId: string) {
  window.dataLayer = window.dataLayer ?? [];

  if (typeof window.gtag !== "function") {
    const gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    window.gtag = gtag as Gtag;
  }

  if (window.__ga4BootstrappedMeasurementId === measurementId) {
    return;
  }

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  window.__ga4BootstrappedMeasurementId = measurementId;
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const lastTrackedPathRef = useRef<string | null>(null);
  const isEnabled =
    gaMeasurementId.length > 0 && isAnalyticsHost(window.location.hostname);
  const pagePath = pathname ? getTrackableAnalyticsPath(pathname) : null;

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    ensureGtagScript(gaMeasurementId);
    ensureGtagBootstrap(gaMeasurementId);
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled || !pagePath || typeof window.gtag !== "function") {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (lastTrackedPathRef.current === pagePath) {
        return;
      }

      window.gtag?.("event", "page_view", {
        page_title: document.title,
        page_location: buildAnalyticsPageLocation(
          window.location.origin,
          pagePath,
        ),
        page_path: pagePath,
      });

      lastTrackedPathRef.current = pagePath;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isEnabled, pagePath]);

  return null;
}
