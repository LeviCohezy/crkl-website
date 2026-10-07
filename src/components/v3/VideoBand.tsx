"use client";

import { useEffect, useRef } from "react";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import { imageUrl, videoUrl } from "@/lib/media";
import { playMuted } from "@/lib/video";

type VideoBandProps = {
  tone?: Tone;
  /** "\n" breaks the line, *asterisks* set words in italic. */
  text: string;
  video: string;
  poster: string;
  /** A short line under the film. */
  caption?: string;
};

/**
 * A sentence, then one film in a wide frame inside the page's gutters. The
 * film plays while it is in view and holds on its poster for anyone who
 * asked for less motion. It is shown as it is, without a wash over it.
 */
export function VideoBand({ tone = "white", text, video, poster, caption }: VideoBandProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const film = ref.current;
    if (!film) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playMuted(film);
        else film.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(film);
    return () => observer.disconnect();
  }, []);

  return (
    <Section tone={tone}>
      <SplitText as="h2" text={text} className={`${t.big} max-w-[18ch]`} />
      <Reveal y={16} className="mt-16 sm:mt-20">
        <figure>
          <div className="aspect-[4/5] w-full overflow-hidden bg-petal sm:aspect-[16/9]">
            <video
              ref={ref}
              className="h-full w-full object-cover"
              src={videoUrl(video)}
              poster={imageUrl(poster)}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              tabIndex={-1}
            />
          </div>
          {caption ? <figcaption className={`${t.small} mt-4`}>{caption}</figcaption> : null}
        </figure>
      </Reveal>
    </Section>
  );
}
