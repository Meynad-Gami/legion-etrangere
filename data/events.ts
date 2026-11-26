import { commonSources as S } from "./catalog";
import type { HistoricalEvent, MediaImage } from "./types";

/** Emplacement d'archive : affiché comme placeholder tant qu'aucun fichier libre de droits n'est associé. */
const archive = (id: string, caption: string, archiveHint: string): MediaImage => ({
  id,
  caption,
  archiveHint,
});

/**
 * Événements de démonstration.
 * Pour ajouter un événement : ajouter un objet à ce tableau. La carte, la chronologie,
 * les filtres, les fiches régiments et les quiz s'actualisent automatiquement.
 */
export const events: HistoricalEvent[] = [
  {
    id: "creation-1831",
    title: "Naissance de la Légion étrangère",
    shortLabel: "Création",
    type: "fondation",
    date: "1831-03-09",
    dateLabel: "9 et 10 mars 1831",
    location: { name: "Paris", country: "France", coordinates: [2.35, 48.86] },
    conflictId: "institution",
    units: "Légion étrangère (bataillons formés en France, puis envoyés en Algérie)",
    regimentIds: [],
    epigraph: {
      text: "Il pourra être formé dans l'intérieur du Royaume une légion d'étrangers ; mais elle ne pourra être employée que hors du territoire continental du Royaume.",
      origin: "Loi du 9 mars 1831",
    },
    summary:
      "En mars 1831, le roi Louis-Philippe crée une unité composée de soldats étrangers volontaires. Elle ne peut pas servir sur le sol de la France continentale : elle part en Algérie.",
    keyQuestion: {
      question: "Pourquoi créer une armée d'étrangers ?",
      answer:
        "Après la révolution de 1830, beaucoup d'anciens soldats et d'exilés étrangers vivent en France. La Légion leur offre un engagement. La France y gagne une troupe pour l'Algérie.",
    },
    context:
      "La révolution de juillet 1830 porte Louis-Philippe au pouvoir. Les régiments étrangers au service de la monarchie précédente (notamment suisses) sont licenciés, tandis que Paris accueille de nombreux exilés venus de toute l'Europe. La loi du 9 mars 1831, complétée par l'ordonnance royale du 10 mars, autorise la formation d'une légion d'étrangers, destinée à servir hors du territoire continental du royaume. La nouvelle Légion reprend notamment des soldats de l'ancien régiment de Hohenlohe, licencié en 1830. Ses dépôts sont d'abord installés à Langres, Bar-le-Duc, Agen et Auxerre, et le colonel Stoffel, officier suisse, est nommé à sa tête le 4 mai 1831. Les bataillons débarquent en Algérie entre août 1831 et 1832.",
    progress: [
      { time: "9 mars 1831", text: "Vote de la loi autorisant la formation d'une légion d'étrangers." },
      { time: "10 mars 1831", text: "Ordonnance royale de Louis-Philippe organisant la Légion." },
      { time: "1831-1832", text: "Les premiers bataillons, d'abord organisés par nationalités, débarquent en Algérie." },
      { time: "1er janvier 1832", text: "La Légion occupe Alger et ses environs : elle assèche des marais, ouvre des routes et bâtit des redoutes." },
      { time: "7 avril 1832", text: "Premier combat, près des avant-postes de Maison-Carrée, aux portes d'Alger." },
      { time: "23 mai 1832", text: "Le lieutenant Châm et 27 légionnaires sont tués par des cavaliers : Châm est le premier officier de la Légion tombé au combat." },
      { time: "1835", text: "La Légion est cédée à l'Espagne pendant la première guerre carliste. Une nouvelle Légion est créée par l'ordonnance du 16 décembre 1835." },
      { time: "Janvier 1839", text: "Retour d'Espagne des survivants de l'« ancienne Légion » : 63 officiers et 159 hommes, sur environ 4 000." },
    ],
    people:
      "Les premiers légionnaires viennent de Suisse, des États allemands, de Pologne, d'Italie, d'Espagne ou de Belgique. Beaucoup ont déjà servi dans d'autres armées. Le colonel Stoffel, d'origine suisse, organise la Légion en 1831 ; en Espagne, les colonels Bernelle puis Conrad la commandent, et Conrad est tué au combat en 1837.",
    consequences:
      "La Légion devient un corps permanent de l'armée française. Le principe fondateur demeure : des volontaires étrangers servant la France, sous des cadres en grande partie français. En Espagne, le général Bernelle mélange les nationalités au sein des unités au lieu de les séparer : c'est le principe de l'« amalgame », qui reste une règle de la Légion.",
    takeaways: [
      "La Légion étrangère est créée en mars 1831.",
      "Elle est composée de volontaires étrangers.",
      "Son premier théâtre d'engagement est l'Algérie.",
    ],
    didYouKnow:
      "En 1835, la Légion tout entière est cédée à l'Espagne pour combattre pendant la guerre carliste. Dès la fin de 1835, la France crée une « nouvelle Légion » : c'est elle qui donnera la Légion actuelle.",
    extraFacts: ["Le premier drapeau de la Légion, remis en 1832, portait la devise « Honneur et Patrie »."],
    images: [
      archive("loi-1831", "Texte de la loi du 9 mars 1831", "Bulletin des lois, 1831, reproduction à obtenir (Archives nationales / Gallica)"),
      { id: "louis-philippe", src: "/archives/louis-philippe.jpg", caption: "Louis-Philippe Ier par Winterhalter (1841)", credit: "Franz Xaver Winterhalter", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Louis-Philippe_de_Bourbon-resized.jpg" },
    ],
    quiz: [
      {
        question: "Quel roi a signé l'ordonnance de création de la Légion ?",
        choices: ["Charles X", "Louis-Philippe", "Napoléon III", "Louis XVIII"],
        answer: 1,
        explanation: "Louis-Philippe, roi des Français depuis la révolution de juillet 1830, signe l'ordonnance du 10 mars 1831.",
      },
      {
        question: "Où la Légion est-elle engagée pour la première fois, dès 1831 ?",
        choices: ["Au Mexique", "En Crimée", "En Algérie", "En Indochine"],
        answer: 2,
        explanation: "La loi interdit de l'employer sur le territoire continental du royaume : elle part en Algérie dès 1831.",
      },
      {
        question: "Que devient la Légion en 1835, quatre ans après sa création ?",
        choices: [
          "La Légion est dissoute définitivement",
          "La Légion est cédée à l'Espagne",
          "La Légion s'installe à Aubagne",
          "La Légion part au Mexique",
        ],
        answer: 1,
        explanation: "Elle est cédée à l'Espagne pendant la guerre carliste ; une nouvelle Légion est créée à la fin de l'année.",
      },
    ],
    relatedEventIds: ["sidi-bel-abbes-1843", "camerone-1863"],
    sources: [
      { label: "Loi du 9 mars 1831 et ordonnance royale du 10 mars 1831", detail: "Bulletin des lois, numéro du bulletin à ajouter", status: "a-verifier" },
      { label: "Wikipédia, Histoire de la Légion étrangère", detail: "Texte de la loi et de l'ordonnance", url: "https://fr.wikipedia.org/wiki/Histoire_de_la_L%C3%A9gion_%C3%A9trang%C3%A8re", status: "verifie" },
      { label: "FSALE, « 1835 : la Légion est cédée à l'Espagne »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/5501-1835-quatre-ans-apres-sa-creation-la-legion-est-cedee-a-lespagne-et-ne-fait-plus-partie-de-larmee-francaise.html", status: "verifie" },
      { label: "Hérodote, 9 mars 1831, création de la Légion étrangère", url: "https://www.herodote.net/9_mars_1831-evenement-18310309.php", status: "verifie" },
      S.porch,
      { label: "FSALE, « Les premiers combats de la Légion étrangère en Algérie, 1832 »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/1155-les-premiers-combats-de-la-legion-etrangere-en-algerie-1932.html", status: "verifie" },
      { label: "FSALE, « Création de la Légion étrangère en Algérie en 1831 »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/1109-histoire-creation-de-la-legion-etrangere-en-algerie-en-1831.html", status: "verifie" },
    ],
    tags: ["création", "Louis-Philippe", "Algérie"],
    importance: 1,
    status: "verifie",
  },

  {
    id: "sidi-bel-abbes-1843",
    title: "Sidi-Bel-Abbès, la maison mère",
    shortLabel: "Sidi-Bel-Abbès",
    type: "fondation",
    date: "1843",
    endDate: "1962",
    dateLabel: "1843-1962",
    location: { name: "Sidi-Bel-Abbès", country: "Algérie", coordinates: [-0.64, 35.19] },
    conflictId: "algerie-conquete",
    units: "Légion étrangère, puis 1er régiment étranger",
    regimentIds: ["1er-re"],
    summary:
      "En 1843, la Légion s'installe à Sidi-Bel-Abbès en Algérie. La ville restera sa « maison mère » pendant près de 120 ans.",
    keyQuestion: {
      question: "Qu'est-ce qu'une « maison mère » ?",
      answer:
        "C'est là que la Légion accueille ses recrues, garde ses souvenirs et honore ses morts. Pour un légionnaire, c'est « la maison ».",
    },
    context:
      "Pendant la conquête de l'Algérie, l'armée établit des postes dans l'Ouest algérien. En 1843, un camp retranché est construit à Sidi-Bel-Abbès par les chasseurs d'Afrique et la Légion ; un bataillon du 1er régiment étranger s'y installe en novembre. La ville elle-même est tracée à partir de 1849. C'est là que seront longtemps formés les légionnaires et qu'est érigé, en 1931, le monument aux morts de la Légion. Le poste est installé sous les ordres du général Bedeau, près du tombeau d'un saint musulman, au bord de l'oued Mekerra, à un point de passage stratégique de l'Ouest algérien. Un décret du 5 janvier 1849 y crée officiellement la ville.",
    progress: [
      { time: "1843", text: "Le général Bedeau fait établir une redoute gardée par la Légion près du marabout de Sidi Bel Abbès." },
      { time: "5 janvier 1849", text: "Décret créant la ville." },
      { time: "1931", text: "Inauguration du monument aux morts de la Légion, le 30 avril." },
      { time: "1934", text: "La salle d'honneur du 1er régiment étranger devient le premier « musée » de la Légion." },
      { time: "24 au 26 octobre 1962", text: "Dernière cérémonie au pied du monument aux morts, puis départ de la Légion." },
    ],
    people:
      "Le général Bedeau fonde le poste ; les légionnaires du 1er régiment étranger y forment des générations de recrues. La ville compte aussi une importante population algérienne et européenne, sans lien avec la Légion.",
    consequences:
      "En 1962, après l'indépendance de l'Algérie, la Légion quitte Sidi-Bel-Abbès pour Aubagne, en emportant son monument aux morts et ses reliques. Les légionnaires assèchent les marais et défrichent les terres autour de la ville, qu'ils marquent durablement jusqu'en 1962.",
    takeaways: [
      "Sidi-Bel-Abbès a été la maison mère de la Légion de 1843 à 1962.",
      "La Légion y avait son dépôt, son musée et son monument aux morts.",
    ],
    didYouKnow:
      "Les légionnaires ont participé à la construction de nombreux bâtiments et routes de la ville, un rôle de bâtisseurs que l'on retrouve dans toute l'histoire de la Légion.",
    extraFacts: ["La ville porte le nom d'un saint musulman dont le tombeau domine la rivière Mekerra."],
    images: [
      { id: "sba-quartier", src: "/archives/sba-quartier.jpg", caption: "Légionnaires à Sidi-Bel-Abbès (1944)", credit: "US Navy / National Archives (NARA)", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:80-G-K-1186.jpg" },
    ],
    relatedEventIds: ["creation-1831", "centenaire-1931", "aubagne-1962"],
    sources: [
      { label: "FSALE, « Sidi-Bel-Abbès, ville de cœur de la Légion »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/4691-sidi-bel-abbes-ville-de-coeur-de-la-legion.html", status: "verifie" },
      { label: "Jean Michon, « Sidi-bel-Abbès : capitale légionnaire »", detail: "Guerres mondiales et conflits contemporains, n° 237, 2010", url: "https://www.cairn.info/revue-guerres-mondiales-et-conflits-contemporains-2010-1-page-25.htm", status: "verifie" },
      S.musee,
      { label: "Wikipédia, Sidi Bel Abbès", url: "https://fr.wikipedia.org/wiki/Sidi_Bel_Abb%C3%A8s", status: "verifie" },
    ],
    tags: ["garnison", "maison mère", "Algérie"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "sebastopol-1855",
    title: "Le siège de Sébastopol",
    shortLabel: "Crimée",
    type: "campagne",
    date: "1854-09",
    endDate: "1855-09",
    dateLabel: "1854-1855",
    location: { name: "Sébastopol", country: "Crimée", coordinates: [33.53, 44.6] },
    conflictId: "crimee",
    units: "Brigade étrangère (1er et 2e régiments étrangers)",
    regimentIds: [],
    summary:
      "Pour sa première grande campagne européenne au service de la France, la Légion combat aux côtés des Britanniques et des Ottomans contre l'Empire russe. Elle participe au long siège de Sébastopol.",
    context:
      "La guerre de Crimée oppose la Russie à une coalition réunissant notamment la France, le Royaume-Uni et l'Empire ottoman. Le siège de la grande base navale russe de Sébastopol dure près d'un an, dans des conditions très éprouvantes : froid, maladies, combats de tranchées. Pendant le transit par Gallipoli, le choléra tue plus de 200 légionnaires. Côté allié, Canrobert puis Pélissier commandent les Français ; côté russe, l'ingénieur Totleben fortifie la ville, défendue par les amiraux Kornilov et Nakhimov.",
    progress: [
      { time: "20 septembre 1854", text: "Bataille de l'Alma : les légionnaires franchissent la rivière." },
      { time: "17 octobre 1854", text: "Début du siège de Sébastopol." },
      { time: "19 janvier 1855", text: "Le 2e bataillon repousse une attaque russe dans le secteur de la Quarantaine." },
      { time: "Nuit du 1er au 2 mai 1855", text: "Attaque des ouvrages russes : le colonel Viénot est tué. La Légion compte 118 tués et 480 blessés." },
      { time: "8 septembre 1855", text: "Prise de Malakoff par la division Mac-Mahon ; les Russes évacuent la ville." },
    ],
    people:
      "Le colonel Viénot commande le 1er régiment étranger. Le sergent Valliez et ses légionnaires construisent rampes et échafaudages pour l'assaut ; il est promu officier sur le champ de bataille.",
    consequences:
      "Le colonel Viénot, tué devant Sébastopol dans la nuit du 1er au 2 mai 1855, donnera son nom au quartier de la Légion à Sidi-Bel-Abbès, puis à celui d'Aubagne. Le nom « Sébastopol » est inscrit sur les drapeaux des 1er et 2e régiments étrangers. Les pertes du siège sont très lourdes dans les deux camps.",
    takeaways: [
      "La Crimée est la première grande campagne européenne de la Légion au service de la France.",
      "Le quartier Viénot d'Aubagne porte le nom d'un officier tué à Sébastopol.",
    ],
    didYouKnow:
      "Le nom « Viénot » est aujourd'hui celui du quartier qui abrite la maison mère de la Légion à Aubagne.",
    extraFacts: ["Le jeune Léon Tolstoï était officier dans la ville assiégée. Il a raconté le siège dans ses Récits de Sébastopol."],
    images: [{ id: "crimee", src: "/archives/crimee.jpg", caption: "Sébastopol vue des lignes alliées (1855)", credit: "Roger Fenton / Library of Congress", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Sebastopol_with_the_Redan%2C_Malakoff_%26_Mamelon_LCCN2001699636.jpg" }],
    relatedEventIds: ["magenta-1859", "aubagne-1962"],
    sources: [
      { label: "FSALE, « Page de gloire : Crimée 1854-1856 »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/3974-page-de-gloire-de-la-legion-etrangere-crimee-1854-1856.html", status: "verifie" },
      { label: "FSALE / J. Balazuc, « 1855 : prise de Sébastopol »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/2457-jean-balazuc-1855-prise-de-sebastopol-fin-de-la-guerre-de-crimee.html", status: "verifie" },
      S.porch,
      { label: "Wikipédia, Siège de Sébastopol (1854-1855)", url: "https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_S%C3%A9bastopol_(1854-1855)", status: "verifie" },
    ],
    tags: ["Crimée", "Second Empire", "Viénot"],
    importance: 3,
    status: "verifie",
  },

  {
    id: "magenta-1859",
    title: "Magenta",
    shortLabel: "Italie",
    type: "bataille",
    date: "1859-06-04",
    dateLabel: "4 juin 1859",
    location: { name: "Magenta", country: "Italie", coordinates: [8.88, 45.46] },
    conflictId: "italie",
    units: "2e régiment étranger",
    regimentIds: ["2e-rei"],
    summary:
      "Pendant la campagne d'Italie, l'armée française et ses alliés piémontais affrontent l'armée autrichienne à Magenta. Le 2e régiment étranger y perd son chef, le colonel de Chabrières.",
    context:
      "Napoléon III soutient le royaume de Piémont-Sardaigne contre l'Empire d'Autriche. La victoire franco-piémontaise de Magenta ouvre la route de Milan. Le 2e régiment étranger appartient au 2e corps du général de Mac-Mahon. Environ 59 000 Franco-Sardes font face à environ 62 000 Autrichiens du maréchal Gyulai ; les combats se poursuivent jusque dans les rues du bourg et autour de la gare.",
    progress: [
      { time: "4 juin 1859", text: "Sur la route de Marcallo à Magenta, le colonel de Chabrières lance ses légionnaires à la baïonnette ; il est tué." },
      { time: "24 juin 1859", text: "La Légion combat à Solferino." },
      { time: "14 août 1859", text: "La Légion défile à Paris lors du retour de l'armée d'Italie." },
    ],
    people:
      "Le colonel de Chabrières commande le 2e régiment étranger. Mac-Mahon, qui dirige le 2e corps, est fait maréchal et duc de Magenta après la bataille. En face, l'armée autrichienne du maréchal Gyulai.",
    consequences:
      "Le quartier du 2e régiment étranger d'infanterie, à Nîmes, porte aujourd'hui le nom du colonel de Chabrières. Côté franco-sarde, Magenta fait 657 morts et plus de 3 000 blessés ; les pertes autrichiennes sont nettement plus lourdes. La campagne s'achève par l'armistice de Villafranca.",
    takeaways: ["Magenta est une victoire de la campagne d'Italie de 1859.", "Le 2e REI garde la mémoire de son colonel tombé ce jour-là."],
    extraFacts: ["La couleur « magenta » doit son nom à cette bataille, très célèbre à l'époque."],
    images: [{ id: "magenta", src: "/archives/magenta.jpg", caption: "La bataille de Magenta (1859)", credit: "Adolphe Yvon", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Adolphe_Yvon_-_Batalla_de_Magenta.jpg" }],
    relatedEventIds: ["sebastopol-1855", "camerone-1863"],
    sources: [
      { label: "FSALE, « Page de gloire : Italie 1859 »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/3975-page-de-gloire-de-la-legion-etrangere-italie-1859.html", status: "verifie" },
      { label: "Ministère des Armées, 2e régiment étranger d'infanterie", url: "https://www.defense.gouv.fr/terre/2e-regiment-etranger-dinfanterie", status: "verifie" },
      S.porch,
      { label: "Wikipédia, Bataille de Magenta", url: "https://fr.wikipedia.org/wiki/Bataille_de_Magenta", status: "verifie" },
    ],
    tags: ["Italie", "Second Empire", "Chabrières"],
    importance: 3,
    status: "verifie",
  },

  {
    id: "camerone-1863",
    title: "Camerone",
    shortLabel: "Mexique, 1863",
    type: "bataille",
    date: "1863-04-30",
    dateLabel: "30 avril 1863",
    location: { name: "Camarón de Tejeda", country: "Mexique", coordinates: [-96.61, 19.02] },
    conflictId: "mexique",
    units: "3e compagnie du 1er bataillon du Régiment étranger",
    regimentIds: ["1er-re"],
    personIds: ["danjou"],
    epigraph: {
      text: "Ils furent ici moins de soixante, opposés à toute une armée. Sa masse les écrasa. La vie plutôt que le courage abandonna ces soldats français le 30 avril 1863. À leur mémoire, la patrie éleva ce monument.",
      origin: "Inscription du monument de Camerone, érigé en 1892 (traduction du texte latin)",
    },
    summary:
      "Le 30 avril 1863 au Mexique, 65 légionnaires sont encerclés par une armée entière. Retranchés dans une ferme, ils tiennent toute la journée.",
    keyQuestion: {
      question: "Pourquoi cette bataille est-elle devenue si importante pour la Légion ?",
      answer:
        "Ce n'est pas une victoire. Mais les hommes de Camerone ont tenu la parole donnée et rempli leur mission jusqu'au bout : le convoi qu'ils protégeaient n'a pas été attaqué. Camerone est devenu le symbole de la fidélité à la mission.",
    },
    context:
      "Depuis 1861, la France intervient militairement au Mexique. En 1863, l'armée française assiège la ville de Puebla. Un convoi de ravitaillement, transportant notamment du matériel et des fonds, doit la rejoindre depuis la côte. La Légion est chargée de sécuriser la route, une région chaude et insalubre. Selon le récit officiel, le convoi emporte du matériel de siège, des munitions et trois millions en numéraire. Le Régiment étranger du colonel Jeanningros assure, sur cent vingt kilomètres, la circulation et la sécurité des convois. En face, le colonel Milán dispose d'environ 2 000 hommes : 800 cavaliers et 1 200 fantassins.",
    progress: [
      { time: "29 avril 1863", text: "Le convoi quitte la région de Veracruz en direction de Puebla." },
      { time: "Nuit du 29 au 30 avril", text: "La 3e compagnie part en reconnaissance au-devant du convoi. Elle n'a pas d'officier disponible : le capitaine Danjou, adjudant-major, en prend le commandement, et les sous-lieutenants Maudet, porte-drapeau, et Vilain, payeur, se joignent à lui volontairement." },
      { time: "7 heures", text: "Pendant la halte du café à Palo Verde, la compagnie est surprise par la cavalerie mexicaine. Elle se replie en carré jusqu'à l'hacienda de Camarón." },
      { time: "10 heures", text: "Retranchés derrière le mur de trois mètres de l'auberge, les légionnaires répondent à la sommation : « Nous avons des cartouches et ne nous rendrons pas. » Danjou leur fait jurer de se défendre jusqu'au bout." },
      { time: "Midi", text: "Le capitaine Danjou est tué d'une balle en pleine poitrine." },
      { time: "14 heures", text: "Le sous-lieutenant Vilain prend le commandement et tombe à son tour. L'infanterie mexicaine arrive en renfort. Chaleur, soif, incendie : les légionnaires tiennent toujours." },
      { time: "17 heures", text: "Il ne reste que douze hommes en état de combattre. Vers 18 heures, ils ne sont plus que cinq autour du sous-lieutenant Maudet. Les derniers chargent à la baïonnette. Les survivants, blessés, sont faits prisonniers." },
    ],
    people:
      "Le capitaine Jean Danjou, le sous-lieutenant Jean Vilain, le sous-lieutenant Clément Maudet, le caporal Maine et les légionnaires de la 3e compagnie, d'origines très diverses. En face, les soldats mexicains du colonel Milán, qui défendent leur pays et paient eux aussi un lourd tribut. Les derniers à charger avec le sous-lieutenant Maudet sont le caporal Maine et les légionnaires Catteau, Wensel, Constantin et Leonhard. Catteau protège Maudet de son corps.",
    consequences:
      "Pendant onze heures, les légionnaires ont tenu tête à 2 000 assaillants, dont environ trois cents sont tués et autant blessés. Sur décision de Napoléon III, le nom de Camerone est inscrit sur le drapeau du Régiment étranger, et les noms de Danjou, Vilain et Maudet sont gravés en lettres d'or sur les murs des Invalides. La main articulée en bois du capitaine Danjou, retrouvée en 1865, devient la relique la plus précieuse de la Légion. Chaque 30 avril, dans toutes les unités, le récit du combat est lu devant les troupes. Environ les deux tiers de la compagnie sont tués ou mortellement blessés. Un premier monument est élevé sur place en 1892, un nouveau est inauguré en 1963.",
    takeaways: [
      "Camerone a lieu le 30 avril 1863 au Mexique.",
      "65 hommes résistent une journée entière face à des forces bien plus nombreuses.",
      "La Légion célèbre Camerone comme le symbole de la mission accomplie et de la parole tenue.",
    ],
    didYouKnow:
      "Le capitaine Danjou avait perdu sa main gauche dans un accident de fusil. Sa main articulée en bois est conservée à Aubagne et portée chaque 30 avril.",
    extraFacts: ["Selon le récit officiel de la Légion, les troupes mexicaines présentent les armes lorsqu'elles passent devant le monument de Camerone."],
    images: [
      { id: "hacienda", src: "/archives/hacienda.jpg", caption: "Le combat de Camerone dans l'hacienda", credit: "Jean-Adolphe Beaucé", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Cameron_Battle_%28Mexico%29%2C_30_April_1863_-_La_Bataille_de_Camerone_%28Mexique%29%29.jpg" },
      { id: "main-danjou", src: "/archives/main-danjou.jpg", caption: "La main du capitaine Danjou (Camerone 2026)", credit: "Armée de Terre", license: "Licence Ouverte", sourceUrl: "https://commons.wikimedia.org/wiki/File:Army_General_Thierry_Burkhard_carrying_Captain_Danjou%27s_hand_at_the_Camerone_ceremony%2C_2026.jpg" },
      { id: "monument-camerone", src: "/archives/monument-camerone.jpg", caption: "L'obélisque de Camarón de Tejeda", credit: "Zenko81", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Obelisco_de_camaron.JPG" },
    ],
    quiz: [
      {
        question: "En quelle année a lieu le combat de Camerone ?",
        choices: ["1831", "1854", "1863", "1914"],
        answer: 2,
        explanation: "Le combat a lieu le 30 avril 1863, pendant l'expédition du Mexique.",
      },
      {
        question: "Qui commande la compagnie à Camerone ?",
        choices: ["Le colonel Viénot", "Le capitaine Danjou", "Le général Rollet", "Le lieutenant-colonel Amilakhvari"],
        answer: 1,
        explanation: "Le capitaine Jean Danjou, adjudant-major, s'est porté volontaire pour commander la 3e compagnie.",
      },
      {
        question: "À Camerone, quelle était la mission de la compagnie du capitaine Danjou ?",
        choices: [
          "Prendre la ville de Puebla",
          "Protéger l'arrivée d'un convoi",
          "Escorter l'empereur",
          "Construire une route",
        ],
        answer: 1,
        explanation: "Elle partait en reconnaissance pour sécuriser la route d'un convoi destiné au siège de Puebla. Le convoi n'a pas été attaqué.",
      },
      {
        question: "Quel objet est porté chaque 30 avril lors de la cérémonie de Camerone ?",
        choices: ["Le drapeau du Mexique", "Le sabre de Danjou", "La main articulée de Danjou", "Le képi de Maudet"],
        answer: 2,
        explanation: "La main en bois du capitaine Danjou est portée par un ancien, choisi pour l'honneur, lors de la cérémonie à Aubagne.",
      },
    ],
    relatedEventIds: ["centenaire-1931", "aubagne-1962", "dien-bien-phu-1954"],
    sources: [
      { label: "Armée de Terre, Récit du combat de Camerone (PDF)", url: "https://www.defense.gouv.fr/sites/default/files/terre/R%C3%A9cit%20du%20combat%20de%20Camerone.pdf", status: "verifie" },
      { label: "Récit de Camerone (texte officiel et inscription du monument)", detail: "Wikipédia", url: "https://fr.wikipedia.org/wiki/R%C3%A9cit_de_Camerone", status: "verifie" },
      { label: "FSALE, « 30 avril 1863, Camerone »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/704-histoire-30-avril-1863-camerone.html", status: "verifie" },
      { label: "FSALE, Le récit du combat par un survivant, le caporal Maine", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/3201-le-recit-du-combat-de-camerone-par-un-survivant-le-caporal-maine.html", status: "verifie" },
      { label: "Wikipédia, Bataille de Camerone", detail: "Effectifs mexicains : environ 2 000 hommes du colonel Milán", url: "https://fr.wikipedia.org/wiki/Bataille_de_Camerone", status: "verifie" },
      S.musee,
    ],
    tags: ["Mexique", "Camerone", "Danjou", "30 avril", "tradition"],
    importance: 1,
    status: "verifie",
  },

  {
    id: "tuyen-quang-1885",
    title: "Le siège de Tuyên Quang",
    shortLabel: "Tonkin",
    type: "bataille",
    date: "1884-11",
    endDate: "1885-03",
    dateLabel: "Novembre 1884-mars 1885",
    location: { name: "Tuyên Quang", country: "Vietnam (Tonkin)", coordinates: [105.22, 21.82] },
    conflictId: "tonkin",
    units: "Deux compagnies du 1er régiment étranger, une compagnie de tirailleurs tonkinois, des marins et des sapeurs du génie (sergent Bobillot)",
    regimentIds: ["5e-re"],
    summary:
      "Au Tonkin, 600 hommes dont deux compagnies de légionnaires défendent la citadelle de Tuyên Quang. Le siège dure plus de trois mois.",
    context:
      "La France étend sa domination sur le nord du Vietnam actuel, ce qui l'oppose aux Pavillons noirs et à l'armée chinoise. La citadelle de Tuyên Quang, isolée sur la rivière Claire, est encerclée. La garnison réunit deux compagnies de Légion (390 hommes), 162 tirailleurs tonkinois, 31 artilleurs de marine avec deux canons et quelques sapeurs. Elle fait face à environ 25 000 hommes : l'armée chinoise du Yunnan et les Pavillons noirs de Liu Yongfu, qui creusent des galeries pour faire sauter les murs.",
    progress: [
      { time: "23 novembre 1884", text: "Premiers accrochages autour de la citadelle." },
      { time: "26 janvier 1885", text: "Début des attaques sérieuses et de la guerre des mines." },
      { time: "18 février 1885", text: "Le sergent du génie Bobillot est grièvement blessé ; il meurt un mois plus tard." },
      { time: "22 février 1885", text: "Explosion de mines sous le front ouest : les légionnaires défendent la brèche." },
      { time: "2 et 3 mars 1885", text: "La colonne Giovanninelli force le passage à Hòa Mộc et délivre la garnison." },
    ],
    people:
      "Le chef de bataillon Marc-Edmond Dominé commande la garnison, le sergent Jules Bobillot dirige les sapeurs. Le colonel Giovanninelli conduit la colonne de secours. En face : Liu Yongfu et le général chinois Tang Jingsong.",
    consequences:
      "La garnison tient jusqu'à l'arrivée d'une colonne de secours en mars 1885. Le siège devient l'un des épisodes marquants de l'histoire de la Légion en Extrême-Orient. La garnison compte 48 tués, dont 32 légionnaires, et 216 blessés. Les assaillants subissent des pertes bien plus lourdes.",
    takeaways: ["La Légion est engagée en Extrême-Orient dès les années 1880.", "La garnison de Tuyên Quang résiste plus de trois mois."],
    extraFacts: ["Des drapeaux chinois pris à Tuyên Quang ont été conservés à Sidi-Bel-Abbès pendant des décennies, jusqu'au départ d'Algérie en 1962."],
    images: [{ id: "tuyen-quang", src: "/archives/tuyen-quang.jpg", caption: "La défense d'une brèche à Tuyên Quang (1885)", credit: "Dick de Lonlay (1887)", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Into_the_Breach.jpg" }],
    relatedEventIds: ["madagascar-1895", "indochine-1946"],
    sources: [
      { label: "FSALE, « Janvier 1885, la Légion étrangère à Tuyen Quang »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/184-histoire-janvier-1885-la-legion-etrangere-a-tuyen-quang-au-tonkin.html", status: "verifie" },
      { label: "Wikipédia, Siège de Tuyên Quang", url: "https://fr.wikipedia.org/wiki/Si%C3%A8ge_de_Tuy%C3%AAn_Quang", status: "verifie" },
      { label: "FSALE, « 1954 à 1962, la Légion étrangère à Sidi Bel Abbès »", url: "https://legionetrangere.fr/la-fsale/actualites-de-la-fsale/1464-histoire-1954-a-1962-la-legion-etrangere-a-sidi-bel-abbes-4.html", status: "verifie" },
    ],
    tags: ["Tonkin", "Extrême-Orient", "siège", "Dominé", "Bobillot"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "madagascar-1895",
    title: "L'expédition de Madagascar",
    shortLabel: "Madagascar",
    type: "campagne",
    date: "1895",
    dateLabel: "1895",
    location: { name: "Antananarivo", country: "Madagascar", coordinates: [47.52, -18.91] },
    conflictId: "madagascar",
    units: "Un bataillon de la Légion (commandant Barre), au sein du Régiment d'Algérie",
    regimentIds: [],
    summary:
      "La Légion participe à l'expédition française vers Tananarive. La maladie y fait bien plus de victimes que les combats.",
    context:
      "En 1895, la France lance une expédition militaire pour imposer son protectorat à Madagascar. La longue marche depuis la côte se fait dans des conditions sanitaires désastreuses. Le corps expéditionnaire du général Duchesne compte environ 15 000 militaires et 7 000 auxiliaires. Débarqué à Majunga à partir d'avril 1895, il doit construire une route pour ses lourdes voitures, et reste longtemps exposé au paludisme.",
    progress: [
      { time: "23 avril 1895", text: "Début du débarquement à Majunga." },
      { time: "Septembre 1895", text: "Une colonne légère parcourt les 150 derniers kilomètres en 16 jours." },
      { time: "30 septembre 1895", text: "Prise de Tananarive." },
      { time: "1896-1897", text: "Le général Gallieni réprime l'insurrection des Menalamba et exile la reine Ranavalona III." },
    ],
    people:
      "Le général Duchesne commande l'expédition, le commandant Barre le bataillon de la Légion. Côté malgache, la reine Ranavalona III est exilée en 1897.",
    consequences: "Tananarive est prise le 30 septembre 1895. Madagascar devient une colonie française par la loi du 6 août 1896. Le corps expéditionnaire perd 25 hommes au combat, mais 5 756 meurent de maladie. La conquête suscite une résistance malgache, durement réprimée.",
    takeaways: ["La campagne de 1895 rappelle que la maladie fut, longtemps, le premier ennemi du soldat."],
    extraFacts: ["Les charrettes de l'expédition étaient si lourdes que les soldats durent construire une route pour avancer."],
    images: [{ id: "madagascar", src: "/archives/madagascar.jpg", caption: "Le corps expéditionnaire de Madagascar (1896)", credit: "Louis Bombled, « La Guerre à Madagascar » (1896)", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Madagascar_French_expeditionnary_troops_Henri_Gallichet_1850_1923_La_Guerre_a_Madagascar_1896.jpg" }],
    relatedEventIds: ["tuyen-quang-1885", "maroc-1907"],
    sources: [
      { label: "FSALE / J. Balazuc, « 1895-1905 : Madagascar »", url: "https://legionetrangere.fr/la-fsale/actualites-de-la-fsale/4327-jean-balazuc-fiche-143-histoire-1895-1905-madagascar.html", status: "verifie" },
      { label: "Wikipédia, Expédition de Madagascar", url: "https://fr.wikipedia.org/wiki/Exp%C3%A9dition_de_Madagascar", status: "verifie" },
      { label: "Loi du 6 août 1896 déclarant Madagascar colonie française", detail: "Digithèque MJP", url: "https://mjp.univ-perp.fr/constit/mg1896.htm", status: "verifie" },
    ],
    tags: ["Madagascar", "colonisation"],
    importance: 3,
    status: "verifie",
  },

  {
    id: "el-moungar-1903",
    title: "El Moungar",
    shortLabel: "Sud-Oranais",
    type: "bataille",
    date: "1903-09-02",
    dateLabel: "2 septembre 1903",
    location: { name: "El Moungar, près de Taghit (emplacement approximatif)", country: "Algérie", coordinates: [-2.0, 31.15] },
    conflictId: "sud-oranais",
    units: "22e compagnie montée du 2e régiment étranger, avec un détachement de spahis",
    regimentIds: ["2e-rei"],
    summary:
      "Dans le Sud-Oranais, une compagnie montée de la Légion qui escorte un convoi de ravitaillement est attaquée. Privée de ses officiers, elle tient toute la journée jusqu'à l'arrivée des renforts.",
    keyQuestion: {
      question: "Qu'est-ce qu'une « compagnie montée » ?",
      answer:
        "Une compagnie d'infanterie dotée de mulets : un mulet pour deux légionnaires, qui marchaient et montaient à tour de rôle. Elle pouvait ainsi parcourir de longues distances dans le désert.",
    },
    context:
      "Au début du XXe siècle, les confins entre l'Algérie et le Maroc sont le théâtre d'attaques contre les postes et les convois français. Les compagnies montées de la Légion assurent les escortes sur ces longues routes du désert. La colonne réunit 113 légionnaires de la 22e compagnie montée et 30 spahis. Elle est attaquée par environ 3 000 guerriers des tribus Beraber et Ouled Jarir, dans la région de l'actuelle Béchar.",
    progress: [
      { time: "Matin", text: "La 22e compagnie montée du capitaine Vauchez, qui escorte un convoi, est attaquée par des guerriers des tribus Beraber et Ouled Djerir." },
      { time: "Dans la journée", text: "Les deux officiers sont tués. Le sergent-fourrier Tisserand, puis le caporal Detz, prennent le commandement." },
      { time: "Fin d'après-midi", text: "Les renforts venus de Taghit dégagent les survivants." },
    ],
    people:
      "Le capitaine Vauchez est tué au début du combat, le lieutenant Selchauhansen mortellement blessé. Le sergent-fourrier Tisserand, blessé deux fois, puis le caporal Detz prennent le relais ; le capitaine de Susbielle arrive de Taghit avec les secours.",
    consequences:
      "Le combat d'El Moungar est devenu la fête de tradition du 2e régiment étranger d'infanterie, célébrée chaque 2 septembre. Le combat fait 37 morts côté français, dont 34 légionnaires, et plus de 49 blessés. À la suite de ce combat, le général Lyautey est nommé dans le Sud-Oranais.",
    takeaways: [
      "El Moungar a lieu le 2 septembre 1903, dans le Sud-Oranais.",
      "Des sous-officiers et caporaux tiennent après la mort des officiers.",
      "C'est la bataille régimentaire du 2e REI.",
    ],
    didYouKnow: "Dans une compagnie montée, deux légionnaires se partageaient un mulet : l'un marchait pendant que l'autre montait.",
    extraFacts: ["El Moungar a compté dans la carrière de Lyautey : nommé dans le Sud-Oranais après ce combat, il dirigera plus tard le protectorat français au Maroc."],
    images: [{ id: "el-moungar", src: "/archives/el-moungar.jpg", caption: "Colonne de marche dans le Sud algérien (vers 1905)", credit: "Jean Geiser", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Jean_Geiser_-_Colonne_de_marche_de_la_L%C3%A9gion_%C3%A9trang%C3%A8re.jpg" }],
    quiz: [
      {
        question: "En quelle année a lieu le combat d'El Moungar ?",
        choices: ["1863", "1903", "1914", "1942"],
        answer: 1,
        explanation: "Le 2 septembre 1903, dans le Sud-Oranais, près de Taghit.",
      },
      {
        question: "Dans une compagnie montée, comment se déplacent les légionnaires ?",
        choices: ["Chacun a son cheval", "Un mulet pour deux, à tour de rôle", "En camion", "À dos de chameau"],
        answer: 1,
        explanation: "Deux légionnaires se partagent un mulet : l'un marche pendant que l'autre monte, puis ils échangent.",
      },
      {
        question: "Qui prend le commandement après la mort des deux officiers ?",
        choices: ["Le sergent-fourrier Tisserand, puis le caporal Detz", "Le capitaine Danjou", "Le colonel Rollet", "Le général Lyautey"],
        answer: 0,
        explanation: "Le sergent-fourrier Tisserand, blessé deux fois, puis le caporal Detz tiennent jusqu'à l'arrivée des renforts de Taghit.",
      },
      {
        question: "Quel régiment fête aujourd'hui El Moungar comme sa bataille régimentaire ?",
        choices: ["Le 2e REP", "Le 1er REC", "Le 2e REI", "La 13e DBLE"],
        answer: 2,
        explanation: "Le 2e régiment étranger d'infanterie, héritier du 2e régiment étranger, le célèbre chaque 2 septembre.",
      },
    ],
    relatedEventIds: ["maroc-1907", "magenta-1859"],
    sources: [
      { label: "Ministère des Armées, 2e régiment étranger d'infanterie", detail: "El Moungar, date de la fête de tradition", url: "https://www.defense.gouv.fr/terre/2e-regiment-etranger-dinfanterie", status: "verifie" },
      { label: "Wikipédia, Bataille d'El-Moungar", url: "https://fr.wikipedia.org/wiki/Bataille_d%27El-Moungar", status: "verifie" },
    ],
    tags: ["El Moungar", "compagnie montée", "2e REI", "Sud-Oranais"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "maroc-1907",
    title: "Les campagnes du Maroc",
    shortLabel: "Maroc",
    type: "campagne",
    date: "1907",
    endDate: "1934",
    dateLabel: "1907-1934",
    location: { name: "Moyen Atlas", country: "Maroc", coordinates: [-5.67, 32.94] },
    conflictId: "maroc",
    units: "1er, 2e, 3e et 4e régiments étrangers d'infanterie, 1er régiment étranger de cavalerie",
    regimentIds: ["3e-rei", "4e-re", "1er-rec"],
    summary:
      "Pendant près de trente ans, la Légion combat au Maroc et y construit routes, ponts et postes. Le légionnaire y est autant bâtisseur que soldat.",
    context:
      "La France établit son protectorat sur le Maroc en 1912. Des opérations militaires se poursuivent jusqu'en 1934 dans le Rif, le Moyen Atlas et le Haut Atlas. Pendant la guerre du Rif (1921-1926), Abd el-Krim proclame une république des tribus du Rif qui tient tête à l'Espagne, puis à la France, qui confie en 1925 la direction des opérations au maréchal Pétain.",
    progress: [
      { time: "1912", text: "Établissement du protectorat français sur le Maroc." },
      { time: "15 novembre 1920", text: "Création du 4e régiment étranger à Marrakech." },
      { time: "1925", text: "La France entre dans la guerre du Rif aux côtés de l'Espagne." },
      { time: "27 mai 1926", text: "Reddition d'Abd el-Krim, exilé à La Réunion." },
      { time: "1927-1928", text: "Les sapeurs-pionniers du 3e REI percent le tunnel de Foum Zabel." },
      { time: "1934", text: "Fin des opérations militaires au Maroc." },
    ],
    people:
      "Lyautey, résident général, puis Pétain dirigent les opérations françaises ; en face, Abd el-Krim conduit la résistance rifaine. Le 4e RE travaille à la route du col du Tichka.",
    consequences:
      "Les ouvrages laissés par les légionnaires témoignent encore de ce rôle de bâtisseurs : le tunnel de Foum Zabel, dit « tunnel du Légionnaire », creusé dans les gorges du Ziz et achevé en mars 1928, est toujours en service. Pour les Marocains, ces campagnes sont aussi une conquête, qui a rencontré une longue résistance.",
    takeaways: ["Au Maroc, la Légion combat et construit.", "Le 1er régiment étranger de cavalerie naît en 1921 à Sousse, en Tunisie."],
    didYouKnow: "Les pionniers, avec leur barbe, leur tablier et leur hache, rappellent ce rôle de bâtisseurs.",
    extraFacts: ["Le tunnel de Foum Zabel a été percé en quelques mois par une quarantaine de légionnaires. Une inscription y dit : « La montagne leur barrait la route. Ordre fut donné de passer quand même. »"],
    images: [{ id: "tunnel-legionnaire", src: "/archives/tunnel-legionnaire.jpg", caption: "Inauguration du tunnel de Foum Zabel (1928)", credit: "Centre de documentation de la Légion étrangère", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Zaabel.jpg" }],
    relatedEventIds: ["ww1-rmle", "centenaire-1931"],
    sources: [
      { label: "Wikipédia, Tunnel de Foum Zabel", url: "https://fr.wikipedia.org/wiki/Tunnel_de_Foum_Zabel", status: "verifie" },
      { label: "FSALE, « L'épopée du 1er régiment étranger de cavalerie »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/3518-l-epopee-du-1er-regiment-etranger-de-cavalerie-resume-historique.html", status: "verifie" },
      S.porch,
      { label: "Wikipédia, Guerre du Rif", url: "https://fr.wikipedia.org/wiki/Guerre_du_Rif", status: "verifie" },
    ],
    tags: ["Maroc", "bâtisseurs", "Lyautey"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "ww1-rmle",
    title: "La Grande Guerre et le RMLE",
    shortLabel: "1914-1918",
    type: "campagne",
    date: "1914-08",
    endDate: "1918-11",
    dateLabel: "1914-1918",
    location: { name: "Belloy-en-Santerre (Somme)", country: "France", coordinates: [2.85, 49.89] },
    conflictId: "ww1",
    units: "Régiments de marche de la Légion, puis Régiment de marche de la Légion étrangère (RMLE)",
    regimentIds: ["3e-rei"],
    personIds: ["seeger", "cendrars", "rollet"],
    summary:
      "En août 1914, des milliers d'étrangers vivant en France s'engagent pour la défendre. Dans la Légion, ils combattent en Champagne puis dans la Somme et à Verdun.",
    keyQuestion: {
      question: "Pourquoi des étrangers se battent-ils pour la France en 1914 ?",
      answer:
        "Beaucoup vivent en France et veulent la défendre. Parmi eux, des écrivains comme Blaise Cendrars ou le poète américain Alan Seeger.",
    },
    context:
      "Dès le début de la guerre, des appels invitent les étrangers résidant en France à s'engager. La Légion les accueille et forme des régiments de marche, réunis en 1915 dans le Régiment de marche de la Légion étrangère. En août 1914, quatre régiments de marche sont créés pour accueillir les engagés ; les volontaires viennent d'une cinquantaine de nationalités, les Italiens formant le groupe le plus nombreux.",
    progress: [
      { time: "Août 1914", text: "Afflux d'engagés volontaires étrangers à Paris." },
      { time: "1915", text: "Combats en Artois et en Champagne. Création du RMLE le 11 novembre." },
      { time: "4 juillet 1916", text: "Attaque de Belloy-en-Santerre, dans la Somme. Le poète Alan Seeger y est tué." },
      { time: "Avril 1917", text: "Combats d'Auberive, en Champagne : environ la moitié des légionnaires engagés sont mis hors de combat." },
      { time: "20 août 1917", text: "À Verdun, le régiment perce le front sur environ 3,5 km." },
      { time: "Avril 1918", text: "Combats de Hangard-en-Santerre : 822 hommes perdus." },
      { time: "1917-1918", text: "Sous les ordres du lieutenant-colonel Rollet à partir de mai 1917 : Verdun, puis les offensives de 1918, dont la percée de la ligne Hindenburg." },
    ],
    consequences:
      "Avec neuf citations, le RMLE termine la guerre parmi les unités les plus décorées de l'armée française. Il devient en 1920 le 3e régiment étranger, puis en 1922 le 3e régiment étranger d'infanterie. À Belloy-en-Santerre, le 4 juillet 1916, le régiment perd 1 368 hommes sur environ 3 000.",
    takeaways: [
      "En 1914, des milliers d'étrangers s'engagent pour défendre la France.",
      "Le RMLE est l'une des unités les plus décorées de la Grande Guerre.",
      "Son héritier est le 3e REI.",
    ],
    didYouKnow: "L'écrivain Blaise Cendrars, d'origine suisse, perd son bras droit au combat en 1915. Il racontera sa guerre dans La Main coupée.",
    extraFacts: ["Les volontaires étrangers de 1914 venaient d'une cinquantaine de pays ; le contingent italien était le plus nombreux."],
    images: [
      { id: "rmle-tranchee", src: "/archives/rmle-tranchee.jpg", caption: "Un légionnaire et son prisonnier (1916)", credit: "Agence Rol (Gallica / BnF)", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Un_l%C3%A9gionnaire_et_son_prisonnier_%28fusil_et_casque_boches%29%2C_Agence_Rol%2C_juillet_1916.jpg" },
      { id: "rmle-drapeau", src: "/archives/rmle-drapeau.jpg", caption: "Le drapeau du RMLE et sa garde (1917)", credit: "G. Garitan", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Drapeau_RMLE_09974.jpg" },
    ],
    quiz: [
      {
        question: "Quel régiment est aujourd'hui l'héritier du RMLE de la Grande Guerre ?",
        choices: ["Le 2e REP", "Le 3e REI", "Le 1er REC", "La 13e DBLE"],
        answer: 1,
        explanation: "En 1920, le RMLE devient le 3e régiment étranger, renommé 3e REI en 1922. Il est aujourd'hui stationné en Guyane.",
      },
      {
        question: "Quel écrivain a raconté sa guerre de légionnaire dans La Main coupée ?",
        choices: ["Blaise Cendrars", "Victor Hugo", "Antoine de Saint-Exupéry", "Alan Seeger"],
        answer: 0,
        explanation: "Blaise Cendrars, engagé volontaire en 1914, perd son bras droit en 1915.",
      },
    ],
    relatedEventIds: ["hindenburg-1918", "maroc-1907", "kourou-1973"],
    sources: [
      { label: "Wikipédia, Régiment de marche de la Légion étrangère", url: "https://fr.wikipedia.org/wiki/R%C3%A9giment_de_marche_de_la_L%C3%A9gion_%C3%A9trang%C3%A8re", status: "verifie" },
      { label: "SAM2G, Le RMLE dans la bataille de la Somme", url: "https://sam2g.fr/rmle-bataille-de-somme/", status: "verifie" },
      S.porch,
    ],
    tags: ["Première Guerre mondiale", "volontaires", "RMLE", "Somme"],
    importance: 1,
    status: "verifie",
  },

  {
    id: "hindenburg-1918",
    title: "La percée de la ligne Hindenburg",
    shortLabel: "Laffaux, 1918",
    type: "bataille",
    date: "1918-09-02",
    endDate: "1918-09-14",
    dateLabel: "2 au 14 septembre 1918",
    location: { name: "Plateau de Laffaux (Aisne)", country: "France", coordinates: [3.43, 49.45] },
    conflictId: "ww1",
    units: "Régiment de marche de la Légion étrangère (RMLE)",
    regimentIds: ["3e-rei"],
    personIds: ["rollet"],
    summary:
      "En septembre 1918, le RMLE de Rollet attaque la ligne de défense allemande près de Soissons. Après deux semaines de combats, il la perce.",
    context:
      "À l'été 1918, les Alliés passent à l'offensive. Pour avancer, il faut franchir la ligne Hindenburg, un réseau de tranchées et de positions fortifiées construit par l'armée allemande. Le RMLE appartient à la 1re division marocaine, rattachée à la Xe armée du général Mangin. Il enlève successivement Sorny, Neuville-sur-Margival, Allemant et le tunnel de Vauxaillon.",
    progress: [
      { time: "2 septembre", text: "Début de l'attaque du RMLE sur le plateau de Laffaux." },
      { time: "Du 2 au 14 septembre", text: "Combats acharnés pour chaque position." },
      { time: "14 septembre", text: "Un saillant de la ligne Hindenburg est enlevé." },
    ],
    consequences:
      "Le 14 septembre est la date de la fête régimentaire du 3e REI, héritier du RMLE. Les pertes du régiment sont très lourdes. Le régiment perd 275 tués et 1 118 blessés. Il obtient sa 9e citation à l'ordre de l'armée et la fourragère double aux couleurs de la Légion d'honneur et de la croix de guerre.",
    takeaways: [
      "En septembre 1918, le RMLE perce la ligne Hindenburg.",
      "Il est commandé par le lieutenant-colonel Rollet.",
      "C'est la bataille régimentaire du 3e REI.",
    ],
    extraFacts: ["La « fourragère » est une tresse portée à l'épaule : elle rappelle les citations collectives d'un régiment, et tous ses soldats la portent."],
    images: [{ id: "laffaux", src: "/archives/laffaux.jpg", caption: "Les ruines de Laffaux (1917)", credit: "Lucien Cottet", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Les_ruines_de_Laffaux%2C_mai_1917.jpg" }],
    quiz: [
      {
        question: "Qui commande le RMLE lors de la percée de la ligne Hindenburg ?",
        choices: ["Le capitaine Danjou", "Le lieutenant-colonel Rollet", "Le général Kœnig", "Le colonel Erulin"],
        answer: 1,
        explanation: "Le lieutenant-colonel Paul-Frédéric Rollet, futur « père de la Légion ».",
      },
      {
        question: "Qu'est-ce que la ligne Hindenburg ?",
        choices: ["Une ligne de chemin de fer", "Un système de défense fortifié allemand", "Une frontière entre la France et la Belgique", "Une route du Maroc"],
        answer: 1,
        explanation: "Un réseau de tranchées et de positions fortifiées construit par l'armée allemande.",
      },
      {
        question: "Quel régiment fête le 14 septembre en souvenir de cette percée ?",
        choices: ["Le 3e REI", "Le 4e RE", "Le 2e REG", "Le 1er RE"],
        answer: 0,
        explanation: "Le 3e régiment étranger d'infanterie, héritier du RMLE, aujourd'hui en Guyane.",
      },
      {
        question: "Qu'est-ce qu'une fourragère ?",
        choices: ["Une ration de nourriture", "Une tresse portée à l'épaule, rappelant les citations du régiment", "Un type de casque", "Un véhicule de ravitaillement"],
        answer: 1,
        explanation: "Tous les soldats d'un régiment cité collectivement peuvent porter sa fourragère à l'épaule.",
      },
    ],
    relatedEventIds: ["ww1-rmle", "kourou-1973"],
    sources: [
      { label: "Ministère des Armées, 3e régiment étranger d'infanterie", detail: "Fête régimentaire du 14 septembre", url: "https://www.defense.gouv.fr/terre/unites-larmee-terre/grands-commandeurs/commandement-force-operations-terrestres-cfot/3e-regiment-etranger", status: "verifie" },
      { label: "FSALE, « Septembre 1918, la Légion perce la ligne Hindenburg »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/1562-histoire-septembre-1918-la-legion-perce-la-ligne-hindenburg.html", status: "verifie" },
    ],
    tags: ["Première Guerre mondiale", "RMLE", "Rollet", "3e REI"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "centenaire-1931",
    title: "Le centenaire et le monument aux morts",
    shortLabel: "Centenaire",
    type: "tradition",
    date: "1931-04-30",
    dateLabel: "30 avril 1931",
    location: { name: "Sidi-Bel-Abbès", country: "Algérie", coordinates: [-0.64, 35.19] },
    conflictId: "institution",
    units: "Ensemble de la Légion étrangère",
    regimentIds: ["1er-re"],
    personIds: ["rollet"],
    summary:
      "Pour ses cent ans, la Légion inaugure à Sidi-Bel-Abbès son monument aux morts. Sous l'impulsion du général Rollet, Camerone devient la grande fête de la Légion.",
    context:
      "Voulu par le général Paul-Frédéric Rollet dès 1927, le monument est inauguré le 30 avril 1931. Premier inspecteur de la Légion étrangère (1931), Rollet s'attache à fixer et transmettre les traditions : cérémonies, récits, symboles. Le monument est l'œuvre du sculpteur Charles-Henri Pourquet. Sur des plaques d'onyx repose un globe terrestre ; aux angles, quatre légionnaires en bronze représentent la conquête de l'Algérie, le Second Empire, les campagnes coloniales et la Grande Guerre.",
    progress: [
      { time: "9 octobre 1930", text: "Pose de la première pierre au quartier Viénot." },
      { time: "1er avril 1931", text: "Rollet prend la tête de l'Inspection de la Légion étrangère, créée pour lui." },
      { time: "30 avril 1931", text: "Inauguration du monument, jour anniversaire de Camerone." },
    ],
    people:
      "Le général Paul-Frédéric Rollet organise les fêtes du centenaire ; le sculpteur Charles-Henri Pourquet réalise les statues.",
    consequences:
      "Le monument aux morts, avec son globe terrestre, est démonté en 1962 et transporté à Aubagne, où il est réinauguré le 30 avril 1963. Il est aujourd'hui inscrit au titre des monuments historiques, comme la salle d'honneur et la crypte du musée.",
    takeaways: ["La Légion fête ses 100 ans en 1931.", "Le monument aux morts a été transféré d'Algérie à Aubagne en 1962."],
    didYouKnow: "Le monument aux morts de la Légion représente un globe terrestre, rappelant que les légionnaires sont venus du monde entier et ont servi sur tous les continents.",
    extraFacts: ["Les légionnaires ont eux-mêmes financé leur monument : chacun a donné une journée de solde par an pendant quatre ans."],
    images: [{ id: "monument-1931", src: "/archives/monument-1931.jpg", caption: "Le monument aux morts à Sidi-Bel-Abbès (vers 1935)", credit: "Fortepan / Balassa Péter", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Az_elesett_l%C3%A9gi%C3%B3sok_eml%C3%A9km%C5%B1ve_%28Monument_aux_Morts_de_la_L%C3%A9gion_Etrang%C3%A8re%29._Fortepan_56604.jpg" }],
    relatedEventIds: ["camerone-1863", "sidi-bel-abbes-1843", "aubagne-1962"],
    sources: [
      { label: "Wikipédia, Monument aux morts de la Légion étrangère", url: "https://fr.wikipedia.org/wiki/Monument_aux_morts_de_la_L%C3%A9gion_%C3%A9trang%C3%A8re", status: "verifie" },
      { label: "Monumentum, Monument aux morts de la Légion étrangère (PA13000091)", url: "https://monumentum.fr/monument-historique/pa13000091/aubagne-monument-aux-morts-de-la-legion-etrangere", status: "verifie" },
      S.musee,
      { label: "Wikipédia, Paul-Frédéric Rollet", url: "https://fr.wikipedia.org/wiki/Paul-Fr%C3%A9d%C3%A9ric_Rollet", status: "verifie" },
    ],
    tags: ["tradition", "Rollet", "monument"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "narvik-1940",
    title: "Narvik",
    shortLabel: "Norvège, 1940",
    type: "bataille",
    date: "1940-05-13",
    endDate: "1940-06",
    dateLabel: "Mai-juin 1940",
    location: { name: "Narvik", country: "Norvège", coordinates: [17.43, 68.44] },
    conflictId: "ww2",
    units: "13e demi-brigade de Légion étrangère",
    regimentIds: ["13e-dble"],
    personIds: ["amilakhvari"],
    summary:
      "Au printemps 1940, la toute jeune 13e demi-brigade de Légion étrangère débarque dans le Grand Nord norvégien. Avec les Alliés, elle participe à la reprise de Narvik.",
    context:
      "L'Allemagne envahit la Norvège en avril 1940. Un corps expéditionnaire franco-britannique et polonais est envoyé pour contrôler le port de Narvik, par lequel transite le minerai de fer suédois. Créée le 1er mars 1940 sous le nom de 13e demi-brigade de marche de Légion étrangère, l'unité est commandée par le lieutenant-colonel Magrin-Vernerey, futur général Monclar. Elle sert sous les ordres du général Béthouart, avec des Britanniques, des Polonais et des Norvégiens. En face, les troupes de montagne allemandes du général Dietl.",
    progress: [
      { time: "10 et 13 avril 1940", text: "Deux batailles navales dans le fjord de Narvik." },
      { time: "23 avril 1940", text: "La demi-brigade embarque à Brest." },
      { time: "13 mai 1940", text: "Débarquement de la 13e DBLE à Bjerkvik, au nord de Narvik." },
      { time: "28 mai 1940", text: "Narvik est reprise par les forces alliées." },
      { time: "Juin 1940", text: "Face à l'effondrement du front en France, le corps expéditionnaire est rembarqué." },
    ],
    people:
      "Le lieutenant-colonel Magrin-Vernerey commande la demi-brigade ; le capitaine Amilakhvari s'y distingue. Le général Béthouart commande le corps expéditionnaire.",
    consequences:
      "Rapatriée en Grande-Bretagne, une partie de la 13e DBLE rejoint le général de Gaulle. Elle devient l'une des premières unités de la France libre. Environ 900 légionnaires rallient la France libre le 30 juin 1940, en Angleterre. La 13e DBLE devient Compagnon de la Libération.",
    takeaways: ["La 13e DBLE combat à Narvik en mai 1940.", "Elle devient ensuite une unité de la France libre."],
    extraFacts: ["À Bjerkvik, la Légion découvre le Grand Nord, loin des déserts qu'elle connaît."],
    images: [{ id: "narvik", src: "/archives/narvik.jpg", caption: "Débarquement à Bjerkvik (1940)", credit: "Imperial War Museum", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:The_French_Army_in_the_Norwegian_Campaign%2C_1940_HU91803.jpg" }],
    relatedEventIds: ["bir-hakeim-1942"],
    sources: [
      { label: "Chemins de mémoire, Campagne de Norvège, 9 avril au 7 juin 1940", url: "https://www.cheminsdememoire.gouv.fr/sites/default/files/editeur/MC01.pdf", status: "verifie" },
      { label: "FSALE, « L'épopée de Narvik »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/2065-histoire-l-epopee-de-narvik-1ere-partie.html", status: "verifie" },
      S.liberation,
      { label: "Wikipédia, Bataille de Narvik", url: "https://fr.wikipedia.org/wiki/Bataille_de_Narvik", status: "verifie" },
    ],
    tags: ["Seconde Guerre mondiale", "Norvège", "France libre"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "bir-hakeim-1942",
    title: "Bir Hakeim",
    shortLabel: "Libye, 1942",
    type: "bataille",
    date: "1942-05-26",
    endDate: "1942-06-11",
    dateLabel: "26 mai au 11 juin 1942",
    location: { name: "Bir Hakeim", country: "Libye", coordinates: [23.48, 31.59] },
    conflictId: "ww2",
    units: "1re brigade française libre du général Kœnig (plus de 3 700 hommes), dont les IIe et IIIe bataillons de la 13e DBLE",
    regimentIds: ["13e-dble"],
    personIds: ["amilakhvari", "travers"],
    summary:
      "En Libye, les Français libres du général Kœnig tiennent quinze jours face à Rommel. Parmi eux, des légionnaires de la 13e DBLE. Ils finissent par percer l'encerclement.",
    keyQuestion: {
      question: "Pourquoi Bir Hakeim a-t-il tant compté en 1942 ?",
      answer:
        "Deux ans après la défaite de 1940, cette résistance montre au monde que la France libre combat toujours. Elle retarde aussi l'avancée de Rommel vers l'Égypte.",
    },
    context:
      "En Libye, les Britanniques tiennent une ligne de défense de Gazala à Bir Hakeim. À son extrémité sud, la 1re brigade française libre occupe un point d'appui isolé dans le désert. La 1re brigade française libre compte 3 723 hommes : la 13e DBLE, le bataillon du Pacifique, le bataillon de marche n° 2 d'Oubangui-Chari, des fusiliers marins et des artilleurs. La position est protégée par environ 50 000 mines. En face : les divisions italiennes Ariete et Trieste et des unités allemandes de Rommel.",
    progress: [
      { time: "26 et 27 mai", text: "Début de l'offensive de Rommel ; les blindés italiens attaquent Bir Hakeim et sont repoussés." },
      { time: "Début juin", text: "Bombardements aériens et assauts répétés. L'eau et les munitions s'épuisent." },
      { time: "De fin mai au 10 juin", text: "L'aviation allemande effectue environ 1 400 sorties contre la position." },
      { time: "Juin 1942", text: "De Gaulle adresse un message aux défenseurs : « toute la France vous regarde et vous êtes son orgueil »." },
      { time: "Nuit du 10 au 11 juin", text: "Sur ordre, la garnison perce l'encerclement de nuit ; environ 2 500 hommes rejoignent les lignes britanniques." },
    ],
    people:
      "Le général Kœnig, le lieutenant-colonel Amilakhvari, prince géorgien qui commande la 13e DBLE et seconde Kœnig, et Susan Travers, conductrice britannique du général lors de la sortie. Les Français libres de Bir Hakeim venaient de France, d'Afrique, du Pacifique et de nombreux pays. Face à Kœnig, le général Erwin Rommel. Le bataillon du Pacifique réunit des volontaires de Polynésie et de Nouvelle-Calédonie ; le bataillon de marche n° 2 vient de l'actuelle Centrafrique.",
    consequences:
      "Bir Hakeim devient un symbole de la France libre. En 1949, le viaduc de Passy et la station de métro Grenelle, à Paris, sont rebaptisés Bir-Hakeim. Pendant le siège, les Français libres perdent 140 tués et 229 blessés ; lors de la sortie, 41 tués et plusieurs centaines de disparus, dont environ 600 prisonniers.",
    takeaways: [
      "Bir Hakeim a lieu en Libye en mai-juin 1942.",
      "La 13e DBLE y combat au sein de la 1re brigade française libre.",
      "La garnison perce l'encerclement dans la nuit du 10 au 11 juin.",
    ],
    didYouKnow:
      "Le pont de Bir-Hakeim, à Paris, porte ce nom en hommage à la bataille. Tu l'as peut-être déjà vu dans des films !",
    extraFacts: ["Parmi les défenseurs de Bir Hakeim se trouvaient des volontaires venus de Tahiti et de Nouvelle-Calédonie, à plus de 15 000 km de chez eux."],
    images: [
      { id: "bir-hakeim-position", src: "/archives/bir-hakeim-position.jpg", caption: "Légionnaires à l'assaut à Bir Hakeim (1942)", credit: "Sgt Len Chetwyn, Imperial War Museum (E 13313)", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Free_French_Foreign_Legionnairs.jpg" },
      archive("koenig", "Le général Kœnig", "Portrait, Ordre de la Libération"),
    ],
    quiz: [
      {
        question: "Dans quel pays se trouve Bir Hakeim ?",
        choices: ["Égypte", "Tunisie", "Libye", "Algérie"],
        answer: 2,
        explanation: "Bir Hakeim est un point d'eau dans le désert libyen.",
      },
      {
        question: "Quel général commande les Français libres à Bir Hakeim ?",
        choices: ["Le général Leclerc", "Le général Kœnig", "Le général Rollet", "Le général de Gaulle"],
        answer: 1,
        explanation: "Le général Marie-Pierre Kœnig commande la 1re brigade française libre.",
      },
      {
        question: "Comment se termine la bataille de Bir Hakeim pour la garnison française ?",
        choices: [
          "Elle capitule",
          "Elle perce l'encerclement de nuit",
          "Elle est évacuée par la mer",
          "Elle reçoit des renforts et contre-attaque",
        ],
        answer: 1,
        explanation: "Dans la nuit du 10 au 11 juin 1942, la garnison sort de vive force et rejoint les lignes britanniques.",
      },
    ],
    relatedEventIds: ["narvik-1940", "dien-bien-phu-1954"],
    sources: [
      { label: "Chemins de mémoire, « 26 mai au 11 juin 1942. La bataille de Bir Hakeim »", url: "https://www.defense.gouv.fr/chemins-memoire/histoire-memoires/ressources-historiques/seconde-guerre-mondiale/operations-militaires/1941-1943-4", status: "verifie" },
      { label: "Chemins de mémoire, livret « La bataille de Bir Hakeim »", url: "https://www.cheminsdememoire.gouv.fr/sites/default/files/editeur/MC22.pdf", status: "verifie" },
      { label: "Ordre de la Libération, Pierre Kœnig", url: "https://www.ordredelaliberation.fr/fr/compagnons/pierre-koenig", status: "verifie" },
      { label: "Wikipédia, Bataille de Bir Hakeim", url: "https://fr.wikipedia.org/wiki/Bataille_de_Bir_Hakeim", status: "verifie" },
    ],
    tags: ["Seconde Guerre mondiale", "France libre", "désert", "Kœnig"],
    importance: 1,
    status: "verifie",
  },

  {
    id: "indochine-1946",
    title: "La guerre d'Indochine",
    shortLabel: "Indochine",
    type: "campagne",
    date: "1946",
    endDate: "1954",
    dateLabel: "1946-1954",
    location: { name: "Route coloniale 4 (Tonkin)", country: "Vietnam", coordinates: [106.25, 22.67] },
    conflictId: "indochine",
    units: "Nombreux bataillons des régiments étrangers d'infanterie, 13e DBLE, 1er REC, bataillons étrangers de parachutistes (1er et 2e BEP)",
    regimentIds: ["13e-dble", "3e-rei", "2e-rei", "1er-rec", "2e-rep"],
    summary:
      "Pendant huit ans, la Légion est massivement engagée en Indochine. C'est le conflit le plus meurtrier de son histoire : environ 11 000 légionnaires y ont perdu la vie.",
    context:
      "Après 1945, la France cherche à rétablir son autorité en Indochine face au Viet Minh, qui combat pour l'indépendance. La guerre s'étend à tout le pays, dans les rizières, la jungle et les montagnes. Plus de 72 000 légionnaires servent en Indochine pendant la guerre. Sur la RC4, en octobre 1950, environ 6 000 soldats français font face à 20 000 à 30 000 combattants du Viet Minh ; dans les gorges de Coc Xa, une poignée seulement de légionnaires du 1er BEP en réchappent.",
    progress: [
      { time: "Mars 1946", text: "Débarquement du 2e REI." },
      { time: "1948", text: "Création des bataillons étrangers de parachutistes (1er et 2e BEP)." },
      { time: "Juillet 1948", text: "À Phu Tong Hoa, 101 légionnaires du 3e REI tiennent leur poste trois jours face à une attaque massive." },
      { time: "Septembre-octobre 1950", text: "Désastre de la RC4 : les colonnes françaises sont détruites ; le 1er BEP est presque anéanti, puis dissous en décembre." },
      { time: "1954", text: "Bataille de Dien Bien Phu." },
    ],
    people:
      "Le colonel Charton, du 3e REI, commande l'une des colonnes de la RC4. En face, l'armée du général Võ Nguyên Giáp.",
    consequences: "Les accords de Genève (juillet 1954) mettent fin à la guerre. La Légion quitte l'Indochine. Entre 1946 et 1954, 307 officiers, 1 082 sous-officiers et 9 092 légionnaires sont tués ou meurent de leurs blessures.",
    takeaways: ["La Légion combat en Indochine de 1946 à 1954.", "C'est la guerre la plus meurtrière de son histoire."],
    extraFacts: ["À Phu Tong Hoa en 1948, une quarantaine d'hommes tiennent encore debout quand les renforts arrivent. Le poste n'est pas tombé."],
    images: [{ id: "indochine", src: "/archives/indochine.jpg", caption: "Dans le delta du fleuve Rouge (vers 1954)", credit: "US Department of Defense", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:HD-SN-99-02041.JPEG" }],
    relatedEventIds: ["dien-bien-phu-1954", "tuyen-quang-1885"],
    sources: [
      { label: "Wikipédia, Légion étrangère dans la guerre d'Indochine", detail: "Bilan : environ 10 500 tués", url: "https://fr.wikipedia.org/wiki/L%C3%A9gion_%C3%A9trang%C3%A8re_dans_la_guerre_d'Indochine", status: "verifie" },
      { label: "Wikipedia, 1st Foreign Parachute Battalion", url: "https://en.wikipedia.org/wiki/1st_Foreign_Parachute_Battalion", status: "verifie" },
      S.porch,
    ],
    tags: ["Indochine", "décolonisation", "BEP"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "dien-bien-phu-1954",
    title: "Dien Bien Phu",
    shortLabel: "Indochine, 1954",
    type: "bataille",
    date: "1954-03-13",
    endDate: "1954-05-07",
    dateLabel: "13 mars au 7 mai 1954",
    location: { name: "Diên Biên Phu", country: "Vietnam", coordinates: [103.02, 21.39] },
    conflictId: "indochine",
    units: "Ier et IIIe bataillons de la 13e DBLE, Ier bataillon du 2e REI, IIIe bataillon du 3e REI, 1er et 2e bataillons étrangers de parachutistes, 1re et 2e compagnies de mortiers lourds de la Légion",
    regimentIds: ["13e-dble", "2e-rei", "3e-rei", "2e-rep"],
    summary:
      "Dans une cuvette du nord-ouest du Vietnam, un camp retranché français est assiégé pendant 57 jours par l'armée du Viet Minh. Les légionnaires y forment une part importante des défenseurs.",
    keyQuestion: {
      question: "Pourquoi Dien Bien Phu marque-t-il la fin d'une époque ?",
      answer:
        "Sa chute, le 7 mai 1954, précipite la fin de la guerre d'Indochine et de la présence française dans la région. C'est un tournant de l'histoire de la décolonisation.",
    },
    context:
      "Le commandement français installe une base aéroterrestre dans la vallée de Dien Bien Phu pour attirer et battre le corps de bataille du Viet Minh. Mais le général Giap parvient à installer son artillerie sur les hauteurs qui dominent la cuvette. L'opération Castor débute le 20 novembre 1953 : environ 9 000 parachutistes sont largués en trois jours dans la vallée. La garnison atteint près de 16 000 hommes. Le général Giap engage plusieurs dizaines de milliers de combattants, soutenus par des dizaines de milliers de porteurs. Le point d'appui Isabelle est isolé à 5 ou 6 km au sud.",
    progress: [
      { time: "20 novembre 1953", text: "Opération Castor : les parachutistes prennent la vallée." },
      { time: "13 mars 1954", text: "Début de l'attaque. Le point d'appui Béatrice, tenu par le IIIe bataillon de la 13e DBLE, tombe dans la nuit ; son chef, le commandant Pégot, est tué." },
      { time: "15 mars 1954", text: "Le colonel Piroth, chef de l'artillerie, se donne la mort." },
      { time: "Fin mars", text: "La piste d'aviation est rendue inutilisable : le camp ne peut plus être ravitaillé que par parachutage." },
      { time: "Avril", text: "Combats acharnés pour les points d'appui. Des volontaires sont parachutés en renfort, certains sans formation au saut." },
      { time: "30 avril 1954", text: "Camerone est commémoré dans le camp assiégé : le récit du combat est lu sur les points d'appui et à la radio." },
      { time: "7 mai 1954", text: "Fin des combats. Les survivants sont emmenés en captivité ; beaucoup n'en reviendront pas." },
      { time: "7 et 8 mai 1954", text: "La garnison d'Isabelle tente une sortie : environ 70 hommes sur 1 700 s'échappent." },
      { time: "21 juillet 1954", text: "Accords de Genève : le Vietnam est partagé au 17e parallèle." },
    ],
    people:
      "Des légionnaires de toutes nationalités, aux côtés de parachutistes, de tirailleurs et de soldats vietnamiens de l'armée française. En face, les combattants de l'armée populaire vietnamienne, qui paient eux aussi un très lourd tribut. Le colonel de Castries commande le camp ; le lieutenant-colonel Langlais et le commandant Bigeard dirigent la défense.",
    consequences:
      "La défaite pèse sur les négociations de Genève, qui mettent fin à la guerre. Pour la Légion, Dien Bien Phu demeure un lieu de mémoire majeur, associé au sacrifice et à la captivité. Environ 1 142 soldats de l'Union française sont tués au combat et 11 721 faits prisonniers ; seuls 3 290 sont rapatriés quatre mois plus tard, dans un état très grave.",
    takeaways: [
      "Le siège dure du 13 mars au 7 mai 1954.",
      "Les légionnaires forment une part importante de la garnison.",
      "La chute du camp met fin à la guerre d'Indochine.",
    ],
    didYouKnow: "Même assiégés, les légionnaires de Dien Bien Phu ont commémoré Camerone le 30 avril 1954.",
    extraFacts: ["Les points d'appui du camp portaient des prénoms féminins : Béatrice, Gabrielle, Anne-Marie, Huguette, Dominique, Claudine, Éliane et Isabelle."],
    images: [
      { id: "dbp-cuvette", src: "/archives/dbp-cuvette.jpg", caption: "Dans les tranchées de Dien Bien Phu (1954)", credit: "Anonyme, 1954", license: "Domaine public (selon Commons)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Dien_Bien_Phu002.jpg" },
      { id: "dbp-parachutage", src: "/archives/dbp-parachutage.png", caption: "Largage de parachutistes à Dien Bien Phu (1954)", credit: "Warner Pathé News", license: "Domaine public (selon Commons)", sourceUrl: "https://commons.wikimedia.org/wiki/File:Dien_bien_phu_castor_or_siege_deinterlaced.png" },
    ],
    quiz: [
      {
        question: "Combien de temps dure le siège de Dien Bien Phu ?",
        choices: ["Une journée", "Une semaine", "57 jours", "Deux ans"],
        answer: 2,
        explanation: "Du 13 mars au 7 mai 1954 : 57 jours de combats.",
      },
      {
        question: "À Dien Bien Phu, pourquoi la perte de la piste d'aviation est-elle si grave ?",
        choices: [
          "Les avions ne peuvent plus ravitailler ni évacuer les blessés",
          "Les soldats ne peuvent plus se déplacer",
          "Elle servait de réserve d'eau",
          "Elle abritait le quartier général",
        ],
        answer: 0,
        explanation: "Sans piste, le camp ne dépend plus que des parachutages et les blessés ne peuvent plus être évacués.",
      },
      {
        question: "Quelle date de tradition les légionnaires commémorent-ils dans le camp assiégé de Dien Bien Phu ?",
        choices: ["Le 14 juillet", "Le 30 avril", "Le 11 novembre", "Le 9 mars"],
        answer: 1,
        explanation: "Le 30 avril, anniversaire de Camerone.",
      },
    ],
    relatedEventIds: ["indochine-1946", "camerone-1863", "bir-hakeim-1942"],
    sources: [
      { label: "Bernard B. Fall, Hell in a Very Small Place: The Siege of Dien Bien Phu", detail: "Lippincott, 1966", status: "verifie" },
      { label: "Wikipedia, Battle of Dien Bien Phu order of battle", url: "https://en.wikipedia.org/wiki/Battle_of_Dien_Bien_Phu_order_of_battle", status: "verifie" },
      { label: "Theatrum Belli, Journal de marche, 13 mars 1954", url: "https://theatrum-belli.com/dien-bien-phu-journal-de-marche-du-13mars-1954/", status: "verifie" },
      { label: "Zone Militaire, « Il y a 60 ans, faire Camerone à Dien Bien Phu »", url: "https://www.opex360.com/2014/04/30/il-y-60-ans-faire-camerone-dien-bien-phu/", status: "verifie" },
      { label: "Pertes détaillées des unités de Légion", detail: "Chiffres à établir avec un historien (SHD)", status: "a-verifier" },
      { label: "Wikipédia, Bataille de Diên Biên Phu", url: "https://fr.wikipedia.org/wiki/Bataille_de_Di%C3%AAn_Bi%C3%AAn_Phu", status: "verifie" },
    ],
    tags: ["Indochine", "siège", "captivité", "décolonisation"],
    importance: 1,
    status: "verifie",
  },

  {
    id: "algerie-1954",
    title: "La guerre d'Algérie",
    shortLabel: "Algérie",
    type: "campagne",
    date: "1954-11",
    endDate: "1962-07",
    dateLabel: "1954-1962",
    location: { name: "Algérie", country: "Algérie", coordinates: [3.06, 36.0] },
    conflictId: "algerie",
    units: "Régiments étrangers d'infanterie, de cavalerie et de parachutistes",
    regimentIds: ["1er-re", "2e-rei", "3e-rei", "1er-rec", "2e-rep", "13e-dble"],
    summary:
      "La Légion, présente en Algérie depuis 1831, est engagée dans la guerre qui conduit à l'indépendance du pays en 1962. Elle doit ensuite quitter sa terre d'origine.",
    context:
      "Le conflit oppose l'armée française aux indépendantistes algériens du FLN. C'est une guerre douloureuse, dont la mémoire reste sensible des deux côtés de la Méditerranée. En novembre 1954, la plupart des unités de la Légion sont encore en Indochine ; en juillet 1955, environ 20 000 légionnaires sont regroupés en Algérie. Le 1er REP, créé en septembre 1955, participe en 1957 à la bataille d'Alger, marquée par l'emploi de la torture contre les indépendantistes, dénoncé dès 1957 par le général de Bollardière et par Paul Teitgen.",
    progress: [
      { time: "1954-1960", text: "Les régiments de la Légion participent aux opérations dans toute l'Algérie." },
      { time: "Juillet 1955", text: "Regroupement des unités de la Légion en Algérie." },
      { time: "1957", text: "Le 1er REP participe à la bataille d'Alger." },
      { time: "29 mai 1958", text: "Le lieutenant-colonel Jeanpierre, chef du 1er REP, est tué quand son hélicoptère est abattu." },
      { time: "Avril 1961", text: "Le 1er REP prend part au putsch des généraux à Alger. Le régiment est dissous le 30 avril 1961." },
      { time: "11 août 1961", text: "Le légionnaire Heinz Zimmermann est tué : il est considéré comme le dernier légionnaire tombé sur le sol algérien." },
      { time: "1962", text: "Indépendance de l'Algérie. Le 29 septembre, derniers honneurs au quartier Viénot ; la Légion quitte Sidi-Bel-Abbès pour la métropole." },
    ],
    people:
      "Le commandant Hélie Denoix de Saint Marc entraîne le 1er REP dans le putsch d'avril 1961 ; Pierre Messmer, ministre des Armées, prononce sa dissolution. Face à l'armée française, les combattants du FLN et de l'ALN luttent pour l'indépendance.",
    consequences:
      "Après 131 ans de présence, la Légion s'installe en France. Elle emporte son monument aux morts, la main du capitaine Danjou et les restes du général Rollet, du prince Aage de Danemark et du légionnaire Zimmermann, inhumés à Puyloubier. Selon l'armée de Terre, 2 000 légionnaires ont perdu la vie en Algérie. Le 1er REP dissous, le 2e REP reste aujourd'hui le seul régiment parachutiste de la Légion.",
    takeaways: ["La guerre d'Algérie met fin à 131 ans de présence de la Légion en Algérie.", "En 1962, la maison mère s'installe à Aubagne."],
    extraFacts: ["En 1962, seuls environ 700 légionnaires restent à Sidi-Bel-Abbès pour la dernière cérémonie."],
    images: [archive("depart-sba", "Le départ de Sidi-Bel-Abbès, 1962", "Fonds ECPAD / Musée de la Légion, à sélectionner")],
    relatedEventIds: ["sidi-bel-abbes-1843", "aubagne-1962"],
    sources: [
      { label: "Jean Michon, « Sidi-bel-Abbès : capitale légionnaire »", detail: "Guerres mondiales et conflits contemporains, n° 237, 2010", url: "https://www.cairn.info/revue-guerres-mondiales-et-conflits-contemporains-2010-1-page-25.htm", status: "verifie" },
      { label: "FSALE, « Dès 1962 : l'aventure légionnaire à son retour d'Algérie »", url: "https://www.legionetrangere.fr/la-fsale/actualites-de-la-fsale/4017-historique-l-aventure-legionnaire-de-1962-retour-d-algerie.html", status: "verifie" },
      { label: "Wikipédia, 1er régiment étranger de parachutistes", url: "https://fr.wikipedia.org/wiki/1er_r%C3%A9giment_%C3%A9tranger_de_parachutistes", status: "verifie" },
      { label: "Wikipédia, Bataille d'Alger", url: "https://fr.wikipedia.org/wiki/Bataille_d%27Alger", status: "verifie" },
    ],
    tags: ["Algérie", "décolonisation"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "aubagne-1962",
    title: "Aubagne, la nouvelle maison mère",
    shortLabel: "Aubagne",
    type: "fondation",
    date: "1962",
    dateLabel: "1962",
    location: { name: "Aubagne", country: "France", coordinates: [5.57, 43.29] },
    conflictId: "institution",
    units: "1er régiment étranger",
    regimentIds: ["1er-re"],
    summary:
      "Depuis 1962, la maison mère de la Légion est à Aubagne près de Marseille. On y trouve le musée, le monument aux morts et la main du capitaine Danjou.",
    keyQuestion: {
      question: "Que se passe-t-il à Aubagne chaque 30 avril ?",
      answer:
        "La Légion y célèbre Camerone : le récit du combat est lu, et la main du capitaine Danjou est présentée devant le monument aux morts.",
    },
    context:
      "Après l'indépendance de l'Algérie, la Légion s'installe en métropole. Le 1er régiment étranger prend ses quartiers à Aubagne, dans l'ancien camp de la Demande rebaptisé quartier Viénot (juillet-octobre 1962), qui devient le centre administratif et symbolique de la Légion. Le 1er régiment étranger gère aussi l'Institution des invalides de la Légion étrangère, à Puyloubier, où reposent le général Rollet et d'autres figures de la Légion.",
    progress: [
      { time: "15 juillet 1962", text: "Arrivée des premiers éléments au camp de la Demande." },
      { time: "29 septembre 1962", text: "Les cercueils du général Rollet, du prince Aage de Danemark et du légionnaire Zimmermann sont transférés à Puyloubier." },
      { time: "29 et 30 avril 1963", text: "Première veillée de Camerone en métropole, puis réinauguration du monument aux morts à Aubagne." },
      { time: "1966", text: "Pierre Messmer, ministre des Armées, inaugure le musée de la Légion." },
    ],
    people:
      "Pierre Messmer, ancien de la 13e DBLE devenu ministre des Armées, inaugure le musée en 1966.",
    consequences:
      "Aubagne accueille la cérémonie de Camerone, le musée de la Légion et le centre de recrutement principal. Le musée, labellisé « Musée de France » en 2011, conserve près de 8 000 objets ; agrandi en 2016, il reçoit environ 20 000 visiteurs par an.",
    takeaways: ["Aubagne est la maison mère de la Légion depuis 1962.", "Le musée de la Légion s'y trouve."],
    extraFacts: ["La première fête de Camerone en métropole a lieu en 1963, avec une veillée à Gémenos puis la cérémonie à Aubagne."],
    images: [
      { id: "monument-aubagne", src: "/archives/monument-aubagne.jpg", caption: "Le monument aux morts à Aubagne", credit: "davric", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Monument_morts_legion.JPG" },
      { id: "musee", src: "/archives/musee.jpg", caption: "Le musée de la Légion à Aubagne", credit: "davric", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Musee_legion.JPG" },
    ],
    relatedEventIds: ["camerone-1863", "centenaire-1931", "algerie-1954", "sebastopol-1855"],
    sources: [
      { label: "Ministère des Armées, Pôle muséal de la Légion étrangère", url: "https://www.terre.defense.gouv.fr/art-patrimoine-terre/nos-musees/musees-larmee-terre/pole-museal-legion-etrangere", status: "verifie" },
      { label: "Wikipédia, 1er régiment étranger", url: "https://fr.wikipedia.org/wiki/1er_r%C3%A9giment_%C3%A9tranger", status: "verifie" },
      S.officiel,
    ],
    tags: ["garnison", "maison mère", "musée", "Camerone"],
    importance: 2,
    status: "verifie",
  },

  {
    id: "kourou-1973",
    title: "La Légion en Guyane",
    shortLabel: "Guyane",
    type: "fondation",
    date: "1973",
    dateLabel: "1973 à aujourd'hui",
    location: { name: "Kourou", country: "Guyane (France)", coordinates: [-52.65, 5.16] },
    conflictId: "institution",
    units: "3e régiment étranger d'infanterie",
    regimentIds: ["3e-rei"],
    summary:
      "Depuis septembre 1973, le 3e REI est stationné en Guyane, au quartier Forget de Kourou. Il participe à la protection du centre spatial et à la lutte contre l'orpaillage illégal en forêt amazonienne.",
    context:
      "La Guyane accueille le Centre spatial guyanais, d'où décollent les fusées européennes. Le 3e REI y assure des missions de protection et de souveraineté, et forme aux techniques de vie et de combat en forêt équatoriale. Le régiment assure la protection extérieure du Centre spatial guyanais lors des lancements (mission Titan) et surveille les frontières de ce vaste territoire couvert de forêt amazonienne.",
    progress: [
      { time: "11 septembre 1973", text: "Installation du 3e REI à Kourou, au quartier Forget." },
      { time: "Février 2008", text: "Début de l'opération Harpie contre l'orpaillage clandestin." },
    ],
    people:
      "Les légionnaires du 3e REI agissent aux côtés des gendarmes et des autres unités des forces armées en Guyane.",
    consequences: "Le régiment est devenu une référence de l'aguerrissement en milieu équatorial. Le régiment forme des militaires français et étrangers au Centre d'entraînement en forêt équatoriale (CEFE).",
    takeaways: ["Le 3e REI est en Guyane depuis 1973.", "Il protège notamment le centre spatial de Kourou."],
    extraFacts: ["Lors d'un décollage depuis Kourou, des légionnaires du 3e REI participent à la sécurité autour du centre spatial : c'est la « mission Titan »."],
    images: [{ id: "guyane", src: "/archives/guyane.jpg", caption: "Le 3e REI en forêt guyanaise (2007)", credit: "davric", license: "Domaine public", sourceUrl: "https://commons.wikimedia.org/wiki/File:Marche_Fourrag%C3%A9re_01.jpg" }],
    relatedEventIds: ["ww1-rmle"],
    sources: [
      { label: "Ministère des Armées, 3e régiment étranger d'infanterie", url: "https://www.terre.defense.gouv.fr/legion-etrangere/regiments-unites-legion-etrangere/regiments-outre-mer/3e-regiment-etranger-dinfanterie-3rei", status: "verifie" },
      { label: "Wikipédia, 3e régiment étranger d'infanterie", url: "https://fr.wikipedia.org/wiki/3e_r%C3%A9giment_%C3%A9tranger_d'infanterie", status: "verifie" },
    ],
    tags: ["Guyane", "forêt équatoriale", "3e REI"],
    importance: 3,
    status: "verifie",
  },

  {
    id: "kolwezi-1978",
    title: "Kolwezi",
    shortLabel: "Zaïre, 1978",
    type: "operation",
    date: "1978-05-19",
    endDate: "1978-05",
    dateLabel: "19 et 20 mai 1978",
    location: { name: "Kolwezi", country: "Zaïre (auj. RD Congo)", coordinates: [25.47, -10.71] },
    conflictId: "afrique",
    units: "2e régiment étranger de parachutistes, opération Léopard (nom de code du régiment : Bonite)",
    regimentIds: ["2e-rep"],
    personIds: ["erulin"],
    summary:
      "En mai 1978, des rebelles prennent la ville minière de Kolwezi au Zaïre. Le 2e REP part de Corse et saute sur la ville pour secourir les habitants.",
    keyQuestion: {
      question: "Pourquoi parle-t-on d'une opération de sauvetage ?",
      answer:
        "Le but n'était pas de conquérir mais de protéger des civils menacés par les combats.",
    },
    context:
      "Le 13 mai 1978, des rebelles katangais du FNLC, venus d'Angola par la Zambie, prennent Kolwezi, au cœur de la région minière du Shaba. Des milliers d'habitants sont pris au piège. À la demande des autorités zaïroises, la France décide d'intervenir. Le président Mobutu demande l'aide de la France ; le président Giscard d'Estaing choisit une opération fondée sur la surprise. Le transport se fait avec un Transall français, des C-130 zaïrois et des avions américains. La première vague, 405 hommes, saute vers 14 h 30 sur un ancien aéroclub au nord de la vieille ville.",
    progress: [
      { time: "13 mai", text: "Prise de Kolwezi par les rebelles." },
      { time: "17 et 18 mai", text: "Le 2e REP, alerté le 17 mai, embarque à Solenzara dans la nuit et rejoint Kinshasa." },
      { time: "19 mai, après-midi", text: "Première vague parachutée directement sur la ville." },
      { time: "20 mai", text: "Seconde vague. La ville est sécurisée ; les civils sont protégés et évacués, avec l'appui des parachutistes belges." },
      { time: "Mi-juin 1978", text: "Une force interafricaine (Maroc, Gabon, Côte d'Ivoire, Sénégal, Togo) relève les troupes françaises." },
    ],
    people: "Le colonel Philippe Erulin, chef de corps du 2e REP, et ses légionnaires. Côté belge, le colonel Rik Depoorter commande les paracommandos de l'opération Red Bean.",
    consequences:
      "L'opération permet de sauver plus de 2 000 civils, mais environ 120 Européens et de nombreux Africains ont été tués par les rebelles. Le 2e REP perd cinq légionnaires. L'opération reste l'une des opérations aéroportées les plus marquantes de l'armée française depuis 1945.",
    takeaways: [
      "En mai 1978, le 2e REP saute sur Kolwezi.",
      "C'est une opération de sauvetage de civils.",
      "Le régiment vient de Calvi, en Corse.",
    ],
    didYouKnow: "Le 2e REP est alerté en Corse le 17 mai. Deux jours plus tard, il saute sur Kolwezi, à des milliers de kilomètres.",
    extraFacts: ["Les légionnaires ont sauté de 250 mètres seulement pour toucher le sol au plus vite."],
    images: [{ id: "kolwezi", src: "/archives/kolwezi.jpg", caption: "Parachutistes près de Kolwezi (1978)", credit: "T. P. Odom, « Shaba II », US Army", license: "Domaine public (selon Commons)", sourceUrl: "https://commons.wikimedia.org/wiki/File:French_paratroopers.jpeg" }],
    quiz: [
      {
        question: "Quel régiment est parachuté sur Kolwezi ?",
        choices: ["Le 2e REP", "Le 3e REI", "Le 1er REC", "Le 4e RE"],
        answer: 0,
        explanation: "Le 2e régiment étranger de parachutistes, basé à Calvi.",
      },
      {
        question: "Quel était le but principal de l'opération de Kolwezi, en mai 1978 ?",
        choices: ["Conquérir une région minière", "Protéger et évacuer des civils", "Former l'armée zaïroise", "Construire un aéroport"],
        answer: 1,
        explanation: "Il s'agissait de secourir les habitants menacés.",
      },
      {
        question: "Où est stationné le 2e REP, le régiment parachuté sur Kolwezi ?",
        choices: ["À Aubagne", "À Calvi", "À Nîmes", "À Kourou"],
        answer: 1,
        explanation: "Le 2e REP est stationné au camp Raffalli, à Calvi, en Corse.",
      },
    ],
    relatedEventIds: ["sahel-2013"],
    sources: [
      { label: "Chemins de mémoire, « Kolwezi, 17 mai au 16 juin 1978. Opération Léopard »", url: "https://www.defense.gouv.fr/chemins-memoire/histoire-memoires/ressources-historiques/operations-exterieures/opex-travers-monde/kolwezi-17-mai", status: "verifie" },
      { label: "Wikipédia, Bataille de Kolwezi", url: "https://fr.wikipedia.org/wiki/Bataille_de_Kolwezi", status: "verifie" },
      { label: "Zone Militaire, « Il y a 30 ans, le 2e REP sautait sur Kolwezi »", url: "https://www.opex360.com/2008/05/20/il-y-a-30-ans-le-2e-rep-sautait-sur-kolwezi/", status: "verifie" },
    ],
    tags: ["Afrique", "parachutistes", "sauvetage", "2e REP"],
    importance: 1,
    status: "verifie",
  },

  {
    id: "sahel-2013",
    title: "Au Sahel : Serval et Barkhane",
    shortLabel: "Sahel",
    type: "operation",
    date: "2013-01",
    endDate: "2022",
    dateLabel: "2013-2022",
    location: { name: "Tombouctou", country: "Mali", coordinates: [-3.0, 16.77] },
    conflictId: "opex",
    units: "Plusieurs régiments de la Légion, dont le 2e REP",
    regimentIds: ["2e-rep", "1er-rec", "2e-rei", "1er-reg", "2e-reg"],
    summary:
      "En janvier 2013, la France intervient au Mali contre des groupes djihadistes. Une compagnie du 2e REP saute près de Tombouctou : son premier saut en opération depuis Kolwezi.",
    context:
      "L'opération Serval (2013-2014), puis l'opération Barkhane (2014-2022), engagent l'armée française dans toute la bande sahélienne. Les régiments de la Légion s'y relaient pendant près de dix ans. Serval commence le 11 janvier 2013 pour arrêter l'offensive de groupes armés djihadistes vers le sud du Mali. Barkhane lui succède le 1er août 2014 dans cinq pays, Mauritanie, Mali, Burkina Faso, Niger et Tchad, avec un état-major à N'Djamena.",
    progress: [
      { time: "11 janvier 2013", text: "Début de l'opération Serval." },
      { time: "Février-mars 2013", text: "Combats dans le massif de l'Adrar des Ifoghas." },
      { time: "19 février 2013", text: "Le sergent-chef Harold Vormezeele, du 2e REP, est tué dans l'Adrar des Ifoghas." },
      { time: "1er août 2014", text: "Barkhane succède à Serval." },
      { time: "9 novembre 2022", text: "Annonce de la fin de l'opération Barkhane." },
    ],
    people:
      "Le sergent-chef Harold Vormezeele, né en Belgique, engagé dans la Légion à 19 ans et devenu français en 2010, est tué au combat le 19 février 2013. Les soldats maliens combattent aux côtés des Français.",
    consequences: "Ces opérations illustrent la place de la Légion dans les engagements de l'armée française au XXIe siècle. L'opération se termine alors que les relations entre la France et les autorités maliennes se dégradent.",
    takeaways: ["La Légion est engagée au Sahel de 2013 à 2022.", "Le 2e REP est parachuté près de Tombouctou en janvier 2013."],
    extraFacts: ["Une « barkhane » est une dune de sable en forme de croissant, typique du Sahara."],
    images: [{ id: "sahel", src: "/archives/sahel.jpg", caption: "Légionnaires au Sahel (2020)", credit: "Joseph Joseph / Armée française", license: "Licence Ouverte", sourceUrl: "https://commons.wikimedia.org/wiki/File:French_Foreign_Legion.jpg" }],
    relatedEventIds: ["kolwezi-1978"],
    sources: [
      { label: "Zone Militaire, « Le 2e REP a sauté sur Tombouctou »", url: "https://www.opex360.com/2013/01/28/le-2e-rep-a-saute-sur-tombouctou/", status: "verifie" },
      { label: "Wikipedia, Operation Serval", url: "https://en.wikipedia.org/wiki/Operation_Serval", status: "verifie" },
      { label: "Liste des unités de Légion engagées par mandat", detail: "À compléter (état-major des armées)", status: "a-verifier" },
      { label: "Wikipédia, Opération Barkhane", url: "https://fr.wikipedia.org/wiki/Op%C3%A9ration_Barkhane", status: "verifie" },
      { label: "Zone Militaire, « Sergent-chef Harold Vormezeele, mort pour la France »", url: "https://www.opex360.com/2013/02/19/sergent-chef-harold-vormezeele-mort-pour-la-france/", status: "verifie" },
    ],
    tags: ["opérations extérieures", "Sahel", "Mali"],
    importance: 2,
    status: "verifie",
  },
];

