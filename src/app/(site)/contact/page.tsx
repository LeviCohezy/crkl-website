import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { RotatingBadge } from "@/components/motion/RotatingBadge";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { ReserveCta } from "@/components/sections/ReserveCta";
import { PillLink } from "@/components/ui/Button";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "CRKL, Diksmuidsesteenweg 351a, 8800 Roeselare. Adres, openingsuren, route en contact.",
  alternates: { canonical: "/contact" },
};

const mapQuery = encodeURIComponent(
  `${site.name} restaurant, ${site.contact.street}, ${site.contact.city}`,
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={"Tot in\n*Roeselare*"}
        intro="Dankzij onze centrale ligging in Roeselare en ruime parkeermogelijkheden is het restaurant vlot bereikbaar."
        image={{
          src: shoot.dec25(20),
          alt: "Tafel bij het raam, onder de bollamp",
        }}
        shape="arch"
        badge="Kom langs"
      />

      <section className="overflow-hidden bg-mist py-28 sm:py-36">
        <div className="mx-auto grid max-w-[100rem] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24">
          {/* The map, in a circle, tinted to the palette. */}
          <Reveal className="relative mx-auto w-full max-w-[36rem]">
            <div className="aspect-square overflow-hidden rounded-full bg-petal">
              <iframe
                title="Kaart met de ligging van CRKL"
                src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-tint h-full w-full scale-[1.15] border-0"
              />
            </div>
            <div className="pointer-events-none absolute -top-6 -right-2 h-28 w-28 text-rosewood sm:h-36 sm:w-36">
              <RotatingBadge text="Diksmuidsesteenweg 351a" className="h-full w-full" />
            </div>
          </Reveal>

          <div className="grid gap-12 sm:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-rosewood">Adres</p>
              <p className="font-display mt-5 text-3xl leading-snug font-light">
                {site.contact.street}
                <br />
                {site.contact.city}
              </p>
              <div className="mt-7">
                <PillLink href={site.links.route}>Route</PillLink>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="eyebrow text-rosewood">Bereik ons</p>
              <p className="font-display mt-5 text-3xl leading-snug font-light">
                <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                  {site.contact.phone}
                </a>
              </p>
              <p className="mt-2">
                <a href={`mailto:${site.contact.email}`} className="link-line">
                  {site.contact.email}
                </a>
              </p>
              <p className="mt-5 flex gap-5 text-sm">
                {site.social.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-line"
                  >
                    {item.label}
                  </a>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.16} className="sm:col-span-2">
              <p className="eyebrow text-rosewood">Openingsuren</p>
              <dl className="mt-5 grid gap-6 border-t border-ink/15 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-stone">Lunch · {site.hours.lunch.days}</dt>
                  <dd className="font-display mt-1 text-3xl font-light">
                    {site.hours.lunch.hours}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-stone">Diner · {site.hours.dinner.days}</dt>
                  <dd className="font-display mt-1 text-3xl font-light">
                    {site.hours.dinner.hours}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
                {site.hours.closed}. {site.hours.note}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-petal py-28 sm:py-36">
        <div className="mx-auto grid max-w-[100rem] gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-rosewood">Schrijf ons</p>
            <h2 className="font-display mt-6 text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.06] font-light">
              Een vraag, een <em>idee</em>, een feest
            </h2>
            <p className="mt-6 max-w-xs leading-relaxed text-ink-soft">
              Voor een tafel gebruikt u het snelst het reservatieformulier.
            </p>
            <div className="mt-8">
              <PillLink href="/reserveren">Reserveren</PillLink>
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm kind="contact" />
          </div>
        </div>
      </section>

      <ReserveCta />
    </>
  );
}
