"use client";

import Image from "next/image";
import { useState } from "react";
import { TransitionLink } from "@/components/shell/PageTransition";
import { ArrowLink, SolidLink } from "@/components/ui/Button";
import { addToCart, removeFromCart, setQuantity, useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { imageUrl } from "@/lib/media";

export type Delivery = "ophalen" | "verzending";

/** Lines of the cart joined to the catalogue; unknown slugs are dropped. */
export function useCartLines(products: Product[]) {
  const cart = useCart();
  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    return product?.commerce
      ? [{ product, quantity: line.quantity, priceCents: product.commerce.priceCents }]
      : [];
  });
  const subtotal = lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  return { lines, subtotal, count };
}

/**
 * The cart page below its title: the lines, the summary that leads to
 * checkout, and — when the voucher is not in the cart — one suggestion.
 * Prices are read from the catalogue on every render, never from storage.
 */
export function CartView({ products }: { products: Product[] }) {
  const { lines, subtotal, count } = useCartLines(products);
  const [delivery, setDelivery] = useState<Delivery>("ophalen");
  const voucher = products.find((product) => product.category === "cadeaubon");

  if (count === 0) {
    return (
      <div className="border-t border-ink/15 py-24">
        <p className="font-display text-4xl font-light sm:text-5xl">
          Uw winkelmand is <em>leeg</em>
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <SolidLink href="/shop">Naar de shop</SolidLink>
          <ArrowLink href="/geschenkbox">Bekijk de geschenkbox</ArrowLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
      {/* ── Line items ─────────────────────────────────────────────────── */}
      <ul className="border-t border-ink/15 lg:col-span-7">
        {lines.map(({ product, quantity, priceCents }) => (
          <li
            key={product.slug}
            className="grid grid-cols-[5.5rem_1fr] gap-x-6 gap-y-4 border-b border-ink/15 py-7 sm:grid-cols-[7rem_1fr_auto] sm:items-center"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-petal">
              <Image
                src={imageUrl(product.image)}
                alt={product.imageAlt}
                fill
                sizes="7rem"
                className="object-cover"
              />
            </div>
            <div>
              <TransitionLink
                href={`/shop/${product.slug}`}
                className="font-display text-2xl leading-tight font-light sm:text-3xl"
              >
                {product.name}
              </TransitionLink>
              <p className="mt-1 text-sm text-ink-soft tabular-nums">
                {formatPrice(priceCents)} per stuk
              </p>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center border border-ink/20">
                  <button
                    type="button"
                    aria-label={`Eén ${product.name} minder`}
                    onClick={() => setQuantity(product.slug, quantity - 1)}
                    className="h-10 w-10 transition-colors hover:bg-petal"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Eén ${product.name} meer`}
                    onClick={() => setQuantity(product.slug, quantity + 1)}
                    className="h-10 w-10 transition-colors hover:bg-petal"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.slug)}
                  className="eyebrow link-line pb-1 text-ink-soft"
                >
                  Verwijder
                </button>
              </div>
            </div>
            <p className="font-display col-start-2 text-2xl font-light tabular-nums sm:col-start-3">
              {formatPrice(priceCents * quantity)}
            </p>
          </li>
        ))}
      </ul>

      {/* ── Summary ────────────────────────────────────────────────────── */}
      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="bg-blush p-8 sm:p-10 lg:sticky lg:top-28">
          <h2 className="eyebrow text-rosewood">Overzicht</h2>

          <dl className="mt-7 space-y-3">
            <div className="flex justify-between gap-6">
              <dt>Subtotaal</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <fieldset className="mt-7 border-t border-ink/20 pt-6">
            <legend className="eyebrow text-rosewood">Levering</legend>
            <label className="mt-4 flex cursor-pointer items-baseline justify-between gap-4">
              <span className="flex items-baseline gap-3">
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery === "ophalen"}
                  onChange={() => setDelivery("ophalen")}
                  className="accent-ink"
                />
                Ophalen in het restaurant
              </span>
              <span className="text-sm">Gratis</span>
            </label>
            <label className="mt-3 flex cursor-pointer items-baseline justify-between gap-4">
              <span className="flex items-baseline gap-3">
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery === "verzending"}
                  onChange={() => setDelivery("verzending")}
                  className="accent-ink"
                />
                Verzending in België
              </span>
              <span className="text-sm">Bij afrekenen</span>
            </label>
          </fieldset>

          <div className="mt-7 flex items-baseline justify-between gap-6 border-t border-ink/20 pt-6">
            <p>Totaal</p>
            <p className="font-display text-4xl font-light tabular-nums">
              {formatPrice(subtotal)}
            </p>
          </div>
          {delivery === "verzending" ? (
            <p className="mt-2 text-sm text-ink-soft">Exclusief verzendkosten.</p>
          ) : null}

          <div className="mt-9">
            <SolidLink href={`/checkout?levering=${delivery}`} className="w-full justify-between">
              Naar checkout
            </SolidLink>
          </div>
        </div>

        {/* ── Cross-sell: one item, and only the voucher ───────────────── */}
        {voucher?.externalUrl ? (
          <div className="mt-8 flex items-center gap-6 border border-dashed border-ink/25 p-6">
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden bg-petal">
              <Image
                src={imageUrl(voucher.image)}
                alt={voucher.imageAlt}
                fill
                sizes="5rem"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-display text-xl font-light">Vergeet de cadeaubon niet</p>
              <a
                href={voucher.externalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="eyebrow link-line mt-2 inline-block pb-1"
              >
                Voeg toe →
              </a>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

/** Re-exported so a product page can offer "add another" without the hook. */
export { addToCart };
