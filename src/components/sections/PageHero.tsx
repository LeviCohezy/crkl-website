"use client";

import { motion } from "motion/react";
import { MediaImage } from "@/components/media/MediaImage";
import { Parallax } from "@/components/motion/Parallax";
import { SplitText } from "@/components/motion/Reveal";
import { RotatingBadge } from "@/components/motion/RotatingBadge";
import { useIntroDone } from "@/lib/intro";
import type { Photo } from "@/lib/photos";

const EXPO = [0.16, 1, 0.3, 1] as const;

type PageHeroProps = {
  eyebrow: string;
  /** "\n" breaks the line, *asterisks* set a word in italic. */
  title: string;
  intro?: string;
  image: Photo;
  /** The frame the photograph opens into. */
  shape?: "circle" | "arch";
  /** Short phrase set on the turning ring. */
  badge?: string;
};

/**
 * The top of every inner page: the brand pink, one oversized title rising
 * word by word, and a photograph opening as a circle beside it.
 *
 * It waits for the opening curtain on a first visit, and starts a beat late
 * on later ones so it lands as the page-transition circle clears.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  shape = "circle",
  badge,
}: PageHeroProps) {
  const ready = useIntroDone();
  const round = shape === "circle" ? "rounded-full" : "rounded-t-full";

  return (
    <section className="relative overflow-hidden bg-blush text-white">
      <div className="mx-auto grid min-h-svh max-w-[100rem] items-end gap-12 px-6 pt-36 pb-14 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-20">
        <div className="lg:col-span-7">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {eyebrow}
          </motion.p>
          <SplitText
            as="h1"
            text={title}
            immediate
            ready={ready}
            delay={0.45}
            className="font-display mt-6 text-[clamp(4.25rem,11.5vw,12rem)] leading-[0.94] font-light"
          />
          {intro ? (
            <motion.p
              className="mt-10 max-w-md text-lg leading-relaxed text-white"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 1.1, delay: 0.95, ease: EXPO }}
            >
              {intro}
            </motion.p>
          ) : null}
        </div>

        <div className="relative mx-auto w-[min(78vw,26rem)] lg:col-span-5 lg:w-[min(100%,30rem)] lg:justify-self-end">
          <motion.div
            className={`overflow-hidden ${round}`}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{
              clipPath: ready ? "circle(80% at 50% 50%)" : "circle(0% at 50% 50%)",
            }}
            transition={{ duration: 1.7, delay: 0.5, ease: EXPO }}
          >
            <Parallax
              className={`${shape === "circle" ? "aspect-square" : "aspect-[3/4]"} ${round}`}
              amount={7}
            >
              <MediaImage
                src={image.src}
                alt={image.alt}
                aspect="h-full"
                sizes="(min-width: 1024px) 36vw, 78vw"
                priority
              />
            </Parallax>
          </motion.div>

          {badge ? (
            <motion.div
              className="absolute -bottom-6 -left-10 h-28 w-28 sm:h-36 sm:w-36"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 1.2, delay: 1.1, ease: EXPO }}
            >
              <RotatingBadge text={badge} className="h-full w-full" />
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
