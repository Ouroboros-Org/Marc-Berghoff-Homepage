import { ServiceDetail } from "@/components/service-detail";
import { createPageMetadata } from "@/config/metadata";
import { SERVICES } from "@/content/services";

export const metadata = createPageMetadata({
  title: "Fractional Leadership",
  description:
    "Part-time senior ownership of a defined people and organisation remit while the permanent structure of the business is still taking shape.",
  path: "/fractional-people-leadership",
});

export default function FractionalPeopleLeadershipPage() {
  return <ServiceDetail service={SERVICES["fractional-people-leadership"]} />;
}
