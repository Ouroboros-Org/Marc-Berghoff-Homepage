import { ENGAGEMENT_PROCESS } from "@/content/engagement-process";

import styles from "./engagement-process.module.css";

export function EngagementProcess({
  title = "What happens after you get in touch.",
  intro = "The question comes before the format. I use the same four steps whether the work becomes coaching, advisory, assessment or a defined remit.",
  wide = false,
}: {
  title?: string;
  intro?: string;
  wide?: boolean;
} = {}) {
  return (
    <section className={styles.section} aria-labelledby="engagement-process-title">
      <div className={`${styles.container} ${wide ? styles.containerWide : ""}`}>
        <div className={styles.header}>
          <h2 id="engagement-process-title">{title}</h2>
          <p>{intro}</p>
        </div>
        <ol className={styles.steps}>
          {ENGAGEMENT_PROCESS.map((step, index) => (
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
