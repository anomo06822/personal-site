export const locales = ["zh-TW", "en"] as const;

export type Locale = (typeof locales)[number];
export type ThemeMode = "light" | "dark";
export type RouteKey = "home" | "projects" | "blog" | "resume" | "contact";
export type ContactIcon = "linkedin" | "github" | "email";

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
} | {
  kind: "gallery";
  alt: string;
  logoSrc?: string;
  logoAlt?: string;
  images: Array<{
    src: string;
    alt: string;
    label: string;
    caption: string;
  }>;
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
  previewNote?: string;
  feedback: PersonalProjectFeedback;
};

export type ProjectShowcase = {
  personal: PersonalProjectItem[];
  core: ShowcaseProjectItem[];
};

export type HomeTabItem = {
  routeKey: RouteKey;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  hrefLabel: string;
};

export type HomeJourneyItem = {
  audience: string;
  title: string;
  summary: string;
  routeKeys: RouteKey[];
  note: string;
};

export type HomeGuideItem = {
  eyebrow: string;
  title: string;
  description: string;
};

export type HomeContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  heroTags: string[];
  heroNoticeTitle: string;
  heroNoticeBody: string;
  heroMapEyebrow: string;
  heroMapIntro: string;
  tabsEyebrow: string;
  tabsTitle: string;
  tabsIntro: string;
  tabs: HomeTabItem[];
  journeysEyebrow: string;
  journeysTitle: string;
  journeysIntro: string;
  journeys: HomeJourneyItem[];
  guideEyebrow: string;
  guideTitle: string;
  guideIntro: string;
  guideItems: HomeGuideItem[];
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

export type ExperienceGalleryItem = {
  stageLabel: string;
  title: string;
  period: string;
  caption: string;
  imageAlt: string;
  imageSrc?: string;
};

export type ExperienceGalleryContent = {
  intro: string;
  items: ExperienceGalleryItem[];
};

export type ResumePresentationContent = {
  fileName: string;
  title: string;
  summary: string;
  previewImageSrc?: string;
  previewImageAlt: string;
  slideCount: number;
  languageLabel?: string;
  note?: string;
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
  presentation?: ResumePresentationContent;
  experienceGallery?: ExperienceGalleryContent;
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
