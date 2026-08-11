import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <section className="page-shell error-page">
      <div className="container error-page__inner">
        <h1>I could not find that page.</h1>
        <p>The link may be out of date. Start again from the homepage.</p>
        <ButtonLink href="/">Go to homepage</ButtonLink>
      </div>
    </section>
  );
}
