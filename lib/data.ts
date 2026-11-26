import { conflicts, eras, eventTypes } from "@/data/catalog";
import { events } from "@/data/events";
import { people } from "@/data/people";
import { regiments } from "@/data/regiments";
import type { EventType, HistoricalEvent } from "@/data/types";

/** Année de début d'un événement (les dates peuvent être AAAA, AAAA-MM ou AAAA-MM-JJ). */
export const yearOf = (iso: string) => Number(iso.slice(0, 4));

/** Valeur décimale (année + fraction) pour positionner un événement sur la frise. */
export function decimalYear(iso: string) {
  const [y, m = "6", d = "15"] = iso.split("-");
  return Number(y) + (Number(m) - 1) / 12 + (Number(d) - 1) / 365;
}

export const sortedEvents: HistoricalEvent[] = [...events].sort(
  (a, b) => decimalYear(a.date) - decimalYear(b.date),
);

const byId = <T extends { id: string }>(list: T[]) => new Map(list.map((x) => [x.id, x]));
const eventMap = byId(events);
const regimentMap = byId(regiments);
const personMap = byId(people);
const conflictMap = byId(conflicts);

export const getEvent = (id: string) => eventMap.get(id);
export const getRegiment = (id: string) => regimentMap.get(id);
export const getPerson = (id: string) => personMap.get(id);
export const getConflict = (id: string) => conflictMap.get(id);
export const typeLabel = (t: EventType) => eventTypes.find((x) => x.id === t)?.label ?? t;

export const eventsForRegiment = (regimentId: string) =>
  sortedEvents.filter((e) => e.regimentIds.includes(regimentId));

export const eventsForPerson = (personId: string) =>
  sortedEvents.filter((e) => e.personIds?.includes(personId) || getPerson(personId)?.eventIds.includes(e.id));

export const eraOf = (e: HistoricalEvent) => {
  const y = yearOf(e.date);
  return eras.find((era) => y >= era.start && y <= era.end) ?? eras[eras.length - 1];
};

export const countries = [...new Set(events.map((e) => e.location.country))].sort((a, b) =>
  a.localeCompare(b, "fr"),
);

export interface Filters {
  eraId: string | null;
  conflictId: string | null;
  country: string | null;
  regimentId: string | null;
  type: EventType | null;
  query: string;
}

export const emptyFilters: Filters = {
  eraId: null,
  conflictId: null,
  country: null,
  regimentId: null,
  type: null,
  query: "",
};

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

export function applyFilters(list: HistoricalEvent[], f: Filters) {
  const era = f.eraId ? eras.find((e) => e.id === f.eraId) : null;
  const q = normalize(f.query.trim());
  return list.filter((e) => {
    const y = yearOf(e.date);
    if (era && (y < era.start || y > era.end)) return false;
    if (f.conflictId && e.conflictId !== f.conflictId) return false;
    if (f.country && e.location.country !== f.country) return false;
    if (f.regimentId && !e.regimentIds.includes(f.regimentId)) return false;
    if (f.type && e.type !== f.type) return false;
    if (q) {
      const hay = normalize(
        [e.title, e.location.name, e.location.country, e.dateLabel, ...e.tags].join(" "),
      );
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export const activeFilterCount = (f: Filters) =>
  [f.eraId, f.conflictId, f.country, f.regimentId, f.type].filter(Boolean).length;

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export { conflicts, eras, eventTypes, events, people, regiments };
