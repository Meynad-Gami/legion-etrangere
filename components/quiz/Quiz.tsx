"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { QuizQuestion } from "@/data/types";

const LETTERS = ["A", "B", "C", "D", "E"];

export function Quiz({
  questions,
  title = "Teste tes connaissances",
  tone = "light",
  contexts,
}: {
  questions: QuizQuestion[];
  title?: string;
  tone?: "light" | "dark";
  /** Pour un quiz qui mélange plusieurs événements : le contexte de chaque question. */
  contexts?: string[];
}) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[index];
  const dark = tone === "dark";

  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (index + 1 >= questions.length) setDone(true);
    else {
      setIndex(index + 1);
      setChosen(null);
    }
  };
  const restart = () => {
    setIndex(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  };

  return (
    <section
      aria-label={title}
      className={`rounded-sm p-5 sm:p-6 ${dark ? "bg-slate text-paper" : "bg-green-100/60 text-ink ring-1 ring-green-300/60"}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
        {!done && (
          <p className={`font-mono text-xs ${dark ? "text-paper/60" : "text-ink-3"}`}>
            {index + 1} / {questions.length}
          </p>
        )}
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {questions.map((_, i) => (
          <span
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
              i < index || done ? (dark ? "bg-paper" : "bg-green-800") : i === index ? (dark ? "bg-paper/50" : "bg-green-800/40") : dark ? "bg-paper/15" : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="end" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <p className="font-display text-4xl">
              {score} / {questions.length}
            </p>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-paper/80" : "text-ink-2"}`}>
              {score === questions.length
                ? "Parfait. Tu connais maintenant cette page d'histoire."
                : score >= questions.length / 2
                  ? "Bien joué ! Relis la fiche pour compléter ce qui t'a échappé."
                  : "C'est un début : la fiche est là pour t'aider. Tu peux réessayer."}
            </p>
            <button
              type="button"
              onClick={restart}
              className={`mt-5 rounded-sm px-4 py-2 text-sm ring-1 transition ${dark ? "ring-paper/40 hover:bg-paper hover:text-ink" : "ring-green-800/40 hover:bg-green-800 hover:text-paper"}`}
            >
              Recommencer
            </button>
          </motion.div>
        ) : (
          <motion.div key={index} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="mt-5">
            {contexts?.[index] && (
              <p className={`eyebrow mb-1.5 text-[0.75rem] ${dark ? "text-green-300" : "text-green-700"}`}>{contexts[index]}</p>
            )}
            <p className="text-[1.05rem] font-medium leading-snug">{q.question}</p>
            <ul className="mt-4 space-y-2">
              {q.choices.map((c, i) => {
                const isAnswer = i === q.answer;
                const isChosen = i === chosen;
                const revealed = chosen !== null;
                let state = dark ? "bg-paper/8 ring-paper/20 hover:bg-paper/15" : "bg-paper ring-rule hover:ring-green-700";
                if (revealed && isAnswer) state = dark ? "bg-paper text-ink ring-paper" : "bg-green-800 text-paper ring-green-800";
                else if (revealed && isChosen) state = dark ? "bg-garance/40 ring-garance-soft" : "bg-garance/10 ring-garance text-garance";
                else if (revealed) state = dark ? "bg-paper/5 ring-paper/10 opacity-60" : "bg-paper ring-rule opacity-60";
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      disabled={revealed}
                      className={`flex w-full items-center gap-3 rounded-sm px-3.5 py-2.5 text-left text-sm ring-1 transition ${state}`}
                    >
                      <span className="font-mono text-xs opacity-70">{LETTERS[i]}</span>
                      <span className="flex-1">{c}</span>
                      {revealed && isAnswer && <Check aria-label="Bonne réponse" className="h-4 w-4" />}
                      {revealed && isChosen && !isAnswer && <X aria-label="Réponse choisie, incorrecte" className="h-4 w-4" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div aria-live="polite">
              {chosen !== null && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <p className="text-sm font-semibold">{chosen === q.answer ? "Bonne réponse !" : "Pas tout à fait."}</p>
                  <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-paper/80" : "text-ink-2"}`}>{q.explanation}</p>
                  <button
                    type="button"
                    onClick={next}
                    className={`mt-4 rounded-sm px-4 py-2 text-sm transition ${dark ? "bg-paper text-ink hover:bg-paper-2" : "bg-slate text-paper hover:bg-green-800"}`}
                  >
                    {index + 1 >= questions.length ? "Voir mon résultat" : "Question suivante"} <ArrowRight aria-hidden className="inline h-4 w-4 align-[-3px]" strokeWidth={2} />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
