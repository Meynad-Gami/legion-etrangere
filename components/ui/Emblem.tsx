/** Grenade à sept flammes, stylisée au trait. Purement décorative. */
export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <circle cx="16" cy="29" r="8" strokeWidth="1.6" />
      <path d="M12.5 21.8h7" strokeWidth="1.6" />
      <g strokeWidth="1.4" strokeLinecap="round">
        <path d="M16 21V5" />
        <path d="M14.5 21C13 15 11 10 11.5 6" />
        <path d="M17.5 21C19 15 21 10 20.5 6" />
        <path d="M13.5 21.2C10.5 17 7.5 13 7 9" />
        <path d="M18.5 21.2C21.5 17 24.5 13 25 9" />
        <path d="M13 21.5C9 20 5 18.5 3.5 21" />
        <path d="M19 21.5C23 20 27 18.5 28.5 21" />
      </g>
    </svg>
  );
}
