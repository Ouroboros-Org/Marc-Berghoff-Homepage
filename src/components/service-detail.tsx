import type { ServiceDefinition } from "@/content/services";
import Image from "next/image";
import { SERVICE_LIST } from "@/content/services";
import { getSiteUrl } from "@/config/site";

import {
  ContactBand,
  Evidence,
  PageHero,
  PlainList,
  ProcessList,
  SectionHeading,
  TextLink,
  secondaryPageStyles as styles,
} from "./pages/editorial";
import { StructuredData } from "./structured-data";

export function ServiceDetail({ service }: { service: ServiceDefinition }) {
  const otherServices = SERVICE_LIST.filter((item) => item.slug !== service.slug);
  const siteUrl = getSiteUrl();
  const introductionHeading = {
    advisory: "Use advisory when the decision is already defined.",
    "fractional-people-leadership":
      "Use a fractional remit when the work needs an owner.",
    "executive-coaching": "Use coaching when the question belongs with one leader.",
  }[service.slug];

  return (
    <div className={styles.page}>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.eyebrow,
          description: service.summary,
          url: `${siteUrl}/${service.slug}`,
          provider: { "@id": `${siteUrl}/#marc-berghoff` },
          areaServed: "International",
          audience: {
            "@type": "BusinessAudience",
            audienceType: "Founders and leadership teams in growing companies",
          },
        }}
      />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        lead={service.summary}
        primary={{ label: "Request a free conversation", href: "/contact" }}
        secondary={{ label: "Compare all services", href: "/services" }}
      />

      <section className={styles.section} aria-labelledby="service-introduction">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <p className={styles.sectionKicker}>Where it fits</p>
            <h2 className={styles.sectionTitle} id="service-introduction">
              {introductionHeading}
            </h2>
          </div>
          <div>
            <div className={styles.bodyCopy}>
              <p>{service.intro}</p>
            </div>
            <div className={styles.spacedTop}>
              <p className={styles.cardKicker}>This may fit when</p>
              <PlainList items={service.forWhen} />
            </div>
          </div>
        </div>
      </section>

      {service.slug === "fractional-people-leadership" ? (
        <section className={styles.mediaBreak} aria-label="Fractional leadership setting">
          <div className={styles.container}>
            <figure className={styles.editorialFigure}>
              <div className={styles.editorialImageWrap}>
                <Image
                  className={styles.editorialImage}
                  src="/images/generated/leadership-room.webp"
                  alt="Illustrative empty meeting room prepared for a leadership conversation"
                  fill
                  sizes="(max-width: 1184px) calc(100vw - 2rem), 1184px"
                />
              </div>
              <figcaption className={styles.portraitCaption}>
                <span>Illustrative setting</span>
                <span>No client meeting is shown</span>
              </figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <section className={styles.sectionTint} aria-labelledby="service-scope">
        <div className={styles.container}>
          <SectionHeading
            id="service-scope"
            kicker="Scope"
            title="The remit follows the business question."
            intro="These are common areas of work. The proposal records what is in scope for your engagement."
          />
          <ul className={styles.cardGrid}>
            {service.workIncludes.map((item) => (
              <li className={styles.featureCard} key={item}>
                <p className={styles.featureCardTitle}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="service-approach">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <p className={styles.sectionKicker}>Working rhythm</p>
            <h2 className={styles.sectionTitle} id="service-approach">
              What to expect once the remit is agreed.
            </h2>
          </div>
          <ProcessList steps={service.approach} />
        </div>
      </section>

      {service.evidence && (
        <section className={styles.sectionDark} aria-label="Relevant experience">
          <div className={styles.container}>
            <Evidence label={service.evidence.label}>{service.evidence.statement}</Evidence>
          </div>
        </section>
      )}

      <section className={styles.section} aria-labelledby="related-services">
        <div className={styles.container}>
          <SectionHeading id="related-services" kicker="Related services" title="If the question sits elsewhere." />
          <div className={`${styles.cardGrid} ${styles.cardGridTwo}`}>
            {otherServices.map((item) => (
              <article className={styles.featureCard} key={item.slug}>
                <p className={styles.cardKicker}>{item.eyebrow}</p>
                <h3 className={styles.featureCardTitle}>{item.title}</h3>
                <p>{item.summary}</p>
                <div className={styles.smallSpacedTop}>
                  <TextLink href={`/${item.slug}`}>Read about {item.eyebrow.toLowerCase()}</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactBand title={service.closing.title} text={service.closing.text} />
    </div>
  );
}
