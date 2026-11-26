import type { EventType } from "@/data/types";

/**
 * Chaque type d'événement a sa propre forme : l'information ne repose jamais sur la seule couleur.
 */
export function MarkerGlyph({
  type,
  size = 14,
  className = "",
  filled = true,
}: {
  type: EventType;
  size?: number;
  className?: string;
  filled?: boolean;
}) {
  const fill = filled ? "currentColor" : "none";
  const common = { stroke: "currentColor", strokeWidth: 1.5, fill };
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
      {type === "bataille" && <circle cx="8" cy="8" r="5" {...common} />}
      {type === "fondation" && <rect x="3.25" y="3.25" width="9.5" height="9.5" {...common} />}
      {type === "campagne" && <path d="M8 1.8 14.2 8 8 14.2 1.8 8Z" {...common} />}
      {type === "operation" && <path d="M8 2.2 14 13.2H2Z" {...common} />}
      {type === "tradition" && (
        <>
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="8" cy="8" r="2.4" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
