import type { Wine } from "./types";

/**
 * PLACEHOLDER CATALOGUE — replace with the real range.
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
    region: "Loire, France",
    grapes: ["Chenin Blanc"],
    abv: 12.5,
    volumeMl: 750,
    tagline: "Chalk, quince and a long dry finish.",
    description:
      "Hand-picked Chenin from old vines on tuffeau. Whole-bunch pressed, wild ferment in used oak, nine months on fine lees. Bottled without fining.",
    tastingNotes: ["Quince", "Chalk", "Camomile", "Salted lemon"],
    pairings: ["Oysters", "Roast chicken", "Aged goat cheese"],
    image: "wines/crkl-blanc.jpg",
    featured: true,
    commerce: { priceCents: 2400, inStock: true },
  },
  {
    slug: "crkl-rouge",
    name: "CRKL Rouge",
    vintage: 2022,
    style: "red",
    region: "Beaujolais, France",
    grapes: ["Gamay"],
    abv: 13,
    volumeMl: 750,
    tagline: "Crunchy red fruit, served cool.",
    description:
      "Semi-carbonic Gamay from granite slopes. Four days on skins, no added sulphur until bottling. Drink it with a slight chill.",
    tastingNotes: ["Morello cherry", "Violet", "Wet stone", "Black pepper"],
    pairings: ["Charcuterie", "Grilled mushrooms", "Steak frites"],
    image: "wines/crkl-rouge.jpg",
    featured: true,
    commerce: { priceCents: 2600, inStock: true },
  },
  {
    slug: "crkl-bulles",
    name: "CRKL Bulles",
    vintage: null,
    style: "sparkling",
    region: "Limoux, France",
    grapes: ["Mauzac", "Chardonnay"],
    abv: 11.5,
    volumeMl: 750,
    tagline: "The crackle the house is named after.",
    description:
      "Méthode ancestrale, bottled before the first ferment finishes. Fifteen months on the cork, disgorged by hand. Fine, insistent bubbles.",
    tastingNotes: ["Green apple", "Brioche", "White blossom"],
    pairings: ["Aperitif", "Fried fish", "Anything celebratory"],
    image: "wines/crkl-bulles.jpg",
    featured: true,
    commerce: { priceCents: 2900, inStock: true },
  },
  {
    slug: "crkl-rose",
    name: "CRKL Rosé",
    vintage: 2023,
    style: "rosé",
    region: "Provence, France",
    grapes: ["Cinsault", "Grenache"],
    abv: 12,
    volumeMl: 750,
    tagline: "Pale, dry, and not remotely sweet.",
    description:
      "Direct press at dawn, cold ferment in stainless, four months on lees. Built for the table rather than the pool.",
    tastingNotes: ["Redcurrant", "Grapefruit pith", "Thyme"],
    pairings: ["Tomato salad", "Grilled prawns", "Soft cheese"],
    image: "wines/crkl-rose.jpg",
    commerce: { priceCents: 2200, inStock: false },
  },
  {
    slug: "crkl-orange",
    name: "CRKL Orange",
    vintage: 2022,
    style: "orange",
    region: "Friuli, Italy",
    grapes: ["Ribolla Gialla"],
    abv: 13,
    volumeMl: 750,
    tagline: "Three weeks on skins. Worth the chew.",
    description:
      "Ribolla Gialla macerated in amphora, pressed to old barrels, bottled unfiltered. Tannic, savoury and surprisingly precise.",
    tastingNotes: ["Dried apricot", "Black tea", "Orange peel", "Walnut skin"],
    pairings: ["Hard cheese", "Spiced lamb", "Miso aubergine"],
    image: "wines/crkl-orange.jpg",
    commerce: { priceCents: 2800, inStock: true },
  },
];
