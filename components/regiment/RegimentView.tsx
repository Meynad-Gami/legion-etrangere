import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Regiment } from "@/data/types";
import Link from "next/link";
import { SectionHeading, SourceList, StepList } from "@/components/event/Blocks";
import { InsigniaPlaceholder } from "@/components/regiment/InsigniaPlaceholder";
import { ArchiveFigure } from "@/components/ui/ArchiveFigure";
import { MarkerGlyph } from "@/components/ui/MarkerGlyph";
import { Reveal } from "@/components/ui/Reveal";
import { Deep, GoDeeper, Simple } from "@/components/ui/ReadingLevelBlocks";
import { Credit } from "@/components/ui/Credit";
import { StatusNote } from "@/components/ui/StatusNote";
import { legionTraditions } from "@/data/regiments";
import { eventsForRegiment, getPerson, getRegiment } from "@/lib/data";


/** Fiche complète d'un régiment. */
export function RegimentView({ r }: { r: Regiment }) {
  const evts = eventsForRegiment(r.id);
  const persons = r.personIds.map(getPerson).filter((p) => !!p);
  const banner = r.images.find((i) => i.src);
  const related = r.relatedRegimentIds.map(getRegiment).filter((x) => !!x);

  return (
    <>
      <header className="relative overflow-hidden bg-slate text-white">
        {banner?.src && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={banner.src} alt="" className="absolute inset-0 h-full w-full object-cover grayscale-[40%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/80 to-night/50" />
            <Credit credit={banner.credit} license={banner.license} className="bottom-3 right-4" />
          </>
        )}
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 pb-14 pt-12 md:grid-cols-[1fr_auto] md:px-6 md:pb-20 md:pt-16">
          <Reveal>
            <Link href="/regiments" className="text-sm text-paper/60 hover:text-paper">
              <ArrowLeft aria-hidden className="inline h-4 w-4 align-[-3px]" strokeWidth={2} /> Tous les régiments
            </Link>
            <p className="eyebrow mt-10 text-paper/55">{r.name}</p>
            <h1 className="poster mt-3 text-[clamp(4.5rem,13vw,10rem)]">{r.shortName}</h1>
            <p className="mt-5 max-w-xl text-lg leading-snug text-paper/75">{r.tagline}</p>
            {r.nicknames && r.nicknames.length > 0 && (
              <p className="mt-3 font-display text-lg font-semibold uppercase tracking-wide text-green-300">
                Surnom{r.nicknames.length > 1 ? "s" : ""} : {r.nicknames.map((n) => `« ${n.name} »`).join(" · ")}
              </p>
            )}
            {r.motto && (
              <p className="mt-6 font-display text-3xl italic text-paper">
                « {r.motto} »
                {r.mottoNote && <span className="mt-1 block font-sans text-xs not-italic text-paper/50">{r.mottoNote}</span>}
              </p>
            )}
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-paper/15 pt-6 sm:grid-cols-3">
              <Fact label="Création" value={r.creationDate} />
              <Fact label="Garnison" value={r.garrison} />
              <Fact label={r.regimentalBattle ? "Bataille régimentaire" : "Fête"} value={r.regimentalBattle ? `${r.regimentalBattle.name} · ${r.regimentalBattle.date}` : r.feast ?? ", "} />
            </dl>
          </Reveal>
          <div className="flex flex-col items-center text-paper/80 md:pt-16">
            <div className="relative bg-paper/95 p-5">
              <InsigniaPlaceholder label={r.shortName} size="lg" src={r.insignia.src} />
              <Credit credit={r.insignia.credit} license={r.insignia.license} className="bottom-1.5 right-1.5" />
            </div>
            <p className="mt-2 max-w-[11rem] text-center text-[0.65rem] text-paper/45">{r.insignia.src ? "Insigne régimentaire" : "Insigne à intégrer"}</p>
          </div>
        </div>
      </header>

      <div className="paper-grain">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-16 md:px-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-14">
            <StatusNote status={r.status} />
            <section>
              <SectionHeading kicker="Histoire">Évolution historique</SectionHeading>
              <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-ink-2">{r.history}</p>
              {r.today && (
                <div className="mt-6 max-w-3xl border-l-[3px] border-green-700 bg-paper-2 px-5 py-4">
                  <p className="eyebrow text-[0.75rem] text-green-700">Aujourd'hui</p>
                  <p className="mt-1.5 leading-relaxed text-ink-2">{r.today}</p>
                </div>
              )}
              <Deep>
              {r.nicknames?.some((n) => n.origin) && (
                <div className="mt-6 max-w-3xl">
                  <p className="eyebrow text-[0.75rem] text-green-700">D'où vient son surnom ?</p>
                  {r.nicknames
                    .filter((n) => n.origin)
                    .map((n) => (
                      <p key={n.name} className="mt-1.5 leading-relaxed text-ink-2">
                        <strong className="font-semibold text-ink">« {n.name} »</strong> : {n.origin}
                      </p>
                    ))}
                </div>
              )}
              </Deep>
            </section>

            {r.regimentalBattle && (
              <section className="bg-slate p-6 text-paper md:p-8">
                <p className="eyebrow text-[0.6rem] text-paper/55">Bataille régimentaire</p>
                <h2 className="poster mt-2 text-5xl">{r.regimentalBattle.name}</h2>
                <p className="mt-2 font-display text-base font-bold uppercase tracking-wide text-green-300">
                  {r.regimentalBattle.date} · {r.regimentalBattle.place}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-paper/80">{r.regimentalBattle.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                  {r.regimentalBattle.eventId && (
                    <Link href={`/?event=${r.regimentalBattle.eventId}`} className="btn btn-light">
                      Ouvrir sur la carte <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                    </Link>
                  )}
                  {r.regimentalBattle.source.url && (
                    <a href={r.regimentalBattle.source.url} target="_blank" rel="noreferrer" className="text-paper/60 underline underline-offset-4 hover:text-paper">
                      Source : {r.regimentalBattle.source.label}
                    </a>
                  )}
                </div>
                <p className="mt-4 text-xs text-paper/45">Comme toute la Légion, le régiment célèbre aussi Camerone chaque 30 avril.</p>
              </section>
            )}

            <section>
              <SectionHeading kicker="Repères">Les grandes étapes</SectionHeading>
              <Simple>
                <StepList steps={r.milestones.slice(0, 4)} />
                {r.milestones.length > 4 && <GoDeeper className="mt-5" label={`Voir les ${r.milestones.length} étapes`} />}
              </Simple>
              <Deep>
                <StepList steps={r.milestones} />
              </Deep>
            </section>

            <section>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading kicker="Campagnes & lieux d'engagement">Sur la carte</SectionHeading>
                {evts.length > 0 && (
                  <Link href={`/?regiment=${r.id}`} className="bg-slate px-4 py-2 text-sm text-paper transition hover:bg-green-700">
                    Voir l'itinéraire du régiment <ArrowRight aria-hidden className="inline h-4 w-4 align-[-3px]" strokeWidth={2} />
                  </Link>
                )}
              </div>
              {evts.length ? (
                <ul className="mt-5 divide-y divide-rule border-y border-rule">
                  {evts.map((e) => (
                    <li key={e.id}>
                      <Link href={`/?event=${e.id}`} className="group flex items-center gap-4 py-3.5">
                        <MarkerGlyph type={e.type} size={12} className="shrink-0 text-green-800" />
                        <span className="w-40 shrink-0 font-mono text-xs text-ink-3">{e.dateLabel}</span>
                        <span className="flex-1 font-display text-xl font-bold leading-tight group-hover:text-green-800">{e.title}</span>
                        <span className="hidden text-sm text-ink-3 sm:inline">{e.location.country}</span>
                        <span aria-hidden className="text-green-800 transition group-hover:translate-x-1"><ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} /></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm italic text-ink-3">Les engagements de ce régiment restent à documenter dans l'encyclopédie.</p>
              )}
            </section>

            <section>
              <SectionHeading kicker="Mémoire">Traditions</SectionHeading>
              {r.traditions.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {r.traditions.map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed text-ink-2">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-green-800" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-6 text-sm text-ink-3">Comme toute la Légion, le régiment partage :</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {legionTraditions.map((t) => (
                  <li key={t.title} title={t.text} className="bg-paper-2 px-3 py-1 text-xs text-ink-2 ring-1 ring-rule">
                    {t.title}
                  </li>
                ))}
              </ul>
            </section>

            {r.images.length > 0 && (
              <section>
                <SectionHeading kicker="Photographies">Archives</SectionHeading>
                <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                  {r.images.map((img) => (
                    <ArchiveFigure key={img.id} image={img} />
                  ))}
                </div>
              </section>
            )}

            <Deep>
              <section>
                <SectionHeading kicker="Pour aller plus loin">Sources</SectionHeading>
                <SourceList sources={r.sources} />
              </section>
            </Deep>
          </div>

          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <Simple>
              <GoDeeper label="Garnisons, appellations et insigne" />
            </Simple>
            <Deep>
              <div className="space-y-10">
            <section>
              <p className="eyebrow text-ink-3">Appellations</p>
              <ol className="mt-3 space-y-3">
                {r.formerNames.map((n) => (
                  <li key={n.period + n.name}>
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-green-700">{n.period}</p>
                    <p className="text-[0.95rem] text-ink">{n.name}</p>
                  </li>
                ))}
              </ol>
            </section>
            {r.garrisons && r.garrisons.length > 0 && (
              <section>
                <p className="eyebrow text-ink-3">Garnisons successives</p>
                <ol className="mt-3 border-l border-rule pl-4">
                  {r.garrisons.map((g) => (
                    <li key={g.period + g.place} className="relative pb-3 last:pb-0">
                      <span className="absolute -left-[21px] top-1.5 h-2 w-2 bg-green-700" aria-hidden />
                      <p className="font-display text-sm font-bold uppercase tracking-wide text-green-700">{g.period}</p>
                      <p className="text-[0.95rem] text-ink">{g.place}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            <section>
              <p className="eyebrow text-ink-3">Insigne</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{r.insignia.description}</p>
            </section>
              </div>
            </Deep>
            {r.feast && (
              <section>
                <p className="eyebrow text-ink-3">Fête du régiment</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{r.feast}</p>
              </section>
            )}
            {persons.length > 0 && (
              <section>
                <p className="eyebrow text-ink-3">Grandes figures</p>
                <ul className="mt-3 space-y-2">
                  {persons.map((p) => (
                    <li key={p.id}>
                      <Link href={`/personnalites#${p.id}`} className="block bg-land px-4 py-3 ring-1 ring-rule transition hover:ring-green-700">
                        <span className="block font-display text-lg font-bold leading-tight">{p.name}</span>
                        <span className="block text-xs text-ink-3">
                          {p.role} · {p.lifespan}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {related.length > 0 && (
              <section>
                <p className="eyebrow text-ink-3">Régiments liés</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {related.map((x) => (
                    <li key={x.id}>
                      <Link href={`/regiments/${x.id}`} className="inline-block bg-slate px-3.5 py-1.5 text-sm text-paper transition hover:bg-green-700">
                        {x.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-[0.58rem] text-paper/50">{label}</dt>
      <dd className="mt-1 text-[0.95rem] text-paper/90">{value}</dd>
    </div>
  );
}
