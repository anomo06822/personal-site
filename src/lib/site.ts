import { contactLinks } from "../../content/site/links";
import { locales, type Locale, type RouteKey, type SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  siteName: "Jarvis Huang",
  siteUrl: "https://anomo06822.github.io/personal-site",
  basePath: "/personal-site",
  headerRoleLine: "Engineering Manager / Tech Lead / Senior Backend Engineer",
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
      { key: "home", label: "入口", description: "Start" },
      { key: "projects", label: "專案", description: "Projects" },
      { key: "blog", label: "技術文章", description: "Writing" },
      { key: "resume", label: "履歷", description: "Resume" },
      { key: "contact", label: "聯繫", description: "Connect" },
    ],
    en: [
      { key: "home", label: "Start", description: "Entry" },
      { key: "projects", label: "Projects", description: "Projects" },
      { key: "blog", label: "Writing", description: "Articles" },
      { key: "resume", label: "Resume", description: "Experience" },
      { key: "contact", label: "Connect", description: "Reach out" },
    ],
  },
  socialLinks: contactLinks,
};

export const siteCopy = {
  "zh-TW": {
    home: {
      eyebrow: "Profile / Overview",
      title: "後端架構、平台交付與可維運系統。",
      intro:
        "聚焦大型電商與平台系統，公開呈現定位、代表經歷與技術寫作，讓第一輪閱讀先抓到關鍵訊號。",
      profileLinksEyebrow: "Verified Profiles",
      profileLinksTitle: "公開檔案入口",
      profileLinksIntro:
        "把履歷與程式碼集中到兩個可快速驗證的公開入口。",
      featuredExperienceTitle: "代表經歷",
      latestPostsTitle: "最新文章",
      resumeCta: "查看完整履歷",
      blogCta: "閱讀技術文章",
    },
    resume: {
      rolesEyebrow: "目標角色",
      pdfSummaryTitle: "摘要",
      aboutTitle: "About",
      highlightsTitle: "Highlights",
      experienceTitle: "Experience",
      skillsTitle: "Top Skills",
      featuredTitle: "代表成果",
      showcaseTitle: "專案介紹 / Project Showcase",
      showcaseIntro:
        "把自己主導的個人作品與曾參與的核心產品分開呈現，避免公開版履歷把 ownership 與 collaboration 混在一起。",
      showcasePersonalTab: "個人專案",
      showcaseCoreTab: "核心項目",
      showcaseTabsAriaLabel: "專案介紹分頁",
      showcaseImageSlotLabel: "預留圖片",
      showcasePersonalCtaLabel: "查看專案頁面",
      personalProjectsTitle: "個人專案",
      personalProjectsIntro:
        "履歷頁先保留快速導覽，完整的個人專案列表與入口集中在上方的「專案」頁面。",
      personalProjectsCtaLabel: "查看全部個人專案",
      coreProductsTitle: "Core Products",
      coreProductsIntro:
        "以下保留曾參與交付與營運的核心產品摘要，作為公開版履歷的工作脈絡。",
      presentationTitle: "簡報預覽 / Intro Deck",
      presentationCtaLabel: "下載簡報（PPTX）",
      presentationPreviewLabel: "Deck Preview",
      presentationFallbackNote:
        "如果之後換新的簡報版本，只要更新封面圖即可保留這個 preview 入口。",
      presentationLanguageBadgeLabel: "簡報語言",
      presentationSlideCountLabel: "頁投影片",
      experienceGalleryTitle: "代表經歷影像",
      experienceGalleryBadgeLabel: "歷程片段",
      experienceGalleryPrevLabel: "上一張代表經歷",
      experienceGalleryNextLabel: "下一張代表經歷",
      downloadPdfLabel: "下載 PDF",
      projectDetailEyebrow: "個人專案",
      projectDetailBackLabel: "返回履歷",
      projectDetailImageLabel: "畫面與影片",
      projectDetailOverviewLabel: "介紹",
      projectDetailFeedbackLabel: "Feedback",
      projectDetailPreviewLabel: "Preview Surface",
      projectDetailImageZoomLabel: "點擊圖片放大",
      projectDetailClosePreviewLabel: "關閉預覽",
      projectDetailPreviewNote: "目前先以站內生成 placeholder 呈現，之後可替換為實際產品截圖。",
      projectDetailFeedbackIntro:
        "如果你對這個專案有建議，可以先在這裡整理成草稿，系統會帶你到 GitHub issue 頁面完成建立。",
      projectDetailFeedbackTitleLabel: "建議標題",
      projectDetailFeedbackMessageLabel: "建議內容",
      projectDetailFeedbackEmailLabel: "Email（選填）",
      projectDetailFeedbackEmailHint: "若你希望後續能聯絡到你，可以留下 email。",
      projectDetailFeedbackSubmitLabel: "建立 GitHub issue 草稿",
      projectDetailFeedbackOpenedLabel: "已在新分頁開啟 GitHub issue 草稿。",
      projectDetailFeedbackValidationLabel: "請先填寫標題與建議內容。",
      projectDetailFeedbackDisabledLabel: "目前尚未開放 feedback",
      projectsTitle: "Projects",
      certificationsTitle: "證照 / 獎項",
    },
    projects: {
      eyebrow: "Projects / Personal Builds",
      title: "個人專案",
      intro:
        "這裡集中列出我自己主導開發的專案，方便快速查看方向、技術面向，並進一步進入 detail 頁。",
      listTitle: "專案列表",
      detailCtaLabel: "查看 detail",
      previewLabel: "卡片預覽",
      placeholderPreviewLabel: "預覽待補",
      emptyState: "目前還沒有可公開列出的個人專案。",
      backToProjectsLabel: "返回專案列表",
    },
    blog: {
      eyebrow: "Writing / Technical Articles",
      title: "技術文章",
      intro:
        "聚焦 platform architecture、operability、engineering delivery 與可維運系統的思考與實作取捨。",
      listTitle: "文章時間軸",
      allTopics: "全部主題",
      allFormats: "全部形式",
      pillarLabel: "Pillar",
      newsAnalysisLabel: "News Analysis",
      techNewsLabel: "Tech News",
      aiGeneratedLabel: "AI 產生",
      aiGeneratedNote: "這篇文章由 AI 先生成草稿，再經人工審閱與發布。",
      newBadgeLabel: "NEW",
      emptyState: "目前這個分類還沒有文章。",
      endCtaTitle: "下一步閱讀",
      endCtaBody: "先延續閱讀相關文章，再決定是否切到完整履歷背景。",
      relatedPostsTitle: "相關文章",
      resumeSecondaryCta: "再看完整履歷",
    },
    contact: {
      eyebrow: "Connect / Public Contact",
      title: "聯繫",
      intro:
        "如果你想討論 backend、platform engineering、技術領導或合作機會，先從公開入口開始即可。",
      methodsTitle: "聯絡入口",
      collaborationTitle: "適合交流的主題",
      collaborationTopics: [
        "Senior backend / platform engineering 職務機會",
        "Tech lead / engineering leadership 合作",
        "外包專案需求與技術交付合作",
        "0→1 平台架構與交付流程",
        "電商、物流與 AI-enabled products",
      ],
      responseTitle: "回覆方式",
      responseBody:
        "可以先從公開平台或 anomo06822@gmail.com 聯繫；若方向合適，再切到更直接的溝通管道。",
      privacyTitle: "隱私說明",
      privacyNote:
        "電話與地址不在網站公開；公開聯繫可使用 LinkedIn、GitHub 與 anomo06822@gmail.com。",
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
      analyticsNotice:
        "本站僅使用匿名 GA4 頁面瀏覽與白名單歸因欄位，僅記錄 utm source / medium / campaign / content、articleId、locale 與 referrer host，不追蹤表單內容與站外互動細節。",
      relatedTopics: "主題",
    },
  },
  en: {
    home: {
      eyebrow: "Profile / Overview",
      title: "Backend architecture, platform delivery, and operable systems.",
      intro:
        "A focused public profile that highlights positioning, representative experience, and technical writing without turning the entry page into a second resume.",
      profileLinksEyebrow: "Verified Profiles",
      profileLinksTitle: "Public profile hub",
      profileLinksIntro:
        "Two public entry points for resume context, code history, and career visibility.",
      featuredExperienceTitle: "Selected experience",
      latestPostsTitle: "Latest writing",
      resumeCta: "View full resume",
      blogCta: "Read writing",
    },
    resume: {
      rolesEyebrow: "Open to Work",
      pdfSummaryTitle: "Summary",
      aboutTitle: "About",
      highlightsTitle: "Highlights",
      experienceTitle: "Experience",
      skillsTitle: "Top Skills",
      featuredTitle: "Selected Wins",
      showcaseTitle: "Project Showcase",
      showcaseIntro:
        "This section separates personal builds that I directly drive from larger core products that I helped ship and operate.",
      showcasePersonalTab: "Personal Projects",
      showcaseCoreTab: "Core Products",
      showcaseTabsAriaLabel: "Project showcase tabs",
      showcaseImageSlotLabel: "Preview Slot",
      showcasePersonalCtaLabel: "View project page",
      personalProjectsTitle: "Personal Projects",
      personalProjectsIntro:
        "The resume keeps this section compact. The full list of personal builds now lives under the top-level Projects page.",
      personalProjectsCtaLabel: "View all personal projects",
      coreProductsTitle: "Core Products",
      coreProductsIntro:
        "This compact list keeps the larger products I helped ship visible without mixing them into the personal-project entry points.",
      presentationTitle: "Intro Deck",
      presentationCtaLabel: "Download deck (PPTX)",
      presentationPreviewLabel: "Deck Preview",
      presentationFallbackNote:
        "If the deck changes later, this preview can stay in place by updating the cover image only.",
      presentationLanguageBadgeLabel: "Deck language",
      presentationSlideCountLabel: "slides",
      experienceGalleryTitle: "Experience Gallery",
      experienceGalleryBadgeLabel: "Milestone",
      experienceGalleryPrevLabel: "Previous experience image",
      experienceGalleryNextLabel: "Next experience image",
      downloadPdfLabel: "Download PDF",
      projectDetailEyebrow: "Personal Project",
      projectDetailBackLabel: "Back to resume",
      projectDetailImageLabel: "Media",
      projectDetailOverviewLabel: "Overview",
      projectDetailFeedbackLabel: "Feedback",
      projectDetailPreviewLabel: "Preview Surface",
      projectDetailImageZoomLabel: "Click image to enlarge",
      projectDetailClosePreviewLabel: "Close preview",
      projectDetailPreviewNote:
        "This placeholder is intentionally generated inside the site and can be replaced with real product screenshots later.",
      projectDetailFeedbackIntro:
        "If you have feedback for this project, draft it here and the site will open a GitHub issue form with the content prefilled.",
      projectDetailFeedbackTitleLabel: "Suggestion title",
      projectDetailFeedbackMessageLabel: "Suggestion",
      projectDetailFeedbackEmailLabel: "Email (optional)",
      projectDetailFeedbackEmailHint:
        "Leave an email only if you want follow-up outside the GitHub thread.",
      projectDetailFeedbackSubmitLabel: "Open GitHub issue draft",
      projectDetailFeedbackOpenedLabel:
        "A prefilled GitHub issue draft has been opened in a new tab.",
      projectDetailFeedbackValidationLabel:
        "Fill in both the title and suggestion before opening the issue draft.",
      projectDetailFeedbackDisabledLabel: "Feedback is not open for this project yet",
      projectsTitle: "Projects",
      certificationsTitle: "Certifications / Awards",
    },
    projects: {
      eyebrow: "Projects / Personal Builds",
      title: "Projects",
      intro:
        "A focused list of the personal projects I directly build, with fast entry points into their detail pages.",
      listTitle: "Project List",
      detailCtaLabel: "View details",
      previewLabel: "Card preview",
      placeholderPreviewLabel: "Preview pending",
      emptyState: "There are no public personal projects listed yet.",
      backToProjectsLabel: "Back to projects",
    },
    blog: {
      eyebrow: "Writing / Technical Articles",
      title: "Writing",
      intro:
        "Short essays on platform architecture, operability, engineering delivery, and the tradeoffs behind systems that need to keep running.",
      listTitle: "Article Timeline",
      allTopics: "All topics",
      allFormats: "All formats",
      pillarLabel: "Pillar",
      newsAnalysisLabel: "News Analysis",
      techNewsLabel: "Tech News",
      aiGeneratedLabel: "AI Generated",
      aiGeneratedNote: "This article started as an AI-generated draft and was reviewed before publication.",
      newBadgeLabel: "NEW",
      emptyState: "There are no published posts for this topic yet.",
      endCtaTitle: "Keep reading",
      endCtaBody:
        "Continue with related articles first, then jump to the full resume if you want the broader operating context.",
      relatedPostsTitle: "Related articles",
      resumeSecondaryCta: "Open full resume",
    },
    contact: {
      eyebrow: "Connect / Public Contact",
      title: "Connect",
      intro:
        "For conversations about backend engineering, platform leadership, or relevant opportunities, start from a public contact path here.",
      methodsTitle: "Contact methods",
      collaborationTitle: "Good reasons to reach out",
      collaborationTopics: [
        "Senior backend or platform engineering roles",
        "Tech lead or engineering leadership conversations",
        "Outsourced project work and technical delivery needs",
        "0→1 platform architecture and delivery design",
        "Commerce, logistics, and AI-enabled product opportunities",
      ],
      responseTitle: "How I usually respond",
      responseBody:
        "You can start from a public platform or email anomo06822@gmail.com. If the direction makes sense, direct channels can follow.",
      privacyTitle: "Privacy note",
      privacyNote:
        "Phone number and address are intentionally omitted. Public contact is available through LinkedIn, GitHub, and anomo06822@gmail.com.",
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
      analyticsNotice:
        "This site uses anonymous GA4 pageviews plus whitelisted attribution fields only: utm source / medium / campaign / content, articleId, locale, and referrer host. It does not track form content or outbound interaction details.",
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
    case "projects":
      return slug ? `/${locale}/projects/${slug}` : `/${locale}/projects`;
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

export function getProjectHref(locale: Locale, slug: string) {
  return getRouteHref(locale, "projects", slug);
}

export function withBasePath(pathname: string) {
  if (!pathname.startsWith("/")) {
    return `${siteConfig.basePath}/${pathname}`;
  }

  if (pathname.startsWith(siteConfig.basePath)) {
    return pathname;
  }

  return `${siteConfig.basePath}${pathname}`;
}

export function getAbsoluteSiteUrl(pathname: string) {
  const origin = new URL(siteConfig.siteUrl).origin;
  return new URL(withBasePath(pathname), origin).toString();
}

export function getBlogSocialImagePath(locale: Locale, slug: string, heroImagePath?: string | null) {
  const normalizedHeroImagePath = heroImagePath?.trim();
  if (normalizedHeroImagePath) {
    return withBasePath(normalizedHeroImagePath.startsWith("/") ? normalizedHeroImagePath : `/${normalizedHeroImagePath}`);
  }

  return withBasePath(`/social/blog/${locale}/${slug}.svg`);
}
