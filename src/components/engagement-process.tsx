import type { SiteLocale } from "@/config/routes";
import { getEngagementProcess } from "@/content/engagement-process";

import styles from "./engagement-process.module.css";

export function EngagementProcess({
  title = "From a first conversation to work that moves.",
  intro = "You do not need to arrive with a diagnosis or a chosen service. We work out the right level of support together.",
  wide = false,
  locale = "en",
}: {
  title?: string;
  intro?: string;
  wide?: boolean;
  locale?: SiteLocale;
} = {}) {
  return (
    <section className={styles.section} aria-labelledby="engagement-process-title">
      <div className={`${styles.container} ${wide ? styles.containerWide : ""}`}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>How we begin</p>
          <h2 id="engagement-process-title">{title}</h2>
          <p>{intro}</p>
        </div>
        <ol className={styles.steps}>
          {getEngagementProcess(locale).map((step, index) => (
            <li className={styles.step} key={step.title}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.stepCopy}>
                <h3>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                <p className={styles.meta}>{step.meta}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
