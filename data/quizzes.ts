import type { QuizQuestion } from "./types";

/** Quiz thématiques, indépendants d'un événement de la carte. Faits tirés des fiches régiments et symboles. */
export interface ThemeQuiz {
  id: string;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}

export const themeQuizzes: ThemeQuiz[] = [
  {
    id: "traditions",
    title: "Traditions & symboles",
    subtitle: "Grenade, pas Légion, képi blanc",
    questions: [
      {
        question: "À quelle cadence la Légion défile-t-elle ?",
        choices: ["60 pas par minute", "88 pas par minute", "120 pas par minute", "140 pas par minute"],
        answer: 1,
        explanation: "88 pas par minute, contre 120 pour les autres unités de l'armée, qui marchent au « pas redoublé ».",
      },
      {
        question: "Comment appelle-t-on la cadence de 120 pas par minute des autres unités de l'armée ?",
        choices: ["Le pas lent", "Le pas redoublé", "Le pas de charge", "Le pas de route"],
        answer: 1,
        explanation: "Le « pas redoublé », par opposition à l'ancien pas de campagne, plus lent, dont la Légion a gardé la tradition avec ses 88 pas par minute.",
      },
      {
        question: "Combien de flammes compte la grenade, emblème de la Légion ?",
        choices: ["Cinq", "Six", "Sept", "Neuf"],
        answer: 2,
        explanation: "Sept flammes, dont deux retombent vers le bas, « en retour ». C'est ce qui la distingue des autres grenades de l'armée.",
      },
      {
        question: "À l'origine, la grenade enflammée était l'emblème de quelles troupes ?",
        choices: ["Les grenadiers, troupes d'élite", "Les marins", "Les artilleurs de forteresse", "Les cavaliers"],
        answer: 0,
        explanation: "La grenade était le signe des grenadiers, les troupes d'élite des armées d'Ancien Régime. La Légion l'adopte en 1874.",
      },
      {
        question: "Que signifie « Legio Patria Nostra » ?",
        choices: ["La Légion avant tout", "La Légion est notre patrie", "La patrie reconnaissante", "Honneur et fidélité"],
        answer: 1,
        explanation: "C'est la devise de la Légion : « La Légion est notre patrie ».",
      },
      {
        question: "Quelle inscription portent les drapeaux de la Légion ?",
        choices: ["Honneur et Patrie", "Valeur et Discipline", "Honneur et Fidélité", "Liberté, Égalité, Fraternité"],
        answer: 2,
        explanation: "« Honneur et Fidélité », à la place du « Honneur et Patrie » des autres unités. Ils portent aussi « Camerone 1863 ».",
      },
      {
        question: "Qui ouvre les défilés de la Légion, barbe, tablier de buffle et hache sur l'épaule ?",
        choices: ["Les tambours", "Les pionniers", "Les porte-drapeaux", "Les anciens de Camerone"],
        answer: 1,
        explanation: "Les pionniers rappellent le rôle de bâtisseurs des légionnaires, qui ont construit routes, ponts et tunnels.",
      },
      {
        question: "D'où vient la couleur blanche du képi des légionnaires ?",
        choices: [
          "D'un ordre de Napoléon III",
          "Du couvre-képi blanchi par le soleil et les lavages",
          "De l'uniforme des Suisses de 1831",
          "D'une tradition du Mexique",
        ],
        answer: 1,
        explanation: "Le couvre-képi, porté pour se protéger du soleil, blanchissait au fil des lavages. Il est devenu la marque distinctive de la Légion.",
      },
    ],
  },
  {
    id: "regiments",
    title: "Régiments & surnoms",
    subtitle: "Garnisons, devises, batailles régimentaires",
    questions: [
      {
        question: "Quel régiment est surnommé « le Royal Étranger » ?",
        choices: ["Le 1er RE", "Le 2e REP", "Le 1er REC", "La 13e DBLE"],
        answer: 2,
        explanation: "Le 1er régiment étranger de cavalerie, en hommage au régiment Royal-Étranger cavalerie créé en 1659 sous Louis XIV.",
      },
      {
        question: "Quelle devise le 1er REC a-t-il reprise du Royal-Étranger de Louis XIV ?",
        choices: ["More Majorum", "Nec pluribus impar", "Être prêt", "Rien n'empêche"],
        answer: 1,
        explanation: "« Nec pluribus impar », « à nul autre pareil », la devise de Louis XIV, avec le soleil d'or de son insigne.",
      },
      {
        question: "Quel régiment est appelé « le creuset de la Légion » ?",
        choices: ["Le 4e RE, à Castelnaudary", "Le 1er RE, à Aubagne", "Le 2e REI, à Nîmes", "Le 3e REI, à Kourou"],
        answer: 0,
        explanation: "C'est au 4e régiment étranger que chaque engagé volontaire reçoit sa formation initiale et son képi blanc.",
      },
      {
        question: "Quelle est la bataille régimentaire du 2e REI, fêtée chaque 2 septembre ?",
        choices: ["Magenta", "Camerone", "El Moungar", "Bir Hakeim"],
        answer: 2,
        explanation: "Le combat d'El Moungar, le 2 septembre 1903, dans le Sud-Oranais.",
      },
      {
        question: "Quelle est la devise du 2e REI ?",
        choices: ["Être prêt", "Legio Patria Nostra", "More Majorum", "Ad unum"],
        answer: 0,
        explanation: "« Être prêt », au singulier, adoptée en 1990 au moment de la guerre du Golfe.",
      },
      {
        question: "Quel est le seul régiment parachutiste de la Légion ?",
        choices: ["Le 1er REG", "Le 2e REP", "Le 3e REI", "Le 1er REC"],
        answer: 1,
        explanation: "Le 2e régiment étranger de parachutistes, stationné à Calvi, en Corse.",
      },
      {
        question: "Où est stationné le 3e REI, « le régiment le plus décoré de la Légion » ?",
        choices: ["À Djibouti", "À Mayotte", "En Guyane", "À Nîmes"],
        answer: 2,
        explanation: "À Kourou, en Guyane, depuis 1973. Il y protège notamment le centre spatial.",
      },
      {
        question: "Quelle unité de la Légion est Compagnon de la Libération ?",
        choices: ["Le 4e RE", "La 13e DBLE", "Le 2e REG", "Le 1er RE"],
        answer: 1,
        explanation: "La 13e demi-brigade de Légion étrangère, ralliée à la France libre en 1940. C'est aussi la seule unité de l'armée à porter encore le nom de « demi-brigade ».",
      },
    ],
  },
];
