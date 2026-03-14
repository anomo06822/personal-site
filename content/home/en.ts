import type { HomeContent } from "../../src/lib/types";

export const homeEn: HomeContent = {
  heroEyebrow: "Site Guide / Overview",
  heroTitle: "Choose an entry point, then go deeper.",
  heroIntro:
    "The home page is only for navigation. Use Projects for builds, Writing for technical thinking, Resume for background, and Connect when you want to reach out.",
  heroTags: ["Projects", "Writing", "Resume", "Connect"],
  heroNoticeTitle: "How to use this site",
  heroNoticeBody:
    "If you already know your goal, skip the overview and go straight to the matching section.",
  heroMapEyebrow: "Tab Map",
  heroMapIntro: "Five entry points, each with a different reading job.",
  tabsEyebrow: "Tab Guide",
  tabsTitle: "Each entry point does one job.",
  tabsIntro:
    "Do not read the whole site front to back unless you need to. Start with the closest match.",
  tabs: [
    {
      routeKey: "home",
      eyebrow: "Start Here",
      title: "Overview",
      description:
        "Get the site structure quickly, then choose where to go next.",
      highlights: [
        "Best for a first-time visitor.",
        "Focused on navigation, not repeated resume detail.",
      ],
      hrefLabel: "Stay on overview",
    },
    {
      routeKey: "projects",
      eyebrow: "Build Index",
      title: "Projects",
      description:
        "Browse public personal projects and open detail pages when needed.",
      highlights: [
        "Best when you want to see actual builds first.",
        "Personal work stays separate from broader work history.",
      ],
      hrefLabel: "Open projects",
    },
    {
      routeKey: "blog",
      eyebrow: "Thinking Layer",
      title: "Writing",
      description:
        "Read how architecture, operability, and delivery tradeoffs are explained.",
      highlights: [
        "Best for understanding thinking, not just outputs.",
        "Adds reasoning that project pages do not show on their own.",
      ],
      hrefLabel: "Open writing",
    },
    {
      routeKey: "resume",
      eyebrow: "Public Resume",
      title: "Resume",
      description:
        "See the public-facing background, representative experience, and work arc.",
      highlights: [
        "Useful when you need a compact experience overview.",
        "Separated from Projects so ownership stays easier to read.",
      ],
      hrefLabel: "Open resume",
    },
    {
      routeKey: "contact",
      eyebrow: "Public Paths",
      title: "Connect",
      description:
        "Find the public contact paths and use the right one directly.",
      highlights: [
        "LinkedIn, GitHub, and email are grouped here.",
        "Useful for recruiters, collaborators, and technical conversations.",
      ],
      hrefLabel: "Open contact paths",
    },
  ],
  journeysEyebrow: "Reading Paths",
  journeysTitle: "Common paths.",
  journeysIntro:
    "If you do not want the full tour, these paths get to the right context faster.",
  journeys: [
    {
      audience: "First-time visitor",
      title: "Build a quick mental map first",
      summary:
        "Understand how the site is organized, then choose where to go deeper.",
      routeKeys: ["home", "projects", "blog"],
      note: "Best for a quick scan of the whole site.",
    },
    {
      audience: "Recruiting / Hiring",
      title: "Review public context, then decide whether to reach out",
      summary:
        "Go directly into the public resume, then use the contact page if needed.",
      routeKeys: ["home", "resume", "contact"],
      note: "Best for recruiters, hiring managers, or partnership conversations.",
    },
    {
      audience: "Technical reader",
      title: "See projects first, then read the thinking behind them",
      summary:
        "Use projects for the surface area, then writing for the reasoning.",
      routeKeys: ["projects", "blog", "contact"],
      note: "Best for readers who care about implementation choices and technical framing.",
    },
  ],
  guideEyebrow: "Public Scope",
  guideTitle: "This site intentionally keeps a public-facing boundary.",
  guideIntro:
    "Its job is to stay clear, readable, and shareable, not to expose every background detail, private asset, or internal artifact.",
  guideItems: [
    {
      eyebrow: "What is here",
      title: "Public content that can be maintained over time",
      description:
        "Only projects, writing, public resume context, and contact paths that make sense to keep public are included here.",
    },
    {
      eyebrow: "What is not",
      title: "Private and internal material stays off the site",
      description:
        "Private data, unpublished repositories, internal documents, and details that cannot be shared responsibly are left out.",
    },
    {
      eyebrow: "How to use",
      title: "Treat this as an index, not the final destination",
      description:
        "Open the tab that matches your goal, go deeper there, and use the contact page when a real conversation makes sense.",
    },
  ],
};
