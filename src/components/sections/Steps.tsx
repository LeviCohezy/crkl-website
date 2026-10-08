import { Reveal } from "@/components/motion/Reveal";
import { Band, Head, tones, type Tone } from "@/components/sections/Band";
import { ArrowLink } from "@/components/ui/Button";

type StepsProps = {
  tone?: Tone;
  eyebrow?: string;
  title: string;
  /** The first three steps. */
  steps: { title: string; body: string }[];
  /** The fourth step is the call to action. */
  last: { title: string; href: string; label: string };
};

/**
 * A process in four moments along one hairline, each marked by a thin ring
 * with its number inside. The last moment is not a description but the next
 * thing to do.
 */
export function Steps({ tone = "white", eyebrow, title, steps, last }: StepsProps) {
  const t = tones[tone];
  const all = [...steps.map((step) => ({ ...step, cta: null })), { ...last, body: "", cta: last }];

  return (
    <Band tone={tone}>
      <Head tone={tone} eyebrow={eyebrow} title={title} align="center" />

      <ol className="relative mt-20 grid gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
        <span aria-hidden className={`absolute top-6 right-[12%] left-[12%] hidden border-t lg:block ${t.rule}`} />
        {all.map((step, index) => (
          <li key={step.title} className="relative lg:text-center">
            <Reveal delay={index * 0.1}>
              <span className={`ring relative z-10 inline-flex h-12 w-12 items-center justify-center font-display text-lg tabular-nums ${tone === "tint" ? "bg-petal" : "bg-mist"}`}>
                {index + 1}
              </span>
              <h3 className={`font-display mt-6 text-3xl font-light ${step.cta ? "italic" : ""}`}>{step.title}</h3>
              {step.body ? <p className={`mx-auto mt-4 max-w-xs leading-relaxed ${t.muted}`}>{step.body}</p> : null}
              {step.cta ? (
                <div className="mt-6 lg:flex lg:justify-center">
                  <ArrowLink href={step.cta.href}>{step.cta.label}</ArrowLink>
                </div>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </Band>
  );
}
