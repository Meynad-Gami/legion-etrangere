"use client";

import { useEffect, useRef } from "react";
import { MarkerGlyph } from "@/components/ui/MarkerGlyph";
import type { HistoricalEvent } from "@/data/types";
import { eras } from "@/lib/data";

interface Props {
  events: HistoricalEvent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  eraId: string | null;
  onEraChange: (eraId: string | null) => void;
}

/** Sur mobile, la frise devient un bandeau de fiches que l'on fait défiler du doigt. */
export function MobileTimeline({ events, selectedId, onSelect, eraId, onEraChange }: Props) {
  const stripRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!selectedId) return;
    const el = stripRef.current?.querySelector<HTMLElement>(`[data-id="${selectedId}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedId]);

  return (
    <div className="paper-grain border-t border-rule bg-paper/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur">
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-4" role="group" aria-label="Périodes">
        <EraChip active={!eraId} onClick={() => onEraChange(null)} label="Tout" />
        {eras.map((e) => (
          <EraChip key={e.id} active={eraId === e.id} onClick={() => onEraChange(eraId === e.id ? null : e.id)} label={e.label} />
        ))}
      </div>
      <ul
        ref={stripRef}
        className="no-scrollbar mt-2.5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-px-4 px-4"
        aria-label="Événements de la période"
      >
        {events.map((e) => {
          const selected = selectedId === e.id;
          return (
            <li key={e.id} data-id={e.id} className="snap-start">
              <button
                type="button"
                onClick={() => onSelect(e.id)}
                aria-pressed={selected}
                className={`flex h-[74px] w-[210px] flex-col justify-between border px-3 py-2 text-left transition ${
                  selected ? "border-slate bg-slate text-paper" : "border-rule bg-land text-ink"
                }`}
              >
                <span className={`flex items-center gap-1.5 font-mono text-[0.64rem] ${selected ? "text-paper/70" : "text-ink-3"}`}>
                  <MarkerGlyph type={e.type} size={10} />
                  {e.dateLabel}
                </span>
                <span className="font-display text-[1.1rem] font-bold leading-tight">{e.title}</span>
                <span className={`truncate text-[0.68rem] ${selected ? "text-paper/70" : "text-ink-3"}`}>{e.location.country}</span>
              </button>
            </li>
          );
        })}
        {events.length === 0 && <li className="py-6 text-sm text-ink-3">Aucun événement pour ces filtres.</li>}
      </ul>
    </div>
  );
}

function EraChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 px-3 py-1.5 text-[0.72rem] transition ${
        active ? "bg-slate text-paper" : "bg-paper-2 text-ink-2 ring-1 ring-rule"
      }`}
    >
      {label}
    </button>
  );
}
