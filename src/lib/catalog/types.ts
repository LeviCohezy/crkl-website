export type WineStyle = "red" | "white" | "rosé" | "orange" | "sparkling";

/**
 * Commerce fields are deliberately a separate, optional block.
 *
 * Right now they only drive what the site *displays*. When the shop opens,
 * `stripePriceId` is what a checkout session is created from, and `inStock`
 * can be swapped for a live inventory lookup — without changing the pages
 * that render a wine. See docs/ECOMMERCE-ROADMAP.md.
 */
export type WineCommerce = {
  /** Integer cents, the unit Stripe expects. */
  priceCents: number;
  stripeProductId?: string;
  stripePriceId?: string;
  inStock: boolean;
};

export type Wine = {
  slug: string;
  name: string;
  /** null for a non-vintage blend. */
  vintage: number | null;
  style: WineStyle;
  region: string;
  grapes: string[];
  /** Alcohol by volume, percent. */
  abv: number;
  volumeMl: number;
  tagline: string;
  description: string;
  tastingNotes: string[];
  pairings: string[];
  /** Path under public/images — see src/lib/media. */
  image: string;
  featured?: boolean;
  commerce?: WineCommerce;
};
