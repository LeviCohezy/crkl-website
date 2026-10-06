import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";
import { ReservationBand } from "@/components/sections/FormBand";
import { Gallery } from "@/components/sections/Gallery";
import { MenuExcerpt } from "@/components/sections/MenuExcerpt";
import { PageHero } from "@/components/sections/PageHero";
import { Reviews } from "@/components/sections/Reviews";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lunch",
  description:
    "Lunch bij CRKL in Roeselare, van woensdag tot vrijdag: een verfijnde middag met dagverse, seizoensgebonden ingrediënten.",
  alternates: { canonical: "/lunch" },
};

export default function LunchPage() {
  return (
    <>
      <PageHero
        variant="straddle"
        eyebrow="Lunch"
        title={"Lunch bij CRKL,\n*tussen de middag*"}
        intro="Van woensdag tot vrijdagmiddag geniet u bij CRKL van een verfijnde lunch, bereid met dagverse en seizoensgebonden ingrediënten."
        chips={[site.hours.lunch.days, site.hours.lunch.hours]}
        cta={{ href: "#reserveer", label: "Reserveer lunch" }}
        image={{ src: shoot.juni26(9), alt: "De zaal in het daglicht, met het ronde wandpaneel", focus: "50% 55%" }}
      />

      <Reviews reviews={reviews.lunch} tone="tint" title={"Een middag\n*om te onthouden*"} />

      <SplitMedia
        variant="collage"
        tone="white"
        eyebrow="De formule"
        title={"Een middag\n*aan tafel*"}
        body={[
          "Onze lunch combineert kwaliteit, finesse en een vlotte service — ideaal voor een ontspannen middag of een zakelijke afspraak in Roeselare en West-Vlaanderen.",
          "Kies voor de lunchformule met voorgerecht en hoofdgerecht, voeg een dessert toe, of neem de tijd voor de vier gangen van Menu Carré+.",
        ]}
        photo={{ src: shoot.juni25(4), alt: "Een gedekte tafel bij het raam, in het daglicht" }}
        video={{ src: "hero/crkl-hero-tafel.mp4", poster: "hero/crkl-hero-tafel.jpg" }}
        photos={[
          { src: shoot.mei25(16), alt: "Asperge met citroen op een bed van venkel" },
          { src: shoot.mei25(31), alt: "Kleurrijk voorgerecht in het zonlicht" },
        ]}
      />

      <MenuExcerpt tab="lunch" tone="tint" eyebrow="Lunchmenu" title={"Wat er 's middags\n*op tafel komt*"} variant="columns" />

      <Gallery
        variant="strip"
        eyebrow="Gerechten"
        title={"De lunch,\n*in beeld*"}
        photos={[
          { src: shoot.mei25(22), alt: "Witte asperge met citroen en dille" },
          { src: shoot.mei25(47), alt: "Tartaar met bloemen en kruiden" },
          { src: shoot.mei25(35), alt: "Kleurrijk voorgerecht op een wit bord" },
          { src: shoot.juni26(20), alt: "Vis in een oranje saus" },
        ]}
        captions={["Asperge", "Tartaar", "Voorgerecht", "Vis"]}
      />

      <ReservationBand title={"Reserveer\n*uw lunch*"} submitLabel="Reserveer lunch" service="lunch" variant="plain" />
      <Faq items={faq.lunch} />
    </>
  );
}
