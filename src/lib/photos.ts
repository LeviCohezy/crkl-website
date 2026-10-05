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
} as const;

export type Photo = {
  src: string;
  alt: string;
};

export type GalleryCategory = "gerechten" | "zaal" | "mensen" | "glas" | "veld";

export type GalleryPhoto = Photo & {
  category: GalleryCategory;
  /** Circles break the grid up; everything else is a 4:5 block. */
  shape?: "circle";
};

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "gerechten", label: "Gerechten" },
  { id: "zaal", label: "De zaal" },
  { id: "mensen", label: "Mensen" },
  { id: "glas", label: "In het glas" },
  { id: "veld", label: "Op het veld" },
];

/** The gallery page, in display order. */
export const gallery: GalleryPhoto[] = [
  { src: shoot.maart26(50), alt: "Vier borden van bovenaf op de houten vloer", category: "gerechten" },
  { src: shoot.jan26(17), alt: "Ronde tafel voor het koperen cirkelpaneel", category: "zaal", shape: "circle" },
  { src: shoot.mei25(55), alt: "Chef Sam tussen opgegooide aardbeien", category: "mensen" },
  { src: shoot.maart26(6), alt: "Langoustine op de grill, rook boven de tafel", category: "gerechten" },
  { src: shoot.juni25(35), alt: "Cocktail in de zon tegen een witte muur", category: "glas" },
  { src: shoot.okt25(55), alt: "Taartje op een witte kubus voor de roze wand", category: "gerechten", shape: "circle" },
  { src: shoot.juni26(8), alt: "Tafels onder het ronde wandpaneel", category: "zaal" },
  { src: shoot.leveranciers(112), alt: "De roze stoel tussen de aardbeien", category: "veld" },
  { src: shoot.mei25(22), alt: "Asperge met citroen en dille", category: "gerechten" },
  { src: shoot.jolien(2), alt: "Gastvrouw Jolien bij het gordijn", category: "mensen" },
  { src: shoot.juli26(75), alt: "Cocktails op de witte tafel", category: "glas", shape: "circle" },
  { src: shoot.dec25(1), alt: "Doorkijk naar een tafel tussen de gordijnen", category: "zaal" },
  { src: shoot.okt25(13), alt: "Dessert in de vorm van een rode appel", category: "gerechten" },
  { src: shoot.leveranciers(31), alt: "De roze stoel tussen de runderen", category: "veld" },
  { src: shoot.jan26(1), alt: "Bord van bovenaf, half op tapijt, half op hout", category: "gerechten", shape: "circle" },
  { src: shoot.juli26(54), alt: "Ronde tafel op het okeren tapijt", category: "zaal" },
  { src: shoot.okt25(22), alt: "De chef aan de pass, in zwart-wit", category: "mensen" },
  { src: shoot.maart26(36), alt: "Vis met gekleurde toetsen op een wit bord", category: "gerechten" },
  { src: shoot.maart26(5), alt: "Schuimwijn wordt uitgeschonken", category: "glas" },
  { src: shoot.leveranciers(160), alt: "De roze stoel tussen de bloemen in de serre", category: "veld", shape: "circle" },
  { src: shoot.juli26(18), alt: "Het terras onder de witte luifel", category: "zaal" },
  { src: shoot.mei25(47), alt: "Tartaar met bloemen en kruiden", category: "gerechten" },
  { src: shoot.juni25(6), alt: "De sommelier proeft een glas witte wijn", category: "mensen" },
  { src: shoot.juni26(30), alt: "Vis met grijze garnalen tussen de varens", category: "gerechten" },
  { src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht", category: "zaal", shape: "circle" },
  { src: shoot.leveranciers(91), alt: "De roze stoel tussen de kazen", category: "veld" },
  { src: shoot.juni25(31), alt: "Rode cocktail op de rand van de tafel", category: "glas" },
  { src: shoot.dec25(13), alt: "Wintergerecht in een bord met reliëf", category: "gerechten" },
  { src: shoot.juli26(26), alt: "Portret van een teamlid in de zaal", category: "mensen" },
  { src: shoot.juli26(40), alt: "Koffie en zoetigheden voor de roze wand", category: "gerechten" },
  { src: shoot.mei25(11), alt: "Boeket in de zaal", category: "zaal", shape: "circle" },
  { src: shoot.leveranciers(250), alt: "Korenbloemen op het veld", category: "veld" },
  { src: shoot.juni26(37), alt: "Wijnflessen op een houten vat", category: "glas" },
  { src: shoot.juni26(35), alt: "Vers gebakken brood", category: "gerechten" },
  { src: shoot.april26(15), alt: "Chef Sam met een langoustine op de schouder", category: "mensen" },
  { src: shoot.okt25(1), alt: "De lange tafel in The Room", category: "zaal" },
];
