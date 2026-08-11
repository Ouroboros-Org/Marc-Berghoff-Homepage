import { ButtonLink } from "@/components/button";
import { getRouteHref } from "@/config/routes";

export default function GermanNotFound() {
  return (
    <section className="page-shell error-page" lang="de">
      <div className="container error-page__inner">
        <h1>Diese Seite gibt es nicht.</h1>
        <p>Der Link ist möglicherweise veraltet oder die Seite wurde verschoben.</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={getRouteHref("home", "de")}>
            Zur Startseite
          </ButtonLink>
          <ButtonLink
            href={getRouteHref("contact", "de")}
            variant="secondary"
          >
            Kontakt aufnehmen
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
