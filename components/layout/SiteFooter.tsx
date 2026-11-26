import Link from "next/link";
import { brand } from "@/data/site";
import { navItems } from "./nav";

export function SiteFooter() {
  return (
    <footer className="bg-slate-2 text-white/75">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-3 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.fanion} alt="" width={53} height={40} className="h-10 w-auto" />
            <span className="poster text-2xl">Légion étrangère</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed">
            Un projet de transmission : raconter l'histoire de la Légion lieu par lieu, avec précision et
            respect, pour celles et ceux qui la découvrent comme pour celles et ceux qui l'ont servie.
          </p>
        </div>
        <nav aria-label="Pied de page">
          <p className="eyebrow mb-3 text-white/45">Explorer</p>
          <ul className="space-y-2 text-sm">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link className="hover:text-white" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-3 text-white/45">Le projet</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" href="/a-propos">
                À propos & charte éditoriale
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/credits">
                Crédits photographiques
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/archives">
                Sources et archives
              </Link>
            </li>
          </ul>
          <p className="mt-8 poster text-xl text-white">Legio Patria Nostra</p>
        </div>
      </div>
    </footer>
  );
}
