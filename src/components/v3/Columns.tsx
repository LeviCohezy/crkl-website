import type { ReactNode } from "react";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";

export type Column = {
  heading: string;
  /** Short items, each on its own hairline — or paragraphs. */
  items?: string[];
  paragraphs?: string[];
  after?: ReactNode;
};

type ColumnsProps = {
  columns: Column[];
  tone?: Tone;
  id?: string;
  /** "\n" breaks the line, *asterisks* set words in italic. */
  title?: string;
  intro?: string;
  /** Something at the end, under the columns. */
  after?: ReactNode;
};

/**
 * Words in columns, on hairlines: the use cases, the things that are taken
 * care of, the contents of a box. Small type and plenty of white — the
 * section you read after the one you looked at.
 */
export function Columns({ columns, tone = "white", id, title, intro, after }: ColumnsProps) {
  const cols = columns.length;
  const grid = cols >= 4 ? "lg:grid-cols-4" : cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  // On the pink the hairlines are white; on white they are pink.
  const rule = tone === "blush" ? "border-white" : "border-line";
  const ruleStrong = tone === "blush" ? "border-white" : "border-line-strong";

  return (
    <Section tone={tone} id={id}>
      {title ? (
        <div className="mb-20 flex flex-col gap-8 sm:mb-28 lg:flex-row lg:items-end lg:justify-between">
          <SplitText text={title} className={`${t.h2} max-w-3xl`} />
          {intro ? (
            <Reveal>
              <p className={`${t.lead} max-w-md`}>{intro}</p>
            </Reveal>
          ) : null}
        </div>
      ) : null}

      <div className={`grid gap-16 sm:grid-cols-2 sm:gap-12 ${grid}`}>
        {columns.map((column, index) => (
          <Reveal key={column.heading} delay={index * 0.08}>
            <h3 className={`${t.h3} border-t ${ruleStrong} pt-6`}>{column.heading}</h3>
            {column.items ? (
              <ul className="mt-6">
                {column.items.map((item) => (
                  <li key={item} className={`border-b ${rule} py-3 text-base sm:text-[1.0625rem]`}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {column.paragraphs ? (
              <div className={`${t.body} mt-6 space-y-5`}>
                {column.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {column.after ? <div className="mt-8">{column.after}</div> : null}
          </Reveal>
        ))}
      </div>

      {after ? <div className="mt-20 sm:mt-28">{after}</div> : null}
    </Section>
  );
}
