import type { ThemeMode } from "./types";

export const defaultTheme: ThemeMode = "light";
export const themeStorageKey = "jarvis-theme";

export function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function getThemeBootstrapScript() {
  return `
    (() => {
      try {
        const storedTheme = window.localStorage.getItem("${themeStorageKey}");
        const theme = storedTheme === "dark" || storedTheme === "light"
          ? storedTheme
          : "${defaultTheme}";
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "${defaultTheme}";
        document.documentElement.style.colorScheme = "${defaultTheme}";
      }
    })();
  `;
}
