import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { pageBanners } from "@/data/site";
import { MarkerGlyph } from "@/components/ui/MarkerGlyph";
import { Credit } from "@/components/ui/Credit";
import { Deep } from "@/components/ui/ReadingLevelBlocks";
import { Reveal } from "@/components/ui/Reveal";
import { getConflict, getRegiment, sortedEvents } from "@/lib/data";
import { formatCoordinates } from "@/lib/geo";

export const metadata: Metadata = { title: "Batailles & opérations" };

export default function BataillesPage() {
  const list = sortedEvents.filter((e) => e.type === "bataille" || e.type === "operation" || e.type === "campagne");
  return (
    <>
      <PageIntro image={pageBanners.batailles} kicker="Batailles, campagnes & opérations" title="Sur le terrain">
        Des sièges du XIXe siècle aux opérations d'aujourd'hui : où, quand, avec qui, et pourquoi on s'en souvient.
      </PageIntro>
      <div className="paper-grain">
        <ul className="mx-auto grid max-w-[1400px] gap-px bg-rule px-0 py-0 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e, i) => (
            <li key={e.id} className="bg-paper">
              <Reveal delay={(i % 3) * 0.05} className="h-full">
                <Link href={`/?event=${e.id}`} className="group flex h-full flex-col transition hover:bg-paper-2">
                  {(() => {
                    const img = e.images.find((x) => x.src);
                    return (
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate">
                        <Credit inLink credit={img?.credit} license={img?.license} />
                        {img?.src && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover grayscale-[30%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
                        )}
                      </div>
                    );
                  })()}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="flex items-center justify-between text-ink-3">
                    <span className="flex items-center gap-2 font-mono text-[0.7rem]">
                      <MarkerGlyph type={e.type} size={11} className="text-green-800" />
                      {getConflict(e.conflictId)?.name}
                    </span>
                    <span className="font-mono text-[0.62rem]">{formatCoordinates(e.location.coordinates)}</span>
                  </div>
                  <p className="mt-8 font-display text-base font-bold uppercase tracking-wide text-green-700">{e.dateLabel}</p>
                  <h2 className="mt-1 font-display text-[2rem] font-bold uppercase leading-tight">{e.title}</h2>
                  <p className="text-sm text-ink-3">
                    {e.location.name}, {e.location.country}
                  </p>
                  <p className="mt-4 line-clamp-3 text-[0.94rem] leading-relaxed text-ink-2">{e.summary}</p>
                  <Deep>
                    <p className="mt-3 text-[0.85rem] leading-snug text-ink-3">
                      <span className="font-semibold text-ink-2">Unités engagées :</span> {e.units}
                    </p>
                  </Deep>
                  {e.regimentIds.length > 0 && (
                    <p className="mt-4 flex flex-wrap gap-1.5">
                      {e.regimentIds.map((id) => (
                        <span key={id} className="bg-paper-2 px-2 py-0.5 text-[0.68rem] text-ink-2 ring-1 ring-rule">
                          {getRegiment(id)?.shortName}
                        </span>
                      ))}
                    </p>
                  )}
                  <span className="mt-auto flex items-center gap-2 pt-6 font-display text-sm font-bold uppercase tracking-wide text-ink">
                    Voir sur la carte
                    <span aria-hidden className="flex h-8 w-8 items-center justify-center bg-slate text-white transition group-hover:bg-green-700"><ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} /></span>
                  </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
