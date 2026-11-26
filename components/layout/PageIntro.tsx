import type { ReactNode } from "react";
import { Credit } from "@/components/ui/Credit";
import { Reveal } from "@/components/ui/Reveal";

/** Bandeau de page : photographie d'archive en fond (si fournie), titre d'affiche en capitales. */
export function PageIntro({
  kicker,
  title,
  children,
  image,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
  image?: { src: string; credit?: string };
}) {
  return (
    <header className="relative overflow-hidden bg-slate text-white">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt="" className="absolute inset-0 h-full w-full object-cover grayscale-[40%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/70 to-night/35" />
        </>
      )}
      <div className="relative mx-auto max-w-[1400px] px-4 pb-14 pt-16 md:px-6 md:pb-20 md:pt-24">
        <Reveal>
          <p className="eyebrow text-green-300">{kicker}</p>
          <h1 className="poster mt-4 text-[clamp(2.8rem,8vw,6rem)]">{title}</h1>
          {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">{children}</div>}
        </Reveal>
      </div>
      {image?.credit && <Credit credit={image.credit} className="bottom-3 right-4" />}
    </header>
  );
}
