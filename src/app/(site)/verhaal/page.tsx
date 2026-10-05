import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";
import { StoryChapters, type Chapter } from "@/components/sections/StoryChapters";
import { PillLink } from "@/components/ui/Button";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Verhaal",
  description:
    "Het verhaal van CRKL: Sam in de keuken, Jolien in de zaal, en een huis in Roeselare waar verfijning en beleving centraal staan.",
  alternates: { canonical: "/verhaal" },
};

const chapters: Chapter[] = [
  {
    label: "Het huis",
    title: "Strak van buiten, zacht van binnen",
    body: "Aan de Diksmuidsesteenweg staat een villa in beton. Binnen wacht het tegendeel: een licht, speels interieur van pasteltinten en cirkels, met gordijnen in twee tinten roze die de zaal in intieme hoeken verdelen.",
    photo: { src: shoot.dec25(1), alt: "Doorkijk naar een tafel tussen de gordijnen" },
  },
  {
    label: "De keuken",
    title: "Een moderne visie op gastronomie",
    body: "Sam kookt een vast menu met dagverse, seizoensgebonden ingrediënten. Belgische producten vormen de basis; invloeden uit Azië en de Middellandse Zee geven er richting aan.",
    photo: { src: shoot.okt25(27), alt: "De chef nappeert een gerecht aan de pass" },
  },
  {
    label: "De zaal",
    title: "Smaak, service en sfeer",
    body: "In een stijlvolle en rustige setting creëren we een totaalervaring waarbij smaak, service en sfeer samenkomen. Jolien en haar team ontvangen u zoals ze zelf ontvangen willen worden.",
    photo: { src: shoot.jolien(2), alt: "Gastvrouw Jolien bij het gordijn in de zaal" },
  },
  {
    label: "Het glas",
    title: "Van dichtbij, waar het kan",
    body: "Bij het menu hoort een wijnpairing, met een voorliefde voor wat in eigen land groeit. Aan de bar beginnen we graag met een aperitief van het huis.",
    photo: { src: shoot.juni25(6), alt: "De sommelier proeft een glas witte wijn" },
  },
  {
    label: "Het terras",
    title: "Buiten, in het groen",
    body: "Bij mooi weer schuift u aan op het terras, onder de witte luifel en tussen de bomen. Dezelfde keuken, een andere middag.",
    photo: { src: shoot.juli26(18), alt: "Het terras onder de witte luifel" },
  },
];

/** Names are confirmed for the two hosts only — see CONTENT_TODO.md. */
const team = [
  { src: shoot.mei25(49), alt: "Chef Sam met een handvol aardbeien", name: "Sam", role: "Chef" },
  { src: shoot.jolien(1), alt: "Gastvrouw Jolien in de tuin", name: "Jolien", role: "Gastvrouw" },
  { src: shoot.juni25(8), alt: "Teamlid met een fles wijn", name: "", role: "Wijn" },
  { src: shoot.juli26(72), alt: "Teamlid achter de bar met een cocktail", name: "", role: "Bar" },
  { src: shoot.juli26(26), alt: "Teamlid in de zaal", name: "", role: "Zaal" },
  { src: shoot.juli26(43), alt: "Teamlid in de zaal", name: "", role: "Zaal" },
];

const guides = ["Michelin Guide", "Gault&Millau", "Michelin Guide", "Gault&Millau"];

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Ons verhaal"
        title={"Sam &\n*Jolien*"}
        intro="CRKL is een gastronomisch restaurant in Roeselare waar verfijning en beleving centraal staan."
        image={{
          src: shoot.jan26(25),
          alt: "Jolien en Sam, gastvrouw en chef van CRKL",
        }}
        shape="arch"
        badge="Roeselare"
      />

      <StoryChapters chapters={chapters} />

      {/* ── Het team ─────────────────────────────────────────────────── */}
      <section className="bg-petal py-28 sm:py-40">
        <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
          <Reveal>
            <p className="eyebrow text-rosewood">Het team</p>
          </Reveal>
          <SplitText
            text={"De mensen\n*achter de tafel*"}
            className="font-display mt-6 text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.04] font-light"
          />

          <ul className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
            {team.map((member, index) => (
              <li key={member.src} className={index % 2 ? "lg:mt-14" : ""}>
                <Unveil shape="circle" delay={index * 0.06} className="rounded-full">
                  <MediaImage
                    src={member.src}
                    alt={member.alt}
                    aspect="aspect-square"
                    sizes="(min-width: 1024px) 15vw, 46vw"
                    imageClassName="object-[50%_22%] transition-transform duration-[1400ms] ease-expo hover:scale-110"
                  />
                </Unveil>
                <p className="font-display mt-5 text-center text-2xl font-light">
                  {member.name || " "}
                </p>
                <p className="eyebrow mt-1 text-center text-stone">{member.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Erkenning ────────────────────────────────────────────────── */}
      <section className="bg-mist py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="eyebrow text-rosewood">Erkenning</p>
            <p className="font-display mt-6 text-3xl leading-snug font-light sm:text-4xl">
              CRKL wordt erkend door toonaangevende culinaire gidsen en media.
            </p>
          </Reveal>
        </div>
        <Marquee className="mt-14 border-y border-ink/15 py-6">
          {guides.map((guide, index) => (
            <span key={index} className="flex items-center">
              <span className="font-display px-10 text-4xl font-light italic sm:text-6xl">
                {guide}
              </span>
              <span aria-hidden className="h-3 w-3 rounded-full bg-blush" />
            </span>
          ))}
        </Marquee>
        <Reveal className="mt-12 flex flex-wrap justify-center gap-4 px-6">
          <PillLink href={site.links.michelin}>Michelin Guide</PillLink>
          <PillLink href={site.links.gaultMillau}>Gault&amp;Millau</PillLink>
          <PillLink href="/leveranciers">Onze leveranciers</PillLink>
        </Reveal>
      </section>

      <ReserveCta />
    </>
  );
}
