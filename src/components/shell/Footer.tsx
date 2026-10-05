import { TransitionLink } from "@/components/shell/PageTransition";
import { site } from "@/lib/site";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-cream/55">{title}</p>
      <div className="mt-6 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function Footer() {
  const open = site.hours.week.filter((day) => day.lunch || day.dinner);

  return (
    <footer className="bg-ink pb-14 text-cream sm:pb-0">
      <div className="mx-auto max-w-[100rem] px-6 py-20 sm:px-10 sm:py-28">
        <p className="font-display max-w-2xl text-3xl leading-snug font-light sm:text-4xl">
          Waar verfijning en beleving centraal staan.
        </p>

        <div className="mt-16 grid gap-12 border-t border-cream/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
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

          <Column title="Openingsuren">
            <dl className="space-y-1.5">
              {open.map((day) => (
                <div key={day.day} className="flex justify-between gap-6 tabular-nums">
                  <dt>{day.day}</dt>
                  <dd className="text-cream/75">
                    {[day.lunch, day.dinner].filter(Boolean).join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Column>

          <Column title="Ontdek">
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
            <ul className="mt-6 flex gap-5">
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

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 text-xs text-cream/55 lg:flex-row lg:items-center lg:justify-between">
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
