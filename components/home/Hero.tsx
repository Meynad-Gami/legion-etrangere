"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Credit } from "@/components/ui/Credit";

interface Props {
  /** Photographie d'archive libre de droits, en plein cadre. */
  image?: { src: string; credit: string };
}

export function Hero({ image }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={ref} className="relative flex min-h-[calc(100svh-72px)] items-center overflow-hidden bg-slate text-white">
      {image && (
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt="" className="h-full w-full object-cover grayscale-[35%]" />
        </motion.div>
      )}
      {/* Voile : assure la lisibilité du titre sur la photographie */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/45 to-night/80" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-[1200px] px-4 py-24 text-center md:px-6">
        <motion.p {...appear(0.1)} className="eyebrow text-white/80">
          Une histoire humaine et militaire depuis 1831
        </motion.p>
        <motion.h1 {...appear(0.25)} className="poster mt-5 text-[clamp(3rem,8.4vw,7.5rem)]">
          Légion étrangère
        </motion.h1>
        <motion.p {...appear(0.5)} className="mx-auto mt-6 max-w-2xl text-[1.15rem] leading-relaxed text-white/90 md:text-[1.3rem]">
          Des hommes venus du monde entier, près de deux siècles d'histoire. Les lieux, les dates et les visages, pour
          comprendre, se souvenir et transmettre.
        </motion.p>
        <motion.div {...appear(0.75)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#explorer" className="btn btn-light">
            Explorer l'histoire <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </a>
        </motion.div>
      </motion.div>

      {image && <Credit credit={image.credit} className="bottom-4 right-4" />}
    </section>
  );
}
