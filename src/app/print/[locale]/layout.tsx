import { notFound } from "next/navigation";
import { isLocale, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export default async function PrintLocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return children;
}
