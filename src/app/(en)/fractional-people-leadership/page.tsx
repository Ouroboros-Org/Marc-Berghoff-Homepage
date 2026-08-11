import { FractionalPeopleLeadershipPageView } from "@/components/service-pages/fractional-people-leadership-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Fractional People Leadership",
  description:
    "Senior direction and decision-making for a capable people team, within a defined remit and agreed end point.",
  path: "/fractional-people-leadership",
  languages: getLanguageAlternates("fractionalPeopleLeadership"),
});

export default function FractionalPeopleLeadershipPage() {
  return <FractionalPeopleLeadershipPageView locale="en" />;
}
