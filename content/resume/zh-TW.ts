import type { ResumeContent } from "../../src/lib/types";

export const resumeZhTW: ResumeContent = {
  profile: {
    name: "黃智偉",
    englishName: "Jarvis Huang",
    locationLabel: "台灣",
    avatar: "JH",
  },
  positioning: {
    headline: "Tech Lead / Backend Architect｜平台架構、工程交付與可維運系統",
    targetRoles: ["Tech Lead", "Backend Architect", "Platform Engineering Lead"],
    valueProposition:
      "擅長把平台架構、交付流程與跨團隊協作收斂成可持續的工程系統，讓產品從綠地平台到穩定維運都能清楚落地。",
    recruiterKeywords: [
      "Backend Architecture",
      "Platform Engineering",
      "Engineering Delivery",
      "Azure DevOps",
      "Observability",
      "E-commerce Systems",
      "Cross-functional Leadership",
    ],
  },
  executiveSummary: [
    "10+ 年聚焦大型電商、平台系統與工程交付，近年主軸放在後端架構、團隊帶領與可維運系統設計。",
    "在綠地物流平台與全球電商場景中，能同時處理架構選型、交付流程、品質治理與跨部門協作，讓系統能上線、能維護，也能持續擴張。",
  ],
  selectedImpact: [
    {
      value: "10+",
      label: "年平台與商務系統經驗",
      detail: "從 QA automation、B2B backend 到 engineering lead 與 greenfield tech lead。",
    },
    {
      value: "20+",
      label: "工程團隊協作規模",
      detail: "在 mobile、desktop、backend 與 data service 的環境中推動交付節奏。",
    },
    {
      value: "1M+",
      label: "維運產品下載量",
      detail: "支援對外行動產品的穩定性、通知品質與版本交付。",
    },
    {
      value: "99.9%",
      label: "Crash-free users",
      detail: "在公開產品可靠度維持下，同步改善推播與效能訊號。",
    },
  ],
  experiences: [
    {
      company: "新加坡商昭津國際物流有限公司台灣分公司",
      role: "Assistant Project Manager / Tech Lead",
      period: "2024.04 - 至今",
      location: "台中",
      mission:
        "主導新物流平台從架構、交付到上線後維運的整體規劃，把工程實作與專案節奏收斂到同一條主線。",
      impactBullets: [
        "以 Next.js、.NET Core、CQRS 與 Vertical Slice 從 0 到 1 打造 First Horizon，讓物流平台的領域流程與交付模型一次定型。",
        "建立 Azure DevOps CI/CD、部署自動化與 Azure 資源規劃，讓新平台具備可重複發布與環境治理能力。",
        "導入 Prometheus、Grafana、Jaeger 與跨職能協作節奏，將上線後診斷、監控與交付責任納入同一條工程主線。",
      ],
      keywords: [
        "Next.js",
        ".NET Core",
        "CQRS",
        "Azure",
        "Azure DevOps",
        "Observability",
      ],
      emphasis: "featured",
    },
    {
      company: "Newegg 台灣",
      role: "Engineering Lead",
      period: "2020.04 - 2024.04",
      location: "台中",
      mission:
        "負責全球電商場景中的行動平台、桌面平台與資料服務協作，兼顧產品穩定度與團隊交付節奏。",
      impactBullets: [
        "在 20+ 工程規模環境中協調 B2C mobile、B2B desktop 與 backend data services，讓多產品線維持一致的交付節奏。",
        "支援混合式行動產品維持 4.6 App Store 評分、1M+ 下載量與 99.9% crash-free users。",
        "將 Android 推播開啟率由 2% 提升到 5%，並把無效裝置 token 降低 33%，同步改善 mobile web 效能與 Core Web Vitals。",
      ],
      keywords: [
        "React Native",
        "React",
        "Engineering Leadership",
        "Analytics",
        "SEO",
        "Push Notifications",
      ],
      emphasis: "featured",
    },
    {
      company: "Newegg 台灣",
      role: "Staff Engineer",
      period: "2016.04 - 2020.04",
      location: "台中",
      mission:
        "主導 B2B 電商核心服務與平台現代化，讓既有商務流程逐步轉向可測試、可持續交付的架構。",
      impactBullets: [
        "開發帳號、購物與訂單處理等核心服務，支撐 B2B 平台的關鍵交易流程。",
        "完成 PayPal、MasterPass、e-procurement 與 Net Terms 等 4 類商務整合，擴充平台支付與採購能力。",
        "導入單元測試、TDD、CI/CD 與 .NET Framework 到 .NET Core 遷移，降低回歸成本並為微服務化打底。",
      ],
      keywords: [
        "C#",
        ".NET Core",
        "B2B Commerce",
        "MS SQL",
        "CI/CD",
        "System Integration",
      ],
      emphasis: "featured",
    },
    {
      company: "Newegg 台灣",
      role: "QA Automation Engineer",
      period: "2013.04 - 2016.04",
      location: "台中",
      mission:
        "以測試自動化為起點，建立對系統行為、風險與品質基線的理解，之後轉向後端工程。",
      impactBullets: [
        "以 SoapUI、Postman、Selenium、Nightwatch 建立 API 與 UI 自動化，減少人工回歸負擔。",
        "撰寫測試資料與驗證腳本，提升缺陷重現與驗證效率。",
        "把 QA 背景轉化為後續後端工作中的風險意識與系統觀。",
      ],
      keywords: [
        "SoapUI",
        "Postman",
        "Selenium",
        "Nightwatch",
        "Automation",
        "Regression Testing",
      ],
      emphasis: "earlier",
    },
  ],
  selectedWins: [
    {
      title: "First Horizon 物流平台",
      period: "2024 - 至今",
      summary:
        "把綠地平台的架構、交付與監控當成同一個系統設計問題，不讓可維運性留到後期補救。",
      proofPoints: [
        "從零定義前後端架構、領域切分與交付節奏。",
        "CI/CD、部署流程與 observability 在第一版就進入日常作業模型。",
        "對外呈現的是平台落地速度，對內留下的是可維護的工程骨架。",
      ],
      tags: ["Greenfield Platform", "Azure", ".NET", "Next.js"],
    },
    {
      title: "行動平台可靠度與成長改善",
      period: "2020 - 2024",
      summary:
        "在已上線產品中持續優化可靠度、通知品質與效能訊號，讓穩定度與成長目標能同時成立。",
      proofPoints: [
        "維持 1M+ 下載量產品的日常品質與版本交付。",
        "Crash-free users 維持 99.9%，同時改善 Core Web Vitals。",
        "推播開啟率 2% -> 5%，無效 token 降低 33%。",
      ],
      tags: ["Mobile Reliability", "Performance", "Analytics"],
    },
    {
      title: "Newegg Global Hackathon - Follow Seller",
      period: "2021",
      summary:
        "用極短週期驗證產品想法、拆解跨職能協作，並把原型進一步推進到正式上線。",
      proofPoints: [
        "3 天 sprint 交付可操作原型。",
        "獲得 Global Hackathon 1st Place 與 Most Valuable Project Award。",
        "後續延伸成正式上線功能。",
      ],
      tags: ["Hackathon", "Product Delivery", "Leadership"],
    },
  ],
  coreStack: [
    {
      title: "Backend / Service Design",
      items: ["C#", ".NET Core", "ASP.NET Core", "REST API", "Domain Modeling"],
    },
    {
      title: "Platform Architecture",
      items: [
        "CQRS",
        "Monorepo",
        "Vertical Slice Architecture",
        "Distributed Systems Design",
      ],
    },
    {
      title: "Cloud / Delivery",
      items: [
        "Microsoft Azure",
        "Azure DevOps",
        "Docker",
        "Kubernetes",
        "CI/CD",
      ],
    },
    {
      title: "Product / Reliability",
      items: ["Next.js", "React", "React Native", "Observability", "Performance"],
    },
  ],
  certifications: [
    {
      title: "Google Cloud Big Data and Machine Learning Fundamentals",
      issuer: "Google Cloud",
      year: "2021",
    },
    {
      title: "Newegg Global Hackathon - 1st Place",
      issuer: "Newegg",
      year: "2021",
      note: "Follow Seller / Most Valuable Project Award",
    },
  ],
  contactNote:
    "公開站點不放電話、地址與私人信箱；若有進一步交流需求，會在合適情境再提供。",
};
