import { PeerAdvisoryPageView } from "@/components/service-pages/peer-advisory-page";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = createPageMetadata({
  title: "Peer Advisory",
  description:
    "A confidential room of leaders who do not report to each other, working on the decisions each of them is facing.",
  path: "/peer-advisory",
  languages: getLanguageAlternates("peerAdvisory"),
});

export default function PeerAdvisoryPage() {
  return <PeerAdvisoryPageView locale="en" />;
}
