import { MediaImage } from "@/components/media/MediaImage";
import { Unveil } from "@/components/motion/Reveal";
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
};

/**
 * Routes, as photographs. Each tile is a picture you can walk into: it
 * settles a little on hover while its arrow steps forward, and the whole
 * tile is the link.
 */
export function Tiles({ id, tone = "white", eyebrow, title, intro, tiles }: TilesProps) {
  return (
    <Band tone={tone} id={id}>
      <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} />

      <ul
        className={`mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:gap-x-8 ${
          tiles.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {tiles.map((tile, index) => (
          <li key={tile.label}>
            <TransitionLink href={tile.href} className="group block">
              <Unveil delay={(index % 3) * 0.08}>
                <MediaImage
                  src={tile.photo.src}
                  alt={tile.photo.alt}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                  imageClassName="transition-transform duration-[1600ms] ease-expo group-hover:scale-[1.04]"
                />
              </Unveil>
              <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-current/20 pb-5">
                <div>
                  <h3 className="font-display text-3xl font-light">{tile.label}</h3>
                  <p className="mt-2 text-sm opacity-70">{tile.line}</p>
                </div>
                <span
                  aria-hidden
                  className="text-lg transition-transform duration-500 ease-expo group-hover:translate-x-1.5"
                >
                  →
                </span>
              </div>
            </TransitionLink>
          </li>
        ))}
      </ul>
    </Band>
  );
}
