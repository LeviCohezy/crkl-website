import type { Metadata } from "next";
import { ContactSection } from "@/components/v3/ContactSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink } from "@/components/v3/Links";
import { Statement } from "@/components/v3/Statement";
import { Strip } from "@/components/v3/Strip";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Ambassadeur van Champagne Pompadour",
  description:
    "CRKL in Roeselare is ambassadeur van Champagne Pompadour, het champagnehuis uit Reims. Ontdek wat dat betekent aan tafel.",
  alternates: { canonical: "/v3/champagne-pompadour" },
};

/** Copy on this page is a holding text — see CONTENT_TODO.md. */
export default function PompadourPage() {
  return (
    <>
      <Hero
        size="big"
        title={"Ambassadeur van\n*Champagne Pompadour*"}
        lead="CRKL is een van de huizen die Champagne Pompadour vertegenwoordigen: de champagne staat bij ons op de kaart en hoort bij het aperitief."
        actions={<PinkLink href="/reserveren">Reserveer en proef</PinkLink>}
        photo={{ src: shoot.juli26(67), alt: "Glazen en een servet op de gedekte tafel", focus: "50% 40%" }}
      />

      <Statement
        as="h2"
        text={"Maison Pompadour is een champagnehuis uit *Reims*. Als ambassadeur schenken wij hun champagne zoals ze bedoeld is: gekoeld, in het juiste glas, bij een keuken die erbij past."}
      />

      <Strip
        tone="blush"
        items={[
          {
            kind: "text",
            title: "Als rode draad",
            body: "Een aperitief om naar uit te kijken — en, wie wil, champagne als rode draad door het menu, gang na gang.",
          },
          { kind: "photo", photo: { src: shoot.juni25(35), alt: "Een coupe in het zonlicht" }, size: "m", hang: "top", caption: "Het aperitief" },
          { kind: "photo", photo: { src: shoot.maart26(5), alt: "Schuimwijn wordt uitgeschonken" }, size: "l", caption: "Uitschenken" },
          { kind: "photo", photo: { src: shoot.juni25(6), alt: "De sommelier proeft een glas" }, size: "s", hang: "bottom", caption: "Proeven" },
          { kind: "photo", photo: { src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht" }, size: "l", hang: "top", caption: "Aan tafel" },
        ]}
      />

      <ContactSection />
    </>
  );
}
