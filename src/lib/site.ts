import { contactLinks } from "../../content/site/links";
import { locales, type Locale, type RouteKey, type SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  siteName: "Jarvis Huang",
  siteUrl: "https://anomo06822.github.io/personal-site",
  basePath: "/personal-site",
  locales,
  defaultEntry: "zh-TW",
  localeNames: {
    "zh-TW": "中文",
    en: "English",
  },
  siteDescription: {
    "zh-TW":
      "Jarvis Huang 的個人履歷與技術筆記站，聚焦平台架構、後端工程與工程交付。",
    en: "Jarvis Huang's bilingual resume and technical writing site for platform engineering and delivery.",
  },
  navigation: {
    "zh-TW": [
      { key: "home", label: "首頁", description: "Overview" },
      { key: "resume", label: "履歷", description: "Resume" },
      { key: "blog", label: "技術筆記", description: "Blog" },
      { key: "contact", label: "聯絡", description: "Contact" },
    ],
    en: [
      { key: "home", label: "Home", description: "Overview" },
      { key: "resume", label: "Resume", description: "Experience" },
      { key: "blog", label: "Blog", description: "Writing" },
      { key: "contact", label: "Contact", description: "Reach out" },
    ],
  },
  socialLinks: contactLinks,
};

export const siteCopy = {
  "zh-TW": {
    home: {
      eyebrow: "Platform Engineering / Resume",
      title: "平台架構、後端工程與工程交付。",
      intro:
        "把履歷、代表專案與技術寫作放進同一個清楚的地方。公開版本聚焦可分享的成果與方法，不暴露敏感個資。",
      focusTitle: "目前聚焦",
      focusItems: [
        "大型平台與商務系統的可持續架構",
        "Azure 與 .NET / Next.js 的交付實務",
        "把團隊運作、監控與發版流程整合起來",
      ],
      featuredExperienceTitle: "精選經歷",
      latestPostsTitle: "最新文章",
      resumeCta: "查看完整履歷",
      blogCta: "閱讀技術筆記",
    },
    resume: {
      openToWorkTitle: "Open to Work / 目標角色",
      aboutTitle: "About",
      highlightsTitle: "Highlights",
      experienceTitle: "Experience",
      skillsTitle: "Top Skills",
      featuredTitle: "Featured",
      projectsTitle: "Projects",
      certificationsTitle: "證照 / 獎項",
    },
    blog: {
      eyebrow: "Blog / Notes",
      title: "技術筆記",
      intro:
        "記錄平台設計、可維運性、工程交付與團隊合作中的方法與取捨。",
      allTopics: "全部主題",
      emptyState: "目前這個分類還沒有文章。",
    },
    contact: {
      eyebrow: "Contact / Public Links",
      title: "公開聯絡方式",
      intro:
        "網站只保留安全可公開的聯絡入口。若需要更進一步聯繫，可先透過公開平台接觸。",
      privacyTitle: "隱私說明",
      privacyNote: "電話、地址與私人信箱不在網站公開。",
      followUpNote:
        "這個版本以 GitHub 作為公開起點；若對話需要往下走，再視情境提供直接聯絡方式。",
    },
    common: {
      readTime: "分鐘閱讀",
      latestPosts: "最新文章",
      viewAll: "查看全部",
      backToBlog: "返回文章列表",
      contactCta: "公開聯絡方式",
      themeLight: "淺色",
      themeDark: "深色",
      switchToLightTheme: "切換到淺色模式",
      switchToDarkTheme: "切換到深色模式",
      builtWith: "使用 Next.js 靜態匯出，部署於 GitHub Pages。",
      relatedTopics: "主題",
    },
  },
  en: {
    home: {
      eyebrow: "Platform Engineering / Resume",
      title: "Platform architecture, backend systems, and engineering delivery.",
      intro:
        "A bilingual home for resume content, selected project notes, and technical writing. The public version keeps the useful signal and omits private personal data.",
      focusTitle: "Current focus",
      focusItems: [
        "Sustainable architecture for large operational platforms",
        "Azure, .NET, and Next.js delivery workflows",
        "Connecting team execution, release flow, and observability",
      ],
      featuredExperienceTitle: "Featured experience",
      latestPostsTitle: "Latest writing",
      resumeCta: "View full resume",
      blogCta: "Read the blog",
    },
    resume: {
      openToWorkTitle: "Open to Work",
      aboutTitle: "About",
      highlightsTitle: "Highlights",
      experienceTitle: "Experience",
      skillsTitle: "Top Skills",
      featuredTitle: "Featured",
      projectsTitle: "Projects",
      certificationsTitle: "Certifications / Awards",
    },
    blog: {
      eyebrow: "Blog / Notes",
      title: "Technical writing",
      intro:
        "Short essays on platform design, operability, engineering delivery, and the tradeoffs behind maintainable systems.",
      allTopics: "All topics",
      emptyState: "There are no published posts for this topic yet.",
    },
    contact: {
      eyebrow: "Contact / Public Links",
      title: "Public contact paths",
      intro:
        "This site keeps contact methods intentionally minimal. For serious conversations, start from a public profile and move to direct channels later.",
      privacyTitle: "Privacy note",
      privacyNote: "Phone number, address, and private email are intentionally omitted.",
      followUpNote:
        "GitHub is the public starting point for this version of the site. If a conversation needs to move further, direct channels can be shared case by case.",
    },
    common: {
      readTime: "min read",
      latestPosts: "Latest writing",
      viewAll: "View all",
      backToBlog: "Back to blog",
      contactCta: "Public contact",
      themeLight: "Light",
      themeDark: "Dark",
      switchToLightTheme: "Switch to light mode",
      switchToDarkTheme: "Switch to dark mode",
      builtWith: "Built with Next.js static export and published via GitHub Pages.",
      relatedTopics: "Topics",
    },
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "zh-TW" ? "en" : "zh-TW";
}

export function getRouteHref(locale: Locale, routeKey: RouteKey, slug?: string) {
  switch (routeKey) {
    case "home":
      return `/${locale}`;
    case "resume":
      return `/${locale}/resume`;
    case "blog":
      return slug ? `/${locale}/blog/${slug}` : `/${locale}/blog`;
    case "contact":
      return `/${locale}/contact`;
    default:
      return `/${locale}`;
  }
}
