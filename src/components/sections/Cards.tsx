import { MediaImage } from "@/components/media/MediaImage";
import { Hollow, Ring, Square } from "@/components/motion/Accents";
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
  /** For `flanked`: the photograph in the middle. */
  photo?: Photo;
  /**
   * `columns` — three columns with outlined numerals, no pictures (Blanquette).
   * `flanked` — one photograph in the middle, the items on either side of
   *             it, with thin arcs behind ("why choose us").
   * `checker` — rows of picture and words, butted together, alternating
   *             sides (Wagyu / Midnight Velvet).
   * `photos`  — three pictures with their words under them, the middle one
   *             dropped lower.
   */
  variant?: "columns" | "flanked" | "checker" | "photos";
};

export function Cards({ tone = "white", eyebrow, title, intro, cards, photo, variant = "columns" }: CardsProps) {
  const t = tones[tone];

  /* ── flanked ────────────────────────────────────────────────────────── */
  if (variant === "flanked" && photo) {
    const left = cards.filter((_, index) => index % 2 === 0);
    const right = cards.filter((_, index) => index % 2 === 1);
    const item = (card: Card, index: number, align: "right" | "left") => (
      <Reveal key={card.title} delay={index * 0.1} className={align === "right" ? "lg:text-right" : ""}>
        <p className={`eyebrow ${t.accent}`}>{card.label ?? ""}</p>
        <h3 className="font-display mt-3 text-3xl leading-tight font-light">{card.title}</h3>
        <p className={`mt-3 leading-relaxed ${t.muted}`}>{card.body}</p>
      </Reveal>
    );
    return (
      <Band tone={tone}>
        <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} align="center" />
        <div className="relative mt-20 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <Ring className="top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 hidden lg:block" />
          <div className="space-y-12 lg:col-span-3">{left.map((card, i) => item(card, i, "right"))}</div>
          <div className="relative lg:col-span-4 lg:col-start-5">
            <Unveil>
              <MediaImage src={photo.src} alt={photo.alt} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 33vw, 100vw" focus={photo.focus} />
            </Unveil>
          </div>
          <div className="space-y-12 lg:col-span-3 lg:col-start-10">{right.map((card, i) => item(card, i, "left"))}</div>
        </div>
      </Band>
    );
  }

  /* ── checker ────────────────────────────────────────────────────────── */
  if (variant === "checker") {
    return (
      <Band tone={tone} bleed className="!py-0">
        <div className="mx-auto max-w-[100rem] px-6 pt-24 sm:px-10 sm:pt-36 lg:pt-44">
          <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
        </div>
        <ul className="mt-16 lg:mt-24">
          {cards.map((card, index) => {
            const flip = index % 2 === 1;
            return (
              <li key={card.title} className="grid md:grid-cols-2">
                <div className={`relative ${flip ? "md:order-2" : ""}`}>
                  {card.photo ? (
                    <Unveil>
                      <MediaImage src={card.photo.src} alt={card.photo.alt} aspect="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[26rem]" sizes="(min-width: 768px) 50vw, 100vw" focus={card.photo.focus} />
                    </Unveil>
                  ) : null}
                </div>
                <div className={`flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-24 ${index % 2 ? "bg-petal" : "bg-mist"} ${flip ? "md:order-1" : ""}`}>
                  <Reveal>
                    <Hollow className="text-5xl">{String(index + 1).padStart(2, "0")}</Hollow>
                    <h3 className="font-display mt-5 text-4xl leading-tight font-light">{card.title}</h3>
                    <p className={`mt-5 max-w-sm leading-relaxed ${t.muted}`}>{card.body}</p>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ul>
      </Band>
    );
  }

  /* ── photos ─────────────────────────────────────────────────────────── */
  if (variant === "photos") {
    return (
      <Band tone={tone}>
        <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {cards.map((card, index) => (
            <li key={card.title} className={index === 1 ? "md:mt-20" : ""}>
              {card.photo ? (
                <Unveil delay={index * 0.08}>
                  <MediaImage src={card.photo.src} alt={card.photo.alt} aspect="aspect-[4/5]" sizes="(min-width: 768px) 31vw, 100vw" focus={card.photo.focus} />
                </Unveil>
              ) : null}
              <Reveal delay={index * 0.08} className="mt-6">
                <p className={`eyebrow ${t.accent}`}>{card.label ?? String(index + 1).padStart(2, "0")}</p>
                <h3 className="font-display mt-3 text-3xl leading-tight font-light">{card.title}</h3>
                <p className={`mt-3 leading-relaxed ${t.muted}`}>{card.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Band>
    );
  }

  /* ── columns ────────────────────────────────────────────────────────── */
  return (
    <Band tone={tone}>
      <div className="relative">
        <Square className="-top-8 right-0 h-32 w-32 hidden lg:block" />
        <Head tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
      </div>
      <ul className={`mt-16 grid gap-x-10 gap-y-14 border-t pt-12 md:grid-cols-3 ${t.rule}`}>
        {cards.map((card, index) => (
          <li key={card.title}>
            <Reveal delay={index * 0.1}>
              <Hollow className="text-6xl">{String(index + 1).padStart(2, "0")}</Hollow>
              <h3 className="font-display mt-6 text-3xl leading-tight font-light">{card.title}</h3>
              <p className={`mt-4 leading-relaxed ${t.muted}`}>{card.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Band>
  );
}
