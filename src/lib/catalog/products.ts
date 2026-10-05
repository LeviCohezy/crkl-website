import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";
import type { Product } from "./types";

/**
 * PLACEHOLDER CATALOGUE.
 *
 * The three gift boxes are stand-ins: their names, contents and prices are
 * invented so the shop, cart and checkout can be seen working, and none of
 * the photographs shows an actual box. Replace all of it before the shop
 * opens — see CONTENT_TODO.md. The gift voucher is real and is sold through
 * Tablefever today.
 *
 * This file is read only through `src/lib/catalog/index.ts`, whose functions
 * are async on purpose: when the catalogue moves to a CMS, a database or
 * Stripe products, only that file changes and every page keeps working.
 */
export const products: Product[] = [
  {
    slug: "geschenkbox-aperitief",
    name: "Geschenkbox Aperitief",
    category: "geschenkbox",
    tagline: "Een fles om te delen en iets om erbij te knabbelen.",
    description:
      "De kleinste box van het huis: een fles uit onze kelder met een paar huisgemaakte hapjes voor het aperitief.",
    contents: ["Een fles uit onze kelder", "Huisgemaakte aperitiefhapjes"],
    image: shoot.flessen,
    imageAlt: "Drie flessen op een witte tafel voor het roze gordijn",
    featured: true,
    commerce: { priceCents: 4500, inStock: true },
  },
  {
    slug: "geschenkbox-tafel",
    name: "Geschenkbox Tafel",
    category: "geschenkbox",
    tagline: "Alles voor een avond aan tafel, thuis.",
    description:
      "Een ruimere box met een fles, huisgemaakte lekkernijen en zoetigheden van de keuken om de avond mee af te sluiten.",
    contents: [
      "Een fles uit onze kelder",
      "Huisgemaakte lekkernijen",
      "Zoetigheden bij de koffie",
    ],
    image: shoot.juli26(40),
    imageAlt: "Koffie en zoetigheden voor de roze wand",
    featured: true,
    commerce: { priceCents: 7500, inStock: true },
  },
  {
    slug: "geschenkbox-crkl",
    name: "Geschenkbox CRKL",
    category: "geschenkbox",
    tagline: "De box, met een cadeaubon voor het restaurant.",
    description:
      "De grote box: wat er in de andere zit, aangevuld met een cadeaubon om het echte werk aan tafel te komen proeven.",
    contents: [
      "Een fles uit onze kelder",
      "Huisgemaakte lekkernijen",
      "Zoetigheden bij de koffie",
      "Een cadeaubon voor het restaurant",
    ],
    image: shoot.juni26(37),
    imageAlt: "Wijnflessen op een houten vat",
    featured: true,
    commerce: { priceCents: 12500, inStock: true },
  },
  {
    slug: "cadeaubon",
    name: "Cadeaubon",
    category: "cadeaubon",
    tagline: "Een verfijnde culinaire ervaring, perfect voor elke gelegenheid.",
    description:
      "Met de CRKL cadeaubon schenkt u een avond aan tafel. De waarde kiest u volledig zelf en de bon is één jaar geldig.",
    contents: ["Waarde naar keuze", "Eén jaar geldig"],
    image: shoot.juli26(65),
    imageAlt: "Glazen en het CRKL-servet in het zonlicht",
    externalUrl: site.links.giftVoucher,
  },
];
