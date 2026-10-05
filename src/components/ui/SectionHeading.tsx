import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-stone" : "text-cream/65";
  const accent = tone === "dark" ? "text-bordeaux" : "text-brass";

  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow ? <p className={`eyebrow ${accent}`}>{eyebrow}</p> : null}
      <Heading
        className={`font-display mt-4 text-balance text-3xl leading-[1.1] font-light sm:text-4xl lg:text-5xl ${
          tone === "dark" ? "text-ink" : "text-cream"
        }`}
      >
        {title}
      </Heading>
      {intro ? (
        <div
          className={`mt-5 max-w-2xl text-base leading-relaxed ${muted} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
