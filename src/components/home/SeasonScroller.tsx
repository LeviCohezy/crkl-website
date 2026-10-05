"use client";

import { useEffect, useRef, useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { PillLink } from "@/components/ui/Button";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { plates } from "@/lib/menu";

const swap = "transition-all duration-700 ease-expo";

/** Same face and treatment as the letters in the hero. */
const plateType = "font-display font-light leading-[1.02]";

/**
 * The seasons, plate by plate.
 *
 * The left half holds still: a ring that counts the plates off, and the name
 * of whichever one is crossing the middle of the screen. The right half
 * scrolls, and every photograph arrives as a circle that opens into a
 * full-height block — the plate becoming the page.
 */
export function SeasonScroller() {
  const root = useRef<HTMLElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // A zero-height band across the middle of the viewport: whichever plate is
    // crossing it owns the text on the left.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    for (const slide of slides.current) {
      if (slide) observer.observe(slide);
    }
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((plate) => {
          const picture = plate.querySelector("[data-picture]");
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: plate,
              start: "top bottom",
              end: "top 12%",
              scrub: 0.5,
            },
          });
          tl.fromTo(
            plate,
            { clipPath: "circle(24% at 50% 50%)" },
            { clipPath: "circle(74% at 50% 50%)" },
            0,
          ).fromTo(picture, { scale: 1.35 }, { scale: 1 }, 0);
        });
      });
    },
    { scope: root },
  );

  const total = plates.length;

  return (
    <section ref={root} className="bg-blush text-white">
      <div className="lg:grid lg:grid-cols-2">
        {/* ── Sticky half, desktop only ────────────────────────────────── */}
        <div className="relative hidden lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:items-center lg:justify-center lg:px-12 xl:px-16">
          <p className="eyebrow absolute top-28 left-12 xl:left-16">
            Het seizoen op het bord
          </p>

          {/* The ring fills as the plates go by. */}
          <div className="relative flex aspect-square w-[min(30rem,78%)] items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.25" />
              <circle
                cx="50"
                cy="50"
                r="49.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - (active + 1) / total}
                className="transition-[stroke-dashoffset] duration-1000 ease-expo"
              />
            </svg>

            {plates.map((plate, i) => (
              <div
                key={plate.name}
                aria-hidden={i !== active}
                className={`absolute inset-0 flex flex-col items-center justify-center px-10 text-center ${swap} ${
                  i === active
                    ? "translate-y-0 opacity-100 blur-none"
                    : i < active
                      ? "-translate-y-6 opacity-0 blur-sm"
                      : "translate-y-6 opacity-0 blur-sm"
                }`}
              >
                <p className="eyebrow text-white/80">{plate.season}</p>
                <h2 className={`${plateType} mt-5 text-6xl xl:text-7xl`}>
                  {plate.name}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/90">
                  {plate.components}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute inset-x-12 bottom-12 flex items-center justify-between xl:inset-x-16">
            <p className="font-display text-xl font-light tabular-nums">
              {String(active + 1).padStart(2, "0")}
              <span className="mx-2 text-white/60">/</span>
              <span className="text-white/60">{String(total).padStart(2, "0")}</span>
            </p>
            <PillLink href="/menu" tone="light">
              Bekijk het menu
            </PillLink>
          </div>
        </div>

        {/* ── The plates ───────────────────────────────────────────────── */}
        <div>
          <p className="eyebrow px-6 pt-20 pb-8 sm:px-10 lg:hidden">
            Het seizoen op het bord
          </p>
          {plates.map((plate, i) => (
            <div
              key={plate.name}
              data-index={i}
              ref={(el) => {
                slides.current[i] = el;
              }}
            >
              <div data-plate data-cursor="Menu" className="overflow-hidden">
                <div data-picture className="will-change-transform">
                  <MediaImage
                    src={plate.src}
                    alt={plate.alt}
                    aspect="aspect-[4/5] lg:aspect-auto lg:h-svh"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    fallbackLabel={plate.name}
                  />
                </div>
              </div>

              {/* On a narrow screen there is no room to park the text, so each
                  plate carries its own. */}
              <div className="px-6 py-10 text-center sm:px-10 lg:hidden">
                <p className="eyebrow text-white/80">{plate.season}</p>
                <h2 className={`${plateType} mt-3 text-4xl`}>{plate.name}</h2>
                <p className="mt-3 text-base text-white/90">{plate.components}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-center px-6 pb-20 sm:px-10 lg:hidden">
            <PillLink href="/menu" tone="light">
              Bekijk het menu
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
