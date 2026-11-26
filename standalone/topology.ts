import fine from "../public/geo/countries-50m.json";
import coarse from "../public/geo/countries-110m.json";
import type { CountriesTopology, Resolution } from "@/lib/topology";

export type { CountriesTopology, Resolution };

/** Fond de carte intégré au fichier (pas de requête réseau). */
export const loadTopology = (res: Resolution = "50m") =>
  Promise.resolve((res === "110m" ? coarse : fine) as unknown as CountriesTopology);
