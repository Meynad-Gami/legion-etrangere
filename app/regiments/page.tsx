import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { pageBanners } from "@/data/site";
import { InsigniaPlaceholder } from "@/components/regiment/InsigniaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { eventsForRegiment, regiments } from "@/lib/data";
import { SourceList } from "@/components/event/Blocks";
import { legionSymbols, legionTraditions } from "@/data/regiments";

export const metadata: Metadata = { title: "Régiments" };

export default function RegimentsPage() {
  return (
    <>
      <PageIntro image={pageBanners.regiments} kicker="Les régiments" title="Une Légion, des régiments">
        Infanterie, cavalerie, parachutistes, génie, instruction : chaque régiment a son histoire, ses garnisons et
        ses traditions.
      </PageIntro>

      <div className="paper-grain">
        <ul className="mx-auto grid max-w-[1400px] gap-5 px-4 py-16 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
          {regiments.map((r, i) => {
            const n = eventsForRegiment(r.id).length;
            return (
              <li key={r.id}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <Link
                    href={`/regiments/${r.id}`}
                    className="group flex h-full gap-5 bg-land p-6 ring-1 ring-rule transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(40,30,10,0.12)] hover:ring-green-700"
                  >
                    <span className="text-green-800">
                      <InsigniaPlaceholder label={r.shortName} src={r.insignia.src} />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="poster text-[2.2rem] text-ink">{r.shortName}</span>
                      <span className="mt-1.5 text-sm leading-snug text-ink-2">{r.name}</span>
                      {r.nicknames?.[0] && <span className="mt-1 text-[0.8rem] font-semibold uppercase tracking-wide text-ink-3">« {r.nicknames[0].name} »</span>}
                      {r.motto && <span className="mt-3 font-display text-[1.05rem] italic leading-snug text-green-800">« {r.motto} »</span>}
                      {r.regimentalBattle && (
                        <span className="mt-1.5 text-[0.78rem] leading-snug text-ink-3">
                          Bataille régimentaire : <span className="text-ink-2">{r.regimentalBattle.name}</span>
                        </span>
                      )}
                      <span className="mt-auto pt-4 font-mono text-[0.68rem] text-ink-3">
                        {r.creationDate} · {r.garrison.split(" (")[0]}
                        {n > 0 && ` · ${n} lieu${n > 1 ? "x" : ""}`}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Symboles expliqués */}
        <section id="symboles" className="scroll-mt-24 bg-paper-2">
          <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-20">
            <p className="eyebrow text-green-700">Symboles de la Légion</p>
            <h2 className="poster mt-2 text-[clamp(2.2rem,5vw,3.6rem)]">Ce qui ne se voit qu'à la Légion</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <article className="flex h-full flex-col bg-white">
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl font-bold uppercase">{legionSymbols.grenade.title}</h3>
                    {legionSymbols.grenade.paragraphs.map((t) => (
                      <p key={t} className="mt-3 leading-relaxed text-ink-2">
                        {t}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
              <Reveal delay={0.08}>
                <article className="flex h-full flex-col bg-white p-6 md:p-8">
                  <h3 className="font-display text-2xl font-bold uppercase">{legionSymbols.pas.title}</h3>
                  <div className="mt-6 grid grid-cols-2 gap-px bg-rule">
                    <div className="bg-slate p-6 text-center text-white">
                      <p className="poster text-[clamp(3.5rem,8vw,5.5rem)] text-green-300">{legionSymbols.pas.legion}</p>
                      <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide">pas par minute</p>
                      <p className="text-sm text-white/70">La Légion</p>
                    </div>
                    <div className="bg-paper-2 p-6 text-center">
                      <p className="poster text-[clamp(2.6rem,6vw,4rem)] leading-[1.15] text-ink-3">{legionSymbols.pas.others}</p>
                      <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide text-ink-2">pas par minute</p>
                      <p className="text-sm text-ink-3">Les autres unités</p>
                    </div>
                  </div>
                  {legionSymbols.pas.paragraphs.map((t) => (
                    <p key={t} className="mt-4 leading-relaxed text-ink-2">
                      {t}
                    </p>
                  ))}
                </article>
              </Reveal>
            </div>
            <div className="mt-8">
              <Link href="/quiz?theme=traditions" className="btn">
                Tester mes connaissances <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
            <div className="mt-8 max-w-3xl">
              <p className="eyebrow text-ink-3">Sources</p>
              <SourceList sources={legionSymbols.sources} />
            </div>
          </div>
        </section>

        <section className="border-t border-rule">
          <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-6">
            <p className="eyebrow text-ink-3">Communes à tous les régiments</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">Les traditions de la Légion</h2>
            <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {legionTraditions.map((t, i) => (
                <Reveal key={t.title} delay={(i % 4) * 0.05}>
                  <dt className="font-display text-xl font-semibold">{t.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{t.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}
