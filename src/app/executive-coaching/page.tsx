import { ServiceDetail } from "@/components/service-detail";
import { createPageMetadata } from "@/config/metadata";
import { SERVICES } from "@/content/services";

export const metadata = createPageMetadata({
  title: "Individual Coaching",
  description:
    "Confidential one-to-one coaching for founders and senior leaders working through difficult decisions, demanding roles and recurring patterns.",
  path: "/executive-coaching",
});

export default function ExecutiveCoachingPage() {
  return <ServiceDetail service={SERVICES["executive-coaching"]} />;
}
