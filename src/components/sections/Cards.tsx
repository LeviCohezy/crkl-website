import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, Unveil } from "@/components/motion/Reveal";
import { Band, Head, tones, type Tone } from "@/components/sections/Band";
import type { Photo } from "@/lib/photos";

export type Card = {
  title: string;
  body: string;
  /** Small label above the title — a role, a count. */
  label?: string;
  photo?: Photo;
};

type CardsProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  intro?: string;
  cards: Card[];
};

/**
 * Three things side by side, kept apart by hairlines rather than boxes.
 * With photographs they read as a small grid of blocks; without, as a
 * numbered list set in columns.
 */
export function Cards({ tone = "white", eyebrow, title, intro, cards }: CardsProps) {
  const t = tones[tone];

  return (
    <Band tone={tone}>
      <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} />

      <ul className={`mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3 ${cards.length > 3 ? "lg:grid-cols-4" : ""}`}>
        {cards.map((card, index) => (
          <li key={card.title}>
            {card.photo ? (
              <Unveil delay={(index % 4) * 0.08}>
                <MediaImage
                  src={card.photo.src}
                  alt={card.photo.alt}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 768px) 31vw, 100vw"
                />
              </Unveil>
            ) : null}
            <Reveal delay={(index % 4) * 0.08}>
              <div className={`border-t pt-6 ${t.rule} ${card.photo ? "mt-6 border-t-0 pt-0" : ""}`}>
                <p className={`eyebrow tabular-nums ${t.accent}`}>
                  {card.label ?? String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-4 text-3xl leading-tight font-light">
                  {card.title}
                </h3>
                <p className={`mt-4 leading-relaxed ${t.muted}`}>{card.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Band>
  );
}
