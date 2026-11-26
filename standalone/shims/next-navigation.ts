import { useMemo } from "react";
import { useRoute } from "../router";

/** Remplace next/navigation pour la version « fichier unique ». */
export const usePathname = () => useRoute().path;

export function useSearchParams() {
  const { query } = useRoute();
  return useMemo(() => new URLSearchParams(query), [query]);
}

export function notFound(): never {
  throw new Error("Page introuvable");
}
