import type { HomeContent } from "../../src/lib/types";

export const homeEn: HomeContent = {
  heroEyebrow: "Recruiter Brief / 30-second read",
  heroTitle:
    "Backend architecture, platform delivery, and engineering leadership that actually gets teams to shipping.",
  heroIntro:
    "My work has stayed close to e-commerce, logistics, and platform systems where clean backend design is only part of the job. The real work is aligning architecture, delivery rhythm, and team execution so systems keep moving without chaos. This page starts with proof, then sends you to the full resume, GitHub, and writing when you want depth.",
  resumeCtaLabel: "View resume",
  githubCtaLabel: "View GitHub",
  proofBoardEyebrow: "Proof board",
  proofBoardTitle: "Credibility is not a self-description. It is a set of signals you can verify quickly.",
  homeProofBoard: [
    {
      value: "10+",
      label: "years in platforms and e-commerce",
      detail: "From QA and automation into backend, architecture, and engineering leadership.",
    },
    {
      value: "20+",
      label: "engineering delivery scope",
      detail: "Across mobile, backend, desktop, and big data platform work.",
    },
    {
      value: "7",
      label: "engineers currently led in Taiwan",
      detail: "Owning technical direction and delivery rhythm on First Horizon.",
    },
    {
      value: "3 regions",
      label: "cross-region delivery context",
      detail: "Taiwan, Hong Kong, and Australia collaboration in active delivery.",
    },
  ],
  githubEyebrow: "GitHub Signal",
  githubTitle: "Public code footprint says more than a polished paragraph.",
  githubIntro:
    "This page does not turn into an engineering dashboard. Instead, it curates the GitHub signals that best represent how I build, what I focus on, and whether the work is still active.",
  githubSignals: [
    {
      title: "AI Productivity Workspace",
      subtitle: "Desktop workflow product foundation",
      status: "Private / Active Build",
      updatedLabel: "Updated 2026.03",
      summary:
        "A personal productivity workspace that brings desktop workflows, task management, and agent collaboration into one product foundation.",
      highlights: [
        "Electron shell with React, TypeScript, Tailwind v4, and a .NET 10 vertical-slice API.",
        "Already includes tasks, projects, agents, roles, dispatch, and assets APIs.",
        "The latest local development update landed on 2026-03-14, so this is active work rather than a parked idea.",
      ],
      tags: ["Electron", "React", ".NET 10", "Productivity"],
      note: "The repository is still private, so the home page keeps the product signal without linking to a dead public URL.",
    },
    {
      title: "Phalanx Chronicle",
      subtitle: "Unity SRPG campaign prototype",
      status: "Public Repo",
      updatedLabel: "Updated 2026.03",
      summary:
        "A Unity SRPG campaign prototype with playable MVP flows across campaign progression, battle systems, and game-state handling.",
      highlights: [
        "Already connects a 12-chapter campaign with recruitment, equipment, promotion, and camp flow.",
        "Battle systems cover a 10x10 battlefield, AI, skills, HUD states, and damage forecasting.",
        "The public repository was updated on 2026-03-14 and includes demo media, README context, and tests.",
      ],
      tags: ["Unity", "SRPG", "C#", "Gameplay Systems"],
      href: "https://github.com/anomo06822/phalanx-chronicle",
      hrefLabel: "Open public repo",
    },
    {
      title: "GitHub Profile",
      subtitle: "Public code history and shipping cadence",
      status: "Public Footprint",
      updatedLabel: "GitHub / anomo06822",
      summary:
        "If you want a fast read on public work, implementation history, and technical range, the profile is the clearest external proof layer.",
      highlights: [
        "Includes this personal site, phalanx-chronicle, and several utility or starter repos.",
        "Shows interest across backend, tooling, workflow products, and game prototypes.",
        "Useful when you want to confirm that the public narrative matches actual build history.",
      ],
      tags: ["Public Repos", "Code History", "Shipping Cadence"],
      href: "https://github.com/anomo06822",
      hrefLabel: "Open GitHub profile",
    },
  ],
  secondarySignalsTitle: "Secondary signal",
  secondarySignals: [],
  teamEyebrow: "Leadership / Trust",
  teamTitle: "Titles do not prove leadership. Delivery context does.",
  teamIntro:
    "This section does not repeat resume bullets. It turns team context, cross-region collaboration, and delivery ownership into something easier to read at a glance.",
  teamGallery: [
    {
      title: "0→1 platforms are not solo work",
      contextLabel: "Taiwan team / First Horizon",
      caption:
        "Currently leading a 7-engineer Taiwan team across architecture, CI/CD, observability, and delivery execution.",
      variant: "primary",
    },
    {
      title: "Taiwan, Hong Kong, and Australia in one delivery motion",
      contextLabel: "Cross-region delivery",
      caption:
        "Coordinating with Hong Kong and Australia teams so product, engineering, and operations move on the same rhythm.",
      variant: "secondary",
    },
    {
      title: "Previous scale was broader than one product line",
      contextLabel: "Newegg scale context",
      caption:
        "Previously led 20+ engineers across mobile, B2B desktop, backend, and big data platform delivery.",
      variant: "secondary",
    },
  ],
  leadershipProofTitle: "Leadership proof",
  leadershipProofs: [
    {
      value: "7",
      label: "engineers currently led in Taiwan",
      detail: "Owning technical direction, platform quality, and delivery cadence on First Horizon.",
    },
    {
      value: "20+",
      label: "past engineering coordination scope",
      detail: "Across Newegg mobile, backend, desktop, and data platform surfaces.",
    },
    {
      value: "TW / HK / AU",
      label: "cross-region collaboration",
      detail: "Not just coding work, but alignment across stakeholders in multiple regions.",
    },
  ],
  nextEyebrow: "Next Step",
  nextTitle: "Different readers should go to different pages next.",
  nextIntro:
    "The home page establishes positioning and trust. For full background, technical depth, or public contact paths, the next steps are intentionally split.",
  pathways: [
    {
      routeKey: "resume",
      eyebrow: "Full Background",
      title: "Resume",
      description:
        "See the full experience arc, representative projects, and platform delivery background.",
      hrefLabel: "View full resume",
    },
    {
      routeKey: "blog",
      eyebrow: "Thinking Depth",
      title: "Writing",
      description:
        "Read how I explain architecture, operability, and delivery tradeoffs in practice.",
      hrefLabel: "Read writing",
    },
    {
      routeKey: "contact",
      eyebrow: "Public Paths",
      title: "Connect",
      description:
        "Start from the public LinkedIn and GitHub paths if you want to begin a serious conversation.",
      hrefLabel: "Open contact paths",
    },
  ],
};
