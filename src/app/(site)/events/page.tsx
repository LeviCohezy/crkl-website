import type { Metadata } from "next";
import { Faq } from "@/components/sections/Faq";
import { FormBand } from "@/components/sections/FormBand";
import { PinBand } from "@/components/sections/PinBand";
import { PageHero } from "@/components/sections/PageHero";
import { Spotlight } from "@/components/sections/Reviews";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Tiles } from "@/components/sections/Tiles";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { spotlights } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Events bij CRKL in Roeselare: van zakelijke lunch tot communie, verjaardag, jubileum of babyborrel, in een stijlvolle en warme setting.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        variant="offset"
        eyebrow="Events"
        title={"Een moment\n*om te vieren*"}
        intro="CRKL is de ideale locatie in Roeselare voor wie een bijzonder moment wil vieren in een stijlvolle en warme setting."
        cta={{ href: "#aanvraag", label: "Plan uw event" }}
        image={{ src: shoot.juni26(5), alt: "De zaal, gedekt voor een gezelschap" }}
        photos={[{ src: shoot.juli26(75), alt: "Cocktails op de witte tafel" }]}
      />

      <Tiles
        variant="tall"
        eyebrow="Soorten events"
        title={"Voor elk gezelschap\n*een vorm*"}
        tiles={[
          {
            href: "/the-room",
            label: "The Room",
            line: "Privé, tot 20 gasten",
            photo: { src: shoot.okt25(1), alt: "De lange tafel in The Room" },
          },
          {
            href: "#aanvraag",
            label: "Bedrijfsevents",
            line: "Meeting, lunch of diner",
            photo: { src: shoot.juni26(3), alt: "Gedekte tafels in de zaal" },
          },
          {
            href: "/trouwen",
            label: "Trouwen in CRKL",
            line: "Intiem en op maat",
            photo: { src: shoot.juni26(11), alt: "Een boeket bij het gordijn" },
          },
        ]}
      />

      <SplitMedia
        variant="collage"
        tone="tint"
        eyebrow="Onze aanpak"
        title={"Een menu\n*voor uw gezelschap*"}
        body={[
          "Voor communies, verjaardagen, jubilea, babyborrels en kleinschalige huwelijksfeesten.",
          "Elk event begint met een gesprek. De chef stelt het menu samen op maat van uw gezelschap en de gelegenheid; wij zorgen voor de rest.",
        ]}
        photo={{ src: shoot.okt25(27), alt: "De chef werkt een gerecht af aan de pass" }}
        photos={[
          { src: shoot.okt25(49), alt: "Saus wordt aan tafel bij het gerecht geschonken" },
          { src: shoot.juli26(1), alt: "Gasten aan tafel in de zaal" },
        ]}
        flip
      />

      <PinBand
        eyebrow="Events in beeld"
        title={"De zaal,\n*klaar voor gasten*"}
        photos={[
          { src: shoot.juni26(8), alt: "Tafels onder het ronde wandpaneel" },
          { src: shoot.juli26(75), alt: "Cocktails op de witte tafel" },
          { src: shoot.juli26(18), alt: "Het terras onder de witte luifel" },
          { src: shoot.mei25(11), alt: "Een boeket in de zaal" },
        ]}
        captions={["De zaal", "Het aperitief", "Het terras", "Bloemen"]}
      />

      <Spotlight quote={spotlights.events} />

      <FormBand
        id="aanvraag"
        variant="split"
        photo={{ src: shoot.juni26(5), alt: "De zaal, gedekt voor een gezelschap" }}
        eyebrow="Aanvraag"
        title={"Vraag\n*uw event* aan"}
        intro="Datum, aantal gasten en de gelegenheid — meer hebben we niet nodig om te beginnen."
        form={{
          kind: "event",
          submitLabel: "Vraag uw event aan",
          note: "Vrijblijvend. We antwoorden zo snel mogelijk.",
        }}
      />

      <Faq items={faq.events} />
    </>
  );
}
