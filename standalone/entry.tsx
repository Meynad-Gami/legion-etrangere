import { createRoot } from "react-dom/client";
import AProposPage from "@/app/a-propos/page";
import ArchivesPage from "@/app/archives/page";
import BataillesPage from "@/app/batailles/page";
import CreditsPage from "@/app/credits/page";
import ChronologiePage from "@/app/chronologie/page";
import HomePage from "@/app/page";
import PersonnalitesPage from "@/app/personnalites/page";
import QuizPage from "@/app/quiz/page";
import RegimentsPage from "@/app/regiments/page";
import { Providers } from "@/components/layout/Providers";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RegimentView } from "@/components/regiment/RegimentView";
import { events } from "@/data/events";
import { people } from "@/data/people";
import { regiments } from "@/data/regiments";
import * as site from "@/data/site";
import { getRegiment } from "@/lib/data";
import { HashRouter, useRoute } from "./router";

/**
 * Version « fichier unique » : toutes les images sont intégrées en data URI (window.__ASSETS__).
 * On remplace les chemins /archives/…, /insignes/… dans les données avant le premier rendu.
 */
const ASSETS: Record<string, string> = (window as unknown as { __ASSETS__?: Record<string, string> }).__ASSETS__ ?? {};

function inlineAssets(value: unknown, seen = new Set<unknown>()): void {
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === "string" && ASSETS[v]) (value as Record<string, unknown>)[k] = ASSETS[v];
    else if (typeof v === "object") inlineAssets(v, seen);
  }
}
inlineAssets(events);
inlineAssets(regiments);
inlineAssets(people);
inlineAssets(site.heroImage);
inlineAssets(site.pageBanners);
inlineAssets(site.brand);

const TITLES: Record<string, string> = {
  "/": "Légion étrangère, une histoire depuis 1831",
  "/chronologie": "Chronologie",
  "/regiments": "Régiments",
  "/batailles": "Batailles & opérations",
  "/personnalites": "Personnalités",
  "/archives": "Archives",
  "/quiz": "Quiz",
  "/a-propos": "À propos",
  "/credits": "Crédits photographiques",
};

function Page() {
  const { path } = useRoute();
  const m = path.match(/^\/regiments\/([^/]+)$/);
  if (m) {
    const r = getRegiment(m[1]);
    document.title = r ? `${r.shortName}, ${r.name} · Légion étrangère` : TITLES["/"];
    if (r) return <RegimentView r={r} />;
  } else {
    document.title = path === "/" ? TITLES["/"] : `${TITLES[path] ?? "Légion étrangère"} · Légion étrangère`;
  }
  switch (path) {
    case "/chronologie":
      return <ChronologiePage />;
    case "/regiments":
      return <RegimentsPage />;
    case "/batailles":
      return <BataillesPage />;
    case "/personnalites":
      return <PersonnalitesPage />;
    case "/archives":
      return <ArchivesPage />;
    case "/quiz":
      return <QuizPage />;
    case "/a-propos":
      return <AProposPage />;
    case "/credits":
      return <CreditsPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <HashRouter>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2"
      >
        Aller au contenu
      </a>
      <Providers>
        <SiteHeader />
        <main id="contenu">
          <Page />
        </main>
        <SiteFooter />
      </Providers>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
