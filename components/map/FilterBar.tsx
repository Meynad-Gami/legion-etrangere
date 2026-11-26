"use client";

import { List, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { EventType } from "@/data/types";
import {
  activeFilterCount,
  conflicts,
  countries,
  emptyFilters,
  eras,
  eventTypes,
  getConflict,
  getRegiment,
  regiments,
  typeLabel,
  type Filters,
} from "@/lib/data";

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  resultCount: number;
  listOpen: boolean;
  onToggleList: () => void;
}

export function FilterBar({ filters, onChange, resultCount, listOpen, onToggleList }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const count = activeFilterCount(filters);
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const chips: { label: string; clear: () => void }[] = [];
  if (filters.eraId) chips.push({ label: eras.find((e) => e.id === filters.eraId)!.label, clear: () => set({ eraId: null }) });
  if (filters.conflictId) chips.push({ label: getConflict(filters.conflictId)!.name, clear: () => set({ conflictId: null }) });
  if (filters.country) chips.push({ label: filters.country, clear: () => set({ country: null }) });
  if (filters.regimentId) chips.push({ label: getRegiment(filters.regimentId)!.shortName, clear: () => set({ regimentId: null }) });
  if (filters.type) chips.push({ label: typeLabel(filters.type), clear: () => set({ type: null }) });

  return (
    <div ref={panelRef} className="pointer-events-auto relative w-full max-w-[560px]">
      <div className="flex items-stretch gap-2">
        <label className="flex min-w-0 flex-1 items-center gap-2 bg-paper/95 px-3 shadow-[0_1px_8px_rgba(40,30,10,0.12)] ring-1 ring-rule backdrop-blur">
          <Search aria-hidden className="h-4 w-4 shrink-0 text-ink-3" />
          <span className="sr-only">Rechercher un lieu, une bataille, une date</span>
          <input
            type="search"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
            placeholder="Camerone, 1942, Mexique…"
            className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-3 focus:outline-none"
          />
        </label>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="filtres"
          onClick={() => setOpen((o) => !o)}
          className={`flex items-center gap-2 px-3.5 text-sm shadow-[0_1px_8px_rgba(40,30,10,0.12)] ring-1 transition ${
            open || count ? "bg-slate text-paper ring-slate" : "bg-paper/95 text-ink ring-rule hover:bg-paper"
          }`}
        >
          <SlidersHorizontal aria-hidden className="h-4 w-4" />
          Filtres
          {count > 0 && <span className="bg-paper px-1.5 text-[0.68rem] font-medium text-ink">{count}</span>}
        </button>
        <button
          type="button"
          aria-pressed={listOpen}
          onClick={onToggleList}
          className={`hidden items-center gap-2 px-3.5 text-sm shadow-[0_1px_8px_rgba(40,30,10,0.12)] ring-1 transition sm:flex ${
            listOpen ? "bg-slate text-paper ring-slate" : "bg-paper/95 text-ink ring-rule hover:bg-paper"
          }`}
        >
          <List aria-hidden className="h-4 w-4" />
          Liste
        </button>
      </div>

      {chips.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {chips.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={c.clear}
              className="group flex items-center gap-1.5 bg-slate py-1 pl-3 pr-2 text-[0.72rem] text-paper shadow-sm"
              aria-label={`Retirer le filtre ${c.label}`}
            >
              {c.label}
              <span aria-hidden className="text-paper/60 group-hover:text-paper"><X aria-hidden className="h-3.5 w-3.5" strokeWidth={2} /></span>
            </button>
          ))}
          <span className="bg-paper/90 px-2.5 py-1 text-[0.72rem] text-ink-2 ring-1 ring-rule">
            {resultCount} {resultCount > 1 ? "événements" : "événement"}
          </span>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            id="filtres"
            role="dialog"
            aria-label="Filtres"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="paper-grain absolute left-0 top-12 z-40 w-full bg-paper p-5 shadow-[0_12px_40px_rgba(30,25,10,0.22)] ring-1 ring-rule"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="Période" value={filters.eraId} onChange={(v) => set({ eraId: v })} options={eras.map((e) => ({ value: e.id, label: `${e.label} (${e.end === 2026 ? `depuis ${e.start}` : `${e.start}-${e.end}`})` }))} />
              <Select label="Conflit" value={filters.conflictId} onChange={(v) => set({ conflictId: v })} options={conflicts.map((c) => ({ value: c.id, label: c.name }))} />
              <Select label="Pays" value={filters.country} onChange={(v) => set({ country: v })} options={countries.map((c) => ({ value: c, label: c }))} />
              <Select label="Régiment" value={filters.regimentId} onChange={(v) => set({ regimentId: v })} options={regiments.map((r) => ({ value: r.id, label: `${r.shortName}, ${r.name}` }))} />
              <Select
                label="Type d'événement"
                value={filters.type}
                onChange={(v) => set({ type: v as EventType | null })}
                options={eventTypes.map((t) => ({ value: t.id, label: t.label }))}
              />
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-rule pt-4">
              <p className="text-sm text-ink-2" aria-live="polite">
                <span className="font-mono text-ink">{resultCount}</span> {resultCount > 1 ? "événements" : "événement"}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => onChange(emptyFilters)} className="px-3 py-2 text-sm text-ink-2 hover:bg-paper-2">
                  Réinitialiser
                </button>
                <button type="button" onClick={() => setOpen(false)} className="bg-slate px-4 py-2 text-sm text-paper hover:bg-green-800">
                  Voir sur la carte
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block text-[0.6rem] text-ink-3">{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="h-10 w-full bg-land px-2.5 text-sm text-ink ring-1 ring-rule focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        <option value="">Tous</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
