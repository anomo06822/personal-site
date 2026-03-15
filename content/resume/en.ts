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
      "Integrating platform architecture, engineering leadership, and delivery to make progress happen.",
    headlineSecondary:
      ".NET, Azure, e-commerce platforms, and backend architecture",
    openToRoles: [
      "Engineering Manager",
      "Tech Lead",
      "Senior Backend Engineer",
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
      logo: {
        src: "/images/company-logos/sjc-logo.jpg",
        alt: "SJC logo",
      },
      impactBullets: [
        "Led the First Horizon logistics platform from 0 to 1 by aligning product scope, platform architecture, and delivery rhythm from the start.",
        "Defined boundaries with Next.js, .NET Core, CQRS, and Vertical Slice so new workflows could be added without losing maintainability.",
        "Built Azure DevOps CI/CD, environment setup, and release flow so the platform had repeatable delivery controls from phase one.",
        "Introduced Prometheus, Grafana, and Jaeger so monitoring, tracing, and diagnostics stayed inside normal engineering operations.",
        "Managed a 7-engineer Taiwan team and coordinated with Hong Kong and Australia partners on planning, technical decisions, and cross-region delivery.",
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
      logo: {
        src: "/images/company-logos/newegg-logo.svg",
        alt: "Newegg logo",
      },
      impactBullets: [
        "Led 20+ engineers across B2C mobile, B2B desktop, and big data platform work, owning multi-stream delivery coordination in a global e-commerce environment.",
        "Established a shared presentation layer and microservice boundaries to support reusable capabilities across product lines.",
        "Aligned analytics, push notifications, SEO, and release coordination so mobile and web improvements shipped through one operating model.",
        "Worked with product, design, operations, and cross-region teams on roadmap, release milestones, and incident handling while keeping public products stable under high traffic.",
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
      role: "Staff Engineer / Group Leader",
      period: "2016.04 - 2020.04",
      location: "Taichung, Taiwan",
      logo: {
        src: "/images/company-logos/newegg-logo.svg",
        alt: "Newegg logo",
      },
      impactBullets: [
        "Built backend services for Newegg Business across account, cart, order, payment, and procurement workflows.",
        "Designed service boundaries for high-value B2B transaction and procurement scenarios, turning business rules into maintainable backend capabilities.",
        "Led migration from .NET Framework to .NET Core and reorganized delivery around more modular services.",
        "Introduced TDD plus Jenkins and GitLab CI/CD so backend delivery became more repeatable and less regression-prone.",
        "Used dotTrace and Visual Studio Profiler to resolve performance bottlenecks and improve backend efficiency.",
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
      logo: {
        src: "/images/company-logos/newegg-business-logo.png",
        alt: "Newegg Business logo",
      },
      impactBullets: [
        "Supported quality for Newegg Business across order, shopping, and procurement flows in core transaction journeys.",
        "Built Selenium and Nightwatch automation suites to reduce repetitive regression effort.",
        "Expanded integration coverage and testing workflow, which shaped the system thinking I later brought into backend engineering.",
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
      label: "Core Stack",
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
      label: "Data / Messaging",
      skills: ["MS SQL", "PostgreSQL", "MongoDB", "Redis", "RabbitMQ"],
    },
    {
      label: "Architecture / Systems",
      skills: [
        "Backend Development",
        "System Architecture",
        "Vertical Slice Architecture",
        "Microservices",
        "Distributed Systems",
      ],
    },
    {
      label: "Delivery / Leadership",
      skills: ["CI/CD", "Team Leadership"],
    },
  ],
  featured: [
    {
      title: "Newegg Mobile",
      summary:
        "Mobile product delivery that kept reliability, user engagement, and release quality aligned under public, high-volume traffic.",
      proofPoints: [
        "Supported public products with 1M+ downloads and a 4.6 App Store rating.",
        "Maintained 99.9% crash-free users while large releases and day-to-day operations kept moving.",
        "Moved Android push open rate from 2% to 5% and reduced invalid device tokens by approximately 33%.",
      ],
    },
    {
      title: "Newegg Business",
      summary:
        "Backend modernization across B2B commerce and procurement flows so core transaction systems became easier to evolve and ship.",
      proofPoints: [
        "Built services across account, cart, order, and procurement flows for high-value B2B transactions.",
        "Integrated PayPal, MasterPass, e-procurement, and Net Terms into the platform.",
        "Completed the .NET Framework to .NET Core migration together with TDD and Jenkins / GitLab CI/CD adoption.",
      ],
    },
    {
      title: "First Horizon / Platform Delivery",
      summary:
        "0→1 platform delivery that established architecture, execution flow, and observability as one operating system for the team.",
      proofPoints: [
        "Led First Horizon from greenfield planning into a deliverable logistics platform foundation.",
        "Managed a 7-engineer Taiwan team while aligning with Hong Kong and Australia stakeholders.",
        "Established Azure DevOps, Azure deployment flow, and Prometheus / Grafana / Jaeger observability from the start.",
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
          "The logistics platform entry point for SJC, built to support cross-region operations, workflow coordination, and future platform expansion.",
        bullets: [
          "Next.js handles operational workflows on the frontend while .NET Core, CQRS, and Vertical Slice shape the platform capabilities behind it.",
          "The product emphasis is on platform boundaries, deployment governance, and observability rather than one-off feature delivery.",
          "The public site acts as the visible entry point, while the deeper value is in the logistics platform foundation behind it.",
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
          "Newegg's consumer shopping experience across app and mobile web, with continuous release and operational ownership.",
        bullets: [
          "The product surface covers product browsing, purchase flow, customer notifications, and day-to-day release experience.",
          "Key engineering concerns include React Native, analytics, push notifications, and mobile web SEO / Core Web Vitals.",
          "My role focused on cross-team delivery, reliability governance, and product-experience improvements.",
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
          "Newegg's B2B and procurement-facing commerce entry point across account, payment, purchasing, and order workflows.",
        bullets: [
          "The product is centered on enterprise purchasing and procurement flows rather than a standard B2C shopping journey.",
          "The platform stack relies on C# / .NET, MS SQL, and business capability integrations.",
          "My work centered on backend services, modernization, and delivery process governance.",
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
  experienceGallery: {
    intro:
      "A visual timeline of four representative stages: QA automation, B2B backend modernization, mobile engineering leadership, and First Horizon platform delivery.",
    items: [
      {
        title: "QA Automation / Newegg Business Foundation",
        period: "2013.04 - 2016.04",
        caption:
          "Started from automation coverage across order, shopping, and procurement flows, building the system perspective that later carried into backend engineering.",
        imageAlt: "QA Automation stage placeholder for Newegg Business",
      },
      {
        title: "Newegg Business / Staff Engineer / Group Leader",
        period: "2016.04 - 2020.04",
        caption:
          "Owned B2B backend services across purchasing, payment, and order flow while driving .NET Core migration, TDD, and CI/CD adoption.",
        imageAlt: "Newegg Business engineering stage placeholder",
      },
      {
        title: "Newegg Mobile / Engineering Lead",
        period: "2020.04 - 2024.04",
        caption:
          "Led collaboration across mobile, desktop, and data platform work to improve public-product reliability, engagement, and release execution.",
        imageAlt: "Newegg Mobile leadership stage placeholder",
      },
      {
        title: "First Horizon / Platform Delivery",
        period: "2024.04 - Present",
        caption:
          "Integrated 0→1 logistics platform architecture, observability, engineering rhythm, and cross-region delivery into one operating track.",
        imageAlt: "First Horizon platform delivery stage placeholder",
      },
    ],
  },
  presentation: {
    fileName: "jarvis-intro-cn-2026-v1.pptx",
    title: "Jarvis Huang Intro Deck",
    summary:
      "This 9-slide deck is a compact narrative version of my profile, covering role progression, platform work, First Horizon 0→1 architecture, and my Newegg engineering and leadership context.",
    previewImageSrc: "/images/resume/jarvis-intro-cn-2026-v1-cover.png",
    previewImageAlt: "Cover preview for Jarvis Huang intro deck",
    slideCount: 9,
    languageLabel: "Chinese deck",
    note:
      "The resume PDF stays as the fast download format. This deck gives a more guided introduction to the same background and project context.",
  },
  pdf: {
    fileName: pdfManifest.en.fileName,
    summary: [
      "Backend and platform engineering leader with 10+ years across quality engineering, backend services, architecture, and delivery ownership.",
      "Experienced in .NET, Azure, CI/CD, observability, and cross-team execution for e-commerce, logistics, and platform systems.",
    ],
    featured: [
      {
        title: "Newegg Mobile",
        summary:
          "Mobile product delivery that kept reliability, user engagement, and release quality aligned under public, high-volume traffic.",
        proofPoints: [
          "Supported public products with 1M+ downloads and a 4.6 App Store rating.",
          "Maintained 99.9% crash-free users while large releases and day-to-day operations kept moving.",
          "Moved Android push open rate from 2% to 5% and reduced invalid device tokens by approximately 33%.",
        ],
      },
      {
        title: "Newegg Business",
        summary:
          "Backend modernization across B2B commerce and procurement flows so core transaction systems became easier to evolve and ship.",
        proofPoints: [
          "Built services across account, cart, order, and procurement flows for high-value B2B transactions.",
          "Integrated PayPal, MasterPass, e-procurement, and Net Terms into the platform.",
          "Completed the .NET Framework to .NET Core migration together with TDD and Jenkins / GitLab CI/CD adoption.",
        ],
      },
      {
        title: "First Horizon / Platform Delivery",
        summary:
          "0→1 platform delivery that established architecture, execution flow, and observability as one operating system for the team.",
        proofPoints: [
          "Defined the platform stack with Next.js, .NET Core, CQRS, and Vertical Slice boundaries.",
          "Managed the 7-engineer Taiwan team while aligning with Hong Kong and Australia stakeholders.",
          "Established Azure DevOps CI/CD, Azure deployment flow, and early observability with Prometheus, Grafana, and Jaeger.",
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
