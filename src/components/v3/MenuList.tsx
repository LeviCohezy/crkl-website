import type { ReactNode } from "react";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import { formatPrice } from "@/lib/format";
import { menuTab, type MenuGroup, type MenuTab } from "@/lib/menu";

function Group({ group, large }: { group: MenuGroup; large: boolean }) {
  return (
    <div>
      <h3 className={large ? t.h2 : t.h3}>{group.name}</h3>
      {group.intro ? <p className={`${t.body} mt-4 max-w-md`}>{group.intro}</p> : null}

      {group.courses.length > 0 ? (
        <ul className="mt-10 space-y-6">
          {group.courses.map((course) => (
            <li key={course.name}>
              <p className="font-display text-xl font-light">{course.name}</p>
              <p className={`${t.small} mt-1`}>
                {course.line}
                {course.allergens?.length ? ` · ${course.allergens.join(", ")}` : ""}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="mt-8 border-t border-line">
        {group.lines.map((line) => (
          <li key={line.label} className="flex items-baseline gap-4 border-b border-line py-4">
            <span className="text-base sm:text-[1.0625rem]">
              {line.label}
              {line.note ? <span className="text-stone"> · {line.note}</span> : null}
            </span>
            <span aria-hidden className="leader" />
            <span className="font-display text-xl font-light whitespace-nowrap tabular-nums sm:text-2xl">
              {line.supplement ? "+ " : ""}
              {formatPrice(line.priceCents)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type MenuListProps = {
  tabs: MenuTab["id"][];
  tone?: Tone;
  id?: string;
  /** "\n" breaks the line, *asterisks* set words in italic. */
  title: string;
  intro?: string;
  /** Hours, links — anything that belongs beside the menu. */
  aside?: ReactNode;
  /** `sticky`: title and aside hold on the left while the menu scrolls past. */
  layout?: "sticky" | "stack";
};

/**
 * The menu as text, with prices on hairline leaders — HTML, never a PDF,
 * so a search engine reads it as well as a guest. The groups come straight
 * from src/lib/menu.ts; when the courses are filled in there they appear
 * above the prices.
 */
export function MenuList({
  tabs,
  tone = "white",
  id,
  title,
  intro,
  aside,
  layout = "sticky",
}: MenuListProps) {
  const groups = tabs.flatMap((tab) => {
    const data = menuTab(tab);
    return data.groups.map((group) => ({ group, when: data.when }));
  });
  const whens = Array.from(new Set(groups.map((item) => item.when)));

  return (
    <Section tone={tone} id={id}>
      <div className={layout === "sticky" ? "grid gap-16 lg:grid-cols-12 lg:gap-8" : ""}>
        <div className={layout === "sticky" ? "lg:col-span-5" : "max-w-3xl"}>
          <div className={layout === "sticky" ? "lg:sticky lg:top-36" : ""}>
            <SplitText text={title} className={t.h2} />
            {whens.length === 1 ? <p className={`${t.small} mt-5`}>{whens[0]}</p> : null}
            {intro ? (
              <Reveal delay={0.1}>
                <p className={`${t.lead} mt-8 max-w-md`}>{intro}</p>
              </Reveal>
            ) : null}
            {aside ? (
              <Reveal delay={0.2}>
                <div className="mt-12">{aside}</div>
              </Reveal>
            ) : null}
          </div>
        </div>

        <div
          className={`${
            layout === "sticky" ? "lg:col-span-6 lg:col-start-7" : "mt-20 grid gap-20 sm:mt-24 lg:grid-cols-2 lg:gap-16"
          } space-y-20 sm:space-y-24 lg:space-y-0`}
        >
          {groups.map(({ group, when }, index) => (
            <Reveal key={group.name} delay={index * 0.05} className={layout === "sticky" && index > 0 ? "lg:mt-24" : ""}>
              {whens.length > 1 ? <p className={`${t.small} mb-4`}>{when}</p> : null}
              <Group group={group} large={layout === "sticky"} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
