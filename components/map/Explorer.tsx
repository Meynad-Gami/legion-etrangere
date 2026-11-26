"use client";

import { LocateFixed, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EventPanel } from "@/components/event/EventPanel";
import {
  activeFilterCount,
  applyFilters,
  decimalYear,
  emptyFilters,
  eras,
  getEvent,
  sortedEvents,
  yearOf,
  type Filters,
} from "@/lib/data";
import { useMediaQuery } from "@/lib/use-media-query";
import { EventList, Legend } from "./EventList";
import { FilterBar } from "./FilterBar";
import { MobileTimeline } from "./MobileTimeline";
import { Timeline } from "./Timeline";
import { WorldMap, type Padding, type WorldMapHandle } from "./WorldMap";

const PANEL_W = 476;
const HINT_KEY = "legion.hintDismissed";

export function Explorer() {
  const mapRef = useRef<WorldMapHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const mobile = useMediaQuery("(max-width: 767px)");

  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [listOpen, setListOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [hint, setHint] = useState(false);
  const [height, setHeight] = useState(800);

  const visible = useMemo(() => applyFilters(sortedEvents, filters), [filters]);
  const visibleIds = useMemo(() => new Set(visible.map((e) => e.id)), [visible]);
  const selected = selectedId ? getEvent(selectedId) ?? null : null;
  const filtering = activeFilterCount(filters) > 0 || filters.query.trim().length > 0;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setHeight(e.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Zones occupées par l'interface : le cadrage de la carte les évite.
  const padding = useMemo<Padding>(
    () =>
      mobile
        ? { top: 70, left: 16, right: 16, bottom: selected ? height * 0.68 + 16 : 175 }
        : {
            top: 90,
            left: listOpen ? 360 : 40,
            right: selected ? PANEL_W + 40 : 80,
            bottom: 175,
          },
    [mobile, selected, listOpen, height],
  );

  // --- Sélection ---------------------------------------------------------------------------
  const select = useCallback(
    (id: string) => {
      const ev = getEvent(id);
      if (!ev) return;
      if (!visibleIds.has(id)) setFilters(emptyFilters);
      setSelectedId(id);
      setYear(yearOf(ev.date));
    },
    [visibleIds],
  );

  const close = useCallback(() => setSelectedId(null), []);

  const step = useCallback(
    (dir: -1 | 1) => {
      const list = visible.length ? visible : sortedEvents;
      if (!selected) {
        select((dir === 1 ? list[0] : list[list.length - 1]).id);
        return;
      }
      let i = list.findIndex((e) => e.id === selected.id);
      if (i === -1) {
        const t = decimalYear(selected.date);
        i = list.findIndex((e) => decimalYear(e.date) > t) - (dir === 1 ? 1 : 0);
      }
      const next = list[(i + dir + list.length) % list.length];
      select(next.id);
    },
    [visible, selected, select],
  );

  // Arrivée avec ?event=… ou ?regiment=… (lien depuis une fiche régiment, la chronologie…).
  // L'URL étant ensuite tenue à jour par la carte elle-même, on ne réagit qu'aux changements externes.
  const selectedRef = useRef<string | null>(null);
  selectedRef.current = selectedId;
  useEffect(() => {
    // Laisse le routeur restaurer le défilement avant de descendre jusqu'à la carte.
    const reveal = () => setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth" }), 250);
    const id = searchParams?.get("event");
    const regiment = searchParams?.get("regiment");
    if (id && id !== selectedRef.current && getEvent(id)) {
      setSelectedId(id);
      setYear(yearOf(getEvent(id)!.date));
      reveal();
    } else if (regiment) {
      setFilters({ ...emptyFilters, regimentId: regiment });
      reveal();
    }
  }, [searchParams]);

  // Garde l'URL partageable.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedId) url.searchParams.set("event", selectedId);
    else url.searchParams.delete("event");
    url.searchParams.delete("regiment");
    try {
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    } catch {
      // Fichier ouvert en local : l'adresse ne peut pas être modifiée, sans conséquence.
    }
  }, [selectedId]);

  // Vol vers l'événement choisi.
  useEffect(() => {
    if (!mapReady || !selected) return;
    const id = requestAnimationFrame(() =>
      mapRef.current?.flyTo(selected.location.coordinates, selected.type === "campagne" ? 3.2 : 4.2),
    );
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, mapReady]);

  // Recadrage quand les filtres changent.
  const firstFilterRun = useRef(true);
  useEffect(() => {
    if (!mapReady) return;
    if (firstFilterRun.current) {
      firstFilterRun.current = false;
      return;
    }
    const t = setTimeout(() => {
      const coords = (visible.length ? visible : sortedEvents).map((e) => e.location.coordinates);
      mapRef.current?.fitTo(coords);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, mapReady]);

  // Fermer la fiche si son événement disparaît des filtres.
  useEffect(() => {
    if (selectedId && !visibleIds.has(selectedId)) setSelectedId(null);
  }, [visibleIds, selectedId]);

  // Clavier : Échap ferme la fiche.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedId) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, close]);

  // Aide de première visite.
  useEffect(() => {
    try {
      setHint(!localStorage.getItem(HINT_KEY));
    } catch {
      setHint(true);
    }
  }, []);
  const dismissHint = () => {
    setHint(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {}
  };

  const setEra = (eraId: string | null) => {
    setFilters((f) => ({ ...f, eraId }));
    const era = eras.find((e) => e.id === eraId);
    setYear(era ? era.start : null);
  };
  const onYear = (y: number) => {
    setYear(y);
    const era = eras.find((e) => y >= e.start && y <= e.end);
    if (era && era.id !== filters.eraId) setFilters((f) => ({ ...f, eraId: era.id }));
  };

  // Itinéraire : relie chronologiquement les lieux d'une sélection (période, régiment, conflit…).
  const routeIds = filtering && visible.length >= 2 && visible.length <= 14 ? visible.map((e) => e.id) : [];
  const relatedIds = selected?.relatedEventIds ?? [];

  return (
    <section
      id="explorer"
      ref={sectionRef}
      aria-label="Explorer l'histoire sur la carte"
      className="relative h-[calc(100svh-72px)] min-h-[560px] scroll-mt-[72px] overflow-hidden"
    >
      <WorldMap
        ref={mapRef}
        events={sortedEvents}
        visibleIds={visibleIds}
        selectedId={selectedId}
        onSelect={select}
        routeIds={routeIds}
        relatedIds={relatedIds}
        padding={padding}
        onReady={() => setMapReady(true)}
      />

      {/* Couche d'interface */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute left-3 right-3 top-3 md:left-4 md:right-auto md:w-[560px]">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            resultCount={visible.length}
            listOpen={listOpen}
            onToggleList={() => setListOpen((o) => !o)}
          />
        </div>

        <AnimatePresence>
          {listOpen && !mobile && (
            <div className="absolute bottom-[184px] left-4 top-[110px] flex">
              <EventList events={visible} selectedId={selectedId} onSelect={select} onClose={() => setListOpen(false)} />
            </div>
          )}
        </AnimatePresence>

        {!mobile && !listOpen && (
          <div className="absolute bottom-[184px] left-4 hidden lg:block">
            <Legend />
          </div>
        )}

        {/* Zoom */}
        <div
          className="absolute bottom-[184px] flex flex-col overflow-hidden rounded-sm bg-paper/95 shadow ring-1 ring-rule transition-[right] duration-500 max-md:bottom-[190px]"
          style={{ right: !mobile && selected ? PANEL_W + 12 : 16 }}
        >
          <ZoomButton label="Zoomer" onClick={() => mapRef.current?.zoomBy(1.8)}>
            <Plus aria-hidden className="h-4 w-4" />
          </ZoomButton>
          <ZoomButton label="Dézoomer" onClick={() => mapRef.current?.zoomBy(1 / 1.8)}>
            <Minus aria-hidden className="h-4 w-4" />
          </ZoomButton>
          <ZoomButton
            label="Voir tous les événements"
            onClick={() => mapRef.current?.fitTo((visible.length ? visible : sortedEvents).map((e) => e.location.coordinates))}
          >
            <LocateFixed aria-hidden className="h-4 w-4" />
          </ZoomButton>
        </div>

        <AnimatePresence>
          {hint && !selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="pointer-events-auto absolute right-4 top-4 hidden w-[300px] rounded-sm bg-night/95 p-4 text-paper shadow-lg md:block"
            >
              <p className="eyebrow text-[0.58rem] text-paper/55">Comment explorer</p>
              <ul className="mt-2 space-y-1.5 text-[0.82rem] leading-snug text-paper/85">
                <li>Cliquez sur un point pour ouvrir son histoire.</li>
                <li>Faites glisser la frise pour voyager dans le temps.</li>
                <li>Choisissez « Découverte » ou « Approfondir » en haut de la page.</li>
              </ul>
              <button type="button" onClick={dismissHint} className="mt-3 text-xs text-paper/70 underline underline-offset-4 hover:text-paper">
                J'ai compris
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Frise */}
        <div
          className="pointer-events-auto absolute bottom-0 left-0 transition-[right] duration-500 ease-out"
          style={{ right: !mobile && selected ? PANEL_W : 0 }}
        >
          {mobile ? (
            <MobileTimeline events={visible} selectedId={selectedId} onSelect={select} eraId={filters.eraId} onEraChange={setEra} />
          ) : (
            <Timeline
              events={sortedEvents}
              visibleIds={visibleIds}
              selectedId={selectedId}
              onSelect={select}
              eraId={filters.eraId}
              onEraChange={setEra}
              year={year}
              onYearChange={onYear}
              onYearCommit={onYear}
              onStep={step}
            />
          )}
        </div>

        <AnimatePresence>
          {selected && (
            <EventPanel key="panel" event={selected} onClose={close} onNavigate={select} onStep={step} mobile={mobile} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ZoomButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="pointer-events-auto flex h-9 w-9 items-center justify-center border-b border-rule text-lg text-ink-2 last:border-b-0 hover:bg-paper-2 hover:text-ink"
    >
      {children}
    </button>
  );
}
