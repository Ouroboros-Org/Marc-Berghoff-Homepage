import { BottleneckAssessmentPageView } from "@/components/service-pages/bottleneck-assessment-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Bottleneck Assessment",
  description:
    "Eine gezielte Organisationsanalyse für Führungsteams, die ein wiederkehrendes Problem spüren, sich über seine Ursache aber noch nicht einig sind.",
  path: "/de/bottleneck-assessment",
  locale: "de_DE",
  languages: getLanguageAlternates("bottleneckAssessment"),
});

export default function GermanBottleneckAssessmentPage() {
  return <BottleneckAssessmentPageView locale="de" />;
}
