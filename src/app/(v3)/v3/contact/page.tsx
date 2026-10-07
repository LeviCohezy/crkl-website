import type { Metadata } from "next";
import { Faq } from "@/components/v3/Faq";
import { FormSection } from "@/components/v3/FormSection";
import { Hero } from "@/components/v3/Hero";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { Practical } from "@/components/v3/Practical";
import { faq } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "CRKL, Diksmuidsesteenweg 351a, 8800 Roeselare. Adres, openingsuren per dag, route en contact.",
  alternates: { canonical: "/v3/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        title={"Tot\n*binnenkort*"}
        lead="Dankzij onze centrale ligging in Roeselare en ruime parkeermogelijkheden is het restaurant vlot bereikbaar."
        actions={
          <>
            <PinkLink href="/reserveren">Reserveer een tafel</PinkLink>
            <TextLink href="#bericht">Schrijf ons</TextLink>
          </>
        }
      />

      <Practical />

      <FormSection
        id="bericht"
        tone="blush"
        title={"Een vraag,\n*een idee*"}
        intro="Schrijf ons, of bel: we antwoorden zo snel mogelijk."
        practical={false}
        before={
          <p className="max-w-md border-t border-white pt-8 text-[0.9375rem] leading-relaxed">
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

      <Faq items={faq.contact} />
    </>
  );
}
