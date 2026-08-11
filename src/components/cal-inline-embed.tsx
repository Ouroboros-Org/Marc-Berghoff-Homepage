"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { ButtonLink } from "@/components/button";
import type { SiteLocale } from "@/config/routes";
import { siteConfig } from "@/config/site";

import styles from "./cal-inline-embed.module.css";

const NAMESPACE = "first-conversation";

export function CalInlineEmbed({
  calLink,
  locale = "en",
}: {
  calLink: string | null;
  locale?: SiteLocale;
}) {
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
      <div className={styles.fallback} role="status">
        <p>
          {locale === "de"
            ? "Der Buchungskalender steht derzeit nicht zur Verfügung. Schreiben Sie mir direkt, damit wir einen Termin finden."
            : "The booking calendar is currently unavailable. Email me directly and we will find a time."}
        </p>
        <ButtonLink href={`mailto:${siteConfig.contact.email}`} variant="secondary">
          {locale === "de" ? "E-Mail schreiben" : "Send an email"}
        </ButtonLink>
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
