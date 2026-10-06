import type { Metadata } from "next";
import { VideoStatement } from "@/components/home/VideoStatement";
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
  title: "Diner",
  description:
    "Diner bij CRKL in Roeselare, van woensdag tot zaterdag: het tasting menu in vijf gangen, met wijnpairing.",
  alternates: { canonical: "/diner" },
};

export default function DinerPage() {
  return (
    <>
      <PageHero
        variant="giant"
        eyebrow="Diner"
        title={"Diner\n*bij CRKL*"}
        intro="Een avond rond het tasting menu van het huis: vijf gangen, in een stijlvolle en rustige setting."
        chips={[site.hours.dinner.days, site.hours.dinner.hours]}
        cta={{ href: "#reserveer", label: "Reserveer diner" }}
        image={{ src: shoot.dec25(1), alt: "Doorkijk naar een tafel tussen de gordijnen" }}
      />

      <VideoStatement
        lines={["Moderne visie", "op gastronomie"]}
        video="clips/crkl-dresseren.mp4"
        poster="hero/crkl-dresseren.jpg"
      />

      <MenuExcerpt
        tab="diner"
        eyebrow="Dinermenu"
        title={"Vijf gangen,\n*één avond*"}
        variant="framed"
        photo={{ src: shoot.jan26(6), alt: "Hoofdgerecht met een glas rode wijn" }}
      />

      <SplitMedia
        variant="stack"
        tone="tint"
        eyebrow="Wijnbegeleiding"
        title={"Het glas\n*hoort erbij*"}
        body={[
          "Bij Menu CRKL+ schenken we een wijnpairing tot en met het hoofdgerecht. Wie liever niet drinkt, kiest het aangepast non-alcoholisch sap.",
        ]}
        link={{ href: "/champagne-pompadour", label: "Onze champagne" }}
        photo={{ src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht" }}
        video={{ src: "clips/crkl-wijn.mp4", poster: "hero/crkl-wijn.jpg" }}
        photos={[{ src: shoot.maart26(5), alt: "Schuimwijn wordt uitgeschonken" }]}
        flip
      />

      <Gallery
        variant="stagger"
        eyebrow="Gerechten"
        title={"Het diner,\n*in beeld*"}
        photos={[
          { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" },
          { src: shoot.dec25(13), alt: "Wintergerecht in een bord met reliëf" },
          { src: shoot.maart26(53), alt: "Vlees met gekleurde groenten" },
          { src: shoot.okt25(13), alt: "Dessert in de vorm van een rode appel" },
        ]}
      />

      <Reviews reviews={reviews.diner} tone="tint" title={"Een avond\n*om te onthouden*"} />

      <ReservationBand title={"Reserveer\n*uw diner*"} submitLabel="Reserveer diner" service="diner" variant="split" photo={{ src: shoot.okt25(16), alt: "Een tafel bij het gordijn, 's avonds" }} />
      <Faq items={faq.diner} />
    </>
  );
}
