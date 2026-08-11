import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  SectionHeading,
  TextLink,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import {
  getRouteHref,
  type LocalizedRouteId,
  type SiteLocale,
} from "@/config/routes";
import { getSiteUrl } from "@/config/site";

type RelatedLink = {
  routeId: Exclude<LocalizedRouteId, "home" | "services" | "contact">;
  label: string;
  text: string;
};

export function ServiceStructuredData({
  locale,
  routeId,
  name,
  description,
}: {
  locale: SiteLocale;
  routeId: RelatedLink["routeId"];
  name: string;
  description: string;
}) {
  const siteUrl = getSiteUrl();

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        inLanguage: locale === "de" ? "de" : "en-GB",
        url: `${siteUrl}${getRouteHref(routeId, locale)}`,
        provider: { "@id": `${siteUrl}/#marc-berghoff` },
        areaServed: "Europe",
        audience: {
          "@type": "BusinessAudience",
          audienceType:
            locale === "de"
              ? "Gründer und Führungsteams in wachsenden Unternehmen"
              : "Founders and leadership teams in growing companies",
        },
      }}
    />
  );
}

export function CompactProcess({
  locale,
  id,
}: {
  locale: SiteLocale;
  id: string;
}) {
  const copy =
    locale === "de"
      ? {
          title: "So beginnt die Zusammenarbeit.",
          summary:
            "Ein kostenloses Erstgespräch, normalerweise 30 Minuten. Vor jeder bezahlten Arbeit erhalten Sie eine schriftliche Vereinbarung zum Umfang. Dann beginnt die Arbeit mit einem festgelegten Endpunkt. Wenn ich nicht der Richtige bin, sage ich das.",
          link: "Den vollständigen Ablauf ansehen",
        }
      : {
          title: "How the work starts.",
          summary:
            "A free first conversation, typically 30 minutes. A written scope before any paid work. Then the work itself, with a defined end point. If I am not the right person, I will say so.",
          link: "See the full process",
        };

  return (
    <section className={styles.sectionTint} aria-labelledby={id}>
      <div className={`${styles.container} ${styles.split}`}>
        <div>
          <h2 className={styles.sectionTitle} id={id}>
            {copy.title}
          </h2>
        </div>
        <div className={styles.bodyCopy}>
          <p>{copy.summary}</p>
          <div className={styles.smallSpacedTop}>
            <TextLink href={getRouteHref("services", locale, "#process")}>
              {copy.link}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AdjacentServiceLinks({
  locale,
  id,
  links,
}: {
  locale: SiteLocale;
  id: string;
  links: readonly RelatedLink[];
}) {
  const heading =
    locale === "de"
      ? "Wenn die Situation in eine andere Richtung zeigt."
      : "If the situation points elsewhere.";

  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.container}>
        <SectionHeading id={id} title={heading} />
        <div className={styles.relatedList}>
          {links.map((item) => (
            <Link
              className={styles.relatedLink}
              href={getRouteHref(item.routeId, locale)}
              key={item.routeId}
            >
              <div>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
              <ArrowRight aria-hidden="true" size={22} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
