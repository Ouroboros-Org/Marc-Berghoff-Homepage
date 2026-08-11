import { HomePageView } from "@/components/home-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";
import { getHomeCopy } from "@/content/home";

const copy = getHomeCopy("de");

export const metadata = createPageMetadata({
  title: copy.metadata.title,
  description: copy.metadata.description,
  path: "/de",
  locale: "de_DE",
  languages: getLanguageAlternates("home"),
});

export default function GermanHomePage() {
  return <HomePageView locale="de" />;
}
