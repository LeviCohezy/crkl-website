import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import { Drift } from "@/components/motion/Parallax";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";
import { TransitionLink } from "@/components/shell/PageTransition";
import { getWines, styleLabels, wineTitle } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Wijn & aperitief",
  description:
    "Wijnpairing bij het menu, cocktails van de bar en een selectie uit de kelder van CRKL in Roeselare.",
  alternates: { canonical: "/wijn" },
};

const bar = [
  { src: shoot.juli26(75), alt: "Cocktails op de witte tafel", round: false },
  { src: shoot.juni25(31), alt: "Rode cocktail op de rand van de tafel", round: true },
  { src: shoot.maart26(68), alt: "Oranje cocktail met schuimkraag op de bar", round: false },
  { src: shoot.juni25(21), alt: "Gin-tonic voor het roze gordijn", round: true },
];

export default async function WinePage() {
  const wines = await getWines();

  return (
    <>
      <PageHero
        eyebrow="Wijn & aperitief"
        title={"In het\n*glas*"}
        intro="Bij het menu hoort een wijnpairing tot en met het hoofdgerecht. Wie liever niet drinkt, krijgt een aangepast non-alcoholisch sap."
        image={{
          src: shoot.maart26(5),
          alt: "Schuimwijn wordt uitgeschonken",
        }}
        shape="arch"
        badge="Santé"
      />

      {/* ── Van de bar ───────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-mist py-28 sm:py-40">
        <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <p className="eyebrow text-rosewood">Van de bar</p>
              </Reveal>
              <SplitText
                text={"Eerst een\n*aperitief*"}
                className="font-display mt-6 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.04] font-light"
              />
            </div>
            <Reveal className="max-w-md lg:justify-self-end">
              <p className="text-lg leading-relaxed text-ink-soft">
                De avond begint aan de bar of op het terras, met een cocktail
                van het huis of een glas schuimwijn.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 items-center gap-5 lg:grid-cols-4 lg:gap-8">
            {bar.map((drink, index) => (
              <Drift key={drink.src} distance={index % 2 ? -34 : 34}>
                <Unveil
                  shape={drink.round ? "circle" : "block"}
                  delay={index * 0.07}
                  className={drink.round ? "rounded-full" : ""}
                >
                  <MediaImage
                    src={drink.src}
                    alt={drink.alt}
                    aspect={drink.round ? "aspect-square" : "aspect-[3/4]"}
                    sizes="(min-width: 1024px) 23vw, 46vw"
                  />
                </Unveil>
              </Drift>
            ))}
          </div>
        </div>
      </section>

      {/* ── Uit de kelder ────────────────────────────────────────────── */}
      <section className="bg-petal py-28 sm:py-40">
        <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Reveal>
                <p className="eyebrow text-rosewood">Uit de kelder</p>
              </Reveal>
              <SplitText
                text={"Een *selectie*"}
                className="font-display mt-6 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.04] font-light"
              />
            </div>
            <Reveal className="max-w-xs">
              <p className="text-sm leading-relaxed text-ink-soft">
                Flessen om mee naar huis te nemen. De webshop volgt; tot dan
                bestelt u via het restaurant.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14">
            {wines.map((wine, index) => (
              <li key={wine.slug}>
                <Reveal delay={index * 0.05}>
                  <TransitionLink
                    href={`/wijn/${wine.slug}`}
                    data-cursor="Bekijk"
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 border-t border-ink/20 py-7 sm:grid-cols-[3rem_1.4fr_1fr_auto_3rem] sm:gap-x-8"
                  >
                    <span className="font-display text-sm text-rosewood tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-light transition-[translate,font-style] duration-700 ease-expo group-hover:translate-x-3 group-hover:italic sm:text-5xl">
                      {wineTitle(wine)}
                    </span>
                    <span className="col-start-2 text-sm text-ink-soft sm:col-start-3">
                      {styleLabels[wine.style]} · {wine.grapes.join(", ")} · {wine.region}
                    </span>
                    <span className="col-start-3 row-start-1 text-sm tabular-nums sm:col-start-4">
                      {wine.commerce ? formatPrice(wine.commerce.priceCents) : "—"}
                    </span>
                    <span
                      aria-hidden
                      className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink/30 transition-colors duration-500 group-hover:bg-ink group-hover:text-cream sm:flex"
                    >
                      →
                    </span>
                  </TransitionLink>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="border-t border-ink/20" />
        </div>
      </section>

      <ReserveCta />
    </>
  );
}
