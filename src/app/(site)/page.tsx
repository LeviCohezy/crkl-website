import { GalleryBand } from "@/components/home/GalleryBand";
import { Hero } from "@/components/home/Hero";
import { Hosts } from "@/components/home/Hosts";
import { Manifest } from "@/components/home/Manifest";
import { SeasonScroller } from "@/components/home/SeasonScroller";
import { Statement } from "@/components/home/Statement";
import { SuppliersTeaser } from "@/components/home/SuppliersTeaser";
import { ReserveCta } from "@/components/sections/ReserveCta";
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurant).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Manifest />
      <SeasonScroller />
      <Statement />
      <Hosts />
      <GalleryBand />
      <SuppliersTeaser />
      <ReserveCta />
    </>
  );
}
