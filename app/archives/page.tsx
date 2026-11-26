import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/event/Blocks";
import { PageIntro } from "@/components/layout/PageIntro";
import { pageBanners } from "@/data/site";
import { ArchiveFigure } from "@/components/ui/ArchiveFigure";
import { Reveal } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { videos } from "@/data/videos";
import { commonSources } from "@/data/catalog";
import { sortedEvents } from "@/lib/data";

export const metadata: Metadata = { title: "Archives" };

export default function ArchivesPage() {
  const items = sortedEvents.flatMap((e) => e.images.filter((img) => img.src).map((img) => ({ img, e })));
  return (
    <>
      <PageIntro image={pageBanners.archives} kicker="Archives" title="Le fonds documentaire">
        Photographies, gravures et portraits de près de deux siècles d'histoire.
      </PageIntro>
      <div className="paper-grain">
        <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-6">
          <div className="max-w-3xl rounded-sm border border-dashed border-rule bg-paper-2 p-5 text-sm leading-relaxed text-ink-2">
            Toutes les images viennent de fonds libres de droits. Les auteurs et licences sont réunis dans les <Link href="/credits" className="underline underline-offset-4 hover:text-green-700">crédits photographiques</Link>.
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {items.map(({ img, e }, i) => (
              <li key={`${e.id}-${img.id}`}>
                <Reveal delay={(i % 4) * 0.04}>
                  <ArchiveFigure image={img} />
                  <Link href={`/?event=${e.id}`} className="mt-1 inline-block font-mono text-[0.68rem] text-green-800 hover:text-ink">
                    {e.title} · {e.dateLabel} <ArrowRight aria-hidden className="inline h-3 w-3 align-[-1px]" strokeWidth={2} />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <section id="videos" className="mt-24 scroll-mt-24">
            <p className="eyebrow text-ink-3">Documentaires</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">Vidéos</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((v) => (
                <li key={v.id}>
                  <VideoCard video={v} />
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-24 max-w-3xl">
            <p className="eyebrow text-ink-3">Références générales</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">Sources & institutions</h2>
            <SourceList sources={Object.values(commonSources)} />
          </section>
        </div>
      </div>
    </>
  );
}
