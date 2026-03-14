"use client";

import { useSyncExternalStore } from "react";
import { siteCopy } from "@/lib/site";
import { applyTheme, defaultTheme, isThemeMode, themeStorageKey } from "@/lib/theme";
import type { Locale, ThemeMode } from "@/lib/types";

const themeChangeEvent = "jarvis-theme-change";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    >
      <circle cx="10" cy="10" r="3.2" />
      <path d="M10 1.8v2.1M10 16.1v2.1M4.2 4.2l1.5 1.5M14.3 14.3l1.5 1.5M1.8 10h2.1M16.1 10h2.1M4.2 15.8l1.5-1.5M14.3 5.7l1.5-1.5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    >
      <path d="M15.4 11.8a6.2 6.2 0 1 1-7.2-7.2 5.4 5.4 0 1 0 7.2 7.2Z" />
    </svg>
  );
}

function getThemeSnapshot(): ThemeMode {
  if (typeof document === "undefined") {
    return defaultTheme;
  }

  const currentTheme = document.documentElement.dataset.theme;
  return isThemeMode(currentTheme) ? currentTheme : defaultTheme;
}

function subscribe(callback: () => void) {
  window.addEventListener(themeChangeEvent, callback);
  return () => window.removeEventListener(themeChangeEvent, callback);
}

type ThemeToggleProps = {
  locale: Locale;
};

export function ThemeToggle({ locale }: ThemeToggleProps) {
  const copy = siteCopy[locale].common;
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    () => defaultTheme,
  );
  const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";

  function handleToggle() {
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // Theme persistence is non-critical if storage is unavailable.
    }

    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        nextTheme === "dark"
          ? copy.switchToDarkTheme
          : copy.switchToLightTheme
      }
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-canvas-elevated/80 px-3 text-sm text-ink-muted transition hover:border-accent/60 hover:text-ink"
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
      <span className="hidden sm:inline">
        {theme === "light" ? copy.themeLight : copy.themeDark}
      </span>
    </button>
  );
}
