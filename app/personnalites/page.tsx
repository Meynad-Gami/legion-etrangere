import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/event/Blocks";
import { PageIntro } from "@/components/layout/PageIntro";
import { pageBanners } from "@/data/site";
import { ArchiveFigure } from "@/components/ui/ArchiveFigure";
import { Deep, GoDeeper, Simple } from "@/components/ui/ReadingLevelBlocks";
import { Reveal } from "@/components/ui/Reveal";
import { StatusNote } from "@/components/ui/StatusNote";
import { eventsForPerson, getRegiment, people } from "@/lib/data";

export const metadata: Metadata = { title: "Personnalités" };

export default function PersonnalitesPage() {
  return (
    <>
      <PageIntro image={pageBanners.personnalites} kicker="Personnalités" title="Des visages, des parcours">
        Officiers, écrivains, poètes, volontaires : venus de France et du monde entier, ils ont marqué l'histoire de la
        Légion.
      </PageIntro>
      <div className="paper-grain">
        <div className="mx-auto max-w-[1100px] divide-y divide-rule px-4 py-10 md:px-6">
          {people.map((p) => (
            <article key={p.id} id={p.id} className="scroll-mt-24 py-12 md:grid md:grid-cols-[260px_1fr] md:gap-12">
              <Reveal>
                {p.portrait?.src ? (
                  <ArchiveFigure image={p.portrait} tall className="w-40 md:w-full" />
                ) : null}
              </Reveal>
              <Reveal delay={0.08} className="mt-6 md:mt-0">
                <p className="font-display text-base font-bold uppercase tracking-wide text-green-700">{p.lifespan}</p>
                <h2 className="poster mt-1 text-[2.8rem]">{p.name}</h2>
                <p className="mt-2 text-sm text-ink-3">
                  {p.role}
                  {p.origin && ` · origine : ${p.origin}`}
                </p>
                <p className="mt-5 text-[1.2rem] font-medium leading-snug text-ink">{p.summary}</p>
                <Simple>
                  <GoDeeper className="mt-4" label="Lire la biographie" />
                </Simple>
                <Deep>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{p.biography}</p>
                </Deep>
                <StatusNote status={p.status} className="mt-4" />
                <div className="mt-6 flex flex-wrap gap-2">
                  {eventsForPerson(p.id).map((e) => (
                    <Link key={e.id} href={`/?event=${e.id}`} className="bg-slate px-3 py-1.5 text-xs text-paper transition hover:bg-green-700">
                      {e.title} · {e.dateLabel.split(", ")[0]}
                    </Link>
                  ))}
                  {p.regimentIds.map((id) => (
                    <Link key={id} href={`/regiments/${id}`} className="bg-paper-2 px-3 py-1.5 text-xs text-ink-2 ring-1 ring-rule transition hover:ring-green-700">
                      {getRegiment(id)?.shortName}
                    </Link>
                  ))}
                </div>
                <Deep>
                <div className="mt-6 max-w-2xl">
                  <p className="eyebrow text-ink-3">Sources</p>
                  <SourceList sources={p.sources} />
                </div>
                </Deep>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
