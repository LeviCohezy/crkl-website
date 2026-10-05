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
 * "Are they open tonight?" — the week day by day, the address, parking and
 * a map, tinted towards the palette so it sits in the page.
 */
export function Praktisch({
  tone = "white",
  eyebrow = "Praktisch",
  title = "Tot in\n*Roeselare*",
}: PraktischProps) {
  const t = tones[tone];

  return (
    <Band tone={tone} id="praktisch">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className={`eyebrow ${t.accent}`}>{eyebrow}</p>
          </Reveal>
          <SplitText
            text={title}
            className="font-display mt-6 text-[clamp(2.4rem,5vw,4.75rem)] leading-[1.06] font-light"
          />

          <Reveal delay={0.1}>
            <dl className={`mt-12 border-t ${t.rule}`}>
              {site.hours.week.map((day) => (
                <div
                  key={day.day}
                  className={`flex items-baseline justify-between gap-6 border-b py-3.5 ${t.rule}`}
                >
                  <dt className="font-display text-xl font-light">{day.day}</dt>
                  <dd className={`text-sm tabular-nums ${day.lunch || day.dinner ? "" : t.muted}`}>
                    {[day.lunch, day.dinner].filter(Boolean).join("  ·  ") || "Gesloten"}
                  </dd>
                </div>
              ))}
            </dl>
            <p className={`mt-5 max-w-md text-sm leading-relaxed ${t.muted}`}>
              {site.hours.note}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <p className={`eyebrow ${t.accent}`}>Adres</p>
              <p className="mt-4 leading-relaxed">
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
            </div>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <ArrowLink href={site.links.route}>Routebeschrijving</ArrowLink>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="aspect-[4/5] overflow-hidden bg-petal lg:aspect-auto lg:h-full lg:min-h-[36rem]">
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
    </Band>
  );
}
