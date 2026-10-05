"use client";

import { useEffect, useRef, useState } from "react";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal } from "@/components/motion/Reveal";
import type { Photo } from "@/lib/photos";

export type Chapter = {
  label: string;
  title: string;
  body: string;
  photo: Photo;
};

/**
 * The story told in chapters. The text scrolls on the left; on the right one
 * tall frame holds still and each chapter's photograph opens over the last —
 * a circle growing from the centre until it fills the block.
 */
export function StoryChapters({ chapters }: { chapters: Chapter[] }) {
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
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
    for (const block of blocks.current) {
      if (block) observer.observe(block);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[100rem] px-6 sm:px-10 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.label}
              data-index={index}
              ref={(el) => {
                blocks.current[index] = el;
              }}
              className="flex flex-col justify-center py-16 lg:min-h-svh lg:py-0"
            >
              <Reveal className="lg:hidden">
                <MediaImage
                  src={chapter.photo.src}
                  alt={chapter.photo.alt}
                  aspect="aspect-[4/5]"
                  className="mb-10"
                  sizes="100vw"
                />
              </Reveal>
              <Reveal>
                <p className="eyebrow flex items-center gap-4 text-rosewood">
                  <span className="font-display text-base tracking-normal tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="h-px w-10 bg-current" />
                  {chapter.label}
                </p>
                <h2 className="font-display mt-6 text-[clamp(2.2rem,4.4vw,4.25rem)] leading-[1.06] font-light">
                  {chapter.title}
                </h2>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
                  {chapter.body}
                </p>
              </Reveal>
            </article>
          ))}
        </div>

        {/* ── Sticky frame, desktop only ───────────────────────────────── */}
        <div className="hidden lg:sticky lg:top-0 lg:col-span-6 lg:col-start-7 lg:flex lg:h-svh lg:items-center">
          <div className="relative h-[78svh] w-full overflow-hidden bg-petal">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.label}
                className="absolute inset-0 transition-[clip-path] duration-[1300ms] ease-expo"
                style={{
                  zIndex: index,
                  clipPath:
                    index <= active
                      ? "circle(75% at 50% 50%)"
                      : "circle(0% at 50% 50%)",
                }}
              >
                <MediaImage
                  src={chapter.photo.src}
                  alt={chapter.photo.alt}
                  aspect="h-full"
                  sizes="50vw"
                  imageClassName={`transition-transform duration-[1800ms] ease-expo ${
                    index <= active ? "scale-100" : "scale-125"
                  }`}
                />
              </div>
            ))}
            <p className="eyebrow absolute bottom-5 left-5 z-10 text-white tabular-nums mix-blend-difference">
              {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
