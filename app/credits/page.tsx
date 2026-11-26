import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { heroImage, pageBanners } from "@/data/site";
import { people, regiments, sortedEvents } from "@/lib/data";

export const metadata: Metadata = { title: "Crédits photographiques" };

interface Row {
  key: string;
  src: string;
  title: string;
  credit?: string;
  license?: string;
  sourceUrl?: string;
}

/** Toutes les images du site, avec leur auteur, leur licence et leur source. */
export default function CreditsPage() {
  const documents: Row[] = [
    ...sortedEvents.flatMap((e) =>
      e.images.filter((i) => i.src).map((i) => ({ key: i.id, src: i.src!, title: i.caption, credit: i.credit, license: i.license, sourceUrl: i.sourceUrl })),
    ),
    ...regiments.flatMap((r) =>
      r.images.filter((i) => i.src).map((i) => ({ key: i.id, src: i.src!, title: i.caption, credit: i.credit, license: i.license, sourceUrl: i.sourceUrl })),
    ),
  ];
  const banners: Row[] = [heroImage, ...Object.values(pageBanners)].map((b) => ({ key: b.src, src: b.src, title: b.credit }));
  const insignia: Row[] = regiments
    .filter((r) => r.insignia.src)
    .map((r) => ({ key: r.id, src: r.insignia.src!, title: `Insigne du ${r.shortName}`, credit: r.insignia.credit, license: r.insignia.license, sourceUrl: r.insignia.sourceUrl }));
  const portraits: Row[] = people
    .filter((p) => p.portrait?.src)
    .map((p) => ({ key: p.id, src: p.portrait!.src!, title: p.portrait!.caption, credit: p.portrait!.credit, license: p.portrait!.license, sourceUrl: p.portrait!.sourceUrl }));

  return (
    <>
      <PageIntro kicker="Crédits" title="Crédits photographiques">
        Les images du site proviennent de fonds libres de droits. Merci à leurs auteurs.
      </PageIntro>
      <div className="mx-auto max-w-[1100px] space-y-16 px-4 py-16 md:px-6">
        <Group title="Bandeaux" rows={banners} />
        <Group title="Photographies et documents" rows={documents} />
        <Group title="Portraits" rows={portraits} />
        <Group title="Insignes" rows={insignia} contain />
      </div>
    </>
  );
}

function Group({ title, rows, contain = false }: { title: string; rows: Row[]; contain?: boolean }) {
  if (!rows.length) return null;
  return (
    <section>
      <h2 className="font-display text-3xl font-bold uppercase">{title}</h2>
      <ul className="mt-6 divide-y divide-rule border-y border-rule">
        {rows.map((r) => (
          <li key={r.key} className="flex items-center gap-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.src} alt="" loading="lazy" className={`h-14 w-20 shrink-0 bg-paper-2 ${contain ? "object-contain p-1" : "object-cover"}`} />
            <div className="min-w-0 flex-1 text-sm">
              <p className="text-ink">{r.title}</p>
              {(r.credit || r.license) && (
                <p className="text-ink-3">
                  {[r.credit, r.license].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
            {r.sourceUrl && (
              <a href={r.sourceUrl} target="_blank" rel="noreferrer" className="shrink-0 text-sm text-green-700 underline underline-offset-4 hover:text-ink">
                Source
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
