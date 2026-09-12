import { BottleneckAssessmentPageView } from "@/components/service-pages/bottleneck-assessment-page";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Bottleneck Assessment",
  description:
    "A focused organisational assessment for leadership teams that can feel a recurring issue but cannot yet agree on its cause.",
  path: "/bottleneck-assessment",
});

export default function BottleneckAssessmentPage() {
  return <BottleneckAssessmentPageView locale="en" />;
}
