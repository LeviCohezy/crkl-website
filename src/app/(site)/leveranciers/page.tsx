import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import { Drift, Parallax } from "@/components/motion/Parallax";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";
import { shoot } from "@/lib/photos";
import { suppliers } from "@/lib/suppliers";

export const metadata: Metadata = {
  title: "Leveranciers",
  description:
    "De mensen bij wie het menu van CRKL begint: de veehouder, de kaasmaker, de aardbeienteler en de kruidenkweker.",
  alternates: { canonical: "/leveranciers" },
};

export default function SuppliersPage() {
  return (
    <>
      <PageHero
        eyebrow="Leveranciers"
        title={"Onze stoel\n*op bezoek*"}
        intro="We namen een stoel uit de zaal mee naar de wei, de serre en de rijpingskelder — naar de mensen bij wie ons menu begint."
        image={{
          src: shoot.leveranciers(31),
          alt: "De roze stoel van CRKL tussen de runderen",
        }}
        badge="Van dichtbij"
      />

      <section className="bg-mist py-28 sm:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SplitText
            as="p"
            text="Dagvers begint niet in de keuken. Het begint bij iemand die 's ochtends *vroeger* opstaat dan wij."
            className="font-display text-[clamp(1.9rem,3.8vw,3.5rem)] leading-[1.16] font-light"
          />
        </div>
      </section>

      {suppliers.map((supplier, index) => {
        const flip = index % 2 === 1;
        return (
          <section
            key={supplier.id}
            id={supplier.id}
            className={`relative overflow-hidden py-24 sm:py-36 ${flip ? "bg-petal" : "bg-mist"}`}
          >
            {/* The chapter number, oversized and hairline, behind everything. */}
            <p
              aria-hidden
              className={`font-display outline-text pointer-events-none absolute top-8 text-[36vw] leading-none font-light text-blush select-none lg:text-[24vw] ${
                flip ? "left-[-2vw]" : "right-[-2vw]"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </p>

            <div className="relative mx-auto grid max-w-[100rem] items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8">
              <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                <Unveil>
                  <Parallax className="aspect-[4/5]" amount={7}>
                    <MediaImage
                      src={supplier.chair.src}
                      alt={supplier.chair.alt}
                      aspect="h-full"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </Parallax>
                </Unveil>
              </div>

              <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <Reveal>
                  <p className="eyebrow text-rosewood">{supplier.trade}</p>
                  {supplier.name ? (
                    <p className="font-display mt-3 text-2xl font-light italic">
                      {supplier.name}
                    </p>
                  ) : null}
                </Reveal>
                <SplitText
                  text={supplier.title}
                  className="font-display mt-6 text-[clamp(2.2rem,4.2vw,4rem)] leading-[1.06] font-light"
                />
                <Reveal delay={0.15}>
                  <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
                    {supplier.body}
                  </p>
                </Reveal>

                {/* A circle between two blocks, each at its own pace. */}
                <div className="mt-14 grid grid-cols-3 items-center gap-4 sm:gap-6">
                  <Drift distance={26}>
                    <Unveil delay={0.05}>
                      <MediaImage
                        src={supplier.photos[0].src}
                        alt={supplier.photos[0].alt}
                        aspect="aspect-[3/4]"
                        sizes="(min-width: 1024px) 13vw, 30vw"
                      />
                    </Unveil>
                  </Drift>
                  <Drift distance={-22}>
                    <Unveil shape="circle" delay={0.12} className="rounded-full">
                      <MediaImage
                        src={supplier.photos[1].src}
                        alt={supplier.photos[1].alt}
                        aspect="aspect-square"
                        sizes="(min-width: 1024px) 13vw, 30vw"
                      />
                    </Unveil>
                  </Drift>
                  <Drift distance={34}>
                    <Unveil delay={0.19}>
                      <MediaImage
                        src={supplier.photos[2].src}
                        alt={supplier.photos[2].alt}
                        aspect="aspect-[3/4]"
                        sizes="(min-width: 1024px) 13vw, 30vw"
                      />
                    </Unveil>
                  </Drift>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <ReserveCta />
    </>
  );
}
