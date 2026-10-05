"use client";

import { motion } from "motion/react";
import { MediaImage } from "@/components/media/MediaImage";
import { Parallax } from "@/components/motion/Parallax";
import { SplitText } from "@/components/motion/Reveal";
import { ArrowLink, SolidLink } from "@/components/ui/Button";
import { useIntroDone } from "@/lib/intro";
import type { Photo } from "@/lib/photos";

const EXPO = [0.16, 1, 0.3, 1] as const;

type PageHeroProps = {
  eyebrow: string;
  /** "\n" breaks the line, *asterisks* set a word in italic. */
  title: string;
  intro?: string;
  /** Small facts under the intro — days, hours, capacity. */
  chips?: string[];
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string };
  image: Photo;
};

/**
 * The top of every inner page: a quiet split. The title rises word by word
 * on the left; on the right one tall photograph is uncovered from the bottom
 * edge and then drifts slowly behind its frame as the page moves.
 *
 * It waits for the opening curtain on a first visit, and starts a beat late
 * on later ones so it lands as the page-transition curtain clears.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  chips,
  cta,
  secondary,
  image,
}: PageHeroProps) {
  const ready = useIntroDone();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 1.1, delay, ease: EXPO },
  });

  return (
    <section className="overflow-hidden bg-cream text-ink">
      <div className="mx-auto grid max-w-[100rem] gap-14 px-6 pt-32 pb-20 sm:px-10 lg:min-h-svh lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-40 lg:pb-24">
        <div className="lg:col-span-6 lg:pb-6">
          <motion.p className="eyebrow text-clay" {...fade(0.45)}>
            {eyebrow}
          </motion.p>
          <SplitText
            as="h1"
            text={title}
            immediate
            ready={ready}
            delay={0.45}
            className="font-display mt-7 text-[clamp(3rem,6.6vw,7rem)] leading-[1] font-light"
          />
          {intro ? (
            <motion.p
              className="mt-9 max-w-md text-lg leading-relaxed text-ink-soft"
              {...fade(0.9)}
            >
              {intro}
            </motion.p>
          ) : null}
          {chips ? (
            <motion.ul
              className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-ink/15 pt-6"
              {...fade(1)}
            >
              {chips.map((chip) => (
                <li key={chip} className="eyebrow text-ink-soft">
                  {chip}
                </li>
              ))}
            </motion.ul>
          ) : null}
          {cta ? (
            <motion.div className="mt-10 flex flex-wrap items-center gap-8" {...fade(1.1)}>
              <SolidLink href={cta.href}>{cta.label}</SolidLink>
              {secondary ? (
                <ArrowLink href={secondary.href}>{secondary.label}</ArrowLink>
              ) : null}
            </motion.div>
          ) : null}
        </div>

        <motion.div
          className="lg:col-span-5 lg:col-start-8"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{
            clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          }}
          transition={{ duration: 1.6, delay: 0.5, ease: EXPO }}
        >
          <Parallax className="aspect-[4/5] lg:max-h-[78svh] lg:w-full" amount={6}>
            <MediaImage
              src={image.src}
              alt={image.alt}
              aspect="h-full"
              sizes="(min-width: 1024px) 40vw, 100vw"
              focus={image.focus}
              priority
            />
          </Parallax>
        </motion.div>
      </div>
    </section>
  );
}
