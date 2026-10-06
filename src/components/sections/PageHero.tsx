"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Eyebrow, Ring, Square } from "@/components/motion/Accents";
import { Parallax } from "@/components/motion/Parallax";
import { SplitText } from "@/components/motion/Reveal";
import { ArrowLink, SolidLink } from "@/components/ui/Button";
import { useIntroDone } from "@/lib/intro";
import type { Photo } from "@/lib/photos";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Five ways to open a page, so no two neighbouring pages start the same:
 *
 * - `straddle` — the title begins on the pink and its second line runs on
 *   into a full-width photograph (Thyme).
 * - `giant`    — a photograph fills the left half; the right half is a rose
 *   panel with the title set very large and a small cream card overlapping
 *   the two (Marina Badalona).
 * - `cascade`  — a letterspaced title, and three photographs stepping down
 *   the page diagonally (Plénitude, "prepared to perfection").
 * - `centered` — one wide letterspaced title with a tall photograph rising
 *   up into it (Plénitude).
 * - `offset`   — the eyebrow at the left edge, the title starting a third of
 *   the way across, one photograph bleeding off the right (Ballena).
 */
export type HeroVariant = "straddle" | "giant" | "cascade" | "centered" | "offset";

type PageHeroProps = {
  variant?: HeroVariant;
  eyebrow: string;
  /** "\n" breaks the line, *asterisks* set words in italic. Two lines. */
  title: string;
  intro?: string;
  /** Small facts under the intro — days, hours, capacity. */
  chips?: string[];
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string };
  image: Photo;
  /** Extra photographs for `cascade` (two) and `offset` (one). */
  photos?: Photo[];
};

export function PageHero(props: PageHeroProps) {
  const ready = useIntroDone();
  const { variant = "straddle" } = props;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 1.1, delay, ease: EXPO },
  });

  const unveil = (delay: number) => ({
    initial: { clipPath: "inset(100% 0% 0% 0%)" },
    animate: { clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" },
    transition: { duration: 1.6, delay, ease: EXPO },
  });

  const actions = (tone: "ink" | "light" = "ink", delay = 1.1): ReactNode =>
    props.cta ? (
      <motion.div className="flex flex-wrap items-center gap-8" {...fade(delay)}>
        <SolidLink href={props.cta.href} tone={tone}>
          {props.cta.label}
        </SolidLink>
        {props.secondary ? (
          <ArrowLink href={props.secondary.href} tone={tone}>
            {props.secondary.label}
          </ArrowLink>
        ) : null}
      </motion.div>
    ) : null;

  const chips = (delay = 1): ReactNode =>
    props.chips ? (
      <motion.ul className="flex flex-wrap gap-x-8 gap-y-2" {...fade(delay)}>
        {props.chips.map((chip) => (
          <li key={chip} className="eyebrow text-ink-soft">
            {chip}
          </li>
        ))}
      </motion.ul>
    ) : null;

  const intro = (delay = 0.9, className = ""): ReactNode =>
    props.intro ? (
      <motion.p className={`max-w-md text-lg leading-relaxed ${className}`} {...fade(delay)}>
        {props.intro}
      </motion.p>
    ) : null;

  const titleProps = { as: "h1" as const, text: props.title, immediate: true, ready, delay: 0.45 };

  /* ── straddle ───────────────────────────────────────────────────────── */
  if (variant === "straddle") {
    return (
      <section className="relative overflow-hidden bg-mist text-ink">
        <Ring className="-top-24 -right-20 h-80 w-80" />
        <div
          className="relative mx-auto max-w-[100rem] px-7 pt-36 sm:px-10 lg:pt-44"
          style={{ ["--hero" as string]: "clamp(3rem, 7.6vw, 8rem)" }}
        >
          <motion.div {...fade(0.4)}>
            <Eyebrow className="text-ink-soft">{props.eyebrow}</Eyebrow>
          </motion.div>
          <div className="relative z-10 mt-7 grid">
            <SplitText
              {...titleProps}
              className="font-display col-start-1 row-start-1 text-[length:var(--hero)] leading-[1] font-light"
            />
            {/* The same words in white, shown only where the photograph is. */}
            <div
              aria-hidden
              className="col-start-1 row-start-1 hidden md:block"
              style={{ clipPath: "inset(calc(var(--hero) * 1.02) 0 0 0)" }}
            >
              <SplitText
                {...titleProps}
                as="p"
                className="font-display text-[length:var(--hero)] leading-[1] font-light text-white"
              />
            </div>
          </div>
        </div>

        <motion.div
          className="hero-grain relative mt-14 h-[62svh] min-h-[24rem] sm:mt-10 md:-mt-[calc(var(--hero)*0.98)]"
          style={{ ["--hero" as string]: "clamp(3rem, 7.6vw, 8rem)" }}
          {...unveil(0.5)}
        >
          <Parallax className="h-full" amount={6}>
            <MediaImage
              src={props.image.src}
              alt={props.image.alt}
              aspect="h-full"
              sizes="100vw"
              priority
              focus={props.image.focus}
            />
          </Parallax>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/30" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-[100rem] flex-col gap-10 px-7 pb-12 sm:px-10 sm:pb-10 md:flex-row md:items-end md:justify-between">
              <div className="space-y-5 text-white">
                {intro(0.9, "text-white/90")}
                {props.chips ? (
                  <motion.ul className="flex flex-wrap gap-x-8 gap-y-2" {...fade(1)}>
                    {props.chips.map((chip) => (
                      <li key={chip} className="eyebrow text-white/85">
                        {chip}
                      </li>
                    ))}
                  </motion.ul>
                ) : null}
              </div>
              {actions("light")}
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  /* ── giant ──────────────────────────────────────────────────────────── */
  if (variant === "giant") {
    return (
      <section className="overflow-hidden bg-mist text-ink">
        <div className="grid md:min-h-svh md:grid-cols-2">
          <motion.div className="relative min-h-[60svh] md:min-h-0" {...unveil(0.4)}>
            <Parallax className="h-full" amount={5}>
              <MediaImage
                src={props.image.src}
                alt={props.image.alt}
                aspect="h-full"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
                focus={props.image.focus}
              />
            </Parallax>
          </motion.div>

          <div className="relative flex flex-col justify-center bg-blush px-7 pt-24 pb-32 sm:px-10 md:px-12 md:pt-40 md:pb-40 lg:px-20">
            <motion.div {...fade(0.4)}>
              <Eyebrow className="text-stone">{props.eyebrow}</Eyebrow>
            </motion.div>
            <SplitText
              {...titleProps}
              className="font-display mt-8 text-[clamp(3.4rem,9.4vw,10rem)] leading-[0.94] font-light"
            />

            {/* The card that crosses from the rose onto the photograph. */}
            <motion.div
              className="glass relative mt-12 max-w-md p-7 sm:p-9 md:-ml-24 lg:-ml-36"
              {...fade(0.95)}
            >
              <Square className="-top-3 -left-3 h-full w-full" />
              <div className="relative space-y-6">
                {intro(0.95, "text-ink-soft")}
                {chips(1)}
                {actions("ink", 1.1)}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  /* ── cascade ────────────────────────────────────────────────────────── */
  if (variant === "cascade") {
    const [second, third] = props.photos ?? [props.image, props.image];
    return (
      <section className="relative overflow-hidden bg-mist text-ink">
        <div className="mx-auto max-w-[100rem] px-7 pt-36 pb-24 sm:px-10 sm:pb-20 lg:pt-44 lg:pb-28">
          <div className="grid gap-16 sm:gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <motion.div {...fade(0.4)}>
                <Eyebrow className="text-ink-soft">{props.eyebrow}</Eyebrow>
              </motion.div>
              <SplitText
                {...titleProps}
                className="font-display mt-8 text-[clamp(2rem,4.6vw,4.5rem)] leading-[1.14] font-light tracking-[0.2em] uppercase"
              />
            </div>
            {/* Sits above the pictures, never under them: the top-right one
                only climbs as far as the row below this column. */}
            <div className="relative z-10 space-y-6 lg:col-span-4 lg:col-start-9 lg:self-end">
              {intro(0.9, "text-ink-soft")}
              {chips(1)}
              {actions("ink", 1.1)}
            </div>
          </div>

          <div className="relative mt-20 grid grid-cols-12 gap-5 sm:mt-16 sm:gap-6 lg:mt-24 lg:gap-8">
            <Ring className="-left-20 bottom-0 h-64 w-64" dot={300} />
            <motion.div className="col-span-5 mt-20 lg:col-span-3 lg:col-start-2 lg:mt-32" {...unveil(0.5)}>
              <MediaImage src={third.src} alt={third.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 42vw" focus={third.focus} />
            </motion.div>
            <motion.div className="col-span-7 lg:col-span-4 lg:col-start-6" {...unveil(0.6)}>
              <MediaImage src={props.image.src} alt={props.image.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 33vw, 58vw" priority focus={props.image.focus} />
            </motion.div>
            <motion.div className="col-span-6 col-start-4 -mt-10 lg:col-span-3 lg:col-start-10 lg:-mt-6" {...unveil(0.7)}>
              <MediaImage src={second.src} alt={second.alt} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 25vw, 50vw" focus={second.focus} />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  /* ── centered ───────────────────────────────────────────────────────── */
  if (variant === "centered") {
    return (
      <section className="relative isolate overflow-hidden bg-mist text-ink">
        <div className="mx-auto max-w-[100rem] px-7 pt-36 pb-24 sm:px-10 sm:pb-20 lg:pt-44 lg:pb-28">
          <motion.div className="flex justify-center" {...fade(0.4)}>
            <Eyebrow className="text-ink-soft">{props.eyebrow}</Eyebrow>
          </motion.div>
          <SplitText
            {...titleProps}
            className="font-display relative z-20 mt-8 text-center text-[clamp(2.4rem,7vw,7.5rem)] leading-[1.06] font-light tracking-[0.12em] uppercase"
          />

          <div className="relative z-0 mt-4 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Square className="top-1/3 right-[6%] hidden h-48 w-48 lg:block" />
            <div className="order-2 space-y-6 lg:order-1 lg:col-span-3 lg:self-end">
              {intro(0.95, "text-ink-soft")}
              {chips(1)}
              {actions("ink", 1.1)}
            </div>
            <motion.div className="order-1 mx-auto w-full max-w-[26rem] lg:order-2 lg:col-span-6 lg:col-start-4 lg:-mt-[3vw] lg:max-w-none lg:px-8" {...unveil(0.55)}>
              <Parallax className="aspect-[3/4]" amount={6}>
                <MediaImage
                  src={props.image.src}
                  alt={props.image.alt}
                  aspect="h-full"
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  priority
                  focus={props.image.focus}
                />
              </Parallax>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  /* ── offset ─────────────────────────────────────────────────────────── */
  const small = props.photos?.[0];
  return (
    <section className="relative overflow-hidden bg-mist text-ink">
      <div className="mx-auto max-w-[100rem] px-7 pt-36 pb-24 sm:px-10 sm:pb-20 lg:pt-44 lg:pb-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div className="lg:col-span-3" {...fade(0.4)}>
            <Eyebrow className="text-ink-soft">{props.eyebrow}</Eyebrow>
          </motion.div>
          <div className="lg:col-span-8 lg:col-start-5">
            <SplitText
              {...titleProps}
              className="font-display text-[clamp(3rem,6.8vw,7.25rem)] leading-[1] font-light"
            />
            <div className="mt-9 space-y-6">
              {intro(0.9, "text-ink-soft")}
              {chips(1)}
              {actions("ink", 1.1)}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[100rem] grid-cols-12 items-end gap-6 pl-6 sm:pl-10 lg:gap-8">
        <Ring className="top-8 left-[22%] hidden h-40 w-40 lg:block" dot={45} />
        {small ? (
          <motion.div className="col-span-4 mb-10 lg:col-span-3 lg:col-start-2" {...unveil(0.7)}>
            <MediaImage src={small.src} alt={small.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 33vw" focus={small.focus} />
          </motion.div>
        ) : null}
        <motion.div className="col-span-8 col-start-5 lg:col-span-7 lg:col-start-6" {...unveil(0.55)}>
          <Parallax className="aspect-[16/10]" amount={6}>
            <MediaImage
              src={props.image.src}
              alt={props.image.alt}
              aspect="h-full"
              sizes="(min-width: 1024px) 60vw, 66vw"
              priority
              focus={props.image.focus}
            />
          </Parallax>
        </motion.div>
      </div>
    </section>
  );
}
