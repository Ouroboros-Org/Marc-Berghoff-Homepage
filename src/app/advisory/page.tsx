import { ServiceDetail } from "@/components/service-detail";
import { createPageMetadata } from "@/config/metadata";
import { SERVICES } from "@/content/services";

export const metadata = createPageMetadata({
  title: "Strategic People Advisory",
  description:
    "An outside view for founders and leadership teams facing a difficult hire, role question, organisational change or people decision.",
  path: "/advisory",
});

export default function AdvisoryPage() {
  return <ServiceDetail service={SERVICES.advisory} />;
}
