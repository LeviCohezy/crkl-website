"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SplitText } from "@/components/motion/Reveal";
import { ArrowLink, SolidLink } from "@/components/ui/Button";
import { useIntroDone } from "@/lib/intro";
import { imageUrl } from "@/lib/media";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** How long each slide stays, in milliseconds. */
const HOLD = 6500;

/**
 * Room, plate, detail, terrace. Each slide has a wide frame for landscape
 * screens and a tall one for phones, because the library is mostly portrait.
 */
const slides = [
  {
    label: "De zaal",
    wide: shoot.juni26(1),
    tall: shoot.juni26(8),
    alt: "De zaal van CRKL, met gedekte tafels en gordijnen in twee tinten roze",
  },
  {
    label: "Het bord",
    wide: shoot.dec25(18),
    tall: shoot.dec25(13),
    alt: "Een gerecht in een bord met reliëf",
  },
  {
    label: "Het detail",
    wide: shoot.okt25(9),
    tall: shoot.juli26(65),
    alt: "Glazen en servetten op een gedekte tafel",
  },
  {
    label: "Het terras",
    wide: shoot.juli26(18),
    tall: shoot.juli26(18),
    alt: "Het terras onder de witte luifel",
  },
];

/**
 * The atmosphere in three seconds: a slow slider of four photographs, with
 * the headline and the reserve button fixed over it.
 *
 * Slides wipe upwards over one another and each drifts back from a slight
 * zoom while it is up (CSS, see `.slide` in globals.css). The hairline at the
 * bottom fills as the current slide's time runs out. Without motion the
 * first slide simply stays.
 */
export function HomeHero() {
  const ready = useIntroDone();
  // The slide on screen and the one it is wiping over.
  const [{ index, previous }, setSlide] = useState({ index: 0, previous: -1 });

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setSlide({ index: (index + 1) % slides.length, previous: index });
    }, HOLD);
    return () => window.clearTimeout(timer);
  }, [index, ready]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 1.1, delay, ease: EXPO },
  });

  return (
    <section className="relative h-svh min-h-[36rem] overflow-hidden bg-ink text-white">
      {slides.map((slide, i) => (
        <div
          key={slide.label}
          className="slide absolute inset-0"
          data-state={i === index ? "active" : i === previous ? "prev" : "idle"}
        >
          <div className="slide-image absolute inset-0">
            <Image
              src={imageUrl(slide.wide)}
              alt={i === index ? slide.alt : ""}
              fill
              sizes="100vw"
              priority={i === 0}
              className="hidden object-cover md:block"
            />
            <Image
              src={imageUrl(slide.tall)}
              alt={i === index ? slide.alt : ""}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover md:hidden"
            />
          </div>
        </div>
      ))}

      {/* Enough shade for white type, and no more. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/30"
      />

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto max-w-[100rem] px-6 pb-24 sm:px-10 sm:pb-16">
          <motion.p className="eyebrow" {...fade(0.3)}>
            {site.tagline}
          </motion.p>
          <SplitText
            as="h1"
            text={"Waar verfijning en beleving\n*centraal* staan"}
            immediate
            ready={ready}
            delay={0.35}
            className="font-display mt-6 max-w-5xl text-[clamp(2.6rem,6.6vw,6.75rem)] leading-[1.02] font-light"
          />
          <motion.div className="mt-10 flex flex-wrap items-center gap-8" {...fade(0.95)}>
            <SolidLink href="#reserveer" tone="light">
              Reserveer een tafel
            </SolidLink>
            <ArrowLink href="#ontdek" tone="light">
              Ontdek CRKL
            </ArrowLink>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center gap-6 border-t border-white/30 pt-5"
            {...fade(1.1)}
          >
            <p className="eyebrow tabular-nums">
              {String(index + 1).padStart(2, "0")}
              <span className="mx-2 opacity-60">/</span>
              <span className="opacity-60">{String(slides.length).padStart(2, "0")}</span>
            </p>
            <div className="relative h-px flex-1 bg-white/25">
              <div
                key={index}
                className="absolute inset-y-0 left-0 w-full origin-left bg-white motion-reduce:hidden"
                style={{ animation: ready ? `slide-timer ${HOLD}ms linear both` : "none" }}
              />
            </div>
            <p className="eyebrow w-28 text-right">{slides[index].label}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
