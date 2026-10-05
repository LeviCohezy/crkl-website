import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Toegankelijkheid",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

/** PLACEHOLDER TEXT — replace with reviewed legal copy. See CONTENT_TODO.md. */
const sections: LegalSection[] = [
  {
    id: "algemeen",
    title: "Algemeen",
    body: [
      "We willen dat iedereen deze website kan gebruiken, ook met een toetsenbord of een schermlezer, en ook wie liever minder beweging op het scherm ziet.",
    ],
  },
  {
    id: "website",
    title: "De website",
    body: [
      "Animaties worden uitgeschakeld wanneer uw toestel om minder beweging vraagt. Alle foto's hebben een beschrijving en alle formulieren zijn met het toetsenbord in te vullen.",
    ],
  },
  {
    id: "restaurant",
    title: "Het restaurant",
    body: [
      "Heeft u een vraag over de toegankelijkheid van het restaurant zelf? Bel ons vooraf; we helpen u graag.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Loopt u op deze website ergens tegenaan? Laat het weten via info@crkl.eu of 051 51 08 52.",
    ],
  },
];

export default function AccessibilityPage() {
  return <LegalPage title="Toegankelijkheid" sections={sections} />;
}
