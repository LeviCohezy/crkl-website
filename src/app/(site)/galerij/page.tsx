import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";
import { PillLink } from "@/components/ui/Button";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galerij & pers",
  description:
    "Beelden van CRKL in Roeselare: de gerechten, de zaal, het team en de leveranciers. Met persinformatie.",
  alternates: { canonical: "/galerij" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerij & pers"
        title={"In\n*beeld*"}
        intro="De gerechten, de zaal, de mensen en het veld — seizoen na seizoen vastgelegd door HABLAR."
        image={{
          src: shoot.maart26(50),
          alt: "Vier borden van bovenaf op de houten vloer",
        }}
        badge="Fotografie · HABLAR"
      />

      <GalleryGrid />

      {/* ── Pers ─────────────────────────────────────────────────────── */}
      <section id="pers" className="bg-petal py-28 sm:py-36">
        <div className="mx-auto grid max-w-[100rem] gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <p className="eyebrow text-rosewood">Pers</p>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.06] font-light">
              Schrijft u over <em>CRKL</em>?
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
              CRKL wordt erkend door toonaangevende culinaire gidsen en media.
              Voor beeldmateriaal in hoge resolutie, interviews of een
              persbezoek neemt u rechtstreeks contact op.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap gap-4 lg:justify-end">
            <PillLink href={`mailto:${site.contact.email}?subject=Persaanvraag`}>
              Persaanvraag
            </PillLink>
            <PillLink href={site.links.michelin}>Michelin Guide</PillLink>
            <PillLink href={site.links.gaultMillau}>Gault&amp;Millau</PillLink>
          </Reveal>
        </div>
      </section>

      <ReserveCta />
    </>
  );
}
