import { AboutPageView } from "@/components/about-page";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Organisational psychologist, Vistage Chair and executive coach working with founders and leadership teams across Malta, Germany and the wider EU.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageView locale="en" />;
}
