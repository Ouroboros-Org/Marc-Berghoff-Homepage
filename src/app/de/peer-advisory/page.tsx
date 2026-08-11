import { PeerAdvisoryPageView } from "@/components/service-pages/peer-advisory-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Peer Advisory",
  description:
    "Eine vertrauliche Runde von Führungskräften ohne gegenseitige Berichtslinie, die an ihren aktuellen Entscheidungen arbeiten.",
  path: "/de/peer-advisory",
  locale: "de_DE",
  languages: getLanguageAlternates("peerAdvisory"),
});

export default function GermanPeerAdvisoryPage() {
  return <PeerAdvisoryPageView locale="de" />;
}
