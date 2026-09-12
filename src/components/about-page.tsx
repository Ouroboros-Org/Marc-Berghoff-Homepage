import Image from "next/image";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CredentialBadges } from "@/components/credential-badges";
import { Reveal } from "@/components/reveal";
import {
  ContactBand,
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
    heroRole: "Fractional CPO · Organisational Psychologist · Executive Coach",
    heroStatement:
      "I help you work through people and leadership decisions, develop your organisation and agree who carries the work as your business grows.",
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
      { title: "Certified Professional Co-Active Coach", text: "CPCC, Co-Active Training Institute" },
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
      "When a company is underperforming, I start by looking at the leadership team.",
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
      "A free conversation, typically 30 minutes. A written scope before any paid work. Then we work to agreed responsibilities and review points.",
      "If I'm not the right person, I'll say so — and where I can make a useful introduction, I will.",
    ],
    processLink: "See the full process",
    closingTitle: "What would help you lead your organisation?",
    closingText:
      "We can talk about your people, leadership and organisation, the support you already have and where I could help.",
  },
} as const satisfies { en: AboutCopy };

export function AboutPageView({ locale }: { locale: SiteLocale }) {
  const pageCopy = copy.en;
  const contactAction = getPrimaryContactAction(locale);

  return (
    <div className={styles.page} lang={locale}>
      <header className={aboutStyles.hero}>
        <div className={styles.container}>
          <Breadcrumbs items={[{ label: pageCopy.breadcrumb }]} />
          <div className={aboutStyles.heroGrid}>
            <div className={aboutStyles.heroCopy}>
              <p className={aboutStyles.eyebrow}>The person behind the work</p>
              <h1 className={aboutStyles.heroTitle}>Marc Berghoff</h1>
              <p className={aboutStyles.heroRole}>{pageCopy.heroRole}</p>
              <p className={aboutStyles.heroStatement}>{pageCopy.heroStatement}</p>
              <p className={aboutStyles.location}>Based in Malta. Working across Europe.</p>
            </div>
            <div className={aboutStyles.heroPortrait}>
              <Image
                alt={pageCopy.portraitAlt}
                fill
                priority
                sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1200px) 40vw, 470px"
                src="/images/portraits/marc-seated-original.webp"
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="about-path">
        <div className={aboutStyles.proseContainer}>
          <Reveal className={aboutStyles.pathCopy}>
            <h2 className={styles.sectionTitle} id="about-path">
              {pageCopy.pathTitle}
            </h2>
            <div className={`${styles.bodyCopy} ${styles.spacedTop}`}>
              {pageCopy.path.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="about-credentials">
        <div className={`${styles.container} ${aboutStyles.credentialsLayout}`}>
          <Reveal>
            <h2 className={styles.sectionTitle} id="about-credentials">
              {pageCopy.credentialsTitle}
            </h2>
            <CredentialBadges className={aboutStyles.badges} />
          </Reveal>
          <dl
            className={`${aboutStyles.credentialList} ${styles.bodyCopy}`}
          >
            {pageCopy.credentials.map((credential) => (
              <Reveal className={aboutStyles.credentialRow} key={credential.title}>
                <dt className={aboutStyles.credentialTerm}>{credential.title}</dt>
                {credential.text ? (
                  <dd className={aboutStyles.credentialDescription}>
                    {credential.text}
                  </dd>
                ) : null}
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="about-beliefs">
        <div className={aboutStyles.proseContainer}>
          <Reveal>
            <h2
              className={`${styles.sectionTitle} ${aboutStyles.proseTitle}`}
              id="about-beliefs"
            >
              {pageCopy.beliefsTitle}
            </h2>
          </Reveal>
          <div className={`${styles.bodyCopy} ${aboutStyles.proseBody}`}>
            {pageCopy.beliefs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <Reveal className={aboutStyles.workshopBreak} variant="fade">
        <Image
          alt="Marc at a table in conversation, with an open notebook"
          fill
          sizes="(max-width: 1200px) calc(100vw - 2rem), 1184px"
          src="/images/generated/marc-workshop.webp"
        />
      </Reveal>

      <section className={styles.sectionTint} aria-labelledby="about-outside">
        <div className={aboutStyles.proseContainer}>
          <Reveal>
            <h2
              className={`${styles.sectionTitle} ${aboutStyles.proseTitle}`}
              id="about-outside"
            >
              {pageCopy.outsideTitle}
            </h2>
          </Reveal>
          <div className={`${styles.bodyCopy} ${aboutStyles.proseBody}`}>
            {pageCopy.outside.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="about-start">
        <div className={`${styles.container} ${styles.split}`}>
          <Reveal>
            <h2 className={styles.sectionTitle} id="about-start">
              {pageCopy.startTitle}
            </h2>
          </Reveal>
          <Reveal className={`${styles.bodyCopy} ${aboutStyles.startCopy}`}>
            {pageCopy.start.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className={styles.smallSpacedTop}>
              <TextLink href={getRouteHref("services", locale, "#process")}>
                {pageCopy.processLink}
              </TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactBand
        href={contactAction.href}
        label="Book a call"
        helper="Free introduction · typically 30 minutes"
        locale={locale}
        text={pageCopy.closingText}
        title={pageCopy.closingTitle}
      />
    </div>
  );
}
