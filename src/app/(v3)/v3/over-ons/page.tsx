import type { Metadata } from "next";
import { Columns } from "@/components/v3/Columns";
import { FormSection } from "@/components/v3/FormSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { Statement } from "@/components/v3/Statement";
import { Strip } from "@/components/v3/Strip";
import { Team } from "@/components/v3/Team";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Over ons — Sam, Jolien en het team",
  description:
    "De mensen achter CRKL in Roeselare: chef Sam, gastvrouw Jolien en hun team, in een villa in beton met een licht interieur in pasteltinten.",
  alternates: { canonical: "/v3/over-ons" },
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title={"Sam &\n*Jolien*"}
        lead="Een creatieve, moderne visie op gastronomie, en een huis waar verfijning en beleving centraal staan. Sam in de keuken, Jolien in de zaal."
        actions={
          <>
            <PinkLink href="/reserveren">Reserveer een tafel</PinkLink>
            <TextLink href="#contact">Praat met ons</TextLink>
          </>
        }
        photo={{ src: shoot.jan26(25), alt: "Jolien en Sam, gastvrouw en chef van CRKL", focus: "50% 16%" }}
        orbit="Over ons · Sam en Jolien · Roeselare · CRKL · "
        caption="Jolien en Sam"
      />

      <Statement
        as="h2"
        text={"Strak van buiten, *zacht* van binnen: een villa in beton aan de Diksmuidsesteenweg, en binnen een licht interieur in pasteltinten."}
      >
        <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          Gordijnen in twee tinten roze verdelen de zaal in intieme hoeken. In die stijlvolle en rustige setting
          creëren we een totaalervaring waarbij smaak, service en sfeer samenkomen.
        </p>
      </Statement>

      <Strip
        title={"Keuken\n*en team*"}
        items={[
          { kind: "video", src: "clips/crkl-pass.mp4", poster: "hero/crkl-pass.jpg", caption: "De pass, tijdens de service" },
          { kind: "photo", photo: { src: shoot.okt25(19), alt: "De chef aan de pass, in zwart-wit" }, size: "l", hang: "top", caption: "Aan de pass" },
          {
            kind: "text",
            title: "Achter de pass, elke avond",
            body: "Een vast menu met dagverse, seizoensgebonden ingrediënten, elke dag opnieuw bereid. Echte mensen, een echte keuken.",
          },
          { kind: "photo", photo: { src: shoot.mei25(3), alt: "De chef aan het werk in de keuken" }, size: "m", hang: "bottom", caption: "In de keuken" },
          { kind: "photo", photo: { src: shoot.okt25(27), alt: "Een gerecht wordt afgewerkt met saus" }, size: "s", caption: "Afwerken" },
          { kind: "photo", photo: { src: shoot.juli26(57), alt: "Achter de bar" }, size: "l", hang: "top", caption: "Achter de bar" },
        ]}
      />

      {/* Only the two hosts are named — see CONTENT_TODO.md. */}
      <Team
        title={"Zaal\n*en keuken*"}
        intro="De mensen die uw glas vullen, uw bord brengen en weten wat erop ligt."
        people={[
          { name: "Sam", role: "Chef", line: "Kookt een vast menu met dagverse, seizoensgebonden ingrediënten.", photo: { src: shoot.mei25(49), alt: "Chef Sam met een handvol aardbeien" } },
          { name: "Jolien", role: "Gastvrouw", line: "Ontvangt u in de zaal en waakt over de avond.", photo: { src: shoot.jolien(2), alt: "Gastvrouw Jolien bij het gordijn" } },
          { name: "Het team", role: "Zaal en bar", line: "De mensen die uw glas vullen, uw bord brengen en weten wat erop ligt.", photo: { src: shoot.juni25(8), alt: "Een teamlid met een fles wijn" } },
        ]}
      />

      <Columns
        tone="blush"
        title={"Erkenning"}
        columns={[
          {
            heading: "Champagne Pompadour",
            paragraphs: ["CRKL is ambassadeur van Champagne Pompadour: de champagne staat op de kaart en hoort bij het aperitief."],
            after: <TextLink href="/champagne-pompadour" tone="blush">Over het ambassadeurschap</TextLink>,
          },
          {
            heading: "Gastro RSL",
            paragraphs: ["Als lid van Gastro RSL staan we mee voor wat Roeselare culinair te bieden heeft."],
            after: <TextLink href="/gastro-rsl" tone="blush">Over het lidmaatschap</TextLink>,
          },
          {
            heading: "In de gidsen",
            paragraphs: ["CRKL is opgenomen in de Michelin Guide en bij Gault&Millau."],
            after: (
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <TextLink href={site.links.michelin} tone="blush">Michelin Guide</TextLink>
                <TextLink href={site.links.gaultMillau} tone="blush">Gault&amp;Millau</TextLink>
              </div>
            ),
          },
        ]}
      />

      <FormSection
        id="contact"
        title={"Praat\n*met ons*"}
        intro="Een vraag, een idee, een samenwerking? Schrijf ons."
        practical={false}
        before={
          <p className="max-w-md border-t border-line pt-8 text-[0.9375rem] leading-relaxed">
            <a href={`tel:${site.contact.phoneHref}`} className="link-line">
              {site.contact.phone}
            </a>
            <br />
            <a href={`mailto:${site.contact.email}`} className="link-line">
              {site.contact.email}
            </a>
          </p>
        }
        form={{ kind: "contact", submitLabel: "Stuur bericht" }}
      />
    </>
  );
}
