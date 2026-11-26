"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReadingLevel, type ReadingLevel } from "@/lib/reading-level";

const options: { id: ReadingLevel; label: string; hint: string }[] = [
  { id: "decouverte", label: "Découverte", hint: "L'essentiel en quelques lignes, avec questions et anecdotes." },
  { id: "approfondir", label: "Approfondir", hint: "Contexte, déroulé détaillé, unités engagées, garnisons, biographies et sources." },
];

export function ReadingLevelToggle({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { level, setLevel } = useReadingLevel();
  const dark = tone === "dark";
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const choose = (o: (typeof options)[number]) => {
    if (o.id === level) return;
    setLevel(o.id);
    setNotice(`${o.label} : ${o.hint}`);
  };

  return (
    <div className="relative">
    <div
      role="radiogroup"
      aria-label="Niveau de lecture"
      className={`relative inline-flex p-0.5 font-display text-[0.85rem] font-semibold uppercase tracking-wide ${dark ? "bg-white/8 ring-1 ring-white/15" : "bg-paper-2 ring-1 ring-rule"}`}
    >
      {options.map((o) => {
        const active = level === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={o.hint}
            onClick={() => choose(o)}
            className={`relative z-10 px-3.5 py-1.5 transition-colors ${
              active ? (dark ? "text-ink" : "text-paper") : dark ? "text-paper/70 hover:text-paper" : "text-ink-2 hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`reading-pill-${tone}`}
                className={`absolute inset-0 -z-10 ${dark ? "bg-paper" : "bg-slate"}`}
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
      <AnimatePresence>
        {notice && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-full z-50 mt-2 w-72 bg-slate px-4 py-3 text-sm normal-case leading-snug tracking-normal text-white shadow-lg"
          >
            {notice}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
