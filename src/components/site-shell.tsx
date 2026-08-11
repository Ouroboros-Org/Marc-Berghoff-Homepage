import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import type { SiteLocale } from "@/config/routes";
import { getSiteUrl, siteConfig } from "@/config/site";

const siteUrl = getSiteUrl();
const isVercelDeployment = Boolean(process.env.VERCEL);

export function SiteShell({
  children,
  locale,
}: Readonly<{ children: React.ReactNode; locale: SiteLocale }>) {
  const isGerman = locale === "de";
  const description = isGerman
    ? "Organisationspsychologe, Vistage Chair und Executive Coach für inhabergeführte Unternehmen vor ihrer nächsten Wachstumsphase."
    : siteConfig.description;

  return (
    <>
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: siteConfig.name,
            description,
            inLanguage: ["en", "de"],
            publisher: { "@id": `${siteUrl}/#marc-berghoff` },
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${siteUrl}/#marc-berghoff`,
            name: siteConfig.name,
            url: siteUrl,
            image: `${siteUrl}/images/portraits/marc-seated-original.webp`,
            jobTitle: isGerman
              ? "Organisationspsychologe · Vistage Chair · Executive Coach"
              : "Organisational Psychologist · Vistage Chair · Executive Coach",
            description,
            email: `mailto:${siteConfig.contact.email}`,
            ...(siteConfig.contact.phoneHref
              ? { telephone: siteConfig.contact.phoneHref }
              : {}),
            sameAs: [siteConfig.social.linkedin],
            knowsAbout: [
              "Leadership development",
              "People and organisation strategy",
              "Organisation design",
              "Fractional People Leadership",
              "Executive coaching",
              "Strategic people advisory",
              "Peer advisory",
            ],
          },
        ]}
      />
      <a className="skip-link" href="#main-content">
        {isGerman ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <SiteHeader locale={locale} />
      <main id="main-content">{children}</main>
      <SiteFooter locale={locale} />
      {isVercelDeployment ? <Analytics /> : null}
      {isVercelDeployment ? <SpeedInsights /> : null}
    </>
  );
}
