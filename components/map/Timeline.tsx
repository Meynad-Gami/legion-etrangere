"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { MarkerGlyph } from "@/components/ui/MarkerGlyph";
import type { Era, HistoricalEvent } from "@/data/types";
import { decimalYear, eras } from "@/lib/data";

const START = 1831;
const END = 2026;
const MAJOR_TICKS = [1831, 1863, 1914, 1940, 1954, 1962, 1978, 2000];

/**
 * Échelle par morceaux : chaque période reçoit une largeur minimale, pour que les périodes
 * courtes mais denses (les deux guerres mondiales) restent lisibles et cliquables.
 */
function buildScale() {
  const weights = eras.map((e) => Math.max(e.end - e.start + 1, 12));
  const total = weights.reduce((a, b) => a + b, 0);
  const offsets: number[] = [];
  weights.reduce((acc, w, i) => ((offsets[i] = acc), acc + w), 0);
  const toX = (year: number) => {
    const y = Math.min(Math.max(year, START), END + 0.99);
    const i = Math.max(0, eras.findIndex((e) => y < e.end + 1));
    const era = eras[i === -1 ? eras.length - 1 : i];
    const span = era.end + 1 - era.start;
    return ((offsets[i] + ((y - era.start) / span) * weights[i]) / total) * 100;
  };
  const fromX = (pct: number) => {
    const p = (Math.min(Math.max(pct, 0), 100) / 100) * total;
    let i = offsets.findIndex((o, j) => p >= o && p < o + weights[j]);
    if (i === -1) i = eras.length - 1;
    const era = eras[i];
    return Math.min(END, Math.floor(era.start + ((p - offsets[i]) / weights[i]) * (era.end + 1 - era.start)));
  };
  const band = (era: Era, i: number) => ({ left: (offsets[i] / total) * 100, width: (weights[i] / total) * 100, era });
  return { toX, fromX, bands: eras.map(band) };
}

interface Props {
  events: HistoricalEvent[];
  visibleIds: Set<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  eraId: string | null;
  onEraChange: (eraId: string | null) => void;
  year: number | null;
  onYearChange: (year: number) => void;
  onYearCommit: (year: number) => void;
  onStep: (dir: -1 | 1) => void;
}

export function Timeline({
  events,
  visibleIds,
  selectedId,
  onSelect,
  eraId,
  onEraChange,
  year,
  onYearChange,
  onYearCommit,
  onStep,
}: Props) {
  const { toX, fromX, bands } = useMemo(buildScale, []);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  // Les repères proches s'empilent sur plusieurs rangées.
  const pins = useMemo(() => {
    const rows: number[] = [];
    return events.map((e) => {
      const x = toX(decimalYear(e.date));
      let row = rows.findIndex((last) => x - last > 1.6);
      if (row === -1) row = rows.length < 3 ? rows.length : 0;
      rows[row] = x;
      return { e, x, row };
    });
  }, [events, toX]);

  const yearFromPointer = (clientX: number) => {
    const r = trackRef.current!.getBoundingClientRect();
    return fromX(((clientX - r.left) / r.width) * 100);
  };

  const onPointerDown = (ev: PointerEvent<HTMLDivElement>) => {
    (ev.target as HTMLElement).setPointerCapture(ev.pointerId);
    setDragging(true);
    onYearChange(yearFromPointer(ev.clientX));
  };
  const onPointerMove = (ev: PointerEvent<HTMLDivElement>) => {
    if (dragging) onYearChange(yearFromPointer(ev.clientX));
  };
  const onPointerUp = (ev: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    onYearCommit(yearFromPointer(ev.clientX));
  };

  const onKey = (ev: KeyboardEvent) => {
    const y = year ?? START;
    const delta = { ArrowLeft: -1, ArrowRight: 1, PageDown: -10, PageUp: 10 }[ev.key];
    if (delta) {
      ev.preventDefault();
      const next = Math.min(END, Math.max(START, y + delta));
      onYearChange(next);
      onYearCommit(next);
    } else if (ev.key === "Home" || ev.key === "End") {
      ev.preventDefault();
      const next = ev.key === "Home" ? START : END;
      onYearChange(next);
      onYearCommit(next);
    }
  };

  const currentEra = year != null ? eras.find((e) => year >= e.start && year <= e.end) : null;
  const displayEra = eras.find((e) => e.id === eraId) ?? currentEra;

  return (
    <div className="paper-grain border-t border-rule bg-paper/95 px-5 pb-4 pt-3 backdrop-blur">
      <div className="flex items-end gap-5">
        {/* Année courante, façon carnet */}
        <div className="w-44 shrink-0">
          <p className="eyebrow text-[0.6rem] text-ink-3">{displayEra ? displayEra.label : "Toute l'histoire"}</p>
          <p className="poster text-[2rem] leading-none text-ink tabular-nums" aria-live="polite">
            {year ?? "1831-2026"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 pb-0.5">
          <StepButton dir={-1} onClick={() => onStep(-1)} />
          <StepButton dir={1} onClick={() => onStep(1)} />
        </div>

        <div className="ml-auto flex items-center gap-3 pb-0.5 text-xs">
          {eraId && (
            <button
              type="button"
              onClick={() => onEraChange(null)}
              className="px-3 py-1.5 text-ink-2 ring-1 ring-rule transition hover:bg-paper-2"
            >
              Toute l'histoire
            </button>
          )}
          <span className="hidden text-ink-3 xl:inline">Glissez le curseur pour voyager dans le temps</span>
        </div>
      </div>

      {/* Piste */}
      <div className="relative mt-3 select-none">
        {/* Repères d'événements */}
        <div className="relative h-[46px]">
          {pins.map(({ e, x, row }) => {
            const visible = visibleIds.has(e.id);
            const selected = selectedId === e.id;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => onSelect(e.id)}
                onMouseEnter={() => setHover(e.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(e.id)}
                onBlur={() => setHover(null)}
                tabIndex={-1}
                aria-hidden="true"
                className={`absolute flex h-5 w-5 -translate-x-1/2 items-center justify-center transition-all duration-300 ${
                  selected ? "text-green-700" : visible ? "text-green-800 hover:text-ink" : "text-ink/20"
                }`}
                style={{ left: `${x}%`, bottom: row * 14 }}
              >
                <MarkerGlyph type={e.type} size={selected ? 13 : 10} filled={visible} />
                {hover === e.id && (
                  <span className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-night px-2 py-1 text-[0.7rem] text-paper shadow">
                    <span className="font-mono text-paper/60">{e.dateLabel}</span> · {e.title}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bandes de périodes + curseur */}
        <div
          ref={trackRef}
          className="relative h-9 cursor-ew-resize touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {bands.map(({ left, width, era }, i) => {
            const active = eraId === era.id;
            return (
              <button
                key={era.id}
                type="button"
                onPointerDown={(ev) => ev.stopPropagation()}
                onClick={() => onEraChange(active ? null : era.id)}
                aria-pressed={active}
                className={`absolute top-0 h-full overflow-hidden border-l border-paper px-1.5 text-left text-[0.68rem] leading-9 tracking-wide transition-colors ${
                  active
                    ? "bg-green-800 text-paper"
                    : i % 2
                      ? "bg-paper-3/70 text-ink-2 hover:bg-paper-3"
                      : "bg-paper-2 text-ink-2 hover:bg-paper-3"
                }`}
                style={{ left: `${left}%`, width: `${width}%` }}
                title={`${era.label} (${era.end === 2026 ? `depuis ${era.start}` : `${era.start}-${era.end}`})`}
              >
                <span className="block truncate">{era.label}</span>
              </button>
            );
          })}

          {/* Curseur temporel */}
          <motion.div
            role="slider"
            tabIndex={0}
            aria-label="Année"
            aria-valuemin={START}
            aria-valuemax={END}
            aria-valuenow={year ?? START}
            aria-valuetext={year ? String(year) : "Toute l'histoire"}
            onKeyDown={onKey}
            className="absolute -top-[52px] bottom-0 z-10 w-0 cursor-grab active:cursor-grabbing"
            animate={{ left: `${toX(year ?? START)}%` }}
            transition={dragging ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 30 }}
            onPointerDown={(ev) => {
              ev.stopPropagation();
              trackRef.current?.setPointerCapture(ev.pointerId);
              setDragging(true);
            }}
          >
            <span className={`absolute inset-y-0 -left-px w-[2px] ${year ? "bg-green-700" : "bg-green-700/40"}`} />
            <span className={`absolute -bottom-1 -left-[7px] h-3.5 w-3.5 rotate-45 border-2 border-paper ${year ? "bg-green-700" : "bg-green-700/50"}`} />
          </motion.div>
        </div>

        {/* Graduations */}
        <div className="relative mt-1.5 h-4 font-mono text-[0.64rem] text-ink-3">
          {MAJOR_TICKS.map((y) => (
            <span key={y} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${toX(y)}%` }}>
              {y}
            </span>
          ))}
          <span className="absolute right-0">Aujourd'hui</span>
        </div>
      </div>
    </div>
  );
}

function StepButton({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 items-center gap-1.5 px-3 text-xs text-ink-2 ring-1 ring-rule transition hover:bg-slate hover:text-paper hover:ring-slate"
    >
      {dir === -1 && <ArrowLeft aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />}
      {dir === -1 ? "Précédent" : "Suivant"}
      {dir === 1 && <ArrowRight aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />}
    </button>
  );
}
