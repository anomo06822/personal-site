import { resumeEn } from "../../content/resume/en";
import { resumeZhTW } from "../../content/resume/zh-TW";
import type { Locale } from "./types";

export function getResume(locale: Locale) {
  return locale === "zh-TW" ? resumeZhTW : resumeEn;
}
