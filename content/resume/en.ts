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
      "From platform architecture to product delivery, keeping engineering moving forward.",
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
      period: "2024.04 - 2026.03",
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
          "A desktop productivity workspace built with Electron, React, and .NET 10 that brings notes, boards, task management, agent dispatch, world simulation, and a governed tech-news-to-distribution content lane into one evolving product foundation.",
        bullets: [
          "The same desktop shell already connects a note library, reusable templates, delivery / focus / portfolio boards, centralized task triage, and context rails so daily execution does not fragment across tools.",
          "Content Studio now turns Codex-led tech-news signal intake, topic shortlist, draft bundles, channel drafts, and publish / performance feedback into an article-centric control plane.",
          "Agent Command Center turns role binding, dispatch runs, timeline, artifacts, and intervention controls into an operable execution surface instead of hidden background automation.",
          "Agent World adds a pixel-art live office view for districts, staff distribution, focus / blocked / idle status, and rerun verification, while the product core stays on .NET 10 vertical-slice API, PostgreSQL, and local MCP integration.",
        ],
        tags: [
          "Electron",
          "React",
          "TypeScript",
          ".NET 10",
          "Productivity",
          "Agent Ops",
          "Content Ops",
        ],
        detailIntro: [
          "This project is not meant to be a single AI utility. It is a desktop workspace that keeps the daily loop of capture → decide → execute → review inside one product surface so notes, boards, tasks, content pipeline, and agent execution stay aligned.",
          "The current product already exposes Workspace, Boards, Task Management, Agent Command Center, Content Studio, and Agent World as distinct but connected surfaces. The intent is not feature sprawl, but to keep daily planning, dispatch control, editorial workflow, and execution visibility inside the same operating shell.",
          "One of the more public-facing recent evolutions is the tech-news lane: a Codex job handles signal intake first, then AIPW uses an article-centric control plane to manage topics, drafts, publish gates, and feedback before adapting the result to personal-site, LinkedIn, and X.",
          "That makes personal-site growth part of the product itself rather than an external writing routine. Note-first research, review gates, channel drafts, publish jobs, and performance snapshots now fit inside the same operating model.",
          "Electron provides the desktop shell, React + TypeScript + Tailwind v4 shape the frontend, and a .NET 10 vertical-slice API with EF Core PostgreSQL provides the data and workflow backbone. Local MCP and desktop-first development flow are part of the design so future AI-assisted workflows can plug into the same workspace cleanly.",
        ],
        detailImage: {
          kind: "gallery",
          alt: "AI Productivity Workspace demo gallery",
          images: [
            {
              src: "/images/projects/ai-productivity-workspace/01-workspace.png",
              alt: "AI Productivity Workspace workspace surface",
              label: "Workspace",
              caption:
                "Primary daily shell for note capture, reusable templates, quick edits, and context rails, with an onboarding playbook that reinforces capture → decide → execute → review.",
            },
            {
              src: "/images/projects/ai-productivity-workspace/02-boards.png",
              alt: "AI Productivity Workspace boards surface",
              label: "Boards",
              caption:
                "Board center for delivery, focus, and portfolio views, keeping backlog, in-progress work, completed slices, blockers, and hold lanes inside the same workspace.",
            },
            {
              src: "/images/projects/ai-productivity-workspace/03-task-management.png",
              alt: "AI Productivity Workspace task management surface",
              label: "Task Management",
              caption:
                "Central task triage surface for open slices, blockers, focus queues, and project filters so daily execution can be reviewed from one list-driven workflow.",
            },
            {
              src: "/images/projects/ai-productivity-workspace/04-agent-command.png",
              alt: "AI Productivity Workspace agent command center",
              label: "Agent Command",
              caption:
                "Operator view for dispatch health, gate, attention, timeline, artifacts, and intervention controls, making agent execution inspectable and correctable.",
            },
            {
              src: "/images/projects/ai-productivity-workspace/05-agent-world.png",
              alt: "AI Productivity Workspace agent world",
              label: "Agent World",
              caption:
                "Pixel-art district radar for staff distribution, focus / blocked / idle state, and live district feed so agent movement becomes visible rather than abstract log output.",
            },
            {
              src: "/images/projects/ai-productivity-workspace/07-tech-news-workflow-control-plane.png",
              alt: "AI Productivity Workspace tech-news workflow control plane blueprint",
              label: "Workflow Blueprint",
              caption:
                "Dark workflow blueprint that maps the current tech-news operating chain: Codex-led signal intake, an internal content control plane, channel-specific distribution, and a feedback loop back into the next cycle.",
            },
          ],
        },
        detailSections: [
          {
            id: "workflow",
            navLabel: "Workflow",
            title: "Tech-news workflow",
            eyebrow: "CONTENT CONTROL PLANE",
            intro:
              "One of the more meaningful recent additions is not another AI writing screen, but a governed content workflow that connects research, editorial packaging, distribution, and learning inside the same product.",
            paragraphs: [
              "The lane starts before the editor. A Codex job ingests tech-news signals, normalizes feeds, URLs, and raw notes, and produces source materials, topic candidates, and evidence blocks that can be traced later.",
              "Once the work enters AIPW, it lives inside an article-centric content control plane. Source materials, topic candidates, content articles, prompt bundles, channel drafts, publish jobs, and performance snapshots all share the same operating context instead of drifting across separate tools.",
              "Distribution then follows channel semantics rather than copy-paste reuse. The personal site stays the full article + hero image surface, while LinkedIn and X default to summary-led posts that point back to the canonical article.",
            ],
            cards: [
              {
                eyebrow: "01 Intake",
                title: "Codex-driven signal intake",
                body:
                  "Tech-news signals are collected, normalized, and bundled first so drafting starts from structured evidence instead of loose links.",
              },
              {
                eyebrow: "02 Control Plane",
                title: "Article-centric editorial system",
                body:
                  "AIPW keeps source, topic, article, prompt bundle, review gate, and publish job inside one article lifecycle so the workflow stays traceable.",
              },
              {
                eyebrow: "03 Distribution",
                title: "Channel semantics over copy-paste",
                body:
                  "Site, LinkedIn, and X each get their own output semantics, while channel drafts and publish payloads still stay bound to the same canonical article.",
              },
              {
                eyebrow: "04 Feedback",
                title: "Publish and learning loop",
                body:
                  "Publish results, audience response, and performance snapshots return to the next round of topic judgment and editorial tuning.",
              },
            ],
            bullets: [
              "personal-site: full article + hero image as the canonical publication surface.",
              "LinkedIn: summary post + canonical link with a professional distribution shape.",
              "X: thread or short summary + link for faster signal amplification.",
              "Feedback layer: publish status, channel outcomes, and performance signals feed the next editorial cycle.",
            ],
            spotlight: {
              src: "/images/projects/ai-productivity-workspace/07-tech-news-workflow-control-plane.png",
              alt: "AI Productivity Workspace tech-news workflow control plane blueprint",
              label: "Workflow Blueprint",
              caption:
                "Claude Code-themed dark blueprint that explains the current operating model: Codex intake -> Content Control Plane -> Distribution -> feedback loop.",
            },
            note:
              "This section intentionally mixes real product screens with one explanatory blueprint. The screens show what already exists; the blueprint makes the operating model legible in public.",
          },
        ],
        detailVideo: {
          src: "/videos/projects/ai-productivity-workspace/world-rerun-clean-baseline.mp4",
          posterSrc: "/images/projects/ai-productivity-workspace/06-world-movement-poster.png",
          alt: "AI Productivity Workspace world movement rerun video",
          label: "World Movement",
          caption:
            "16-second rerun demo that starts from a true lounge baseline, then re-dispatches PRD36, ARC36, and ENG36 to verify district movement, live status, and world feed behavior.",
        },
        previewNote:
          "Current project media now mixes the refreshed AIPW media pack with one workflow blueprint: `01` to `05` are clean 2026-03-17 Claude Code theme screenshots, `07` is the 2026-03-19 tech-news workflow control-plane visual, plus the same 16-second world movement rerun.",
        feedback: {
          type: "disabled",
          message:
            "This repository is not public yet. GitHub issue feedback will open after the public cleanup and release path are ready.",
        },
        imageAlt: "AI Productivity Workspace demo gallery",
        note:
          "The repository is not public yet. This page now mixes actual product screens, one workflow blueprint, and the world movement demo; the GitHub link will be added after the public cleanup is done.",
      },
      {
        slug: "membership-platform-flutter",
        title: "membership-platform-flutter",
        subtitle: "Private GitHub repository",
        summary:
          "A 0→1 membership platform monorepo that pairs a Gourmet-branded Flutter member app with a NestJS modular-monolith backend, shared API contracts, and cross-platform design tokens.",
        bullets: [
          "The member app already ships OTP login and verification, a Gourmet home surface, a dynamic QR member card, wallet history, and editable profile flows.",
          "The backend baseline covers auth, member profile, member card token, wallet, coupon, and POS points-earn slices under one modular-monolith foundation.",
          "Keeping Flutter, NestJS, OpenAPI, and design tokens in one repo makes mobile UX, API contracts, and delivery slices evolve together instead of drifting apart.",
        ],
        tags: [
          "Flutter",
          "Dart",
          "NestJS",
          "TypeScript",
          "Monorepo",
          "Membership",
        ],
        detailIntro: [
          "This project is built as a greenfield membership platform rather than a single demo screen set. The intent is to keep member experience, service contracts, and delivery structure aligned from the first slice.",
          "The current shipped loop focuses on the member-facing surfaces that have to feel coherent early: OTP login, Gourmet-branded home, dynamic QR member card, wallet balance and history, and profile editing.",
          "Under the UI, the repo already carries a NestJS modular monolith, OpenAPI baseline, design tokens, ADRs, and local runbooks so future coupon, activity, notification, and integration slices can grow on a stable backbone.",
        ],
        detailImage: {
          kind: "gallery",
          alt: "Membership Platform Flutter demo gallery",
          images: [
            {
              src: "/images/projects/membership-platform-flutter/01-home.png",
              alt: "Membership Platform Flutter home screen",
              label: "Home",
              caption:
                "The Gourmet home surface combines greeting, wallet balance preview, member-card entry, and quick member actions into a single member-facing landing screen.",
            },
            {
              src: "/images/projects/membership-platform-flutter/02-member-card.png",
              alt: "Membership Platform Flutter member card screen",
              label: "Member Card",
              caption:
                "Dynamic QR card view with branded presentation, countdown, and refresh behavior so the membership token stays usable as an operational screen, not just a static mock.",
            },
            {
              src: "/images/projects/membership-platform-flutter/03-wallet.png",
              alt: "Membership Platform Flutter wallet screen",
              label: "Wallet",
              caption:
                "Point balance summary and transaction history are grouped into one wallet workflow so earn, spend, and expiry context remain visible together.",
            },
            {
              src: "/images/projects/membership-platform-flutter/04-profile.png",
              alt: "Membership Platform Flutter profile screen",
              label: "Profile",
              caption:
                "Member profile editing keeps identity fields, contact info, and account maintenance inside the same branded shell instead of sending users into a generic settings page.",
            },
          ],
        },
        detailSections: [
          {
            id: "member-loop",
            navLabel: "Experience",
            title: "Core member loop",
            eyebrow: "GOURMET MEMBER APP",
            intro:
              "The first shipped slice focuses on the member loop that has to work early in a real loyalty product, not on placeholder marketing screens.",
            paragraphs: [
              "The member app already connects OTP authentication, branded home entry, member-card token access, wallet summary, and profile maintenance in one consistent shell. That gives the project a usable baseline for future retail and CRM integration work.",
              "The UI work is only one layer. The repo also keeps backend modules, contract definitions, and design tokens beside the Flutter code so later coupon, activity, and notification work can extend the same operating model instead of creating parallel prototypes.",
            ],
            cards: [
              {
                eyebrow: "01 Auth",
                title: "OTP-first member entry",
                body:
                  "Phone-based OTP flow is the first authentication slice, keeping onboarding light while preserving a real session boundary.",
              },
              {
                eyebrow: "02 Card",
                title: "Operational membership token",
                body:
                  "The member card is treated as a working token surface with refresh and expiry behavior, not just a decorative QR placeholder.",
              },
              {
                eyebrow: "03 Wallet",
                title: "Points visibility inside the app shell",
                body:
                  "Balance, pending value, and transaction history stay in one wallet view so members can understand state changes without leaving the app flow.",
              },
              {
                eyebrow: "04 Platform",
                title: "Monorepo-backed delivery baseline",
                body:
                  "Flutter app, NestJS backend, OpenAPI baseline, and design tokens stay in the same repo so product slices can ship with less contract drift.",
              },
            ],
            bullets: [
              "Flutter member app uses feature-first layered architecture.",
              "NestJS backend follows a modular-monolith structure for auth, member, wallet, coupon, and integration slices.",
              "OpenAPI and design tokens are versioned in-repo to reduce UI / API drift.",
              "Current media pack uses real Flutter golden captures from the app, not stitched marketing comps.",
            ],
            note:
              "The repository is still private, but the screenshots come from the actual app test suite and reflect the current shipped member flows.",
          },
        ],
        previewNote:
          "Current project media uses four Flutter golden captures from the real member app: Home, Member Card, Wallet, and Profile.",
        feedback: {
          type: "disabled",
          message:
            "This repository is not public yet. GitHub issue feedback will open after the release path and public cleanup are ready.",
        },
        imageAlt: "Membership Platform Flutter member app gallery",
        note:
          "The repository is still private. The public project page now uses real app captures so the product surface is visible before the repo is opened.",
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
          "A multi-format data toolkit for XML, JSON, and Markdown with dedicated formatter, compare, convert, and visualize workspaces, plus Electron desktop packaging and an optional .NET 10 backend.",
        bullets: [
          "Ships dedicated Formatter, Compare, Convert, and Visualize workspaces so XML, JSON, and Markdown workflows stay inside one consistent DataToolkit shell.",
          "The refreshed DataToolkit brand now includes a dedicated mark plus browser-tab favicon and sidebar logo updates, alongside Gemini assistant and AI diff summary support.",
          "Supports Electron desktop packaging, a menu bar entry, a global wakeup shortcut, GitHub Releases update checks, and an optional .NET 10 backend proxy for local API key isolation.",
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
          "The project started as a data-format utility and now presents a fuller DataToolkit surface, with dedicated Formatter, Compare, Convert, and Visualize views for XML, JSON, and Markdown workflows.",
          "The latest refresh also adds a dedicated DataToolkit mark and carries that branding into the browser-tab favicon and app sidebar logo, while keeping Gemini assistant and AI diff summary inside the same warm desktop-style shell.",
          "For delivery, the repo supports Electron desktop packaging, menu bar presence, wakeup shortcut, GitHub Releases update checks, and an optional .NET 10 backend proxy when desktop installations need local API key isolation.",
        ],
        detailImage: {
          kind: "gallery",
          alt: "DataToolkit demo gallery",
          logoSrc: "/images/projects/xml-toolkit/datatoolkit-mark.svg",
          logoAlt: "DataToolkit brand mark",
          images: [
            {
              src: "/images/projects/xml-toolkit/datatoolkit-demo-formatter.png",
              alt: "DataToolkit formatter workspace demo",
              label: "Formatter",
              caption:
                "Primary editing surface for formatting, minifying, and sorting XML, JSON, and Markdown input.",
            },
            {
              src: "/images/projects/xml-toolkit/datatoolkit-demo-compare.png",
              alt: "DataToolkit compare workspace demo",
              label: "Compare",
              caption:
                "Side-by-side diff workflow with AI summary support for reviewing structural and content changes.",
            },
            {
              src: "/images/projects/xml-toolkit/datatoolkit-demo-convert.png",
              alt: "DataToolkit convert workspace demo",
              label: "Convert",
              caption:
                "Conversion flow for switching between XML, JSON, and Markdown without leaving the same tool shell.",
            },
            {
              src: "/images/projects/xml-toolkit/datatoolkit-demo-visualize.png",
              alt: "DataToolkit visualize workspace demo",
              label: "Visualize",
              caption:
                "Tree-style inspection view for understanding nested data shape and structure more quickly.",
            },
          ],
        },
        previewNote:
          "Current previews use the four demo surfaces exported from the repo docs: Formatter, Compare, Convert, and Visualize.",
        feedback: {
          type: "github-issue",
          repoUrl: "https://github.com/anomo06822/xml-toolkit",
          emailOptional: true,
        },
        href: "https://github.com/anomo06822/xml-toolkit",
        hrefLabel: "View on GitHub",
        imageAlt: "DataToolkit project demo gallery",
        note: "The public repository name remains xml-toolkit, while the in-product surface and latest demo gallery now use the DataToolkit brand.",
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
  cloudCredentials: [],
  certifications: [
    {
      title: "Newegg Global Hackathon - 1st Place",
      issuer: "Newegg",
      year: "2021",
      note: "Most Valuable Project Award / Follow Seller",
    },
  ],
  experienceGallery: {
    intro:
      "From 2015 to 2026, this image timeline follows representative moments across QA automation, Newegg Business, Newegg Mobile, and First Horizon.",
    items: [
      {
        stageLabel: "QA / Newegg Business Foundation",
        title: "QA Automation Start",
        period: "2015.02",
        caption:
          "This photo marks the start of the QA automation chapter and the early system mindset that came with it.",
        imageAlt: "QA Automation stage placeholder for Newegg Business",
        imageSrc: "/images/experience-gallery/experience-01-qa-foundation-2015-02.jpg",
      },
      {
        stageLabel: "QA / Newegg Business Foundation",
        title: "Early Team Dinner",
        period: "2016.01",
        caption:
          "This early dinner captures the team rhythm from the automation period and the first steps toward cross-functional collaboration.",
        imageAlt: "Early Newegg Business team dinner photo",
        imageSrc: "/images/experience-gallery/experience-02-team-dinner-2016-01.jpg",
      },
      {
        stageLabel: "Newegg Business / Staff Engineer / Group Leader",
        title: "Backend Transition Offsite",
        period: "2016.05",
        caption:
          "This offsite sits at the start of the backend transition, when I began thinking in requirements and service boundaries.",
        imageAlt: "Early backend offsite photo for Newegg Business",
        imageSrc: "/images/experience-gallery/experience-03-team-offsite-2016-05.jpg",
      },
      {
        stageLabel: "Newegg Business / Staff Engineer / Group Leader",
        title: "Business Team Photo",
        period: "2016.09",
        caption:
          "This team photo reflects the Newegg Business phase, when backend delivery became the main track.",
        imageAlt: "Newegg Business team photo from 2016",
        imageSrc: "/images/experience-gallery/experience-04-team-photo-2016-09.jpg",
      },
      {
        stageLabel: "Newegg Business / Staff Engineer / Group Leader",
        title: "B2B Team Retreat",
        period: "2018.09",
        caption:
          "This retreat comes from the B2B platform phase, when the team was pushing service modularization and modernization.",
        imageAlt: "Newegg Business retreat photo from 2018",
        imageSrc: "/images/experience-gallery/experience-05-team-retreat-2018-09-a.jpg",
      },
      {
        stageLabel: "Newegg Business / Staff Engineer / Group Leader",
        title: "Engineering Offsite",
        period: "2018.09",
        caption:
          "This offsite matches the stretch when TDD, CI/CD, and performance work were becoming part of the team's default practice.",
        imageAlt: "Engineering offsite photo from Newegg Business in 2018",
        imageSrc: "/images/experience-gallery/experience-06-team-retreat-2018-09-b.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "Newegg Year-End Party",
        period: "2021.02.20",
        caption:
          "This year-end party captures an early Newegg Mobile moment, as the role was moving toward engineering leadership.",
        imageAlt: "Newegg year-end party photo from 2021",
        imageSrc: "/images/experience-gallery/experience-15-social-2026-03-a.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "TWET Team Dinner",
        period: "2021.10",
        caption:
          "This dinner records day-to-day TWET collaboration as the work expanded across mobile, desktop, and data platform coordination.",
        imageAlt: "TWET team dinner photo from 2021",
        imageSrc: "/images/experience-gallery/experience-07-mobile-team-dinner-2021-10.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "Cross-Product Offsite",
        period: "2022.09",
        caption:
          "This offsite captures cross-product collaboration as roadmap and release rhythm became more aligned.",
        imageAlt: "Cross-team engineering offsite photo from 2022",
        imageSrc: "/images/experience-gallery/experience-08-engineering-offsite-2022-09.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "TWET Team Building",
        period: "2022.10.15",
        caption:
          "This team-building event records the TWET collaboration mode behind steady public-product iteration.",
        imageAlt: "TWET team building photo from 2022",
        imageSrc: "/images/experience-gallery/experience-16-social-2026-03-b.jpg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "Team Retreat",
        period: "2023.11",
        caption:
          "This retreat reflects the stage when high-traffic product delivery depended on more mature leadership and cross-team coordination.",
        imageAlt: "Newegg retreat photo from 2023",
        imageSrc: "/images/experience-gallery/experience-09-team-retreat-2023-11.jpeg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "Newegg Team Gathering",
        period: "2024.01",
        caption:
          "This gathering records the late Newegg atmosphere, when multiple product lines were sharing more delivery rhythm and working habits.",
        imageAlt: "Newegg team gathering photo from 2024",
        imageSrc: "/images/experience-gallery/experience-10-newegg-team-2024-01.jpeg",
      },
      {
        stageLabel: "Newegg Mobile / Engineering Lead",
        title: "Newegg Office Reunion",
        period: "2025.01",
        caption:
          "This office reunion carried forward the Newegg team connection and became a postscript to that chapter.",
        imageAlt: "Newegg office reunion photo from 2025",
        imageSrc: "/images/experience-gallery/experience-11-newegg-office-2025-01.jpeg",
      },
      {
        stageLabel: "First Horizon / Platform Delivery",
        title: "First Horizon Team Kickoff",
        period: "2025.04",
        caption:
          "This kickoff captures the early First Horizon phase, when product needs, architecture, and delivery were being pulled onto one track.",
        imageAlt: "First Horizon team kickoff photo from 2025",
        imageSrc: "/images/experience-gallery/experience-12-sjc-team-2025-04.jpeg",
      },
      {
        stageLabel: "First Horizon / Platform Delivery",
        title: "SJC New Year Photo",
        period: "2026.01",
        caption:
          "This Lunar New Year photo records the period when the SJC team had settled into a more stable working rhythm.",
        imageAlt: "SJC new year team photo from 2026",
        imageSrc: "/images/experience-gallery/experience-13-sjc-new-year-2026-01.jpg",
      },
      {
        stageLabel: "First Horizon / Platform Delivery",
        title: "Platform Team Photo",
        period: "2026.02",
        caption:
          "This team photo captures the platform after delivery had moved into a steadier operating mode.",
        imageAlt: "SJC platform team snapshot from 2026",
        imageSrc: "/images/experience-gallery/experience-14-sjc-team-2026-02.jpg",
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
      "The personal experience PDF stays as the fast download format. This deck gives a more guided introduction to the same background and project context.",
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
