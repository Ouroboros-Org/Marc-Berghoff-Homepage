import type { SiteLocale } from "@/config/routes";
import { getEngagementProcess } from "@/content/engagement-process";

import styles from "./engagement-process.module.css";

export function EngagementProcess({
  title,
  intro,
  wide = false,
  locale = "en",
}: {
  title?: string;
  intro?: string;
  wide?: boolean;
  locale?: SiteLocale;
} = {}) {
  const steps = getEngagementProcess(locale);
  const resolvedTitle =
    title ??
    (locale === "de"
      ? "Was nach Ihrer Kontaktaufnahme passiert."
      : "What happens after you get in touch.");
  const resolvedIntro =
    intro ??
    (locale === "de"
      ? "Die Frage kommt vor dem Format. Diese vier Schritte gelten unabhängig davon, wie die Zusammenarbeit danach aussieht."
      : "The question comes before the format. I use the same four steps whether the work becomes coaching, advisory, assessment or a defined remit.");

  return (
    <section className={styles.section} aria-labelledby="engagement-process-title">
      <div className={`${styles.container} ${wide ? styles.containerWide : ""}`}>
        <div className={styles.header}>
          <h2 id="engagement-process-title">{resolvedTitle}</h2>
          <p>{resolvedIntro}</p>
        </div>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li className={styles.step} key={step.title}>
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <p className={styles.meta}>{step.meta}</p>
              <h3>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
