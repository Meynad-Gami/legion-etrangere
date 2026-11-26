import type { LngLat } from "@/data/types";

/** Coordonnées au format « carnet » : 19°01′ N · 96°37′ O. */
export function formatCoordinates([lng, lat]: LngLat) {
  const fmt = (v: number) => {
    const a = Math.abs(v);
    const d = Math.floor(a);
    const m = Math.round((a - d) * 60);
    return `${d}°${String(m).padStart(2, "0")}′`;
  };
  return `${fmt(lat)} ${lat >= 0 ? "N" : "S"} · ${fmt(lng)} ${lng >= 0 ? "E" : "O"}`;
}
