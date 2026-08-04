import { ENGAGEMENT_PROCESS } from "@/content/engagement-process";

import styles from "./engagement-process.module.css";

export function EngagementProcess() {
  return (
    <section className={styles.section} aria-labelledby="engagement-process-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="engagement-process-title">What happens after you get in touch.</h2>
          <p>
            I use the same four steps for a fractional remit, advisory, an assessment
            or coaching.
          </p>
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
