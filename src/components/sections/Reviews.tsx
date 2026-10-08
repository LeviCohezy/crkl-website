import { Ring } from "@/components/motion/Accents";
import { Reveal } from "@/components/motion/Reveal";
import { Band, Head, tones, type Tone } from "@/components/sections/Band";
import type { Quote, Review } from "@/lib/reviews";

type ReviewsProps = {
  reviews: Review[];
  tone?: Tone;
  eyebrow?: string;
  title?: string;
};

/**
 * Two or three full quotes with names — never a wall.
 *
 * Renders nothing while there are no reviews: see src/lib/reviews.ts.
 */
export function Reviews({
  reviews,
  tone = "white",
  eyebrow = "Gasten aan het woord",
  title = "Wat u *onthoudt*",
}: ReviewsProps) {
  if (reviews.length === 0) return null;
  const t = tones[tone];

  return (
    <Band tone={tone}>
      <Head tone={tone} eyebrow={eyebrow} title={title} />
      <ul className={`mt-16 grid gap-x-12 gap-y-16 border-t pt-14 md:grid-cols-3 md:gap-y-14 md:pt-12 ${t.rule}`}>
        {reviews.slice(0, 3).map((review, index) => (
          <li key={review.name}>
            <Reveal delay={index * 0.1}>
              <blockquote>
                <p className="font-display text-2xl leading-snug font-light sm:text-[1.75rem]">
                  “{review.quote}”
                </p>
                <footer className={`eyebrow mt-7 ${t.muted}`}>
                  {review.name}
                  {review.source ? ` · ${review.source}` : ""}
                </footer>
              </blockquote>
            </Reveal>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/**
 * One guest, one full quote, on the dark band right before an enquiry form.
 * Renders nothing until the quote exists.
 */
export function Spotlight({ quote }: { quote: Quote | null }) {
  if (!quote) return null;

  return (
    <Band tone="tint">
      <Ring className="top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2" />
      <Reveal className="relative mx-auto max-w-4xl text-center">
        <blockquote>
          <p className="font-display text-[clamp(1.9rem,4vw,3.75rem)] leading-[1.16] font-light">
            “{quote.quote}”
          </p>
          <footer className="eyebrow mt-10 text-stone">{quote.attribution}</footer>
        </blockquote>
      </Reveal>
    </Band>
  );
}
