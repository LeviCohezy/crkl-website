import { MediaImage } from "@/components/media/MediaImage";
import { Ring } from "@/components/motion/Accents";
import { Drift } from "@/components/motion/Parallax";
import { Reveal, Unveil } from "@/components/motion/Reveal";
import { Band, Head, type Tone } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";
import type { Photo } from "@/lib/photos";

type GalleryProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Four photographs (three or five also work for `stagger`). */
  photos: Photo[];
  /** Short captions under the pictures, in the same order. */
  captions?: string[];
  link?: { href: string; label: string };
  /** A centred line under the pictures. */
  after?: string;
  /**
   * `stagger` — a row at alternating heights, title left, a short line
   *             right, and the link centred underneath ("exquisite gastronomy").
   * `collage` — four pictures of different sizes set loosely in a square
   *             beside the words (seasonal catering).
   * `strip`   — tall pictures butted edge to edge across the whole width,
   *             captions on them (best sellers).
   */
  variant?: "stagger" | "collage" | "strip";
};

/** Proof by showing. */
export function Gallery({
  tone = "white",
  eyebrow,
  title,
  intro,
  photos,
  captions,
  link,
  after,
  variant = "stagger",
}: GalleryProps) {
  const linkTone = tone === "dark" ? "light" : "ink";

  /* ── strip ──────────────────────────────────────────────────────────── */
  if (variant === "strip") {
    return (
      <Band tone={tone} bleed className="!py-0">
        <div className="mx-auto max-w-[100rem] px-6 pt-24 pb-14 sm:px-10 sm:pt-36 lg:pt-44">
          <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} aside={link ? <ArrowLink href={link.href} tone={linkTone}>{link.label}</ArrowLink> : undefined} />
        </div>
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {photos.slice(0, 4).map((photo, index) => (
            <li key={photo.src} className="group relative">
              <Unveil delay={index * 0.08} radius="rounded-none">
                <MediaImage
                  src={photo.src}
                  alt={photo.alt}
                  aspect="aspect-[3/4]"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  imageClassName="transition-transform duration-[1800ms] ease-expo group-hover:scale-[1.04]"
                  focus={photo.focus}
                  radius="rounded-none"
                />
              </Unveil>
              {captions?.[index] ? (
                <p className="eyebrow pointer-events-none absolute bottom-6 left-6 text-white drop-shadow">
                  {captions[index]}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Band>
    );
  }

  /* ── collage ────────────────────────────────────────────────────────── */
  if (variant === "collage") {
    const [a, b, c, d] = photos;
    return (
      <Band tone={tone}>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
            {link ? (
              <Reveal delay={0.2} className="mt-10">
                <ArrowLink href={link.href} tone={linkTone}>{link.label}</ArrowLink>
              </Reveal>
            ) : null}
          </div>
          <div className="relative grid grid-cols-12 gap-4 lg:col-span-7 lg:col-start-6 lg:gap-6">
            <Ring className="-top-12 -left-10 h-32 w-32" />
            <div className="col-span-4 pt-12">
              <Unveil><MediaImage src={a.src} alt={a.alt} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 18vw, 33vw" focus={a.focus} /></Unveil>
            </div>
            <div className="col-span-8">
              <Unveil delay={0.1}><MediaImage src={b.src} alt={b.alt} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 38vw, 66vw" focus={b.focus} /></Unveil>
            </div>
            <div className="col-span-7 col-start-2 -mt-4">
              <Unveil delay={0.2}><MediaImage src={c.src} alt={c.alt} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 33vw, 58vw" focus={c.focus} /></Unveil>
            </div>
            <div className="col-span-3 col-start-9 -mt-16">
              <Unveil delay={0.3}><MediaImage src={d.src} alt={d.alt} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 14vw, 25vw" focus={d.focus} /></Unveil>
            </div>
          </div>
        </div>
      </Band>
    );
  }

  /* ── stagger ────────────────────────────────────────────────────────── */
  const count = photos.length;
  return (
    <Band tone={tone}>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Head tone={tone} eyebrow={eyebrow} title={title} tracked />
        </div>
        {intro ? (
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft lg:text-right lg:ml-auto">{intro}</p>
          </Reveal>
        ) : null}
      </div>

      <ul className={`mt-16 grid gap-5 sm:gap-6 lg:mt-24 lg:gap-8 ${count === 3 ? "grid-cols-3" : count === 5 ? "grid-cols-5" : "grid-cols-2 lg:grid-cols-4"}`}>
        {photos.map((photo, index) => (
          <li key={photo.src} className={index % 2 ? "lg:mt-20" : ""}>
            <Drift distance={index % 2 ? -16 : 16}>
              <Unveil delay={index * 0.08}>
                <MediaImage
                  src={photo.src}
                  alt={photo.alt}
                  aspect={index % 2 ? "aspect-[3/4]" : "aspect-[4/5]"}
                  sizes="(min-width: 1024px) 23vw, 46vw"
                  focus={photo.focus}
                />
              </Unveil>
              {captions?.[index] ? (
                <p className="eyebrow mt-4 text-ink-soft">{captions[index]}</p>
              ) : null}
            </Drift>
          </li>
        ))}
      </ul>

      {after || link ? (
        <Reveal className="mx-auto mt-20 max-w-xl text-center">
          {after ? <p className="leading-relaxed text-ink-soft">{after}</p> : null}
          {link ? (
            <div className="mt-8 flex justify-center">
              <ArrowLink href={link.href} tone={linkTone}>{link.label}</ArrowLink>
            </div>
          ) : null}
        </Reveal>
      ) : null}
    </Band>
  );
}
