/** Documentaires YouTube (chaînes officielles ou médias reconnus). Liens vérifiés le 7 octobre 2026. */
export interface VideoLink {
  id: string;
  title: string;
  channel: string;
  /** Durée affichée. */
  duration: string;
  description: string;
  /** Événement de la carte concerné. */
  eventId?: string;
  /** Mise en avant sur l'accueil. */
  featured?: boolean;
}

export const videos: VideoLink[] = [
  {
    id: "SNXdFCKZoko",
    title: "La Légion étrangère",
    channel: "Karambolage, ARTE",
    duration: "5 min",
    description: "Une courte présentation de l'histoire et des singularités de la Légion étrangère.",
    eventId: "creation-1831",
    featured: true,
  },
  {
    id: "V1A4fnF3Bmg",
    title: "Récit du combat de Camerone",
    channel: "Légion étrangère",
    duration: "7 min",
    description: "Le récit du combat du 30 avril 1863, tel qu'il est lu chaque année devant les troupes.",
    eventId: "camerone-1863",
    featured: true,
  },
  {
    id: "bU5JMBDV6lo",
    title: "Camerone 2026",
    channel: "Légion étrangère",
    duration: "17 min",
    description: "Le film officiel de la cérémonie de Camerone, le 30 avril 2026 à Aubagne.",
    eventId: "aubagne-1962",
  },
  {
    id: "lMOTDiRe-DI",
    title: "Bir Hakeim, les combattants du désert",
    channel: "ECPAD",
    duration: "12 min",
    description: "La résistance des Français libres à Bir Hakeim, de mai à juin 1942, à partir des archives de l'ECPAD.",
    eventId: "bir-hakeim-1942",
    featured: true,
  },
  {
    id: "uwE3g7YA2jk",
    title: "Fragments d'Indochine",
    channel: "ECPAD",
    duration: "12 min",
    description: "La guerre d'Indochine racontée à partir d'archives filmées, jusqu'à son dénouement.",
    eventId: "indochine-1946",
  },
  {
    id: "Wo5ja19QCJc",
    title: "Dien Bien Phu : pourquoi la France a perdu cette bataille",
    channel: "Le Monde",
    duration: "12 min",
    description: "Le déroulement et les causes de la défaite de mai 1954, expliqués carte à l'appui.",
    eventId: "dien-bien-phu-1954",
  },
  {
    id: "xe9g5IEEsiY",
    title: "Le 2e REP saute sur Kolwezi, 1978",
    channel: "Légion étrangère",
    duration: "33 min",
    description: "L'opération aéroportée de mai 1978 racontée par la Légion.",
    eventId: "kolwezi-1978",
    featured: true,
  },
  {
    id: "HDyrE9kKky8",
    title: "Le képi blanc",
    channel: "Légion étrangère",
    duration: "1 min",
    description: "La remise du képi blanc, étape symbolique de la formation des engagés volontaires.",
  },
];

export const videosForEvent = (eventId: string) => videos.filter((v) => v.eventId === eventId);
