import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Cookieverklaring",
  // A draft: kept out of search engines until the real text is in.
  robots: { index: false, follow: true },
};

/** PLACEHOLDER TEXT — replace with reviewed legal copy. See CONTENT_TODO.md. */
const sections: LegalSection[] = [
  {
    id: "algemeen",
    title: "Algemeen",
    body: [
      "Deze website gebruikt zo weinig cookies als mogelijk.",
    ],
  },
  {
    id: "gebruik",
    title: "Welke cookies",
    body: [
      "De site zelf bewaart uw winkelmand in de opslag van uw browser. De kaart op de contactpagina wordt geladen bij Google Maps, dat daarbij eigen cookies kan plaatsen.",
    ],
  },
  {
    id: "beheer",
    title: "Beheer",
    body: [
      "U kan cookies weigeren of verwijderen via de instellingen van uw browser.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Vragen over cookies: info@crkl.eu.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage title="Cookieverklaring" sections={sections}>
      {/* Reopens the consent manager once there is one. Functional, not a CTA. */}
      <button
        type="button"
        disabled
        className="eyebrow h-12 border border-ink/30 px-7 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Beheer voorkeuren
      </button>
    </LegalPage>
  );
}
