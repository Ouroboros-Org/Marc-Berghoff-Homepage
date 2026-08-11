import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/inter";
import "../globals.css";

import { SiteShell } from "@/components/site-shell";
import { getSiteUrl, siteConfig } from "@/config/site";

const siteUrl = getSiteUrl();
const isVercelPreview = process.env.VERCEL_ENV === "preview";
const description =
  "Für inhabergeführte Unternehmen vor ihrer nächsten Wachstumsphase. Ich finde heraus, was das Unternehmen bremst, bevor jemand mit der nächsten Lösung beginnt.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marc Berghoff | Führung, Organisation und Coaching",
    template: "%s | Marc Berghoff",
  },
  description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/de" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/de",
    siteName: siteConfig.name,
    title: "Marc Berghoff | Führung, Organisation und Coaching",
    description,
    images: [{ url: `${siteUrl}/de/social-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Berghoff | Führung, Organisation und Coaching",
    description,
    images: [`${siteUrl}/de/social-image`],
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

export default function GermanRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="de">
      <body>
        <SiteShell locale="de">{children}</SiteShell>
      </body>
    </html>
  );
}
