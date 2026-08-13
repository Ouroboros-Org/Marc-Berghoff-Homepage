import { ResultsPageView } from "@/components/results-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Ausgewählte Arbeit",
  description:
    "Ausgewählte Mandate in Coaching, Beratung und HR-Verantwortung sowie Vorträge und Lehre auf Malta und international.",
  path: "/de/results",
  locale: "de_DE",
  languages: getLanguageAlternates("results"),
});

export default function GermanResultsPage() {
  return <ResultsPageView locale="de" />;
}
