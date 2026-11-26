"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { MarkerGlyph } from "@/components/ui/MarkerGlyph";
import type { HistoricalEvent } from "@/data/types";
import { eventTypes } from "@/lib/data";

/** Alternative textuelle à la carte : même contenu, navigable au clavier et au lecteur d'écran. */
export function EventList({
  events,
  selectedId,
  onSelect,
  onClose,
}: {
  events: HistoricalEvent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.aside
      aria-label="Liste des événements"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="paper-grain pointer-events-auto flex max-h-full w-[320px] flex-col rounded-sm bg-paper/97 shadow-[0_8px_30px_rgba(30,25,10,0.18)] ring-1 ring-rule"
    >
      <div className="flex items-center justify-between border-b border-rule px-4 py-3">
        <p className="eyebrow text-ink-3">{events.length} événements</p>
        <button type="button" onClick={onClose} className="text-sm text-ink-2 hover:text-ink" aria-label="Fermer la liste">
          <X aria-hidden className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
      <ol className="scrollbar-thin flex-1 overflow-y-auto py-1">
        {events.map((e) => (
          <li key={e.id}>
            <button
              type="button"
              onClick={() => onSelect(e.id)}
              aria-current={selectedId === e.id ? "true" : undefined}
              className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition hover:bg-paper-2 aria-[current=true]:bg-green-100"
            >
              <MarkerGlyph type={e.type} size={11} className="mt-1.5 shrink-0 text-green-800" />
              <span>
                <span className="block font-mono text-[0.66rem] text-ink-3">{e.dateLabel}</span>
                <span className="block font-display text-[1.1rem] font-bold leading-tight text-ink">{e.title}</span>
                <span className="block text-[0.72rem] text-ink-3">
                  {e.location.name} · {eventTypes.find((t) => t.id === e.type)?.label}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </motion.aside>
  );
}

export function Legend() {
  return (
    <div className="pointer-events-auto rounded-sm bg-paper/92 px-3 py-2.5 ring-1 ring-rule backdrop-blur">
      <p className="eyebrow mb-1.5 text-[0.56rem] text-ink-3">Légende</p>
      <ul className="space-y-1">
        {eventTypes.map((t) => (
          <li key={t.id} className="flex items-center gap-2 text-[0.72rem] text-ink-2">
            <MarkerGlyph type={t.id} size={11} className="text-green-800" />
            {t.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
