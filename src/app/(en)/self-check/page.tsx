import { SelfCheckPageView } from "@/components/self-check-page";
import { createPageMetadata } from "@/config/metadata";
import { ROUTES } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Self-check",
  description:
    "A free, ten-statement self-check to reflect on decisions, responsibilities and everyday patterns in your company. See your result without an email address.",
  path: ROUTES.selfCheck,
});

export default function SelfCheckPage() {
  return <SelfCheckPageView />;
}
