"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A small ring that trails the pointer and swells into a labelled disc over
 * anything marked `data-cursor="Bekijk"`. Fine pointers only; touch devices
 * and reduced motion keep the native cursor.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    const text = label.current;
    const fill = el?.querySelector("[data-fill]");
    if (!el || !text || !fill) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const moveX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    let shown = false;

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      if (!shown) {
        shown = true;
        gsap.set(el, { x: event.clientX, y: event.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }

      const target = (event.target as Element | null)?.closest?.(
        "[data-cursor], a, button",
      );
      const word = target?.getAttribute("data-cursor") ?? "";
      const mode = word ? "label" : target ? "link" : "idle";
      if (el.dataset.mode === mode && text.textContent === word) return;

      el.dataset.mode = mode;
      text.textContent = word;
      gsap.to(el, {
        width: mode === "label" ? 92 : mode === "link" ? 46 : 14,
        height: mode === "label" ? 92 : mode === "link" ? 46 : 14,
        duration: 0.45,
        ease: "expo.out",
      });
      gsap.to(fill, { opacity: mode === "label" ? 0.94 : 0, duration: 0.3 });
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
      className="pointer-events-none invisible fixed top-0 left-0 z-[85] flex h-3.5 w-3.5 items-center justify-center rounded-full border border-ink/60"
    >
      <span data-fill className="absolute inset-0 rounded-full bg-cream opacity-0" />
      <span ref={label} className="eyebrow relative text-[0.5625rem] text-ink" />
    </div>
  );
}
