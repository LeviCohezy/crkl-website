import { wines } from "./wines";
import type { Wine, WineStyle } from "./types";

export type { Wine, WineCommerce, WineStyle } from "./types";

/**
 * The catalogue data access layer.
 *
 * These are async even though the data is local — that keeps every call site
 * ready for the day the catalogue comes from a CMS, a database or the Stripe
 * product API instead.
 */

export async function getWines(): Promise<Wine[]> {
  return wines;
}

export async function getFeaturedWines(limit = 3): Promise<Wine[]> {
  return wines.filter((wine) => wine.featured).slice(0, limit);
}

export async function getWine(slug: string): Promise<Wine | null> {
  return wines.find((wine) => wine.slug === slug) ?? null;
}

export async function getWineSlugs(): Promise<string[]> {
  return wines.map((wine) => wine.slug);
}

export const styleLabels: Record<WineStyle, string> = {
  red: "Rood",
  white: "Wit",
  "rosé": "Rosé",
  orange: "Oranje",
  sparkling: "Mousserend",
};

/** "CRKL Blanc 2023" — vintage appended only when there is one. */
export function wineTitle(wine: Wine): string {
  return wine.vintage ? `${wine.name} ${wine.vintage}` : wine.name;
}
