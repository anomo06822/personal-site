import type { ContactLink } from "../../src/lib/types";

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/anomo06822",
    icon: "github",
    localeLabel: {
      "zh-TW": "GitHub 檔案與公開活動",
      en: "GitHub profile and public activity",
    },
    note: {
      "zh-TW": "目前公開聯絡入口以 GitHub 為主。",
      en: "Public first-contact channel for this site.",
    },
  },
  {
    label: "Site URL",
    href: "https://anomo06822.github.io/personal-site/",
    icon: "globe",
    localeLabel: {
      "zh-TW": "GitHub Pages 網站網址",
      en: "GitHub Pages site URL",
    },
    note: {
      "zh-TW": "正式對外網址，會隨內容更新同步發布。",
      en: "Deployment target for the public static site.",
    },
  },
];
