import type { Metadata } from "next";
import { Cards } from "@/components/sections/Cards";
import { Faq } from "@/components/sections/Faq";
import { FormBand } from "@/components/sections/FormBand";
import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/PageHero";
import { Spotlight } from "@/components/sections/Reviews";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { spotlights } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "The Room",
  description:
    "The Room: de exclusieve ruimte van CRKL in Roeselare voor privédiners, meetings en events, tot 20 personen.",
  alternates: { canonical: "/the-room" },
};

export default function TheRoomPage() {
  return (
    <>
      <PageHero
        eyebrow="Privé dineren"
        title={"The\n*Room*"}
        intro="Voor privédiners, meetings en events kan u terecht in onze exclusieve ruimte."
        chips={["Tot 20 gasten", "Privé", "Audiovisueel materiaal"]}
        cta={{ href: "#aanvraag", label: "Vraag beschikbaarheid" }}
        image={{ src: shoot.okt25(1), alt: "De lange tafel in The Room" }}
      />

      <SplitMedia
        tone="tint"
        eyebrow="De ruimte"
        title={"Een tafel\n*voor uzelf*"}
        body={[
          "Bent u op zoek naar een restaurant voor groepen in Roeselare of een stijlvolle locatie voor een meeting, lunch of diner?",
          "De ruimte biedt plaats aan tot 20 personen en is uitgerust met audiovisueel materiaal. De keuken en de bediening zijn dezelfde als in de zaal.",
        ]}
        photo={{ src: shoot.okt25(4), alt: "Een gedekte plaats aan de lange tafel" }}
      />

      <Cards
        eyebrow="Opstellingen"
        title={"Drie manieren\n*om samen te zitten*"}
        cards={[
          {
            title: "Zittend diner",
            body: "Eén lange tafel, het menu van het huis, de avond voor uw gezelschap alleen.",
          },
          {
            title: "Walking dinner",
            body: "Kleinere gerechten die rondgaan, voor wie liever van groepje wisselt.",
          },
          {
            title: "Meeting met lunch",
            body: "Vergaderen met scherm en geluid, en daarna aan tafel zonder van ruimte te veranderen.",
          },
        ]}
      />

      <Gallery
        tone="tint"
        eyebrow="De ruimte in beeld"
        title={"Zo ziet\n*het eruit*"}
        photos={[
          { src: shoot.okt25(1), alt: "De lange tafel in The Room, met scherm" },
          { src: shoot.okt25(2), alt: "Glazen, servetten en bestek op de gedekte tafel" },
          { src: shoot.okt25(5), alt: "Een wijnglas aan het raam" },
          { src: shoot.okt25(7), alt: "Tafels bij het raam, met zicht op de tuin" },
        ]}
      />

      <Spotlight quote={spotlights["the-room"]} />

      <FormBand
        id="aanvraag"
        eyebrow="Aanvraag"
        title={"Vraag\n*The Room* aan"}
        intro="Begin met de datum en het aantal gasten. De rest bespreken we samen."
        form={{
          kind: "the-room",
          submitLabel: "Vraag The Room aan",
          steps: true,
          note: "Vrijblijvend. We antwoorden zo snel mogelijk.",
        }}
      />

      <Faq items={faq["the-room"]} />
    </>
  );
}
