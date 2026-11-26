"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ReadingLevelProvider } from "@/lib/reading-level";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReadingLevelProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReadingLevelProvider>
  );
}
