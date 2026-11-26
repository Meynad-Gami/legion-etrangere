"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { brand } from "@/data/site";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReadingLevelToggle } from "@/components/ui/ReadingLevelToggle";
import { navItems } from "./nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? pathname === "/" : pathname === href || !!pathname?.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white text-ink shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center gap-6 px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Accueil, Légion étrangère, une histoire">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.fanion} alt="" width={53} height={40} className="h-10 w-auto shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
          <span className="whitespace-nowrap leading-tight">
            <span className="poster block text-[1.35rem] leading-none">Légion étrangère</span>
            <span className="mt-1 block font-display text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink-3">Une histoire depuis 1831</span>
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative px-3 py-2 font-display text-[1.02rem] font-semibold text-ink-2 transition-colors hover:text-green-700 aria-[current=page]:text-ink"
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-[19px] h-[3px] bg-green-700"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden md:block xl:ml-2">
          <ReadingLevelToggle />
        </div>

        <button
          type="button"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded md:ml-2 xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span aria-hidden className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navigation principale"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t border-rule bg-white px-4 pb-6 pt-2 xl:hidden"
          >
            <ul>
              {[...navItems, { href: "/a-propos", label: "À propos" }].map((item) => (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="poster block py-3.5 text-2xl text-ink-2 aria-[current=page]:text-green-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 md:hidden">
              <ReadingLevelToggle />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
