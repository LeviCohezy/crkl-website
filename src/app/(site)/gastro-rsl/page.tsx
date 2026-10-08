import type { Metadata } from "next";
import { Cards } from "@/components/sections/Cards";
import { ReservationBand } from "@/components/sections/FormBand";
import { PageHero } from "@/components/sections/PageHero";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Lid van Gastro RSL",
  description:
    "CRKL is lid van Gastro RSL, het verband van gastronomische huizen in Roeselare.",
  alternates: { canonical: "/gastro-rsl" },
};

/** Copy on this page is a holding text — see CONTENT_TODO.md. */
export default function GastroRslPage() {
  return (
    <>
      <PageHero
        variant="cascade"
        eyebrow="Erkenning"
        title={"Lid van\n*Gastro RSL*"}
        intro="Gastro RSL brengt de gastronomische huizen van Roeselare samen. CRKL is er lid van."
        image={{ src: shoot.leveranciers(229), alt: "De chef met een krat verse kruiden" }}
        photos={[
          { src: shoot.leveranciers(160), alt: "De roze stoel tussen de bloemen in de serre" },
          { src: shoot.leveranciers(31), alt: "De roze stoel tussen de runderen" },
        ]}
      />

      <SplitMedia
        variant="simple"
        tone="tint"
        eyebrow="Waarom lid"
        title={"Samen voor\n*Roeselare aan tafel*"}
        body={[
          "Een stad eet beter wanneer haar restaurants elkaar kennen. Als lid van Gastro RSL staan we mee voor wat Roeselare culinair te bieden heeft.",
          "Dat begint dicht bij huis: bij de mensen die telen, kweken en rijpen wat bij ons op het bord komt.",
        ]}
        photo={{ src: shoot.leveranciers(115), alt: "De chef plukt een aardbei in de serre" }}
        flip
      />

      <Cards
        variant="photos"
        eyebrow="Samen sterk"
        title={"Waar het\n*om draait*"}
        cards={[
          {
            title: "Lokale producten",
            body: "Kaas, aardbeien, kruiden en vlees van telers en makers uit de streek.",
            photo: { src: shoot.leveranciers(64), alt: "Kaasbollen op houten planken" },
          },
          {
            title: "Initiatieven",
            body: "Gezamenlijke acties die Roeselare als culinaire stad op de kaart zetten.",
            photo: { src: shoot.leveranciers(193), alt: "Eetbare bloemen in de hand van de chef" },
          },
          {
            title: "Collega's",
            body: "Huizen die elkaar versterken in plaats van beconcurreren.",
            photo: { src: shoot.leveranciers(103), alt: "Rijpe aardbeien aan de plant" },
          },
        ]}
      />

      <ReservationBand variant="card" photo={{ src: shoot.leveranciers(91), alt: "" }} />
    </>
  );
}
