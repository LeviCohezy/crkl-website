import type { ReactNode } from "react";
import { site } from "@/lib/site";

export type LegalSection = {
  id: string;
  title: string;
  /** One string per paragraph. */
  body: string[];
};

type LegalPageProps = {
  title: string;
  /** Shown as "Laatst bijgewerkt"; leave empty while the text is a draft. */
  updated?: string;
  sections: LegalSection[];
  /** Extra controls under the title — the cookie page's preferences button. */
  children?: ReactNode;
};

/**
 * One template, four pages: privacy, terms, cookies, accessibility. A title,
 * a list of anchors that stays in view on wide screens, and the text.
 *
 * THE TEXT ON ALL FOUR IS A PLACEHOLDER, not legal copy — each page says so
 * at the top and is kept out of search engines. See CONTENT_TODO.md.
 */
export function LegalPage({ title, updated, sections, children }: LegalPageProps) {
  return (
    <div className="bg-cream text-ink">
      <header className="mx-auto max-w-[100rem] px-7 pt-40 pb-16 sm:px-10 sm:pt-36 sm:pb-14 lg:pt-44">
        <p className="eyebrow text-stone">Juridisch</p>
        <h1 className="font-display mt-7 text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] font-light">
          {title}
        </h1>
        <p className="mt-6 text-sm text-ink-soft">
          {updated ? `Laatst bijgewerkt op ${updated}` : "Ontwerp — nog niet juridisch nagekeken"}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </header>

      <div className="border-y border-line bg-petal lg:sticky lg:top-20 lg:z-30">
        <nav aria-label="Op deze pagina" className="mx-auto max-w-[100rem] px-7 sm:px-10">
          <ol className="flex flex-wrap gap-x-9 gap-y-2 py-5">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="eyebrow link-line pb-1.5">
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-3xl px-7 py-28 sm:px-10">
        <p className=" border border-dashed border-line-strong p-6 text-sm leading-relaxed text-ink-soft">
          Deze tekst is een voorlopige versie en heeft geen juridische waarde.
          De definitieve versie volgt. Vragen? Mail naar{" "}
          <a href={`mailto:${site.contact.email}`} className="link-line text-ink">
            {site.contact.email}
          </a>
          .
        </p>

        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-40 pt-16">
            <h2 className="font-display text-3xl font-light sm:text-4xl">
              {index + 1}. {section.title}
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
