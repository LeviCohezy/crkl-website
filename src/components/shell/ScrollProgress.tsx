"use client";

import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/lenis";

/**
 * How far down the page you are, as a ring that closes — and a way back up.
 * Writes one CSS variable per frame; nothing re-renders.
 */
export function ScrollProgress() {
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = button.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.setProperty("--progress", progress.toFixed(4));
      el.dataset.visible = window.scrollY > window.innerHeight * 0.6 ? "true" : "false";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      ref={button}
      type="button"
      aria-label="Terug naar boven"
      data-visible="false"
      onClick={() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0 });
      }}
      className="group fixed right-4 bottom-4 z-40 flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-cream/85 text-ink opacity-0 backdrop-blur-md transition-[scale,opacity] duration-500 ease-expo data-[visible=true]:scale-100 data-[visible=true]:opacity-100 sm:right-6 sm:bottom-6"
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
        <circle
          cx="24"
          cy="24"
          r="22.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray="1"
          style={{ strokeDashoffset: "calc(1 - var(--progress, 0))" }}
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
