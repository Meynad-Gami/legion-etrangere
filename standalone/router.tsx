"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Routeur par hash (#/regiments/2e-rei?x=y) pour la version « fichier unique » :
 * il fonctionne en ouvrant le fichier directement depuis l'ordinateur.
 */
export interface Route {
  path: string;
  query: string;
}

const RouteContext = createContext<Route>({ path: "/", query: "" });
export const useRoute = () => useContext(RouteContext);

/** Ancre à atteindre après le prochain changement de page (ex. /regiments#symboles). */
let pendingAnchor: string | null = null;
export const setPendingAnchor = (id: string | null) => {
  pendingAnchor = id;
};

export function parseHash(hash: string): Route {
  if (!hash.startsWith("#/")) return { path: "/", query: "" };
  const raw = hash.slice(1);
  const q = raw.indexOf("?");
  const path = (q === -1 ? raw : raw.slice(0, q)).replace(/\/+$/, "") || "/";
  return { path, query: q === -1 ? "" : raw.slice(q + 1) };
}

/** Convertit un lien du site (« /regiments#symboles ») en adresse hash et ancre éventuelle. */
export function toHashHref(href: string): { href: string; anchor: string | null } {
  if (href.startsWith("#") || /^[a-z]+:/i.test(href)) return { href, anchor: null };
  const [beforeHash, anchor = null] = href.split("#");
  return { href: "#" + (beforeHash || "/"), anchor };
}

export function HashRouter({ children }: { children: ReactNode }) {
  const [hash, setHash] = useState(() => window.location.hash);
  const route = useMemo(() => parseHash(hash), [hash]);

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    // Les ancres internes (#explorer) défilent sans changer de page.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      const href = a?.getAttribute("href");
      if (!href || !href.startsWith("#") || href.startsWith("#/")) return;
      const el = document.getElementById(href.slice(1));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onChange);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Défilement : vers l'ancre demandée, sinon en haut quand la page change.
  const [lastPath, setLastPath] = useState(route.path);
  useEffect(() => {
    const anchor = pendingAnchor;
    pendingAnchor = null;
    if (anchor) {
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }), 60);
    } else if (route.path !== lastPath) {
      window.scrollTo(0, 0);
    }
    setLastPath(route.path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.path, route.query]);

  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>;
}
