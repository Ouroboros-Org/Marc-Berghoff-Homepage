import { ServicesLanding } from "@/components/service-pages/services-landing";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "How I Can Help",
  description:
    "Bottleneck Assessment, Strategic People Advisory and Fractional CPO support. Three flexible ways to work together, starting wherever you need help.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesLanding locale="en" />;
}
