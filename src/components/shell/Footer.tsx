import { TransitionLink } from "@/components/shell/PageTransition";
import { site } from "@/lib/site";

const LETTERS = ["C", "R", "K", "L"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-blush-deep text-cream">
      <div className="mx-auto max-w-[100rem] px-6 pt-20 sm:px-10 sm:pt-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow text-cream/80">Bezoek</p>
            <p className="font-display mt-5 text-2xl leading-snug font-light">
              {site.contact.street}
              <br />
              {site.contact.city}
            </p>
            <a
              href={site.links.route}
              target="_blank"
              rel="noreferrer noopener"
              className="link-line mt-4 inline-block text-sm"
            >
              Routebeschrijving
            </a>
          </div>

          <div>
            <p className="eyebrow text-cream/80">Openingsuren</p>
            <dl className="mt-5 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="text-cream/80">Lunch · {site.hours.lunch.days}</dt>
                <dd className="font-display text-xl font-light">
                  {site.hours.lunch.hours}
                </dd>
              </div>
              <div>
                <dt className="text-cream/80">Diner · {site.hours.dinner.days}</dt>
                <dd className="font-display text-xl font-light">
                  {site.hours.dinner.hours}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="eyebrow text-cream/80">Ontdek</p>
            <ul className="mt-5 space-y-2 text-sm">
              {site.nav.slice(1).map((item) => (
                <li key={item.href}>
                  <TransitionLink href={item.href} className="link-line">
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
              <li>
                <TransitionLink href="/reserveren" className="link-line">
                  Reserveren
                </TransitionLink>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-cream/80">Contact</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="link-line">
                  {site.contact.email}
                </a>
              </li>
              {site.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-line"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.links.giftVoucher}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-line"
                >
                  Cadeaubon
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* The hero's four letters again, closing the page as it opened. */}
        <div
          aria-hidden
          className="font-display mt-16 grid grid-cols-4 text-center text-[24vw] leading-[0.78] font-light text-cream/60 select-none sm:mt-24"
        >
          {LETTERS.map((letter) => (
            <span key={letter} className="outline-text">
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className="relative border-t border-cream/25">
        <div className="mx-auto flex max-w-[100rem] flex-col gap-3 px-6 py-6 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.contact.vat}
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <a href={site.links.michelin} target="_blank" rel="noreferrer noopener" className="link-line">
              Michelin Guide
            </a>
            <a href={site.links.gaultMillau} target="_blank" rel="noreferrer noopener" className="link-line">
              Gault&amp;Millau
            </a>
            <span>Fotografie · HABLAR</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
