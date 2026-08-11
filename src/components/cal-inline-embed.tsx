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
    return null;
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
