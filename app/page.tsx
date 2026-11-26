import { ArrowRight, Check, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { Explorer } from "@/components/map/Explorer";
import { Credit } from "@/components/ui/Credit";
import { Reveal } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { videos } from "@/data/videos";
import { heroImage } from "@/data/site";
import { sortedEvents } from "@/lib/data";

const KEY_DATES = ["creation-1831", "camerone-1863", "ww1-rmle", "bir-hakeim-1942", "dien-bien-phu-1954", "kolwezi-1978"];

const DOORS = [
  { href: "/chronologie", title: "La chronologie", text: "De 1831 à aujourd'hui, toutes les étapes, période après période." },
  { href: "/regiments", title: "Les régiments", text: "Insignes, devises, batailles régimentaires et garnisons." },
  { href: "/quiz", title: "Les quiz", text: "Quelques questions pour vérifier ce que l'on a retenu." },
];

const FAQ = [
  {
    q: "Pourquoi la Légion étrangère a-t-elle été créée ?",
    a: "En mars 1831, après la révolution de Juillet, de nombreux étrangers se trouvent en France. Une loi et une ordonnance royale créent une légion de volontaires étrangers, destinée à servir hors de la France continentale. Elle part aussitôt pour l'Algérie.",
    href: "/?event=creation-1831",
  },
  {
    q: "Qu'est-ce que Camerone ?",
    a: "Le 30 avril 1863, au Mexique, 65 hommes de la Légion résistent toute une journée à des forces très supérieures pour protéger un convoi. Chaque 30 avril, toute la Légion commémore ce combat, symbole de la mission accomplie et de la parole tenue.",
    href: "/?event=camerone-1863",
  },
  {
    q: "Que signifie « Legio Patria Nostra » ?",
    a: "« La Légion est notre patrie » : c'est la devise de la Légion étrangère. Les drapeaux de ses régiments portent quant à eux l'inscription « Honneur et Fidélité ».",
    href: "/regiments",
  },
  {
    q: "Que représente la grenade à sept flammes ?",
    a: "C'est l'emblème de la Légion depuis 1874. La grenade enflammée était à l'origine le signe des grenadiers, troupes d'élite ; celle de la Légion se distingue par ses sept flammes, dont deux retombent vers le bas.",
    href: "/regiments#symboles",
  },
  {
    q: "Pourquoi les légionnaires défilent-ils si lentement ?",
    a: "La Légion marche à 88 pas par minute, contre 120 pour les autres unités. Selon l'armée de Terre, cette cadence vient du rythme de marche des armées d'Ancien Régime, transmis par le régiment de Hohenlohe.",
    href: "/regiments#symboles",
  },
  {
    q: "Qu'est-ce qu'une bataille régimentaire ?",
    a: "En plus de Camerone, fêté par toute la Légion, plusieurs régiments commémorent un combat qui leur est propre : El Moungar pour le 2e REI, la ligne Hindenburg pour le 3e REI, Bir Hakeim pour la 13e DBLE, Kolwezi pour le 2e REP.",
    href: "/regiments",
  },
  {
    q: "Où se trouve la maison mère de la Légion ?",
    a: "À Sidi-Bel-Abbès, en Algérie, de 1843 à 1962. Depuis 1962, à Aubagne, près de Marseille, au quartier Viénot, où se trouvent le monument aux morts, le musée et la main du capitaine Danjou.",
    href: "/?event=aubagne-1962",
  },
  {
    q: "Les contenus de ce site sont-ils vérifiés ?",
    a: "Chaque fiche indique ses sources. Les informations qui doivent encore être confirmées sont signalées comme telles, et les images proviennent de fonds libres de droits, avec leur crédit.",
    href: "/a-propos",
  },
];

export default function HomePage() {
  const keyEvents = KEY_DATES.map((id) => sortedEvents.find((e) => e.id === id)!).filter(Boolean);
  const figures = [
    { value: "1831", label: "Année de création" },
    { value: "9 000", label: "Légionnaires aujourd'hui" },
    { value: "140", label: "Nationalités" },
    { value: "11", label: "Régiments et unités" },
  ];

  return (
    <>
      <Hero image={heroImage} />

      {/* Chiffres clés */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 md:py-20">
          <h2 className="text-center font-display text-3xl font-bold">Chiffres clés</h2>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06} className="text-center">
                <dd className="poster text-[clamp(3.2rem,7vw,5rem)] text-green-700">{f.value}</dd>
                <dt className="mx-auto mt-3 max-w-[12rem] border-t border-rule pt-3 font-display text-lg font-bold uppercase leading-tight tracking-wide text-green-700">
                  {f.label}
                </dt>
              </Reveal>
            ))}
          </dl>
          <div className="mt-12 text-center">
            <a href="#explorer" className="btn">
              Ouvrir la carte <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-[calc(100svh-72px)] bg-sea" />}>
        <Explorer />
      </Suspense>

      {/* Dates clés */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-24">
          <Reveal>
            <p className="eyebrow text-green-700">Pour commencer</p>
            <h2 className="poster mt-3 max-w-3xl text-[clamp(2.4rem,5vw,4rem)]">Six dates pour entrer dans l'histoire</h2>
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {keyEvents.map((e, i) => {
              const img = e.images.find((x) => x.src);
              return (
                <li key={e.id}>
                  <Reveal delay={i * 0.05} className="h-full">
                    <Link href={`/?event=${e.id}`} scroll={false} className="group flex h-full flex-col bg-white transition hover:shadow-[0_10px_30px_rgba(38,46,54,0.12)]">
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate">
                        {img?.src && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img.src} alt="" className="h-full w-full object-cover grayscale-[30%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
                        )}
                        <Credit inLink credit={img?.credit} license={img?.license} />
                        <span className="poster absolute bottom-3 left-4 text-[2.6rem] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                          {e.date.slice(0, 4)}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="font-display text-sm font-bold uppercase tracking-wide text-green-700">{e.dateLabel}</span>
                        <span className="mt-1 font-display text-[1.6rem] font-bold uppercase leading-tight text-ink">{e.title}</span>
                        <span className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-2">{e.summary}</span>
                        <span className="mt-auto flex items-center gap-2 pt-5 font-display text-sm font-bold uppercase tracking-wide text-ink">
                          Voir sur la carte
                          <span aria-hidden className="flex h-8 w-8 items-center justify-center bg-slate text-white transition group-hover:bg-green-700"><ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} /></span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Documentaires */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 pt-20 md:px-6">
          <p className="eyebrow text-green-700">À regarder</p>
          <h2 className="poster mt-3 text-[clamp(2.2rem,5vw,3.6rem)]">Documentaires</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {videos
              .filter((v) => v.featured)
              .map((v) => (
                <li key={v.id}>
                  <VideoCard video={v} />
                </li>
              ))}
          </ul>
          <Link href="/archives#videos" className="mt-8 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-green-700 hover:text-ink">
            Toutes les vidéos <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section className="bg-white">
        <div className="mx-auto max-w-[960px] px-4 py-20 md:px-6">
          <h2 className="text-center font-display text-3xl font-bold">Questions fréquentes</h2>
          <ul className="mt-10 space-y-3">
            {FAQ.map((f) => (
              <li key={f.q}>
                <details className="group border border-rule bg-white open:shadow-[0_6px_20px_rgba(38,46,54,0.08)]">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 font-display text-[1.1rem] font-bold text-ink [&::-webkit-details-marker]:hidden">
                    <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center bg-green-700 text-sm text-white"><Check aria-hidden className="h-4 w-4" strokeWidth={2} /></span>
                    <span className="flex-1">{f.q}</span>
                    <span aria-hidden className="text-ink-3 transition duration-300 group-open:rotate-45"><Plus aria-hidden className="h-5 w-5" strokeWidth={2} /></span>
                  </summary>
                  <div className="px-5 pb-5 pl-[3.75rem]">
                    <p className="leading-relaxed text-ink-2">{f.a}</p>
                    <Link href={f.href} className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-green-700 hover:text-ink">
                      En savoir plus <ArrowRight aria-hidden className="inline h-4 w-4 align-[-3px]" strokeWidth={2} />
                    </Link>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Portes d'entrée */}
      <section className="bg-slate-2 text-white">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-white/10 md:grid-cols-3">
          {DOORS.map((d, i) => (
            <Reveal key={d.href} delay={i * 0.06} className="bg-slate-2">
              <Link href={d.href} className="group flex h-full flex-col p-8 md:p-12">
                <p className="poster text-[2.4rem]">{d.title}</p>
                <p className="mt-3 max-w-xs leading-relaxed text-white/70">{d.text}</p>
                <span aria-hidden className="mt-8 flex h-10 w-10 items-center justify-center bg-white text-ink transition group-hover:bg-green-700 group-hover:text-white"><ArrowRight aria-hidden className="h-5 w-5" strokeWidth={2} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
