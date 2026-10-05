import type Lenis from "lenis";

/**
 * The smooth-scroll instance, shared without a React context: the things that
 * need it (page transitions, the menu overlay, scroll-to-top) only ever call
 * it from event handlers.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}
