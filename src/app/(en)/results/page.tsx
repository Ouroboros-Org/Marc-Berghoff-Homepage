import { ResultsPageView } from "@/components/results-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Selected Work",
  description:
    "Selected coaching, advisory, people-leadership, speaking and teaching work with organisations in Malta and internationally.",
  path: "/results",
  languages: getLanguageAlternates("results"),
});

export default function ResultsPage() {
  return <ResultsPageView locale="en" />;
}
