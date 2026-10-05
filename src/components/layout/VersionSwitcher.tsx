"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const versions = [{ href: "/v2", label: "02 Editorial" }];

/**
 * TEMPORARY review aid — lets you flick between the three homepage directions.
 * Delete this component and the whole src/app/(versions) folder once one is
 * picked and promoted to src/app/(site)/page.tsx.
 */
export function VersionSwitcher() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <nav
        aria-label="Homepage versions"
        className="glass-dark pointer-events-auto flex items-center gap-1 rounded-full p-1.5"
      >
        {versions.map((version) => {
          const active = pathname === version.href;
          return (
            <Link
              key={version.href}
              href={version.href}
              className={`rounded-full px-4 py-2 text-[0.625rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                active
                  ? "bg-cream text-ink"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              {version.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
