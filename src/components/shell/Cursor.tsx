"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A small ring that trails the pointer and opens a little over anything you
 * can click. Fine pointers only; touch devices and reduced motion keep the
 * native cursor.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const moveX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    let shown = false;
    let over = false;

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      if (!shown) {
        shown = true;
        gsap.set(el, { x: event.clientX, y: event.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }

      const hit = Boolean((event.target as Element | null)?.closest?.("a, button"));
      if (hit === over) return;
      over = hit;
      gsap.to(el, { scale: hit ? 2.8 : 1, duration: 0.45, ease: "expo.out" });
    };

    const onLeave = () => {
      shown = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none invisible fixed top-0 left-0 z-[85] h-3.5 w-3.5 rounded-full border border-ink/60"
    />
  );
}
