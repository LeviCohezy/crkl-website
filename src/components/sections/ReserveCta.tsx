import { MediaImage } from "@/components/media/MediaImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { Drift } from "@/components/motion/Parallax";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { RotatingBadge } from "@/components/motion/RotatingBadge";
import { TransitionLink } from "@/components/shell/PageTransition";
import { shoot } from "@/lib/photos";
import { site } from "@/lib/site";

/**
 * The closing invitation on every page: one line, the hours, and a round
 * button inside a turning ring of type that leans towards the pointer.
 */
export function ReserveCta() {
  return (
    <section className="relative overflow-hidden bg-blush py-28 text-white sm:py-40">
      {/* Two plates drifting at the edges, cropped by the section. */}
      <Drift distance={90} className="absolute top-10 -left-[16vw] hidden w-[32vw] opacity-90 md:block">
        <MediaImage
          src={shoot.jan26(1)}
          alt=""
          aspect="aspect-square"
          className="rounded-full"
          sizes="32vw"
        />
      </Drift>
      <Drift distance={-70} className="absolute -right-[10vw] bottom-6 hidden w-[22vw] opacity-90 md:block">
        <MediaImage
          src={shoot.maart26(47)}
          alt=""
          aspect="aspect-square"
          className="rounded-full"
          sizes="22vw"
        />
      </Drift>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Reveal>
          <p className="eyebrow">Reserveren</p>
        </Reveal>
        <SplitText
          text={"Schuif mee\n*aan tafel*"}
          className="font-display mt-6 text-[clamp(3rem,9vw,8rem)] leading-[1] font-light"
        />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md leading-relaxed text-white/95">
            Lunch van {site.hours.lunch.days.toLowerCase()}, diner van{" "}
            {site.hours.dinner.days.toLowerCase()}. We ontvangen u graag.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-14">
          <Magnetic strength={0.3}>
            <TransitionLink
              href="/reserveren"
              data-cursor=""
              className="group relative flex h-44 w-44 items-center justify-center rounded-full sm:h-52 sm:w-52"
            >
              <RotatingBadge
                text="Reserveer uw tafel"
                className="absolute inset-0 h-full w-full"
              />
              <span className="eyebrow flex h-[58%] w-[58%] items-center justify-center rounded-full bg-white text-ink transition-transform duration-700 ease-expo group-hover:scale-110">
                Reserveer
              </span>
            </TransitionLink>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-12 text-sm text-white/95">
            Liever telefonisch?{" "}
            <a href={`tel:${site.contact.phoneHref}`} className="link-line">
              {site.contact.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
