import { resumeEn } from "../../content/resume/en";
import { resumeZhTW } from "../../content/resume/zh-TW";
import { siteConfig } from "./site";
import { locales, type Locale, type PersonalProjectItem } from "./types";

export function getResume(locale: Locale) {
  return locale === "zh-TW" ? resumeZhTW : resumeEn;
}

export function getResumePdfDownloadHref(locale: Locale) {
  return `${siteConfig.basePath}/downloads/${getResume(locale).pdf.fileName}`;
}

export function getResumePresentationDownloadHref(locale: Locale) {
  const presentation = getResume(locale).presentation;

  if (!presentation) {
    return null;
  }

  return `${siteConfig.basePath}/downloads/${presentation.fileName}`;
}

export function getPersonalProjects(locale: Locale): PersonalProjectItem[] {
  return getResume(locale).projectShowcase.personal;
}

export function getPersonalProject(locale: Locale, slug: string) {
  return getPersonalProjects(locale).find((project) => project.slug === slug);
}

export function getAllPersonalProjectParams() {
  return locales.flatMap((locale) =>
    getPersonalProjects(locale).map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}
