export const locales = ["zh-TW", "en"] as const;

export type Locale = (typeof locales)[number];
export type ThemeMode = "light" | "dark";
export type RouteKey = "home" | "resume" | "blog" | "contact";
export type ContactIcon = "linkedin" | "github" | "career";

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
  openToRoles: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  impactBullets: string[];
  keywords: string[];
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

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  note?: string;
};

export type ResumeContent = {
  profile: ResumeProfile;
  positioning: ResumePositioning;
  about: string[];
  highlights: ResumeImpactPoint[];
  experiences: ExperienceEntry[];
  topSkills: string[];
  featured: FeaturedItem[];
  projects: ProjectItem[];
  certifications: Certification[];
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
