import type { Metadata } from "next";
import { Faq } from "@/components/v3/Faq";
import { ContactSection } from "@/components/v3/ContactSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { MenuList } from "@/components/v3/MenuList";
import { Statement } from "@/components/v3/Statement";
import { Strip } from "@/components/v3/Strip";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Menu — lunchformule, Menu Carré+ en Menu CRKL+",
  description:
    "Het seizoensmenu van CRKL in Roeselare: de lunchformule en Menu Carré+ 's middags, Menu CRKL+ in vijf gangen 's avonds, met wijnpairing of een aangepast non-alcoholisch sap. Prijzen inbegrepen.",
  alternates: { canonical: "/v3/menu" },
};

export default function MenuPage() {
  return (
    <>
      <Hero
        size="big"
        title={"Het menu van\n*dit seizoen*"}
        lead="Een vast menu dat verandert met het seizoen: de lunchformule en Menu Carré+ 's middags, Menu CRKL+ 's avonds, met wijnpairing of een aangepast non-alcoholisch sap."
        actions={
          <>
            <PinkLink href="/reserveren">Reserveer</PinkLink>
            <TextLink href="#lunch">Naar het menu</TextLink>
          </>
        }
        photo={{ src: shoot.juni26(23), alt: "Vis in een oranje saus met kruiden, op een wit bord" }}
      />

      <Statement
        as="h2"
        text={"Het menu ligt vast, de gerechten niet: ze volgen wat het *seizoen* aanreikt."}
      />

      <MenuList
        id="lunch"
        tabs={["lunch"]}
        title={"'s Middags:\n*twee formules*"}
        intro="Kort en verfijnd met de lunchformule, of de tijd nemen voor de vier gangen van Menu Carré+."
        aside={<TextLink href="/lunch">Alles over de lunch</TextLink>}
      />

      {/* The captions describe the photographs — see CONTENT_TODO.md. */}
      <Strip
        title={"Waar de keuken\n*voor staat*"}
        intro="Borden die terugkomen, in een andere jas per seizoen."
        items={[
          { kind: "photo", photo: { src: shoot.mei25(22), alt: "Witte asperge met citroen en dille" }, size: "m", caption: "Asperge · citroen · dille" },
          { kind: "photo", photo: { src: shoot.maart26(6), alt: "Langoustine op de grill, rook boven de tafel" }, size: "l", hang: "top", caption: "Langoustine · van de grill" },
          { kind: "photo", photo: { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" }, size: "m", hang: "bottom", caption: "Rund · schorseneer · jus" },
          { kind: "photo", photo: { src: shoot.okt25(13), alt: "Dessert in de vorm van een rode appel" }, size: "s", caption: "Dessert" },
          { kind: "photo", photo: { src: shoot.juni26(30), alt: "Vis met grijze garnalen tussen de varens" }, size: "l", hang: "top", caption: "Vis · grijze garnalen" },
        ]}
      />

      <MenuList
        id="diner"
        tabs={["diner", "dranken"]}
        title={"'s Avonds:\n*Menu CRKL+*"}
        intro="Het tasting menu van het huis, in vijf gangen — met het signature gerecht van de chef als extra gang."
        aside={<TextLink href="/diner">Alles over het diner</TextLink>}
      />

      <Statement
        as="h2"
        size="h2"
        tone="blush"
        text={"Bij elke gang het juiste glas: een wijnpairing tot en met het hoofdgerecht, of een aangepast non-alcoholisch sap. Het aperitief begint graag met *Champagne Pompadour*, waarvan CRKL ambassadeur is."}
      >
        <TextLink href="/champagne-pompadour" tone="blush">
          Ambassadeur Champagne Pompadour
        </TextLink>
      </Statement>

      <ContactSection />

      <Faq items={faq.menu} />
    </>
  );
}
