import type { Metadata } from "next";
import { Faq } from "@/components/v3/Faq";
import { ContactSection } from "@/components/v3/ContactSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { MenuList } from "@/components/v3/MenuList";
import { Strip } from "@/components/v3/Strip";
import { VideoBand } from "@/components/v3/VideoBand";
import { Visuals } from "@/components/v3/Visuals";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Diner — Menu CRKL+ in vijf gangen",
  description:
    "Diner bij CRKL in Roeselare, van woensdag tot zaterdag: Menu CRKL+, het tasting menu van het huis in vijf gangen, met het signature gerecht van de chef en een wijnpairing.",
  alternates: { canonical: "/v3/diner" },
};

export default function DinerPage() {
  return (
    <>
      <Hero
        title={"Diner\n*bij CRKL*"}
        lead={`${site.hours.dinner.days}, vanaf ${site.hours.dinner.slots[0]}: een avond rond Menu CRKL+, het tasting menu van het huis in vijf gangen, in een stijlvolle en rustige setting.`}
        actions={
          <>
            <PinkLink href="/reserveren">Reserveer diner</PinkLink>
            <TextLink href="#menu">Het menu</TextLink>
          </>
        }
        photo={{ src: shoot.dec25(10), alt: "Doorkijk naar een tafel tussen de gordijnen" }}
        caption="Tussen de gordijnen"
      />

      <VideoBand
        text={"Een moderne visie\n*op gastronomie*"}
        video="clips/crkl-dresseren.mp4"
        poster="hero/crkl-dresseren.jpg"
        caption="Dresseren, tijdens de service"
      />

      <MenuList
        id="menu"
        tabs={["diner"]}
        title={"Menu CRKL+,\n*vijf gangen*"}
        intro="Seizoensgebonden ingrediënten en verfijnde smaken, met het signature gerecht van de chef als extra gang. Kaas als bord erbij, of in plaats van het dessert."
        aside={<TextLink href="/menu">Het volledige menu</TextLink>}
      />

      <Strip
        tone="blush"
        title={"Het glas\n*hoort erbij*"}
        items={[
          {
            kind: "text",
            title: "Wijnpairing",
            body: "Bij Menu CRKL+ schenken we een wijnpairing tot en met het hoofdgerecht. Wie liever niet drinkt, kiest het aangepast non-alcoholisch sap. Het aperitief begint graag met Champagne Pompadour, waarvan CRKL ambassadeur is.",
            link: { href: "/champagne-pompadour", label: "Onze champagne" },
          },
          { kind: "video", src: "clips/crkl-wijn.mp4", poster: "hero/crkl-wijn.jpg", caption: "Uitschenken" },
          { kind: "photo", photo: { src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht" }, size: "l", hang: "top", caption: "Aan tafel" },
          { kind: "photo", photo: { src: shoot.maart26(5), alt: "Schuimwijn wordt uitgeschonken" }, size: "s", hang: "bottom", caption: "Het aperitief" },
          { kind: "photo", photo: { src: shoot.juni25(6), alt: "De sommelier proeft een glas witte wijn" }, size: "m", caption: "Proeven" },
        ]}
      />

      <Visuals
        title={"Het diner,\n*in beeld*"}
        photos={[
          { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" },
          { src: shoot.dec25(13), alt: "Wintergerecht in een bord met reliëf" },
          { src: shoot.maart26(53), alt: "Vlees met gekleurde groenten" },
          { src: shoot.okt25(13), alt: "Dessert in de vorm van een rode appel" },
          { src: shoot.maart26(47), alt: "Vis in een schuimige saus" },
          { src: shoot.jan26(6), alt: "Hoofdgerecht met een glas rode wijn" },
        ]}
      />

      <ContactSection />

      <Faq items={faq.diner} />
    </>
  );
}
