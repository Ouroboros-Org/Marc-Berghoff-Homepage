import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <section className="page-shell error-page">
      <div className="container error-page__inner">
        <h1>This page is not here.</h1>
        <p>The link may be old, or the page may have moved.</p>
        <ButtonLink href="/">Go to the homepage</ButtonLink>
      </div>
    </section>
  );
}
