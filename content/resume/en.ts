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
      "Tech Lead / Backend Architect | Platform Architecture, Engineering Delivery, and Operable Systems",
    targetRoles: ["Tech Lead", "Backend Architect", "Platform Engineering Lead"],
    valueProposition:
      "Builds maintainable engineering systems by aligning platform architecture, delivery workflows, and cross-functional execution from greenfield setup through steady-state operations.",
    recruiterKeywords: [
      "Backend Architecture",
      "Platform Engineering",
      "Engineering Delivery",
      "Azure DevOps",
      "Observability",
      "E-commerce Systems",
      "Cross-functional Leadership",
    ],
  },
  executiveSummary: [
    "10+ years across large-scale commerce platforms, backend systems, and engineering delivery, with recent focus on architecture leadership and operable system design.",
    "Works effectively in both greenfield logistics and global e-commerce environments, connecting architecture decisions, delivery process, quality discipline, and stakeholder alignment into systems that can launch, run, and evolve.",
  ],
  selectedImpact: [
    {
      value: "10+",
      label: "years in platform and commerce systems",
      detail: "Progressed from QA automation into backend engineering, staff engineering, and platform leadership.",
    },
    {
      value: "20+",
      label: "engineers across delivery scope",
      detail: "Worked across mobile, desktop, backend, and data-service environments with shared delivery ownership.",
    },
    {
      value: "1M+",
      label: "downloads on supported products",
      detail: "Operated public-facing mobile products with ongoing release, notification, and reliability ownership.",
    },
    {
      value: "99.9%",
      label: "crash-free users",
      detail: "Sustained product reliability while improving push quality and performance signals.",
    },
  ],
  experiences: [
    {
      company: "SJ Challenger Taiwan",
      role: "Assistant Project Manager / Tech Lead",
      period: "2024.04 - Present",
      location: "Taichung, Taiwan",
      mission:
        "Leading a new logistics platform from architecture through delivery and operations, while keeping project execution and engineering structure on the same track.",
      impactBullets: [
        "Built First Horizon from 0 to first delivery with Next.js, .NET Core, CQRS, and Vertical Slice architecture, shaping both domain boundaries and delivery flow from the start.",
        "Established Azure DevOps CI/CD, deployment automation, and Azure environment planning so the platform could ship repeatedly with clearer operational control.",
        "Introduced Prometheus, Grafana, Jaeger, and a more explicit cross-functional operating rhythm, bringing diagnostics, observability, and delivery accountability into one system.",
      ],
      keywords: [
        "Next.js",
        ".NET Core",
        "CQRS",
        "Azure",
        "Azure DevOps",
        "Observability",
      ],
      emphasis: "featured",
    },
    {
      company: "Newegg Taiwan",
      role: "Engineering Lead",
      period: "2020.04 - 2024.04",
      location: "Taichung, Taiwan",
      mission:
        "Led engineering execution across mobile, desktop, and data services in a global e-commerce setting, balancing product reliability with delivery pace.",
      impactBullets: [
        "Coordinated B2C mobile, B2B desktop, and backend data-service work across a 20+ engineer environment to keep multiple product lines moving on a shared delivery rhythm.",
        "Supported hybrid mobile products sustaining a 4.6 App Store rating, 1M+ downloads, and 99.9% crash-free users.",
        "Improved Android push open rate from 2% to 5% and reduced invalid device tokens by 33%, while also improving mobile web performance and Core Web Vitals.",
      ],
      keywords: [
        "React Native",
        "React",
        "Engineering Leadership",
        "Analytics",
        "SEO",
        "Push Notifications",
      ],
      emphasis: "featured",
    },
    {
      company: "Newegg Taiwan",
      role: "Staff Engineer",
      period: "2016.04 - 2020.04",
      location: "Taichung, Taiwan",
      mission:
        "Owned core B2B commerce services and pushed the platform toward a more testable, modern delivery model.",
      impactBullets: [
        "Built core account, shopping, and order-processing services that supported key B2B transaction flows.",
        "Integrated 4 major business and payment capabilities, including PayPal, MasterPass, e-procurement, and Net Terms.",
        "Introduced unit testing, TDD, CI/CD, and migration work from .NET Framework to .NET Core, reducing regression cost and improving modernization readiness.",
      ],
      keywords: [
        "C#",
        ".NET Core",
        "B2B Commerce",
        "MS SQL",
        "CI/CD",
        "System Integration",
      ],
      emphasis: "featured",
    },
    {
      company: "Newegg Taiwan",
      role: "QA Automation Engineer",
      period: "2013.04 - 2016.04",
      location: "Taichung, Taiwan",
      mission:
        "Started in test automation, building a system-level view of quality, operational risk, and failure patterns before moving into backend engineering.",
      impactBullets: [
        "Built API and UI automation with SoapUI, Postman, Selenium, and Nightwatch to reduce repetitive regression work.",
        "Created reusable test-data and validation scripts to speed up defect reproduction and verification.",
        "Carried the QA perspective forward into backend work with stronger discipline around system behavior and risk.",
      ],
      keywords: [
        "SoapUI",
        "Postman",
        "Selenium",
        "Nightwatch",
        "Automation",
        "Regression Testing",
      ],
      emphasis: "earlier",
    },
  ],
  selectedWins: [
    {
      title: "First Horizon Logistics Platform",
      period: "2024 - Present",
      summary:
        "Treated architecture, delivery, and observability as a single design problem so operability was built in from day one instead of patched in later.",
      proofPoints: [
        "Defined the initial frontend/backend architecture, domain boundaries, and delivery operating model.",
        "Made CI/CD, deployment flow, and observability part of day-one execution rather than a later maturity project.",
        "Created a platform that could move quickly without leaving behind an unmaintainable engineering base.",
      ],
      tags: ["Greenfield Platform", "Azure", ".NET", "Next.js"],
    },
    {
      title: "Mobile Reliability and Growth Improvements",
      period: "2020 - 2024",
      summary:
        "Long-running improvement work across shipped products, balancing reliability, performance, and engagement metrics instead of optimizing for only one side.",
      proofPoints: [
        "Supported daily quality and release expectations for products with 1M+ downloads.",
        "Maintained 99.9% crash-free users while improving mobile web performance signals.",
        "Moved push open rate from 2% to 5% and reduced invalid device tokens by 33%.",
      ],
      tags: ["Mobile Reliability", "Performance", "Analytics"],
    },
    {
      title: "Newegg Global Hackathon - Follow Seller",
      period: "2021",
      summary:
        "Validated a product concept under tight constraints, coordinated cross-functional work quickly, and converted the prototype into a production outcome.",
      proofPoints: [
        "Delivered a working prototype inside a 3-day sprint.",
        "Won 1st Place and Most Valuable Project Award at the global hackathon.",
        "Extended the concept into a shipped production feature.",
      ],
      tags: ["Hackathon", "Product Delivery", "Leadership"],
    },
  ],
  coreStack: [
    {
      title: "Backend / Service Design",
      items: ["C#", ".NET Core", "ASP.NET Core", "REST API", "Domain Modeling"],
    },
    {
      title: "Platform Architecture",
      items: [
        "CQRS",
        "Monorepo",
        "Vertical Slice Architecture",
        "Distributed Systems Design",
      ],
    },
    {
      title: "Cloud / Delivery",
      items: [
        "Microsoft Azure",
        "Azure DevOps",
        "Docker",
        "Kubernetes",
        "CI/CD",
      ],
    },
    {
      title: "Product / Reliability",
      items: ["Next.js", "React", "React Native", "Observability", "Performance"],
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
      note: "Follow Seller / Most Valuable Project Award",
    },
  ],
  contactNote:
    "Direct personal contact details are intentionally omitted from this public site. Public links stay available here.",
};
