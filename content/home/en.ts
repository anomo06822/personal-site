import type { HomeContent } from "../../src/lib/types";

export const homeEn: HomeContent = {
  heroEyebrow: "Entry / Decision Home",
  heroTitle: "Choose the reading path that gets you to the useful page first.",
  heroIntro:
    "This is not a duplicate personal experience page. It is the fastest way to decide where to start: hiring conversations go to Personal Experience and Connect, technical readers go to Projects and Writing.",
  heroTags: ["Projects", "Writing", "Personal Experience", "Connect"],
  tabsEyebrow: "Evidence Preview",
  tabsTitle: "See a few real signals before you decide where to go deeper.",
  tabsIntro:
    "The home page previews the strongest material from each section instead of rewriting the full content.",
  tabs: [
    {
      routeKey: "projects",
      eyebrow: "Build Evidence",
      title: "Projects",
      description:
        "Look at the public builds first, then open detail pages only when the work is relevant.",
      highlights: [
        "Previews the latest public personal projects.",
        "Keeps the full detail pages for deeper reading.",
      ],
      hrefLabel: "Open projects",
    },
    {
      routeKey: "blog",
      eyebrow: "Reasoning Layer",
      title: "Writing",
      description:
        "Use writing to inspect architecture, operability, and delivery tradeoffs that project cards only hint at.",
      highlights: [
        "Best when you want methods and tradeoffs.",
        "The preview stays aligned with the newest published essays.",
      ],
      hrefLabel: "Open writing",
    },
    {
      routeKey: "resume",
      eyebrow: "Career Signal",
      title: "Personal Experience",
      description:
        "Use the public personal experience page to scan role fit, career arc, and representative operating context.",
      highlights: [
        "Best for fast first-pass role evaluation.",
        "Separated from Projects so ownership stays easier to read.",
      ],
      hrefLabel: "Open personal experience",
    },
    {
      routeKey: "contact",
      eyebrow: "Public Paths",
      title: "Connect",
      description:
        "Use a public contact path only when the direction is already clear.",
      highlights: [
        "LinkedIn, GitHub, and email are grouped in one place.",
        "Useful for recruiting, collaboration, and technical conversations.",
      ],
      hrefLabel: "Open contact paths",
    },
  ],
  journeysEyebrow: "Audience Paths",
  journeysTitle: "Pick the path closest to your intent.",
  journeysIntro:
    "You do not need a full site tour first. Start with the right first step, then go deeper only if it matters.",
  journeys: [
    {
      id: "hiring",
      audience: "Hiring / Recruiting",
      title: "Review public context, then decide whether to reach out",
      summary:
        "If the goal is role fit or partnership fit, start with Personal Experience and use Connect only when the direction is relevant.",
      routeKeys: ["resume", "contact"],
      note: "Best for recruiters, hiring managers, and partnership conversations.",
    },
    {
      id: "technical-reader",
      audience: "Technical Reader",
      title: "See the builds first, then read the reasoning",
      summary:
        "Use Projects for the surface area and Writing for the architecture and operability judgment behind it.",
      routeKeys: ["projects", "blog"],
      note: "Best for engineers, technical collaborators, and readers who care about implementation choices.",
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
        "Only projects, writing, public personal experience context, and contact paths that make sense to keep public are included here.",
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
