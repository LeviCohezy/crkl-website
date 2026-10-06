import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Band, Head } from "@/components/sections/Band";
import { Faq } from "@/components/sections/Faq";
import { ReservationBand } from "@/components/sections/FormBand";
import { Gallery } from "@/components/sections/Gallery";
import { MenuTabs } from "@/components/sections/MenuTabs";
import { PageHero } from "@/components/sections/PageHero";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Het seizoensmenu van CRKL in Roeselare: lunchformule, Menu Carré+ en Menu CRKL+, met wijnpairing. Prijzen inbegrepen.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        variant="centered"
        eyebrow="Het menu"
        title={"Het menu van\n*dit seizoen*"}
        intro="Ontdek het tasting menu van CRKL, waar seizoensgebonden ingrediënten en verfijnde smaken centraal staan."
        cta={{ href: "#reserveer", label: "Reserveer" }}
        image={{ src: shoot.maart26(36), alt: "Vis met gekleurde toetsen op een wit bord" }}
      />

      {/* The captions describe the photographs — see CONTENT_TODO.md. */}
      <Gallery
        variant="stagger"
        tone="tint"
        eyebrow="Signature gerechten"
        title={"Waar de keuken\nvoor staat"}
        intro="Drie borden die terugkomen, in een andere jas per seizoen."
        photos={[
          { src: shoot.mei25(22), alt: "Witte asperge met citroen en dille" },
          { src: shoot.maart26(6), alt: "Langoustine op de grill, rook boven de tafel" },
          { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" },
        ]}
        captions={["Asperge · citroen · dille", "Langoustine · van de grill", "Rund · schorseneer · jus"]}
      />

      <Band tone="white" id="kaart">
        <Head
          eyebrow="Het menu"
          title={"Lunch, diner\n& *dranken*"}
          intro="Het menu ligt vast, de gerechten niet: ze volgen wat het seizoen aanreikt."
        />
        <Reveal delay={0.1} className="mt-16">
          <MenuTabs />
        </Reveal>
      </Band>

      <SplitMedia
        variant="inset"
        tone="white"
        eyebrow="Wijn & champagne"
        title={"Bij elke gang\n*het juiste glas*"}
        body={[
          "Kies bij uw menu voor de wijnpairing tot en met het hoofdgerecht, of voor een aangepast non-alcoholisch sap.",
          "CRKL is ambassadeur van Champagne Pompadour — het aperitief begint er graag mee.",
        ]}
        link={{ href: "/champagne-pompadour", label: "Ambassadeur Champagne Pompadour" }}
        photo={{ src: shoot.juni25(6), alt: "De sommelier proeft een glas witte wijn" }}
        photos={[{ src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht" }]}
      />

      <ReservationBand variant="split" photo={{ src: shoot.juli26(54), alt: "Ronde tafel op het okeren tapijt" }} />
      <Faq items={faq.menu} />
    </>
  );
}
