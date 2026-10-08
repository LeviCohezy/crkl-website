import { Reveal, SplitText } from "@/components/motion/Reveal";
import { TextLink } from "@/components/v3/Links";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import { site } from "@/lib/site";

const mapQuery = encodeURIComponent(`${site.name}, ${site.contact.street}, ${site.contact.city}`);

/**
 * Where and when: the week as a list, the address, and a map in the
 * palette. The map is Google's embed by address — no key, but it does set
 * cookies; see CONTENT_TODO.md.
 */
export function Practical({ tone = "white", id, title = "Waar en\n*wanneer*" }: { tone?: Tone; id?: string; title?: string }) {
  return (
    <Section tone={tone} id={id}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SplitText text={title} className={t.h2} />
          <Reveal delay={0.1}>
            <dl className="mt-12 border-t border-line text-[0.9375rem] leading-relaxed sm:text-base">
              {site.hours.week.map((day) => (
                <div key={day.day} className="flex items-baseline justify-between gap-6 border-b border-line py-3 tabular-nums">
                  <dt>{day.day}</dt>
                  <dd className={day.lunch || day.dinner ? "" : "text-stone"}>
                    {[day.lunch, day.dinner].filter(Boolean).join(" · ") || "Gesloten"}
                  </dd>
                </div>
              ))}
            </dl>
            <p className={`${t.small} mt-5 max-w-md`}>{site.hours.note}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 grid gap-8 text-[0.9375rem] leading-relaxed sm:grid-cols-2">
              <div>
                <p className="text-stone">Adres</p>
                <p className="mt-2">
                  {site.contact.street}
                  <br />
                  {site.contact.city}
                </p>
                <p className="mt-3">
                  <TextLink href={site.links.route}>Routebeschrijving</TextLink>
                </p>
              </div>
              <div>
                <p className="text-stone">Contact</p>
                <p className="mt-2">
                  <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                    {site.contact.phone}
                  </a>
                  <br />
                  <a href={`mailto:${site.contact.email}`} className="link-line">
                    {site.contact.email}
                  </a>
                </p>
                <p className={`${t.small} mt-3`}>Ruime parking aan het restaurant.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="aspect-[4/5] w-full overflow-hidden bg-petal sm:aspect-[4/3] lg:aspect-[5/6]">
            <iframe
              title={`Kaart: ${site.name}, ${site.contact.street}, ${site.contact.city}`}
              src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
              className="map-tint h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
