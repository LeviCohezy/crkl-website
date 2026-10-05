export type ProductCategory = "geschenkbox" | "cadeaubon" | "overige";

/**
 * Commerce fields are deliberately a separate, optional block.
 *
 * Right now they drive what the site *displays* and what the cart adds up.
 * When payments open, `stripePriceId` is what a checkout session is created
 * from, and `inStock` can be swapped for a live inventory lookup — without
 * changing the pages that render a product. See docs/ECOMMERCE-ROADMAP.md.
 */
export type ProductCommerce = {
  /** Integer cents, the unit Stripe expects. */
  priceCents: number;
  stripeProductId?: string;
  stripePriceId?: string;
  inStock: boolean;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  /** What is in the box, one line per item. */
  contents: string[];
  /** Path under public/images — see src/lib/media. */
  image: string;
  imageAlt: string;
  featured?: boolean;
  commerce?: ProductCommerce;
  /** Sold somewhere else for now (the gift voucher, through Tablefever). */
  externalUrl?: string;
};
