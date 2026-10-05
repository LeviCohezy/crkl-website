import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** `wide` for full-bleed-ish sections, `narrow` for running text. */
  width?: "narrow" | "default" | "wide";
  className?: string;
};

const widths = {
  narrow: "max-w-2xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  children,
  width = "default",
  className = "",
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-6 sm:px-8 ${widths[width]} ${className}`}>
      {children}
    </div>
  );
}
