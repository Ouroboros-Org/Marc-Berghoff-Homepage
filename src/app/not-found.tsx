import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="page-shell error-page">
      <div className="container error-page__inner">
        <p className="eyebrow">404</p>
        <h1>This page does not exist.</h1>
        <p>The link may be out of date, or the page may have moved.</p>
        <ButtonLink href="/">Return home</ButtonLink>
      </div>
    </section>
  );
}
