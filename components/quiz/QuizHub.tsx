"use client";

import { useEffect, useMemo, useState } from "react";
import type { QuizQuestion } from "@/data/types";
import { themeQuizzes } from "@/data/quizzes";
import { sortedEvents } from "@/lib/data";
import { readQueryParam } from "@/lib/query";
import { Quiz } from "./Quiz";

const withQuiz = sortedEvents.filter((e) => e.quiz?.length);

export function QuizHub() {
  const [topic, setTopic] = useState<string>("general");
  const [seed, setSeed] = useState(0);

  // Lien direct vers un thème : /quiz?theme=traditions
  useEffect(() => {
    const t = readQueryParam("theme");
    if (t && (themeQuizzes.some((x) => x.id === t) || withQuiz.some((e) => e.id === t))) setTopic(t);
  }, []);

  // Quiz général : 6 questions tirées au hasard (après le montage, pour éviter tout écart serveur/client).
  // Chaque question garde la mention de son événement, pour rester compréhensible hors contexte.
  type Item = { q: QuizQuestion; context: string };
  const pool = (n: number) => [
    ...withQuiz.flatMap((e) => e.quiz!.slice(0, n).map((q) => ({ q, context: `${e.title} · ${e.dateLabel}` }))),
    ...themeQuizzes.flatMap((t) => t.questions.slice(0, n).map((q) => ({ q, context: t.title }))),
  ];
  const [general, setGeneral] = useState<Item[]>(() => pool(1).slice(0, 6));
  useEffect(() => {
    setGeneral([...pool(9)].sort(() => Math.random() - 0.5).slice(0, 6));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const current = useMemo(() => {
    if (topic === "general")
      return { title: "Quiz général", questions: general.map((g) => g.q), contexts: general.map((g) => g.context) };
    const theme = themeQuizzes.find((t) => t.id === topic);
    if (theme) return { title: theme.title, questions: theme.questions, contexts: undefined };
    const e = withQuiz.find((x) => x.id === topic)!;
    return { title: `${e.title} · ${e.dateLabel}`, questions: e.quiz!, contexts: undefined };
  }, [topic, general]);

  return (
    <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
      <nav aria-label="Choisir un quiz">
        <p className="eyebrow mb-3 text-ink-3">Choisis un thème</p>
        <ul className="space-y-1">
          <li>
            <TopicButton active={topic === "general"} onClick={() => { setTopic("general"); setSeed((s) => s + 1); }}>
              <span className="font-display text-lg font-semibold">Quiz général</span>
              <span className="block text-xs opacity-70">6 questions sur toute l'histoire</span>
            </TopicButton>
          </li>
          {themeQuizzes.map((t) => (
            <li key={t.id}>
              <TopicButton active={topic === t.id} onClick={() => setTopic(t.id)}>
                <span className="font-display text-lg font-semibold">{t.title}</span>
                <span className="block font-mono text-[0.68rem] opacity-70">
                  {t.subtitle} · {t.questions.length} questions
                </span>
              </TopicButton>
            </li>
          ))}
          <li aria-hidden className="pb-1 pt-4">
            <span className="eyebrow text-[0.7rem] text-ink-3">Par événement</span>
          </li>
          {withQuiz.map((e) => (
            <li key={e.id}>
              <TopicButton active={topic === e.id} onClick={() => setTopic(e.id)}>
                <span className="font-display text-lg font-semibold">{e.title}</span>
                <span className="block font-mono text-[0.68rem] opacity-70">
                  {e.dateLabel} · {e.quiz!.length} questions
                </span>
              </TopicButton>
            </li>
          ))}
        </ul>
      </nav>
      <div className="lg:pt-8">
        <Quiz key={`${topic}-${seed}`} questions={current.questions} contexts={current.contexts} title={current.title} tone="dark" />
      </div>
    </div>
  );
}

function TopicButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full px-4 py-2.5 text-left transition ${active ? "bg-slate text-paper" : "text-ink hover:bg-paper-2"}`}
    >
      {children}
    </button>
  );
}
