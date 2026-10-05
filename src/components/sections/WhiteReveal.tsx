"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";

const facts = [
  { label: "Kitchen", value: "Fine dining" },
  { label: "Covers", value: "Forty a service" },
  { label: "Sourcing", value: "Growers we know" },
  { label: "Cellar", value: "Our own wines" },
];

/**
 * Wraps the hero and holds it still.
 *
 * The hero is pinned for the length of this track — the page does not scroll
 * on to anything else — while a soft-edged white circle opens over it from the
 * bottom-left corner until the viewport is white and this section's content
 * lands on it.
 *
 * The scroll handler writes two CSS custom properties and nothing else — no
 * state, so no React render per frame. The gradient itself lives in
 * globals.css (`.reveal-wash`).
 */
export function WhiteReveal({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    // Nothing to animate for people who asked for less motion: land on white.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.style.setProperty("--p", "1");
      stage.style.setProperty("--c", "1");
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) return;

      const p = Math.min(Math.max(-rect.top / distance, 0), 1);
      // Content arrives once the wash has mostly covered the screen.
      const c = Math.min(Math.max((p - 0.45) / 0.35, 0), 1);

      stage.style.setProperty("--p", p.toFixed(4));
      stage.style.setProperty("--c", c.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative h-[220svh] bg-white">
      <div
        ref={stageRef}
        className="reveal-stage sticky top-0 h-svh overflow-hidden"
      >
        {/* The hero itself, held in place for the length of the track. */}
        <div className="absolute inset-0">{children}</div>

        {/* The circle. Never swallows pointer events, so the hero's columns
            stay hoverable right up until the white covers them. */}
        <div
          aria-hidden
          className="reveal-wash pointer-events-none absolute inset-0"
        />

        <div className="reveal-content pointer-events-none absolute inset-0 flex items-center">
          <Container width="wide">
            <p className="eyebrow text-bordeaux">The house</p>
            <h2 className="font-display mt-6 max-w-3xl text-balance text-4xl leading-[1.1] font-light sm:text-5xl lg:text-6xl">
              A small dining room, a short menu, and a cellar we built ourselves
            </h2>

            <dl className="mt-16 grid gap-x-8 gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="eyebrow text-stone">{fact.label}</dt>
                  <dd className="font-display mt-2 text-2xl font-light">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </div>
    </section>
  );
}
