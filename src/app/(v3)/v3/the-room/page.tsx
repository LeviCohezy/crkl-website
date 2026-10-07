import type { Metadata } from "next";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Columns } from "@/components/v3/Columns";
import { Faq } from "@/components/v3/Faq";
import { Figures } from "@/components/v3/Figures";
import { FormSection } from "@/components/v3/FormSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { Section } from "@/components/v3/Section";
import { Statement } from "@/components/v3/Statement";
import { Strip } from "@/components/v3/Strip";
import { type as t } from "@/components/v3/type";
import { Visuals } from "@/components/v3/Visuals";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Room — privé dineren, meetings en business diners in Roeselare",
  description:
    "The Room is de aparte ruimte van CRKL in Roeselare voor business diners, zakenlunches, vergaderingen met lunch, klantenmeetings en privédiners tot 20 gasten, met audiovisueel materiaal en ruime parking.",
  alternates: { canonical: "/v3/the-room" },
};

/**
 * Written for people who do business at the table, and for families who
 * want a table of their own. What is fact (crkl.eu) and what is written
 * to a plausible standard is kept apart in CONTENT_TODO.md.
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

const included = [
  "Audiovisueel materiaal",
  "Eén contactpersoon",
  "Menu op maat van het gezelschap",
  "Wijnpairing of non-alcoholisch sap",
  "Ruime parking",
  "Ook op dinsdag, zaterdagmiddag en zondag",
];

const settled = [
  {
    title: "Als er op het laatste moment iets verandert",
    body: "Een gast meer of minder, een later uur, een andere opstelling: geef het door aan uw contactpersoon en we passen tafel, couverts en menu aan. Loopt de vergadering uit, dan wacht de keuken.",
  },
  {
    title: "Allergieën en dieetwensen",
    body: "Eén lijst per gezelschap volstaat. De keuken stemt het menu af, met een volwaardig vegetarisch alternatief en, wie dat wil, een aangepast non-alcoholisch sap bij elke gang.",
  },
  {
    title: "Techniek die werkt voor de gasten er zijn",
    body: "Scherm, geluid en aansluitingen staan klaar. Komt u presenteren, dan testen we vooraf uw laptop en uw bestanden, zodat de eerste slide op het scherm staat voor de eerste gast binnenkomt.",
  },
  {
    title: "Discretie",
    body: "Een aparte ruimte, los van de zaal, met bediening die weet wanneer ze binnenkomt en wanneer niet. Wat aan uw tafel besproken wordt, blijft aan uw tafel.",
  },
  {
    title: "Bereikbaar, ook voor wie van ver komt",
    body: "Centraal in Roeselare, met ruime parkeermogelijkheden — vlot bereikbaar van kantoor of van de snelweg. Voor groepen openen we ook buiten de gewone uren.",
  },
];

export default function TheRoomPage() {
  return (
    <>
      <Hero
        title={"The\n*Room*"}
        lead="Een eigen ruimte in het restaurant, voor wie zaken doet aan tafel — en voor wie privé wil vieren. Tot twintig gasten, met scherm en geluid, achter een gesloten deur."
        actions={
          <>
            <PinkLink href="#aanvraag">Vraag beschikbaarheid</PinkLink>
            <TextLink href="#opstellingen">De drie opstellingen</TextLink>
          </>
        }
        photo={{ src: shoot.okt25(1), alt: "De lange tafel in The Room, gedekt, met scherm" }}
        caption="The Room, gedekt voor twintig"
      />

      <Statement
        as="h2"
        text={"Vergaderen met scherm en geluid, en daarna aan tafel — *zonder van ruimte te veranderen.*"}
      >
        <Figures
          figures={[
            { n: 20, unit: "gasten", line: "Eén aparte ruimte, helemaal van u." },
            { n: 1, unit: "contactpersoon", line: "Van aanvraag tot afrekening." },
            { n: 3, unit: "opstellingen", line: "Zittend, walking of vergadering met lunch." },
            { n: 6, unit: "dagen per week", line: "Voor groepen ook dinsdag, zaterdagmiddag en zondag." },
          ]}
        />
      </Statement>

      <Columns
        title={"Zakelijk of privé,\n*één tafel*"}
        intro="Dezelfde keuken en dezelfde bediening als in de zaal — alleen de deur is dicht."
        columns={[
          {
            heading: "Zakelijk",
            items: business,
            after: (
              <p className={t.body}>
                Eén tafel, één menu, één contactpersoon — en een keuken die het verschil maakt tussen een
                afspraak en een avond.
              </p>
            ),
          },
          {
            heading: "Privé",
            items: private_,
            after: (
              <p className={t.body}>
                Een bijzonder moment vieren met de hele familie aan één tafel, in een stijlvolle en warme
                setting.
              </p>
            ),
          },
          { heading: "Inbegrepen", items: included },
        ]}
      />

      <Strip
        id="opstellingen"
        title={"Drie manieren\n*om samen te zitten*"}
        intro="Zelfde ruimte, andere avond. Zeg ons wat u voor ogen hebt; wij zetten de tafel."
        items={[
          {
            kind: "text",
            title: "Zittend diner",
            body: "Eén lange tafel, het menu van het huis, de avond voor uw gezelschap alleen. Menu Carré+ of Menu CRKL+, met wijnpairing of non-alcoholisch sap — voor een business diner, een jubileum of een familiediner.",
          },
          { kind: "photo", photo: { src: shoot.okt25(1), alt: "De lange tafel in The Room" }, size: "l", caption: "Zittend diner, tot twintig gasten" },
          {
            kind: "text",
            title: "Walking dinner",
            body: "Kleinere gerechten die rondgaan, met statafels, voor wie liever van groepje wisselt. Voor netwerkevents, productvoorstellingen en recepties.",
          },
          { kind: "photo", photo: { src: shoot.juli26(75), alt: "Cocktails op de witte tafel" }, size: "m", hang: "top", caption: "Walking dinner" },
          {
            kind: "text",
            title: "Meeting met lunch",
            body: "Vergaderen met scherm en geluid, koffie en water op tafel, en aansluitend de lunchformule of Menu Carré+. Voor directiecomités, klantenmeetings en workshops.",
          },
          { kind: "photo", photo: { src: shoot.okt25(2), alt: "Glazen, servetten en bestek op de gedekte tafel" }, size: "m", hang: "bottom", caption: "Meeting met lunch" },
        ]}
      />

      <Visuals
        title={"De ruimte\n*in beeld*"}
        photos={[
          { src: shoot.okt25(2), alt: "Glazen, servetten en bestek op de gedekte tafel" },
          { src: shoot.okt25(7), alt: "Tafels bij het raam, met zicht op de tuin" },
          { src: shoot.okt25(5), alt: "Een wijnglas aan het raam" },
          { src: shoot.okt25(4), alt: "Een gedekte plaats aan de lange tafel" },
          { src: shoot.juli26(67), alt: "Glazen en een servet op de gedekte tafel" },
          { src: shoot.okt25(3), alt: "Bestek en glazen, in zwart-wit" },
        ]}
      />

      <Section tone="blush" id="geregeld">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SplitText text={"Wat u *niet*\nhoeft te regelen"} className={t.h2} />
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {settled.map((item, index) => (
              <li key={item.title} className="border-t border-white py-8 last:border-b sm:py-9">
                <Reveal delay={index * 0.04}>
                  <div className="grid gap-4 sm:grid-cols-[3rem_1fr]">
                    <span className="font-display text-2xl font-light tabular-nums text-ink-soft">{index + 1}</span>
                    <div>
                      <h3 className={t.h3}>{item.title}</h3>
                      <p className={`${t.body} mt-4 max-w-xl text-ink`}>{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <FormSection
        id="aanvraag"
        title={"Vraag\n*The Room* aan"}
        intro="Begin met de datum en het aantal gasten. De rest bespreken we samen — één contactpersoon, van aanvraag tot afrekening."
        practical={false}
        before={
          <dl className="grid max-w-md grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 text-[0.9375rem] leading-relaxed">
            <div>
              <dt className="text-stone">Voor groepen</dt>
              <dd>Ook dinsdag, zaterdagmiddag en zondag</dd>
            </div>
            <div>
              <dt className="text-stone">Liever bellen?</dt>
              <dd>
                <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                  {site.contact.phone}
                </a>
              </dd>
            </div>
          </dl>
        }
        form={{ kind: "the-room", submitLabel: "Vraag The Room aan", steps: true, note: "Vrijblijvend. We antwoorden zo snel mogelijk." }}
      />

      <Faq items={faq["the-room"]} />
    </>
  );
}
