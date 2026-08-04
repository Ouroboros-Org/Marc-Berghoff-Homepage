import { EngagementProcess } from "@/components/engagement-process";
import {
  ContactBand,
  PageHero,
  PlainList,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";

import groupStyles from "./group-coaching.module.css";

export const metadata = createPageMetadata({
  title: "Group Coaching",
  description:
    "Read what is known so far about a group coaching format for leaders working on related questions.",
  path: "/group-coaching",
});

const decided = [
  "The work will be coaching, with responsibility staying with each participant.",
  "Each group will need a shared working context. A loose collection of attendees is not enough.",
  "Confidentiality, participation and the boundary between shared and individual work will be agreed before a group begins.",
  "Details will be published only when the format is ready.",
] as const;

export default function GroupCoachingPage() {
  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Group coaching" },
        ]}
        lead="If several leaders share a leadership question, a group may help them learn together while each person keeps responsibility for their own change. The audience, size, rhythm and fee are not fixed yet."
        primary={{ label: "Register your interest", href: "/contact?details=open#contact-form" }}
        secondary={{ label: "See individual coaching", href: "/executive-coaching" }}
        title="A shared coaching format is in development."
      />

      <section className={styles.section} aria-labelledby="group-coaching-status">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <h2 className={styles.sectionTitle} id="group-coaching-status">
              What will remain true.
            </h2>
          </div>
          <div>
            <p className={styles.sectionIntro}>
              I will publish the full format only after it has been tested. Until then,
              these are the boundaries I will keep.
            </p>
            <div className={styles.spacedTop}>
              <PlainList items={decided} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="future-group-details">
        <div className={styles.container}>
          <SectionHeading
            id="future-group-details"
            intro="The structure below is ready for the final content once the offer has been tested."
            title="Details that will be added before launch."
          />
          <dl className={groupStyles.futureDetails}>
            {["Who the group is for", "Group size and rhythm", "Confidentiality agreement", "Fees and dates"].map(
              (item) => (
                <div key={item}>
                  <dt>{item}</dt>
                  <dd>To be confirmed.</dd>
                </div>
              ),
            )}
          </dl>
        </div>
      </section>

      <EngagementProcess />

      <ContactBand
        href="/contact?details=open#contact-form"
        label="Tell me about the group"
        text="Describe the group and the questions its members are working on. I can note your interest while the offer is still in development."
        title="Interested in the group format?"
      />
    </div>
  );
}
