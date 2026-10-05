/**
 * The HABLAR library, by shoot.
 *
 * Every photograph lives in public/images/all/ under the photographer's own
 * filename. These helpers only spell those filenames out — `shoot.mei25(22)`
 * is `all/CRKL_Mei25_LR©HABLAR-22.jpg` — so a page can name a picture without
 * anyone retyping the © by hand. Paths still resolve through src/lib/media.
 */
export const shoot = {
  mei25: (n: number) => `all/CRKL_Mei25_LR©HABLAR-${n}.jpg`,
  juni25: (n: number) => `all/crkl_juni25_LR_©HABLAR-${n}.jpg`,
  okt25: (n: number) => `all/CRKL_okt25©HABLAR-${n}.jpg`,
  dec25: (n: number) => `all/CRKL_dec25©Hablar_lr-${n}.jpg`,
  jan26: (n: number) => `all/CRKL_Jan26_LR©Hablar-${n}.jpg`,
  maart26: (n: number) => `all/CRKL_Maart26©Hablar_Lr-${n}.jpg`,
  april26: (n: number) => `all/CRKL_april26©HABLAR.be-${n}.jpg`,
  jolien: (n: number) => `all/CRKL_J_april26©HABLAR.be-${n}.jpg`,
  juni26: (n: number) => `all/crkl_juni26_LR_©HABLAR-${n}.jpg`,
  juli26: (n: number) => `all/CRKL_Juli26_LR©Hablar-${n}.jpg`,
  leveranciers: (n: number) =>
    `all/CRKL_Leveranciers_Juni26_LR©Hablar-${n}.jpg`,
  /** The one un-numbered frame of the March shoot: three bottles on a table. */
  flessen: "all/CRKL_Maart26©Hablar_Lr.jpg",
} as const;

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, for photographs cropped far from their own ratio. */
  focus?: string;
};

/**
 * Dishes, in the order they are shown. The alt texts describe what is on the
 * plate as photographed; they are not the kitchen's dish names — see
 * CONTENT_TODO.md.
 */
export const dishes: Photo[] = [
  { src: shoot.mei25(22), alt: "Witte asperge met citroen en dille" },
  { src: shoot.maart26(34), alt: "Vis met gekleurde toetsen op een wit bord" },
  { src: shoot.mei25(47), alt: "Tartaar met bloemen en kruiden" },
  { src: shoot.juni26(30), alt: "Vis met grijze garnalen tussen de varens" },
  { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" },
  { src: shoot.dec25(13), alt: "Wintergerecht in een bord met reliëf" },
  { src: shoot.okt25(13), alt: "Dessert in de vorm van een rode appel" },
  { src: shoot.maart26(47), alt: "Vis in een schuimige saus" },
];
