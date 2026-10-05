import { MediaImage } from "@/components/media/MediaImage";
import { Drift } from "@/components/motion/Parallax";
import { Unveil } from "@/components/motion/Reveal";
import { Band, Head, type Tone } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";
import type { Photo } from "@/lib/photos";

type GalleryProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Four photographs. */
  photos: Photo[];
  link?: { href: string; label: string };
};

/**
 * Proof by showing: four photographs in a row, uncovered one after another.
 * Alternate frames travel a few pixels as the page scrolls, so the row
 * breathes instead of sitting on a grid line.
 */
export function Gallery({ tone = "white", eyebrow, title, intro, photos, link }: GalleryProps) {
  return (
    <Band tone={tone}>
      <Head
        tone={tone}
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        aside={
          link ? (
            <ArrowLink href={link.href} tone={tone === "dark" ? "light" : "ink"}>
              {link.label}
            </ArrowLink>
          ) : undefined
        }
      />

      <ul className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {photos.slice(0, 4).map((photo, index) => (
          <li key={photo.src}>
            <Drift distance={index % 2 ? -18 : 18}>
              <Unveil delay={index * 0.08}>
                <MediaImage
                  src={photo.src}
                  alt={photo.alt}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 23vw, 46vw"
                />
              </Unveil>
            </Drift>
          </li>
        ))}
      </ul>
    </Band>
  );
}
