import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

/** PLACEHOLDER TEXT — replace with reviewed legal copy. See CONTENT_TODO.md. */
const sections: LegalSection[] = [
  {
    id: "algemeen",
    title: "Algemeen",
    body: [
      "Deze voorwaarden gelden voor reservaties bij en bestellingen via CRKL, Diksmuidsesteenweg 351a, 8800 Roeselare (BE 0550.981.180).",
    ],
  },
  {
    id: "reservaties",
    title: "Reservaties",
    body: [
      "Een reservatie via deze website is een aanvraag. Ze ligt vast zodra het restaurant ze bevestigt.",
    ],
  },
  {
    id: "bestellingen",
    title: "Bestellingen",
    body: [
      "De voorwaarden voor de webshop — prijzen, levering, herroepingsrecht — worden hier opgenomen zodra de shop opent.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Vragen over deze voorwaarden: info@crkl.eu of 051 51 08 52.",
    ],
  },
];

export default function TermsPage() {
  return <LegalPage title="Algemene voorwaarden" sections={sections} />;
}
