import { ExecutiveCoachingPageView } from "@/components/service-pages/executive-coaching-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Executive Coaching",
  description:
    "Individual or group coaching for leaders whose role has outgrown the way they currently lead.",
  path: "/executive-coaching",
  languages: getLanguageAlternates("executiveCoaching"),
});

export default function ExecutiveCoachingPage() {
  return <ExecutiveCoachingPageView locale="en" />;
}
