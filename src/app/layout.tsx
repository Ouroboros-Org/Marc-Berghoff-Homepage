import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/inter";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { getSiteUrl, siteConfig } from "@/config/site";

const siteUrl = getSiteUrl();
const isVercelPreview = process.env.VERCEL_ENV === "preview";
const isVercelDeployment = Boolean(process.env.VERCEL);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marc Berghoff | Fractional Leadership",
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
    title: "Marc Berghoff | Fractional Leadership",
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Berghoff | Fractional Leadership",
    description: siteConfig.description,
    images: ["/opengraph-image"],
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>
        <StructuredData
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              url: siteUrl,
              name: siteConfig.name,
              description: siteConfig.description,
              inLanguage: "en",
              publisher: { "@id": `${siteUrl}/#marc-berghoff` },
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteUrl}/#marc-berghoff`,
              name: siteConfig.name,
              url: siteUrl,
              image: `${siteUrl}/images/portraits/marc-seated-original.jpg`,
              jobTitle: "Fractional Leadership Manager",
              description: siteConfig.description,
              email: `mailto:${siteConfig.contact.email}`,
              ...(siteConfig.contact.phoneHref
                ? { telephone: siteConfig.contact.phoneHref }
                : {}),
              sameAs: [siteConfig.social.linkedin],
              knowsAbout: [
                "Organisational bottlenecks",
                "People strategy",
                "Organisation design",
                "Fractional leadership",
                "Individual coaching",
              ],
            },
          ]}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {isVercelDeployment ? <Analytics /> : null}
        {isVercelDeployment ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
