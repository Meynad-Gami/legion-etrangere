"use client";

import { Copyright } from "lucide-react";

/**
 * Crédit d'une image : un petit badge « © » posé dans le coin de l'image,
 * qui révèle l'auteur et la licence au survol, au focus ou au toucher.
 * La liste complète, avec les liens, est sur la page « Crédits photographiques ».
 */
export function Credit({
  credit,
  license,
  inLink = false,
  className = "bottom-2 right-2",
}: {
  credit?: string;
  license?: string;
  /** L'image est déjà dans un lien : on évite un bouton imbriqué (survol uniquement). */
  inLink?: boolean;
  className?: string;
}) {
  if (!credit) return null;
  const label = `Crédit photo : ${credit}${license ? `, ${license}` : ""}`;
  const badge = "flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white/90 backdrop-blur-sm transition";
  return (
    <span className={`group/credit absolute z-10 ${className}`}>
      {inLink ? (
        <span aria-hidden className={`${badge} group-hover/credit:bg-black/75`}>
          <Copyright className="h-3.5 w-3.5" />
        </span>
      ) : (
        <button
          type="button"
          aria-label={label}
          onClick={(e) => e.stopPropagation()}
          className={`${badge} hover:bg-black/75 focus:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
        >
          <Copyright aria-hidden className="h-3.5 w-3.5" />
        </button>
      )}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-8 right-0 w-max max-w-[17rem] bg-night/95 px-3 py-2 text-left text-[0.72rem] font-normal normal-case leading-snug tracking-normal text-white opacity-0 shadow-lg transition duration-200 group-focus-within/credit:opacity-100 group-hover/credit:opacity-100"
      >
        {credit}
        {license && <span className="block text-white/60">{license}</span>}
      </span>
    </span>
  );
}
