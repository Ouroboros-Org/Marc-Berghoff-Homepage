import Image from "next/image";

import { DiagnosticDisclosure } from "@/components/diagnostic-disclosure";
import { BottleneckDiagnostic } from "@/components/diagnostic";
import {
  CheckList,
  ContactBand,
  Evidence,
  PageHero,
  ProcessList,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";

import {
  AdjacentServiceLinks,
  CompactProcess,
  ServiceStructuredData,
} from "./shared";

const copy = {
  en: {
    breadcrumbServices: "Services",
    breadcrumbPage: "Bottleneck Assessment",
    title: "When you can feel the issue but cannot yet point to it.",
    lead: "The Bottleneck Assessment is one way to stop guessing. I compare what people experience with how decisions and work actually move, then give the leadership team a focused finding to test.",
    secondary: "Take the 2-minute check",
    signalsTitle: "Use the assessment when the cause is still open.",
    signalsBody:
      "If you can already name the decision, advice may be enough. If one leader owns the change, coaching may fit better. I use the assessment when several explanations are competing and the answer needs evidence from beyond one person's view.",
    signalsHeading: "Common signals",
    signals: [
      "Responsibilities and tasks end up on your table when they reasonably should not.",
      "People ask permission for decisions they are already paid to make.",
      "You have a capable team but still feel like the only person seeing the full picture.",
      "You know the work could move faster, but cannot name what is stopping it.",
      "An issue you have raised more than once is still exactly where you left it.",
    ],
    flowTitle: "What actually happens.",
    flowIntro:
      "The fieldwork is deliberately compact. The leadership team still gets time to challenge the finding before deciding what to do.",
    flow: [
      {
        title: "Agree the question",
        description:
          "A 30-minute conversation sets the question the assessment needs to answer.",
      },
      {
        title: "Hear the team separately",
        description:
          "I speak with people across the team, usually for 90 minutes each. A short questionnaire sits alongside those conversations.",
      },
      {
        title: "Check in before the workshop",
        description:
          "You and I spend 20–30 minutes on the emerging finding. Nothing in the workshop should surprise you.",
      },
      {
        title: "Write the report",
        description:
          "The report sets out the main finding, likely causes, operating cost and the evidence behind each point.",
      },
      {
        title: "Work through it together",
        description:
          "The leadership team tests the evidence in a workshop and decides what it will do next.",
      },
    ],
    timingLabel: "Typical timing",
    timing: "Two to three weeks from kickoff to workshop.",
    confidentialityTitle: "What your team says is not handed back as a transcript.",
    confidentialityBody: [
      "Individual comments are aggregated or paraphrased. They are not attributed in the report.",
      "The material stays separate from employee performance files. This is an organisational assessment, not a route into individual evaluation.",
      "Clinical and medical diagnosis sits outside the scope. If the question needs that expertise, I will say so.",
    ],
    reportTitle: "The report is written to be disagreed with.",
    reportBody: [
      "It sets out what I found, what is likely causing it and what it is costing the organisation. The evidence sits beside the finding, so the team can argue with the evidence instead of arguing with me.",
      "Then we sit down together and work through it. This is often the first time the leadership team has the same picture in front of it at the same time. The outcome is not my list of recommendations. It is a decision the team has made together.",
    ],
    termsTitle: "A fixed fee. A finding you can test.",
    termsBody: [
      "The fee is fixed and agreed before we start.",
      "I will find the constraints with the most impact, what is likely causing them and what they are costing you. If none of it resonates — if the leadership team cannot name one finding worth getting hold of — you get your money back. The guarantee is written into the scope before the work begins.",
    ],
    nothingTitle: "Sometimes nothing is structurally wrong.",
    nothingBody:
      "That is a finding too. It tells you the constraint may sit somewhere you have not been looking, possibly in one decision or in your own role. It stops another year of fixing the wrong thing and gives the team permission to focus on building.",
    checkLabel: "Ten-statement check",
    checkTitle: "Check whether the pattern is broader than one decision",
    checkIntro: "Ten statements. Use the last few weeks as your reference point.",
    fitTitle: "The team needs room for an answer it may not expect.",
    goodLabel: "Good fit",
    goodTitle: "The business question is real and still open.",
    goodBody:
      "The leadership team can make time for the work, share relevant evidence and act if the finding is uncomfortable.",
    wrongLabel: "Wrong fit",
    wrongTitle: "The brief has already decided the answer.",
    wrongBody:
      "A predetermined restructure, clinical question or stand-alone employee survey calls for a different brief and may need another specialist.",
    adjacent: [
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "If the cause is already clear and the question is simply difficult, advisory may be the better use of your time.",
      },
      {
        routeId: "fractionalPeopleLeadership" as const,
        label: "Fractional People Leadership",
        text: "If the work needs a senior owner rather than an answer, that is Fractional People Leadership.",
      },
    ],
    closingTitle: "Use the assessment when the cause is still in question.",
    closingText:
      "Tell me what is happening and what has already been tried. I will tell you if an assessment fits.",
  },
  de: {
    breadcrumbServices: "Zusammenarbeit",
    breadcrumbPage: "Bottleneck Assessment",
    title: "Wenn Sie das Problem spüren, aber noch nicht darauf zeigen können.",
    lead: "Mit dem Bottleneck Assessment hören Sie auf zu raten. Ich vergleiche die Erfahrungen im Team mit der Art, wie Entscheidungen und Arbeit tatsächlich durch das Unternehmen laufen. Das Führungsteam erhält einen klaren Befund, den es prüfen kann.",
    secondary: "Zum 2-Minuten-Check",
    signalsTitle: "Die Analyse passt, solange die Ursache noch offen ist.",
    signalsBody:
      "Wenn Sie die Entscheidung bereits benennen können, reicht möglicherweise Beratung. Wenn eine Führungskraft die Veränderung trägt, passt Coaching besser. Die Analyse ist für Situationen gedacht, in denen mehrere Erklärungen konkurrieren und eine einzelne Sicht nicht ausreicht.",
    signalsHeading: "Häufige Anzeichen",
    signals: [
      "Verantwortung und Aufgaben landen bei Ihnen, obwohl sie vernünftigerweise woanders liegen sollten.",
      "Menschen bitten um Erlaubnis für Entscheidungen, für die sie bereits bezahlt werden.",
      "Sie haben ein fähiges Team und fühlen sich trotzdem wie die einzige Person mit dem Gesamtbild.",
      "Die Arbeit könnte schneller vorankommen, aber Sie können nicht benennen, was sie stoppt.",
      "Ein Thema, das Sie mehrfach angesprochen haben, steht noch genau dort, wo Sie es zurückgelassen haben.",
    ],
    flowTitle: "Was tatsächlich passiert.",
    flowIntro:
      "Die Feldarbeit bleibt bewusst kompakt. Das Führungsteam bekommt trotzdem genug Zeit, den Befund zu prüfen, bevor es entscheidet.",
    flow: [
      {
        title: "Die Frage festlegen",
        description:
          "Ein 30-minütiges Gespräch klärt, welche Frage die Analyse beantworten soll.",
      },
      {
        title: "Das Team einzeln hören",
        description:
          "Ich spreche mit Personen aus dem Team, normalerweise jeweils 90 Minuten. Dazu kommt ein kurzer Fragebogen.",
      },
      {
        title: "Vor dem Workshop abgleichen",
        description:
          "Wir besprechen den entstehenden Befund 20–30 Minuten lang. Im Workshop soll Sie nichts überraschen.",
      },
      {
        title: "Den Bericht schreiben",
        description:
          "Der Bericht beschreibt den wichtigsten Befund, wahrscheinliche Ursachen, betriebliche Kosten und die Belege dahinter.",
      },
      {
        title: "Gemeinsam daran arbeiten",
        description:
          "Das Führungsteam prüft die Belege in einem Workshop und entscheidet, was als Nächstes geschieht.",
      },
    ],
    timingLabel: "Typischer Zeitrahmen",
    timing: "Zwei bis drei Wochen vom Auftakt bis zum Workshop.",
    confidentialityTitle: "Was Ihr Team sagt, erhalten Sie nicht als Protokoll zurück.",
    confidentialityBody: [
      "Einzelne Aussagen werden zusammengefasst oder sinngemäß wiedergegeben. Im Bericht werden sie keiner Person zugeordnet.",
      "Das Material bleibt getrennt von Personal- und Leistungsakten. Es geht um die Organisation, nicht um die Bewertung einzelner Personen.",
      "Klinische und medizinische Diagnosen liegen außerhalb des Auftrags. Wenn die Frage diese Expertise braucht, sage ich das.",
    ],
    reportTitle: "Der Bericht ist dafür geschrieben, dass Sie ihm widersprechen.",
    reportBody: [
      "Er beschreibt meinen Befund, wahrscheinliche Ursachen und die Kosten für die Organisation. Die Belege stehen direkt daneben. So kann das Team über die Belege streiten, statt über meine Meinung.",
      "Danach arbeiten wir gemeinsam daran. Für viele Führungsteams ist es das erste Mal, dass alle gleichzeitig dasselbe Bild vor sich haben. Das Ergebnis ist keine Empfehlungsliste von mir. Es ist eine Entscheidung, die das Team selbst getroffen hat.",
    ],
    termsTitle: "Ein fester Preis. Ein Befund, den Sie prüfen können.",
    termsBody: [
      "Das Honorar steht fest und wird vor dem Beginn vereinbart.",
      "Ich finde die wirkungsvollsten Engpässe, ihre wahrscheinlichen Ursachen und ihre Kosten. Wenn nichts davon überzeugt — wenn das Führungsteam keinen einzigen Befund für wichtig hält — erhalten Sie Ihr Geld zurück. Die Garantie steht vor Beginn in der schriftlichen Vereinbarung zum Umfang.",
    ],
    nothingTitle: "Manchmal ist strukturell nichts falsch.",
    nothingBody:
      "Auch das ist ein Befund. Er zeigt, dass die Einschränkung möglicherweise an einer Stelle liegt, die Sie bisher nicht betrachtet haben: in einer einzelnen Entscheidung oder in Ihrer eigenen Rolle. So verbringen Sie nicht noch ein Jahr damit, das falsche Problem zu reparieren.",
    checkLabel: "Check mit zehn Aussagen",
    checkTitle: "Prüfen Sie, ob das Muster über eine einzelne Entscheidung hinausgeht",
    checkIntro: "Zehn Aussagen. Denken Sie dabei an die vergangenen Wochen.",
    fitTitle: "Das Team braucht Raum für eine Antwort, mit der es nicht gerechnet hat.",
    goodLabel: "Passt gut",
    goodTitle: "Die geschäftliche Frage ist real und noch offen.",
    goodBody:
      "Das Führungsteam nimmt sich Zeit, teilt relevante Belege und handelt auch dann, wenn der Befund unangenehm ist.",
    wrongLabel: "Passt nicht",
    wrongTitle: "Der Auftrag hat die Antwort bereits festgelegt.",
    wrongBody:
      "Eine vorab beschlossene Umstrukturierung, eine klinische Frage oder eine isolierte Mitarbeitendenbefragung braucht einen anderen Auftrag und möglicherweise andere Expertise.",
    adjacent: [
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "Wenn die Ursache klar und nur die Entscheidung schwierig ist, ist Beratung wahrscheinlich die bessere Nutzung Ihrer Zeit.",
      },
      {
        routeId: "fractionalPeopleLeadership" as const,
        label: "Fractional People Leadership",
        text: "Wenn die Arbeit eine erfahrene Leitung statt einer Antwort braucht, passt Fractional People Leadership.",
      },
    ],
    closingTitle: "Nutzen Sie die Analyse, solange die Ursache noch offen ist.",
    closingText:
      "Beschreiben Sie, was passiert und was Sie bereits versucht haben. Ich sage Ihnen, ob die Analyse passt.",
  },
} as const;

export function BottleneckAssessmentPageView({
  locale,
}: {
  locale: SiteLocale;
}) {
  const pageCopy = copy[locale];
  const contactAction = getPrimaryContactAction(locale);

  return (
    <div className={styles.page} lang={locale}>
      <ServiceStructuredData
        description={pageCopy.lead}
        locale={locale}
        name="Bottleneck Assessment"
        routeId="bottleneckAssessment"
      />
      <PageHero
        breadcrumbs={[
          { label: pageCopy.breadcrumbServices, href: getRouteHref("services", locale) },
          { label: pageCopy.breadcrumbPage },
        ]}
        title={pageCopy.title}
        lead={pageCopy.lead}
        primary={contactAction}
        ctaPrimary
        secondary={{ label: pageCopy.secondary, href: "#assessment-check" }}
      />

      <section className={styles.section} aria-labelledby="assessment-problem">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <h2 className={styles.sectionTitle} id="assessment-problem">
              {pageCopy.signalsTitle}
            </h2>
          </div>
          <div>
            <div className={styles.bodyCopy}>
              <p>{pageCopy.signalsBody}</p>
            </div>
            <div className={styles.spacedTop}>
              <h3 className={styles.featureCardTitle}>{pageCopy.signalsHeading}</h3>
              <div className={styles.smallSpacedTop}>
                <CheckList items={pageCopy.signals} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mediaBreak} aria-label={pageCopy.flowTitle}>
        <div className={styles.container}>
          <figure className={styles.editorialFigure}>
            <div className={styles.editorialImageWrap}>
              <Image
                className={styles.editorialImage}
                src="/images/generated/diagnostic-worktable.webp"
                alt=""
                fill
                sizes="(max-width: 1184px) calc(100vw - 2rem), 1184px"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="assessment-flow">
        <div className={styles.container}>
          <SectionHeading
            id="assessment-flow"
            title={pageCopy.flowTitle}
            intro={pageCopy.flowIntro}
          />
          <ProcessList steps={pageCopy.flow} />
          <div className={styles.spacedTop}>
            <Evidence label={pageCopy.timingLabel}>{pageCopy.timing}</Evidence>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="assessment-confidentiality">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="assessment-confidentiality">
            {pageCopy.confidentialityTitle}
          </h2>
          <div className={styles.bodyCopy}>
            {pageCopy.confidentialityBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="assessment-report">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="assessment-report">
            {pageCopy.reportTitle}
          </h2>
          <div className={styles.bodyCopy}>
            {pageCopy.reportBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="assessment-terms">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="assessment-terms">
            {pageCopy.termsTitle}
          </h2>
          <div className={styles.bodyCopy}>
            {pageCopy.termsBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className={styles.spacedTop}>
              <h3 className={styles.featureCardTitle}>{pageCopy.nothingTitle}</h3>
              <p className={styles.smallSpacedTop}>{pageCopy.nothingBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.section}
        id="assessment-check"
        aria-label={pageCopy.checkTitle}
      >
        <div className={styles.narrowContainer}>
          <DiagnosticDisclosure
            id="assessment-check-disclosure"
            label={pageCopy.checkLabel}
            title={pageCopy.checkTitle}
            intro={pageCopy.checkIntro}
          >
            <BottleneckDiagnostic
              id="bottleneck-check"
              introOnly
              locale={locale}
            />
          </DiagnosticDisclosure>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="assessment-fit">
        <div className={styles.container}>
          <SectionHeading id="assessment-fit" title={pageCopy.fitTitle} />
          <div className={`${styles.cardGrid} ${styles.cardGridTwo}`}>
            <article className={styles.featureCard}>
              <p className={styles.cardKicker}>{pageCopy.goodLabel}</p>
              <h3 className={styles.featureCardTitle}>{pageCopy.goodTitle}</h3>
              <p>{pageCopy.goodBody}</p>
            </article>
            <article className={styles.featureCard}>
              <p className={styles.cardKicker}>{pageCopy.wrongLabel}</p>
              <h3 className={styles.featureCardTitle}>{pageCopy.wrongTitle}</h3>
              <p>{pageCopy.wrongBody}</p>
            </article>
          </div>
        </div>
      </section>

      <CompactProcess id="assessment-process" locale={locale} />
      <AdjacentServiceLinks
        id="assessment-adjacent"
        links={pageCopy.adjacent}
        locale={locale}
      />

      <ContactBand
        href={contactAction.href}
        title={pageCopy.closingTitle}
        text={pageCopy.closingText}
        label={contactAction.label}
      />
    </div>
  );
}
