import { PageHero, secondaryPageStyles as styles } from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { getPrimaryContactAction } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Peer Advisory",
  description:
    "A room of leaders who do not report to each other, working on the decisions each of them is facing.",
  path: "/peer-advisory",
});

export default function PeerAdvisoryPage() {
  const contactAction = getPrimaryContactAction();

  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Peer Advisory" },
        ]}
        lead="A room of leaders who don't report to each other, working on the decisions each of them is facing."
        primary={contactAction}
        secondary={{ label: "See all services", href: "/services" }}
        title="Peer Advisory"
      />
    </div>
  );
}
