import type { Metadata } from "next";
import { SplitText } from "@/components/motion/Reveal";
import { Band } from "@/components/sections/Band";
import { AccountView } from "@/components/shop/AccountView";
import { ArrowLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <>
      <section className="bg-cream pt-36 pb-24 text-ink sm:pb-36 lg:pt-44">
        <div className="mx-auto max-w-[100rem] px-6 sm:px-10">
          <p className="eyebrow text-clay">Shop</p>
          <SplitText
            as="h1"
            text={"Uw *account*"}
            immediate
            delay={0.4}
            className="font-display mt-7 text-[clamp(3rem,7.4vw,7.5rem)] leading-[1] font-light"
          />
          <div className="mt-14">
            <AccountView />
          </div>
        </div>
      </section>

      <Band tone="tint" compact>
        <div className="flex flex-col items-center justify-center gap-x-12 gap-y-5 text-center md:flex-row">
          <p className="font-display text-2xl font-light">Vraag over uw bestelling?</p>
          <a href={`tel:${site.contact.phoneHref}`} className="link-line pb-1 tabular-nums">
            {site.contact.phone}
          </a>
          <ArrowLink href="/contact">Contacteer ons</ArrowLink>
        </div>
      </Band>
    </>
  );
}
