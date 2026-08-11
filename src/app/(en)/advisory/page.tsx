import { AdvisoryPageView } from "@/components/service-pages/advisory-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Strategic People Advisory",
  description:
    "A candid second view on a people, role or organisation decision that remains yours to make.",
  path: "/advisory",
  languages: getLanguageAlternates("advisory"),
});

export default function AdvisoryPage() {
  return <AdvisoryPageView locale="en" />;
}
