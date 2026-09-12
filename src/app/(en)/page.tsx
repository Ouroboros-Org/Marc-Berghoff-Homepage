import { HomePageView } from "@/components/home-page";
import { createPageMetadata } from "@/config/metadata";
import { getHomeCopy } from "@/content/home";

const copy = getHomeCopy("en");

export const metadata = createPageMetadata({
  title: copy.metadata.title,
  description: copy.metadata.description,
  path: "/",
});

export default function HomePage() {
  return <HomePageView locale="en" />;
}
