import { products } from "./products";
import type { Product, ProductCategory } from "./types";

export type { Product, ProductCategory, ProductCommerce } from "./types";

/**
 * The catalogue data access layer.
 *
 * These are async even though the data is local — that keeps every call site
 * ready for the day the catalogue comes from a CMS, a database or the Stripe
 * product API instead.
 */

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  return products.filter((product) => product.category === category);
}

export async function getProduct(slug: string): Promise<Product | null> {
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug);
}

export const categoryLabels: Record<ProductCategory, string> = {
  geschenkbox: "Geschenkbox",
  cadeaubon: "Cadeaubon",
  overige: "Overige",
};
