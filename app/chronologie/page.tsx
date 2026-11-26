import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { pageBanners } from "@/data/site";
import { MarkerGlyph } from "@/components/ui/MarkerGlyph";
import { Deep, GoDeeper, Simple } from "@/components/ui/ReadingLevelBlocks";
import { Reveal } from "@/components/ui/Reveal";
import { eras, getConflict, sortedEvents, typeLabel, yearOf } from "@/lib/data";

export const metadata: Metadata = { title: "Chronologie" };

export default function ChronologiePage() {
  return (
    <>
      <PageIntro image={pageBanners.chronologie} kicker="Chronologie" title="De 1831 à aujourd'hui">
        Près de deux siècles d'histoire, période après période. Chaque étape s'ouvre sur la carte.
      </PageIntro>

      <div className="paper-grain">
        <div className="mx-auto max-w-[1100px] px-4 py-16 md:px-6 md:py-24">
          {/* Sommaire des périodes */}
          <nav aria-label="Périodes" className="no-scrollbar -mx-4 mb-16 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
            {eras.map((era) => (
              <a key={era.id} href={`#${era.id}`} className="shrink-0 bg-paper-2 px-3.5 py-1.5 text-xs text-ink-2 ring-1 ring-rule transition hover:bg-slate hover:text-paper">
                {era.label}
              </a>
            ))}
          </nav>

          {eras.map((era) => {
            const list = sortedEvents.filter((e) => yearOf(e.date) >= era.start && yearOf(e.date) <= era.end);
            return (
              <section key={era.id} id={era.id} aria-labelledby={`h-${era.id}`} className="scroll-mt-24 md:grid md:grid-cols-[220px_1fr] md:gap-10">
                <div className="md:sticky md:top-24 md:self-start">
                  <p className="font-display text-base font-bold uppercase tracking-wide text-green-700">
                    {era.end === 2026 ? `Depuis ${era.start}` : `${era.start}-${era.end}`}
                  </p>
                  <h2 id={`h-${era.id}`} className="poster mt-1 text-4xl">
                    {era.label}
                  </h2>
                </div>
                <ol className="relative mb-20 mt-6 border-l border-rule md:mt-0">
                  {list.length === 0 && (
                    <li className="pl-8 text-sm italic text-ink-3">Événements à documenter pour cette période.</li>
                  )}
                  {list.map((e, i) => (
                    <li key={e.id} className="relative pb-10 pl-8 last:pb-0">
                      <span className="absolute -left-[9px] top-1 flex h-[18px] w-[18px] items-center justify-center bg-paper text-green-800">
                        <MarkerGlyph type={e.type} size={12} />
                      </span>
                      <Reveal delay={i * 0.04}>
                        <p className="font-mono text-[0.75rem] text-ink-3">
                          {e.dateLabel} · {typeLabel(e.type)} · {getConflict(e.conflictId)?.name}
                        </p>
                        <h3 className="mt-1 font-display text-[1.9rem] font-bold uppercase leading-tight">{e.title}</h3>
                        <p className="mt-0.5 text-sm text-ink-3">
                          {e.location.name}, {e.location.country}
                        </p>
                        <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{e.summary}</p>
                        <Deep>
                          <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{e.context}</p>
                          {e.progress && e.progress.length > 0 && (
                            <ul className="mt-3 max-w-2xl space-y-1.5 border-l-2 border-green-700/40 pl-4 text-[0.92rem] text-ink-2">
                              {e.progress.map((st) => (
                                <li key={st.time + st.text}>
                                  <span className="font-display font-bold uppercase tracking-wide text-green-700">{st.time}</span> {st.text}
                                </li>
                              ))}
                            </ul>
                          )}
                          <p className="mt-3 max-w-2xl text-sm text-ink-3">
                            <span className="font-semibold text-ink-2">Unités engagées :</span> {e.units}
                          </p>
                        </Deep>
                        <Link href={`/?event=${e.id}`} className="mt-3 inline-flex items-center gap-1.5 text-sm text-green-800 hover:text-ink">
                          Ouvrir sur la carte <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                        </Link>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
