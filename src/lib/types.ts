export const locales = ["zh-TW", "en"] as const;

export type Locale = (typeof locales)[number];
export type ThemeMode = "light" | "dark";
export type RouteKey = "home" | "resume" | "blog" | "contact";
export type ContactIcon = "github" | "globe" | "note";

export type SiteConfig = {
  siteName: string;
  siteUrl: string;
  basePath: string;
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
  avatar: string;
};

export type ResumePositioning = {
  headline: string;
  targetRoles: string[];
  valueProposition: string;
  recruiterKeywords: string[];
};

export type ExperienceEmphasis = "featured" | "earlier";

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  mission: string;
  impactBullets: string[];
  keywords: string[];
  emphasis: ExperienceEmphasis;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ResumeImpactPoint = {
  value: string;
  label: string;
  detail: string;
};

export type SelectedWin = {
  title: string;
  period: string;
  summary: string;
  proofPoints: string[];
  tags: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  note?: string;
};

export type ResumeContent = {
  profile: ResumeProfile;
  positioning: ResumePositioning;
  executiveSummary: string[];
  selectedImpact: ResumeImpactPoint[];
  experiences: ExperienceEntry[];
  selectedWins: SelectedWin[];
  coreStack: SkillGroup[];
  certifications: Certification[];
  contactNote: string;
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
