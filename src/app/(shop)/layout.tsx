import type { ReactNode } from "react";
import { TransitionLink } from "@/components/shell/PageTransition";
import { site } from "@/lib/site";

/**
 * The checkout tunnel. No navigation and no cart link — nothing here leads
 * off the page except the logo, the phone number and the legal links.
 */
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-ink/10 bg-cream text-ink">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-6 sm:px-10 lg:h-20">
          <TransitionLink href="/" aria-label="CRKL — naar de startpagina">
            <span
              aria-hidden
              className="font-display grid grid-cols-2 place-items-center gap-x-1.5 gap-y-0.5 text-[0.9375rem] leading-none"
            >
              <span>C</span>
              <span>R</span>
              <span>K</span>
              <span>L</span>
            </span>
          </TransitionLink>
          <a href={`tel:${site.contact.phoneHref}`} className="link-line pb-1 text-sm tabular-nums">
            {site.contact.phone}
          </a>
        </div>
      </header>

      <main className="flex-1 bg-cream text-ink">{children}</main>

      <footer className="border-t border-ink/10 bg-cream text-ink-soft">
        <ul className="mx-auto flex max-w-[100rem] flex-wrap gap-x-6 gap-y-2 px-6 py-6 text-xs sm:px-10">
          {site.legal.map((item) => (
            <li key={item.href}>
              <TransitionLink href={item.href} className="link-line">
                {item.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}
