import type { Metadata } from "next";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Faq } from "@/components/sections/Faq";
import { FormBand } from "@/components/sections/FormBand";
import { Praktisch } from "@/components/sections/Praktisch";
import { ArrowLink } from "@/components/ui/Button";
import { faq } from "@/lib/faq";
import { reserveHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "CRKL, Diksmuidsesteenweg 351a, 8800 Roeselare. Adres, openingsuren per dag, route en contact.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-cream pt-36 pb-20 text-ink lg:pt-44">
        <div className="mx-auto max-w-[100rem] px-7 sm:px-10">
          <p className="eyebrow text-stone">Contact</p>
          <SplitText
            as="h1"
            text={"Tot\n*binnenkort*"}
            immediate
            delay={0.4}
            className="font-display mt-7 text-[clamp(3.25rem,8.2vw,8.5rem)] leading-[0.98] font-light"
          />
          <Reveal delay={0.4}>
            <p className="mt-9 max-w-md text-lg leading-relaxed text-ink-soft">
              Dankzij onze centrale ligging in Roeselare en ruime
              parkeermogelijkheden is het restaurant vlot bereikbaar.
            </p>
          </Reveal>
        </div>
      </section>

      <Praktisch tone="tint" eyebrow="Bereikbaarheid" title={"Waar & *wanneer*"} />

      <FormBand
        id="bericht"
        eyebrow="Schrijf ons"
        title={"Een vraag,\n*een idee*"}
        intro={`Of bel ons op ${site.contact.phone}.`}
        before={
          <p className="flex flex-wrap items-baseline gap-x-6 gap-y-3 border-b border-line-strong pb-8">
            <span className="font-display text-2xl font-light">Wilt u een tafel?</span>
            <ArrowLink href={reserveHref("/contact")}>Reserveer hier</ArrowLink>
          </p>
        }
        form={{ kind: "contact", submitLabel: "Stuur bericht" }}
      />

      <Faq items={faq.contact} />
    </>
  );
}
