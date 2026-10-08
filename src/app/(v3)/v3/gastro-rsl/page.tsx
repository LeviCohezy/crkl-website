import type { Metadata } from "next";
import { Columns } from "@/components/v3/Columns";
import { ContactSection } from "@/components/v3/ContactSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink } from "@/components/v3/Links";
import { Statement } from "@/components/v3/Statement";
import { Visuals } from "@/components/v3/Visuals";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Lid van Gastro RSL",
  description:
    "CRKL is lid van Gastro RSL, het verband van gastronomische huizen in Roeselare — en kookt met wat telers en makers uit de streek aanreiken.",
  alternates: { canonical: "/v3/gastro-rsl" },
};

/** Copy on this page is a holding text — see CONTENT_TODO.md. */
export default function GastroRslPage() {
  return (
    <>
      <Hero
        title={"Lid van\n*Gastro RSL*"}
        lead="Gastro RSL brengt de gastronomische huizen van Roeselare samen. CRKL is er lid van."
        actions={<PinkLink href="/reserveren">Reserveer een tafel</PinkLink>}
        photo={{ src: shoot.leveranciers(106), alt: "De chef schudt de hand van de aardbeienteler, tussen de planten in de serre" }}
      />

      <Statement
        as="h2"
        text={"Een stad eet beter wanneer haar restaurants elkaar *kennen*. Als lid van Gastro RSL staan we mee voor wat Roeselare culinair te bieden heeft."}
      >
        <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          Dat begint dicht bij huis: bij de mensen die telen, kweken en rijpen wat bij ons op het bord komt.
        </p>
      </Statement>

      <Visuals
        title={"Dicht\n*bij huis*"}
        photos={[
          { src: shoot.leveranciers(160), alt: "De roze stoel tussen de bloemen in de serre" },
          { src: shoot.leveranciers(31), alt: "De roze stoel tussen de runderen" },
          { src: shoot.leveranciers(115), alt: "De chef plukt een aardbei in de serre" },
          { src: shoot.leveranciers(64), alt: "Kaasbollen op houten planken" },
          { src: shoot.leveranciers(193), alt: "Eetbare bloemen in de hand van de chef" },
          { src: shoot.leveranciers(103), alt: "Rijpe aardbeien aan de plant" },
        ]}
      />

      <Columns
        tone="blush"
        title={"Waar het\n*om draait*"}
        columns={[
          { heading: "Lokale producten", paragraphs: ["Kaas, aardbeien, kruiden en vlees van telers en makers uit de streek."] },
          { heading: "Initiatieven", paragraphs: ["Gezamenlijke acties die Roeselare als culinaire stad op de kaart zetten."] },
          { heading: "Collega's", paragraphs: ["Huizen die elkaar versterken in plaats van beconcurreren."] },
        ]}
      />

      <ContactSection />
    </>
  );
}
