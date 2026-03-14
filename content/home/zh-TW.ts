import type { HomeContent } from "../../src/lib/types";

export const homeZhTW: HomeContent = {
  heroEyebrow: "Site Guide / Overview",
  heroTitle: "先選入口，再深入閱讀。",
  heroIntro:
    "首頁只做導覽。想看作品進專案，想看技術思考進文章，想看背景進履歷，想聯繫就直接走聯繫頁。",
  heroTags: ["專案", "技術文章", "履歷", "聯繫"],
  heroNoticeTitle: "使用方式",
  heroNoticeBody:
    "如果你已經知道目的，不用停留在首頁，直接進入對應分頁即可。",
  heroMapEyebrow: "Tab Map",
  heroMapIntro: "五個入口，各自處理不同閱讀目的。",
  tabsEyebrow: "Tab Guide",
  tabsTitle: "每個入口只做一件事。",
  tabsIntro:
    "不用從頭讀到尾，直接從最接近你目的的入口開始。",
  tabs: [
    {
      routeKey: "home",
      eyebrow: "Start Here",
      title: "概覽",
      description:
        "快速理解網站結構，決定下一步該往哪裡看。",
      highlights: [
        "適合第一次進站。",
        "重點是導覽，不重複履歷內容。",
      ],
      hrefLabel: "留在概覽頁",
    },
    {
      routeKey: "projects",
      eyebrow: "Build Index",
      title: "專案",
      description:
        "集中查看公開個人專案與各自的 detail 頁入口。",
      highlights: [
        "適合先看我實際做了什麼。",
        "個人作品和工作經歷分開整理。",
      ],
      hrefLabel: "看專案",
    },
    {
      routeKey: "blog",
      eyebrow: "Thinking Layer",
      title: "技術文章",
      description:
        "看 architecture、operability 與 delivery 的思考與取捨。",
      highlights: [
        "適合看方法，不只看結果。",
        "補足專案頁看不到的推理過程。",
      ],
      hrefLabel: "看文章",
    },
    {
      routeKey: "resume",
      eyebrow: "Public Resume",
      title: "履歷",
      description:
        "看公開版背景、代表經歷與整理過的工作脈絡。",
      highlights: [
        "適合快速掌握經驗脈絡。",
        "和專案頁分開，避免 ownership 混在一起。",
      ],
      hrefLabel: "看履歷",
    },
    {
      routeKey: "contact",
      eyebrow: "Public Paths",
      title: "聯繫",
      description:
        "集中公開聯絡方式，方便直接走對的入口開始對話。",
      highlights: [
        "可從 LinkedIn、GitHub 或 email 開始。",
        "適合招募、合作或技術交流。",
      ],
      hrefLabel: "看聯繫",
    },
  ],
  journeysEyebrow: "Reading Paths",
  journeysTitle: "常見走法。",
  journeysIntro:
    "如果你不是要整站都看，下面是更直接的路徑。",
  journeys: [
    {
      audience: "第一次來訪",
      title: "先建立網站地圖",
      summary:
        "先知道網站怎麼分工，再決定往哪個內容深讀。",
      routeKeys: ["home", "projects", "blog"],
      note: "適合想先快速掃過全站的人。",
    },
    {
      audience: "招募 / Hiring",
      title: "先看公開背景，再決定是否聯繫",
      summary:
        "直接進公開履歷，再看聯繫入口。",
      routeKeys: ["home", "resume", "contact"],
      note: "適合 recruiter、hiring manager 或合作窗口。",
    },
    {
      audience: "技術讀者",
      title: "先看作品，再補文章脈絡",
      summary:
        "從專案理解題目，再用文章看方法與取捨。",
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
