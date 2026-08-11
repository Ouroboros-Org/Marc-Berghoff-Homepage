import { CalInlineEmbed } from "@/components/cal-inline-embed";
import styles from "@/components/contact-page.module.css";
import { EngagementProcess } from "@/components/engagement-process";
import { ProgressiveContactForm } from "@/components/forms";
import { PageHero, secondaryPageStyles as pageStyles } from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";
import { getPrimaryContactAction, siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Kostenloses Erstgespräch buchen",
  description:
    "Buchen Sie ein kostenloses 30-minütiges Erstgespräch oder schreiben Sie ein paar Sätze zu Ihrer Führungs-, Organisations- oder People-Frage.",
  path: "/de/contact",
  locale: "de_DE",
  languages: getLanguageAlternates("contact"),
});

export default async function GermanContactPage({
  searchParams,
}: {
  searchParams: Promise<{ details?: string }>;
}) {
  const { details } = await searchParams;
  const initialDetailsOpen = details === "open";
  const contactAction = getPrimaryContactAction("de");

  return (
    <div className={pageStyles.page} lang="de">
      <PageHero
        asideLabel="Erstes Gespräch"
        asideValue="Normalerweise 30 Minuten · kostenlos"
        breadcrumbs={[{ label: "Kontakt" }]}
        lead="Sie brauchen vorher kein passendes Format zu wählen. Buchen Sie unten einen Termin oder schreiben Sie ein paar Sätze, wenn Ihnen das leichter fällt."
        locale="de"
        primary={contactAction}
        ctaPrimary
        secondary={{
          label: "Nachricht senden",
          href: "#contact-form",
        }}
        title="Bringen Sie das Thema so mit, wie es gerade ist."
      />

      <section className={styles.startSection} aria-label="Kontakt und Terminbuchung">
        <div className={styles.startGrid}>
          <div className={styles.formColumn}>
            <div className={styles.formShell}>
              <ProgressiveContactForm
                initialDetailsOpen={initialDetailsOpen}
                locale="de"
              />
            </div>
          </div>
          <div className={styles.bookingColumn} id="booking">
            <div className={styles.startHeader}>
              <h2 id="booking-title">Wählen Sie einen Termin.</h2>
              <p>
                Das Gespräch ist kostenlos und dauert normalerweise 30 Minuten. Wir
                nutzen die Zeit, um die Frage zu verstehen und zu entscheiden, ob und
                wie es danach weitergehen sollte.
              </p>
            </div>
            <CalInlineEmbed calLink={siteConfig.contact.calLink} locale="de" />
          </div>
        </div>
      </section>

      <section
        className={styles.directSection}
        id="direct-contact"
        aria-labelledby="direct-contact-title"
      >
        <div className={styles.container}>
          <div className={styles.directHeader}>
            <h2 id="direct-contact-title">
              Wenn das Formular im Weg ist, melden Sie sich direkt.
            </h2>
            <p>Nutzen Sie den Weg, der für Sie einfacher ist.</p>
          </div>
          <dl className={styles.directList}>
            <div>
              <dt>E-Mail</dt>
              <dd>
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            {siteConfig.contact.phoneHref && siteConfig.contact.phoneDisplay ? (
              <div>
                <dt>Telefon</dt>
                <dd>
                  <a href={`tel:${siteConfig.contact.phoneHref}`}>
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt>Standort</dt>
              <dd>Malta · international tätig</dd>
            </div>
          </dl>
        </div>
      </section>

      <EngagementProcess locale="de" title="Was als Nächstes passiert." />
    </div>
  );
}
