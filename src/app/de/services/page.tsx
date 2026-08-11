import { ServicesLanding } from "@/components/service-pages/services-landing";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Zusammenarbeit",
  description:
    "Die Situation bestimmt, ob die Arbeit mit Belegen, Coaching, Beratung, Peers oder einem klaren People-Leadership-Auftrag beginnt.",
  path: "/de/services",
  locale: "de_DE",
  languages: getLanguageAlternates("services"),
});

export default function GermanServicesPage() {
  return <ServicesLanding locale="de" />;
}
