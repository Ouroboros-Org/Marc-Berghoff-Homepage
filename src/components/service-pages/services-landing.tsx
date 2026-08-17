import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { EngagementProcess } from "@/components/engagement-process";
import {
  ContactBand,
  PageHero,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getPrimaryContactAction, getSiteUrl } from "@/config/site";
import { getWorkingFormats } from "@/content/working-formats";

import styles from "./services-landing.module.css";

const copy = {
  en: {
    breadcrumb: "How I can help",
    title: "The situation decides how involved I should be.",
    lead: [
      "Some problems need room to think. Others need a candid view from outside the reporting line.",
      "Sometimes the work needs an owner for a while. When nobody agrees on the cause, evidence comes first.",
    ],
    secondary: "Not sure where you sit? Take the 2-minute check",
    listTitle: "Five ways the work can continue.",
    listIntro:
      "The assessment comes first when the cause is disputed. The other four differ in one practical way: who carries the work afterwards.",
    descriptions: [
      "Your leadership team gives you three different accounts of the same problem, and you cannot tell which one is right. This finds out from evidence, then gives the team a finding it can act on.",
      "For leaders whose role has outgrown the way they currently lead. Individually, or as a group of leaders working on the same shift at the same time.",
      "For a question you can already see clearly and would rather not answer alone. I bring judgment from outside your reporting line. You decide.",
      "A room of leaders who do not report to each other, working on decisions each of them is facing. I chair the room and push for a decision.",
      "When the people work needs a senior owner now and hiring one is too slow or not yet justified. The scope, decision rights and end point are agreed at the start.",
    ],
    decisionTitle: "You do not have to choose a format.",
    decisionBody: [
      "Tell me what is happening. Choosing the format is part of the first conversation.",
      "If the cause is disputed, I usually recommend the assessment first so the team has evidence it can examine together.",
    ],
    closingTitle: "Tell me what is happening.",
    closingText:
      "Describe what is happening and what you have tried. I will tell you how involved I should be, if at all.",
  },
  de: {
    breadcrumb: "Zusammenarbeit",
    title: "Die Situation entscheidet, wie stark ich mich einbringen sollte.",
    lead: [
      "Manche Probleme brauchen Raum zum Denken. Bei anderen hilft eine offene Sicht von außerhalb der Berichtslinie.",
      "Manchmal braucht die Arbeit für eine Weile eine verantwortliche Person. Wenn sich niemand über die Ursache einig ist, kommen die Belege zuerst.",
    ],
    secondary: "Noch unsicher? Zum 2-Minuten-Check",
    listTitle: "Fünf Wege, wie die Arbeit weitergehen kann.",
    listIntro:
      "Wenn die Ursache umstritten ist, steht die Analyse zuerst. Bei den vier anderen Formaten geht es um eine praktische Frage: Wer trägt die Arbeit danach?",
    descriptions: [
      "Ihr Führungsteam schildert dasselbe Problem auf drei verschiedene Arten. Sie können nicht sagen, welche stimmt. Die Analyse prüft das anhand von Belegen und gibt dem Team einen Befund, mit dem es arbeiten kann.",
      "Für Führungskräfte, deren Rolle schneller gewachsen ist als die eigene Art zu führen. Einzeln oder als Gruppe, wenn mehrere Personen denselben Schritt gehen.",
      "Für eine klar erkennbare Frage, die Sie nicht allein beantworten möchten. Ich bringe Urteilskraft von außerhalb Ihrer Berichtslinie ein. Sie entscheiden.",
      "Führungskräfte ohne gegenseitige Berichtslinie arbeiten an den Entscheidungen, die gerade vor ihnen liegen. Ich leite die Runde und dränge auf eine klare Entscheidung.",
      "Wenn die People-Arbeit jetzt eine erfahrene Leitung braucht, eine Einstellung aber zu langsam oder noch nicht sinnvoll wäre. Umfang, Entscheidungsrechte und Endpunkt stehen von Anfang an fest.",
    ],
    decisionTitle: "Sie müssen das Format nicht selbst wählen.",
    decisionBody: [
      "Beschreiben Sie, was passiert. Die Wahl des Formats gehört zum ersten Gespräch.",
      "Wenn die Ursache umstritten ist, empfehle ich meist zuerst die Analyse. So hat das Team Belege, die es gemeinsam prüfen kann.",
    ],
    closingTitle: "Beschreiben Sie, was passiert.",
    closingText:
      "Schreiben Sie dazu, was Sie bereits versucht haben. Ich sage Ihnen, wie stark ich mich einbringen sollte, falls überhaupt.",
  },
} as const;

export function ServicesLanding({ locale }: { locale: SiteLocale }) {
  const pageCopy = copy[locale];
  const formats = getWorkingFormats(locale);
  const contactAction = getPrimaryContactAction(locale);
  const siteUrl = getSiteUrl();

  return (
    <div className={pageStyles.page} lang={locale}>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name:
            locale === "de"
              ? "Formate der Zusammenarbeit mit Marc Berghoff"
              : "Ways to work with Marc Berghoff",
          inLanguage: locale === "de" ? "de" : "en-GB",
          itemListElement: formats.map((offer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: offer.title,
              description: offer.summary,
              url: `${siteUrl}${offer.href}`,
              provider: { "@id": `${siteUrl}/#marc-berghoff` },
            },
          })),
        }}
      />

      <PageHero
        breadcrumbs={[{ label: pageCopy.breadcrumb }]}
        compact
        lead={
          <>
            {pageCopy.lead.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </>
        }
        primary={contactAction}
        ctaPrimary
        locale={locale}
        secondary={{
          label: pageCopy.secondary,
          href: `${getRouteHref("home", locale)}#diagnostic`,
        }}
        title={pageCopy.title}
      />

      <section
        aria-labelledby="service-options"
        className={`${pageStyles.section} ${styles.optionsSection}`}
      >
        <div className={pageStyles.container}>
          <div className={styles.header}>
            <h2 id="service-options">{pageCopy.listTitle}</h2>
            <p>{pageCopy.listIntro}</p>
          </div>
          <div className={styles.offerList}>
            {formats.map((offer, index) => (
              <Link className={styles.offer} href={offer.href} key={offer.href}>
                <span className={styles.offerIndex} aria-hidden="true">
                  {index + 1}
                </span>
                <div className={styles.offerHeading}>
                  <h3>{offer.title}</h3>
                  <p>{offer.responsibility}</p>
                </div>
                <p className={styles.offerDescription}>
                  {pageCopy.descriptions[index]}
                </p>
                <ArrowRight aria-hidden="true" size={22} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={pageStyles.sectionDark} aria-labelledby="format-decision">
        <div className={`${pageStyles.container} ${pageStyles.split}`}>
          <h2 className={pageStyles.sectionTitle} id="format-decision">
            {pageCopy.decisionTitle}
          </h2>
          <div className={pageStyles.bodyCopy}>
            {pageCopy.decisionBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <div id="process">
        <EngagementProcess locale={locale} />
      </div>

      <ContactBand
        href={contactAction.href}
        label={contactAction.label}
        locale={locale}
        text={pageCopy.closingText}
        title={pageCopy.closingTitle}
      />
    </div>
  );
}
