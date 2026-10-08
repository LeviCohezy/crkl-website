/**
 * The V3 type scale. Two voices only: Newsreader light for anything that is
 * meant to be looked at, Inter for anything that is meant to be read. The
 * site switches between the two sizes of the serif — a whole screen of
 * words, then a paragraph you lean into — so these are named for that.
 */
export const type = {
  /** One line fills the screen: the hero and the page statements. */
  huge: "font-display font-light text-[clamp(3rem,8.2vw,8.5rem)] leading-[0.96] tracking-[-0.02em]",
  /** A sentence across the width of the page. */
  big: "font-display font-light text-[clamp(2.25rem,4.9vw,5.25rem)] leading-[1.04] tracking-[-0.015em]",
  /** A section's heading. */
  h2: "font-display font-light text-[clamp(1.9rem,3.6vw,3.5rem)] leading-[1.08]",
  /** A row, a card, a question. */
  h3: "font-display font-light text-[clamp(1.5rem,2.3vw,2.2rem)] leading-[1.15]",
  /** The reading voice. */
  lead: "text-lg leading-relaxed text-ink-soft sm:text-xl",
  body: "text-base leading-relaxed text-ink-soft sm:text-[1.0625rem]",
  small: "text-sm leading-relaxed text-stone",
} as const;

/** The page's gutters: one container for everything that is not full-bleed. */
export const wrap = "mx-auto w-full max-w-[112rem] px-6 sm:px-10 lg:px-16";
