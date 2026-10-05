import type { Metadata } from "next";
import { MediaImage } from "@/components/media/MediaImage";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PageHero } from "@/components/sections/PageHero";
import { PillLink } from "@/components/ui/Button";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reserveren",
  description:
    "Reserveer uw tafel bij CRKL in Roeselare. Lunch van woensdag tot vrijdag, diner van woensdag tot zaterdag.",
  alternates: { canonical: "/reserveren" },
};

export default function ReservePage() {
  return (
    <>
      <PageHero
        eyebrow="Reserveren"
        title={"Uw\n*tafel*"}
        intro="Lunch van woensdag tot vrijdag, diner van woensdag tot zaterdag. Vertel ons wanneer u komt; wij zorgen voor de rest."
        image={{
          src: shoot.juli26(54),
          alt: "Ronde tafel op het okeren tapijt",
        }}
        badge="Welkom"
      />

      <section className="bg-mist py-28 sm:py-36">
        <div className="mx-auto grid max-w-[100rem] gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-rosewood">Openingsuren</p>
              <dl className="mt-8 space-y-7">
                <div>
                  <dt className="text-sm text-stone">Lunch · {site.hours.lunch.days}</dt>
                  <dd className="font-display mt-1 text-4xl font-light">
                    {site.hours.lunch.hours}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-stone">Diner · {site.hours.dinner.days}</dt>
                  <dd className="font-display mt-1 text-4xl font-light">
                    {site.hours.dinner.hours}
                  </dd>
                </div>
              </dl>
              <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink-soft">
                {site.hours.closed}. {site.hours.note}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 border-t border-ink/15 pt-8">
              <p className="eyebrow text-rosewood">Liever rechtstreeks</p>
              <p className="font-display mt-5 text-3xl font-light">
                <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                  {site.contact.phone}
                </a>
              </p>
              <p className="mt-2">
                <a href={`mailto:${site.contact.email}`} className="link-line">
                  {site.contact.email}
                </a>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.06] font-light">
                Vraag uw tafel <em>aan</em>
              </h2>
            </Reveal>
            <div className="mt-12">
              <EnquiryForm kind="reservatie" />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Room ─────────────────────────────────────────────────── */}
      <section id="the-room" className="overflow-hidden bg-petal py-28 sm:py-40">
        <div className="mx-auto grid max-w-[100rem] items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24">
          <Unveil>
            <Parallax className="aspect-[4/5]" amount={7}>
              <MediaImage
                src={shoot.okt25(1)}
                alt="De lange tafel in The Room"
                aspect="h-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Parallax>
          </Unveil>
          <div>
            <Reveal>
              <p className="eyebrow text-rosewood">Groepen &amp; events</p>
            </Reveal>
            <SplitText
              text={"The *Room*"}
              className="font-display mt-6 text-[clamp(3rem,7vw,7rem)] leading-[1] font-light"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
                Ook voor privédiners, meetings en events kan u terecht in onze
                exclusieve ruimte. Ze biedt plaats aan tot 20 personen en is
                uitgerust met audiovisueel materiaal.
              </p>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                Voor communies, verjaardagen, jubilea, babyborrels en
                kleinschalige huwelijksfeesten.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10">
              <PillLink
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Informatie aanvragen over The Room | CRKL")}`}
              >
                Vraag informatie aan
              </PillLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Cadeaubon ────────────────────────────────────────────────── */}
      <section id="cadeaubon" className="bg-blush py-28 text-center text-white sm:py-40">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="eyebrow">Cadeaubon</p>
          </Reveal>
          <SplitText
            text={"Schenk een avond\n*aan tafel*"}
            className="font-display mt-6 text-[clamp(2.6rem,7vw,6.5rem)] leading-[1.02] font-light"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-md leading-relaxed">
              Met de CRKL cadeaubon schenkt u een verfijnde culinaire ervaring,
              perfect voor elke gelegenheid. De waarde kiest u volledig zelf en
              de bon is één jaar geldig.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex justify-center">
            <PillLink href={site.links.giftVoucher} tone="light">
              Bestel een cadeaubon
            </PillLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
