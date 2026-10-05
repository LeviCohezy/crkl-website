import { MediaImage } from "@/components/media/MediaImage";
import { Drift, Parallax } from "@/components/motion/Parallax";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { RotatingBadge } from "@/components/motion/RotatingBadge";
import { PillLink } from "@/components/ui/Button";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

/**
 * The two people behind the house: a tall arch for the pair of them, a small
 * circle of the chef's hands, and a ring of type turning where they overlap.
 */
export function Hosts() {
  return (
    <section className="relative overflow-hidden bg-petal py-28 sm:py-40">
      <div className="mx-auto grid max-w-[100rem] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24">
        <div className="relative mx-auto w-full max-w-xl">
          <Unveil className="rounded-t-full">
            <Parallax className="aspect-[3/4] rounded-t-full" amount={6}>
              <MediaImage
                src={shoot.jan26(25)}
                alt="Jolien en Sam, gastvrouw en chef van CRKL"
                aspect="h-full"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </Parallax>
          </Unveil>

          <Drift distance={-55} className="absolute -right-3 -bottom-10 w-[42%] sm:-right-10">
            <Unveil shape="circle" delay={0.2} className="rounded-full">
              <MediaImage
                src={shoot.mei25(52)}
                alt="Verse aardbeien in de handen van de chef"
                aspect="aspect-square"
                className="rounded-full"
                sizes="(min-width: 1024px) 17vw, 42vw"
              />
            </Unveil>
          </Drift>

          <div className="absolute -top-10 -right-2 h-28 w-28 text-rosewood sm:-right-12 sm:h-36 sm:w-36">
            <RotatingBadge text={site.hosts} className="h-full w-full" />
          </div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow text-rosewood">Gastheer &amp; gastvrouw</p>
          </Reveal>
          <SplitText
            text={"Sam in de keuken,\n*Jolien* in de zaal"}
            className="font-display mt-6 text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.06] font-light"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
              Geniet van een culinaire lunch of diner, bereid met dagverse
              ingrediënten en een creatieve, moderne visie op gastronomie. Wat
              op het bord komt, begint bij mensen die we bij naam kennen.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-4">
            <PillLink href="/verhaal">Ons verhaal</PillLink>
            <PillLink href="/leveranciers">De leveranciers</PillLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
