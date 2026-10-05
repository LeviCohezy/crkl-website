import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Band, Head } from "@/components/sections/Band";
import { Cards } from "@/components/sections/Cards";
import { Faq } from "@/components/sections/Faq";
import { ReservationBand } from "@/components/sections/FormBand";
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
        eyebrow="Het menu"
        title={"Het menu van\n*dit seizoen*"}
        intro="Ontdek het tasting menu van CRKL, waar seizoensgebonden ingrediënten en verfijnde smaken centraal staan."
        cta={{ href: "#reserveer", label: "Reserveer" }}
        image={{ src: shoot.maart26(36), alt: "Vis met gekleurde toetsen op een wit bord" }}
      />

      {/* The captions describe the photographs — see CONTENT_TODO.md. */}
      <Cards
        tone="tint"
        eyebrow="Signature gerechten"
        title={"Waar de keuken\n*voor staat*"}
        cards={[
          {
            label: "Lente",
            title: "Asperge",
            body: "Met citroen, venkel en dille.",
            photo: { src: shoot.mei25(22), alt: "Witte asperge met citroen en dille" },
          },
          {
            label: "Van de grill",
            title: "Langoustine",
            body: "Aan tafel afgewerkt, onder de rook.",
            photo: { src: shoot.maart26(6), alt: "Langoustine op de grill, rook boven de tafel" },
          },
          {
            label: "Winter",
            title: "Rund",
            body: "Met schorseneer, kroket en jus.",
            photo: { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" },
          },
        ]}
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
        tone="tint"
        eyebrow="Wijn & champagne"
        title={"Bij elke gang\n*het juiste glas*"}
        body={[
          "Kies bij uw menu voor de wijnpairing tot en met het hoofdgerecht, of voor een aangepast non-alcoholisch sap.",
          "CRKL is ambassadeur van Champagne Pompadour — het aperitief begint er graag mee.",
        ]}
        link={{ href: "/champagne-pompadour", label: "Ambassadeur Champagne Pompadour" }}
        photo={{ src: shoot.juni25(6), alt: "De sommelier proeft een glas witte wijn" }}
      />

      <ReservationBand />
      <Faq items={faq.menu} />
    </>
  );
}
