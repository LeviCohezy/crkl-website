import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Band } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";

type StatementProps = {
  eyebrow?: string;
  /** "\n" breaks the line, *asterisks* set a word in italic. */
  text: string;
  links?: { href: string; label: string }[];
};

/**
 * The one dark band on a page: a single message in large type, nothing
 * beside it, and at most a quiet link underneath.
 */
export function Statement({ eyebrow, text, links }: StatementProps) {
  return (
    <Band tone="dark">
      <div className="mx-auto max-w-5xl text-center">
        {eyebrow ? (
          <Reveal>
            <p className="eyebrow text-blush">{eyebrow}</p>
          </Reveal>
        ) : null}
        <SplitText
          text={text}
          className={`font-display text-[clamp(2.4rem,6vw,6rem)] leading-[1.06] font-light ${
            eyebrow ? "mt-8" : ""
          }`}
        />
        {links ? (
          <Reveal delay={0.25} className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-6">
            {links.map((link) => (
              <ArrowLink key={link.href} href={link.href} tone="light">
                {link.label}
              </ArrowLink>
            ))}
          </Reveal>
        ) : null}
      </div>
    </Band>
  );
}
