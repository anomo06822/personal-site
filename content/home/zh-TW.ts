import type { HomeContent } from "../../src/lib/types";

export const homeZhTW: HomeContent = {
  heroEyebrow: "Site Guide / Overview",
  heroTitle: "這個首頁不是第二份履歷，而是整個網站的導覽台。",
  heroIntro:
    "如果你第一次來到這個站，這裡先幫你理解每個 tab 放什麼、適合誰看，以及該從哪個入口開始。整站是公開版索引：專案、文章、履歷與聯繫方式分開整理，讓你不用在長頁面裡來回找資訊。",
  heroTags: ["雙語站點", "公開版索引", "靜態部署", "分頁閱讀", "快速導覽"],
  heroNoticeTitle: "使用方式",
  heroNoticeBody:
    "先用右側 tab map 建立全站概念；如果你已經知道目的，就直接進入專案、技術文章、履歷或聯繫頁面。",
  heroMapEyebrow: "Tab Map",
  heroMapIntro: "五個入口，五種閱讀目的。先看地圖，再進分頁。",
  tabsEyebrow: "Tab Guide",
  tabsTitle: "每個 tab 都有明確分工。",
  tabsIntro:
    "這個站不是把所有資訊塞進同一頁，而是把用途拆成五個可快速進入的入口。",
  tabs: [
    {
      routeKey: "home",
      eyebrow: "Start Here",
      title: "概覽",
      description:
        "先理解網站結構、閱讀路徑與各分頁的角色，避免一進站就掉進履歷細節。",
      highlights: [
        "第一次來訪時最適合先看這頁。",
        "幫你判斷接下來該去專案、文章、履歷或聯繫。",
        "重點是網站導覽，不重複履歷內容。",
      ],
      hrefLabel: "留在概覽頁",
    },
    {
      routeKey: "projects",
      eyebrow: "Build Index",
      title: "專案",
      description:
        "集中查看公開個人專案，快速掌握題目、方向與可延伸閱讀的 detail 頁。",
      highlights: [
        "適合先看我實際做了什麼。",
        "把個人作品與工作經歷刻意拆開。",
        "可以直接進每個專案的 detail 頁。",
      ],
      hrefLabel: "看專案",
    },
    {
      routeKey: "blog",
      eyebrow: "Thinking Layer",
      title: "技術文章",
      description:
        "查看我怎麼整理 architecture、operability 與 delivery 的實作取捨。",
      highlights: [
        "適合看思考方式而不是只看成果。",
        "文章依主題與語系整理。",
        "補足專案頁看不到的推理過程。",
      ],
      hrefLabel: "看文章",
    },
    {
      routeKey: "resume",
      eyebrow: "Public Resume",
      title: "履歷",
      description:
        "看公開版背景、代表經歷與整理過的工作脈絡，但不把所有內部細節都攤開。",
      highlights: [
        "內容是公開版，不等於完整內部背景。",
        "適合需要快速掌握經驗脈絡的人。",
        "和專案頁分開，避免把 ownership 混在一起。",
      ],
      hrefLabel: "看履歷",
    },
    {
      routeKey: "contact",
      eyebrow: "Public Paths",
      title: "聯繫",
      description:
        "集中公開聯絡方式與適合交流的主題，方便用對的入口開始對話。",
      highlights: [
        "可從 LinkedIn、GitHub 或 email 開始。",
        "適合 recruiter、合作方或技術交流。",
        "先從公開入口開始，方向對再往下談。",
      ],
      hrefLabel: "看聯繫",
    },
  ],
  journeysEyebrow: "Reading Paths",
  journeysTitle: "不同目的，建議不同走法。",
  journeysIntro:
    "如果你不是要把整站每頁都看完，下面是更有效率的閱讀順序。",
  journeys: [
    {
      audience: "第一次來訪",
      title: "先建立網站地圖",
      summary:
        "先知道這個站怎麼分工，再決定要往哪個內容深讀。",
      routeKeys: ["home", "projects", "blog"],
      note: "適合想快速判斷這個站值不值得繼續看的人。",
    },
    {
      audience: "招募 / Hiring",
      title: "先看公開背景，再決定是否聯繫",
      summary:
        "先理解網站，再進公開履歷與聯繫入口，比直接跳進單一頁面更快。",
      routeKeys: ["home", "resume", "contact"],
      note: "適合 recruiter、hiring manager 或合作窗口。",
    },
    {
      audience: "技術讀者",
      title: "先看作品，再補文章脈絡",
      summary:
        "從專案理解題目，再用文章看方法、約束與取捨。",
      routeKeys: ["projects", "blog", "contact"],
      note: "適合對實作、設計取捨或技術寫作有興趣的人。",
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
        "只保留適合公開、可長期維護的專案、文章、履歷摘要與聯繫入口。",
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
