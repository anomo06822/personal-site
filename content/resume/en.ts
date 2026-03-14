import type { ResumeContent } from "../../src/lib/types";
import pdfManifest from "./pdf-manifest.json";

export const resumeEn: ResumeContent = {
  profile: {
    name: "黃智偉",
    englishName: "Jarvis Huang",
    locationLabel: "Taiwan",
    portraitSrc: "/images/profile/jarvis-huang-headshot.png",
    portraitAlt: "Portrait of Jarvis Huang",
  },
  positioning: {
    headlinePrimary:
      "Senior Backend Engineer / Tech Lead / Engineering Manager",
    headlineSecondary:
      ".NET, Azure, e-commerce platforms, and backend architecture",
    openToRoles: [
      "Senior Backend Engineer",
      "Tech Lead",
      "Engineering Manager",
    ],
  },
  about: [
    "Software engineer and engineering leader with 10+ years of experience building large-scale e-commerce and platform systems.",
    "My career path spans QA, backend engineering, engineering leadership, and assistant project management, which helps me bridge software quality, system architecture, and engineering delivery.",
    "Experienced in .NET backend development, Azure cloud architecture, CI/CD, and leading engineering teams across product and platform work.",
    "I focus on building stable, scalable platforms and helping teams deliver reliable systems.",
    "Currently interested in opportunities related to platform engineering, backend architecture, and AI-enabled products.",
  ],
  highlights: [
    {
      value: "10+",
      label: "years in e-commerce and platforms",
      detail:
        "Built a career path from QA automation to backend engineering, engineering leadership, and delivery ownership.",
    },
    {
      value: "20+",
      label: "engineers across delivery scope",
      detail:
        "Led and coordinated multi-team execution across mobile, desktop, backend, and big data platform work.",
    },
    {
      value: "1M+",
      label: "downloads on supported mobile products",
      detail:
        "Maintained app reliability, release quality, and engagement improvements on public consumer products.",
    },
    {
      value: "0→1",
      label: "logistics platform delivery",
      detail:
        "Led the First Horizon platform from greenfield architecture into CI/CD, observability, and operating rhythm.",
    },
  ],
  experiences: [
    {
      company: "SJC International Logistics",
      role: "Assistant Project Manager / Tech Lead",
      period: "2024.04 - Present",
      location: "Taichung, Taiwan",
      impactBullets: [
        "Led development of the First Horizon logistics platform from 0 to 1 and aligned architecture, delivery, and operations from the start.",
        "Designed the platform architecture with Next.js, .NET Core, CQRS, and Vertical Slice to keep domain boundaries and implementation flow maintainable.",
        "Built CI/CD pipelines with Azure DevOps and deployed the platform to Azure with repeatable release controls.",
        "Implemented monitoring and logging with Prometheus, Grafana, and Jaeger to make diagnostics part of daily engineering work.",
        "Managed the Taiwan engineering team across 7 engineers while keeping project execution and technical direction on the same track.",
        "Coordinated cross-region collaboration with Hong Kong and Australia teams to keep delivery aligned across product, engineering, and operations.",
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
      company: "Newegg Taiwan",
      role: "Assistant Team Manager / Engineering Lead",
      period: "2020.04 - 2024.04",
      location: "Taichung, Taiwan",
      impactBullets: [
        "Led 20+ engineers supporting B2C mobile, B2B desktop, and big data platforms in a global e-commerce environment.",
        "Maintained a mobile app with 1M+ downloads, a 4.6 App Store rating, and 99.9% crash-free users.",
        "Improved push notification open rate from 2% to 5% through delivery coordination, analytics work, and message-quality tuning.",
        "Reduced invalid device tokens by approximately 33%, improving notification reliability and downstream marketing efficiency.",
        "Improved Core Web Vitals by reducing bad URLs from 50% to below 7% on the mobile web experience.",
        "Implemented microservice architecture and a shared presentation layer to support parallel product delivery.",
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
      company: "Newegg Taiwan",
      role: "Staff Engineer",
      period: "2016.04 - 2020.04",
      location: "Taichung, Taiwan",
      impactBullets: [
        "Developed backend services for the B2B e-commerce platform across account, shopping, and order-processing flows.",
        "Built core services that supported high-value B2B transaction and procurement scenarios.",
        "Migrated services from .NET Framework to .NET Core to modernize the platform and prepare for more modular backend delivery.",
        "Introduced TDD and CI/CD with Jenkins and GitLab, improving release confidence and reducing regression cost.",
        "Optimized service performance with dotTrace and Visual Studio Profiler to improve response time and backend efficiency.",
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
      company: "Newegg Taiwan",
      role: "QA Automation Engineer",
      period: "2013.04 - 2016.04",
      location: "Taichung, Taiwan",
      impactBullets: [
        "Supported e-commerce order and shopping-flow quality across core transactional journeys.",
        "Built automation tests with Selenium and Nightwatch to reduce repetitive manual regression work.",
        "Improved test coverage and integration testing processes, building the system perspective that later carried into backend engineering.",
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
    ".NET Core",
    "System Architecture",
    "Microservices",
    "Azure",
    "CI/CD",
    "Backend Development",
    "SQL",
    "Distributed Systems",
    "Team Leadership",
  ],
  featured: [
    {
      title: "Newegg App",
      summary:
        "Consumer-facing mobile product ownership across reliability, engagement, and release quality.",
      proofPoints: [
        "Supported products with 1M+ downloads and a 4.6 App Store rating.",
        "Maintained 99.9% crash-free users while improving notification quality and release stability.",
        "Moved push notification open rate from 2% to 5% and reduced invalid tokens by approximately 33%.",
      ],
    },
    {
      title: "B2B Website",
      summary:
        "Backend modernization work across critical B2B commerce and procurement flows.",
      proofPoints: [
        "Built account, cart, and order-processing services for core B2B transactions.",
        "Integrated PayPal, MasterPass, e-procurement, and Net Terms into the platform.",
        "Drove .NET Framework to .NET Core migration alongside TDD and CI/CD adoption.",
      ],
    },
    {
      title: "Architecture / Platform Leadership",
      summary:
        "0→1 platform leadership that combined architecture, delivery, observability, and cross-region execution.",
      proofPoints: [
        "Led First Horizon from greenfield planning into production delivery structure.",
        "Managed a 7-engineer Taiwan team while aligning with Hong Kong and Australia stakeholders.",
        "Established Azure DevOps, deployment flow, and Prometheus/Grafana/Jaeger observability from the start.",
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
          "A personal productivity workspace built with Electron, React, and .NET 10 to bring desktop workflows, task management, and agent capabilities into one product foundation.",
        bullets: [
          "The stack combines an Electron shell, a React + TypeScript + Tailwind v4 frontend, and a .NET 10 vertical-slice API with EF Core and PostgreSQL.",
          "The current product surface already includes tasks, projects, agents, roles, dispatch, and asset APIs as the core workspace building blocks.",
          "It also includes local MCP integration and a desktop-first development flow so AI-assisted workflows can plug directly into the workspace.",
        ],
        tags: [
          "Electron",
          "React",
          "TypeScript",
          ".NET 10",
          "Productivity",
        ],
        detailIntro: [
          "The goal is not a single-purpose utility, but a workspace that keeps task management, agent orchestration, desktop workflows, and personal data assets inside one product surface.",
          "Electron acts as the desktop shell, React + TypeScript + Tailwind v4 shape the UI, and a .NET 10 vertical-slice API handles data and workflow logic behind it.",
          "I treat it as a long-running personal product foundation, so local MCP support, desktop-first development flow, and future AI-assisted workflows are part of the design from the start.",
        ],
        detailImage: {
          kind: "placeholder",
          alt: "AI Productivity Workspace placeholder preview",
        },
        feedback: {
          type: "disabled",
          message:
            "This repository is not public yet. GitHub issue feedback will open after the public cleanup and release path are ready.",
        },
        imageAlt: "AI Productivity Workspace app preview",
        note: "The repository is not public yet. The GitHub link will be added after the cleanup for public release is done.",
      },
      {
        slug: "phalanx-chronicle",
        title: "phalanx-chronicle",
        subtitle: "anomo06822/phalanx-chronicle",
        summary:
          "A Unity SRPG campaign prototype that already includes playable MVP flows across campaign progression, camp preparation, battle rules, and combat UI.",
        bullets: [
          "The prototype already connects a 12-chapter Liu Bei campaign with chapter unlocks, rewards, recruitment, equipment changes, and promotion flow.",
          "Battle systems cover a 10x10 battlefield, skills and status effects, enemy AI decisions, HUD states, and damage forecasting.",
          "The public repo includes demo media, gameplay previews, and headless rule tests as the base for continued expansion.",
        ],
        tags: ["Unity", "SRPG", "Game Prototype", "C#", "Gameplay Systems"],
        detailIntro: [
          "This project is built as a campaign-level SRPG prototype rather than a single battle demo, so the emphasis is on connecting progression, preparation, and combat rules into one playable loop.",
          "The current MVP already ties chapter unlocks, recruitment, equipment changes, promotion flow, battle logic, enemy AI, and HUD states into the same operating surface.",
          "The public repo also includes demo material, gameplay previews, and headless rule tests so the systems can keep evolving with less guesswork.",
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
        hrefLabel: "View on GitHub",
        imageAlt: "Phalanx Chronicle game preview",
      },
      {
        slug: "xml-toolkit",
        title: "xml-toolkit",
        subtitle: "anomo06822/xml-toolkit",
        summary:
          "A multi-format data toolkit for XML, JSON, and Markdown that covers format, minify, sort, diff, convert, and visualize workflows, with Electron desktop packaging and an optional .NET 10 backend.",
        bullets: [
          "Combines XML, JSON, and Markdown formatting, sorting, diffing, conversion, and visualization into one tool surface.",
          "Adds Gemini assistant and AI diff summary together with Electron desktop packaging, a menu bar entry, a global wakeup shortcut, and GitHub Releases update checks.",
          "Supports an optional .NET 10 backend proxy for API key isolation while keeping web/direct mode and Docker deployment available.",
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
          "The project started as a data-format utility and is now evolving into a broader DataToolkit surface that supports both web mode and desktop mode for XML, JSON, and Markdown workflows.",
          "Beyond formatting and diffing, the repo now includes Gemini assistant and AI diff summary, Electron packaging, a menu bar status entry, a configurable wakeup shortcut, and GitHub Releases-based update checks.",
          "When desktop delivery needs local credential isolation, the project can also run through an optional .NET 10 backend proxy while preserving a Docker-friendly web deployment path.",
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
        hrefLabel: "View on GitHub",
        imageAlt: "xml-toolkit project preview",
        note: "The current in-repo product branding is DataToolkit while the public repository name remains xml-toolkit.",
      },
    ],
    core: [
      {
        title: "First Horizon",
        subtitle: "SJC International Logistics",
        summary:
          "A 0→1 logistics platform where architecture, release flow, observability, and cross-region collaboration were treated as one operating system from the start.",
        bullets: [
          "The platform architecture used Next.js, .NET Core, CQRS, and Vertical Slice to keep domain boundaries and implementation flow maintainable.",
          "Azure DevOps CI/CD and Azure deployment flow were set up early so release control and environment governance were repeatable.",
          "Prometheus, Grafana, and Jaeger were introduced from phase one to make diagnostics part of the normal engineering loop.",
        ],
        tags: ["Next.js", ".NET Core", "CQRS", "Azure", "Observability"],
        href: "https://sjclemenger.com/",
        hrefLabel: "Visit site",
        imageAlt: "First Horizon platform preview",
      },
      {
        title: "Newegg Mobile",
        subtitle: "Newegg",
        summary:
          "Consumer mobile product ownership focused on reliability, engagement, and release quality under public, high-volume usage.",
        bullets: [
          "Supported products with 1M+ downloads, a 4.6 App Store rating, and 99.9% crash-free users.",
          "Improved Android push open rate from 2% to 5% and reduced invalid device tokens by approximately 33%.",
          "Improved release coordination, notification quality, and mobile web Core Web Vitals as part of the same product surface.",
        ],
        tags: [
          "React Native",
          "Mobile Commerce",
          "Push Notifications",
          "Analytics",
          "SEO",
        ],
        href: "https://www.newegg.com/",
        hrefLabel: "Visit site",
        imageAlt: "Newegg mobile product preview",
      },
      {
        title: "Newegg Business",
        subtitle: "Newegg Business",
        summary:
          "B2B platform backend modernization across critical commerce and procurement flows, including account, shopping, orders, and business capability integrations.",
        bullets: [
          "Built core backend services across account, cart, and order-processing flows for high-value B2B transactions.",
          "Integrated PayPal, MasterPass, e-procurement, and Net Terms into the platform.",
          "Drove .NET Framework to .NET Core migration together with TDD and Jenkins / GitLab CI/CD adoption.",
        ],
        tags: ["C#", ".NET Core", "B2B Commerce", "MS SQL", "CI/CD"],
        href: "https://neweggbusiness.com/",
        hrefLabel: "Visit site",
        imageAlt: "Newegg Business platform preview",
      },
    ],
  },
  projects: [
    {
      title: "Follow Seller - Newegg Hackathon",
      subtitle: "Newegg Global Hackathon",
      bullets: [
        "Built the prototype in 3 days and validated the concept under real hackathon constraints.",
        "Won 1st Place and Most Valuable Project Award in the global hackathon.",
        "Extended the concept into a production launch after the initial prototype.",
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
  pdf: {
    fileName: pdfManifest.en.fileName,
    summary: [
      "Backend and platform engineering leader with 10+ years across quality engineering, backend services, architecture, and delivery ownership.",
      "Experienced in .NET, Azure, CI/CD, observability, and cross-team execution for e-commerce, logistics, and platform systems.",
    ],
    featured: [
      {
        title: "First Horizon Logistics Platform",
        summary:
          "0→1 platform delivery that treated architecture, release flow, and observability as one system from the start.",
        proofPoints: [
          "Defined the platform stack with Next.js, .NET Core, CQRS, and Vertical Slice boundaries.",
          "Established Azure DevOps CI/CD, Azure deployment flow, and early observability with Prometheus, Grafana, and Jaeger.",
        ],
      },
      {
        title: "Newegg Mobile and Platform Delivery",
        summary:
          "Engineering leadership across consumer mobile, B2B commerce, and shared platform work in a global e-commerce environment.",
        proofPoints: [
          "Led 20+ engineers across mobile, backend, and data platform delivery scope.",
          "Maintained products with 1M+ downloads, 4.6 App Store rating, and 99.9% crash-free users while improving push performance.",
        ],
      },
    ],
    projects: [
      {
        title: "Follow Seller",
        subtitle: "Newegg Global Hackathon",
        bullets: [
          "Built the prototype in 3 days and validated the concept under real delivery constraints.",
          "Won 1st Place and Most Valuable Project Award, then extended the concept toward production launch.",
        ],
        tags: ["Hackathon", "Prototype", "Production Launch"],
      },
    ],
  },
};
