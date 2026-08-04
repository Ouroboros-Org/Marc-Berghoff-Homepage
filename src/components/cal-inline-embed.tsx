"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import styles from "./cal-inline-embed.module.css";

const NAMESPACE = "first-conversation";

export function CalInlineEmbed({ calLink }: { calLink: string | null }) {
  useEffect(() => {
    if (!calLink) return;

    void (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        hideEventTypeDetails: false,
        styles: {
          body: { background: "#ffffff" },
          eventTypeListItem: { background: "#ffffff" },
        },
      });
    })();
  }, [calLink]);

  if (!calLink) {
    return (
      <div className={`${styles.shell} ${styles.fallbackShell}`}>
        <div className={styles.fallback}>
          <div>
            <h3>Online booking is being connected.</h3>
            <p>Send me a note below. I will arrange a time with you directly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <Cal
        calLink={calLink}
        className={styles.embed}
        config={{ layout: "month_view" }}
        namespace={NAMESPACE}
      />
    </div>
  );
}
