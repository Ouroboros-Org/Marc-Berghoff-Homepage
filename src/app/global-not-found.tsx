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
              <h1>I could not find that page.</h1>
              <p>The link may be out of date. Start again from the homepage.</p>
              <ButtonLink href="/">Go to homepage</ButtonLink>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
