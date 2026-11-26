"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Apparition douce au défilement, en CSS. Le contenu reste visible sans JavaScript
 * ou si l'utilisateur préfère réduire les animations (voir [data-reveal] dans globals.css).
 */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={className} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
