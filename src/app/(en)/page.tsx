import { HomePageView } from "@/components/home-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";
import { getHomeCopy } from "@/content/home";

const copy = getHomeCopy("en");

export const metadata = createPageMetadata({
  title: copy.metadata.title,
  description: copy.metadata.description,
  path: "/",
  languages: getLanguageAlternates("home"),
});

export default function HomePage() {
  return <HomePageView locale="en" />;
}
