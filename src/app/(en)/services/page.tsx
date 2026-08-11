import { ServicesLanding } from "@/components/service-pages/services-landing";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "How I Can Help",
  description:
    "See how the situation determines whether the work starts with evidence, coaching, advice, peers or a defined people-leadership remit.",
  path: "/services",
  languages: getLanguageAlternates("services"),
});

export default function ServicesPage() {
  return <ServicesLanding locale="en" />;
}
