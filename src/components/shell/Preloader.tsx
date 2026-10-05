"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { getLenis } from "@/lib/lenis";

const LETTERS = ["C", "R", "K", "L"];
const SEEN_KEY = "crkl-intro-seen";

/**
 * The opening curtain: the monogram rises letter by letter on the brand
 * rose, then the curtain lifts off the page.
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
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    if (!seen) {
      tl.fromTo(
        letters,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, stagger: 0.13 },
        0.2,
      ).to({}, { duration: 0.25 });
    } else {
      tl.set(letters, { yPercent: 0 }).to({}, { duration: 0.2 });
    }

    tl.to(letters, {
      yPercent: -110,
      duration: 0.6,
      ease: "power3.in",
      stagger: 0.05,
    })
      .add(() => markIntroDone(), ">-0.2")
      .to(el, { yPercent: -100, duration: 1.15, ease: "power4.inOut" }, "<")
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
      className="preloader fixed inset-0 z-[95] flex items-center justify-center bg-blush text-ink"
    >
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
  );
}
