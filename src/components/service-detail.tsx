import type { ServiceDefinition } from "@/content/services";
import Image from "next/image";
import { SERVICE_LIST } from "@/content/services";
import { getPrimaryContactAction, getSiteUrl } from "@/config/site";
import { EngagementProcess } from "@/components/engagement-process";

import {
  ContactBand,
  Evidence,
  PageHero,
  PlainList,
  SectionHeading,
  TextLink,
  secondaryPageStyles as styles,
} from "./pages/editorial";
import { StructuredData } from "./structured-data";

export function ServiceDetail({ service }: { service: ServiceDefinition }) {
  const otherServices = SERVICE_LIST.filter((item) => item.slug !== service.slug);
  const siteUrl = getSiteUrl();
  const contactAction = getPrimaryContactAction();

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
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.eyebrow },
        ]}
        title={service.title}
        lead={service.summary}
        primary={contactAction}
        ctaPrimary={true}
        secondary={{ label: "See the working range", href: "/services" }}
      />

      <section className={styles.section} aria-labelledby="service-introduction">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <h2 className={styles.sectionTitle} id="service-introduction">
              {service.introductionHeading}
            </h2>
          </div>
          <div>
            <div className={styles.bodyCopy}>
              <p>{service.intro}</p>
              {service.boundary ? <p>{service.boundary}</p> : null}
            </div>
            <div className={styles.spacedTop}>
              <h3 className={styles.featureCardTitle}>This may fit if</h3>
              <PlainList items={service.forWhen} />
            </div>
          </div>
        </div>
      </section>

      {service.slug === "fractional-people-leadership" ? (
        <section className={styles.mediaBreak} aria-label="Fractional People Leadership setting">
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
            title={service.scopeHeading}
            intro={service.scopeIntro}
          />
          <ul className={styles.scopeGrid}>
            {service.workIncludes.map((item) => (
              <li className={styles.scopeItem} key={item}>
                <p className={styles.featureCardTitle}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EngagementProcess />

      {service.evidence && (
        <section className={styles.sectionDark} aria-label="Relevant experience">
          <div className={styles.container}>
            <Evidence label={service.evidence.label}>{service.evidence.statement}</Evidence>
          </div>
        </section>
      )}

      <section className={styles.section} aria-labelledby="related-services">
        <div className={styles.container}>
          <SectionHeading
            id="related-services"
            title="If another level of involvement fits better."
          />
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

      <ContactBand
        href={contactAction.href}
        label={contactAction.label}
        title={service.closing.title}
        text={service.closing.text}
      />
    </div>
  );
}
