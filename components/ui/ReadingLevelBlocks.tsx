"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useReadingLevel } from "@/lib/reading-level";

/** Contenu affiché seulement en mode « Approfondir ». */
export function Deep({ children }: { children: ReactNode }) {
  const { level } = useReadingLevel();
  return level === "approfondir" ? <>{children}</> : null;
}

/** Contenu affiché seulement en mode « Découverte ». */
export function Simple({ children }: { children: ReactNode }) {
  const { level } = useReadingLevel();
  return level === "decouverte" ? <>{children}</> : null;
}

/** Invitation à passer en mode « Approfondir », placée là où du contenu est masqué. */
export function GoDeeper({ label, className = "" }: { label: string; className?: string }) {
  const { level, setLevel } = useReadingLevel();
  if (level === "approfondir") return null;
  return (
    <button
      type="button"
      onClick={() => setLevel("approfondir")}
      className={`inline-flex items-center gap-2 border border-rule bg-paper-2 px-4 py-2.5 text-left font-display text-sm font-bold uppercase tracking-wide text-ink-2 transition hover:border-green-700 hover:text-green-700 ${className}`}
    >
      <ChevronDown aria-hidden className="h-4 w-4" />
      {label}
    </button>
  );
}
