import type { Metadata } from "next";
import { Band, Head } from "@/components/sections/Band";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { Reviews } from "@/components/sections/Reviews";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Steps } from "@/components/sections/Steps";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProductsByCategory } from "@/lib/catalog";
import { faq } from "@/lib/faq";
import { shoot } from "@/lib/photos";
import { reviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Geschenkbox",
  description:
    "De geschenkbox van CRKL: een stukje van het restaurant om cadeau te doen. Ophalen in Roeselare of laten verzenden.",
  alternates: { canonical: "/geschenkbox" },
};

export default async function GiftBoxPage() {
  const boxes = await getProductsByCategory("geschenkbox");

  return (
    <>
      <PageHero
        eyebrow="Geschenkbox"
        title={"CRKL,\n*om te geven*"}
        intro="Een stukje van het restaurant in een doos: voor wie iets wil schenken dat ook gedeeld wordt."
        cta={{ href: "#kies", label: "Bestel de box" }}
        image={{ src: shoot.flessen, alt: "Drie flessen op een witte tafel voor het roze gordijn" }}
      />

      <SplitMedia
        tone="tint"
        eyebrow="Wat zit erin"
        title={"Gekozen\n*door het huis*"}
        body={[
          "Elke box wordt samengesteld in het restaurant: een fles uit onze kelder, en iets van de keuken om erbij te proeven.",
          "Wie het echte werk wil schenken, voegt er een cadeaubon voor een avond aan tafel bij.",
        ]}
        photo={{ src: shoot.juli26(40), alt: "Koffie en zoetigheden voor de roze wand" }}
      />

      <Band tone="white" id="kies">
        <Head eyebrow="Kies uw box" title={"Drie\n*formaten*"} />
        <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {boxes.map((box, index) => (
            <li key={box.slug}>
              <ProductCard product={box} buyable delay={index * 0.08} />
            </li>
          ))}
        </ul>
      </Band>

      <Steps
        tone="tint"
        eyebrow="Zo werkt het"
        title={"Van bestelling\n*tot cadeau*"}
        steps={[
          { title: "Bestel online", body: "Kies een box en leg ze in uw winkelmand." },
          { title: "Wij verpakken", body: "In het restaurant, klaar om te geven." },
          { title: "Ophalen of verzending", body: "Gratis ophalen in Roeselare, of laten opsturen." },
        ]}
        last={{ title: "Verras iemand", href: "#kies", label: "Bestel hierboven" }}
      />

      <Reviews reviews={reviews.geschenkbox} title={"Gegeven,\n*en gesmaakt*"} />
      <Faq items={faq.geschenkbox} />
    </>
  );
}
