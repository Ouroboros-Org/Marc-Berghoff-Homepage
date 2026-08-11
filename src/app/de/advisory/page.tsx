import { AdvisoryPageView } from "@/components/service-pages/advisory-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Strategic People Advisory",
  description:
    "Eine offene zweite Sicht auf eine People-, Rollen- oder Organisationsentscheidung, die bei Ihnen bleibt.",
  path: "/de/advisory",
  locale: "de_DE",
  languages: getLanguageAlternates("advisory"),
});

export default function GermanAdvisoryPage() {
  return <AdvisoryPageView locale="de" />;
}
