import { ServiceDetail } from "@/components/service-detail";
import { createPageMetadata } from "@/config/metadata";
import { SERVICES } from "@/content/services";

export const metadata = createPageMetadata({
  title: "Fractional People Leadership",
  description:
    "Part-time senior people leadership for companies that need clear ownership of the people agenda without a full-time executive hire.",
  path: "/fractional-people-leadership",
});

export default function FractionalPeopleLeadershipPage() {
  return <ServiceDetail service={SERVICES["fractional-people-leadership"]} />;
}
