import { ButtonLink } from "@/components/button";
import styles from "@/components/pages/utility-pages.module.css";

export default function NotFound() {
  return (
    <section className={styles.error}>
      <div className={styles.container}>
        <h1 className={styles.title}>I could not find that page.</h1>
        <p className={styles.lead}>The link may be out of date. Start again from the homepage.</p>
        <ButtonLink href="/">Go to homepage</ButtonLink>
      </div>
    </section>
  );
}
