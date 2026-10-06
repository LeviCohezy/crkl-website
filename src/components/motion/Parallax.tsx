"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  /** How far the content travels inside its frame, in percent of its height. */
  amount?: number;
  className?: string;
  /** Corner radius of the frame; "rounded-none" for a picture that meets the edges. */
  radius?: string;
};

/**
 * A fixed frame with its content drifting slowly behind it as the page
 * scrolls. The content is oversized by the same amount it travels, so the
 * frame never shows an edge.
 */
export function Parallax({ children, amount = 9, className = "", radius = "rounded-2xl" }: ParallaxProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: frame.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: frame, dependencies: [amount] },
  );

  return (
    <div ref={frame} className={`overflow-hidden ${radius} ${className}`}>
      <div
        ref={inner}
        className="h-full w-full will-change-transform"
        style={{ scale: 1 + (amount * 2.4) / 100 }}
      >
        {children}
      </div>
    </div>
  );
}

type DriftProps = {
  children: ReactNode;
  /** Pixels of travel across the pass. Negative moves against the scroll. */
  distance?: number;
  className?: string;
};

/** Moves a whole element at its own pace as it crosses the viewport. */
export function Drift({ children, distance = 80, className = "" }: DriftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { y: distance },
          {
            y: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref, dependencies: [distance] },
  );

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
