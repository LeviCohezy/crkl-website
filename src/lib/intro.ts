import { useSyncExternalStore } from "react";

/**
 * Whether the opening curtain has lifted.
 *
 * The preloader flips this once; the hero waits for it before playing its
 * entrance, so the two read as one movement. It lives outside React so it
 * survives client-side navigation — the intro plays once per page load.
 */
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useIntroDone(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false,
  );
}
