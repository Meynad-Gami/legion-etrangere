/** Lit un paramètre d'adresse, dans la query (?x=) ou dans une route en hash (#/page?x=). */
export function readQueryParam(name: string) {
  if (typeof window === "undefined") return null;
  const fromSearch = new URLSearchParams(window.location.search).get(name);
  if (fromSearch) return fromSearch;
  const hash = window.location.hash;
  const i = hash.indexOf("?");
  return i === -1 ? null : new URLSearchParams(hash.slice(i + 1)).get(name);
}
