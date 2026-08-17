import { AboutPageView } from "@/components/about-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Über mich",
  description:
    "Organisationspsychologe, Vistage Chair und Executive Coach für Gründer und Führungsteams in Malta, Deutschland und der übrigen EU.",
  path: "/de/about",
  locale: "de_DE",
  languages: getLanguageAlternates("about"),
});

export default function GermanAboutPage() {
  return <AboutPageView locale="de" />;
}
