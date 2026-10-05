import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

/** PLACEHOLDER TEXT — replace with reviewed legal copy. See CONTENT_TODO.md. */
const sections: LegalSection[] = [
  {
    id: "algemeen",
    title: "Algemeen",
    body: [
      "Deze verklaring legt uit welke persoonsgegevens CRKL, Diksmuidsesteenweg 351a, 8800 Roeselare (BE 0550.981.180) verwerkt wanneer u deze website gebruikt, een tafel reserveert of een bestelling plaatst.",
    ],
  },
  {
    id: "gegevens",
    title: "Gegevens",
    body: [
      "Via de formulieren op deze website vragen we uw naam, e-mailadres, telefoonnummer en de gegevens van uw reservatie of aanvraag. We gebruiken ze om op uw vraag te antwoorden.",
    ],
  },
  {
    id: "rechten",
    title: "Rechten",
    body: [
      "U kan uw gegevens inkijken, laten verbeteren of laten wissen. Stuur daarvoor een bericht naar het adres hieronder.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Voor elke vraag over uw gegevens: info@crkl.eu of 051 51 08 52.",
    ],
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacyverklaring" sections={sections} />;
}
