import type { Metadata } from "next";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/shop/ProductCard";
import { Columns } from "@/components/v3/Columns";
import { ContactSection } from "@/components/v3/ContactSection";
import { Faq } from "@/components/v3/Faq";
import { Hero } from "@/components/v3/Hero";
import { PinkLink, TextLink } from "@/components/v3/Links";
import { Section } from "@/components/v3/Section";
import { Statement } from "@/components/v3/Statement";
import { type as t } from "@/components/v3/type";
import { getProductsByCategory } from "@/lib/catalog";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Geschenkbox",
  description:
    "De geschenkbox van CRKL: een stukje van het restaurant om cadeau te doen. Ophalen in Roeselare of laten verzenden.",
  alternates: { canonical: "/v3/geschenkbox" },
};

/** The boxes are placeholders — see CONTENT_TODO.md. */
export default async function GiftBoxPage() {
  const boxes = await getProductsByCategory("geschenkbox");

  return (
    <>
      <Hero
        title={"CRKL,\n*om te geven*"}
        lead="Een stukje van het restaurant in een doos: voor wie iets wil schenken dat ook gedeeld wordt."
        actions={
          <>
            <PinkLink href="#kies">Bestel de box</PinkLink>
            <TextLink href="/shop">Naar de shop</TextLink>
          </>
        }
        photo={{ src: shoot.juli26(40), alt: "Koffie en zoetigheden voor de roze wand", focus: "50% 60%" }}
      />

      <Statement
        as="h2"
        text={"Elke box wordt samengesteld in het *restaurant*: een fles uit onze kelder, en iets van de keuken om erbij te proeven."}
      >
        <p className={`${t.lead} max-w-xl`}>
          Wie het echte werk wil schenken, voegt er een cadeaubon voor een avond aan tafel bij.
        </p>
      </Statement>

      <Section id="kies">
        <SplitText text={"Drie\n*formaten*"} className={t.h2} />
        <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {boxes.map((box, index) => (
            <li key={box.slug} className={index === 1 ? "lg:mt-24" : ""}>
              <Reveal delay={index * 0.08}>
                <ProductCard product={box} buyable />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Columns
        tone="blush"
        title={"Zo\n*werkt het*"}
        columns={[
          { heading: "Bestel online", paragraphs: ["Kies een box en leg ze in uw winkelmand."] },
          { heading: "Wij verpakken", paragraphs: ["In het restaurant, klaar om te geven."] },
          {
            heading: "Ophalen of verzending",
            paragraphs: ["Gratis ophalen in Roeselare, of laten opsturen."],
            after: <TextLink href="#kies" tone="blush">Kies een box</TextLink>,
          },
        ]}
      />

      <Faq items={faq.geschenkbox} />
      <ContactSection />
    </>
  );
}
