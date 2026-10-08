import type { Metadata } from "next";
import { Columns } from "@/components/v3/Columns";
import { Faq } from "@/components/v3/Faq";
import { Feature } from "@/components/v3/Feature";
import { FormSection } from "@/components/v3/FormSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { Statement } from "@/components/v3/Statement";
import { Strip } from "@/components/v3/Strip";
import { Visuals } from "@/components/v3/Visuals";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trouwen in CRKL — een intiem huwelijksfeest in Roeselare",
  description:
    "Trouwen in CRKL, Roeselare: een kleinschalig huwelijksfeest in een restaurant met tuin en terras, een zaal in zachte tinten, gastronomie van de chef en gastvrijheid van het huis.",
  alternates: { canonical: "/v3/trouwen" },
};

/** This page speaks to a couple, so it says "jullie" where the rest says "u". */
export default function WeddingPage() {
  return (
    <>
      <Hero
        title={"Trouwen\n*in CRKL*"}
        lead="Een kleine bruiloft, met de mensen die ertoe doen: een glas in de tuin, een tafel in een zaal in zachte tinten, en een keuken die die dag voor jullie kookt."
        actions={
          <>
            <PinkLink href="#aanvraag">Plan jullie dag</PinkLink>
            <TextLink href="#dag">Zo verloopt de dag</TextLink>
          </>
        }
        photo={{ src: shoot.juli26(18), alt: "Het terras onder de witte luifel, in het groen" }}
        orbit="Trouwen in CRKL · De tuin · De tafel · Intiem · "
        caption="Het terras, onder de witte luifel"
      />

      <Statement
        as="h2"
        text={"Geen feestzaal, maar een *restaurant*: een tuin vol licht, een zaal in zachte tinten, en de mensen die ertoe doen rond één tafel."}
      />

      <Strip
        id="dag"
        title={"Jullie dag,\n*in drie momenten*"}
        intro="Van het eerste glas tot het laatste bord — zo kan de dag eruitzien."
        items={[
          {
            kind: "text",
            title: "Ceremonie",
            body: "Het ja-woord, met iedereen erbij. Of dat bij ons kan en hoe, bespreken we samen — vertel ons wat jullie voor ogen hebben.",
          },
          { kind: "photo", photo: { src: shoot.juli26(18), alt: "Het terras onder de witte luifel" }, size: "l", caption: "Het terras" },
          {
            kind: "text",
            title: "Receptie",
            body: "Het glas heffen in de tuin of op het terras, met hapjes uit de keuken en tijd voor elkaar.",
          },
          { kind: "photo", photo: { src: shoot.juli26(75), alt: "Cocktails op de witte tafel" }, size: "m", hang: "top", caption: "Het aperitief" },
          {
            kind: "text",
            title: "Diner",
            body: "Aan tafel, voor een menu dat de chef voor jullie gezelschap samenstelt — met wijnpairing of een aangepast non-alcoholisch sap.",
          },
          { kind: "photo", photo: { src: shoot.juni26(5), alt: "De zaal, gedekt voor een gezelschap" }, size: "l", hang: "bottom", caption: "De tafel" },
          { kind: "photo", photo: { src: shoot.juni26(11), alt: "Een boeket bij het gordijn" }, size: "s", caption: "Bloemen" },
        ]}
      />

      <Feature
        title={"Gastvrij, van het eerste glas\n*tot het laatste*"}
        body={[
          "Jolien ontvangt jullie gasten, Sam kookt. Het team weet wie wie is, wie wat niet eet en wanneer het even stil mag worden.",
          "Een kleinschalig huwelijksfeest in een stijlvolle en warme setting — zo omschrijven we het zelf, en zo willen we dat jullie het onthouden.",
        ]}
        actions={<TextLink href="/over-ons">Wie we zijn</TextLink>}
        photo={{ src: shoot.juni26(1), alt: "De zaal met de ronde tafel, in het daglicht" }}
      />

      <Visuals
        title={"De sfeer\n*in beeld*"}
        photos={[
          { src: shoot.juni26(11), alt: "Een boeket bij het gordijn" },
          { src: shoot.juli26(65), alt: "Glazen en het CRKL-servet in het zonlicht" },
          { src: shoot.juli26(54), alt: "Ronde tafel op het okeren tapijt" },
          { src: shoot.mei25(11), alt: "Een boeket in de zaal" },
          { src: shoot.juli26(67), alt: "Glazen en een servet op de gedekte tafel" },
          { src: shoot.okt25(7), alt: "Tafels bij het raam, met zicht op de tuin" },
        ]}
      />

      <Columns
        tone="blush"
        title={"Zo leggen jullie\n*de datum vast*"}
        columns={[
          { heading: "Een datum", paragraphs: ["Vertel ons wanneer, en met hoeveel jullie komen. Meer hebben we niet nodig om te beginnen."] },
          { heading: "Een gesprek", paragraphs: ["We ontvangen jullie in het restaurant en lopen samen door de dag: de momenten, de tafel, de wensen."] },
          { heading: "Een menu", paragraphs: ["De chef stelt een menu voor op maat van jullie gezelschap. Allergieën en dieetwensen nemen we meteen mee."] },
          {
            heading: "Jullie dag",
            paragraphs: ["Daarna is het aan ons. Jullie hoeven alleen nog te komen."],
            after: <TextLink href="#aanvraag" tone="blush">Vraag jullie datum aan</TextLink>,
          },
        ]}
      />

      <FormSection
        id="aanvraag"
        title={"Vraag\n*jullie datum* aan"}
        intro="Begin met de datum en het aantal gasten. Daarna plannen we een gesprek."
        practical={false}
        before={
          <p className="max-w-md border-t border-line pt-8 text-[0.9375rem] leading-relaxed">
            Liever eerst even bellen?{" "}
            <a href={`tel:${site.contact.phoneHref}`} className="link-line">
              {site.contact.phone}
            </a>
          </p>
        }
        form={{ kind: "trouwen", submitLabel: "Vraag jullie datum aan", steps: true, note: "Een vrijblijvend gesprek. We antwoorden zo snel mogelijk." }}
      />

      <Faq items={faq.trouwen} />
    </>
  );
}
