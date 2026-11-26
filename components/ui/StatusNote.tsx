import { Info } from "lucide-react";
import type { Verification } from "@/data/types";

/** Mention éditoriale : signale un contenu qui doit encore être validé. */
export function StatusNote({ status, className = "" }: { status: Verification; className?: string }) {
  if (status === "verifie") return null;
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-sm border border-dashed border-garance/50 bg-garance/5 px-2.5 py-1 text-[0.72rem] text-garance ${className}`}
    >
      <Info aria-hidden className="h-3.5 w-3.5" />
      Contenu en cours de vérification historique
    </p>
  );
}

export function SourceStatus({ status }: { status: Verification }) {
  return status === "verifie" ? (
    <span className="eyebrow text-[0.6rem] text-green-700">Référence</span>
  ) : (
    <span className="eyebrow text-[0.6rem] text-garance">À vérifier</span>
  );
}
