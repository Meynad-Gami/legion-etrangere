import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { pageBanners } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "À propos" };

const CHARTER = [
  { title: "Exactitude", text: "Aucun fait, aucune source, aucune citation inventés. Ce qui n'est pas vérifié est signalé comme tel, à la vue de tous." },
  { title: "Sobriété", text: "Pas d'effets spectaculaires, pas de glorification de la violence. La guerre est racontée pour être comprise." },
  { title: "Respect", text: "Des morts, des anciens, des traditions, et des adversaires d'hier, qui ont eux aussi leurs morts et leur mémoire." },
  { title: "Humanité", text: "Derrière chaque date, des hommes venus du monde entier. Le site nomme les personnes autant que les batailles." },
  { title: "Complexité", text: "Les épisodes douloureux ou controversés, guerres coloniales, guerre d'Algérie, putsch de 1961, sont abordés sans les taire ni les simplifier." },
  { title: "Transmission", text: "Deux niveaux de lecture, des quiz, des questions simples : pour que chacun reparte en ayant appris quelque chose." },
];

export default function AProposPage() {
  return (
    <>
      <PageIntro image={pageBanners.apropos} kicker="À propos" title="Transmettre une histoire">
        Une encyclopédie visuelle et interactive de la Légion étrangère, pensée pour le grand public comme pour les
        passionnés.
      </PageIntro>
      <div className="paper-grain">
        <div className="mx-auto max-w-[1100px] px-4 py-16 md:px-6">
          <h2 className="font-display text-4xl font-semibold">Charte éditoriale</h2>
          <dl className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {CHARTER.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.06}>
                <dt className="flex items-baseline gap-3 font-display text-2xl font-semibold">
                  <span className="poster text-2xl text-green-700">{String(i + 1).padStart(2, "0")}</span>
                  {c.title}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-2">{c.text}</dd>
              </Reveal>
            ))}
          </dl>

          <section className="mt-20 grid gap-10 border-t border-rule pt-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold">Nos sources</h2>
              <p className="mt-4 leading-relaxed text-ink-2">
                Les textes s'appuient sur les publications officielles de la Légion étrangère et du ministère des Armées,
                sur les travaux de la Fédération des sociétés d'anciens de la Légion étrangère et sur des ouvrages
                d'histoire. Chaque fiche indique ses sources, et les images proviennent de fonds libres de droits, avec
                leur crédit.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold">Une remarque ?</h2>
              <p className="mt-4 leading-relaxed text-ink-2">
                Une erreur, une précision, un document d'archive à partager : les remarques des anciens, des historiens
                et des passionnés sont les bienvenues pour faire vivre ce site.
              </p>
            </div>
          </section>

          <p className="mt-16 border-t border-rule pt-6 text-sm leading-relaxed text-ink-3">
            Ce site a été réalisé par un réserviste du 2e régiment étranger d'infanterie, désireux d'apporter sa pierre à
            l'édifice : rendre accessible à tous l'histoire d'un corps qui lui est cher.
          </p>
        </div>
      </div>
    </>
  );
}
