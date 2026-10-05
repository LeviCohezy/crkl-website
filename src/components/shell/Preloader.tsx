"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { getLenis } from "@/lib/lenis";

const LETTERS = ["C", "R", "K", "L"];
const SEEN_KEY = "crkl-intro-seen";

/**
 * The opening curtain. The monogram rises letter by letter inside a ring that
 * draws itself closed, then the ring becomes a hole that opens onto the page.
 *
 * It is server-rendered so the page never shows before the intro. Returning
 * visitors in the same tab get a short version; reduced motion gets none.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const finish = () => {
      el.style.display = "none";
      getLenis()?.start();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markIntroDone();
      finish();
      return;
    }

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === "1";
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Storage can be blocked; play the full intro.
    }

    // Lenis is created by a parent effect, one tick after this one runs.
    const hold = requestAnimationFrame(() => getLenis()?.stop());

    const letters = el.querySelectorAll("[data-letter]");
    const ring = el.querySelector<SVGCircleElement>("[data-ring]");
    const reach = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 60;
    const hole = { r: 0 };

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    if (!seen) {
      tl.fromTo(
        letters,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.12 },
        0.15,
      ).fromTo(
        ring,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" },
        0.1,
      );
    } else {
      tl.set(letters, { yPercent: 0 }).set(ring, { strokeDashoffset: 0 });
    }

    tl.to(
      letters,
      { yPercent: -110, duration: 0.6, ease: "power3.in", stagger: 0.05 },
      seen ? 0.25 : ">-0.1",
    )
      .to(ring, { autoAlpha: 0, scale: 1.4, duration: 0.6, transformOrigin: "50% 50%" }, "<")
      .add(() => markIntroDone(), ">-0.25")
      .to(
        hole,
        {
          r: reach,
          duration: 1.3,
          ease: "power3.inOut",
          onUpdate: () => {
            const mask = `radial-gradient(circle at 50% 50%, transparent ${hole.r}px, #000 ${hole.r + 1.5}px)`;
            el.style.maskImage = mask;
            el.style.webkitMaskImage = mask;
          },
        },
        "<",
      )
      .add(finish);

    return () => {
      cancelAnimationFrame(hold);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="preloader fixed inset-0 z-[95] flex items-center justify-center bg-blush text-cream"
    >
      <div className="relative flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            data-ring
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        </svg>
        <div className="font-display grid grid-cols-2 gap-x-5 gap-y-1 text-4xl leading-none font-light sm:text-5xl">
          {LETTERS.map((letter) => (
            <span key={letter} className="block overflow-hidden py-1">
              <span data-letter className="block translate-y-[110%]">
                {letter}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
