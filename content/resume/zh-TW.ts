import type { ResumeContent } from "../../src/lib/types";

export const resumeZhTW: ResumeContent = {
  profile: {
    name: "黃智偉",
    englishName: "Jarvis Huang",
    locationLabel: "台灣",
    avatar: "JH",
  },
  positioning: {
    headline:
      "Senior Backend Engineer / Tech Lead / Engineering Manager｜.NET、Azure、電商平台與後端架構",
    openToRoles: [
      "Senior Backend Engineer",
      "Tech Lead",
      "Engineering Manager",
    ],
  },
  about: [
    "具備 10+ 年大型電商與平台系統經驗，長期專注在後端服務、平台架構與工程交付。",
    "職涯歷程橫跨 QA、Backend Engineer、Engineering Lead 到 Assistant Project Manager，能同時理解品質、架構與交付節奏。",
    "熟悉 .NET backend development、Azure cloud architecture、CI/CD 與工程團隊帶領。",
    "專注在建立穩定、可擴充的平台，並幫助團隊持續交付可靠系統。",
    "目前關注 platform engineering、backend architecture 與 AI-enabled products 相關機會。",
  ],
  highlights: [
    {
      value: "10+",
      label: "年電商與平台經驗",
      detail:
        "從 QA automation 到 backend、engineering leadership 與 delivery ownership 的完整歷程。",
    },
    {
      value: "20+",
      label: "工程團隊帶領 / 協作規模",
      detail:
        "跨 mobile、desktop、backend 與 big data 平台推動交付與協作。",
    },
    {
      value: "1M+",
      label: "App 下載量",
      detail:
        "負責公開行動產品的穩定性、版本交付與使用者互動改善。",
    },
    {
      value: "0→1",
      label: "物流平台落地",
      detail:
        "主導 First Horizon 從綠地架構到 CI/CD、observability 與運作節奏。",
    },
  ],
  experiences: [
    {
      company: "新加坡商昭津國際物流有限公司台灣分公司",
      role: "Assistant Project Manager / Tech Lead",
      period: "2024.04 - 至今",
      location: "台中",
      impactBullets: [
        "主導 First Horizon 物流平台從 0 到 1 的開發與落地，將架構、交付與維運在一開始就放進同一條主線。",
        "以 Next.js、.NET Core、CQRS 與 Vertical Slice 設計平台架構，讓領域切分與實作流程保持可維護性。",
        "建立 Azure DevOps CI/CD 並部署到 Azure，讓新平台具備可重複發布與環境治理能力。",
        "導入 Prometheus、Grafana、Jaeger，讓監控、記錄與診斷成為日常工程流程的一部分。",
        "管理台灣團隊共 7 位工程師，持續對齊專案節奏與技術方向。",
        "協調香港與澳洲團隊的跨區域合作，讓產品、工程與營運在交付上保持一致。",
      ],
      keywords: [
        "Next.js",
        ".NET Core",
        "CQRS",
        "Azure",
        "Azure DevOps",
        "Observability",
      ],
    },
    {
      company: "Newegg 台灣",
      role: "Assistant Team Manager / Engineering Lead",
      period: "2020.04 - 2024.04",
      location: "台中",
      impactBullets: [
        "帶領 20+ 位工程師支援 B2C mobile、B2B desktop 與 big data 平台，維持全球電商場景下的交付節奏。",
        "維運 1M+ 下載量、4.6 App Store 評分與 99.9% crash-free users 的行動產品。",
        "把 Android 推播開啟率從 2% 提升到 5%，透過交付協作與訊息品質優化提升使用者互動。",
        "將無效裝置 token 降低約 33%，改善推播可靠度與後續營運效率。",
        "改善 Core Web Vitals，將 bad URLs 從 50% 降到 7% 以下。",
        "推動 microservice architecture 與 shared presentation layer，支援多產品線並行交付。",
      ],
      keywords: [
        "React Native",
        "React",
        "Team Leadership",
        "Analytics",
        "SEO",
        "Push Notifications",
      ],
    },
    {
      company: "Newegg 台灣",
      role: "Staff Engineer",
      period: "2016.04 - 2020.04",
      location: "台中",
      impactBullets: [
        "負責 B2B 電商平台的後端服務，涵蓋帳號、購物與訂單處理等核心流程。",
        "建立支撐高價值交易與採購情境的關鍵 backend services。",
        "將服務從 .NET Framework 遷移到 .NET Core，為平台現代化與模組化交付打底。",
        "導入 TDD 與 Jenkins、GitLab 的 CI/CD，提升發布信心並降低回歸成本。",
        "使用 dotTrace 與 Visual Studio Profiler 優化服務效能，改善回應速度與資源效率。",
      ],
      keywords: [
        "C#",
        ".NET Core",
        "B2B Commerce",
        "MS SQL",
        "CI/CD",
        "Performance Profiling",
      ],
    },
    {
      company: "Newegg 台灣",
      role: "QA Automation Engineer",
      period: "2013.04 - 2016.04",
      location: "台中",
      impactBullets: [
        "負責電商訂單與購物流程相關的品質驗證，支援核心交易旅程的穩定性。",
        "以 Selenium 與 Nightwatch 建立自動化測試，降低大量重複回歸測試成本。",
        "改善測試覆蓋率與 integration testing 流程，建立之後轉向 backend engineering 的系統視角。",
      ],
      keywords: [
        "Selenium",
        "Nightwatch",
        "Automation Testing",
        "Integration Testing",
      ],
    },
  ],
  topSkills: [
    "C#",
    ".NET Core",
    "System Architecture",
    "Microservices",
    "Azure",
    "CI/CD",
    "Backend Development",
    "SQL",
    "Distributed Systems",
    "Team Leadership",
  ],
  featured: [
    {
      title: "Newegg App",
      summary:
        "面向消費者的行動產品維運與改善，兼顧可靠度、互動率與版本品質。",
      proofPoints: [
        "支援 1M+ 下載量與 4.6 App Store 評分的產品。",
        "在改善通知品質與發版穩定度的同時，維持 99.9% crash-free users。",
        "將推播開啟率從 2% 提升到 5%，並把無效 token 降低約 33%。",
      ],
    },
    {
      title: "B2B Website",
      summary:
        "聚焦關鍵電商與採購流程的後端現代化與商務能力整合。",
      proofPoints: [
        "建立帳號、購物車與訂單處理等核心服務，支撐 B2B 交易流程。",
        "整合 PayPal、MasterPass、e-procurement 與 Net Terms 等商務能力。",
        "推動 .NET Framework 到 .NET Core 遷移，並同步建立 TDD 與 CI/CD。",
      ],
    },
    {
      title: "Architecture / Platform Leadership",
      summary:
        "把 0→1 平台的架構、交付、觀測性與跨區協作整合成同一套運作方式。",
      proofPoints: [
        "主導 First Horizon 從綠地規劃走到正式交付結構。",
        "帶領 7 人台灣團隊，並與香港、澳洲利害關係人協作對齊。",
        "從第一階段就建立 Azure DevOps、deployment flow 與 Prometheus / Grafana / Jaeger。",
      ],
    },
  ],
  projectShowcase: {
    personal: [
      {
        title: "ai-productivity-workspace",
        subtitle: "Private GitHub repository",
        summary:
          "以 Electron、React 與 .NET 10 組成的個人生產力工作區，目標是把桌面工作流、任務管理與 agent 能力收斂到同一個可持續演進的產品骨架。",
        bullets: [
          "桌面殼層採用 Electron，前端使用 React + TypeScript + Tailwind v4，後端是 .NET 10 vertical-slice API 搭配 EF Core 與 PostgreSQL。",
          "目前已整理 tasks、projects、agents、roles、dispatch 與 assets APIs，作為持續擴充的 workspace 核心。",
          "也納入本機 MCP 與 desktop dev workflow，讓 AI-assisted workflow 可以直接接進自己的 daily workspace。",
        ],
        tags: [
          "Electron",
          "React",
          "TypeScript",
          ".NET 10",
          "Productivity",
        ],
        imageAlt: "AI Productivity Workspace app preview",
        note: "Repository 目前尚未公開，整理完成後會再補上 GitHub 連結。",
      },
      {
        title: "phalanx-chronicle",
        subtitle: "anomo06822/phalanx-chronicle",
        summary:
          "以 Unity 製作的 SRPG 戰役原型，從戰役進程、軍營整備到戰鬥規則與 UI 流程，都已經進入可直接在專案中遊玩的 MVP 狀態。",
        bullets: [
          "已串起 12 章劉備傳單線戰役，並整合章節解鎖、獎勵、招募、裝備更換與升階流程。",
          "戰鬥系統涵蓋 10x10 戰場、技能與狀態效果、敵軍 AI 決策、HUD 與傷害預測等核心規則。",
          "README 內已提供 demo、畫面預覽與 headless 規則測試說明，作為持續擴充的公開遊戲原型。",
        ],
        tags: ["Unity", "SRPG", "Game Prototype", "C#", "Gameplay Systems"],
        href: "https://github.com/anomo06822/phalanx-chronicle",
        hrefLabel: "前往 GitHub",
        imageAlt: "Phalanx Chronicle game preview",
      },
    ],
    core: [
      {
        title: "First Horizon",
        subtitle: "SJC International Logistics",
        summary:
          "0→1 的物流平台專案，重點不只是功能交付，而是把架構、發版流程、可觀測性與跨區域協作一開始就放進同一套運作方式。",
        bullets: [
          "以 Next.js、.NET Core、CQRS 與 Vertical Slice 設計平台架構，讓領域切分與實作流程保持可維護性。",
          "建立 Azure DevOps CI/CD 並部署到 Azure，讓發布流程與環境治理具備可重複執行能力。",
          "導入 Prometheus、Grafana、Jaeger，讓監控、記錄與診斷成為日常工程流程的一部分。",
        ],
        tags: ["Next.js", ".NET Core", "CQRS", "Azure", "Observability"],
        href: "https://sjclemenger.com/",
        hrefLabel: "查看網站",
        imageAlt: "First Horizon platform preview",
      },
      {
        title: "Newegg Mobile",
        subtitle: "Newegg",
        summary:
          "面向消費者的行動產品維運與改善，聚焦可靠度、互動率與版本品質，在大流量場景下持續優化使用者體驗。",
        bullets: [
          "支援 1M+ 下載量、4.6 App Store 評分與 99.9% crash-free users 的公開產品。",
          "將 Android 推播開啟率從 2% 提升到 5%，並把無效裝置 token 降低約 33%。",
          "同步改善 release coordination、notification quality 與 mobile web 的 Core Web Vitals 表現。",
        ],
        tags: [
          "React Native",
          "Mobile Commerce",
          "Push Notifications",
          "Analytics",
          "SEO",
        ],
        href: "https://www.newegg.com/",
        hrefLabel: "查看網站",
        imageAlt: "Newegg mobile product preview",
      },
      {
        title: "Newegg Business",
        subtitle: "Newegg Business",
        summary:
          "聚焦關鍵電商與採購流程的 B2B 平台後端現代化，涵蓋帳號、購物、訂單與商務能力整合。",
        bullets: [
          "建立帳號、購物車與訂單處理等核心 backend services，支撐高價值 B2B 交易流程。",
          "整合 PayPal、MasterPass、e-procurement 與 Net Terms 等商務能力。",
          "推動 .NET Framework 到 .NET Core 遷移，並同步導入 TDD 與 Jenkins / GitLab CI/CD。",
        ],
        tags: ["C#", ".NET Core", "B2B Commerce", "MS SQL", "CI/CD"],
        href: "https://neweggbusiness.com/",
        hrefLabel: "查看網站",
        imageAlt: "Newegg Business platform preview",
      },
    ],
  },
  projects: [
    {
      title: "Follow Seller - Newegg Hackathon",
      subtitle: "Newegg Global Hackathon",
      bullets: [
        "在 3 天內完成 prototype，驗證產品概念與執行可行性。",
        "拿下 Global Hackathon 1st Place 與 Most Valuable Project Award。",
        "把最初原型延伸成正式上線功能。",
      ],
      tags: ["Hackathon", "Prototype", "Production Launch"],
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
      note: "Most Valuable Project Award / Follow Seller",
    },
  ],
};
