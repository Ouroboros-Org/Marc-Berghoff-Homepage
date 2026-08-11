import type { Metadata } from "next";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/inter";
import "./globals.css";

import { ButtonLink } from "@/components/button";
import { getSiteUrl } from "@/config/site";

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
          <section className="page-shell error-page">
            <div className="container error-page__inner">
              <h1>This page is not here.</h1>
              <p>The link may be old, or the page may have moved.</p>
              <ButtonLink href="/">Go to the homepage</ButtonLink>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
