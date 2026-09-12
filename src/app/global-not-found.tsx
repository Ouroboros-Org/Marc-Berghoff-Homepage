import type { Metadata } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/inter";
import "./globals.css";

import { ButtonLink } from "@/components/button";
import { getSiteUrl } from "@/config/site";
import styles from "@/components/pages/utility-pages.module.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Page not found | Marc Berghoff",
  description: "The requested page does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en-GB">
      <body>
        <main>
          <section className={styles.error}>
            <div className={styles.container}>
              <h1 className={styles.title}>I could not find that page.</h1>
              <p className={styles.lead}>The link may be out of date. Start again from the homepage.</p>
              <ButtonLink href="/">Go to homepage</ButtonLink>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
