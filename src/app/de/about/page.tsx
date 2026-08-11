import Image from "next/image";

import { EngagementProcess } from "@/components/engagement-process";
import {
  ContactBand,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates, getRouteHref } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Über mich",
  description:
    "Ich arbeite mit Gründerinnen, Gründern und Führungsteams, wenn aus einer Führungsfrage ein Problem im operativen Alltag geworden ist.",
  path: "/de/about",
  locale: "de_DE",
  languages: getLanguageAlternates("about"),
});

const credentials = [
  {
    title: "MSc in Psychologie",
    text: "Ich habe einen MSc in Psychologie. Meine Arbeit hier bezieht sich auf Organisationen, nicht auf klinische Fragen.",
  },
  {
    title: "ICF Associate Certified Coach",
    text: "Ich bin aktuell als ACC zertifiziert und bringe mehr als 350 Stunden Coachingpraxis mit.",
  },
  {
    title: "Vistage Chair",
    text: "Ich leite in Malta eine Vistage Peer-Advisory-Gruppe für Unternehmensinhaber.",
  },
  {
    title: "Dozent",
    text: "Ich lehre in den Bereichen Training und Entwicklung sowie Organisationsführung.",
  },
] as const;

const principles = [
  {
    title: "Mit der aktuellen Entscheidung beginnen",
    text: "Ich möchte wissen, was passiert ist, bei wem die Entscheidung zuerst lag und wo sie danach gelandet ist. So arbeiten wir an etwas Konkretem.",
  },
  {
    title: "Belege für eine Entscheidung nutzen",
    text: "Eine Messung lohnt sich, wenn jemand dadurch etwas klarer sehen oder anders entscheiden kann. Ein Bericht ohne diesen Bezug hilft bei der Entscheidung nicht.",
  },
  {
    title: "Fortschritt sichtbar machen",
    text: "Im Coaching halten wir fest, was Sie anders handhaben möchten und woran Sie in Ihrer Arbeitswoche erkennen, dass sich etwas verändert.",
  },
  {
    title: "Die passende Methode wählen",
    text: "Ich beginne bei der Frage und setze eine Methode nur ein, wenn sie hilft. Das können zum Beispiel OKRs oder Scaling Up sein.",
  },
] as const;

export default function GermanAboutPage() {
  const contactAction = getPrimaryContactAction("de");

  return (
    <div className={styles.page} lang="de">
      <PageHero
        breadcrumbs={[{ label: "Über mich" }]}
        title="Wenn das Problem dort liegt, wo Menschen und Arbeitsweise zusammenkommen."
        lead="Ich arbeite mit Gründerinnen, Gründern und Führungsteams, wenn aus einer People-Frage ein Problem im operativen Alltag geworden ist. Manchmal reichen Coaching oder Beratung. Manchmal braucht es Belege und einen klar umrissenen Auftrag."
        asideLabel="Arbeitsrahmen"
        asideValue="Vom Coaching bis zum klaren Auftrag"
        asideNote="Auf Malta ansässig. International tätig."
        primary={contactAction}
        ctaPrimary
        secondary={{
          label: "Check mit zehn Aussagen starten",
          href: getRouteHref("home", "de", "#diagnostic"),
        }}
        locale="de"
      />

      <section className={styles.section} aria-label="Biografie von Marc Berghoff">
        <div className={`${styles.container} ${styles.split}`}>
          <figure>
            <div className={styles.portraitImageWrap}>
              <Image
                className={styles.portraitImage}
                src="/images/portraits/marc-seated-original.webp"
                alt="Marc Berghoff sitzt in einem Büro"
                fill
                sizes="(max-width: 928px) calc(100vw - 2rem), 38vw"
              />
            </div>
            <figcaption className={styles.portraitCaption}>
              <span>Marc Berghoff</span>
              <span>Organisationspsychologe · Vistage Chair · Executive Coach</span>
            </figcaption>
          </figure>
          <div>
            <h2 className={styles.sectionTitle}>
              Erfahrung auf beiden Seiten des Gesprächs.
            </h2>
            <div className={`${styles.bodyCopy} ${styles.spacedTop}`}>
              <p>
                Ich arbeite seit fast einem Jahrzehnt in HR, Coaching und
                Organisationsentwicklung: in Unternehmen und selbstständig. Ich habe HR
                in einem schnell wachsenden Unternehmen geleitet, HR interimistisch
                geführt und CyberKongz mitgegründet.
              </p>
              <p>
                Ich möchte wissen, was in der letzten Besprechung passiert ist, welchen
                Weg die Entscheidung genommen hat und wer sie am Ende übernehmen musste.
                Wenn ich genug Kontext habe, sage ich Ihnen offen, wie ich die Sache
                einschätze.
              </p>
              <p>
                Wenn ich für Ihre Frage nicht der Richtige bin, sage ich das. Und wenn
                ich jemanden sinnvoll empfehlen kann, tue ich das.
              </p>
              <p>
                Außerhalb der Arbeit lese oder klettere ich meist, lerne neue Kulturen
                kennen oder feile an meinem Chilaquiles-Rezept.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="about-credentials">
        <div className={styles.container}>
          <SectionHeading
            id="about-credentials"
            title="Ausbildung, Praxis und Erfahrung in operativer Verantwortung."
          />
          <div className={styles.credentialGrid}>
            {credentials.map((credential) => (
              <article className={styles.credentialCard} key={credential.title}>
                <h3 className={styles.credentialTitle}>{credential.title}</h3>
                <p>{credential.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="working-principles">
        <div className={styles.container}>
          <SectionHeading id="working-principles" title="Worauf ich achte." />
          <div className={`${styles.cardGrid} ${styles.cardGridTwo}`}>
            {principles.map((principle) => (
              <article className={styles.darkCard} key={principle.title}>
                <h3 className={styles.featureCardTitle}>{principle.title}</h3>
                <p className={styles.sectionIntro}>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EngagementProcess locale="de" />

      <ContactBand
        href={contactAction.href}
        title="Bringen Sie die Entscheidung mit, die immer wieder bei Ihnen landet."
        text="Das erste Gespräch ist kostenlos und dauert normalerweise 30 Minuten. Ich nutze es, um Ihre Frage zu verstehen und offen zu sagen, ob ich der Richtige dafür bin."
        label={contactAction.label}
        locale="de"
      />
    </div>
  );
}
