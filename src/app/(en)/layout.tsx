import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/inter";
import "../globals.css";

import { SiteShell } from "@/components/site-shell";
import { getSiteUrl, siteConfig } from "@/config/site";

const siteUrl = getSiteUrl();
const isVercelPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marc Berghoff | Leadership, organisation and coaching",
    template: "%s | Marc Berghoff",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: siteConfig.name,
    title: "Marc Berghoff | Leadership, organisation and coaching",
    description: siteConfig.description,
    images: [{ url: `${siteUrl}/social-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Berghoff | Leadership, organisation and coaching",
    description: siteConfig.description,
    images: [`${siteUrl}/social-image`],
  },
  robots: isVercelPreview
    ? { index: false, follow: false, noarchive: true }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f9fc",
  colorScheme: "light",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en-GB">
      <body>
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
