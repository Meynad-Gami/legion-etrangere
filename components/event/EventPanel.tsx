"use client";

import { ArrowLeft, ArrowRight, ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArchiveFigure } from "@/components/ui/ArchiveFigure";
import { MarkerGlyph } from "@/components/ui/MarkerGlyph";
import { Credit } from "@/components/ui/Credit";
import { StatusNote } from "@/components/ui/StatusNote";
import { VideoCard } from "@/components/ui/VideoCard";
import { videosForEvent } from "@/data/videos";
import { Quiz } from "@/components/quiz/Quiz";
import type { HistoricalEvent } from "@/data/types";
import { getConflict, getEvent, getPerson, getRegiment, typeLabel } from "@/lib/data";
import { formatCoordinates } from "@/lib/geo";
import { useReadingLevel } from "@/lib/reading-level";
import { DidYouKnow, SectionHeading, SourceList, StepList } from "./Blocks";

interface Props {
  event: HistoricalEvent;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onStep: (dir: -1 | 1) => void;
  mobile: boolean;
}

const DEEP_SECTIONS = [
  { id: "contexte", label: "Contexte" },
  { id: "deroulement", label: "Déroulement" },
  { id: "hommes", label: "Les hommes" },
  { id: "consequences", label: "Conséquences" },
  { id: "archives", label: "Archives" },
  { id: "sources", label: "Sources" },
];

export function EventPanel({ event: e, onClose, onNavigate, onStep, mobile }: Props) {
  const { level } = useReadingLevel();
  const [deep, setDeep] = useState(level === "approfondir");
  const [answerShown, setAnswerShown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setDeep(level === "approfondir");
    setAnswerShown(false);
    scrollRef.current?.scrollTo({ top: 0 });
    titleRef.current?.focus({ preventScroll: true });
  }, [e.id, level]);

  const conflict = getConflict(e.conflictId);
  const regiments = e.regimentIds.map(getRegiment).filter((r) => !!r);
  const persons = (e.personIds ?? []).map(getPerson).filter((p) => !!p);
  const cover = e.images.find((i) => i.src);
  const related = e.relatedEventIds.map(getEvent).filter((x) => !!x);
  const sections = DEEP_SECTIONS.filter((s) =>
    s.id === "deroulement" ? e.progress?.length : s.id === "hommes" ? e.people : s.id === "archives" ? e.images.some((i) => i.src) : true,
  );

  const scrollTo = (id: string) =>
    scrollRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <motion.aside
      aria-labelledby="fiche-titre"
      initial={mobile ? { y: "100%" } : { x: "105%" }}
      animate={mobile ? { y: 0, height: expanded ? "100%" : "68%" } : { x: 0 }}
      exit={mobile ? { y: "100%" } : { x: "105%" }}
      transition={{ type: "spring", stiffness: 260, damping: 34 }}
      className={`paper-grain pointer-events-auto absolute z-40 flex flex-col bg-paper shadow-[0_10px_50px_rgba(25,20,5,0.28)] ${
        mobile ? "inset-x-0 bottom-0 rounded-t-xl" : "bottom-3 right-3 top-3 w-[min(460px,calc(100%-24px))] ring-1 ring-rule"
      }`}
    >
      {/* Barre supérieure */}
      <div className="flex shrink-0 items-center gap-2 border-b border-rule px-4 py-2.5">
        {mobile && (
          <button
            type="button"
            onClick={() => setExpanded((x) => !x)}
            className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 bg-ink/20"
            aria-label={expanded ? "Réduire la fiche" : "Agrandir la fiche"}
          />
        )}
        <span className="flex min-w-0 items-center gap-2 text-[0.72rem] text-ink-3">
          <MarkerGlyph type={e.type} size={11} className="shrink-0 text-green-800" />
          <span className="truncate">
            {typeLabel(e.type)} · {conflict?.name}
          </span>
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1">
          <IconButton label="Événement précédent" onClick={() => onStep(-1)}>
            <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={2} />
          </IconButton>
          <IconButton label="Événement suivant" onClick={() => onStep(1)}>
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </IconButton>
          <IconButton label="Fermer la fiche" onClick={onClose}>
            <X aria-hidden className="h-5 w-5" strokeWidth={2} />
          </IconButton>
        </span>
      </div>

      <div ref={scrollRef} className="scrollbar-thin flex-1 overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait">
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* En-tête : photographie d'archive si disponible */}
            {cover?.src && (
              <figure className="relative aspect-[16/9] overflow-hidden bg-slate">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover.src} alt={cover.caption} className="h-full w-full object-cover grayscale-[25%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                <Credit credit={cover.credit} license={cover.license} />
              </figure>
            )}
            <header className="px-6 pb-5 pt-6">
              <p className="font-display text-[0.95rem] font-bold uppercase tracking-wide text-green-700">{e.dateLabel}</p>
              <h2 id="fiche-titre" ref={titleRef} tabIndex={-1} className="poster mt-1.5 text-[2.7rem] text-ink focus:outline-none">
                {e.title}
              </h2>
              <p className="mt-3 font-display text-[1.05rem] font-semibold text-ink-2">
                {e.location.name}, {e.location.country}
              </p>
              <p className="mt-0.5 text-[0.75rem] text-ink-3">{formatCoordinates(e.location.coordinates)}</p>
              <StatusNote status={e.status} className="mt-3" />
            </header>

            {e.epigraph && (
              <blockquote className="mx-6 mb-6 border-l-[3px] border-green-700 pl-4">
                <p className="font-display text-[1.25rem] italic leading-snug text-ink">« {e.epigraph.text} »</p>
                <footer className="mt-1.5 text-[0.72rem] text-ink-3">{e.epigraph.origin}</footer>
              </blockquote>
            )}

            {/* Niveau découverte */}
            <div className="space-y-6 px-6 py-6">
              <p className="text-[1.06rem] leading-relaxed text-ink">{e.summary}</p>

              {e.keyQuestion && (
                <div className="bg-slate p-5 text-paper">
                  <p className="eyebrow text-[0.58rem] text-paper/60">La question</p>
                  <p className="mt-1.5 font-display text-[1.35rem] leading-snug">{e.keyQuestion.question}</p>
                  <AnimatePresence initial={false} mode="wait">
                    {answerShown ? (
                      <motion.p key="a" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 text-[0.95rem] leading-relaxed text-paper/85">
                        {e.keyQuestion.answer}
                      </motion.p>
                    ) : (
                      <motion.button
                        key="b"
                        type="button"
                        exit={{ opacity: 0 }}
                        onClick={() => setAnswerShown(true)}
                        className="mt-4 px-3.5 py-2 text-sm ring-1 ring-paper/40 transition hover:bg-paper hover:text-ink"
                      >
                        Découvrir la réponse
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div>
                <p className="eyebrow text-[0.6rem] text-ink-3">À retenir</p>
                <ul className="mt-2 space-y-2">
                  {e.takeaways.map((t, i) => (
                    <li key={i} className="flex gap-3 text-[0.95rem] leading-snug text-ink-2">
                      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-green-800" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {e.didYouKnow && <DidYouKnow>{e.didYouKnow}</DidYouKnow>}
              {e.extraFacts?.map((f) => <DidYouKnow key={f}>{f}</DidYouKnow>)}

              {!deep && (
                <button
                  type="button"
                  onClick={() => setDeep(true)}
                  className="group flex w-full items-center justify-between border-y border-rule py-3.5 text-left"
                >
                  <span>
                    <span className="block font-display text-xl font-semibold text-ink">En savoir plus</span>
                    <span className="block text-xs text-ink-3">Contexte, déroulement, les hommes, archives et sources</span>
                  </span>
                  <span aria-hidden className="text-green-800 transition group-hover:translate-x-1"><ChevronDown aria-hidden className="h-6 w-6" strokeWidth={2} /></span>
                </button>
              )}
            </div>

            {/* Niveau approfondi */}
            <AnimatePresence initial={false}>
              {deep && (
                <motion.div
                  // overflow « visible » une fois ouvert, pour que la navigation de sections reste collante.
                  initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                  animate={{ opacity: 1, height: "auto", transitionEnd: { overflow: "visible" } }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <nav aria-label="Sections de la fiche" className="no-scrollbar sticky top-0 z-10 flex gap-1 overflow-x-auto border-y border-rule bg-paper/95 px-6 py-2 backdrop-blur">
                    {sections.map((s) => (
                      <button key={s.id} type="button" onClick={() => scrollTo(s.id)} className="shrink-0 px-2.5 py-1 text-[0.72rem] text-ink-2 hover:bg-paper-2 hover:text-ink">
                        {s.label}
                      </button>
                    ))}
                  </nav>

                  <div className="space-y-9 px-6 py-7">
                    <section>
                      <SectionHeading id="contexte" kicker="Comprendre">
                        Contexte historique
                      </SectionHeading>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{e.context}</p>
                      <p className="mt-4 text-[0.8rem] text-ink-3">
                        <span className="eyebrow mr-2 text-[0.58rem]">Unités engagées</span>
                        {e.units}
                      </p>
                    </section>

                    {e.progress && e.progress.length > 0 && (
                      <section>
                        <SectionHeading id="deroulement" kicker="Heure par heure, jour après jour">
                          Déroulement
                        </SectionHeading>
                        <StepList steps={e.progress} />
                      </section>
                    )}

                    {e.people && (
                      <section>
                        <SectionHeading id="hommes" kicker="Ceux qui étaient là">
                          Les hommes
                        </SectionHeading>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{e.people}</p>
                        {persons.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {persons.map((p) => (
                              <li key={p.id}>
                                <Link href={`/personnalites#${p.id}`} className="group flex items-center justify-between bg-paper-2 px-3.5 py-2.5 ring-1 ring-rule transition hover:ring-green-700">
                                  <span>
                                    <span className="block font-display text-lg font-bold leading-tight text-ink">{p.name}</span>
                                    <span className="block text-[0.72rem] text-ink-3">
                                      {p.role} · {p.lifespan}
                                    </span>
                                  </span>
                                  <span aria-hidden className="text-green-800 transition group-hover:translate-x-0.5"><ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} /></span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    )}

                    <section>
                      <SectionHeading id="consequences" kicker="Et après ?">
                        Conséquences
                      </SectionHeading>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{e.consequences}</p>
                    </section>

                    {regiments.length > 0 && (
                      <section>
                        <p className="eyebrow text-[0.6rem] text-ink-3">Régiments héritiers</p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {regiments.map((r) => (
                            <li key={r.id}>
                              <Link href={`/regiments/${r.id}`} className="inline-flex items-center gap-2 bg-slate px-3 py-1.5 text-[0.78rem] text-paper transition hover:bg-green-700">
                                {r.shortName}
                                <ArrowRight aria-hidden className="h-3.5 w-3.5 text-paper/60" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}
{e.images.some((i) => i.src) && (

                    <section>
                      <SectionHeading id="archives" kicker="Photographies & documents">
                        Archives
                      </SectionHeading>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {e.images.map((img) => (
                          <ArchiveFigure key={img.id} image={img} />
                        ))}
                      </div>
                    </section>
                    )}

                    <section>
                      <SectionHeading id="sources" kicker="Pour aller plus loin">
                        Sources
                      </SectionHeading>
                      <SourceList sources={e.sources} />
                    </section>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Liens & quiz */}
            <div className="space-y-6 px-6 pb-10">
              {videosForEvent(e.id).length > 0 && (
                <section>
                  <p className="eyebrow text-[0.75rem] text-green-700">En vidéo</p>
                  <ul className="mt-2 space-y-2">
                    {videosForEvent(e.id).map((v) => (
                      <li key={v.id}>
                        <VideoCard video={v} compact />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {related.length > 0 && (
                <section>
                  <p className="eyebrow text-[0.6rem] text-ink-3">Sur la carte, voir aussi</p>
                  <ul className="mt-2 divide-y divide-rule border-y border-rule">
                    {related.map((r) => (
                      <li key={r.id}>
                        <button type="button" onClick={() => onNavigate(r.id)} className="group flex w-full items-center justify-between py-2.5 text-left">
                          <span>
                            <span className="block font-mono text-[0.66rem] text-ink-3">{r.dateLabel}</span>
                            <span className="block font-display text-lg font-bold leading-tight text-ink group-hover:text-green-800">{r.title}</span>
                          </span>
                          <span aria-hidden className="text-green-800 transition group-hover:translate-x-1"><ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} /></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {e.quiz && e.quiz.length > 0 && <Quiz key={e.id} questions={e.quiz} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center text-base text-ink-2 transition hover:bg-paper-2 hover:text-ink"
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}
