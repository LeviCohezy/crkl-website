import { MediaImage } from "@/components/media/MediaImage";
import { Ring } from "@/components/motion/Accents";
import { Drift } from "@/components/motion/Parallax";
import { Reveal, Unveil } from "@/components/motion/Reveal";
import { Band, Head, type Tone } from "@/components/sections/Band";
import { TransitionLink } from "@/components/shell/PageTransition";
import type { Photo } from "@/lib/photos";

export type Tile = {
  href: string;
  label: string;
  line: string;
  photo: Photo;
};

type TilesProps = {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  title: string;
  intro?: string;
  tiles: Tile[];
  /**
   * `stagger` is a plain grid of pictures with every name on the same
   *   baseline, each tile drifting a few pixels at its own pace;
   * `tall` is a row of tall cards with the name set at the top of the
   * picture and the line at the bottom (Ballena).
   */
  variant?: "stagger" | "tall";
};

/** Routes, as photographs. The whole tile is the link. */
export function Tiles({ id, tone = "white", eyebrow, title, intro, tiles, variant = "stagger" }: TilesProps) {
  if (variant === "tall") {
    return (
      <Band tone={tone} id={id}>
        <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {tiles.map((tile, index) => (
            <li key={tile.label}>
              <TransitionLink href={tile.href} className="group relative block overflow-hidden">
                <Unveil delay={index * 0.1}>
                  <MediaImage
                    src={tile.photo.src}
                    alt={tile.photo.alt}
                    aspect="aspect-[3/4]"
                    sizes="(min-width: 640px) 31vw, 100vw"
                    imageClassName="transition-transform duration-[1600ms] ease-expo group-hover:scale-[1.04]"
                    focus={tile.photo.focus}
                  />
                </Unveil>
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/55" />
                <h3 className="font-display absolute inset-x-0 top-8 text-center text-3xl font-light tracking-[0.14em] text-white uppercase sm:text-2xl lg:text-3xl">
                  {tile.label}
                </h3>
                <div className="absolute inset-x-0 bottom-8 text-center text-white">
                  <p className="text-sm text-white/90">{tile.line}</p>
                  <p className="eyebrow mt-4 inline-flex items-center gap-3">
                    Ontdek
                    <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1.5">→</span>
                  </p>
                </div>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </Band>
    );
  }

  /* Six pictures on one grid, every name on the same baseline: the title is
     one fixed line, the caption one more, so nothing shifts between tiles. */
  return (
    <Band tone={tone} id={id}>
      <Ring className="-right-28 top-24 h-96 w-96" dot={210} />
      <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} align="center" />

      <ul className="mt-20 grid gap-y-20 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
        {tiles.map((tile, index) => (
          <li key={tile.label}>
            <Drift distance={index % 2 ? -10 : 10}>
              <TransitionLink href={tile.href} className="group block">
                <Reveal delay={(index % 3) * 0.08}>
                  <Unveil>
                    <MediaImage
                      src={tile.photo.src}
                      alt={tile.photo.alt}
                      aspect="aspect-[4/5]"
                      sizes="(min-width: 1024px) 31vw, 46vw"
                      imageClassName="transition-transform duration-[1600ms] ease-expo group-hover:scale-[1.04]"
                      focus={tile.photo.focus}
                    />
                  </Unveil>
                </Reveal>
                <div className="mt-5 grid h-[4.5rem] grid-rows-[auto_auto] content-start">
                  <h3 className="font-display truncate text-2xl leading-none font-light sm:text-3xl">{tile.label}</h3>
                  <p className="mt-2 flex items-baseline gap-3 truncate text-sm text-ink-soft">
                    {tile.line}
                    <span aria-hidden className="transition-transform duration-500 ease-expo group-hover:translate-x-1.5">
                      →
                    </span>
                  </p>
                </div>
              </TransitionLink>
            </Drift>
          </li>
        ))}
      </ul>
    </Band>
  );
}
