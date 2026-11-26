import type { GeometryCollection, Topology } from "topojson-specification";

export type CountriesTopology = Topology<{ countries: GeometryCollection }>;
export type Resolution = "110m" | "50m";

const cache: Partial<Record<Resolution, Promise<CountriesTopology>>> = {};

/**
 * Fond de carte Natural Earth, servi depuis public/geo.
 * « 110m » (léger) pour la vue d'ensemble, « 50m » (détaillé) une fois zoomé.
 */
export const loadTopology = (res: Resolution = "50m") =>
  (cache[res] ??= fetch(`/geo/countries-${res}.json`).then((r) => r.json() as Promise<CountriesTopology>));
