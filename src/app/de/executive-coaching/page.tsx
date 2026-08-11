import { ExecutiveCoachingPageView } from "@/components/service-pages/executive-coaching-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Executive Coaching",
  description:
    "Einzel- oder Gruppencoaching für Führungskräfte, deren Rolle schneller gewachsen ist als ihre bisherige Art zu führen.",
  path: "/de/executive-coaching",
  locale: "de_DE",
  languages: getLanguageAlternates("executiveCoaching"),
});

export default function GermanExecutiveCoachingPage() {
  return <ExecutiveCoachingPageView locale="de" />;
}
