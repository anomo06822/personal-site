import { homeEn } from "../../content/home/en";
import { homeZhTW } from "../../content/home/zh-TW";
import type { Locale } from "./types";

export function getHomeContent(locale: Locale) {
  return locale === "zh-TW" ? homeZhTW : homeEn;
}
