import Image from "next/image";

import {
  ContactBand,
  PageHero,
  TextLink,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";

import aboutStyles from "./about-page.module.css";

type AboutCopy = {
  breadcrumb: string;
  heroRole: string;
  heroStatement: string;
  pathTitle: string;
  path: readonly string[];
  portraitAlt: string;
  credentialsTitle: string;
  credentials: readonly { title: string; text: string | null }[];
  beliefsTitle: string;
  beliefs: readonly string[];
  outsideTitle: string;
  outside: readonly string[];
  startTitle: string;
  start: readonly string[];
  processLink: string;
  closingTitle: string;
  closingText: string;
};

const copy = {
  en: {
    breadcrumb: "About me",
    heroRole: "Organisational Psychologist · Vistage Chair · Executive Coach",
    heroStatement:
      "I work with founders and leadership teams on the problems that sit between the people and the way the business actually works.",
    pathTitle: "The path",
    path: [
      "I did the German thing of collecting internships: Freudenberg Sealing Technologies, Fresenius Medical Care, two months at Nintendo, and Mitsubishi Fuso in Japan. Then in-house people work, mostly in companies growing faster than their structures could handle, including a solar scale-up later acquired by E.ON. I co-founded a business along the way, which taught me more about how founders actually decide things than watching from the outside ever did.",
      "After almost a decade across HR, coaching and organisation development, I now work for myself from Malta, mostly with founder-led companies across Malta, Germany and the wider EU.",
    ],
    portraitAlt: "Marc Berghoff seated in an office setting",
    credentialsTitle: "Credentials",
    credentials: [
      {
        title: "Organisational psychologist",
        text: "MSc in Psychology, applied to organisational and leadership questions",
      },
      {
        title: "ICF Associate Certified Coach",
        text: "350+ coaching hours",
      },
      { title: "Co-Active trained", text: null },
      {
        title: "Vistage Chair",
        text: "I chair a peer advisory group of business owners in Malta",
      },
      {
        title: "Lecturer in training and development",
        text: null,
      },
    ],
    beliefsTitle: "What I believe about this work",
    beliefs: [
      "Most of the time, the reason a company underperforms is sitting in the leadership team.",
      "The founders I meet tend to be the hardest-working person in the company. They know the most and decide fastest. They are also right a lot of the time. That is exactly why the company keeps leaning on them.",
      "What I see over and over is a leader too close to the work, or too attached to being the one who solves it, to notice what good leadership compounds into. People around them gain autonomy and get closer to their level. The leader gets time for the work only they can do.",
      "I think most people can be good leaders. For some it is instinct. For everyone else it is a skill, and skills are learnable.",
      "The line is tacky and it is still true: if you want to go fast, go alone. If you want to go far, go together.",
      "If speed is what you want, build it, run it yourself, get as close to burnout as you dare and sell at a price that feels right. I will help you stay in one piece while you do it. If you want to build something that lasts, the work shifts to the people around you and the decisions they need to own.",
    ],
    outsideTitle: "Outside the work",
    outside: [
      "I am German, I live in Malta, and I climb. Mostly bouldering, which consists of failing at the same problem until suddenly you do not. It has taught me more about how people learn than most of what I have read on the subject.",
      "I lived in Tokyo for a year and in Medellín for six months. Both changed how I think about history, tradition, patience and what a good life can look like. Japan is still the first place I would go back to.",
      "I like cooking almost as much as eating. A good week usually includes a long table and too much food. I am still working on homemade chilaquiles. I make coffee slowly and write with fountain pens.",
      "I read business books mostly, which I know is a boring answer, plus whatever fiction I get talked into. I have listened to Acquired for years. Hearing how a company got built is still more interesting to me than the polished version it tells later.",
      "I have worked fully remote, hybrid and in an office. If it is up to me, I want to be in the same room at least from time to time. There is an energy when people who want to make progress share a room, and I genuinely enjoy it. So much of my work now is about getting leaders into one and keeping them there until the decisions are made and the direction is clear.",
    ],
    startTitle: "How working together starts",
    start: [
      "A free 30-minute conversation. A written scope before any paid work. Then the work itself, with a defined end point.",
      "If I'm not the right person, I'll say so — and where I can make a useful introduction, I will.",
    ],
    processLink: "See the full process",
    closingTitle: "Bring me the decision that keeps returning.",
    closingText:
      "The first conversation is free and typically takes 30 minutes. I use it to understand the question and tell you whether I am the right person for it.",
  },
  de: {
    breadcrumb: "Über mich",
    heroRole: "Organisationspsychologe · Vistage Chair · Executive Coach",
    heroStatement:
      "Ich arbeite mit Gründerinnen, Gründern und Führungsteams an Problemen, die zwischen den Menschen und der tatsächlichen Arbeitsweise des Unternehmens liegen.",
    pathTitle: "Mein Weg",
    path: [
      "Ich habe erst einmal das deutsche Ding gemacht und Praktika gesammelt: bei Freudenberg Sealing Technologies, Fresenius Medical Care, zwei Monate bei Nintendo und bei Mitsubishi Fuso in Japan. Danach arbeitete ich intern im People-Bereich, meist in Unternehmen, die schneller wuchsen als ihre Strukturen. Dazu gehörte ein Solar-Scale-up, das später von E.ON übernommen wurde. Unterwegs habe ich ein Unternehmen mitgegründet. Dabei habe ich mehr darüber gelernt, wie Gründer tatsächlich entscheiden, als es von außen je möglich gewesen wäre.",
      "Nach fast einem Jahrzehnt in HR, Coaching und Organisationsentwicklung arbeite ich heute selbstständig von Malta aus. Meine Kunden sind vor allem inhabergeführte Unternehmen in Malta, Deutschland und der übrigen EU.",
    ],
    portraitAlt: "Marc Berghoff sitzt in einem Büro",
    credentialsTitle: "Qualifikationen",
    credentials: [
      {
        title: "Organisationspsychologe",
        text: "MSc in Psychologie, angewandt auf Organisations- und Führungsfragen",
      },
      {
        title: "ICF Associate Certified Coach",
        text: "Mehr als 350 Coaching-Stunden",
      },
      { title: "Co-Active-Training", text: null },
      {
        title: "Vistage Chair",
        text: "Ich leite in Malta eine Peer-Advisory-Gruppe für Unternehmensinhaber",
      },
      {
        title: "Dozent für Training und Entwicklung",
        text: null,
      },
    ],
    beliefsTitle: "Was ich über diese Arbeit glaube",
    beliefs: [
      "Wenn ein Unternehmen hinter seinen Möglichkeiten bleibt, liegt der Grund meistens im Führungsteam.",
      "Die Gründer, die ich treffe, sind oft die Menschen, die im Unternehmen am härtesten arbeiten. Sie wissen am meisten und entscheiden am schnellsten. Häufig liegen sie auch richtig. Genau deshalb verlässt sich das Unternehmen immer wieder auf sie.",
      "Ich sehe Führungskräfte, die zu nah an der Arbeit sind oder zu sehr daran hängen, selbst die Lösung zu liefern. Dabei übersehen sie, was gute Führung mit der Zeit bewirkt. Andere gewinnen Eigenständigkeit und kommen ihrem Niveau näher. Die Führungskraft bekommt Zeit für die Arbeit, die nur sie übernehmen kann.",
      "Ich glaube, dass die meisten Menschen gute Führungskräfte sein können. Manchen liegt es. Für alle anderen ist es eine Fähigkeit, die sich lernen lässt.",
      "Der Satz ist kitschig und stimmt trotzdem: Wer schnell sein will, geht allein. Wer weit kommen will, geht gemeinsam.",
      "Wenn es Ihnen um Geschwindigkeit geht, bauen Sie das Unternehmen auf, führen Sie es selbst, gehen Sie so nah an den Burnout, wie Sie es verantworten können, und verkaufen Sie zu einem Preis, der sich richtig anfühlt. Ich helfe Ihnen, dabei heil zu bleiben. Wenn das Unternehmen Bestand haben soll, richtet sich die Arbeit stärker auf die Menschen um Sie herum und auf die Entscheidungen, die sie übernehmen müssen.",
    ],
    outsideTitle: "Außerhalb der Arbeit",
    outside: [
      "Ich bin Deutscher, lebe auf Malta und klettere. Meistens bouldere ich. Dabei scheitert man so lange am selben Problem, bis es plötzlich klappt. Darüber habe ich mehr über Lernen verstanden als aus den meisten Texten zu diesem Thema.",
      "Ich habe ein Jahr in Tokio und sechs Monate in Medellín gelebt. Beides hat meinen Blick auf Geschichte, Tradition, Geduld und ein gutes Leben verändert. Japan wäre bis heute der erste Ort, an den ich zurückkehren würde.",
      "Ich koche fast so gern, wie ich esse. Zu einer guten Woche gehören für mich ein langer Tisch und zu viel Essen. An meinen Chilaquiles arbeite ich noch. Kaffee bereite ich langsam zu, und ich schreibe mit Füllfederhaltern.",
      "Meistens lese ich Wirtschaftsbücher. Ich weiß, das ist eine langweilige Antwort. Dazu kommt die Belletristik, zu der mich jemand überredet. Acquired höre ich seit Jahren. Wie ein Unternehmen tatsächlich aufgebaut wurde, interessiert mich noch immer mehr als die geglättete Geschichte, die es später darüber erzählt.",
      "Ich habe vollständig remote, hybrid und im Büro gearbeitet. Wenn ich wählen kann, möchte ich zumindest ab und zu mit den Menschen im selben Raum sein. Es entsteht eine besondere Energie, wenn Menschen gemeinsam vorankommen wollen. Einen großen Teil meiner heutigen Arbeit verbringe ich deshalb damit, Führungskräfte in einen Raum zu bringen und dort zu halten, bis Entscheidungen getroffen und Richtungen klar sind.",
    ],
    startTitle: "So beginnt die Zusammenarbeit",
    start: [
      "Ein kostenloses Gespräch von 30 Minuten. Ein schriftlich festgehaltener Umfang, bevor bezahlte Arbeit beginnt. Dann die Arbeit selbst, mit einem klaren Endpunkt.",
      "Wenn ich nicht der Richtige bin, sage ich das. Und wenn ich jemanden sinnvoll empfehlen kann, tue ich das.",
    ],
    processLink: "Den vollständigen Ablauf ansehen",
    closingTitle: "Bringen Sie die Entscheidung mit, die immer wieder bei Ihnen landet.",
    closingText:
      "Das erste Gespräch ist kostenlos und dauert normalerweise 30 Minuten. Ich nutze es, um Ihre Frage zu verstehen und offen zu sagen, ob ich der Richtige dafür bin.",
  },
} as const satisfies Record<SiteLocale, AboutCopy>;

export function AboutPageView({ locale }: { locale: SiteLocale }) {
  const pageCopy = copy[locale];
  const contactAction = getPrimaryContactAction(locale);

  return (
    <div className={styles.page} lang={locale}>
      <PageHero
        breadcrumbs={[{ label: pageCopy.breadcrumb }]}
        lead={
          <>
            <p className={aboutStyles.heroRole}>
              <strong>{pageCopy.heroRole}</strong>
            </p>
            <p className={aboutStyles.heroStatement}>{pageCopy.heroStatement}</p>
          </>
        }
        locale={locale}
        title="Marc Berghoff"
      />

      <section className={styles.section} aria-labelledby="about-path">
        <div className={`${styles.container} ${styles.split}`}>
          <figure>
            <div className={styles.portraitImageWrap}>
              <Image
                alt={pageCopy.portraitAlt}
                className={styles.portraitImage}
                fill
                sizes="(max-width: 928px) calc(100vw - 2rem), 38vw"
                src="/images/portraits/marc-seated-original.webp"
              />
            </div>
            <figcaption className={styles.portraitCaption}>
              <span>Marc Berghoff</span>
              <span>{pageCopy.heroRole}</span>
            </figcaption>
          </figure>
          <div className={aboutStyles.pathCopy}>
            <h2 className={styles.sectionTitle} id="about-path">
              {pageCopy.pathTitle}
            </h2>
            <div className={`${styles.bodyCopy} ${styles.spacedTop}`}>
              {pageCopy.path.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="about-credentials">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle} id="about-credentials">
            {pageCopy.credentialsTitle}
          </h2>
          <dl
            className={`${aboutStyles.credentialList} ${styles.bodyCopy} ${styles.spacedTop}`}
          >
            {pageCopy.credentials.map((credential) => (
              <div className={aboutStyles.credentialRow} key={credential.title}>
                <dt className={aboutStyles.credentialTerm}>{credential.title}</dt>
                {credential.text ? (
                  <dd className={aboutStyles.credentialDescription}>
                    {credential.text}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="about-beliefs">
        <div className={aboutStyles.proseContainer}>
          <h2
            className={`${styles.sectionTitle} ${aboutStyles.proseTitle}`}
            id="about-beliefs"
          >
            {pageCopy.beliefsTitle}
          </h2>
          <div className={`${styles.bodyCopy} ${aboutStyles.proseBody}`}>
            {pageCopy.beliefs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="about-outside">
        <div className={aboutStyles.proseContainer}>
          <h2
            className={`${styles.sectionTitle} ${aboutStyles.proseTitle}`}
            id="about-outside"
          >
            {pageCopy.outsideTitle}
          </h2>
          <div className={`${styles.bodyCopy} ${aboutStyles.proseBody}`}>
            {pageCopy.outside.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="about-start">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="about-start">
            {pageCopy.startTitle}
          </h2>
          <div className={`${styles.bodyCopy} ${aboutStyles.startCopy}`}>
            {pageCopy.start.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className={styles.smallSpacedTop}>
              <TextLink href={getRouteHref("services", locale, "#process")}>
                {pageCopy.processLink}
              </TextLink>
            </div>
          </div>
        </div>
      </section>

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
