import { BottleneckDiagnostic } from "@/components/diagnostic";
import type { DiagnosticLocale } from "@/components/diagnostic/diagnostic-copy";

import styles from "@/components/diagnostic/diagnostic.module.css";

export function HomeDiagnosticDisclosure({
  locale = "en",
}: {
  locale?: DiagnosticLocale;
}) {
  return (
    <div className={styles.homeWrapper}>
      <BottleneckDiagnostic locale={locale} />
    </div>
  );
}
