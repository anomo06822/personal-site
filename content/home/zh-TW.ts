import type { HomeContent } from "../../src/lib/types";

export const homeZhTW: HomeContent = {
  heroEyebrow: "Entry / Decision Home",
  heroTitle: "先選你的閱讀路徑，再進入最值得看的那一頁。",
  heroIntro:
    "這裡不是第二版個人經歷頁，而是幫你更快做第一個判斷。招募方先看公開個人經歷與聯繫，技術讀者先看專案與文章。",
  heroTags: ["專案", "技術文章", "個人經歷", "聯繫"],
  tabsEyebrow: "Evidence Preview",
  tabsTitle: "先看幾個真實訊號，再決定往哪裡深讀。",
  tabsIntro:
    "首頁只預覽各分頁最值得先看的內容，不把完整資訊重寫一遍。",
  tabs: [
    {
      routeKey: "projects",
      eyebrow: "Build Evidence",
      title: "專案",
      description:
        "先看我實際做了哪些公開作品，再決定要不要進 detail 頁。",
      highlights: [
        "預覽最新公開個人專案。",
        "保留完整 detail 頁做深入閱讀。",
      ],
      hrefLabel: "前往專案",
    },
    {
      routeKey: "blog",
      eyebrow: "Reasoning Layer",
      title: "技術文章",
      description:
        "補足專案頁沒有展開的架構思考、operability 與 delivery 取捨。",
      highlights: [
        "適合想看方法與判斷依據的人。",
        "文章清單自動反映最新公開內容。",
      ],
      hrefLabel: "前往文章",
    },
    {
      routeKey: "resume",
      eyebrow: "Career Signal",
      title: "個人經歷",
      description:
        "用公開個人經歷快速掌握角色定位、經驗主線與代表成果。",
      highlights: [
        "適合第一輪判斷角色匹配度。",
        "與專案頁分開，避免 ownership 混在一起。",
      ],
      hrefLabel: "前往個人經歷",
    },
    {
      routeKey: "contact",
      eyebrow: "Public Paths",
      title: "聯繫",
      description:
        "如果方向已經明確，直接走公開聯絡入口開始對話。",
      highlights: [
        "保留 LinkedIn、GitHub 與 email 三個公開入口。",
        "適合招募、合作或技術交流。",
      ],
      hrefLabel: "前往聯繫",
    },
  ],
  journeysEyebrow: "Audience Paths",
  journeysTitle: "先選最接近你目的的入口。",
  journeysIntro:
    "你不需要先讀完整站。先走對第一步，再決定要不要深入。",
  journeys: [
    {
      id: "hiring",
      audience: "招募 / Hiring",
      title: "先看公開背景，再決定是否聯繫",
      summary:
        "如果你要快速判斷角色匹配度，先看個人經歷；方向合適再走聯繫頁。",
      routeKeys: ["resume", "contact"],
      note: "適合 recruiter、hiring manager、合作窗口。",
    },
    {
      id: "technical-reader",
      audience: "技術讀者",
      title: "先看作品，再補思考脈絡",
      summary:
        "先從專案看實際產出，再用文章理解架構、operability 與取捨。",
      routeKeys: ["projects", "blog"],
      note: "適合工程師、技術合作者與深度讀者。",
    },
  ],
  guideEyebrow: "Public Scope",
  guideTitle: "這個網站刻意維持公開版邊界。",
  guideIntro:
    "它的角色是清楚、好讀、可分享，不是把所有背景、私密資訊或內部資料全部攤開。",
  guideItems: [
    {
      eyebrow: "What is here",
      title: "公開且可持續維護的內容",
      description:
        "只保留適合公開、可長期維護的專案、文章、個人經歷摘要與聯繫入口。",
    },
    {
      eyebrow: "What is not",
      title: "私人與內部內容不放在站上",
      description:
        "私人資料、未公開 repository、內部文件與無法公開驗證的細節不會出現在這裡。",
    },
    {
      eyebrow: "How to use",
      title: "把它當成索引，不是終點",
      description:
        "找到感興趣的 tab 後再深入；如果方向合適，再從聯繫頁面開啟對話。",
    },
  ],
};
