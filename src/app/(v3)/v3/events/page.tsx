import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Columns } from "@/components/v3/Columns";
import { Faq } from "@/components/v3/Faq";
import { Feature } from "@/components/v3/Feature";
import { FormSection } from "@/components/v3/FormSection";
import { Hero } from "@/components/v3/Hero";
import { IndexRows } from "@/components/v3/IndexRows";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { Statement } from "@/components/v3/Statement";
import { Strip } from "@/components/v3/Strip";
import { type as t } from "@/components/v3/type";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Events — bedrijfsevents, feesten en trouwen bij CRKL in Roeselare",
  description:
    "Events bij CRKL in Roeselare: bedrijfsevents en zakelijke diners in The Room, familiefeesten van communie tot jubileum, en kleinschalige huwelijksfeesten. Een menu op maat van uw gezelschap.",
  alternates: { canonical: "/v3/events" },
};

export default function EventsPage() {
  return (
    <>
      <Hero
        title={"Events\n*bij CRKL*"}
        lead="Een bedrijfsevent, een familiefeest of een kleinschalig huwelijksfeest: een gezelschap aan tafel, en een menu dat de chef voor die gelegenheid samenstelt."
        actions={
          <>
            <PinkLink href="#aanvraag">Plan uw event</PinkLink>
            <TextLink href="#soorten">Wat kan</TextLink>
          </>
        }
        photo={{ src: shoot.juni26(5), alt: "De zaal, gedekt voor een gezelschap" }}
        caption="De zaal, gedekt voor een gezelschap"
      />

      <IndexRows
        id="soorten"
        title={"Drie soorten\n*gezelschappen*"}
        intro="Voor groepen en events openen we ook op dinsdag, zaterdagmiddag en zondag — buiten de gewone openingsuren."
        rows={[
          {
            href: "#bedrijf",
            title: "Bedrijfsevents",
            line: "Vergaderen, lunchen en dineren met collega's of klanten.",
            photo: { src: shoot.okt25(1), alt: "De lange tafel in The Room" },
          },
          {
            href: "/trouwen",
            title: "Trouwen in CRKL",
            line: "Een kleinschalig huwelijksfeest, in de zaal en op het terras.",
            photo: { src: shoot.juni26(11), alt: "Een boeket bij het gordijn" },
          },
          {
            href: "#vieren",
            title: "Feesten en vieringen",
            line: "Communie, verjaardag, jubileum of babyborrel.",
            photo: { src: shoot.juli26(75), alt: "Cocktails op de witte tafel" },
          },
        ]}
      />

      <Feature
        id="bedrijf"
        title={"Bedrijfsevents:\nvergaderen, lunchen, *dineren*"}
        facts={["The Room, tot 20 gasten", "Audiovisueel materiaal", "Eén contactpersoon", "Ruime parking"]}
        body={[
          "Een directiecomité met lunch, een klantendiner, een teamdag die aan tafel eindigt. In The Room vergadert u met scherm en geluid en schuift u daarna aan zonder van ruimte te veranderen.",
          "Voor grotere gezelschappen openen we ook op dinsdag, zaterdagmiddag en zondag; wat dan kan in de zaal, bespreken we graag met u.",
        ]}
        actions={
          <>
            <TextLink href="/the-room">Alles over The Room</TextLink>
            <TextLink href="#aanvraag">Plan uw event</TextLink>
          </>
        }
        photo={{ src: shoot.okt25(9), alt: "Gedekte tafels met glazen in het daglicht" }}
      />

      <Statement
        as="h2"
        tone="blush"
        text={"Elk event begint met een *gesprek*: de chef stelt het menu samen op maat van uw gezelschap en de gelegenheid."}
      >
        <Reveal>
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              ["Het menu", "Menu Carré+ of Menu CRKL+, of een voorstel op maat van de gelegenheid — met een volwaardig vegetarisch alternatief."],
              ["De dranken", "Wijnpairing tot en met het hoofdgerecht, of een aangepast non-alcoholisch sap bij elke gang."],
              ["De wensen", "Allergieën en dieetwensen: één lijst per gezelschap volstaat. Niemand hoeft aan tafel iets uit te leggen."],
            ].map(([heading, body]) => (
              <div key={heading} className="border-t border-white pt-6">
                <h3 className="text-base">{heading}</h3>
                <p className={`${t.body} mt-3 text-ink`}>{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Statement>

      <Columns
        id="vieren"
        title={"Feesten en\n*vieringen*"}
        intro="Voor wie een bijzonder moment wil vieren in een stijlvolle en warme setting, met de hele familie aan één tafel."
        columns={[
          {
            heading: "Gelegenheden",
            items: ["Communie", "Verjaardag", "Jubileum", "Babyborrel", "Afscheid of eerbetoon", "Kleinschalig huwelijksfeest"],
          },
          {
            heading: "Zo gaat het",
            paragraphs: [
              "U vertelt ons de datum, het aantal gasten en de gelegenheid. We plannen een gesprek, de chef stelt een menu voor, en we leggen samen de dag vast.",
              "Tot twintig gasten zit u in The Room, met de deur dicht. Voor meer gasten bekijken we wat kan in de zaal, op de dagen waarop we voor groepen openen.",
            ],
            after: <TextLink href="/trouwen">Trouwen in CRKL</TextLink>,
          },
        ]}
      />

      <Strip
        title={"De zaal,\n*klaar voor gasten*"}
        items={[
          { kind: "photo", photo: { src: shoot.juni26(8), alt: "Tafels onder het ronde wandpaneel" }, size: "l", caption: "De zaal" },
          { kind: "photo", photo: { src: shoot.juli26(75), alt: "Cocktails op de witte tafel" }, size: "s", hang: "top", caption: "Het aperitief" },
          { kind: "photo", photo: { src: shoot.juli26(18), alt: "Het terras onder de witte luifel" }, size: "m", hang: "bottom", caption: "Het terras" },
          { kind: "photo", photo: { src: shoot.mei25(11), alt: "Een boeket in de zaal" }, size: "s", caption: "Bloemen" },
          { kind: "photo", photo: { src: shoot.juli26(1), alt: "Gasten aan tafel in de zaal" }, size: "l", hang: "top", caption: "Aan tafel" },
        ]}
      />

      <FormSection
        id="aanvraag"
        title={"Vraag\n*uw event* aan"}
        intro="Datum, aantal gasten en de gelegenheid — meer hebben we niet nodig om te beginnen."
        form={{ kind: "event", submitLabel: "Vraag uw event aan", note: "Vrijblijvend. We antwoorden zo snel mogelijk." }}
      />

      <Faq items={faq.events} />
    </>
  );
}
