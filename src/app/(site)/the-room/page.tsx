import type { Metadata } from "next";
import { CountUp } from "@/components/motion/CountUp";
import { Disclosure, Pills, PullQuote, Tabs } from "@/components/motion/Disclosure";
import { CardFan } from "@/components/sections/CardFan";
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
  title: "The Room — privé dineren, meetings en events in Roeselare",
  description:
    "The Room is de exclusieve ruimte van CRKL in Roeselare voor business diners, zakenlunches, vergaderingen met lunch, klantenmeetings, netwerkevents en privédiners tot 20 personen, met audiovisueel materiaal en ruime parking.",
  alternates: { canonical: "/the-room" },
};

/**
 * The copy on this page is written for search as much as for guests, and
 * folded so it never reads as a wall. What is fact (crkl.eu) and what is
 * written to a plausible standard is kept apart in CONTENT_TODO.md.
 */
const business = [
  "Business diner",
  "Zakenlunch",
  "Vergadering met lunch",
  "Klantenmeeting",
  "Netwerkevent",
  "Teamdiner",
  "Directiecomité",
  "Productvoorstelling",
];

const private_ = [
  "Familiediner",
  "Verjaardag",
  "Jubileum",
  "Communie",
  "Babyborrel",
  "Kleinschalig huwelijksfeest",
  "Afscheid of eerbetoon",
];

const worries = [
  {
    title: "Als er op het laatste moment iets verandert",
    summary: "Een gast meer of minder, een later uur, een andere opstelling.",
    body: [
      "Wie een zakelijk diner organiseert, weet dat de gastenlijst beweegt tot de dag zelf. Geef wijzigingen door aan uw contactpersoon en we passen de tafel, het aantal couverts en het menu aan — zonder dat u de hele aanvraag opnieuw hoeft te doen.",
      "Ook het uur schuift mee: een vergadering die uitloopt, een trein die later aankomt. Laat het weten en de keuken wacht.",
    ],
  },
  {
    title: "Allergieën en dieetwensen",
    summary: "Vegetarisch, zonder gluten, zonder alcohol: één lijst volstaat.",
    body: [
      "Bij een gezelschap van twintig zijn er altijd een paar bijzondere wensen. Bezorg ons één lijst met allergieën en dieetvoorkeuren per gast en de keuken stemt het menu af — met een volwaardig vegetarisch alternatief en, wie dat wil, een aangepast non-alcoholisch sap bij elke gang.",
      "Zo hoeft niemand aan tafel iets uit te leggen, en hoeft u het niet te onthouden.",
    ],
  },
  {
    title: "Techniek die werkt voor de gasten er zijn",
    summary: "Scherm, geluid en aansluitingen staan klaar.",
    body: [
      "The Room is uitgerust met audiovisueel materiaal. Komt u presenteren, dan testen we vooraf uw laptop en uw bestanden, zodat de eerste slide op het scherm staat voor de eerste gast binnenkomt.",
      "Geen zoeken naar een adapter, geen vergadering die begint met een kabel.",
    ],
  },
  {
    title: "Discretie",
    summary: "Een eigen ruimte, een eigen tafel, geen meekijkende zaal.",
    body: [
      "Wat aan uw tafel besproken wordt, blijft aan uw tafel. The Room is een aparte ruimte, los van de zaal, met bediening die weet wanneer ze binnenkomt en wanneer niet.",
      "Voor onderhandelingen, evaluatiegesprekken of een gesprek dat simpelweg privé is.",
    ],
  },
  {
    title: "Bereikbaar, ook voor wie van ver komt",
    summary: "Centraal in Roeselare, met ruime parkeermogelijkheden.",
    body: [
      "Dankzij onze centrale ligging in Roeselare en ruime parkeermogelijkheden is het restaurant vlot bereikbaar — ook voor gasten die rechtstreeks van kantoor of van de snelweg komen.",
      "Voor groepen en events openen we bovendien ook op dinsdag, zaterdagmiddag en zondag, buiten de gewone openingsuren.",
    ],
  },
];

const advantages = [
  { n: 20, unit: "gasten", line: "Eén aparte ruimte, helemaal van u." },
  { n: 1, unit: "contactpersoon", line: "Eén aanspreekpunt van aanvraag tot afrekening." },
  { n: 3, unit: "opstellingen", line: "Zittend, walking of vergadering met lunch." },
  { n: 6, unit: "dagen per week", line: "Voor groepen ook dinsdag, zaterdagmiddag en zondag." },
];

export default function TheRoomPage() {
  return (
    <>
      <PageHero
        variant="cascade"
        eyebrow="Privé dineren"
        title={"The\n*Room*"}
        intro="Voor privédiners, meetings en events kan u terecht in onze exclusieve ruimte — tot 20 gasten, met audiovisueel materiaal, in het hart van Roeselare."
        chips={["Tot 20 gasten", "Privé", "Audiovisueel materiaal", "Ruime parking"]}
        cta={{ href: "#aanvraag", label: "Vraag beschikbaarheid" }}
        image={{ src: shoot.okt25(1), alt: "De lange tafel in The Room" }}
        photos={[
          { src: shoot.okt25(2), alt: "Glazen, servetten en bestek op de gedekte tafel" },
          { src: shoot.okt25(5), alt: "Een wijnglas aan het raam" },
        ]}
      />

      <SplitMedia
        variant="inset"
        tone="white"
        eyebrow="De ruimte"
        title={"Een tafel\n*voor uzelf*"}
        body={[
          "Bent u op zoek naar een restaurant voor groepen in Roeselare of een stijlvolle locatie voor een meeting, lunch of diner? The Room is onze aparte ruimte: tot 20 personen, uitgerust met audiovisueel materiaal, met dezelfde keuken en dezelfde bediening als in de zaal.",
        ]}
        photo={{ src: shoot.okt25(4), alt: "Een gedekte plaats aan de lange tafel" }}
        photos={[{ src: shoot.okt25(3), alt: "Bestek en glazen, in zwart-wit" }]}
        flip
      >
        <Tabs
          tabs={[
            {
              label: "Zakelijk",
              content: (
                <div className="space-y-8">
                  <Pills items={business} />
                  <p className="max-w-md leading-relaxed text-ink-soft">
                    Een business diner in Roeselare, ideaal voor zakenetentjes,
                    vergaderingen, klantenmeetings en netwerkevents: één tafel,
                    één menu, één contactpersoon — en een keuken die het verschil
                    maakt tussen een afspraak en een avond.
                  </p>
                  <PullQuote>Dezelfde keuken, dezelfde bediening — alleen de deur is dicht.</PullQuote>
                  <Disclosure items={worries} />
                </div>
              ),
            },
            {
              label: "Privé",
              content: (
                <div className="space-y-8">
                  <Pills items={private_} />
                  <p className="max-w-md leading-relaxed text-ink-soft">
                    Voor communies, verjaardagen, jubilea, babyborrels en
                    kleinschalige huwelijksfeesten. CRKL is de ideale locatie in
                    Roeselare voor wie een bijzonder moment wil vieren in een
                    stijlvolle en warme setting — met de hele familie aan één
                    tafel.
                  </p>
                  <PullQuote>Niemand hoeft iets uit te leggen aan tafel; u hebt het ons al verteld.</PullQuote>
                  <Disclosure items={worries.filter((item) => !item.title.startsWith("Techniek"))} />
                </div>
              ),
            },
          ]}
        />
      </SplitMedia>

      <CardFan
        tone="tint"
        eyebrow="Opstellingen"
        title={"Drie manieren\n*om samen te zitten*"}
        intro="Zelfde ruimte, andere avond. Zeg ons wat u voor ogen hebt; wij zetten de tafel."
        cards={[
          {
            title: "Zittend diner",
            body: "Eén lange tafel, het menu van het huis, de avond voor uw gezelschap alleen.",
            detail: "Tot 20 gasten. Menu Carré+ of Menu CRKL+, met wijnpairing of non-alcoholisch sap. Ideaal voor een business diner, een jubileum of een familiediner.",
            photo: { src: shoot.okt25(1), alt: "De lange tafel in The Room" },
          },
          {
            title: "Walking dinner",
            body: "Kleinere gerechten die rondgaan, voor wie liever van groepje wisselt.",
            detail: "Een receptie-opstelling met statafels, hapjes en gerechtjes uit de keuken. Voor netwerkevents, productvoorstellingen en recepties.",
            photo: { src: shoot.juli26(75), alt: "Cocktails op de witte tafel" },
          },
          {
            title: "Meeting met lunch",
            body: "Vergaderen met scherm en geluid, en daarna aan tafel zonder van ruimte te veranderen.",
            detail: "Audiovisueel materiaal, koffie en water op tafel, lunchformule of Menu Carré+ aansluitend. Voor directiecomités, klantenmeetings en workshops.",
            photo: { src: shoot.okt25(2), alt: "Glazen, servetten en bestek op de gedekte tafel" },
          },
        ]}
      />

      <Gallery
        variant="collage"
        tone="white"
        eyebrow="De ruimte in beeld"
        title={"Zo ziet\n*het eruit*"}
        intro="Daglicht, zicht op de tuin, en een tafel die gedekt staat als u binnenkomt."
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
        variant="split"
        photo={{ src: shoot.okt25(7), alt: "Tafels bij het raam, met zicht op de tuin" }}
        eyebrow="Aanvraag"
        title={"Vraag\n*The Room* aan"}
        intro="Begin met de datum en het aantal gasten. De rest bespreken we samen."
        before={
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {advantages.map((item) => (
              <div key={item.unit}>
                <dt className="font-display text-5xl font-light">
                  <CountUp value={item.n} />
                </dt>
                <dd className="mt-1">
                  <span className="eyebrow text-stone">{item.unit}</span>
                  <span className="mt-1 block text-sm leading-snug text-ink-soft">{item.line}</span>
                </dd>
              </div>
            ))}
          </dl>
        }
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
