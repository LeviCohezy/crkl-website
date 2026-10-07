import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { Feature } from "@/components/v3/Feature";
import { ContactSection } from "@/components/v3/ContactSection";
import { Hero } from "@/components/v3/Hero";
import { IndexRows } from "@/components/v3/IndexRows";
import { InlineLink, PinkLink, TextLink } from "@/components/v3/Links";
import { MenuList } from "@/components/v3/MenuList";
import { Statement } from "@/components/v3/Statement";
import { type as t } from "@/components/v3/type";
import { Visuals } from "@/components/v3/Visuals";
import { formatPrice } from "@/lib/format";
import { menuTab } from "@/lib/menu";
import { shoot } from "@/lib/photos";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/v3" },
};

/** Structured data for search engines — facts only, straight from site.ts. */
const restaurant = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  url: siteUrl,
  telephone: site.contact.phoneHref,
  email: site.contact.email,
  servesCuisine: ["Modern", "Creatief"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.street,
    postalCode: "8800",
    addressLocality: "Roeselare",
    addressCountry: "BE",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.contact.geo.lat, longitude: site.contact.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Thursday", "Friday"], opens: "12:00", closes: "13:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"], opens: "19:00", closes: "19:30" },
  ],
  acceptsReservations: true,
  sameAs: site.social.map((item) => item.href),
};

/** The plates, in the order they are shown — alt texts describe the photographs. */
const plates = [
  { src: shoot.mei25(22), alt: "Witte asperge met citroen en dille" },
  { src: shoot.maart26(6), alt: "Langoustine op de grill, rook boven de tafel" },
  { src: shoot.mei25(47), alt: "Tartaar met bloemen en kruiden" },
  { src: shoot.jan26(19), alt: "Rundvlees met schorseneer en jus" },
  { src: shoot.maart26(34), alt: "Vis met gekleurde toetsen op een wit bord" },
  { src: shoot.juni26(30), alt: "Vis met grijze garnalen tussen de varens" },
  { src: shoot.okt25(13), alt: "Dessert in de vorm van een rode appel" },
  { src: shoot.dec25(13), alt: "Wintergerecht in een bord met reliëf" },
  { src: shoot.mei25(16), alt: "Asperge met citroen op een bed van venkel" },
  { src: shoot.maart26(47), alt: "Vis in een schuimige saus" },
  { src: shoot.juni26(20), alt: "Vis in een oranje saus" },
  { src: shoot.maart26(53), alt: "Vlees met gekleurde groenten" },
];

export default function HomePage() {
  const lunch = menuTab("lunch");
  const formule = lunch.groups[0];
  const carre = lunch.groups[1];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant).replace(/</g, "\\u003c") }}
      />

      {/* 1 — What this is. */}
      <Hero
        title={"Gastronomisch\nrestaurant in *Roeselare*"}
        lead="Lunch en diner met dagverse ingrediënten en een creatieve, moderne visie op gastronomie. Sam kookt, Jolien ontvangt."
        actions={
          <>
            <PinkLink href="/reserveren">Reserveer een tafel</PinkLink>
            <TextLink href="/menu">Bekijk het menu</TextLink>
          </>
        }
        photo={{ src: shoot.juni26(9), alt: "De zaal van CRKL in het daglicht, met het ronde wandpaneel", focus: "50% 55%" }}
        orbit="Gastronomisch restaurant · Roeselare · Lunch en diner · CRKL · "
        caption="De zaal"
      />

      {/* 2 — What kind of house. */}
      <Statement
        as="h2"
        text={"Een vast menu dat het seizoen volgt, *dagvers* bereid en met aandacht geserveerd — in een zaal waar rust de toon zet."}
      >
        <Reveal>
          <ul className={`${t.small} flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-6`}>
            <li>
              <InlineLink href={site.links.michelin}>Michelin Guide</InlineLink>
            </li>
            <li>
              <InlineLink href={site.links.gaultMillau}>Gault&amp;Millau</InlineLink>
            </li>
            {site.credentials.map((item) => (
              <li key={item.href}>
                <InlineLink href={item.href}>{item.label}</InlineLink>
              </li>
            ))}
            {site.links.googleRating ? (
              <li>
                <InlineLink href={site.links.googleReviews}>{site.links.googleRating} op Google</InlineLink>
              </li>
            ) : null}
          </ul>
        </Reveal>
      </Statement>

      {/* 3 — The dinner menu. */}
      <MenuList
        id="diner"
        tabs={["diner"]}
        title={"Het diner:\nvijf gangen, *één avond*"}
        intro="Het tasting menu van het huis, rond wat het seizoen aanreikt — met het signature gerecht van de chef als extra gang. Daarbij een wijnpairing tot en met het hoofdgerecht, of een aangepast non-alcoholisch sap."
        aside={
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <PinkLink href="/reserveren">Reserveer diner</PinkLink>
            <TextLink href="/menu">Het volledige menu</TextLink>
          </div>
        }
      />

      {/* 3b — The plates. */}
      <Visuals
        title={"Wat er\n*op tafel* komt"}
        photos={plates}
        after={<TextLink href="/menu">Ontdek de gerechten op het menu</TextLink>}
      />

      {/* 4 — The Room. */}
      <Feature
        id="the-room"
        title={"The Room, voor wie\n*zaken doet* aan tafel"}
        facts={["Aparte ruimte", "Tot 20 gasten", "Audiovisueel materiaal", "Ruime parking"]}
        body={[
          "Een eigen ruimte, los van de zaal, voor een business diner, een zakenlunch of een vergadering met lunch: scherm en geluid staan klaar voor u aankomt, en de keuken is dezelfde als in het restaurant.",
          "Even goed voor een privédiner met familie of vrienden — tot twintig gasten aan één tafel.",
        ]}
        actions={
          <>
            <TextLink href="/the-room">Ontdek The Room</TextLink>
            <TextLink href="/the-room#aanvraag">Vraag beschikbaarheid</TextLink>
          </>
        }
        photo={{ src: shoot.okt25(1), alt: "De lange tafel in The Room, gedekt, met scherm" }}
        ratio="cinema"
      />

      {/* 5 — Lunch, on the pink. */}
      <Statement
        id="lunch"
        as="h2"
        tone="blush"
        text={"Ook 's middags: *lunch*, van woensdag tot vrijdag."}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className={`${t.lead} max-w-md text-ink`}>{formule.intro}</p>
              <p className="mt-5 text-base text-ink-soft">
                {site.hours.lunch.days}, {site.hours.lunch.hours}.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
                <PinkLink href="/reserveren" tone="blush">
                  Reserveer lunch
                </PinkLink>
                <TextLink href="/lunch" tone="blush">
                  Alles over de lunch
                </TextLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-white">
              {[...formule.lines, ...carre.lines.slice(0, 1)].map((line) => (
                <li key={line.label} className="flex items-baseline gap-4 border-b border-white py-4">
                  <span className="text-base sm:text-[1.0625rem]">
                    {line.label === "Vier gangen" ? `${carre.name} · ` : ""}
                    {line.label}
                    {line.note ? <span className="text-ink-soft"> · {line.note}</span> : null}
                  </span>
                  <span aria-hidden className="leader !border-white" />
                  <span className="font-display text-xl font-light whitespace-nowrap tabular-nums sm:text-2xl">
                    {formatPrice(line.priceCents)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Statement>

      {/* 6 — Events. */}
      <IndexRows
        id="events"
        title={"Ook voor\n*gezelschappen*"}
        intro="Van een bedrijfsevent tot een kleinschalig huwelijksfeest. Voor groepen en events openen we ook op dinsdag, zaterdagmiddag en zondag."
        rows={[
          {
            href: "/events",
            title: "Bedrijfsevents",
            line: "Een meeting, lunch of diner met collega's of klanten.",
            photo: { src: shoot.juni26(3), alt: "Gedekte tafels in de zaal" },
          },
          {
            href: "/trouwen",
            title: "Trouwen in CRKL",
            line: "Een kleinschalig huwelijksfeest, in de zaal en op het terras.",
            photo: { src: shoot.juni26(11), alt: "Een boeket bij het gordijn" },
          },
          {
            href: "/events#vieren",
            title: "Feesten en vieringen",
            line: "Communie, verjaardag, jubileum of babyborrel.",
            photo: { src: shoot.juli26(75), alt: "Cocktails op de witte tafel" },
          },
        ]}
      />

      {/* 7 — The form. */}
      <ContactSection />
    </>
  );
}
