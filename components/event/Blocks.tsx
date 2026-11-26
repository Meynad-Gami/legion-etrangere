import type { ReactNode } from "react";
import { SourceStatus } from "@/components/ui/StatusNote";
import type { Source, Step } from "@/data/types";

export function SectionHeading({ id, kicker, children }: { id?: string; kicker?: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-24">
      {kicker && <p className="eyebrow mb-1 text-[0.72rem] text-green-700">{kicker}</p>}
      <h3 className="font-display text-[1.7rem] font-bold uppercase leading-tight text-ink">{children}</h3>
    </div>
  );
}

/** Déroulement chronologique, façon carnet de marche. */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative mt-4 space-y-5 border-l border-rule pl-5">
      {steps.map((s, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[25px] top-1.5 h-2 w-2 bg-green-700" aria-hidden="true" />
          <p className="font-display text-[0.85rem] font-bold uppercase tracking-wide text-green-700">{s.time}</p>
          <p className="mt-0.5 text-[0.94rem] leading-relaxed text-ink-2">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ul className="mt-3 divide-y divide-rule border-y border-rule">
      {sources.map((s, i) => (
        <li key={i} className="flex items-start justify-between gap-4 py-2.5">
          <div className="text-sm">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noreferrer" className="text-ink underline decoration-rule underline-offset-4 hover:decoration-green-700">
                {s.label}
              </a>
            ) : (
              <span className="text-ink">{s.label}</span>
            )}
            {s.detail && <span className="block text-[0.78rem] text-ink-3">{s.detail}</span>}
          </div>
          <SourceStatus status={s.status} />
        </li>
      ))}
    </ul>
  );
}

export function DidYouKnow({ children }: { children: ReactNode }) {
  return (
    <aside className="relative overflow-hidden border-l-[3px] border-green-700 bg-paper-2 px-5 py-4">
      <p className="eyebrow text-[0.75rem] text-green-700">Le savais-tu ?</p>
      <p className="mt-1.5 text-[1.05rem] leading-relaxed text-ink">{children}</p>
    </aside>
  );
}
