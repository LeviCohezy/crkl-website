import { shoot, type Photo } from "@/lib/photos";

/**
 * The menus as published on crkl.eu. Prices are integer cents, like every
 * other amount in the codebase — format them with `formatPrice()`.
 *
 * The courses themselves are not listed: the kitchen works with a fixed menu
 * that changes with the season.
 */
export type MenuExtra = {
  label: string;
  /** Null when the extra has no price of its own. */
  priceCents: number | null;
  /** "+" for a supplement on top of the menu price. */
  supplement?: boolean;
};

export type Menu = {
  id: string;
  name: string;
  service: string;
  when: string;
  intro: string;
  options: { label: string; note?: string; priceCents: number }[];
  extras: MenuExtra[];
  photo: Photo;
};

export const menus: Menu[] = [
  {
    id: "crkl-plus",
    name: "Menu CRKL+",
    service: "Diner",
    when: "Woensdag tot zaterdag",
    intro:
      "Het tasting menu van het huis: vijf gangen waarin seizoensgebonden ingrediënten en verfijnde smaken centraal staan.",
    options: [{ label: "Vijf gangen", priceCents: 9500 }],
    extras: [
      { label: "Wijnpairing tot en met het hoofdgerecht", priceCents: 4000 },
      { label: "Aangepast non-alcoholisch sap", priceCents: 650 },
      {
        label: "Uit te breiden met het signature gerecht van de chef",
        priceCents: 3100,
        supplement: true,
      },
      { label: "Kaasbord", priceCents: 1500 },
      { label: "Kaas in plaats van dessert", priceCents: 1000 },
    ],
    photo: {
      src: shoot.maart26(12),
      alt: "Langoustine op de grill, voor het roze gordijn",
    },
  },
  {
    id: "carre-plus",
    name: "Menu Carré+",
    service: "Lunch",
    when: "Woensdag tot vrijdag",
    intro:
      "Vier gangen op de middag, bereid met dagverse en seizoensgebonden ingrediënten.",
    options: [{ label: "Vier gangen", priceCents: 7900 }],
    extras: [
      { label: "Wijnpairing tot en met het hoofdgerecht", priceCents: 3000 },
      { label: "Kaasbord", priceCents: 1500 },
      { label: "Kaas in plaats van dessert", priceCents: 1000 },
    ],
    photo: {
      src: shoot.maart26(36),
      alt: "Vis met gekleurde toetsen op een wit bord",
    },
  },
  {
    id: "lunch",
    name: "Lunchformule",
    service: "Lunch",
    when: "Woensdag tot vrijdag",
    intro:
      "Kwaliteit, finesse en een vlotte service — ideaal voor een ontspannen middag of een zakelijke afspraak.",
    options: [
      {
        label: "Lunchformule",
        note: "Voorgerecht & hoofdgerecht",
        priceCents: 4200,
      },
      { label: "Drie gangen", note: "Met dessert", priceCents: 5600 },
    ],
    extras: [],
    photo: {
      src: shoot.mei25(22),
      alt: "Asperge met citroen en dille",
    },
  },
];

/**
 * Plates for the scroll scene on the homepage and the season wall on the menu
 * page. The captions describe what is visibly on the plate and when it was
 * photographed — they are NOT the kitchen's dish names. See CONTENT_TODO.md.
 */
export type Plate = Photo & {
  name: string;
  components: string;
  season: string;
};

export const plates: Plate[] = [
  {
    name: "Asperge",
    components: "citroen · venkel · dille",
    season: "Lente 2025",
    src: shoot.mei25(22),
    alt: "Witte asperge met citroen en dille",
  },
  {
    name: "Langoustine",
    components: "van de grill · aan tafel gerookt",
    season: "Lente 2026",
    src: shoot.maart26(12),
    alt: "Langoustine op een grillschaal",
  },
  {
    name: "Noordzeevis",
    components: "wortel · biet · citrus",
    season: "Lente 2026",
    src: shoot.maart26(34),
    alt: "Vis met gekleurde toetsen op een wit bord",
  },
  {
    name: "Tartaar",
    components: "tuinkruiden · eetbare bloemen",
    season: "Lente 2025",
    src: shoot.mei25(47),
    alt: "Tartaar met bloemen en kruiden",
  },
  {
    name: "Grijze garnaal",
    components: "vis · zeegroenten · schaaldierenjus",
    season: "Zomer 2026",
    src: shoot.juni26(30),
    alt: "Vis met grijze garnalen tussen de varens",
  },
  {
    name: "Rund",
    components: "schorseneer · kroket · jus",
    season: "Winter 2026",
    src: shoot.jan26(19),
    alt: "Rundvlees met schorseneer en jus",
  },
  {
    name: "Knolselder",
    components: "paddenstoel · hazelnoot · jus",
    season: "Winter 2025",
    src: shoot.dec25(13),
    alt: "Wintergerecht in een bord met reliëf",
  },
  {
    name: "Appel",
    components: "het dessert als trompe-l'œil",
    season: "Herfst 2025",
    src: shoot.okt25(13),
    alt: "Dessert in de vorm van een rode appel",
  },
];
