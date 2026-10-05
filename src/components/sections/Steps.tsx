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
 * A process in four moments along one hairline. The last moment is not a
 * description but the next thing to do.
 */
export function Steps({ tone = "white", eyebrow, title, steps, last }: StepsProps) {
  const t = tones[tone];

  return (
    <Band tone={tone}>
      <Head tone={tone} eyebrow={eyebrow} title={title} />

      <ol className={`mt-16 grid gap-x-8 gap-y-12 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4 ${t.rule}`}>
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 0.08}>
              <p className={`font-display text-xl tabular-nums ${t.accent}`}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-5 text-3xl font-light">{step.title}</h3>
              <p className={`mt-4 leading-relaxed ${t.muted}`}>{step.body}</p>
            </Reveal>
          </li>
        ))}
        <li>
          <Reveal delay={steps.length * 0.08}>
            <p className={`font-display text-xl tabular-nums ${t.accent}`}>
              {String(steps.length + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display mt-5 text-3xl font-light italic">{last.title}</h3>
            <div className="mt-7">
              <ArrowLink href={last.href}>{last.label}</ArrowLink>
            </div>
          </Reveal>
        </li>
      </ol>
    </Band>
  );
}
