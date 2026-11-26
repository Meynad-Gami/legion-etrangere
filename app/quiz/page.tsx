import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { pageBanners } from "@/data/site";
import { QuizHub } from "@/components/quiz/QuizHub";

export const metadata: Metadata = { title: "Quiz" };

export default function QuizPage() {
  return (
    <>
      <PageIntro image={pageBanners.quiz} kicker="Quiz" title="Teste tes connaissances">
        Quelques questions, des explications à chaque réponse. Pas de note, pas de piège : juste pour apprendre.
      </PageIntro>
      <div className="paper-grain">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6">
          <QuizHub />
        </div>
      </div>
    </>
  );
}
