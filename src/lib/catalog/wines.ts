import type { Wine } from "./types";

/**
 * PLACEHOLDER CATALOGUE — these five wines are invented. Replace them with
 * the real list (or hide /wijn) before the site goes live; see
 * CONTENT_TODO.md.
 *
 * This file is the current source of truth. It is read only through
 * `src/lib/catalog/index.ts`, whose functions are async on purpose: when the
 * catalogue moves to a CMS, a database or Stripe products, only that file
 * changes and every page keeps working.
 */
export const wines: Wine[] = [
  {
    slug: "crkl-blanc",
    name: "CRKL Blanc",
    vintage: 2023,
    style: "white",
    region: "Loire, Frankrijk",
    grapes: ["Chenin Blanc"],
    abv: 12.5,
    volumeMl: 750,
    tagline: "Krijt, kweepeer en een lange, droge afdronk.",
    description:
      "Met de hand geplukte chenin van oude stokken op tufsteen. Hele trossen geperst, spontane gisting op gebruikt eikenhout, negen maanden op de fijne gistlagen. Gebotteld zonder klaring.",
    tastingNotes: ["Kweepeer", "Krijt", "Kamille", "Gezouten citroen"],
    pairings: ["Oesters", "Gebraden kip", "Gerijpte geitenkaas"],
    image: "wines/crkl-blanc.jpg",
    featured: true,
    commerce: { priceCents: 2400, inStock: true },
  },
  {
    slug: "crkl-rouge",
    name: "CRKL Rouge",
    vintage: 2022,
    style: "red",
    region: "Beaujolais, Frankrijk",
    grapes: ["Gamay"],
    abv: 13,
    volumeMl: 750,
    tagline: "Knapperig rood fruit, koel geschonken.",
    description:
      "Semi-carbonische gamay van granieten hellingen. Vier dagen schilcontact, geen toegevoegd sulfiet tot bij de botteling. Licht gekoeld op zijn best.",
    tastingNotes: ["Morel", "Viooltje", "Natte steen", "Zwarte peper"],
    pairings: ["Charcuterie", "Gegrilde paddenstoelen", "Steak friet"],
    image: "wines/crkl-rouge.jpg",
    featured: true,
    commerce: { priceCents: 2600, inStock: true },
  },
  {
    slug: "crkl-bulles",
    name: "CRKL Bulles",
    vintage: null,
    style: "sparkling",
    region: "Limoux, Frankrijk",
    grapes: ["Mauzac", "Chardonnay"],
    abv: 11.5,
    volumeMl: 750,
    tagline: "Fijne, hardnekkige bubbels.",
    description:
      "Méthode ancestrale, gebotteld voor de eerste gisting is afgelopen. Vijftien maanden op de kurk, met de hand gedegorgeerd.",
    tastingNotes: ["Groene appel", "Brioche", "Witte bloesem"],
    pairings: ["Aperitief", "Gebakken vis", "Alles wat gevierd mag worden"],
    image: "wines/crkl-bulles.jpg",
    featured: true,
    commerce: { priceCents: 2900, inStock: true },
  },
  {
    slug: "crkl-rose",
    name: "CRKL Rosé",
    vintage: 2023,
    style: "rosé",
    region: "Provence, Frankrijk",
    grapes: ["Cinsault", "Grenache"],
    abv: 12,
    volumeMl: 750,
    tagline: "Bleek, droog en allesbehalve zoet.",
    description:
      "Direct geperst bij zonsopgang, koud vergist op inox, vier maanden op de gistlagen. Gemaakt voor aan tafel.",
    tastingNotes: ["Rode bes", "Pompelmoesschil", "Tijm"],
    pairings: ["Tomatensalade", "Gegrilde gamba's", "Zachte kaas"],
    image: "wines/crkl-rose.jpg",
    commerce: { priceCents: 2200, inStock: false },
  },
  {
    slug: "crkl-orange",
    name: "CRKL Orange",
    vintage: 2022,
    style: "orange",
    region: "Friuli, Italië",
    grapes: ["Ribolla Gialla"],
    abv: 13,
    volumeMl: 750,
    tagline: "Drie weken op de schillen. Stevig en precies.",
    description:
      "Ribolla gialla, gemacereerd in amfoor, geperst naar oude vaten en ongefilterd gebotteld. Tanninerijk, hartig en verrassend precies.",
    tastingNotes: ["Gedroogde abrikoos", "Zwarte thee", "Sinaasappelschil", "Walnoot"],
    pairings: ["Harde kaas", "Gekruid lam", "Aubergine met miso"],
    image: "wines/crkl-orange.jpg",
    commerce: { priceCents: 2800, inStock: true },
  },
];
