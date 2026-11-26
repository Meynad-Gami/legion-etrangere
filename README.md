# Légion étrangère — une histoire (prototype)

Encyclopédie interactive de l'histoire de la Légion étrangère : une carte du monde couplée à une frise
chronologique, des fiches événements à deux niveaux de lecture, des fiches régiments, des personnalités et des quiz.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production (pages statiques)
```

## 1. Concept UX/UI

- **La carte est la page d'accueil.** Un hero sobre (« LÉGION ÉTRANGÈRE — 1831 — aujourd'hui »), puis une carte en
  plein écran. Rien à lire avant de pouvoir explorer.
- **Esthétique d'atlas ancien, interface moderne.** Papier, encre, vert Légion, rouge réservé à la sélection.
  Côtes gravées, graticule, noms d'océans en italique, coordonnées « façon carnet ».
- **Deux niveaux de lecture, une seule interface.** « Découverte » (résumé, une question, « à retenir »,
  « le savais-tu ? », quiz) / « Approfondir » (contexte, déroulement, les hommes, conséquences, archives, sources).
  Le bouton « En savoir plus » fait passer de l'un à l'autre dans la fiche.
- **Sans quitter la carte.** La fiche s'ouvre en panneau (desktop) ou en bottom sheet (mobile), la carte vole vers
  le lieu et trace les liens vers les événements associés.
- **Le temps comme filtre.** La frise (curseur glissable, périodes cliquables, précédent / suivant) filtre la carte
  et relie chronologiquement les lieux de la période. Sur mobile : périodes en puces + bandeau à balayer.
- **Honnêteté éditoriale.** Tout contenu non vérifié porte la mention « en cours de vérification » ; chaque source
  est marquée « Référence » ou « À vérifier » ; les images absentes sont des emplacements réservés qui
  indiquent le document à rechercher.

## 2. Architecture technique

| Choix | Pourquoi |
| --- | --- |
| Next.js 16 (App Router), React 19, TypeScript | Pages statiques (SEO, performance), routes par régiment générées. |
| Tailwind CSS 4 | Design tokens dans `app/globals.css` (`@theme`). |
| **D3-geo + d3-zoom (SVG) plutôt que Mapbox** | Pas de clé API ni de tuiles tierces ; rendu « carte ancienne » entièrement maîtrisé ; marqueurs en vrais boutons HTML (accessibles au clavier). Mapbox / MapLibre restent possibles plus tard pour un zoom au niveau du terrain. |
| Framer Motion | Transitions de la fiche, apparitions, tracés animés ; `MotionConfig reducedMotion="user"`. |
| `world-atlas` (Natural Earth 1:50m) | Fond de carte hors ligne, servi depuis `public/geo`. |

```
app/                     routes : / , /chronologie, /regiments, /regiments/[id], /batailles,
                         /personnalites, /archives, /quiz, /a-propos
components/map/          WorldMap (projection, zoom, marqueurs, tracés), Explorer (orchestration),
                         Timeline, MobileTimeline, FilterBar, EventList (+ légende)
components/event/        EventPanel (fiche), blocs (déroulement, sources…)
components/quiz/         Quiz, QuizHub
data/                    types.ts, catalog.ts (périodes, conflits, sources), events.ts,
                         regiments.ts, people.ts
lib/                     data.ts (index, filtres, relations), reading-level.tsx, geo.ts
```

## 3. Structure des données

Voir `data/types.ts`. Résumé :

- `HistoricalEvent` : `id`, `title`, `type`, `date`/`endDate`/`dateLabel`, `location {name, country, coordinates}`,
  `conflictId`, `units` (unités historiques), `regimentIds` (régiments héritiers), `personIds`, `epigraph`,
  `summary`, `keyQuestion`, `context`, `progress[]`, `people`, `consequences`, `takeaways[]`, `didYouKnow`,
  `images[]`, `quiz[]`, `relatedEventIds`, `sources[]`, `tags`, `importance`, `status`.
- `Regiment` : sigle, nom, création, garnison, appellations successives, histoire, jalons, traditions, insigne,
  grandes figures, régiments liés, archives, sources, statut.
- `Person`, `Conflict`, `Era`, `Source` (avec statut `verifie` / `a-verifier`).

Les relations sont calculées dans `lib/data.ts` (événements d'un régiment, d'une personne…) : régiment ⇄ batailles
⇄ personnalités se naviguent dans les deux sens.

### Ajouter un événement

Ajouter un objet au tableau de `data/events.ts`. La carte, la frise, les filtres (pays, conflit, régiment,
type, période), la chronologie, les pages régiments, les archives et les quiz se mettent à jour seuls.
Pour une image : renseigner `images[].src` (fichier dans `public/`), `credit` et `license`.

## Insignes, devises et batailles régimentaires

Chaque fiche régiment porte sa devise, sa bataille régimentaire (ou sa fête d'arme quand aucun combat propre
n'est documenté), et son insigne (`public/insignes/`, issus de Wikimedia Commons : auteur, licence et lien
affichés sur la fiche ; les fichiers CC BY-SA imposent cette attribution).

## Direction artistique

Inspirée des supports officiels de la Légion (legion-recrute.com) : fond blanc, ardoise `#262E36`, vert Légion
`#3F8650`, titres d'affiche en capitales condensées (Big Shoulders), titrage en Archivo Narrow et texte en Archivo,
boutons carrés en capitales avec flèche, grandes photographies d'archives en plein cadre. Les jetons de couleur et
les polices sont définis dans `app/globals.css` et `app/layout.tsx`.

## Images d'archives

Photographies, gravures et portraits proviennent de Wikimedia Commons (domaine public, Licence Ouverte, CC BY / CC
BY-SA). Fichiers dans `public/archives/` et `public/portraits/` ; légende, auteur, licence et lien vers la page
source sont renseignés dans les données et affichés sous chaque image. Quelques licences reposent sur la seule
déclaration de Commons (mention « selon Commons ») : à confirmer avant une diffusion publique.

## 4. Accessibilité

Navigation clavier complète (marqueurs, liste alternative à la carte, frise en `role="slider"`, Échap pour fermer),
formes distinctes par type d'événement (pas d'information portée par la seule couleur), contrastes AA, lien
d'évitement, respect de `prefers-reduced-motion`.

## 5. Avant publication

- Relecture historique de toutes les fiches marquées « à vérifier » (Musée de la Légion étrangère, SHD).
- Constitution du fonds iconographique (droits, crédits).
- Insignes officiels des régiments.
