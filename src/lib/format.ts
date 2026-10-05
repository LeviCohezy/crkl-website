import { currency, locale } from "@/lib/site";

/** Prices are stored as integer cents, the same unit Stripe uses. */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function formatVolume(ml: number): string {
  return ml >= 1000 ? `${ml / 1000} L` : `${ml} ml`;
}
