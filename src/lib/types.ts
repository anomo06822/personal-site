export const locales = ["zh-TW", "en"] as const;

export type Locale = (typeof locales)[number];
export type ThemeMode = "light" | "dark";
export type RouteKey = "home" | "projects" | "blog" | "resume" | "contact";
export type ContactIcon = "linkedin" | "github";

export type SiteConfig = {
  siteName: string;
  siteUrl: string;
  basePath: string;
  headerRoleLine: string;
  locales: readonly Locale[];
  defaultEntry: Locale;
  localeNames: Record<Locale, string>;
  siteDescription: Record<Locale, string>;
  navigation: Record<
    Locale,
    Array<{
      key: RouteKey;
      label: string;
      description: string;
    }>
  >;
  socialLinks: ContactLink[];
};

export type ResumeProfile = {
  name: string;
  englishName: string;
  locationLabel: string;
  portraitSrc: string;
  portraitAlt: string;
};

export type ResumePositioning = {
  headlinePrimary: string;
  headlineSecondary: string;
  openToRoles: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  impactBullets: string[];
  keywords: string[];
  logo?: {
    src: string;
    alt: string;
  };
};

export type ResumeImpactPoint = {
  value: string;
  label: string;
  detail: string;
};

export type FeaturedItem = {
  title: string;
  summary: string;
  proofPoints: string[];
  href?: string;
};

export type ProjectItem = {
  title: string;
  subtitle?: string;
  bullets: string[];
  tags?: string[];
};

export type ShowcaseProjectItem = {
  title: string;
  subtitle?: string;
  summary: string;
  bullets: string[];
  tags?: string[];
  href?: string;
  hrefLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  note?: string;
};

export type PersonalProjectDetailImage = {
  kind: "placeholder";
  alt: string;
};

export type PersonalProjectFeedback =
  | {
      type: "github-issue";
      repoUrl: string;
      emailOptional: true;
    }
  | {
      type: "disabled";
      message: string;
    };

export type PersonalProjectItem = ShowcaseProjectItem & {
  slug: string;
  detailIntro: string[];
  detailImage: PersonalProjectDetailImage;
  feedback: PersonalProjectFeedback;
};

export type ProjectShowcase = {
  personal: PersonalProjectItem[];
  core: ShowcaseProjectItem[];
};

export type HomeProofItem = {
  value: string;
  label: string;
  detail: string;
};

export type HomeGithubSignal = {
  title: string;
  subtitle: string;
  status: string;
  updatedLabel: string;
  summary: string;
  highlights: string[];
  tags?: string[];
  href?: string;
  hrefLabel?: string;
  note?: string;
};

export type HomeTeamGalleryItem = {
  title: string;
  contextLabel: string;
  caption: string;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "primary" | "secondary";
};

export type HomeSecondarySignal = {
  label: string;
  value: string;
  note?: string;
  href?: string;
  hrefLabel?: string;
};

export type HomePathwayItem = {
  routeKey: Exclude<RouteKey, "home" | "projects">;
  eyebrow: string;
  title: string;
  description: string;
  hrefLabel: string;
};

export type HomeContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  resumeCtaLabel: string;
  githubCtaLabel: string;
  proofBoardEyebrow: string;
  proofBoardTitle: string;
  homeProofBoard: HomeProofItem[];
  githubEyebrow: string;
  githubTitle: string;
  githubIntro: string;
  githubSignals: HomeGithubSignal[];
  secondarySignalsTitle?: string;
  secondarySignals?: HomeSecondarySignal[];
  teamEyebrow: string;
  teamTitle: string;
  teamIntro: string;
  teamGallery: HomeTeamGalleryItem[];
  leadershipProofTitle: string;
  leadershipProofs: HomeProofItem[];
  nextEyebrow: string;
  nextTitle: string;
  nextIntro: string;
  pathways: HomePathwayItem[];
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  note?: string;
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type ResumePdfContent = {
  fileName: string;
  summary: string[];
  featured: FeaturedItem[];
  projects: ProjectItem[];
};

export type ResumeContent = {
  profile: ResumeProfile;
  positioning: ResumePositioning;
  about: string[];
  highlights: ResumeImpactPoint[];
  experiences: ExperienceEntry[];
  topSkills: string[];
  topSkillGroups?: SkillGroup[];
  featured: FeaturedItem[];
  projectShowcase: ProjectShowcase;
  projects: ProjectItem[];
  certifications: Certification[];
  pdf: ResumePdfContent;
};

export type ContactLink = {
  label: string;
  href: string;
  icon: ContactIcon;
  localeLabel: Record<Locale, string>;
  note?: Record<Locale, string>;
};

export type BlogPostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
  published: boolean;
};

export type BlogPostFrontmatter = Omit<BlogPostMeta, "readingTime">;

export type BlogPost = {
  meta: BlogPostMeta;
  content: React.ReactNode;
};
