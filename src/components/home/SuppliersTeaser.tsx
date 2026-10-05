import { MediaImage } from "@/components/media/MediaImage";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { PillLink } from "@/components/ui/Button";
import { suppliers } from "@/lib/suppliers";

const produce = [
  "Asperge",
  "Aardbei",
  "Langoustine",
  "Morille",
  "Grijze garnaal",
  "Rund",
  "Kaas",
  "Eetbare bloemen",
  "Knolselder",
  "Citroen",
];

/**
 * A line of produce running across the page, and under it the pink chair
 * from the dining room, photographed at each supplier.
 */
export function SuppliersTeaser() {
  return (
    <section className="bg-mist pb-28 sm:pb-40">
      <Marquee className="border-y border-ink/15 py-6">
        {produce.map((item) => (
          <span key={item} className="flex items-center">
            <span className="font-display px-8 text-4xl font-light italic sm:text-6xl">
              {item}
            </span>
            <span aria-hidden className="h-3 w-3 rounded-full bg-blush" />
          </span>
        ))}
      </Marquee>

      <div className="mx-auto max-w-[100rem] px-6 pt-24 sm:px-10 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <p className="eyebrow text-rosewood">Leveranciers</p>
            </Reveal>
            <SplitText
              text={"Onze stoel\n*op bezoek*"}
              className="font-display mt-6 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.04] font-light"
            />
          </div>
          <Reveal className="max-w-sm">
            <p className="leading-relaxed text-ink-soft">
              We namen een stoel uit de zaal mee naar de wei, de serre en de
              rijpingskelder — naar de mensen bij wie ons menu begint.
            </p>
            <div className="mt-8">
              <PillLink href="/leveranciers">Ontmoet hen</PillLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {suppliers.map((supplier, index) => (
            <figure key={supplier.id} className={index % 2 ? "lg:mt-16" : ""}>
              <Unveil
                delay={index * 0.08}
                className={index % 2 ? "rounded-full" : "rounded-t-full"}
              >
                <MediaImage
                  src={supplier.chair.src}
                  alt={supplier.chair.alt}
                  aspect={index % 2 ? "aspect-square" : "aspect-[3/4]"}
                  sizes="(min-width: 1024px) 23vw, 46vw"
                />
              </Unveil>
              <figcaption className="mt-5">
                <p className="eyebrow text-stone">{supplier.trade}</p>
                {supplier.name ? (
                  <p className="font-display mt-2 text-xl font-light">
                    {supplier.name}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
