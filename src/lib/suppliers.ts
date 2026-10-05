import { shoot, type Photo } from "@/lib/photos";

/**
 * The people behind the produce, from the HABLAR supplier series (June 2026).
 *
 * Two names are legible in the photographs themselves — 't Groendal on the
 * cheese label, Le Monde des Mille Couleurs on the sign in the field. The
 * other two are described by trade only. All of it needs confirming: see
 * CONTENT_TODO.md.
 */
export type Supplier = {
  id: string;
  trade: string;
  /** Empty until the name is confirmed. */
  name: string;
  title: string;
  body: string;
  /** The restaurant's pink chair, photographed on location. */
  chair: Photo;
  photos: [Photo, Photo, Photo];
};

export const suppliers: Supplier[] = [
  {
    id: "rund",
    trade: "De veehouder",
    name: "",
    title: "Runderen die buiten grazen",
    body: "Wie weet waar een dier heeft gelopen, kookt er anders mee. We gaan zelf kijken, in de wei, tussen de kudde.",
    chair: {
      src: shoot.leveranciers(31),
      alt: "De roze stoel van CRKL tussen de runderen",
    },
    photos: [
      { src: shoot.leveranciers(7), alt: "Een rund kijkt recht in de lens" },
      {
        src: shoot.leveranciers(25),
        alt: "De chef en de veehouder tussen de kudde",
      },
      { src: shoot.leveranciers(43), alt: "Runderen in de wei" },
    ],
  },
  {
    id: "kaas",
    trade: "De kaasmaker",
    name: "'t Groendal",
    title: "Kaas die tijd krijgt",
    body: "Roeselaarse kaas, gerijpt op houten planken tot hij klaar is. Hij sluit bij ons de maaltijd af, op het kaasbord.",
    chair: {
      src: shoot.leveranciers(91),
      alt: "De roze stoel van CRKL in de rijpingskelder",
    },
    photos: [
      { src: shoot.leveranciers(64), alt: "Kaasbollen op houten planken" },
      {
        src: shoot.leveranciers(79),
        alt: "De chef met een kaas in de rijpingskelder",
      },
      { src: shoot.leveranciers(55), alt: "Wrongel in witte vormen" },
    ],
  },
  {
    id: "aardbei",
    trade: "De aardbeienteler",
    name: "",
    title: "Aardbeien, geplukt als ze rijp zijn",
    body: "Geen dag te vroeg. De chef loopt mee door de rijen en proeft voor hij bestelt.",
    chair: {
      src: shoot.leveranciers(112),
      alt: "De roze stoel van CRKL tussen de aardbeien",
    },
    photos: [
      { src: shoot.leveranciers(103), alt: "Rijpe aardbeien aan de plant" },
      {
        src: shoot.leveranciers(115),
        alt: "De chef plukt een aardbei in de serre",
      },
      { src: shoot.leveranciers(127), alt: "Aardbeien van dichtbij" },
    ],
  },
  {
    id: "bloemen",
    trade: "De kruidenkweker",
    name: "Le Monde des Mille Couleurs",
    title: "Kruiden en bloemen in duizend kleuren",
    body: "Een serre vol eetbare bloemen, vergeten kruiden en jonge groenten. Wat hier 's ochtends geplukt wordt, ligt 's avonds op het bord.",
    chair: {
      src: shoot.leveranciers(160),
      alt: "De roze stoel van CRKL tussen de bloemen",
    },
    photos: [
      {
        src: shoot.leveranciers(193),
        alt: "Eetbare bloemen in de hand van de chef",
      },
      {
        src: shoot.leveranciers(229),
        alt: "De chef met een krat verse kruiden",
      },
      { src: shoot.leveranciers(250), alt: "Korenbloemen op het veld" },
    ],
  },
];
