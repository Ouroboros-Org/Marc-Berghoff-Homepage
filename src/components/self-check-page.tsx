import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { BottleneckDiagnostic } from "@/components/diagnostic";
import { getRouteHref } from "@/config/routes";

import styles from "./self-check-page.module.css";

export function SelfCheckPageView() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <Breadcrumbs items={[{ label: "Self-check" }]} />
          <p className={styles.eyebrow}>Free · about 2 minutes</p>
          <h1 id="self-check-heading">A self-check for your company.</h1>
          <p className={styles.intro}>
            Ten statements offer a different angle on everyday decisions,
            responsibilities and follow-through. Take a moment to notice what
            feels familiar.
          </p>
        </div>
      </header>

      <section aria-labelledby="self-check-heading" className={styles.check}>
        <div className={styles.container}>
          <BottleneckDiagnostic className={styles.checkForm} id="self-check" introOnly />
        </div>
      </section>

      <aside aria-labelledby="reflection-title" className={styles.reflection}>
        <div className={styles.container}>
          <h2 id="reflection-title">Make it useful in your own way.</h2>
          <p>
            Pick one answer that made you pause. What happened last time? Would
            someone else in your team describe it the same way?
          </p>
          <p>
            Your answers offer one perspective on company patterns. They do not
            establish a cause. Choose what to explore next, whether on your own,
            with your team or in an optional conversation with me.
          </p>
          <Link href={getRouteHref("privacy")}>How optional sharing works</Link>
        </div>
      </aside>
    </div>
  );
}
