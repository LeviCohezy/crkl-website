import type { ReactNode } from "react";
import { Reveal, SplitText } from "@/components/motion/Reveal";

/**
 * The four backgrounds a section can sit on, as the wireframe paces them:
 * white and tinted alternate down the page, dark is kept for the one key
 * message, and the brand rose is reserved for the form that converts.
 */
export type Tone = "white" | "tint" | "dark" | "brand";

export const tones: Record<Tone, { band: string; muted: string; rule: string; accent: string }> = {
  white: { band: "bg-cream text-ink", muted: "text-ink-soft", rule: "border-ink/15", accent: "text-clay" },
  tint: { band: "bg-petal text-ink", muted: "text-ink-soft", rule: "border-ink/15", accent: "text-rosewood" },
  dark: { band: "bg-ink text-cream", muted: "text-cream/70", rule: "border-cream/20", accent: "text-blush" },
  brand: { band: "bg-blush text-ink", muted: "text-ink-soft", rule: "border-ink/20", accent: "text-rosewood" },
};

type BandProps = {
  tone?: Tone;
  id?: string;
  /** Tighter vertical rhythm, for bands that are a single line. */
  compact?: boolean;
  className?: string;
  children: ReactNode;
};

/** A full-width section with the site's gutters and vertical rhythm. */
export function Band({ tone = "white", id, compact = false, className = "", children }: BandProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 overflow-hidden ${tones[tone].band} ${
        compact ? "py-10 sm:py-12" : "py-24 sm:py-36 lg:py-44"
      } ${className}`}
    >
      <div className="mx-auto max-w-[100rem] px-6 sm:px-10">{children}</div>
    </section>
  );
}

type HeadProps = {
  tone?: Tone;
  eyebrow?: string;
  /** "\n" breaks the line, *asterisks* set a word in italic. */
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** Something to sit opposite the title on wide screens, usually a link. */
  aside?: ReactNode;
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
  className = "",
}: HeadProps) {
  const t = tones[tone];
  const centred = align === "center";

  return (
    <div
      className={`${
        centred
          ? "mx-auto max-w-3xl text-center"
          : "flex flex-wrap items-end justify-between gap-x-16 gap-y-8"
      } ${className}`}
    >
      <div className={centred ? "" : "max-w-3xl"}>
        {eyebrow ? (
          <Reveal>
            <p className={`eyebrow ${t.accent}`}>{eyebrow}</p>
          </Reveal>
        ) : null}
        <SplitText
          text={title}
          className={`font-display text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.06] font-light ${
            eyebrow ? "mt-6" : ""
          }`}
        />
        {intro ? (
          <Reveal delay={0.15}>
            <p
              className={`mt-7 max-w-xl text-lg leading-relaxed ${t.muted} ${
                centred ? "mx-auto" : ""
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
