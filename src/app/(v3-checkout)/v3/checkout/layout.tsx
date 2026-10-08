import type { ReactNode } from "react";
import { HrefPrefix, TransitionLink } from "@/components/shell/PageTransition";
import { wrap } from "@/components/v3/type";
import { site } from "@/lib/site";

/**
 * The V3 checkout tunnel: no navigation and no cart link — nothing leads
 * off the page except the wordmark, the phone number and the legal links.
 * Its own route group, so it escapes the V3 header and footer.
 */
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <HrefPrefix prefix="/v3">
      <div className="v3-scope flex min-h-svh flex-1 flex-col bg-cream">
        <header className="border-b border-line bg-cream text-ink">
          <div
            className={`${wrap} flex h-16 items-center justify-between lg:h-[4.5rem]`}
          >
            <TransitionLink
              href="/"
              aria-label="CRKL — naar de startpagina"
              className="font-display text-[1.375rem] leading-none font-light tracking-[0.06em]"
            >
              CRKL
            </TransitionLink>
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="link-line pb-1 text-[0.9375rem] tabular-nums"
            >
              {site.contact.phone}
            </a>
          </div>
        </header>

        <main className="v3 flex-1 bg-cream text-ink">{children}</main>

        <footer className="border-t border-line bg-cream text-stone">
          <ul className={`${wrap} flex flex-wrap gap-x-6 gap-y-2 py-6 text-xs`}>
            {site.legal.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className="link-line">
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </HrefPrefix>
  );
}
