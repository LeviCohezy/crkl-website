import type { ReactNode } from "react";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import { Form, type FormProps } from "@/components/v3/Form";
import { Section, type Tone } from "@/components/v3/Section";
import { type as t } from "@/components/v3/type";
import { InlineLink } from "@/components/v3/Links";
import { site } from "@/lib/site";

type FormSectionProps = {
  id?: string;
  tone?: Tone;
  /** "\n" breaks the line, *asterisks* set words in italic. */
  title: string;
  intro?: string;
  /** Something between the title and the form on the left — figures, a line. */
  before?: ReactNode;
  form: FormProps;
  /** Show hours and phone under the title. */
  practical?: boolean;
};

/**
 * The form at the end of the page: the title and what to know on the left,
 * the fields on the right, a lot of air between the two. Contact on most
 * pages; The Room, Events and Trouwen ask for a date first.
 */
export function FormSection({ id, tone = "white", title, intro, before, form, practical = true }: FormSectionProps) {
  return (
    <Section id={id} tone={tone}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SplitText text={title} className={t.h2} />
          {intro ? (
            <Reveal delay={0.1}>
              <p className={`${t.lead} mt-8 max-w-md`}>{intro}</p>
            </Reveal>
          ) : null}
          {before ? <div className="mt-12">{before}</div> : null}
          {practical ? (
            <Reveal delay={0.2}>
              <dl className="mt-14 grid max-w-md grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 text-[0.9375rem] leading-relaxed">
                <div>
                  <dt className="text-stone">Lunch</dt>
                  <dd>
                    {site.hours.lunch.days}
                    <br />
                    {site.hours.lunch.hours}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone">Diner</dt>
                  <dd>
                    {site.hours.dinner.days}
                    <br />
                    {site.hours.dinner.hours}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone">Een tafel</dt>
                  <dd>
                    <InlineLink href="/reserveren">Reserveer online</InlineLink>
                  </dd>
                </div>
                <div>
                  <dt className="text-stone">Liever bellen?</dt>
                  <dd>
                    <a href={`tel:${site.contact.phoneHref}`} className="link-line">
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <Form {...form} />
        </Reveal>
      </div>
    </Section>
  );
}
