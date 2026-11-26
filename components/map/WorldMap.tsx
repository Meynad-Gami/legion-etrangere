"use client";

import { geoGraticule10, geoNaturalEarth1, geoPath, type GeoProjection } from "d3-geo";
import { select } from "d3-selection";
import "d3-transition";
import { zoom as d3zoom, zoomIdentity, type ZoomBehavior, type ZoomTransform } from "d3-zoom";
import { AnimatePresence, motion } from "framer-motion";
import type { FeatureCollection, MultiLineString } from "geojson";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { feature, mesh } from "topojson-client";
import { MarkerGlyph } from "@/components/ui/MarkerGlyph";
import type { HistoricalEvent, LngLat } from "@/data/types";
import { loadTopology, type CountriesTopology } from "@/lib/topology";
import { ArrowRight } from "lucide-react";

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface WorldMapHandle {
  flyTo: (coords: LngLat, minZoom?: number) => void;
  fitTo: (coords: LngLat[]) => void;
  zoomBy: (factor: number) => void;
}

interface Props {
  events: HistoricalEvent[];
  visibleIds: Set<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Événements à relier, dans l'ordre chronologique (itinéraire d'une période, d'un régiment...). */
  routeIds: string[];
  /** Liens vers les événements associés à l'événement sélectionné. */
  relatedIds: string[];
  /** Zones de la carte recouvertes par l'interface (panneau, frise) : le cadrage en tient compte. */
  padding: Padding;
  onReady?: () => void;
}

type Topo = CountriesTopology;

const SEA_LABELS: { text: string; at: LngLat; size?: number }[] = [
  { text: "Océan Atlantique", at: [-38, 28], size: 15 },
  { text: "Océan Pacifique", at: [-135, 8], size: 15 },
  { text: "Océan Indien", at: [78, -18], size: 15 },
  { text: "Méditerranée", at: [18, 34.6], size: 9 },
  { text: "Mer de Chine", at: [114, 15], size: 9 },
];

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const WorldMap = forwardRef<WorldMapHandle, Props>(function WorldMap(
  { events, visibleIds, selectedId, onSelect, routeIds, relatedIds, padding, onReady },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const interacted = useRef(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [coarse, setCoarse] = useState<Topo | null>(null);
  const [fine, setFine] = useState<Topo | null>(null);
  // Transformation « au repos » (React) et transformation courante (mise à jour directe du DOM pendant le geste).
  const [t, setT] = useState<ZoomTransform>(zoomIdentity);
  const liveT = useRef<ZoomTransform>(zoomIdentity);
  const [zooming, setZooming] = useState(false);
  const zoomingRef = useRef(false);
  const frame = useRef(0);
  const gRef = useRef<SVGGElement>(null);
  const markerEls = useRef(new Map<string, HTMLElement>());
  const initialK = useRef(1);
  const [hovered, setHovered] = useState<string | null>(null);
  const [wheelHint, setWheelHint] = useState(false);
  const [ready, setReady] = useState(false);

  // Fond léger d'abord (affichage immédiat), détaillé ensuite.
  useEffect(() => {
    loadTopology("110m").then(setCoarse);
    loadTopology("50m").then(setFine);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** Projection « Natural Earth » : lisible, peu déformée, au rendu de carte d'atlas. */
  const projection = useMemo<GeoProjection | null>(() => {
    if (!size.w || !size.h) return null;
    return geoNaturalEarth1().fitExtent(
      [
        [8, 8],
        [size.w - 8, size.h - 8],
      ],
      { type: "Sphere" },
    );
  }, [size.w, size.h]);

  const buildPaths = (topo: Topo | null) => {
    if (!projection || !topo) return null;
    const path = geoPath(projection);
    const countries = feature(topo, topo.objects.countries) as unknown as FeatureCollection;
    const borders = mesh(topo, topo.objects.countries, (a, b) => a !== b) as MultiLineString;
    return {
      sphere: path({ type: "Sphere" }) ?? "",
      graticule: path(geoGraticule10()) ?? "",
      land: path(countries) ?? "",
      borders: path(borders) ?? "",
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const coarsePaths = useMemo(() => buildPaths(coarse), [projection, coarse]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const finePaths = useMemo(() => buildPaths(fine), [projection, fine]);
  // Le détail fin n'est utile qu'une fois zoomé : la vue d'ensemble reste légère, donc fluide.
  const paths = (t.k >= 2.2 && finePaths) || coarsePaths || finePaths;

  /** Pendant le geste : déplacement direct du fond et des marqueurs, sans re-rendu React. */
  const markerPos = useRef<{ id: string; px: number; py: number; dx: number; dy: number }[]>([]);
  const applyLive = () => {
    frame.current = 0;
    const lt = liveT.current;
    gRef.current?.setAttribute("transform", lt.toString());
    for (const m of markerPos.current) {
      const el = markerEls.current.get(m.id);
      if (el) el.style.transform = `translate3d(${lt.applyX(m.px) + m.dx}px, ${lt.applyY(m.py) + m.dy}px, 0)`;
    }
  };

  // Zoom & déplacement (souris, molette, tactile, pincement).
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !size.w) return;
    const z = d3zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.85, 16])
      .translateExtent([
        [-size.w * 0.4, -size.h * 0.4],
        [size.w * 1.4, size.h * 1.4],
      ])
      // La molette zoome dès que la carte occupe l'écran (ou après un clic, ou avec Ctrl) ;
      // sinon elle laisse défiler la page.
      .filter((event: Event) => {
        if (event.type === "wheel") {
          const we = event as WheelEvent;
          const r = containerRef.current?.getBoundingClientRect();
          const inView = !!r && r.top <= 96 && r.bottom >= window.innerHeight - 8;
          // Revenu à la vue d'ensemble, continuer à dézoomer fait défiler la page : on n'est jamais « coincé ».
          const k = (svg as unknown as { __zoom?: ZoomTransform }).__zoom?.k ?? 1;
          if (we.deltaY > 0 && !we.ctrlKey && k <= initialK.current + 0.02) return false;
          if (!(inView || interacted.current || we.ctrlKey || we.metaKey)) {
            setWheelHint(true);
            return false;
          }
          return true;
        }
        const me = event as MouseEvent;
        return !me.button;
      })
      .on("start", () => {
        if (!zoomingRef.current) {
          zoomingRef.current = true;
          setZooming(true);
        }
      })
      .on("zoom", (e) => {
        liveT.current = e.transform;
        if (!frame.current) frame.current = requestAnimationFrame(applyLive);
      })
      .on("end", (e) => {
        zoomingRef.current = false;
        setZooming(false);
        setT(e.transform);
      });
    zoomRef.current = z;
    const sel = select(svg);
    sel.call(z);
    return () => {
      sel.on(".zoom", null);
    };
  }, [size.w, size.h]);

  useEffect(() => {
    if (!wheelHint) return;
    const id = setTimeout(() => setWheelHint(false), 1800);
    return () => clearTimeout(id);
  }, [wheelHint]);

  const animateTo = useCallback((target: ZoomTransform, duration = 1100) => {
    const svg = svgRef.current;
    const z = zoomRef.current;
    if (!svg || !z) return;
    const d = reducedMotion() ? 0 : duration;
    select(svg).interrupt().transition().duration(d).call(z.transform, target);
  }, []);

  const fitTo = useCallback(
    (coords: LngLat[]) => {
      if (!projection || !coords.length || !size.w) return;
      const pts = coords.map((c) => projection(c)!).filter(Boolean);
      const xs = pts.map((p) => p[0]);
      const ys = pts.map((p) => p[1]);
      const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
      const availW = Math.max(120, size.w - padding.left - padding.right);
      const availH = Math.max(120, size.h - padding.top - padding.bottom);
      const bw = Math.max(x1 - x0, 1);
      const bh = Math.max(y1 - y0, 1);
      const k = Math.min(6, Math.max(0.9, 0.78 / Math.max(bw / availW, bh / availH)));
      const cx = (x0 + x1) / 2;
      const cy = (y0 + y1) / 2;
      animateTo(
        zoomIdentity
          .translate(padding.left + availW / 2 - k * cx, padding.top + availH / 2 - k * cy)
          .scale(k),
      );
    },
    [projection, size.w, size.h, padding, animateTo],
  );

  const flyTo = useCallback(
    (coords: LngLat, minZoom = 4) => {
      if (!projection || !size.w) return;
      const [x, y] = projection(coords)!;
      const svg = svgRef.current;
      const current = svg ? (svg as unknown as { __zoom?: ZoomTransform }).__zoom ?? zoomIdentity : zoomIdentity;
      const k = Math.max(current.k, minZoom);
      const availW = Math.max(120, size.w - padding.left - padding.right);
      const availH = Math.max(120, size.h - padding.top - padding.bottom);
      animateTo(
        zoomIdentity.translate(padding.left + availW / 2 - k * x, padding.top + availH / 2 - k * y).scale(k),
        1300,
      );
    },
    [projection, size.w, size.h, padding, animateTo],
  );

  const zoomBy = useCallback((factor: number) => {
    const svg = svgRef.current;
    const z = zoomRef.current;
    if (!svg || !z) return;
    select(svg).transition().duration(reducedMotion() ? 0 : 400).call(z.scaleBy, factor);
  }, []);

  useImperativeHandle(ref, () => ({ flyTo, fitTo, zoomBy }), [flyTo, fitTo, zoomBy]);

  // Cadrage initial sur l'ensemble des événements.
  useEffect(() => {
    if (!projection || !paths || ready) return;
    const svg = svgRef.current;
    const z = zoomRef.current;
    if (!svg || !z) return;
    const coords = events.map((e) => e.location.coordinates);
    // Premier cadrage instantané, sans animation.
    const pts = coords.map((c) => projection(c)!);
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const availW = size.w - padding.left - padding.right;
    const availH = size.h - padding.top - padding.bottom;
    const k = Math.min(3, Math.max(0.9, 0.85 / Math.max((Math.max(...xs) - Math.min(...xs)) / availW, (Math.max(...ys) - Math.min(...ys)) / availH)));
    const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
    const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
    const initial = zoomIdentity.translate(padding.left + availW / 2 - k * cx, padding.top + availH / 2 - k * cy).scale(k);
    select(svg).call(z.transform, initial);
    liveT.current = initial;
    initialK.current = k;
    setT(initial);
    setReady(true);
    onReady?.();
  }, [projection, paths, ready, events, size.w, size.h, padding, onReady]);

  // --- Positions écran des marqueurs ---------------------------------------------------------
  const markers = useMemo(() => {
    if (!projection) return [];
    // Les événements au même endroit sont légèrement écartés pour rester cliquables.
    const groups = new Map<string, HistoricalEvent[]>();
    for (const e of events) {
      const key = e.location.coordinates.join(",");
      groups.set(key, [...(groups.get(key) ?? []), e]);
    }
    return events.map((e) => {
      const [px, py] = projection(e.location.coordinates)!;
      const group = groups.get(e.location.coordinates.join(","))!;
      const i = group.indexOf(e);
      const n = group.length;
      const off = n > 1 ? { dx: Math.cos((i / n) * Math.PI * 2 - Math.PI / 2) * 13, dy: Math.sin((i / n) * Math.PI * 2 - Math.PI / 2) * 13 } : { dx: 0, dy: 0 };
      return { e, px, py, ...off };
    });
  }, [events, projection]);
  markerPos.current = markers.map((m) => ({ id: m.e.id, px: m.px, py: m.py, dx: m.dx, dy: m.dy }));

  const screen = markers.map((m) => ({ ...m, x: t.applyX(m.px) + m.dx, y: t.applyY(m.py) + m.dy }));

  /** Placement des étiquettes : priorité à l'importance, puis à droite / à gauche, sinon masquée. */
  const labels = useMemo(() => {
    const placed: { x0: number; y0: number; x1: number; y1: number }[] = [];
    const result = new Map<string, "right" | "left">();
    const visible = screen
      .filter((m) => visibleIds.has(m.e.id))
      .filter((m) => {
        const threshold = m.e.importance === 1 ? 0 : m.e.importance === 2 ? 2.2 : 4;
        return t.k >= threshold || m.e.id === selectedId || m.e.id === hovered;
      })
      .sort((a, b) => {
        const pa = a.e.id === selectedId || a.e.id === hovered ? -1 : a.e.importance;
        const pb = b.e.id === selectedId || b.e.id === hovered ? -1 : b.e.importance;
        return pa - pb;
      });
    for (const m of visible) {
      const w = Math.max(m.e.title.length, m.e.dateLabel.length * 0.8) * 7.4 + 26;
      const h = 40;
      for (const side of ["right", "left"] as const) {
        const x0 = side === "right" ? m.x + 20 : m.x - 20 - w;
        const box = { x0, y0: m.y - h / 2, x1: x0 + w, y1: m.y + h / 2 };
        const clash = placed.some((p) => !(box.x1 < p.x0 || box.x0 > p.x1 || box.y1 < p.y0 || box.y0 > p.y1));
        const inView = box.x0 > padding.left - 4 && box.x1 < size.w - padding.right + 4;
        if (!clash && inView) {
          placed.push(box);
          result.set(m.e.id, side);
          break;
        }
      }
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, visibleIds, selectedId, hovered, markers, size.w, padding]);

  // --- Tracés ---------------------------------------------------------------------------------
  const lineFor = useCallback(
    (a: LngLat, b: LngLat) => (projection ? geoPath(projection)({ type: "LineString", coordinates: [a, b] }) ?? "" : ""),
    [projection],
  );
  const byId = useMemo(() => new Map(events.map((e) => [e.id, e])), [events]);
  const route = useMemo(() => {
    const segs: { key: string; d: string }[] = [];
    for (let i = 1; i < routeIds.length; i++) {
      const a = byId.get(routeIds[i - 1]);
      const b = byId.get(routeIds[i]);
      if (a && b) segs.push({ key: `${a.id}>${b.id}`, d: lineFor(a.location.coordinates, b.location.coordinates) });
    }
    return segs;
  }, [routeIds, byId, lineFor]);
  const related = useMemo(() => {
    const sel = selectedId ? byId.get(selectedId) : null;
    if (!sel) return [];
    return relatedIds
      .map((id) => byId.get(id))
      .filter((e): e is HistoricalEvent => !!e)
      .map((e) => ({ key: `${sel.id}~${e.id}`, d: lineFor(sel.location.coordinates, e.location.coordinates) }));
  }, [selectedId, relatedIds, byId, lineFor]);

  const chronoIndex = useMemo(() => new Map(events.map((e, i) => [e.id, i])), [events]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-sea"
      onPointerDown={() => (interacted.current = true)}
      onMouseLeave={() => (interacted.current = false)}
    >
      <svg
        ref={svgRef}
        width={size.w}
        height={size.h}
        className="absolute inset-0 block cursor-grab touch-none select-none active:cursor-grabbing"
        role="img"
        aria-label="Carte du monde des lieux de l'histoire de la Légion étrangère. Utilisez la liste des événements pour une navigation au clavier."
      >
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
            <stop offset="60%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#1c2228" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <rect width={size.w} height={size.h} fill="var(--color-sea)" />
        {paths && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.2 }}>
            <g ref={gRef} transform={t.toString()} style={{ willChange: "transform" }}>
              <path d={paths.sphere} fill="#e3e8ec" stroke="#c3cad0" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <path d={paths.graticule} fill="none" stroke="#8e99a3" strokeOpacity={0.2} strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
              {/* Lignes d'eau le long des côtes, à la manière des cartes gravées. */}
              <path d={paths.land} fill="none" stroke="#aab4bc" strokeOpacity={0.26} strokeWidth={4} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              <path d={paths.land} fill="var(--color-land)" stroke="#8e99a3" strokeWidth={0.7} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              <path d={paths.borders} fill="none" stroke="#c3cad0" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
              {projection &&
                SEA_LABELS.map((l) => {
                  const [x, y] = projection(l.at)!;
                  const fs = (l.size ?? 12) / Math.sqrt(t.k);
                  return (
                    <text
                      key={l.text}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      fontSize={fs}
                      fill="#8e99a3"
                      fillOpacity={0.75}
                      fontWeight={600}
                      letterSpacing={fs * 0.18}
                      style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}
                      aria-hidden="true"
                    >
                      {l.text}
                    </text>
                  );
                })}

              {/* Itinéraire chronologique de la sélection */}
              <AnimatePresence>
                {route.map((s, i) => (
                  <motion.path
                    key={s.key}
                    d={s.d}
                    fill="none"
                    stroke="var(--color-green-700)"
                    strokeWidth={1.4}
                    strokeDasharray="1 5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.18, ease: "easeInOut" }}
                  />
                ))}
              </AnimatePresence>
              {/* Liens vers les événements associés */}
              <AnimatePresence>
                {related.map((s, i) => (
                  <motion.path
                    key={s.key}
                    d={s.d}
                    fill="none"
                    stroke="var(--color-green-700)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.55 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, delay: 0.6 + i * 0.12, ease: "easeInOut" }}
                  />
                ))}
              </AnimatePresence>
            </g>
          </motion.g>
        )}
        <rect width={size.w} height={size.h} fill="url(#vignette)" pointerEvents="none" />
      </svg>

      {/* Marqueurs : de vrais boutons, accessibles au clavier et aux lecteurs d'écran. */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-label="Lieux sur la carte" role="group">
        {ready &&
          screen.map(({ e, x, y }) => {
            const visible = visibleIds.has(e.id);
            const selected = e.id === selectedId;
            const side = labels.get(e.id);
            const place = (el: HTMLElement | null) => {
              if (el) markerEls.current.set(e.id, el);
              else markerEls.current.delete(e.id);
            };
            const pos = { transform: `translate3d(${x}px, ${y}px, 0)` };
            if (!visible) {
              return (
                <span key={e.id} ref={place} aria-hidden="true" className="absolute left-0 top-0 will-change-transform" style={pos}>
                  <span className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/25" />
                </span>
              );
            }
            const preview = hovered === e.id && !selected && !zooming;
            const cover = e.images.find((i) => i.src);
            return (
              <div
                key={e.id}
                ref={place}
                className="absolute left-0 top-0 will-change-transform"
                style={{ ...pos, zIndex: selected ? 30 : hovered === e.id ? 35 : 10 - e.importance }}
              >
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + (chronoIndex.get(e.id) ?? 0) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => onSelect(e.id)}
                  onMouseEnter={() => setHovered(e.id)}
                  onMouseLeave={() => setHovered((h) => (h === e.id ? null : h))}
                  onFocus={() => setHovered(e.id)}
                  onBlur={() => setHovered((h) => (h === e.id ? null : h))}
                  aria-label={`${e.title}, ${e.dateLabel}, ${e.location.name}`}
                  aria-pressed={selected}
                  className="group pointer-events-auto absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                >
                  {e.importance === 1 && !selected && (
                    <span className="absolute inset-1 rounded-full border border-green-800/40 motion-safe:animate-[breathe_3.2s_ease-in-out_infinite]" />
                  )}
                  <span
                    className={`relative flex items-center justify-center rounded-full shadow-[0_1px_4px_rgba(28,34,40,0.3)] transition-all duration-300 ${
                      selected
                        ? "h-7 w-7 bg-slate text-white ring-2 ring-green-700 ring-offset-2 ring-offset-land"
                        : e.importance === 1
                          ? "h-6 w-6 bg-paper text-green-800 ring-1 ring-green-800/70 group-hover:bg-green-800 group-hover:text-paper"
                          : "h-5 w-5 bg-paper text-green-800 ring-1 ring-green-800/50 group-hover:bg-green-800 group-hover:text-paper"
                    }`}
                  >
                    <MarkerGlyph type={e.type} size={e.importance === 1 || selected ? 12 : 10} />
                  </span>
                </button>
                {/* Aperçu au survol : photo, date, résumé */}
                <AnimatePresence>
                  {preview && (
                    <motion.div
                      aria-hidden="true"
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.18 }}
                      className={`pointer-events-none absolute bottom-6 w-64 -translate-x-1/2 overflow-hidden bg-white shadow-[0_12px_32px_rgba(28,34,40,0.28)] ring-1 ring-rule ${
                        x < 150 ? "left-[150px]" : x > size.w - 150 ? "left-[-110px]" : "left-0"
                      }`}
                    >
                      {cover?.src && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover.src} alt="" className="h-28 w-full object-cover grayscale-[20%]" />
                      )}
                      <div className="p-3">
                        <p className="font-display text-[0.75rem] font-bold uppercase tracking-wide text-green-700">{e.dateLabel}</p>
                        <p className="font-display text-[1.1rem] font-bold leading-tight text-ink">{e.title}</p>
                        <p className="mt-1 line-clamp-2 text-[0.8rem] leading-snug text-ink-2">{e.summary}</p>
                        <p className="mt-2 flex items-center gap-1 font-display text-[0.72rem] font-bold uppercase tracking-wide text-ink-3">
                          Ouvrir la fiche <ArrowRight aria-hidden className="h-3 w-3" />
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {side && !preview && !zooming && (
                    <motion.span
                      aria-hidden="true"
                      initial={{ opacity: 0, x: side === "right" ? -4 : 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`pointer-events-none absolute top-0 -translate-y-1/2 whitespace-nowrap rounded-[2px] bg-land/85 px-1.5 py-0.5 shadow-[0_1px_3px_rgba(28,34,40,0.18)] ${side === "right" ? "left-5" : "right-5 text-right"}`}
                    >
                      <span className="block font-display text-[0.7rem] font-semibold uppercase tracking-wide text-green-700">{e.dateLabel}</span>
                      <span className={`block font-display text-[1rem] font-bold leading-tight ${selected ? "text-ink" : "text-ink"}`}>
                        {e.title}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              </div>
            );
          })}
      </div>

      <AnimatePresence>
        {wheelHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-night/35"
          >
            <p className="bg-slate px-4 py-2 font-display font-semibold text-white">
              Cliquez sur la carte, ou utilisez Ctrl + molette, pour zoomer
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!ready && (
        <p className="eyebrow absolute inset-0 flex items-center justify-center text-ink-3">Déploiement de la carte…</p>
      )}
    </div>
  );
});
