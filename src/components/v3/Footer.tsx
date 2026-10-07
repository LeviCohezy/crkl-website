import { Hollow } from "@/components/motion/Accents";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/shell/PageTransition";
import { type as t, wrap } from "@/components/v3/type";
import { site } from "@/lib/site";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-6">
      <p className="text-sm text-stone">{title}</p>
      <div className="mt-5 text-[0.9375rem] leading-relaxed">{children}</div>
    </div>
  );
}

/**
 * White, with the name of the house as large as the screen allows — the
 * only place the letters are shown outlined. Underneath: where, when, and
 * the rest of the site, each column on its own hairline.
 */
export function Footer() {
  const open = site.hours.week.filter((day) => day.lunch || day.dinner);

  return (
    <footer className="relative overflow-hidden bg-cream pb-28 text-ink sm:pb-0">
      <div className={`${wrap} pt-32 pb-16 sm:pt-40`}>
        <Reveal>
          <p className="flex items-end justify-between gap-8">
            <Hollow className="block text-[clamp(5rem,21vw,21rem)] leading-[0.8] tracking-[-0.02em]">
              CRKL
            </Hollow>
            <span className={`${t.small} hidden max-w-[14rem] pb-3 text-right sm:block`}>
              Gastronomisch restaurant
              <br />
              Roeselare
            </span>
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <Column title="Bezoek">
            <p>
              {site.contact.street}
              <br />
              {site.contact.city}
            </p>
            <p className="mt-4">
              <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                {site.contact.phone}
              </a>
              <br />
              <a href={`mailto:${site.contact.email}`} className="link-line">
                {site.contact.email}
              </a>
            </p>
            <p className="mt-4">
              <a href={site.links.route} target="_blank" rel="noreferrer noopener" className="link-line">
                Routebeschrijving
              </a>
            </p>
          </Column>

          <Column title="Open">
            <dl className="space-y-1.5 text-sm">
              {open.map((day) => (
                <div key={day.day} className="flex justify-between gap-4 tabular-nums">
                  <dt>{day.day}</dt>
                  <dd className="text-ink-soft whitespace-nowrap">{[day.lunch, day.dinner].filter(Boolean).join(" · ")}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-stone">{site.hours.note}</p>
          </Column>

          <Column title="Het huis">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {[...site.nav, ...site.more].map((item) => (
                <li key={item.href}>
                  <TransitionLink href={item.href} className="link-line">
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Erkenning">
            <ul className="space-y-1.5">
              {site.credentials.map((item) => (
                <li key={item.href}>
                  <TransitionLink href={item.href} className="link-line">
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
              <li>
                <a href={site.links.michelin} target="_blank" rel="noreferrer noopener" className="link-line">
                  Michelin Guide
                </a>
              </li>
              <li>
                <a href={site.links.gaultMillau} target="_blank" rel="noreferrer noopener" className="link-line">
                  Gault&amp;Millau
                </a>
              </li>
            </ul>
            <ul className="mt-5 flex gap-5">
              {site.social.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer noopener" className="link-line">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-xs text-stone lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.contact.vat} · Fotografie HABLAR
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.legal.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className="link-line">
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
