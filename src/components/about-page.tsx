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
      "I help founders and leaders work through difficult decisions, develop their organisations and change how they lead. Depending on what you need, that can mean people advisory, fractional leadership, one-to-one coaching or peer advisory.",
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
      "When a company is underperforming, I look at how leadership decisions and the organisation shape the work.",
      "The founders I meet are often the hardest-working people in the company. They know the most and decide fastest. They are also right a lot of the time. That is exactly why the company keeps leaning on them.",
      "The question is what happens next. Which decisions genuinely need you? Where do people need clearer responsibility, more support or room to learn? And what do you need to change so they can take that responsibility?",
      "I think most people can be good leaders. For some it is instinct. For everyone else it is a skill, and skills are learnable.",
      "I want the work to help you build a business that depends less on you being everywhere — and leaves you more room for the work and life you choose.",
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
      "We can talk about your organisation, a leadership question or the kind of support you would value — one-to-one or alongside other owners.",
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
          <div className={aboutStyles.pathCopy}>
            <Reveal>
              <h2 className={styles.sectionTitle} id="about-path">
                {pageCopy.pathTitle}
              </h2>
            </Reveal>
            <div className={`${styles.bodyCopy} ${styles.spacedTop}`}>
              {pageCopy.path.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
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
                    {credential.title === "ICF Associate Certified Coach" ? <p><TextLink href="/services#coaching">Explore executive coaching</TextLink></p> : null}
                    {credential.title === "Vistage Chair" ? <p><TextLink href="/services#peer-advisory">Explore peer advisory</TextLink></p> : null}
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
              <TextLink href={getRouteHref("contact", locale, "#how-we-begin")}>
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
