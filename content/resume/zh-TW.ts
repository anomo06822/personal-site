import type { ResumeContent } from "../../src/lib/types";
import pdfManifest from "./pdf-manifest.json";

export const resumeZhTW: ResumeContent = {
  profile: {
    name: "黃智偉",
    englishName: "Jarvis Huang",
    locationLabel: "台灣",
    portraitSrc: "/images/profile/jarvis-huang-headshot.png",
    portraitAlt: "Jarvis Huang 個人照",
  },
  positioning: {
    headlinePrimary: "從平台架構到產品交付，讓工程持續前進。",
    headlineSecondary: ".NET、Azure、電商平台與後端架構",
    openToRoles: [
      "Engineering Manager",
      "Tech Lead",
      "Senior Backend Engineer",
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
      period: "2024.04 - 2026.03",
      location: "台中",
      logo: {
        src: "/images/company-logos/sjc-logo.jpg",
        alt: "SJC logo",
      },
      impactBullets: [
        "主導 First Horizon 物流平台從 0 到 1，將產品需求、平台架構與交付節奏拉成同一條主線。",
        "以 Next.js、.NET Core、CQRS 與 Vertical Slice 規劃邊界，讓模組切分、需求擴充與維護成本保持可控。",
        "建立 Azure DevOps CI/CD、環境設定與發版流程，讓新平台從第一階段就具備可重複交付能力。",
        "導入 Prometheus、Grafana、Jaeger，讓監控、追蹤與問題診斷能直接支援日常開發與維運。",
        "管理台灣 7 位工程師，並持續協調香港與澳洲團隊對齊需求拆解、技術決策與跨區交付節奏。",
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
      logo: {
        src: "/images/company-logos/newegg-logo.svg",
        alt: "Newegg logo",
      },
      impactBullets: [
        "帶領 20+ 位工程師支援 B2C mobile、B2B desktop 與 big data 平台，負責跨產品線的交付節奏與協作方式。",
        "建立 shared presentation layer 與 microservice 拆分策略，支援多產品線共用能力與並行開發。",
        "整合 analytics、push notification、SEO 與 release coordination，讓 mobile 與 web 體驗改善能用同一套流程落地。",
        "與產品、設計、營運及跨區團隊對齊 roadmap、版本節點與 incident handling，讓公開產品在高流量情境下持續穩定迭代。",
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
      role: "Staff Engineer / Group Leader",
      period: "2016.04 - 2020.04",
      location: "台中",
      logo: {
        src: "/images/company-logos/newegg-logo.svg",
        alt: "Newegg logo",
      },
      impactBullets: [
        "負責 Newegg Business B2B 電商平台後端服務，涵蓋帳號、購物車、訂單、付款與採購流程。",
        "設計支撐高價值交易與企業採購情境的 backend services，將商務規則沉澱成可擴充的服務邊界。",
        "推動 .NET Framework 到 .NET Core 遷移，並整理更模組化的服務拆分與交付方式。",
        "導入 TDD、Jenkins 與 GitLab CI/CD，讓 backend 變更能以更穩定且可重複的流程發布。",
        "使用 dotTrace 與 Visual Studio Profiler 持續處理效能瓶頸與資源使用問題。",
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
      logo: {
        src: "/images/company-logos/newegg-business-logo.png",
        alt: "Newegg Business logo",
      },
      impactBullets: [
        "負責 Newegg Business 訂單、購物與企業採購流程的品質驗證，支援核心交易旅程穩定運作。",
        "以 Selenium 與 Nightwatch 建立自動化測試與回歸檢查，降低大量重複手動驗證成本。",
        "逐步補齊 integration testing 與測試覆蓋，建立後續轉向 backend engineering 的系統視角與問題拆解能力。",
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
    ".NET Framework",
    ".NET Core",
    "Python",
    "Java",
    "React",
    "React Native",
    "Next.js",
    "MS SQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "RabbitMQ",
    "System Architecture",
    "Vertical Slice Architecture",
    "Microservices",
    "Azure",
    "CI/CD",
    "Backend Development",
    "Distributed Systems",
    "Team Leadership",
  ],
  topSkillGroups: [
    {
      label: "核心技術",
      skills: [
        "C#",
        ".NET Framework",
        ".NET Core",
        "Python",
        "Java",
        "React",
        "React Native",
        "Next.js",
        "Azure",
      ],
    },
    {
      label: "資料 / 中介",
      skills: ["MS SQL", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ"],
    },
    {
      label: "架構 / 系統",
      skills: [
        "Backend Development",
        "System Architecture",
        "Vertical Slice Architecture",
        "Microservices",
        "Distributed Systems",
      ],
    },
    {
      label: "交付 / 帶領",
      skills: ["CI/CD", "Team Leadership"],
    },
  ],
  featured: [
    {
      title: "Newegg Mobile",
      summary:
        "在高流量公開產品上，同時兼顧可靠度、使用者互動與版本品質的行動產品交付。",
      proofPoints: [
        "支援 1M+ 下載量與 4.6 App Store 評分的公開產品。",
        "長期維持 99.9% crash-free users，讓大型版本更新與日常維運都能穩定推進。",
        "把 Android 推播開啟率從 2% 提升到 5%，並將無效裝置 token 降低約 33%。",
      ],
    },
    {
      title: "Newegg Business",
      summary:
        "聚焦 B2B 電商與採購場景的後端現代化，讓核心交易流程更模組化也更容易持續交付。",
      proofPoints: [
        "建立帳號、購物車、訂單與企業採購相關服務，支撐高價值 B2B 交易流程。",
        "整合 PayPal、MasterPass、e-procurement 與 Net Terms 等商務能力。",
        "完成 .NET Framework 到 .NET Core 遷移，並同步導入 TDD 與 Jenkins / GitLab CI/CD。",
      ],
    },
    {
      title: "First Horizon / Platform Delivery",
      summary:
        "把 0→1 平台的架構、交付與可觀測性一次建立起來，讓團隊能在同一套運作方式下前進。",
      proofPoints: [
        "主導 First Horizon 從綠地規劃走到可持續交付的物流平台骨架。",
        "帶領 7 人台灣團隊，並與香港、澳洲利害關係人協作對齊。",
        "從第一階段就建立 Azure DevOps、Azure deployment flow 與 Prometheus / Grafana / Jaeger。",
      ],
    },
  ],
  projectShowcase: {
    personal: [
      {
        slug: "ai-productivity-workspace",
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
        detailIntro: [
          "這個專案的核心想法不是單點工具，而是把任務管理、agent orchestration、桌面工作流與資料資產放進同一個 workspace。",
          "目前以 Electron 桌面殼層承接日常操作，再用 React + TypeScript + Tailwind v4 建出前端表面；後端則以 .NET 10 vertical-slice API 處理資料與流程。",
          "我把它當成長期演進的個人產品骨架，因此也把 local MCP、desktop-first dev workflow 與後續 AI-assisted workflow 一起納入設計。",
        ],
        detailImage: {
          kind: "placeholder",
          alt: "AI Productivity Workspace placeholder preview",
        },
        feedback: {
          type: "disabled",
          message:
            "這個 repository 目前尚未公開；等公開版整理完成後，才會開放 GitHub issue feedback。",
        },
        imageAlt: "AI Productivity Workspace app preview",
        note: "Repository 目前尚未公開，整理完成後會再補上 GitHub 連結。",
      },
      {
        slug: "phalanx-chronicle",
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
        detailIntro: [
          "這個專案聚焦在戰役推進與戰場規則的完整串接，目標不是單一戰鬥 demo，而是一個可延伸的 SRPG campaign prototype。",
          "目前已經把章節解鎖、招募、裝備更換、升階、戰鬥規則、敵軍 AI 與 HUD 流程接到同一個可遊玩的 MVP 狀態。",
          "公開 repo 也包含 demo、畫面預覽與 headless 規則測試說明，方便後續持續擴充系統與內容。",
        ],
        detailImage: {
          kind: "placeholder",
          alt: "Phalanx Chronicle placeholder preview",
        },
        feedback: {
          type: "github-issue",
          repoUrl: "https://github.com/anomo06822/phalanx-chronicle",
          emailOptional: true,
        },
        href: "https://github.com/anomo06822/phalanx-chronicle",
        hrefLabel: "前往 GitHub",
        imageAlt: "Phalanx Chronicle game preview",
      },
      {
        slug: "xml-toolkit",
        title: "xml-toolkit",
        subtitle: "anomo06822/xml-toolkit",
        summary:
          "聚焦 XML、JSON 與 Markdown 的多格式資料工具，提供 format、minify、sort、diff、convert 與 visualize 等日常處理能力，並往 Electron 桌面應用與可選 .NET 10 backend 延伸。",
        bullets: [
          "以單一工具介面整合 XML、JSON、Markdown 的格式化、縮排、排序、差異比較、轉換與視覺化流程。",
          "加入 Gemini assistant 與 AI diff summary，並支援 Electron desktop packaging、menu bar entry、global wakeup shortcut 與 GitHub Releases 更新檢查。",
          "可選擇使用 .NET 10 backend proxy 隔離 API key，同時保留 web/direct mode 與 Docker deployment 路徑。",
        ],
        tags: [
          "XML",
          "JSON",
          "Markdown",
          "Electron",
          ".NET 10",
          "AI Assistant",
        ],
        detailIntro: [
          "這個專案原本是資料格式處理工具，現在已擴充成兼顧 web mode 與 desktop mode 的 DataToolkit，目標是把 XML、JSON、Markdown 的整理、比對與視覺化放進同一個工作介面。",
          "除了格式化與 diff 之外，repo 也整合 Gemini assistant / AI diff summary、Electron 桌面封裝、menu bar 狀態入口、全域喚醒捷徑與 GitHub Releases 更新檢查。",
          "如果需要把 API key 留在本機或打包到桌面版，它也提供可選的 .NET 10 backend proxy 與 Docker web deployment 路徑。",
        ],
        detailImage: {
          kind: "placeholder",
          alt: "xml-toolkit placeholder preview",
        },
        feedback: {
          type: "github-issue",
          repoUrl: "https://github.com/anomo06822/xml-toolkit",
          emailOptional: true,
        },
        href: "https://github.com/anomo06822/xml-toolkit",
        hrefLabel: "前往 GitHub",
        imageAlt: "xml-toolkit project preview",
        note: "目前 repo 內產品命名偏向 DataToolkit，公開對外暫以 xml-toolkit repo 名稱呈現。",
      },
    ],
    core: [
      {
        title: "First Horizon",
        subtitle: "SJC International Logistics",
        summary:
          "SJC 的物流平台入口，承接跨區作業流程、營運協作與後續平台能力擴充。",
        bullets: [
          "前端以 Next.js 承接作業流程，後端以 .NET Core、CQRS 與 Vertical Slice 處理平台能力。",
          "平台設計重點在模組邊界、部署治理與可觀測性，而不只是單次功能交付。",
          "公開站點可視為產品入口，實際價值在背後的物流平台骨架與營運支援能力。",
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
          "Newegg 面向消費者的行動購物體驗，涵蓋 app 與 mobile web 的日常營運與版本交付。",
        bullets: [
          "產品面向公開零售流量，重點包含商品瀏覽、購物流程、通知觸達與版本體驗。",
          "技術面向涵蓋 React Native、analytics、push notification 與 mobile web SEO / CWV。",
          "我在其中負責的是跨團隊交付、可靠度治理與體驗改善的工程面工作。",
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
          "Newegg 的企業採購與 B2B 電商入口，對應帳號、採購、付款與訂單等商務流程。",
        bullets: [
          "產品重點在企業客戶的交易與 procurement 流程，而不是一般 B2C 購物體驗。",
          "平台核心以 C# / .NET、MS SQL 與商務整合能力支撐。",
          "我參與的重點是 backend services、系統現代化與交付流程治理。",
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
  experienceGallery: {
    intro:
      "從 2015 到 2026，這條影像時間軸串起我從 QA automation、Newegg Business、Newegg Mobile 到 First Horizon 的代表經歷。",
    items: [
      {
        stageLabel: "QA / Newegg Business 起點",
        title: "QA Automation 起步",
        period: "2015.02",
        caption:
          "這張照片記錄 QA automation 的起點，也對應我建立系統視角的早期階段。",
        imageAlt: "QA Automation stage placeholder for Newegg Business",
        imageSrc: "/images/experience-gallery/experience-01-qa-foundation-2015-02.jpg",
      },
      {
        stageLabel: "QA / Newegg Business 起點",
        title: "早期團隊聚餐",
        period: "2016.01",
        caption:
          "這場聚餐記錄自動化測試時期的團隊默契，也對應我開始理解跨功能合作的方式。",
        imageAlt: "Early Newegg Business team dinner photo",
        imageSrc: "/images/experience-gallery/experience-02-team-dinner-2016-01.jpg",
      },
      {
        stageLabel: "Newegg Business / Staff Engineer / Group Leader",
        title: "後端轉向 Offsite",
        period: "2016.05",
        caption:
          "這次 offsite 落在轉向 backend 的初期，也對應我開始從需求與服務邊界思考系統。",
        imageAlt: "Early backend offsite photo for Newegg Business",
        imageSrc: "/images/experience-gallery/experience-03-team-offsite-2016-05.jpg",
      },
      {
        stageLabel: "Newegg Business / Staff Engineer / Group Leader",
        title: "Business 團隊合影",
        period: "2016.09",
        caption:
          "這張合影對應 Newegg Business 階段，也記錄後端主線逐漸成形的團隊合作。",
        imageAlt: "Newegg Business team photo from 2016",
        imageSrc: "/images/experience-gallery/experience-04-team-photo-2016-09.jpg",
      },
      {
        stageLabel: "Newegg Business / Staff Engineer / Group Leader",
        title: "B2B 團隊 Retreat",
        period: "2018.09",
        caption:
          "這次 retreat 發生在 B2B 平台持續模組化的階段，也記錄團隊一起推進現代化的過程。",
        imageAlt: "Newegg Business retreat photo from 2018",
        imageSrc: "/images/experience-gallery/experience-05-team-retreat-2018-09-a.jpg",
      },
      {
        stageLabel: "Newegg Business / Staff Engineer / Group Leader",
        title: "工程團隊 Offsite",
        period: "2018.09",
        caption:
          "這場 offsite 對應 TDD、CI/CD 與效能優化逐步落地的那段工程節奏。",
        imageAlt: "Engineering offsite photo from Newegg Business in 2018",
        imageSrc: "/images/experience-gallery/experience-06-team-retreat-2018-09-b.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "Newegg 尾牙",
        period: "2021.02.20",
        caption:
          "這場尾牙記錄 Newegg Mobile 階段初期的團隊聚會，也對應角色開始走向 engineering lead。",
        imageAlt: "Newegg year-end party photo from 2021",
        imageSrc: "/images/experience-gallery/experience-15-social-2026-03-a.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "TWET 團隊晚餐",
        period: "2021.10",
        caption:
          "這場晚餐對應 TWET 團隊的日常合作，也記錄我開始承接 mobile、desktop 與 data platform 的協作。",
        imageAlt: "TWET team dinner photo from 2021",
        imageSrc: "/images/experience-gallery/experience-07-mobile-team-dinner-2021-10.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "跨產品線 Offsite",
        period: "2022.09",
        caption:
          "這次 offsite 記錄跨產品線協作現場，也對應 roadmap 與 release 節奏逐步整合的階段。",
        imageAlt: "Cross-team engineering offsite photo from 2022",
        imageSrc: "/images/experience-gallery/experience-08-engineering-offsite-2022-09.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "TWET Team Building",
        period: "2022.10.15",
        caption:
          "這次 team building 記錄 TWET 團隊在公開產品持續迭代時的合作狀態。",
        imageAlt: "TWET team building photo from 2022",
        imageSrc: "/images/experience-gallery/experience-16-social-2026-03-b.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "團隊 Retreat",
        period: "2023.11",
        caption:
          "這場 retreat 對應高流量產品穩定迭代的階段，也記錄更成熟的帶領與跨團隊合作方式。",
        imageAlt: "Newegg retreat photo from 2023",
        imageSrc: "/images/experience-gallery/experience-09-team-retreat-2023-11.jpeg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "Newegg 團隊聚會",
        period: "2024.01",
        caption:
          "這場聚會記錄 Newegg 後期的合作氛圍，也對應多產品線共用節奏與交付方法的階段。",
        imageAlt: "Newegg team gathering photo from 2024",
        imageSrc: "/images/experience-gallery/experience-10-newegg-team-2024-01.jpeg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "Newegg 辦公室重聚",
        period: "2025.01",
        caption:
          "這次辦公室重聚延續了 Newegg 團隊連結，也成為前一段經歷的後續註腳。",
        imageAlt: "Newegg office reunion photo from 2025",
        imageSrc: "/images/experience-gallery/experience-11-newegg-office-2025-01.jpeg",
      },
      {
        stageLabel: "First Horizon / Platform Delivery",
        title: "First Horizon 團隊 Kickoff",
        period: "2025.04",
        caption:
          "這場 kickoff 記錄 First Horizon 啟動初期，也對應需求、架構與交付開始收斂成同一條主線。",
        imageAlt: "First Horizon team kickoff photo from 2025",
        imageSrc: "/images/experience-gallery/experience-12-sjc-team-2025-04.jpeg",
      },
      {
        stageLabel: "First Horizon / Platform Delivery",
        title: "SJC 新春合影",
        period: "2026.01",
        caption:
          "這張新春合影記錄 SJC 團隊進入穩定合作節奏的時期。",
        imageAlt: "SJC new year team photo from 2026",
        imageSrc: "/images/experience-gallery/experience-13-sjc-new-year-2026-01.jpg",
      },
      {
        stageLabel: "First Horizon / Platform Delivery",
        title: "平台團隊合影",
        period: "2026.02",
        caption:
          "這張團隊合影記錄平台交付進入常態運作後的合作現場。",
        imageAlt: "SJC platform team snapshot from 2026",
        imageSrc: "/images/experience-gallery/experience-14-sjc-team-2026-02.jpg",
      },
    ],
  },
  presentation: {
    fileName: "jarvis-intro-cn-2026-v1.pptx",
    title: "Jarvis Huang 自我介紹簡報",
    summary:
      "這份 9 頁簡報集中整理我的角色跨度、平台經驗、First Horizon 0→1 架構實作，以及 Newegg 十年的工程與管理脈絡。",
    previewImageSrc: "/images/resume/jarvis-intro-cn-2026-v1-cover.png",
    previewImageAlt: "Jarvis Huang 自我介紹簡報封面預覽",
    slideCount: 9,
    languageLabel: "中文",
    note:
      "履歷頁保留 PDF 方便快速下載；這份 deck 則適合用來快速理解完整的自我介紹脈絡與敘事節奏。",
  },
  pdf: {
    fileName: pdfManifest["zh-TW"].fileName,
    summary: [
      "具備 10+ 年後端、平台與工程交付經驗，職涯歷程橫跨 QA、自動化測試、後端開發、技術帶領與專案管理。",
      "熟悉 .NET、Azure、CI/CD、observability 與大型電商／物流平台系統，能把架構、交付與維運放在同一個框架下處理。",
    ],
    featured: [
      {
        title: "Newegg Mobile",
        summary:
          "在高流量公開產品上，同時兼顧可靠度、使用者互動與版本品質的行動產品交付。",
        proofPoints: [
          "支援 1M+ 下載量與 4.6 App Store 評分的公開產品。",
          "長期維持 99.9% crash-free users，並把 Android 推播開啟率從 2% 提升到 5%。",
        ],
      },
      {
        title: "Newegg Business",
        summary:
          "聚焦 B2B 電商與採購場景的後端現代化，讓核心交易流程更模組化也更容易持續交付。",
        proofPoints: [
          "建立帳號、購物車、訂單與企業採購相關服務，支撐高價值 B2B 交易流程。",
          "整合 PayPal、MasterPass、e-procurement 與 Net Terms 等商務能力。",
          "完成 .NET Framework 到 .NET Core 遷移，並同步導入 TDD 與 Jenkins / GitLab CI/CD。",
        ],
      },
      {
        title: "First Horizon / Platform Delivery",
        summary:
          "把 0→1 平台的架構、交付與可觀測性一次建立起來，讓團隊能在同一套運作方式下前進。",
        proofPoints: [
          "以 Next.js、.NET Core、CQRS 與 Vertical Slice 規劃平台技術骨架與邊界。",
          "帶領台灣 7 人工程團隊，並與香港、澳洲利害關係人持續對齊。",
          "建立 Azure DevOps CI/CD、Azure 發布流程，並提早導入 Prometheus、Grafana、Jaeger。",
        ],
      },
    ],
    projects: [
      {
        title: "Follow Seller",
        subtitle: "Newegg Global Hackathon",
        bullets: [
          "在 3 天內完成 prototype，驗證概念與執行可行性。",
          "拿下 Global Hackathon 1st Place 與 Most Valuable Project Award，並延伸成正式上線方向。",
        ],
        tags: ["Hackathon", "Prototype", "Production Launch"],
      },
    ],
  },
};
