import { DishBand } from "@/components/home/DishBand";
import { HomeHero } from "@/components/home/HomeHero";
import { Signature } from "@/components/home/Signature";
import { ReservationBand } from "@/components/sections/FormBand";
import { Praktisch } from "@/components/sections/Praktisch";
import { Reviews } from "@/components/sections/Reviews";
import { SplitMedia } from "@/components/sections/SplitMedia";
import { Statement } from "@/components/sections/Statement";
import { Tiles, type Tile } from "@/components/sections/Tiles";
import { TrustBand } from "@/components/sections/TrustBand";
import { shoot } from "@/lib/photos";
import { reviews } from "@/lib/reviews";
import { site, siteUrl } from "@/lib/site";

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
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.contact.geo.lat,
    longitude: site.contact.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Thursday", "Friday"],
      opens: "12:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "19:00",
      closes: "19:30",
    },
  ],
  acceptsReservations: true,
  sameAs: site.social.map((item) => item.href),
};

/** The six ways in, in wireframe order. */
const experiences: Tile[] = [
  {
    href: "/lunch",
    label: "Lunch",
    line: "Woensdag tot vrijdag",
    photo: { src: shoot.mei25(31), alt: "Kleurrijk voorgerecht in het zonlicht" },
  },
  {
    href: "/diner",
    label: "Diner",
    line: "Woensdag tot zaterdag",
    photo: { src: shoot.jan26(6), alt: "Hoofdgerecht met een glas rode wijn" },
  },
  {
    href: "/the-room",
    label: "The Room",
    line: "Privé, tot 20 gasten",
    photo: { src: shoot.okt25(1), alt: "De lange tafel in The Room" },
  },
  {
    href: "/events",
    label: "Events",
    line: "Van meeting tot jubileum",
    photo: { src: shoot.juni26(5), alt: "De zaal, gedekt voor een gezelschap" },
  },
  {
    href: "/trouwen",
    label: "Trouwen in CRKL",
    line: "Intiem en op maat",
    photo: { src: shoot.juni26(11), alt: "Een boeket bij het gordijn" },
  },
  {
    href: "/geschenkbox",
    label: "Geschenkbox",
    line: "CRKL om te geven",
    photo: { src: shoot.flessen, alt: "Drie flessen op een witte tafel" },
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurant).replace(/</g, "\\u003c"),
        }}
      />

      <HomeHero />
      <TrustBand />
      <Reviews reviews={reviews.home} />

      <Tiles
        id="ontdek"
        tone="brand"
        eyebrow="Mogelijkheden"
        title={"Eén huis,\n*zes* manieren om te komen"}
        tiles={experiences}
      />

      <SplitMedia
        variant="stack"
        tone="tint"
        eyebrow="De chef"
        title={"Sam, *in* de keuken"}
        body={[
          "Geniet van een culinaire lunch of diner, bereid met dagverse ingrediënten en een creatieve, moderne visie op gastronomie.",
          "In de zaal ontvangt Jolien u. Samen maken ze van CRKL een plek waar smaak, service en sfeer samenkomen.",
        ]}
        link={{ href: "/over-ons", label: "Maak kennis met de chef" }}
        photo={{ src: shoot.okt25(27), alt: "De chef werkt een gerecht af aan de pass" }}
        video={{ src: "hero/crkl-hero-keuken.mp4", poster: "hero/crkl-hero-keuken.jpg" }}
        photos={[{ src: shoot.mei25(52), alt: "Verse aardbeien in de handen van de chef" }]}
      />

      <DishBand />
      <Signature />

      <Statement
        variant="inset"
        eyebrow="Het menu"
        text={"Het menu van\n*dit seizoen*"}
        links={[{ href: "/menu", label: "Bekijk het menu van dit seizoen" }]}
        photos={[{ src: shoot.maart26(50), alt: "Vier borden van bovenaf op de houten vloer" }]}
      />

      <ReservationBand
        variant="card"
        photo={{ src: shoot.juni26(3), alt: "", focus: "50% 40%" }}
      />
      <Praktisch />
    </>
  );
}
