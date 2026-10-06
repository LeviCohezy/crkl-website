import { Reveal } from "@/components/motion/Reveal";
import { Band } from "@/components/sections/Band";
import { TransitionLink } from "@/components/shell/PageTransition";
import { site } from "@/lib/site";

/**
 * Credibility in one quiet line: the two credentials, each linking to its
 * page, and the Google rating once the real figure is filled in.
 */
export function TrustBand() {
  const { googleRating, googleReviews } = site.links;

  return (
    <Band tone="tint" compact>
      <Reveal>
        <ul className="flex flex-col items-center justify-center gap-x-14 gap-y-4 text-center md:flex-row">
          {site.credentials.map((item, index) => (
            <li key={item.href} className="flex items-center gap-x-14">
              {index > 0 ? (
                <span aria-hidden className="ring hidden h-2 w-2 md:block" />
              ) : null}
              <TransitionLink href={item.href} className="eyebrow link-line pb-1.5">
                {item.label}
              </TransitionLink>
            </li>
          ))}
          <li className="flex items-center gap-x-14">
            <span aria-hidden className="ring hidden h-2 w-2 md:block" />
            {googleRating ? (
              <a
                href={googleReviews}
                target="_blank"
                rel="noreferrer noopener"
                className="eyebrow link-line pb-1.5"
              >
                {googleRating} · Google reviews
              </a>
            ) : (
              <a
                href={site.links.michelin}
                target="_blank"
                rel="noreferrer noopener"
                className="eyebrow link-line pb-1.5"
              >
                Michelin Guide · Gault&amp;Millau
              </a>
            )}
          </li>
        </ul>
      </Reveal>
    </Band>
  );
}
