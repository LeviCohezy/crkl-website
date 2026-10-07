import type { LegalSection } from "@/components/sections/LegalPage";

/**
 * The four legal texts, shared by every version of the site.
 *
 * PLACEHOLDER TEXT — none of this is reviewed legal copy. Each page says so
 * at the top and is kept out of search engines. See CONTENT_TODO.md.
 */
export const legal = {
  privacy: [
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
      body: ["Voor elke vraag over uw gegevens: info@crkl.eu of 051 51 08 52."],
    },
  ] satisfies LegalSection[],
  terms: [
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
      body: ["Vragen over deze voorwaarden: info@crkl.eu of 051 51 08 52."],
    },
  ] satisfies LegalSection[],
  cookies: [
    {
      id: "algemeen",
      title: "Algemeen",
      body: ["Deze website gebruikt zo weinig cookies als mogelijk."],
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
      body: ["Vragen over cookies: info@crkl.eu."],
    },
  ] satisfies LegalSection[],
  accessibility: [
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
  ] satisfies LegalSection[],
};
