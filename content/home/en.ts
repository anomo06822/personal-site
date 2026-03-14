import type { HomeContent } from "../../src/lib/types";

export const homeEn: HomeContent = {
  heroEyebrow: "Site Guide / Overview",
  heroTitle: "This home page is not a second resume. It is the guide rail for the whole site.",
  heroIntro:
    "If this is your first time here, this page explains what each tab contains, who it is for, and where to start. The site is structured as a public index: projects, writing, resume context, and contact paths are separated so readers can move directly to what they need.",
  heroTags: ["Bilingual", "Public index", "Static site", "Tab-based reading", "Fast orientation"],
  heroNoticeTitle: "How to use this site",
  heroNoticeBody:
    "Use the tab map on the right to understand the whole structure first. If you already know what you need, jump directly into Projects, Writing, Resume, or Connect.",
  heroMapEyebrow: "Tab Map",
  heroMapIntro: "Five entry points, five different reading intents. Learn the map first, then go deeper.",
  tabsEyebrow: "Tab Guide",
  tabsTitle: "Each tab has a specific job.",
  tabsIntro:
    "This site does not cram everything into one page. It splits the public narrative into five clear entry points.",
  tabs: [
    {
      routeKey: "home",
      eyebrow: "Start Here",
      title: "Overview",
      description:
        "Understand the site structure, reading paths, and the role of each section before going deeper.",
      highlights: [
        "Best first stop for a new visitor.",
        "Helps you decide whether to open projects, writing, resume, or contact next.",
        "Focused on navigation rather than repeating resume details.",
      ],
      hrefLabel: "Stay on overview",
    },
    {
      routeKey: "projects",
      eyebrow: "Build Index",
      title: "Projects",
      description:
        "Browse the public personal projects first, then open their detail pages when you want more context.",
      highlights: [
        "Best when you want to see actual build direction first.",
        "Keeps personal work separate from broader work history.",
        "Each public project can be opened directly from here.",
      ],
      hrefLabel: "Open projects",
    },
    {
      routeKey: "blog",
      eyebrow: "Thinking Layer",
      title: "Writing",
      description:
        "Read how architecture, operability, and delivery tradeoffs are framed and explained.",
      highlights: [
        "Best for understanding thinking, not just outputs.",
        "Articles are organized by topic and language.",
        "Adds the reasoning that project pages do not show on their own.",
      ],
      hrefLabel: "Open writing",
    },
    {
      routeKey: "resume",
      eyebrow: "Public Resume",
      title: "Resume",
      description:
        "See the public-facing background, representative experience, and the larger work arc without exposing every internal detail.",
      highlights: [
        "This is a public version, not an internal dossier.",
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
        "Find the public contact paths and the best reasons to start a conversation from this site.",
      highlights: [
        "LinkedIn, GitHub, and email are grouped here.",
        "Useful for recruiters, collaborators, and technical conversations.",
        "Start public first, then move deeper if there is a fit.",
      ],
      hrefLabel: "Open contact paths",
    },
  ],
  journeysEyebrow: "Reading Paths",
  journeysTitle: "Different goals deserve different paths.",
  journeysIntro:
    "If you do not want to read the whole site front to back, these routes get you to the right context faster.",
  journeys: [
    {
      audience: "First-time visitor",
      title: "Build a quick mental map first",
      summary:
        "Understand how the site is organized, then choose whether to go into projects or writing.",
      routeKeys: ["home", "projects", "blog"],
      note: "Best for a fast yes-or-no read on whether the site is worth deeper time.",
    },
    {
      audience: "Recruiting / Hiring",
      title: "Review public context, then decide whether to reach out",
      summary:
        "Start with the structure, then move into the public resume and contact page.",
      routeKeys: ["home", "resume", "contact"],
      note: "Best for recruiters, hiring managers, or partnership conversations.",
    },
    {
      audience: "Technical reader",
      title: "See projects first, then read the thinking behind them",
      summary:
        "Use projects for the surface area, then writing for the reasoning and tradeoffs.",
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
