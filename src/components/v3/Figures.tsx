import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { type as t } from "@/components/v3/type";

export type Figure = { n: number; unit: string; line: string };

/** A row of large numbers that count up the first time they are seen. */
export function Figures({ figures, className = "" }: { figures: Figure[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-10 lg:grid-cols-4 ${className}`}>
      {figures.map((item, index) => (
        <Reveal key={item.unit} delay={index * 0.08}>
          <dt className={`${t.big} tabular-nums`}>
            <CountUp value={item.n} />
          </dt>
          <dd className="mt-3">
            <span className="block text-base">{item.unit}</span>
            <span className={`${t.small} mt-1 block`}>{item.line}</span>
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
