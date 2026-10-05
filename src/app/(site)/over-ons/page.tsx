import type { Metadata } from "next";
import { Cards } from "@/components/sections/Cards";
import { FormBand } from "@/components/sections/FormBand";
import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/PageHero";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Statement } from "@/components/sections/Statement";
import { shoot } from "@/lib/photos";
import { reserveHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "De mensen achter CRKL in Roeselare: chef Sam, gastvrouw Jolien en hun team.",
  alternates: { canonical: "/over-ons" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Over ons"
        title={"Sam &\n*Jolien*"}
        intro="Een creatieve, moderne visie op gastronomie — en een huis waar verfijning en beleving centraal staan."
        image={{ src: shoot.jan26(25), alt: "Jolien en Sam, gastvrouw en chef van CRKL" }}
      />

      <SplitMedia
        tone="tint"
        eyebrow="Het verhaal"
        title={"Strak van buiten,\n*zacht* van binnen"}
        body={[
          "Aan de Diksmuidsesteenweg staat een villa in beton. Binnen wacht het tegendeel: een licht interieur in pasteltinten, met gordijnen in twee tinten roze die de zaal in intieme hoeken verdelen.",
          "In een stijlvolle en rustige setting creëren we een totaalervaring waarbij smaak, service en sfeer samenkomen.",
        ]}
        photo={{ src: shoot.mei25(59), alt: "Chef Sam in de zaal van CRKL" }}
        video={{ src: "hero/crkl-hero-zaal.mp4", poster: "hero/crkl-hero-zaal.jpg" }}
      />

      <Gallery
        eyebrow="Keuken & team"
        title={"Echte mensen,\n*een echte keuken*"}
        photos={[
          { src: shoot.okt25(19), alt: "De chef aan de pass, in zwart-wit" },
          { src: shoot.mei25(3), alt: "De chef aan het werk in de keuken" },
          { src: shoot.okt25(27), alt: "Een gerecht wordt afgewerkt met saus" },
          { src: shoot.juli26(57), alt: "Achter de bar" },
        ]}
      />

      {/* Only the two hosts are named — see CONTENT_TODO.md. */}
      <Cards
        tone="tint"
        eyebrow="Het team"
        title={"Zaal\n*& keuken*"}
        cards={[
          {
            label: "Chef",
            title: "Sam",
            body: "Kookt een vast menu met dagverse, seizoensgebonden ingrediënten.",
            photo: { src: shoot.mei25(49), alt: "Chef Sam met een handvol aardbeien" },
          },
          {
            label: "Gastvrouw",
            title: "Jolien",
            body: "Ontvangt u in de zaal en waakt over de avond.",
            photo: { src: shoot.jolien(2), alt: "Gastvrouw Jolien bij het gordijn" },
          },
          {
            label: "Zaal & bar",
            title: "Het team",
            body: "De mensen die uw glas vullen, uw bord brengen en weten wat erop ligt.",
            photo: { src: shoot.juni25(8), alt: "Een teamlid met een fles wijn" },
          },
        ]}
      />

      <Statement
        eyebrow="Erkenning"
        text={"Ambassadeur Champagne Pompadour.\n*Lid van Gastro RSL.*"}
        links={[
          { href: "/champagne-pompadour", label: "Champagne Pompadour" },
          { href: "/gastro-rsl", label: "Gastro RSL" },
          { href: reserveHref("/over-ons"), label: "Reserveer een tafel" },
        ]}
      />

      <FormBand
        id="contact"
        eyebrow="Contact"
        title={"Praat\n*met ons*"}
        intro="Een vraag, een idee, een samenwerking? Schrijf ons."
        form={{ kind: "contact", submitLabel: "Stuur bericht" }}
      />
    </>
  );
}
