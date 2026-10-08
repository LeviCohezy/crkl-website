"use client";

import type { ReactNode } from "react";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { type as t, wrap } from "@/components/v3/type";
import { useIntroDone } from "@/lib/intro";

/**
 * The opening of the pages that are tools rather than stories — the shop,
 * the cart, the account: a title, a line, and straight on to the content.
 */
export function PageTitle({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  const ready = useIntroDone();
  return (
    <section className={`${wrap} pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-56`}>
      <SplitText as="h1" text={title} immediate ready={ready} delay={0.25} className={`${t.big} max-w-[16ch]`} />
      {lead ? (
        <Reveal delay={0.6}>
          <p className={`${t.lead} mt-10 max-w-md`}>{lead}</p>
        </Reveal>
      ) : null}
      {children ? (
        <Reveal delay={0.7}>
          <div className="mt-16 sm:mt-20">{children}</div>
        </Reveal>
      ) : null}
    </section>
  );
}
