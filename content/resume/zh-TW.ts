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
          "以 Electron、React 與 .NET 10 打造的 desktop productivity workspace，不只整合 notes、boards、task management、agent dispatch 與 world simulation，也把 tech-news intake、content control plane 與 personal-site / LinkedIn / X distribution 收斂到同一個可持續演進的產品骨架。",
        bullets: [
          "同一個桌面殼層內已接起 note library、delivery / focus / portfolio boards、task triage 與 context rail，讓日常執行不必在多個工具間切換。",
          "Content Studio 現在把 codex 驅動的 tech-news signal intake、topic shortlist、draft bundle、channel drafts 與 publish / performance feedback 收成 article-centric control plane。",
          "Agent Command Center 把 role binding、dispatch run、timeline、artifacts 與 intervention controls 收成可操作的 agent execution surface，而不是只停在背景自動化。",
          "Agent World 用 pixel-art 辦公區視圖顯示 district、staff、focus / blocked / idle 狀態與 rerun 驗證；底層仍維持 .NET 10 vertical-slice API、PostgreSQL 與本機 MCP 整合。",
        ],
        tags: [
          "Electron",
          "React",
          "TypeScript",
          ".NET 10",
          "Productivity",
          "Agent Ops",
          "Content Ops",
        ],
        detailIntro: [
          "這個專案不是單點 AI 工具，而是把 capture → decide → execute → review 的日常流程收進同一個 desktop workspace，讓 notes、boards、tasks、content pipeline 與 agent execution 可以互相對上。",
          "產品表面目前已經長出 Workspace、Boards、Task Management、Agent Command Center、Content Studio 與 Agent World 幾個核心畫面，重點不是堆功能，而是把 daily loop、dispatch control、editorial workflow 與 execution visibility 放在同一個操作表面。",
          "最近比較有辨識度的變化，是把 tech-news workflow 收斂成一條可治理的 content lane：Codex job 先做 signal intake，AIPW 內部再用 article-centric control plane 管 topic、draft、publish 與 feedback，最後按 personal-site / LinkedIn / X 的 channel semantics 做分發。",
          "這讓 personal-site growth 不再只是外部寫作流程，而是能和 note-first research、review gate、channel drafts、publish jobs 與 performance snapshots 接到同一個產品骨架裡。",
          "技術上以 Electron 承接桌面殼層，React + TypeScript + Tailwind v4 建構前端，.NET 10 vertical-slice API + EF Core PostgreSQL 提供資料與流程骨架，同時保留 local MCP 與 desktop-first dev workflow 作為後續 AI-assisted workflow 的接點。",
        ],
        detailImage: {
          kind: "gallery",
          alt: "AI Productivity Workspace demo gallery",
          images: [
            {
              src: "/images/projects/ai-productivity-workspace/01-workspace.png",
              alt: "AI Productivity Workspace workspace surface",
              label: "Workspace",
              caption:
                "主工作區把 note library、template library、quick edit 與 context rail 放在同一個 daily shell，並用 onboarding playbook 串起 capture → decide → execute → review。",
            },
            {
              src: "/images/projects/ai-productivity-workspace/02-boards.png",
              alt: "AI Productivity Workspace boards surface",
              label: "Boards",
              caption:
                "Boards 把 delivery、focus 與 portfolio 視角集中到同一個 board center，讓 backlog、in progress、done、blocked 與 hold lane 都能接到 active workspace。",
            },
            {
              src: "/images/projects/ai-productivity-workspace/03-task-management.png",
              alt: "AI Productivity Workspace task management surface",
              label: "Task Management",
              caption:
                "集中式 task management 提供 triage strip、slice view、focus queue 與 project filter，讓 daily execution 和 blockers 可以在同一個列表面上被整理。",
            },
            {
              src: "/images/projects/ai-productivity-workspace/04-agent-command.png",
              alt: "AI Productivity Workspace agent command center",
              label: "Agent Command",
              caption:
                "Agent Command Center 用 health、gate、attention、timeline 與 artifacts 把 dispatch run 變成可以觀察、介入與補救的 operator surface。",
            },
            {
              src: "/images/projects/ai-productivity-workspace/05-agent-world.png",
              alt: "AI Productivity Workspace agent world",
              label: "Agent World",
              caption:
                "Agent World 以 pixel-art district radar 呈現 staff 分布、focus / blocked / idle 狀態與 live district feed，讓 agent movement 不再只是抽象事件紀錄。",
            },
            {
              src: "/images/projects/ai-productivity-workspace/07-tech-news-workflow-control-plane.png",
              alt: "AI Productivity Workspace tech-news workflow control plane blueprint",
              label: "Workflow Blueprint",
              caption:
                "暗色 workflow blueprint 將目前的 tech-news pipeline 畫成一張控制面圖：Codex job 先做 signal intake，AIPW 內部收成 Content Control Plane，再按 personal-site / LinkedIn / X 的 channel semantics 做分發，最後把 publish results 與 audience response 回灌下一輪。",
            },
          ],
        },
        detailSections: [
          {
            id: "workflow",
            navLabel: "工作流",
            title: "Tech-news workflow",
            eyebrow: "CONTENT CONTROL PLANE",
            intro:
              "AIPW 最近一個比較值得公開展示的能力，不是又多了一個 AI 寫作頁，而是把研究、編輯、分發與回收收成一條可以治理的內容工作流。",
            paragraphs: [
              "這條 lane 的起點不是 editor，而是 codex job 對 tech-news signal 的 intake。先把 feeds、URL、raw notes 與外部訊號整理成 source materials、topic candidates 與 evidence block，避免後面的 draft 直接建立在鬆散連結上。",
              "內容進入 AIPW 後，會落在 article-centric content control plane 裡：source materials、topic candidates、content articles、prompt bundles、channel drafts、publish jobs 與 performance snapshots 共用同一個操作上下文，而不是分散在不同工具之間。",
              "最後的 distribution 也不是把同一段 copy 硬縮到所有平台，而是按 channel semantics 分流。personal-site 保持 full article + hero image，LinkedIn 與 X 則預設成 summary-led post / thread，再回指 canonical article。",
            ],
            cards: [
              {
                eyebrow: "01 Intake",
                title: "Codex-driven signal intake",
                body:
                  "Tech-news 先經過 codex job 的收集、正規化與 bundling，輸出可追蹤的素材、主題候選與 evidence，而不是直接跳進草稿器。",
              },
              {
                eyebrow: "02 Control Plane",
                title: "Article-centric editorial system",
                body:
                  "AIPW 內部用同一套 article context 管 source、topic、draft、bundle version、review gate 與 publish job，讓內容工作流具備 traceability。",
              },
              {
                eyebrow: "03 Distribution",
                title: "Channel semantics over copy-paste",
                body:
                  "site、LinkedIn、X 各自有不同輸出語義，channel drafts 與 publish payload 會跟 canonical article 綁在同一個 lifecycle 下。",
              },
              {
                eyebrow: "04 Feedback",
                title: "Publish and learning loop",
                body:
                  "publish result、audience response 與 performance snapshot 會回到下一輪 topic judgment 和 editorial tuning，而不是發完就斷線。",
              },
            ],
            bullets: [
              "personal-site：full article + hero image，作為 canonical publication surface。",
              "LinkedIn：summary post + canonical link，偏 professional viewpoint 與擴散。",
              "X：thread 或短摘要 + link，偏快節奏分發與 signal amplification。",
              "回收層：publish status、distribution result 與 performance signal 再回灌 topic scoring 與 draft tuning。",
            ],
            spotlight: {
              src: "/images/projects/ai-productivity-workspace/07-tech-news-workflow-control-plane.png",
              alt: "AI Productivity Workspace tech-news workflow control plane blueprint",
              label: "Workflow Blueprint",
              caption:
                "Claude Code 風格的 dark blueprint，用來說明目前 AIPW 內容工作流的真實 operating model：Codex intake -> Content Control Plane -> Distribution -> feedback loop。",
            },
            note:
              "這一段刻意混合真實產品畫面與一張 workflow blueprint。前者證明產品表面已經落地，後者則用來把內容控制面的 operating model 講清楚。",
          },
        ],
        detailVideo: {
          src: "/videos/projects/ai-productivity-workspace/world-rerun-clean-baseline.mp4",
          posterSrc: "/images/projects/ai-productivity-workspace/06-world-movement-poster.png",
          alt: "AI Productivity Workspace world movement rerun video",
          label: "World Movement",
          caption:
            "16 秒 rerun demo 從 true lounge baseline 重新派送 PRD36、ARC36、ENG36，驗證 district 移動、live status 與 world feed 是否和 dispatch 結果一致。",
        },
        previewNote:
          "目前專案頁混合了最新整理的 AIPW media pack 與一張 workflow blueprint：`01` 到 `05` 為 2026-03-17 重新輸出的 Claude Code 配色正式截圖，`07` 為 2026-03-19 製作的 tech-news workflow control-plane 視覺；另附一段 16 秒的 world movement rerun。",
        feedback: {
          type: "disabled",
          message:
            "這個 repository 目前尚未公開；等公開版整理完成後，才會開放 GitHub issue feedback。",
        },
        imageAlt: "AI Productivity Workspace demo gallery",
        note:
          "Repository 目前尚未公開；這一頁現在同時展示實際產品畫面、workflow blueprint 與 world movement demo，等公開版整理完成後再補上 GitHub 連結。",
      },
      {
        slug: "membership-platform-flutter",
        title: "membership-platform-flutter",
        subtitle: "Private GitHub repository",
        summary:
          "以 Gourmet 會員體驗為主軸的 0→1 平台 monorepo，將 Flutter member app、NestJS modular monolith、OpenAPI contract 與 cross-platform design tokens 放在同一個交付骨架裡。",
        bullets: [
          "member app 已經落地 OTP login / verify、Gourmet 首頁、動態 QR 會員卡、點數錢包與會員資料維護等核心會員流程。",
          "backend baseline 已具備 auth、member profile、member card token、wallet、coupon 與 POS points-earn 等模組切片，作為後續會員平台演進基線。",
          "把 Flutter、NestJS、OpenAPI 與 design tokens 放在同一個 repo，讓 mobile UX、API contract 與交付切片可以一起往前推，而不是各自漂移。",
        ],
        tags: [
          "Flutter",
          "Dart",
          "NestJS",
          "TypeScript",
          "Monorepo",
          "Membership",
        ],
        detailIntro: [
          "這個專案從一開始就不是單純做幾個會員畫面，而是把會員體驗、服務契約與交付結構一起建立成可演進的平台骨架。",
          "目前已經落地的主線聚焦在最需要先跑通的會員 loop：OTP 登入、Gourmet 首頁、動態 QR 會員卡、點數錢包與會員資料維護，讓產品表面先具備可用性。",
          "在 UI 之外，repo 也已經把 NestJS modular monolith、OpenAPI baseline、design tokens、ADR 與 runbook 放進同一個 monorepo，作為後續 coupon、activity、notification 與整合切片的穩定基礎。",
        ],
        detailImage: {
          kind: "gallery",
          alt: "Membership Platform Flutter demo gallery",
          images: [
            {
              src: "/images/projects/membership-platform-flutter/01-home.png",
              alt: "Membership Platform Flutter home screen",
              label: "Home",
              caption:
                "Gourmet 首頁把 greeting、點數預覽、會員卡入口與 quick actions 收在同一個 member-facing landing screen 上，先建立日常會員操作入口。",
            },
            {
              src: "/images/projects/membership-platform-flutter/02-member-card.png",
              alt: "Membership Platform Flutter member card screen",
              label: "Member Card",
              caption:
                "會員卡頁不是靜態 QR mock，而是包含品牌化呈現、倒數與 refresh 行為的可操作 token surface。",
            },
            {
              src: "/images/projects/membership-platform-flutter/03-wallet.png",
              alt: "Membership Platform Flutter wallet screen",
              label: "Wallet",
              caption:
                "錢包頁把 points summary、pending / expiry context 與交易明細放在同一條流程中，避免會員只能看到片段資訊。",
            },
            {
              src: "/images/projects/membership-platform-flutter/04-profile.png",
              alt: "Membership Platform Flutter profile screen",
              label: "Profile",
              caption:
                "會員資料頁把 identity、聯絡方式與維護入口留在同一個品牌殼層內，而不是退回通用設定頁。",
            },
          ],
        },
        detailSections: [
          {
            id: "member-loop",
            navLabel: "會員體驗",
            title: "核心會員流程",
            eyebrow: "GOURMET MEMBER APP",
            intro:
              "第一條可展示的交付切片聚焦在真實會員產品最早要跑通的 loop，而不是只做 marketing shell。",
            paragraphs: [
              "目前 member app 已經把 OTP authentication、首頁入口、會員卡 token、wallet summary 與 profile 維護串進同一個 shell 裡，作為後續 retail / CRM integration 的起點。",
              "這個 repo 的重點不只在 app 畫面。Flutter app、backend modules、OpenAPI contract 與 design tokens 同時放在 monorepo 內，讓後續 coupon、activity 與 notification 的擴充能沿著同一個 operating model 前進。",
            ],
            cards: [
              {
                eyebrow: "01 Auth",
                title: "OTP-first member entry",
                body:
                  "以手機 OTP 作為第一條會員登入切片，降低 onboarding friction，同時保留真實 session 邊界。",
              },
              {
                eyebrow: "02 Card",
                title: "Operational membership token",
                body:
                  "會員卡被當成真正可用的 token surface 來設計，包含刷新與失效行為，而不是只放靜態 QR。",
              },
              {
                eyebrow: "03 Wallet",
                title: "Points visibility in one shell",
                body:
                  "balance、pending value 與交易明細放在同一頁裡，讓會員能直接理解點數狀態如何變化。",
              },
              {
                eyebrow: "04 Platform",
                title: "Monorepo-backed delivery baseline",
                body:
                  "Flutter、NestJS、OpenAPI 與 design tokens 共用同一個 repo，降低產品切片往前推時的契約漂移。",
              },
            ],
            bullets: [
              "Flutter member app 採 feature-first layered architecture。",
              "NestJS backend 以 modular monolith 組織 auth、member、wallet、coupon 與 integration slices。",
              "OpenAPI 與 design tokens 直接 version 在 repo 內，方便 app 與 backend 對齊。",
              "目前對外展示的 media pack 直接使用 Flutter golden captures，而不是另外拼裝的 marketing mockups。",
            ],
            note:
              "Repository 目前仍是 private，但專案頁使用的都是實際 app 測試輸出的畫面，因此能真實反映目前已經落地的會員流程。",
          },
        ],
        previewNote:
          "目前專案頁採用 4 張來自真實 Flutter app 的 golden captures：Home、Member Card、Wallet、Profile。",
        feedback: {
          type: "disabled",
          message:
            "這個 repository 目前尚未公開；等 release path 與公開整理完成後，才會開放 GitHub issue feedback。",
        },
        imageAlt: "Membership Platform Flutter member app gallery",
        note:
          "Repository 目前仍未公開；專案頁先以真實 app 截圖展示產品表面，之後再補上公開 repo 連結。",
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
          "聚焦 XML、JSON 與 Markdown 的多格式資料工具，現在已整理出 formatter、compare、convert、visualize 四個主要工作區，並支援 Electron 桌面應用與可選 .NET 10 backend。",
        bullets: [
          "以 Formatter、Compare、Convert、Visualize 四個專注工作區，收斂 XML、JSON、Markdown 的格式化、差異比較、轉換與視覺化流程。",
          "新版 DataToolkit 品牌已補上專屬 mark，並同步更新 browser tab favicon 與 sidebar logo，同時保留 Gemini assistant 與 AI diff summary 能力。",
          "支援 Electron desktop packaging、menu bar entry、global wakeup shortcut、GitHub Releases 更新檢查，以及可選的 .NET 10 backend proxy 來隔離本機 API key。",
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
          "這個專案原本是資料格式處理工具，現在已擴充成有 Formatter、Compare、Convert、Visualize 四個主要工作區的 DataToolkit，讓 XML、JSON、Markdown 的整理、比對、轉換與視覺化能放進同一個操作表面。",
          "這一版也補上新的 DataToolkit 品牌 mark，並把品牌延伸到 browser tab favicon 與 app sidebar logo；同時保留 Gemini assistant 與 AI diff summary 在同一套 warm desktop-style 介面中運作。",
          "在交付形式上，repo 仍支援 Electron 桌面封裝、menu bar 狀態入口、全域喚醒捷徑、GitHub Releases 更新檢查，以及需要本機隔離 API key 時可切換的 .NET 10 backend proxy。",
        ],
        detailImage: {
          kind: "gallery",
          alt: "DataToolkit demo gallery",
          logoSrc: "/images/projects/xml-toolkit/datatoolkit-mark.svg",
          logoAlt: "DataToolkit brand mark",
          images: [
            {
              src: "/images/projects/xml-toolkit/datatoolkit-demo-formatter.png",
              alt: "DataToolkit formatter workspace demo",
              label: "Formatter",
              caption:
                "主要編輯工作區，處理 XML、JSON、Markdown 的格式化、壓縮與排序。",
            },
            {
              src: "/images/projects/xml-toolkit/datatoolkit-demo-compare.png",
              alt: "DataToolkit compare workspace demo",
              label: "Compare",
              caption:
                "左右對照的 diff 工作區，並可搭配 AI summary 快速掌握資料變化。",
            },
            {
              src: "/images/projects/xml-toolkit/datatoolkit-demo-convert.png",
              alt: "DataToolkit convert workspace demo",
              label: "Convert",
              caption:
                "在同一個工具殼層內完成 XML、JSON、Markdown 之間的格式轉換。",
            },
            {
              src: "/images/projects/xml-toolkit/datatoolkit-demo-visualize.png",
              alt: "DataToolkit visualize workspace demo",
              label: "Visualize",
              caption:
                "用樹狀結構快速檢視巢狀資料，縮短理解資料形狀的時間。",
            },
          ],
        },
        previewNote:
          "目前預覽圖直接使用 repo docs 內的四張 demo：Formatter、Compare、Convert、Visualize。",
        feedback: {
          type: "github-issue",
          repoUrl: "https://github.com/anomo06822/xml-toolkit",
          emailOptional: true,
        },
        href: "https://github.com/anomo06822/xml-toolkit",
        hrefLabel: "前往 GitHub",
        imageAlt: "DataToolkit project demo gallery",
        note: "公開 repository 名稱仍是 xml-toolkit，但產品介面與最新 demo 圖已改用 DataToolkit 品牌。",
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
