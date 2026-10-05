"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";

/**
 * PLACEHOLDER MENU — course names and compositions are invented, and the
 * photography is paired by eye rather than by what is actually on the plate.
 * Replace both; one image per course, one course per image.
 */
const courses = [
  {
    name: "Oyster",
    components: "zeeland oyster · green apple · dill · buttermilk",
    image: "all/CRKL_Maart26©Hablar_Lr-29.jpg",
  },
  {
    name: "North Sea crab",
    components: "crab · tomato · fennel · verjus",
    image: "all/CRKL_Mei25_LR©HABLAR-48.jpg",
  },
  {
    name: "Turbot",
    components: "turbot · beurre blanc · samphire · caviar",
    image: "all/CRKL_Maart26©Hablar_Lr-61.jpg",
  },
  {
    name: "White asparagus",
    components: "asparagus · egg yolk · lovage · brown butter",
    image: "all/CRKL_Mei25_LR©HABLAR-22.jpg",
  },
  {
    name: "Langoustine",
    components: "langoustine · shellfish bisque · fennel · dill",
    image: "all/crkl_juni26_LR_©HABLAR-23.jpg",
  },
  {
    name: "Dry-aged beef",
    components: "aged rib · bordelaise · beetroot · marrow",
    image: "all/CRKL_Juli26_LR©Hablar-16.jpg",
  },
  {
    name: "Garden greens",
    components: "young leaves · herb oil · hazelnut · aged gouda",
    image: "all/CRKL_dec25©Hablar_lr-14.jpg",
  },
  {
    name: "Lemon & buttermilk",
    components: "lemon · buttermilk · sorrel · meringue",
    image: "all/CRKL_okt25©HABLAR-11.jpg",
  },
];

const swap = "transition-all duration-700 ease-out";

/** Same face and treatment as the CRKL wordmark in the nav. */
const dishType =
  "font-display font-light uppercase leading-[1.05] tracking-[0.12em]";

function Arrow() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 transition-colors duration-300 group-hover:bg-white group-hover:text-blush">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export function MenuScroller() {
  const [active, setActive] = useState(0);
  const slides = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <section className="bg-blush text-white">
      <div className="lg:grid lg:grid-cols-2">
        {/* ── Sticky plate card, desktop only ──────────────────────────── */}
        <div className="relative hidden lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:justify-center lg:px-12 xl:px-16">
          {/* One fixed box the courses share, so nothing shifts as they swap:
              name centred, composition sitting right under it. */}
          <div className="relative min-h-[18rem] w-full max-w-md">
            {courses.map((course, i) => (
              <div
                key={course.name}
                aria-hidden={i !== active}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center ${swap} ${
                  i === active
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <h2 className={`${dishType} text-5xl xl:text-6xl`}>
                  {course.name}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/85">
                  {course.components}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="group absolute inset-x-0 bottom-24 flex items-center justify-center gap-3 text-[0.6875rem] font-medium tracking-[0.22em] uppercase"
          >
            View full menu
            <Arrow />
          </Link>
        </div>

        {/* ── The plates ───────────────────────────────────────────────── */}
        <div>
          {courses.map((course, i) => (
            <div
              key={course.name}
              data-index={i}
              ref={(el) => {
                slides.current[i] = el;
              }}
            >
              <MediaImage
                src={course.image}
                alt={`${course.name} — ${course.components}`}
                aspect="aspect-[4/5] lg:aspect-auto lg:h-svh"
                sizes="(min-width: 1024px) 50vw, 100vw"
                fallbackLabel={course.name}
              />

              {/* On a narrow screen there is no room to park the text, so each
                  plate carries its own. */}
              <div className="px-6 py-10 text-center sm:px-10 lg:hidden">
                <h2 className={`${dishType} text-3xl`}>{course.name}</h2>
                <p className="mt-4 text-base text-white/85">
                  {course.components}
                </p>
              </div>
            </div>
          ))}

          <div className="px-6 pb-16 text-center sm:px-10 lg:hidden">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.22em] uppercase"
            >
              View full menu
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
