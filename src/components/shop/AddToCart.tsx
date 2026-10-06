"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/shell/PageTransition";
import { addToCart } from "@/lib/cart";

/**
 * Adds one of a product to the cart and says so. The confirmation turns into
 * a link to the cart for a few seconds, then steps back.
 */
export function AddToCart({ slug, className = "" }: { slug: string; className?: string }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 4000);
    return () => window.clearTimeout(timer);
  }, [added]);

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      <button
        type="button"
        onClick={() => {
          addToCart(slug);
          setAdded(true);
        }}
        className="eyebrow sweep h-12 rounded-full bg-blush px-7 text-ink [--sweep:var(--color-line-strong)]"
      >
        In winkelmand
      </button>
      <p aria-live="polite" className="text-sm">
        {added ? (
          <TransitionLink href="/cart" className="link-line pb-0.5">
            Toegevoegd — bekijk de winkelmand
          </TransitionLink>
        ) : null}
      </p>
    </div>
  );
}
