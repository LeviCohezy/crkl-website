import { Eyebrow, Ring, Square } from "@/components/motion/Accents";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Band, tones, type Tone } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

const mapQuery = encodeURIComponent(
  `${site.name} restaurant, ${site.contact.street}, ${site.contact.city}`,
);

type PraktischProps = {
  tone?: Tone;
  eyebrow?: string;
  title?: string;
};

/**
 * "Are they open tonight?" — the week day by day in a thin frame, the
 * address and parking beside it, and the map with a slipped frame of its
 * own, tinted towards the palette.
 */
export function Praktisch({ tone = "white", eyebrow = "Praktisch", title = "Tot in\n*Roeselare*" }: PraktischProps) {
  const t = tones[tone];

  return (
    <Band tone={tone} id="praktisch">
      <Ring className="-top-16 right-[30%] h-56 w-56" dot={160} />
      <div className="grid gap-20 sm:gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow className={t.accent}>{eyebrow}</Eyebrow>
          </Reveal>
          <SplitText
            text={title}
            className="font-display mt-6 text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.06] font-light"
          />

          <Reveal delay={0.1} className="glass mt-12 p-8">
            <dl>
              {site.hours.week.map((day, index) => (
                <div
                  key={day.day}
                  className={`flex items-baseline justify-between gap-6 py-4 sm:py-3 ${index ? `border-t ${t.rule}` : ""}`}
                >
                  <dt className="font-display text-xl font-light">{day.day}</dt>
                  <dd className={`text-sm tabular-nums ${day.lunch || day.dinner ? "" : t.muted}`}>
                    {[day.lunch, day.dinner].filter(Boolean).join("  ·  ") || "Gesloten"}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={`mt-5 max-w-md text-sm leading-relaxed ${t.muted}`}>{site.hours.note}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.2} className="grid gap-14 sm:grid-cols-2 sm:gap-10">
            <div>
              <p className={`eyebrow ${t.accent}`}>Adres</p>
              <p className="font-display mt-4 text-2xl leading-snug font-light">
                {site.contact.street}
                <br />
                {site.contact.city}
              </p>
              <p className="mt-3">
                <a href={`tel:${site.contact.phoneHref}`} className="link-line tabular-nums">
                  {site.contact.phone}
                </a>
              </p>
            </div>
            <div>
              <p className={`eyebrow ${t.accent}`}>Parkeren</p>
              <p className={`mt-4 leading-relaxed ${t.muted}`}>
                Centraal gelegen in Roeselare, met ruime parkeermogelijkheden.
              </p>
              <div className="mt-5">
                <ArrowLink href={site.links.route}>Routebeschrijving</ArrowLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="relative mt-16 sm:mt-12">
            <Square className="-right-5 -bottom-5 h-full w-full" />
            <div className="relative aspect-[16/10] overflow-hidden bg-petal">
              <iframe
                title="Kaart met de ligging van CRKL"
                src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-tint h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Band>
  );
}
