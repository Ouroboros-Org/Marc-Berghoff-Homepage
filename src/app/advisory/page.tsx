import { ServiceDetail } from "@/components/service-detail";
import { createPageMetadata } from "@/config/metadata";
import { SERVICES } from "@/content/services";

export const metadata = createPageMetadata({
  title: "Strategic People Advisory",
  description:
    "Independent strategic people advice for founders and leadership teams facing role questions, organisational change or a consequential decision.",
  path: "/advisory",
});

export default function AdvisoryPage() {
  return <ServiceDetail service={SERVICES.advisory} />;
}
