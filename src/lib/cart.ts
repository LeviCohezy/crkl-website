import { useSyncExternalStore } from "react";

/**
 * The cart: slugs and quantities, kept in this browser's localStorage.
 *
 * It never stores a price. Every page that shows an amount looks the product
 * up in the catalogue again, so a stale or tampered cart cannot change what
 * something costs. When the shop gets a server-side cart, this is the file
 * that changes. See docs/ECOMMERCE-ROADMAP.md.
 */
export type CartLine = { slug: string; quantity: number };

const KEY = "crkl-cart";
const MAX = 20;
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      lines = parsed.filter(
        (line): line is CartLine =>
          typeof line?.slug === "string" &&
          Number.isInteger(line?.quantity) &&
          line.quantity > 0,
      );
    }
  } catch {
    // Storage blocked or corrupted: start with an empty cart.
  }
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // The cart still works for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function addToCart(slug: string, quantity = 1) {
  load();
  const existing = lines.find((line) => line.slug === slug);
  commit(
    existing
      ? lines.map((line) =>
          line.slug === slug
            ? { ...line, quantity: Math.min(line.quantity + quantity, MAX) }
            : line,
        )
      : [...lines, { slug, quantity: Math.min(quantity, MAX) }],
  );
}

export function setQuantity(slug: string, quantity: number) {
  load();
  commit(
    quantity <= 0
      ? lines.filter((line) => line.slug !== slug)
      : lines.map((line) =>
          line.slug === slug ? { ...line, quantity: Math.min(quantity, MAX) } : line,
        ),
  );
}

export function removeFromCart(slug: string) {
  setQuantity(slug, 0);
}

/** The cart's lines. Empty during server rendering and the first paint. */
export function useCart(): CartLine[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return lines;
    },
    () => EMPTY,
  );
}

export function useCartCount(): number {
  return useCart().reduce((sum, line) => sum + line.quantity, 0);
}
