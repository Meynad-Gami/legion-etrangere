import { Emblem } from "@/components/ui/Emblem";

/** Insigne du régiment ; emplacement réservé tant qu'aucune image sourcée n'est associée. */
export function InsigniaPlaceholder({ label, size = "md", src }: { label: string; size?: "md" | "lg"; src?: string }) {
  const dims = size === "lg" ? "h-44 w-36" : "h-24 w-20";
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={`Insigne du ${label}`} className={`${dims} shrink-0 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]`} />
    );
  }
  return (
    <div className={`relative ${dims} shrink-0`} role="img" aria-label={`Insigne du ${label}, emplacement réservé`}>
      <svg viewBox="0 0 100 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M50 3 95 16v42c0 30-20 48-45 59C25 106 5 88 5 58V16Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
        <path d="M50 10 88 21v37c0 26-17 41-38 51C29 99 12 84 12 58V21Z" fill="currentColor" opacity="0.06" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pb-3">
        <Emblem className={size === "lg" ? "h-12 w-10 opacity-70" : "h-7 w-6 opacity-70"} />
        <span className={`font-mono tracking-wide opacity-80 ${size === "lg" ? "text-sm" : "text-[0.6rem]"}`}>{label}</span>
      </div>
    </div>
  );
}
