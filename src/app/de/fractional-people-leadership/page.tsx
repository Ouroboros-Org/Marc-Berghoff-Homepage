import { FractionalPeopleLeadershipPageView } from "@/components/service-pages/fractional-people-leadership-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Fractional People Leadership",
  description:
    "Erfahrene Richtung und Entscheidungen für ein fähiges People-Team, mit klarem Auftrag und vereinbartem Endpunkt.",
  path: "/de/fractional-people-leadership",
  locale: "de_DE",
  languages: getLanguageAlternates("fractionalPeopleLeadership"),
});

export default function GermanFractionalPeopleLeadershipPage() {
  return <FractionalPeopleLeadershipPageView locale="de" />;
}
