import type { Conflict, Era, EventType, Source } from "./types";

export const eras: Era[] = [
  { id: "origines", label: "Les origines", start: 1831, end: 1882 },
  { id: "empire", label: "Expansion coloniale", start: 1883, end: 1913 },
  { id: "grande-guerre", label: "Grande Guerre", start: 1914, end: 1918 },
  { id: "entre-deux", label: "Entre-deux-guerres", start: 1919, end: 1938 },
  { id: "ww2", label: "Seconde Guerre mondiale", start: 1939, end: 1945 },
  { id: "decolonisation", label: "Décolonisation", start: 1946, end: 1962 },
  { id: "aubagne", label: "La Légion d'Aubagne", start: 1963, end: 1999 },
  { id: "contemporain", label: "Aujourd'hui", start: 2000, end: 2026 },
];

export const conflicts: Conflict[] = [
  { id: "institution", name: "Histoire de l'institution", period: "1831 à aujourd'hui" },
  { id: "algerie-conquete", name: "Conquête de l'Algérie", period: "1830-1847" },
  { id: "crimee", name: "Guerre de Crimée", period: "1853-1856" },
  { id: "italie", name: "Campagne d'Italie", period: "1859" },
  { id: "mexique", name: "Expédition du Mexique", period: "1861-1867" },
  { id: "tonkin", name: "Campagne du Tonkin", period: "1883-1886" },
  { id: "madagascar", name: "Expédition de Madagascar", period: "1895" },
  { id: "sud-oranais", name: "Confins algéro-marocains", period: "1900-1907" },
  { id: "maroc", name: "Campagnes du Maroc", period: "1907-1934" },
  { id: "ww1", name: "Première Guerre mondiale", period: "1914-1918" },
  { id: "ww2", name: "Seconde Guerre mondiale", period: "1939-1945" },
  { id: "indochine", name: "Guerre d'Indochine", period: "1946-1954" },
  { id: "algerie", name: "Guerre d'Algérie", period: "1954-1962" },
  { id: "afrique", name: "Interventions en Afrique", period: "1960 à aujourd'hui" },
  { id: "opex", name: "Opérations contemporaines", period: "1990 à aujourd'hui" },
];

export const eventTypes: { id: EventType; label: string; plural: string }[] = [
  { id: "fondation", label: "Fondation & garnison", plural: "Fondations & garnisons" },
  { id: "bataille", label: "Bataille", plural: "Batailles" },
  { id: "campagne", label: "Campagne", plural: "Campagnes" },
  { id: "operation", label: "Opération", plural: "Opérations" },
  { id: "tradition", label: "Mémoire & traditions", plural: "Mémoire & traditions" },
];

/** Sources générales, réutilisées par plusieurs fiches. */
export const commonSources = {
  musee: {
    label: "Musée de la Légion étrangère",
    detail: "Aubagne, collections et archives",
    status: "verifie",
  },
  officiel: {
    label: "Site officiel de la Légion étrangère",
    detail: "Ministère des Armées",
    url: "https://www.terre.defense.gouv.fr/legion-etrangere",
    status: "verifie",
  },
  porch: {
    label: "Douglas Porch, The French Foreign Legion: A Complete History",
    detail: "HarperCollins, New York, 1991",
    status: "verifie",
  },
  comor: {
    label: "André-Paul Comor (dir.), La Légion étrangère. Histoire et dictionnaire",
    detail: "Robert Laffont, coll. « Bouquins », Paris, 2013",
    status: "verifie",
  },
  kepiBlanc: {
    label: "Képi blanc, revue de la Légion étrangère",
    detail: "Numéros à préciser",
    status: "a-verifier",
  },
  liberation: {
    label: "Ordre de la Libération",
    detail: "Notices des Compagnons et des unités",
    url: "https://www.ordredelaliberation.fr",
    status: "verifie",
  },
} satisfies Record<string, Source>;
