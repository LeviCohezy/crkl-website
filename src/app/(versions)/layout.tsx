import type { ReactNode } from "react";
import { VersionSwitcher } from "@/components/layout/VersionSwitcher";

/**
 * Bare shell for the homepage concepts — each version brings its own header
 * and footer so the directions can be judged whole.
 */
export default function VersionsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <VersionSwitcher />
    </>
  );
}
