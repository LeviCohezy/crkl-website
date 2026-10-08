import { MediaImage } from "@/components/media/MediaImage";
import { Reveal, SplitText, Unveil } from "@/components/motion/Reveal";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import type { Photo } from "@/lib/photos";

export type Person = { name: string; role: string; line: string; photo: Photo };

type TeamProps = {
  people: Person[];
  tone?: Tone;
  id?: string;
  title: string;
  intro?: string;
};

/**
 * Portraits in a row at three heights, the name and the role under each on
 * a hairline. Each one uncovers from its bottom edge as it is seen.
 */
export function Team({ people, tone = "white", id, title, intro }: TeamProps) {
  const offsets = ["lg:mt-0", "lg:mt-32", "lg:mt-12"];

  return (
    <Section tone={tone} id={id}>
      <div className="mb-20 flex flex-col gap-8 sm:mb-28 lg:flex-row lg:items-end lg:justify-between">
        <SplitText text={title} className={`${t.h2} max-w-3xl`} />
        {intro ? (
          <Reveal>
            <p className={`${t.lead} max-w-md`}>{intro}</p>
          </Reveal>
        ) : null}
      </div>

      <ul className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person, index) => (
          <li key={person.name} className={offsets[index % offsets.length]}>
            <Unveil delay={index * 0.08}>
              <MediaImage
                src={person.photo.src}
                alt={person.photo.alt}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                focus={person.photo.focus}
              />
            </Unveil>
            <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-line pb-4">
              <h3 className={t.h3}>{person.name}</h3>
              <p className={t.small}>{person.role}</p>
            </div>
            <p className={`${t.body} mt-4`}>{person.line}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
