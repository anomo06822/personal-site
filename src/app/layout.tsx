import type { Metadata } from "next";
import Script from "next/script";
import { AnalyticsSlot } from "@/components/analytics-slot";
import { IBM_Plex_Mono, Noto_Sans_TC } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { defaultTheme, getThemeBootstrapScript } from "@/lib/theme";
import "./globals.css";

const bodyFont = Noto_Sans_TC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.siteName,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription.en,
  applicationName: siteConfig.siteName,
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.siteDescription.en,
    siteName: siteConfig.siteName,
    type: "website",
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.siteDescription.en,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${monoFont.variable}`}
      data-theme={defaultTheme}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {getThemeBootstrapScript()}
        </Script>
        {children}
        <AnalyticsSlot />
      </body>
    </html>
  );
}
