import { CalInlineEmbed } from "@/components/cal-inline-embed";
import styles from "@/components/contact-page.module.css";
import { EngagementProcess } from "@/components/engagement-process";
import { PageHero, secondaryPageStyles as pageStyles } from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";
import { getPrimaryContactAction, siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Kostenloses Erstgespräch buchen",
  description:
    "Buchen Sie ein kostenloses Erstgespräch von in der Regel 30 Minuten zu Ihrer Führungs-, Organisations- oder People-Frage.",
  path: "/de/contact",
  locale: "de_DE",
  languages: getLanguageAlternates("contact"),
});

export default function GermanContactPage() {
  const contactAction = getPrimaryContactAction("de");

  return (
    <div className={pageStyles.page} lang="de">
      <PageHero
        asideLabel="Erstes Gespräch"
        asideValue="Normalerweise 30 Minuten · kostenlos"
        breadcrumbs={[{ label: "Kontakt" }]}
        lead="Bringen Sie die Situation mit, bevor Sie ein Format gewählt oder eine Diagnose gestellt haben. Im Gespräch klären wir, ob ein nächster Schritt sinnvoll ist."
        primary={contactAction}
        ctaPrimary
        secondary={{
          label: "E-Mail schreiben",
          href: `mailto:${siteConfig.contact.email}`,
        }}
        title="Bringen Sie das Thema so mit, wie es gerade ist."
      />

      <section className={styles.startSection} aria-label="Terminbuchung">
        <div className={`${styles.startGrid} ${styles.startGridSingle}`}>
          <div className={styles.bookingColumn} id="booking">
            <div className={styles.startHeader}>
              <h2 id="booking-title">Wählen Sie einen Termin.</h2>
              <p>
                Das erste Gespräch ist kostenlos und dauert normalerweise 30 Minuten.
                Bezahlte Arbeit beginnt erst nach diesem Gespräch und einer schriftlichen Vereinbarung zum Umfang.
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
            <h2 id="direct-contact-title">Möchten Sie lieber direkt schreiben?</h2>
            <p>Schreiben Sie mir eine E-Mail, wenn ein Kalender nicht der einfachste Anfang ist.</p>
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
            <div>
              <dt>Standort</dt>
              <dd>Malta · europaweit tätig</dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={siteConfig.social.linkedin} rel="noreferrer" target="_blank">
                  Profil öffnen
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <EngagementProcess locale="de" title="Was danach passiert." />
    </div>
  );
}
