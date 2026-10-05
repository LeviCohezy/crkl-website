"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { TransitionLink } from "@/components/shell/PageTransition";
import type { Product, ProductCategory } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { imageUrl } from "@/lib/media";

const EXPO = [0.16, 1, 0.3, 1] as const;

type Filter = ProductCategory | "alles";

const filters: { id: Filter; label: string }[] = [
  { id: "alles", label: "Alles" },
  { id: "geschenkbox", label: "Geschenkbox" },
  { id: "cadeaubon", label: "Cadeaubon" },
  { id: "overige", label: "Overige" },
];

/**
 * The shop: a line of filters and the products under it. The marker under
 * the active filter slides across, and the tiles rearrange themselves rather
 * than blinking out and in.
 */
export function ShopGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("alles");
  const visible = products.filter(
    (product) => filter === "alles" || product.category === filter,
  );

  return (
    <div>
      <div role="tablist" aria-label="Filter de shop" className="flex flex-wrap gap-x-9 gap-y-3 border-b border-ink/15">
        {filters.map((item) => {
          const selected = item.id === filter;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(item.id)}
              className={`eyebrow relative pb-5 transition-colors duration-500 ${
                selected ? "text-ink" : "text-stone hover:text-ink"
              }`}
            >
              {item.label}
              {selected ? (
                <motion.span
                  layoutId="shop-filter"
                  className="absolute inset-x-0 -bottom-px h-px bg-ink"
                  transition={{ duration: 0.7, ease: EXPO }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="font-display py-24 text-3xl font-light text-ink-soft">
          Hier komt binnenkort meer.
        </p>
      ) : (
        <ul className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.li
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EXPO }}
              >
                <TransitionLink href={`/shop/${product.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-petal">
                    <Image
                      src={imageUrl(product.image)}
                      alt={product.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-expo group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-ink/15 pb-5">
                    <h2 className="font-display text-3xl leading-tight font-light">
                      {product.name}
                    </h2>
                    <p className="font-display text-xl font-light whitespace-nowrap tabular-nums">
                      {product.commerce
                        ? formatPrice(product.commerce.priceCents)
                        : "Waarde naar keuze"}
                    </p>
                  </div>
                  <p className="mt-4 leading-relaxed text-ink-soft">{product.tagline}</p>
                </TransitionLink>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
