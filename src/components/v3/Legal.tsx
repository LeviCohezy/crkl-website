import type { ReactNode } from "react";
import type { LegalSection } from "@/components/sections/LegalPage";
import { type as t, wrap } from "@/components/v3/type";
import { site } from "@/lib/site";

type LegalProps = {
  title: string;
  /** Shown as "Laatst bijgewerkt"; leave empty while the text is a draft. */
  updated?: string;
  sections: LegalSection[];
  children?: ReactNode;
};

/**
 * One template for privacy, terms, cookies and accessibility: the title,
 * the contents on hairlines, the text in a reading measure. The text is a
 * placeholder and says so — see CONTENT_TODO.md.
 */
export function Legal({ title, updated, sections, children }: LegalProps) {
  return (
    <div className="bg-cream text-ink">
      <header className={`${wrap} pt-36 pb-16 sm:pt-44 lg:pt-56`}>
        <h1 className={t.big}>{title}</h1>
        <p className={`${t.small} mt-6`}>
          {updated ? `Laatst bijgewerkt op ${updated}` : "Ontwerp — nog niet juridisch nagekeken"}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </header>

      <div className={`${wrap} grid gap-16 pb-32 sm:pb-40 lg:grid-cols-12 lg:gap-8`}>
        <nav aria-label="Op deze pagina" className="lg:col-span-3">
          <ol className="border-t border-line text-[0.9375rem] lg:sticky lg:top-36">
            {sections.map((section, index) => (
              <li key={section.id} className="border-b border-line">
                <a href={`#${section.id}`} className="flex gap-4 py-3 tabular-nums">
                  <span className="text-stone">{index + 1}</span>
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl lg:col-span-7 lg:col-start-5">
          <p className={`${t.small} border border-line-strong p-6`}>
            Deze tekst is een voorlopige versie en heeft geen juridische waarde. De definitieve versie volgt.
            Vragen? Mail naar{" "}
            <a href={`mailto:${site.contact.email}`} className="link-line text-ink">
              {site.contact.email}
            </a>
            .
          </p>
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-36 pt-16">
              <h2 className={t.h3}>
                <span className="mr-4 text-stone tabular-nums">{index + 1}</span>
                {section.title}
              </h2>
              <div className={`${t.body} mt-6 space-y-5`}>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
