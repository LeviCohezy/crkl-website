import { useId } from "react";

type RotatingBadgeProps = {
  /** Repeated around the ring; keep it short. */
  text: string;
  className?: string;
};

/** Text set on a circle, turning slowly. Sized by its container. */
export function RotatingBadge({ text, className = "" }: RotatingBadgeProps) {
  const id = useId();
  const label = `${text} · ${text} · `;

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className={`animate-spin-slow ${className}`}
    >
      <defs>
        <path
          id={id}
          d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
        />
      </defs>
      <text
        fill="currentColor"
        fontSize="11.5"
        letterSpacing="5.2"
        style={{ textTransform: "uppercase" }}
      >
        <textPath href={`#${id}`} textLength="505" startOffset="0">
          {label}
        </textPath>
      </text>
    </svg>
  );
}
