import type { ContactLink } from "../../src/lib/types";

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:anomo06822@gmail.com",
    icon: "email",
    localeLabel: {
      "zh-TW": "Email 直接聯繫",
      en: "Direct email contact",
    },
    note: {
      "zh-TW": "若你已經有明確合作方向，可以直接寄信到 anomo06822@gmail.com。",
      en: "If you already have a clear collaboration context, email anomo06822@gmail.com directly.",
    },
  },
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
];
