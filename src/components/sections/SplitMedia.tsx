import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { MediaImage } from "@/components/media/MediaImage";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { Band, tones, type Tone } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";
import type { Photo } from "@/lib/photos";

type SplitMediaProps = {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  title: string;
  /** One string per paragraph. */
  body: string[];
  link?: { href: string; label: string };
  photo: Photo;
  /** A silent loop instead of the photograph; the photo stays as its poster. */
  video?: { src: string; poster: string };
  /** Picture on the right instead of the left. */
  flip?: boolean;
  /** Extra content under the text — a list of facts, a second link. */
  children?: ReactNode;
};

/**
 * Picture and words, side by side, with room around both. The picture is
 * uncovered from its bottom edge and drifts a little behind its frame.
 */
export function SplitMedia({
  id,
  tone = "white",
  eyebrow,
  title,
  body,
  link,
  photo,
  video,
  flip = false,
  children,
}: SplitMediaProps) {
  const t = tones[tone];

  return (
    <Band tone={tone} id={id}>
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
          <Unveil>
            {video ? (
              <div className="aspect-[4/5] bg-petal">
                <BackgroundVideo src={video.src} poster={video.poster} />
              </div>
            ) : (
              <Parallax className="aspect-[4/5]" amount={6}>
                <MediaImage
                  src={photo.src}
                  alt={photo.alt}
                  aspect="h-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </Parallax>
            )}
          </Unveil>
        </div>

        <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
          {eyebrow ? (
            <Reveal>
              <p className={`eyebrow ${t.accent}`}>{eyebrow}</p>
            </Reveal>
          ) : null}
          <SplitText
            text={title}
            className="font-display mt-6 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.06] font-light"
          />
          <Reveal delay={0.15} className={`mt-8 max-w-md space-y-5 text-lg leading-relaxed ${t.muted}`}>
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          {children ? (
            <Reveal delay={0.2} className="mt-10">
              {children}
            </Reveal>
          ) : null}
          {link ? (
            <Reveal delay={0.25} className="mt-10">
              <ArrowLink href={link.href} tone={tone === "dark" ? "light" : "ink"}>
                {link.label}
              </ArrowLink>
            </Reveal>
          ) : null}
        </div>
      </div>
    </Band>
  );
}
