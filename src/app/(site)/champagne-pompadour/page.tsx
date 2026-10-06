import type { Metadata } from "next";
import { ReservationBand } from "@/components/sections/FormBand";
import { PageHero } from "@/components/sections/PageHero";
import { Spotlight } from "@/components/sections/Reviews";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { shoot } from "@/lib/photos";
import { spotlights } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Ambassadeur van Champagne Pompadour",
  description:
    "CRKL in Roeselare is ambassadeur van Champagne Pompadour. Ontdek wat dat betekent aan tafel.",
  alternates: { canonical: "/champagne-pompadour" },
};

/** Copy on this page is a holding text — see CONTENT_TODO.md. */
export default function PompadourPage() {
  return (
    <>
      <PageHero
        variant="offset"
        eyebrow="Erkenning"
        title={"Ambassadeur van\n*Champagne Pompadour*"}
        intro="CRKL is een van de huizen die Champagne Pompadour vertegenwoordigen: de champagne staat bij ons op de kaart en hoort bij het aperitief."
        image={{ src: shoot.juli26(67), alt: "Glazen en een servet op de gedekte tafel", focus: "50% 40%" }}
        photos={[{ src: shoot.juni25(35), alt: "Een coupe in het zonlicht" }]}
      />

      <SplitMedia
        variant="stack"
        tone="tint"
        eyebrow="Het verhaal"
        title={"Pompadour\n*× CRKL*"}
        body={[
          "Maison Pompadour is een champagnehuis uit Reims. Als ambassadeur schenken wij hun champagne zoals ze bedoeld is: gekoeld, in het juiste glas, bij een keuken die erbij past.",
          "Voor u betekent dat een aperitief om naar uit te kijken — en, wie wil, champagne als rode draad door het menu.",
        ]}
        photo={{ src: shoot.juni25(6), alt: "De sommelier proeft een glas" }}
        photos={[{ src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht" }]}
        flip
      />

      <Spotlight quote={spotlights.pompadour} />

      <ReservationBand title={"Proef\n*het zelf*"} submitLabel="Reserveer en proef" variant="plain" />
    </>
  );
}
