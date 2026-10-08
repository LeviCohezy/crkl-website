import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Faq } from "@/components/v3/Faq";
import { Feature } from "@/components/v3/Feature";
import { ContactSection } from "@/components/v3/ContactSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { MenuList } from "@/components/v3/MenuList";
import { Statement } from "@/components/v3/Statement";
import { Strip } from "@/components/v3/Strip";
import { type as t } from "@/components/v3/type";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lunch — woensdag tot vrijdag",
  description:
    "Lunch bij CRKL in Roeselare, van woensdag tot vrijdag: de lunchformule in twee of drie gangen, of Menu Carré+ in vier gangen, met dagverse, seizoensgebonden ingrediënten.",
  alternates: { canonical: "/v3/lunch" },
};

export default function LunchPage() {
  return (
    <>
      <Hero
        title={"Lunch\n*bij CRKL*"}
        lead={`${site.hours.lunch.days}, ${site.hours.lunch.hours}: een verfijnde middag met dagverse, seizoensgebonden ingrediënten — ideaal voor een ontspannen middag of een zakelijke afspraak.`}
        actions={
          <>
            <PinkLink href="/reserveren">Reserveer lunch</PinkLink>
            <TextLink href="#menu">Het lunchmenu</TextLink>
          </>
        }
        photo={{ src: shoot.okt25(9), alt: "Gedekte tafels met glazen in het daglicht, de roze stoelen aangeschoven" }}
        caption="Een tafel bij het raam"
      />

      <Statement as="h2" tone="blush" text={"Kwaliteit, finesse en een vlotte service — *tussen de middag.*"}>
        <Reveal>
          <p className={`${t.lead} max-w-xl text-ink`}>
            Kies voor de lunchformule met voorgerecht en hoofdgerecht, voeg een dessert toe, of neem de tijd voor de
            vier gangen van Menu Carré+.
          </p>
        </Reveal>
      </Statement>

      <MenuList
        id="menu"
        tabs={["lunch"]}
        layout="stack"
        title={"Twee formules,\n*één keuken*"}
      />

      <Strip
        title={"De lunch,\n*in beeld*"}
        items={[
          { kind: "video", src: "hero/crkl-hero-tafel.mp4", poster: "hero/crkl-hero-tafel.jpg", caption: "Aan tafel, 's middags" },
          { kind: "photo", photo: { src: shoot.mei25(16), alt: "Asperge met citroen op een bed van venkel" }, size: "l", hang: "top", caption: "Asperge" },
          { kind: "photo", photo: { src: shoot.mei25(31), alt: "Kleurrijk voorgerecht in het zonlicht" }, size: "s", hang: "bottom", caption: "Voorgerecht" },
          { kind: "photo", photo: { src: shoot.mei25(47), alt: "Tartaar met bloemen en kruiden" }, size: "m", caption: "Tartaar" },
          { kind: "photo", photo: { src: shoot.juni26(20), alt: "Vis in een oranje saus" }, size: "l", hang: "top", caption: "Vis" },
          { kind: "photo", photo: { src: shoot.mei25(35), alt: "Kleurrijk voorgerecht op een wit bord" }, size: "s", caption: "Voorgerecht" },
        ]}
      />

      <Feature
        title={"Een zakenlunch\n*met de deur dicht*"}
        facts={["The Room, tot 20 gasten", "Audiovisueel materiaal", "Ruime parking"]}
        body={[
          "Voor een lunch met klanten of collega's is er The Room: een aparte ruimte waar u vergadert met scherm en geluid en daarna aanschuift voor de lunchformule of Menu Carré+.",
        ]}
        actions={<TextLink href="/the-room">Alles over The Room</TextLink>}
        photo={{ src: shoot.juni26(1), alt: "De zaal met de ronde tafel, in het daglicht" }}
        flip
      />

      <ContactSection />

      <Faq items={faq.lunch} />
    </>
  );
}
