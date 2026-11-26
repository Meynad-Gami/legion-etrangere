"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Deux niveaux de lecture pour un même contenu :
 * - "decouverte" : l'essentiel, court, pour les enfants et les débutants ;
 * - "approfondir" : contexte, déroulement, sources, ouverts par défaut.
 */
export type ReadingLevel = "decouverte" | "approfondir";

const ReadingLevelContext = createContext<{
  level: ReadingLevel;
  setLevel: (l: ReadingLevel) => void;
}>({ level: "decouverte", setLevel: () => {} });

const KEY = "legion.readingLevel";

export function ReadingLevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<ReadingLevel>("decouverte");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "decouverte" || saved === "approfondir") setLevelState(saved);
    } catch {}
  }, []);

  const setLevel = (l: ReadingLevel) => {
    setLevelState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  };

  return (
    <ReadingLevelContext.Provider value={{ level, setLevel }}>{children}</ReadingLevelContext.Provider>
  );
}

export const useReadingLevel = () => useContext(ReadingLevelContext);
