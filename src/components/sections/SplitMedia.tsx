import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { MediaImage } from "@/components/media/MediaImage";
import { Eyebrow, Ring, Square } from "@/components/motion/Accents";
import { Drift, Parallax } from "@/components/motion/Parallax";
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
  /** A silent loop instead of the main photograph; the photo is its poster. */
  video?: { src: string; poster: string };
  /** Further photographs: `stack` uses one, `collage` uses two, `inset` one. */
  photos?: Photo[];
  /** Picture on the right instead of the left. */
  flip?: boolean;
  /**
   * `simple`  — one picture beside the words.
   * `stack`   — two pictures overlapping, the smaller one in front and lower
   *             (Zesty, "prepared just for you").
   * `collage` — three pictures at different sizes and heights, with the
   *             words in the cells between them ("innovation meets tradition").
   * `inset`   — a rose panel set in from the edges, with the pictures
   *             breaking over its top and bottom (Tuscany).
   */
  variant?: "simple" | "stack" | "collage" | "inset";
  /** Extra content under the text — a list of facts, a second link. */
  children?: ReactNode;
};

function Media({
  photo,
  video,
  sizes,
  aspect = "aspect-[4/5]",
  parallax = true,
}: {
  photo: Photo;
  video?: { src: string; poster: string };
  sizes: string;
  aspect?: string;
  parallax?: boolean;
}) {
  if (video) {
    return (
      <div className={`${aspect} bg-petal`}>
        <BackgroundVideo src={video.src} poster={video.poster} />
      </div>
    );
  }
  if (!parallax) {
    return <MediaImage src={photo.src} alt={photo.alt} aspect={aspect} sizes={sizes} focus={photo.focus} />;
  }
  return (
    <Parallax className={aspect} amount={6}>
      <MediaImage src={photo.src} alt={photo.alt} aspect="h-full" sizes={sizes} focus={photo.focus} />
    </Parallax>
  );
}

/** Picture and words, in one of four arrangements. */
export function SplitMedia({
  id,
  tone = "white",
  eyebrow,
  title,
  body,
  link,
  photo,
  video,
  photos = [],
  flip = false,
  variant = "simple",
  children,
}: SplitMediaProps) {
  const t = tones[tone];
  const linkTone = tone === "dark" ? "light" : "ink";

  const words = (
    <>
      {eyebrow ? (
        <Reveal>
          <Eyebrow className={t.accent}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <SplitText
        text={title}
        className="font-display mt-6 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.06] font-light"
      />
      <Reveal delay={0.15} className={`mt-9 max-w-md space-y-6 text-lg leading-relaxed ${t.muted}`}>
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
          <ArrowLink href={link.href} tone={linkTone}>
            {link.label}
          </ArrowLink>
        </Reveal>
      ) : null}
    </>
  );

  /* ── stack ──────────────────────────────────────────────────────────── */
  if (variant === "stack") {
    const front = photos[0] ?? photo;
    return (
      <Band tone={tone} id={id}>
        <div className="grid items-center gap-20 sm:gap-16 lg:grid-cols-12 lg:gap-8">
          <div className={`relative lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
            <div className="ml-auto w-[78%] lg:w-[72%]">
              <Unveil>
                <Media photo={photo} video={video} sizes="(min-width: 1024px) 38vw, 78vw" aspect="aspect-[3/4]" />
              </Unveil>
            </div>
            <Drift distance={-40} className="absolute bottom-[-10%] left-0 w-[46%] lg:w-[42%]">
              <Unveil delay={0.2}>
                <MediaImage src={front.src} alt={front.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 22vw, 46vw" focus={front.focus} />
              </Unveil>
            </Drift>
            <Ring className="-top-10 right-[14%] h-28 w-28" />
          </div>
          <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>{words}</div>
        </div>
      </Band>
    );
  }

  /* ── collage ────────────────────────────────────────────────────────── */
  if (variant === "collage") {
    const [second, third] = [photos[0] ?? photo, photos[1] ?? photo];
    return (
      <Band tone={tone} id={id}>
        <div className="grid gap-20 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          <div className={`lg:col-span-5 ${flip ? "lg:order-3 lg:col-start-8" : ""}`}>
            {words}
            <div className="mt-14 w-[72%] lg:mt-20">
              <Unveil delay={0.15}>
                <MediaImage src={third.src} alt={third.alt} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 22vw, 70vw" focus={third.focus} />
              </Unveil>
            </div>
          </div>
          <div className={`lg:col-span-4 ${flip ? "lg:order-2 lg:col-start-4" : "lg:col-start-6"}`}>
            <Unveil>
              <Media photo={photo} video={video} sizes="(min-width: 1024px) 31vw, 100vw" aspect="aspect-[3/4]" />
            </Unveil>
          </div>
          <div className={`lg:col-span-2 lg:pt-32 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-11"}`}>
            <Drift distance={-24}>
              <Unveil delay={0.25}>
                <MediaImage src={second.src} alt={second.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 24vw, 100vw" focus={second.focus} />
              </Unveil>
            </Drift>
            <Reveal delay={0.3}>
              <p className={`mt-8 text-sm leading-relaxed ${t.muted}`}>{second.alt}</p>
            </Reveal>
          </div>
        </div>
      </Band>
    );
  }

  /* ── inset ──────────────────────────────────────────────────────────── */
  if (variant === "inset") {
    const second = photos[0];
    return (
      <Band tone={tone} id={id} bleed className="!py-0">
        <div className="mx-auto max-w-[100rem] px-7 py-32 sm:px-10 sm:py-32 lg:py-40">
          <div className="relative bg-blush px-7 py-28 sm:px-12 sm:py-24 lg:px-20 lg:py-32">
            <div className="grid gap-20 sm:gap-14 lg:grid-cols-12 lg:gap-8">
              <div className={`relative lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                {/* Breaks over the top edge of the panel. */}
                <div className="lg:-mt-48">
                  <Unveil>
                    <Media photo={photo} video={video} sizes="(min-width: 1024px) 38vw, 100vw" aspect="aspect-[3/4]" />
                  </Unveil>
                </div>
                {second ? (
                  <div className="mt-8 ml-auto w-[42%] lg:absolute lg:-right-10 lg:-bottom-44 lg:mt-0">
                    <Unveil delay={0.2}>
                      <MediaImage src={second.src} alt={second.alt} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 16vw, 42vw" focus={second.focus} />
                    </Unveil>
                  </div>
                ) : null}
              </div>
              <div className={`lg:col-span-5 lg:self-center ${flip ? "lg:order-1 lg:col-start-2" : "lg:col-start-7"}`}>
                {words}
              </div>
            </div>
          </div>
        </div>
      </Band>
    );
  }

  /* ── simple ─────────────────────────────────────────────────────────── */
  return (
    <Band tone={tone} id={id}>
      <div className="grid items-center gap-20 sm:gap-14 lg:grid-cols-12 lg:gap-8">
        <div className={`relative lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
          <Square className="-top-5 -left-5 h-full w-full hidden lg:block" />
          <Unveil>
            <Media photo={photo} video={video} sizes="(min-width: 1024px) 50vw, 100vw" />
          </Unveil>
        </div>
        <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>{words}</div>
      </div>
    </Band>
  );
}
