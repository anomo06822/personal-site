import type { ResumeContent } from "../../src/lib/types";

export const resumeEn: ResumeContent = {
  profile: {
    name: "黃智偉",
    englishName: "Jarvis Huang",
    locationLabel: "Taiwan",
    avatar: "JH",
  },
  positioning: {
    headline:
      "Senior Backend Engineer | Tech Lead | Engineering Manager | .NET | Azure | E-commerce Platforms",
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
};
