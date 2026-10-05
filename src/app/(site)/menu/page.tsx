import type { Metadata } from "next";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { MediaImage } from "@/components/media/MediaImage";
import { Drift } from "@/components/motion/Parallax";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { MenuScene } from "@/components/sections/MenuScene";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";
import { PillLink } from "@/components/ui/Button";
import { plates } from "@/lib/menu";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Het tasting menu en de lunch van CRKL in Roeselare: Menu CRKL+, Menu Carré+ en de lunchformule, met wijnpairing.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Lunch & diner"
        title={"Het\n*menu*"}
        intro="Ontdek het tasting menu van CRKL, waar seizoensgebonden ingrediënten en verfijnde smaken centraal staan."
        image={{
          src: shoot.maart26(36),
          alt: "Vis met gekleurde toetsen op een wit bord",
        }}
        badge="Dagvers · Seizoen"
      />

      <MenuScene />

      {/* ── In het glas ──────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-petal py-28 sm:py-40">
        <div className="mx-auto grid max-w-[100rem] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24">
          <div className="relative mx-auto w-full max-w-md">
            <Unveil className="rounded-t-full">
              <div className="aspect-[3/4] bg-blush">
                <BackgroundVideo src="clips/crkl-wijn.mp4" poster="hero/crkl-wijn.jpg" />
              </div>
            </Unveil>
            <Drift distance={-50} className="absolute -right-6 -bottom-10 w-2/5 sm:-right-14">
              <MediaImage
                src={shoot.juni25(35)}
                alt="Cocktail in de zon tegen een witte muur"
                aspect="aspect-square"
                className="rounded-full"
                sizes="(min-width: 1024px) 14vw, 40vw"
              />
            </Drift>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow text-rosewood">In het glas</p>
            </Reveal>
            <SplitText
              text={"Bij elke gang\n*het juiste glas*"}
              className="font-display mt-6 text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.06] font-light"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
                Kies bij uw menu voor de wijnpairing tot en met het
                hoofdgerecht, of voor een aangepast non-alcoholisch sap. Wie
                liever zelf kiest, krijgt de kaart.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10">
              <PillLink href="/wijn">Wijn &amp; aperitief</PillLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Het seizoen op het bord ──────────────────────────────────── */}
      <section className="bg-mist py-28 sm:py-40">
        <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Reveal>
                <p className="eyebrow text-rosewood">Het seizoen op het bord</p>
              </Reveal>
              <SplitText
                text={"Wat het seizoen\n*aanreikt*"}
                className="font-display mt-6 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.04] font-light"
              />
            </div>
            <Reveal className="max-w-sm">
              <p className="leading-relaxed text-ink-soft">
                Het menu ligt vast, de gerechten niet: ze volgen wat onze
                leveranciers op dat moment op hun best hebben. Allergieën of
                dieetwensen? Laat het ons weten bij uw reservatie.
              </p>
            </Reveal>
          </div>

          <ul className="mt-20 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
            {plates.map((plate, index) => {
              const round = index % 3 === 1;
              return (
                <li key={plate.name} className={index % 2 ? "lg:mt-20" : ""}>
                  <Unveil
                    shape={round ? "circle" : "block"}
                    delay={(index % 4) * 0.07}
                    className={round ? "rounded-full" : ""}
                  >
                    <MediaImage
                      src={plate.src}
                      alt={plate.alt}
                      aspect={round ? "aspect-square" : "aspect-[4/5]"}
                      sizes="(min-width: 1024px) 23vw, 46vw"
                      imageClassName="transition-transform duration-[1400ms] ease-expo hover:scale-105"
                    />
                  </Unveil>
                  <p className="eyebrow mt-5 text-stone">{plate.season}</p>
                  <p className="font-display mt-2 text-2xl font-light">{plate.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{plate.components}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ReserveCta />
    </>
  );
}
