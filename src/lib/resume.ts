import { resumeEn } from "../../content/resume/en";
import { resumeZhTW } from "../../content/resume/zh-TW";
import { siteConfig } from "./site";
import type { Locale } from "./types";

export function getResume(locale: Locale) {
  return locale === "zh-TW" ? resumeZhTW : resumeEn;
}

export function getResumePdfDownloadHref(locale: Locale) {
  return `${siteConfig.basePath}/downloads/${getResume(locale).pdf.fileName}`;
}
