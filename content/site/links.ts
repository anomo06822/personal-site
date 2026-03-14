import type { ContactLink } from "../../src/lib/types";

export const contactLinks: ContactLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jarvischuang/",
    icon: "linkedin",
    localeLabel: {
      "zh-TW": "LinkedIn 職涯檔案",
      en: "LinkedIn career profile",
    },
    note: {
      "zh-TW": "快速確認職稱定位、經歷主線與公開職涯脈絡。",
      en: "Best for a quick read on positioning, roles, and career narrative.",
    },
  },
  {
    label: "GitHub",
    href: "https://github.com/anomo06822",
    icon: "github",
    localeLabel: {
      "zh-TW": "GitHub 程式碼與公開活動",
      en: "GitHub code and public activity",
    },
    note: {
      "zh-TW": "查看實作痕跡、提交節奏與公開技術作品。",
      en: "Shows implementation history, code artifacts, and public work.",
    },
  },
  {
    label: "104",
    href: "https://pda.104.com.tw/profile?vno=76jgjwtoe",
    icon: "career",
    localeLabel: {
      "zh-TW": "104 履歷與職涯檔案",
      en: "104 resume and career profile",
    },
    note: {
      "zh-TW": "使用非 preview 的正式履歷入口，104 可能要求登入後檢視。",
      en: "Uses the non-preview profile route; 104 may still require sign-in to view.",
    },
  },
];
