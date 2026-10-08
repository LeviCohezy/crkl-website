import type { Metadata } from "next";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Reserve } from "@/components/v3/Reserve";
import { type as t, wrap } from "@/components/v3/type";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reserveer een tafel",
  description:
    "Reserveer een tafel bij CRKL in Roeselare: kies het aantal gasten, een dag en een uur, en laat uw gegevens achter. Lunch van woensdag tot vrijdag, diner van woensdag tot zaterdag.",
  alternates: { canonical: "/v3/reserveren" },
};

/**
 * One page, one job. The title and the hours on the left, the steps on
 * the right; nothing else on the page but the footer.
 */
export default function ReservePage() {
  return (
    <section className={`${wrap} pt-36 pb-32 sm:pt-44 sm:pb-40 lg:pt-52 lg:pb-56`}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SplitText as="h1" text={"Reserveer\n*een tafel*"} immediate delay={0.25} className={t.h2} />
          <Reveal delay={0.5}>
            <dl className="mt-12 grid max-w-sm grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 text-[0.9375rem] leading-relaxed">
              <div>
                <dt className="text-stone">Lunch</dt>
                <dd>
                  {site.hours.lunch.days}
                  <br />
                  {site.hours.lunch.hours}
                </dd>
              </div>
              <div>
                <dt className="text-stone">Diner</dt>
                <dd>
                  {site.hours.dinner.days}
                  <br />
                  {site.hours.dinner.hours}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-stone">Liever bellen?</dt>
                <dd>
                  <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                    {site.contact.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.4} className="lg:col-span-7 lg:col-start-6">
          <Reserve />
        </Reveal>
      </div>
    </section>
  );
}
