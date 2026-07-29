import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  MoveRight,
} from "lucide-react";

import { BottleneckFlow } from "@/components/bottleneck-flow";
import { ButtonLink } from "@/components/button-link";
import { Faq } from "@/components/faq";
import {
  HomeBottleneckDiagnostic,
  HomeContactJourney,
  HomeQuickContactForm,
} from "@/components/home-contact-journey";
import { SectionHeading } from "@/components/section-heading";
import { createPageMetadata } from "@/config/metadata";
import { BLOG_POSTS } from "@/content/blog";

export const metadata = createPageMetadata({
  title: "Organisational Bottleneck Assessment | Marc Berghoff",
  description:
    "Find the organisational bottleneck slowing execution. Marc Berghoff delivers a written assessment report and works through the next decisions with your leadership team.",
  path: "/",
});

const proofPoints = [
  ["MSc", "Psychology"],
  ["ICF ACC", "Credentialed coach"],
  ["Founder", "Operator experience"],
  ["350+", "Coaching hours"],
] as const;

const servicePaths = [
  {
    index: "01",
    title: "Bottleneck assessment",
    copy: "Typically one to two weeks of assessment, followed by a written report and a report workshop with the decision-makers.",
    href: "/bottleneck-assessment",
  },
  {
    index: "02",
    title: "Strategic people advisory",
    copy: "An outside view on a live people decision, including whether a wider organisational issue is involved.",
    href: "/advisory",
  },
  {
    index: "03",
    title: "Fractional people leadership",
    copy: "Part-time senior ownership of the people agenda while the company builds its own capability.",
    href: "/fractional-people-leadership",
  },
  {
    index: "04",
    title: "Executive coaching",
    copy: "Confidential one-to-one work on a decision, behaviour or leadership problem that belongs with the individual.",
    href: "/executive-coaching",
  },
] as const;

const faqs = [
  {
    question: "Who is the bottleneck assessment for?",
    answer:
      "It is for founders and leadership teams in growing companies where decisions keep escalating, accountabilities are blurred or the same operating problem keeps returning.",
  },
  {
    question: "What happens after the first conversation?",
    answer:
      "The first conversation is free. If the assessment fits, Marc confirms the question, participants and practical scope with you. Fieldwork typically takes one to two weeks. The report workshop normally follows about a week later.",
  },
  {
    question: "Can we start with advisory or coaching instead?",
    answer:
      "Yes. Use the assessment when the cause is unclear or several parts of the organisation are involved. A defined decision may suit advisory; a temporary ownership gap may need fractional leadership; an individual question may belong in coaching.",
  },
  {
    question: "Do you work outside Malta?",
    answer:
      "Yes. Marc works with leadership teams internationally. The exact mix of remote and in-person work depends on the engagement and location.",
  },
  {
    question: "Is the assessment a clinical or psychometric test?",
    answer:
      "No. This is an organisational diagnostic based on structured conversations and operating evidence. The short check on this site is directional and has no clinical or psychometric purpose.",
  },
] as const;

const homeArticles = BLOG_POSTS.slice(0, 3);

const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function HomePage() {
  return (
    <HomeContactJourney>
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow">Organisational bottleneck assessment</p>
            <h1>Find the bottleneck slowing your company down.</h1>
            <p className="home-hero__lead">
              I help founders and leadership teams trace why work slows down and why
              decisions keep travelling upward. You leave with a written assessment
              report and a prioritised sequence of decisions.
            </p>
            <div className="button-row">
              <ButtonLink href="/contact">Request a free conversation</ButtonLink>
              <ButtonLink href="#diagnostic" variant="secondary">
                Run the six-question check
              </ButtonLink>
            </div>
            <a className="hero-scroll" href="#diagnostic">
              Start with six questions
              <ArrowDown aria-hidden="true" size={18} />
            </a>
          </div>

          <div className="home-hero__visual">
            <div className="home-hero__image-wrap">
              <Image
                className="home-hero__image"
                src="/images/portraits/marc-speaking-original.jpg"
                alt="Marc Berghoff speaking at a conference"
                fill
                preload
                sizes="(max-width: 767px) 100vw, 46vw"
              />
            </div>
            <div className="home-hero__note">
              <span aria-hidden="true" className="home-hero__note-mark" />
              <div>
                <strong>Marc Berghoff</strong>
                <span>MSc Psychology · adviser · coach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-bar" aria-label="Professional experience">
        <div className="container proof-bar__grid">
          {proofPoints.map(([value, label]) => (
            <div className="proof-point" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
          <div className="proof-point proof-point--wide">
            <strong>Vistage</strong>
            <span>Peer advisory</span>
          </div>
        </div>
      </section>

      <section className="section section--diagnostic" id="diagnostic">
        <div className="container diagnostic-intro">
          <SectionHeading
            eyebrow="A quick check"
            title="Where is work getting stuck?"
            lead={
              <p>
                Answer from the last few weeks. The result points to the area that may
                deserve a closer look.
              </p>
            }
          />
          <p className="diagnostic-intro__note">
            Your answers stay in this browser unless you add the summary to a message.
            No email is required. This is a business reflection tool.
          </p>
        </div>
        <div className="container">
          <HomeBottleneckDiagnostic />
        </div>
      </section>

      <section className="section surface-dark">
        <div className="container">
          <div className="consequence-header">
            <p className="eyebrow eyebrow--light">How the drag spreads</p>
            <h2>One blurred decision can keep pulling work back upstairs.</h2>
            <p>
              The details differ from company to company. A common pattern starts with
              uncertain ownership and ends with leaders repeatedly stepping in.
            </p>
          </div>
          <BottleneckFlow />
        </div>
      </section>

      <section className="section">
        <div className="container assessment-grid">
          <div className="assessment-grid__copy">
            <SectionHeading
              eyebrow="The bottleneck assessment"
              title="Find out why the same problem keeps coming back."
              lead={
                <p>
                  During a typical fieldwork period of one to two weeks, I compare what
                  people report with how work and decisions actually move. The report
                  names the main constraint and puts the next decisions in order.
                </p>
              }
            />
            <div className="price-note">
              <span>Fixed assessment fee</span>
              <strong>€3,500</strong>
              <small>Participant scope, travel and applicable tax confirmed in advance</small>
            </div>
            <ButtonLink href="/bottleneck-assessment">See the full assessment</ButtonLink>
          </div>

          <ol className="process-list">
            <li>
              <span>01</span>
              <div>
                <h3>Discovery</h3>
                <p>Define the business question and agree whose input is needed.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Assessment</h3>
                <p>Typically one to two weeks of qualitative and quantitative input, read with relevant operating evidence.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Report workshop</h3>
                <p>The decision-makers work through the written report, usually about one week after fieldwork.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section surface-blue report-section">
        <div className="container report-grid">
          <div className="report-preview">
            <Image
              src="/images/proof/sample-report-cover.png"
              alt="Example cover of a bottleneck assessment report"
              width={1920}
              height={1080}
              sizes="(max-width: 767px) 92vw, 50vw"
            />
          </div>
          <div className="report-copy">
            <p className="eyebrow">The report</p>
            <h2>A decision document, built from the evidence.</h2>
            <ul className="check-list">
              <li><Check aria-hidden="true" />The main organisational constraint</li>
              <li><Check aria-hidden="true" />Evidence that supports the finding</li>
              <li><Check aria-hidden="true" />Its cost to day-to-day execution</li>
              <li><Check aria-hidden="true" />The first decisions, in priority order</li>
            </ul>
            <ButtonLink href="/sample-report" variant="secondary">
              See the report structure
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Ways to work together"
            title="Already know what the work is?"
            lead={<p>A defined decision may need advisory. A temporary ownership gap may call for fractional leadership. Coaching keeps the work with one leader.</p>}
          />
          <div className="service-grid">
            {servicePaths.map((service) => (
              <Link className="service-card" href={service.href} key={service.href}>
                <span className="service-card__index">{service.index}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <span className="service-card__link">
                  Read more <ArrowRight aria-hidden="true" size={18} />
                </span>
              </Link>
            ))}
          </div>
          <ButtonLink href="/services" variant="text" className="services-overview-link">
            Compare all ways to work together
          </ButtonLink>
        </div>
      </section>

      <section className="section results-preview">
        <div className="container">
          <SectionHeading
            eyebrow="Selected work"
            title="Experience from inside growing businesses."
            lead={<p>These examples come from roles Marc held during the periods shown. Company results had many contributors.</p>}
          />
          <div className="case-grid">
            <article className="case-study case-study--lead">
              <div className="case-study__logo case-study__logo--klarsolar">
                <Image src="/images/proof/klarsolar.png" alt="Klarsolar" width={580} height={390} />
              </div>
              <p className="case-study__label">Scale-up people leadership</p>
              <strong>35 → 150 people</strong>
              <p>Workforce growth over six months. Revenue also more than doubled over a two-year period.</p>
            </article>
            <article className="case-study">
              <div className="case-study__logo">
                <Image src="/images/proof/giftagoods.png" alt="Giftagoods" width={447} height={447} />
              </div>
              <p className="case-study__label">Founder and growth support</p>
              <strong>€30k → €350k ARR</strong>
              <p>Giftagoods grew ARR from €30k to €350k in one year while Marc supported the founder.</p>
            </article>
            <article className="case-study case-study--text">
              <div className="case-study__wordmark">CyberKongz</div>
              <p className="case-study__label">Co-founder and operator</p>
              <strong>Global Web3 project</strong>
              <p>Marc co-founded the project in 2021 and worked inside it as an operator.</p>
            </article>
          </div>
          <ButtonLink href="/results" variant="text" className="results-preview__link">
            See more experience and results
          </ButtonLink>
        </div>
      </section>

      <section className="section about-preview">
        <div className="container about-preview__grid">
          <div className="about-preview__portrait">
            <Image
              src="/images/portraits/marc-seated-original.jpg"
              alt="Marc Berghoff seated in an office setting"
              fill
              sizes="(max-width: 767px) 88vw, 38vw"
            />
          </div>
          <div className="about-preview__copy">
            <p className="eyebrow">About Marc</p>
            <h2>Advice shaped by operator experience.</h2>
            <p className="large-copy">
              Marc trained in psychology, led people work in growing companies and
              co-founded a business. That mix keeps his advice close to the decisions a
              leadership team can actually make.
            </p>
            <ButtonLink href="/about" variant="secondary">More about Marc</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section home-insights">
        <div className="container">
          <div className="home-insights__header">
            <SectionHeading
              eyebrow="Insights"
              title="Notes from recurring organisational problems."
              lead={
                <p>
                  Articles on decision rights, founder dependency and choosing a useful
                  form of outside support.
                </p>
              }
            />
            <ButtonLink href="/blog" variant="text">
              Browse all insights
            </ButtonLink>
          </div>
          <div className="home-insights__grid">
            {homeArticles.map((post, index) => (
              <article className="home-insights__card" key={post.slug}>
                <div className="home-insights__meta">
                  <span>0{index + 1}</span>
                  <time dateTime={post.publishedAt}>
                    {shortDate.format(new Date(`${post.publishedAt}T00:00:00Z`))}
                  </time>
                </div>
                <div>
                  <p className="home-insights__category">{post.category}</p>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.description}</p>
                </div>
                <Link className="home-insights__link" href={`/blog/${post.slug}`}>
                  Read article <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container testimonial-grid">
          <figure className="testimonial-main">
            <blockquote>
              “Marc has been with me through the struggling stage, the getting-by stage,
              and the doing-pretty-well stage. He’s empathetic enough to relate to your
              situation, clever enough to advise on a sensible way forward. He doesn’t
              just follow up, he follows through.”
            </blockquote>
            <figcaption>Chris M. · Founder, Giftagoods</figcaption>
          </figure>
          <div className="testimonial-side">
            <figure>
              <blockquote>“Marc gives you new perspectives and tools to question your own paradigms and beliefs and brings you into action.”</blockquote>
              <figcaption>Laszlo S. · Owner, Leipziger Apotheke Berlin</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">Practical details</p>
            <h2>Questions people ask before we talk.</h2>
            <p>For anything specific to your company, use the form below.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="section contact-band" id="quick-contact">
        <div className="container contact-band__grid">
          <div className="contact-band__copy">
            <p className="eyebrow eyebrow--light">Contact Marc</p>
            <h2>Tell me where the business keeps getting stuck.</h2>
            <p>
              A few lines are enough. I will reply with my view on the next step. If the
              work belongs with another specialist, I will say so.
            </p>
            <div className="contact-band__prompt" aria-hidden="true">
              <span>Start with what is happening now</span>
              <MoveRight />
            </div>
          </div>
          <div className="form-shell">
            <HomeQuickContactForm />
          </div>
        </div>
      </section>
    </HomeContactJourney>
  );
}
