import type { Metadata } from "next";
import { Cards } from "@/components/sections/Cards";
import { Faq } from "@/components/sections/Faq";
import { FormBand } from "@/components/sections/FormBand";
import { Gallery } from "@/components/sections/Gallery";
import { PageHero } from "@/components/sections/PageHero";
import { Spotlight } from "@/components/sections/Reviews";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Steps } from "@/components/sections/Steps";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { spotlights } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Trouwen in CRKL",
  description:
    "Trouwen in CRKL, Roeselare: een kleinschalig huwelijksfeest in een stijlvolle en warme setting, met een menu op maat.",
  alternates: { canonical: "/trouwen" },
};

/** This page speaks to a couple, so it says "jullie" where the rest says "u". */
export default function WeddingPage() {
  return (
    <>
      <PageHero
        eyebrow="Trouwen in CRKL"
        title={"Jullie dag,\n*in het klein*"}
        intro="Een kleinschalig huwelijksfeest, met de mensen die ertoe doen, in een stijlvolle en warme setting."
        cta={{ href: "#aanvraag", label: "Plan jullie dag" }}
        image={{ src: shoot.juni26(11), alt: "Een boeket bij het gordijn in de zaal" }}
      />

      <SplitMedia
        tone="tint"
        eyebrow="Jullie dag bij CRKL"
        title={"Intiem,\n*en helemaal van jullie*"}
        body={[
          "CRKL is de ideale locatie in Roeselare voor wie een bijzonder moment wil vieren in een stijlvolle en warme setting.",
          "Geen feestzaal, maar een restaurant: een zaal in zachte tinten, een terras in het groen, en een keuken die voor jullie gezelschap kookt.",
        ]}
        photo={{ src: shoot.mei25(11), alt: "Een boeket in de zaal" }}
      />

      <Cards
        eyebrow="Wat kan"
        title={"De bouwstenen\n*van de dag*"}
        cards={[
          {
            title: "Ceremonie",
            body: "Een moment voor jullie twee en jullie gasten, voor de dag echt begint.",
          },
          {
            title: "Receptie",
            body: "Het glas heffen, binnen of op het terras, met hapjes uit de keuken.",
          },
          {
            title: "Diner",
            body: "Aan tafel, met een menu dat de chef samenstelt voor jullie gezelschap.",
          },
        ]}
      />

      <Gallery
        tone="tint"
        eyebrow="De sfeer in beeld"
        title={"Waar jullie\n*zullen zitten*"}
        photos={[
          { src: shoot.juli26(18), alt: "Het terras onder de witte luifel" },
          { src: shoot.juni26(8), alt: "Tafels onder het ronde wandpaneel" },
          { src: shoot.juli26(75), alt: "Cocktails op de witte tafel" },
          { src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht" },
        ]}
      />

      <Spotlight quote={spotlights.trouwen} />

      <Steps
        eyebrow="Zo verloopt jullie dag"
        title={"De dag\n*in vier momenten*"}
        steps={[
          { title: "Ceremonie", body: "Het ja-woord, met iedereen erbij." },
          { title: "Receptie", body: "Een glas, hapjes, tijd voor elkaar." },
          { title: "Diner & feest", body: "Aan tafel voor het menu van de chef." },
        ]}
        last={{
          title: "Jullie datum vastleggen",
          href: "#aanvraag",
          label: "Start hieronder",
        }}
      />

      <FormBand
        id="aanvraag"
        eyebrow="Aanvraag"
        title={"Vraag\n*jullie datum* aan"}
        intro="Begin met de datum en het aantal gasten. Daarna plannen we een gesprek."
        form={{
          kind: "trouwen",
          submitLabel: "Vraag jullie datum aan",
          steps: true,
          note: "Een vrijblijvend gesprek. We antwoorden zo snel mogelijk.",
        }}
      />

      <Faq items={faq.trouwen} />
    </>
  );
}
