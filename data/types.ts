/**
 * Modèle de données de l'encyclopédie.
 *
 * Principe éditorial : tout contenu historique porte un statut de vérification.
 * Un contenu "a-verifier" est affiché avec une mention explicite dans l'interface.
 * Les médias absents sont des placeholders identifiés (jamais de faux documents).
 */

export type Verification = "verifie" | "a-verifier";

/** Longitude, latitude (ordre GeoJSON). */
export type LngLat = [number, number];

export type EventType =
  | "fondation"
  | "bataille"
  | "campagne"
  | "operation"
  | "tradition";

export interface Source {
  label: string;
  /** Auteur, éditeur, institution. */
  detail?: string;
  url?: string;
  /** Une source "a-verifier" doit être confirmée (référence exacte, page, cote d'archive). */
  status: Verification;
}

export interface MediaImage {
  id: string;
  /** Chemin d'une image libre de droits. Absent = placeholder affiché. */
  src?: string;
  caption: string;
  credit?: string;
  /** Licence et page source (Wikimedia Commons…). */
  license?: string;
  sourceUrl?: string;
  /** Ce qu'il faudrait trouver en archives pour remplacer le placeholder. */
  archiveHint?: string;
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export interface Step {
  time: string;
  text: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  /** Sous-titre court, pour les marqueurs et les listes. */
  shortLabel: string;
  type: EventType;
  /** Date ISO de début (AAAA-MM-JJ, AAAA-MM ou AAAA). */
  date: string;
  endDate?: string;
  /** Libellé de date tel qu'affiché. */
  dateLabel: string;
  location: {
    name: string;
    country: string;
    coordinates: LngLat;
  };
  conflictId: string;
  /** Unités historiques engagées, telles que nommées à l'époque. */
  units: string;
  /** Régiments actuels (ou historiques référencés) qui en portent l'héritage. */
  regimentIds: string[];
  personIds?: string[];
  /** Citation ou inscription authentique, avec son origine. */
  epigraph?: { text: string; origin: string };
  /** Niveau découverte : 2-3 phrases simples. */
  summary: string;
  /** Question d'accroche pour le niveau découverte. */
  keyQuestion?: { question: string; answer: string };
  /** Niveau approfondi. */
  context: string;
  progress?: Step[];
  people?: string;
  consequences: string;
  takeaways: string[];
  didYouKnow?: string;
  /** Anecdotes et précisions supplémentaires (niveau découverte). */
  extraFacts?: string[];
  images: MediaImage[];
  quiz?: QuizQuestion[];
  relatedEventIds: string[];
  sources: Source[];
  tags: string[];
  /** Niveau de mise en avant sur la carte (1 = majeur). */
  importance: 1 | 2 | 3;
  status: Verification;
}

export interface Regiment {
  id: string;
  /** Sigle, ex. "2e REI". */
  shortName: string;
  name: string;
  motto?: string;
  /** Précision sur la devise (traduction, date d'adoption, réserve). */
  mottoNote?: string;
  /** Fête d'arme ou saint patron. */
  feast?: string;
  /** Surnoms en usage, avec leur origine. */
  nicknames?: { name: string; origin?: string }[];
  /** Garnisons successives, dans l'ordre chronologique. */
  garrisons?: { period: string; place: string }[];
  /** Rôle et organisation aujourd'hui. */
  today?: string;
  tagline: string;
  creationDate: string;
  /** Garnison actuelle (ou "dissous"). */
  garrison: string;
  garrisonCoordinates?: LngLat;
  active: boolean;
  formerNames: { period: string; name: string }[];
  history: string;
  milestones: Step[];
  traditions: string[];
  /** Combat que le régiment commémore comme le sien (en plus de Camerone, fêté par toute la Légion). */
  regimentalBattle?: {
    name: string;
    date: string;
    place: string;
    description: string;
    /** Lien vers l'événement de la carte, s'il existe. */
    eventId?: string;
    source: Source;
  };
  insignia: { description: string; src?: string; credit?: string; license?: string; sourceUrl?: string };
  personIds: string[];
  relatedRegimentIds: string[];
  images: MediaImage[];
  sources: Source[];
  status: Verification;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  lifespan: string;
  /** Nationalité d'origine, rappel de la diversité de la Légion. */
  origin?: string;
  summary: string;
  biography: string;
  /** Portrait libre de droits (avec crédit). */
  portrait?: MediaImage;
  eventIds: string[];
  regimentIds: string[];
  sources: Source[];
  status: Verification;
}

export interface Conflict {
  id: string;
  name: string;
  period: string;
}

export interface Era {
  id: string;
  label: string;
  start: number;
  end: number;
}
