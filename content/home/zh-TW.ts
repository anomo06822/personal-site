import type { HomeContent } from "../../src/lib/types";

export const homeZhTW: HomeContent = {
  heroEyebrow: "Recruiter Brief / 30-second read",
  heroTitle:
    "後端架構、平台交付，以及能把團隊帶到交付現場的工程領導。",
  heroIntro:
    "我長期在電商、物流與平台系統工作，關注的不只是一個 service 寫得多乾淨，而是如何把 architecture、delivery rhythm 與 team execution 一起帶到可持續運作的狀態。首頁先給你可快速驗證的證據，再往下走到完整履歷、GitHub 與技術文章。",
  resumeCtaLabel: "看履歷",
  githubCtaLabel: "看 GitHub",
  proofBoardEyebrow: "快速核對訊號",
  proofBoardTitle: "可信度不是一句自介，而是幾個能快速核對的訊號。",
  homeProofBoard: [
    {
      value: "10+",
      label: "年平台與電商經驗",
      detail: "從 QA、自動化測試、backend 到 engineering leadership。",
    },
    {
      value: "20+",
      label: "工程協作範圍",
      detail: "跨 mobile、backend、desktop 與 big data 平台交付。",
    },
    {
      value: "7",
      label: "目前直接帶領台灣團隊",
      detail: "在 First Horizon 持續對齊平台技術方向與交付節奏。",
    },
    {
      value: "3 地區",
      label: "跨區域協作情境",
      detail: "台灣、香港、澳洲團隊共同推進交付。",
    },
  ],
  githubEyebrow: "GitHub Signal",
  githubTitle: "公開程式痕跡，比自介更有說服力。",
  githubIntro:
    "首頁不做 activity heatmap，也不把畫面變成工程 dashboard。這裡只保留最能代表工作風格、技術取向與更新節奏的 GitHub 訊號。",
  githubSignals: [
    {
      title: "AI Productivity Workspace",
      subtitle: "Desktop workflow product foundation",
      status: "Private / Active Build",
      updatedLabel: "Updated 2026.03",
      summary:
        "把桌面工作流、任務管理與 agent 協作收斂到同一個可持續演進的個人生產力工作區。",
      highlights: [
        "Electron shell + React + TypeScript + Tailwind v4，搭配 .NET 10 vertical-slice API。",
        "目前已整理 tasks、projects、agents、roles、dispatch 與 assets APIs。",
        "最近一次本機開發更新是 2026-03-14，仍屬活躍建構中的 private repo。",
      ],
      tags: ["Electron", "React", ".NET 10", "Productivity"],
      note: "repository 尚未公開，首頁只保留產品訊號與技術方向，不導向 404。",
    },
    {
      title: "Phalanx Chronicle",
      subtitle: "Unity SRPG campaign prototype",
      status: "Public Repo",
      updatedLabel: "Updated 2026.03",
      summary:
        "一個已具 playable MVP 流程的 Unity SRPG 戰役原型，重點是系統規則、戰役進程與遊戲流程的完整度。",
      highlights: [
        "已串起 12 章戰役、招募、裝備、升階與軍營整備流程。",
        "戰鬥系統涵蓋 10x10 戰場、技能、AI、HUD 與傷害預測。",
        "最近公開 repo 更新是 2026-03-14，可直接查看 demo、README 與測試說明。",
      ],
      tags: ["Unity", "SRPG", "C#", "Gameplay Systems"],
      href: "https://github.com/anomo06822/phalanx-chronicle",
      hrefLabel: "查看公開 repo",
    },
    {
      title: "GitHub Profile",
      subtitle: "Public code history and shipping cadence",
      status: "Public Footprint",
      updatedLabel: "GitHub / anomo06822",
      summary:
        "如果你想快速確認公開作品、實作痕跡與持續產出的範圍，GitHub profile 是最直接的對外證據入口。",
      highlights: [
        "除了這個站，還有 phalanx-chronicle 與多個 utility / starter 類型 repo。",
        "能看到 backend、tooling、game prototype 與個人 workflow 類型的公開技術興趣。",
        "適合快速判斷我不是只寫履歷，而是真的持續在做東西。",
      ],
      tags: ["Public Repos", "Code History", "Shipping Cadence"],
      href: "https://github.com/anomo06822",
      hrefLabel: "前往 GitHub profile",
    },
  ],
  secondarySignalsTitle: "Secondary signal",
  secondarySignals: [],
  teamEyebrow: "Leadership / Trust",
  teamTitle: "讓人相信你能帶團隊，不只靠職稱。",
  teamIntro:
    "這段不再重複履歷條列，而是把 team context、cross-region collaboration 與 delivery ownership 變成可視覺化理解的證據。",
  teamGallery: [
    {
      title: "0→1 平台不是一個人做完的",
      contextLabel: "Taiwan team / First Horizon",
      caption:
        "目前帶領台灣 7 人工程團隊，從架構、CI/CD 到 observability 一起落地。",
      variant: "primary",
    },
    {
      title: "台灣、香港、澳洲同時對齊",
      contextLabel: "Cross-region delivery",
      caption:
        "和香港、澳洲團隊協作，讓產品、工程與營運共享交付節奏。",
      variant: "secondary",
    },
    {
      title: "曾處理更大規模的工程協作",
      contextLabel: "Newegg scale context",
      caption:
        "曾帶領 20+ 工程師支援 mobile、B2B desktop、backend 與 big data 平台。",
      variant: "secondary",
    },
  ],
  leadershipProofTitle: "帶團隊的證據",
  leadershipProofs: [
    {
      value: "7",
      label: "目前帶領台灣團隊",
      detail: "First Horizon 的平台技術方向、交付節奏與落地品質。",
    },
    {
      value: "20+",
      label: "過去帶領工程協作規模",
      detail: "Newegg 場景下涵蓋 mobile、backend、desktop 與 data platform。",
    },
    {
      value: "TW / HK / AU",
      label: "跨區域合作經驗",
      detail: "不是只寫程式，而是協調多地利害關係人一起交付。",
    },
  ],
  nextEyebrow: "Next Step",
  nextTitle: "不同角色，下一步看的頁面不同。",
  nextIntro:
    "首頁只負責建立定位與信任。要往下看完整背景、技術思考或公開聯絡入口，各有明確閱讀路徑。",
  pathways: [
    {
      routeKey: "resume",
      eyebrow: "Full Background",
      title: "履歷",
      description:
        "完整看經歷、代表專案、平台交付與帶團隊的主線脈絡。",
      hrefLabel: "看完整履歷",
    },
    {
      routeKey: "blog",
      eyebrow: "Thinking Depth",
      title: "技術文章",
      description:
        "看我如何描述 architecture、operability 與 delivery tradeoffs。",
      hrefLabel: "看技術文章",
    },
    {
      routeKey: "contact",
      eyebrow: "Public Paths",
      title: "聯繫",
      description:
        "從 LinkedIn 與 GitHub 的公開入口開始，適合 recruiter 或 hiring manager 發起對話。",
      hrefLabel: "看公開入口",
    },
  ],
};
