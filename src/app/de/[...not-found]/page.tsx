import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  description: "Die angeforderte Seite ist nicht vorhanden.",
  robots: { index: false, follow: true },
};

export default function UnknownGermanRoute() {
  notFound();
}
