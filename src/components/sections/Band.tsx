import type { ReactNode } from "react";
import { Eyebrow } from "@/components/motion/Accents";
import { DrawRule, Reveal, SplitText } from "@/components/motion/Reveal";

/**
 * The backgrounds a section can sit on, as the wireframe paces them — white,
 * tinted, dark, brand. All three light ones are pinks, so the rose carries
 * the site; the brand rose is reserved for the form that converts; and
 * "dark" is never a full band but a smaller panel inside a light one (see
 * Statement), so there is one dark message per page without a brown wall.
 */
export type Tone = "white" | "tint" | "dark" | "brand";

export const tones: Record<Tone, { band: string; muted: string; rule: string; accent: string }> = {
  white: { band: "bg-cream text-ink", muted: "text-ink-soft", rule: "border-line", accent: "text-stone" },
  tint: { band: "bg-petal text-ink", muted: "text-ink-soft", rule: "border-line-strong", accent: "text-stone" },
  dark: { band: "bg-blush text-ink", muted: "text-ink-soft", rule: "border-white/60", accent: "text-stone" },
  brand: { band: "bg-blush text-ink", muted: "text-ink-soft", rule: "border-white/60", accent: "text-stone" },
};

type BandProps = {
  tone?: Tone;
  id?: string;
  /** Tighter vertical rhythm, for bands that are a single line. */
  compact?: boolean;
  /** No horizontal gutters — for compositions that reach the edges. */
  bleed?: boolean;
  className?: string;
  children: ReactNode;
};

/** A full-width section with the site's gutters and vertical rhythm. */
export function Band({
  tone = "white",
  id,
  compact = false,
  bleed = false,
  className = "",
  children,
}: BandProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden ${tones[tone].band} ${
        compact ? "py-10 sm:py-12" : "py-24 sm:py-36 lg:py-44"
      } ${className}`}
    >
      {bleed ? children : <div className="mx-auto max-w-[100rem] px-6 sm:px-10">{children}</div>}
    </section>
  );
}

type HeadProps = {
  tone?: Tone;
  eyebrow?: string;
  /** "\n" breaks the line, *asterisks* set words in italic. */
  title: string;
  intro?: string;
  align?: "left" | "center" | "right";
  /** Something to sit opposite the title on wide screens, usually a link. */
  aside?: ReactNode;
  /** Letterspaced capitals instead of the usual serif — once per page. */
  tracked?: boolean;
  className?: string;
};

/** Eyebrow, a heading that rises word by word, and an optional intro. */
export function Head({
  tone = "white",
  eyebrow,
  title,
  intro,
  align = "left",
  aside,
  tracked = false,
  className = "",
}: HeadProps) {
  const t = tones[tone];
  const centred = align === "center";
  const right = align === "right";

  return (
    <div
      className={`${
        centred
          ? "mx-auto max-w-3xl text-center"
          : right
            ? "ml-auto max-w-3xl text-right"
            : "flex flex-wrap items-end justify-between gap-x-16 gap-y-8"
      } ${className}`}
    >
      <div className={centred || right ? "" : "max-w-3xl"}>
        {!centred && !right ? <DrawRule className="mb-8 w-16" /> : null}
        {eyebrow ? (
          <Reveal>
            <Eyebrow className={`${t.accent} ${centred ? "justify-center" : right ? "justify-end" : ""}`}>
              {eyebrow}
            </Eyebrow>
          </Reveal>
        ) : null}
        <SplitText
          text={title}
          className={`font-display font-light ${
            tracked
              ? "text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.15] tracking-[0.22em] uppercase"
              : "text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.06]"
          } ${eyebrow ? "mt-6" : ""}`}
        />
        {intro ? (
          <Reveal delay={0.15}>
            <p
              className={`mt-7 max-w-xl text-lg leading-relaxed ${t.muted} ${
                centred ? "mx-auto" : right ? "ml-auto" : ""
              }`}
            >
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
      {aside ? (
        <Reveal delay={0.2} className={centred ? "mt-10 flex justify-center" : ""}>
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}
