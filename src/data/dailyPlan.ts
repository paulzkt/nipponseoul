import type { City } from '@/data/trip';

export type AgendaKind = 'flight' | 'transport' | 'activity' | 'food' | 'hotel' | 'free';

export interface AgendaItem {
  time: string;
  title: string;
  detail: string;
  kind: AgendaKind;
  included?: boolean;
  paid?: boolean;
  warning?: boolean;
  statusLabel?: string;
  bookingUrl?: string;
  ticketUrl?: string;
  excursion?: {
    mode: string;
    duration: string;
    meetingTime: string;
    departureTime: string;
    meetingPoint: string;
    meetingAddress: string;
    meetingDirections: string;
    meetingMapUrl: string;
    meetingContact?: string;
    voucherInstruction: string;
    stops: Array<{ name: string; duration?: string; detail?: string }>;
    note?: string;
  };
}

export interface DailyPlan {
  id: string;
  dayNumber: number;
  weekday: string;
  dateLabel: string;
  shortDate: string;
  city: City;
  country: string;
  title: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  transport: string;
  transportDuration: string;
  airline: string;
  hotel: string;
  hotelDetail: string;
  agenda: AgendaItem[];
  note?: string;
  alert?: string;
}

export type EventOfDayKind = 'activity' | 'excursion' | 'train' | 'flight' | 'hotel' | 'transfer';

export interface EventOfDay {
  steps?: Array<{ name: string; detail: string; duration?: string }>;
  kind: EventOfDayKind;
  title: string;
  schedule: string;
  location: string;
  detail?: string;
  mapUrl: string;
  bookingUrl?: string;
  ticketUrl?: string;
  included?: boolean;
  paid?: boolean;
  confirmed?: boolean;
  planned?: boolean;
  warning?: boolean;
}

export const dailyPlans: DailyPlan[] = [
  {
    id: 'sep30', dayNumber: 1, weekday: 'Mercredi', dateLabel: '30 septembre 2026', shortDate: '30 SEP', city: 'Paris', country: 'France → Japon', title: 'Grand départ vers Tokyo',
    breakfast: 'À la maison / à choisir avant CDG', lunch: 'Repas à bord Air France', dinner: 'Repas à bord Air France', transport: 'Vol direct AF186 · Paris-CDG → Tokyo-Haneda', transportDuration: 'Environ 13 h 15', airline: 'Air France', hotel: 'Nuit en vol', hotelDetail: 'Paris-CDG → Tokyo-Haneda',
    agenda: [
      { time: 'Vers 07:00', title: 'Arrivée conseillée à Paris-CDG', detail: 'Terminal 2E. Enregistrement en ligne dès 30 h avant le départ ; heure d’embarquement selon la carte. Dossier ZV8V7L. Garder les QR codes Visit Japan Web et les vouchers hors ligne.', kind: 'flight' },
      { time: '10:10', title: 'Décollage du vol AF186', detail: 'Vol direct en classe économique. Les documents indiquent deux bagages cabine.', kind: 'flight', included: true },
      { time: 'Journée', title: 'Installation à bord', detail: 'Repas et nuit dans l’avion, arrivée le lendemain matin au Japon.', kind: 'free' },
    ],
  },
  {
    id: 'oct01', dayNumber: 2, weekday: 'Jeudi', dateLabel: '1 octobre 2026', shortDate: '01 OCT', city: 'Tokyo', country: 'Japon', title: 'Arrivée & premiers néons',
    breakfast: 'Après l’arrivée · à choisir', lunch: 'Libre près de l’hôtel', dinner: 'Ramen local', transport: 'Transfert Haneda puis métro / marche', transportDuration: 'Transfert Welcome Pickups réservé', airline: 'Air France · vol AF186', hotel: 'Grand Prince Hotel Takanawa', hotelDetail: 'Superior Corner King · 27 m² · chambre seule · non-fumeur · première nuit',
    agenda: [
      { time: '06:25', title: 'Arrivée à Tokyo-Haneda', detail: 'Passage de l’immigration, récupération des bagages et accueil pour le transfert.', kind: 'flight', included: true },
      { time: 'Après les formalités', title: 'Transfert Haneda → hôtel · réservé', detail: 'Welcome Pickups · Mr Li · hall des arrivées T3, pancarte à votre nom. Horaire réservé 06:30 ; attente et siège enfant à confirmer. Chambre à partir de 15:00 : arrivée anticipée non confirmée.', kind: 'transport', statusLabel: 'Réservé' },
      { time: 'Après-midi', title: 'Balade libre à Shinjuku', detail: 'Premiers quartiers animés, parc ou pause selon la fatigue du vol.', kind: 'activity' },
      { time: 'Soir', title: 'Découverte des néons', detail: 'Premier dîner japonais : ramen local.', kind: 'food' },
    ],
  },
  {
    id: 'oct02', dayNumber: 3, weekday: 'Vendredi', dateLabel: '2 octobre 2026', shortDate: '02 OCT', city: 'Tokyo', country: 'Japon', title: 'Tsukiji & bus panoramique',
    breakfast: 'Dégustations à Tsukiji · nourriture et boissons à payer sur place', lunch: 'Déjeuner léger avant le rendez-vous Hato Bus', dinner: 'Libre à Tokyo', transport: 'Métro + marche + bus Hato', transportDuration: 'Airbnb 07:00–09:15 · Hato Bus 14:00–18:00', airline: 'Non applicable', hotel: 'Grand Prince Hotel Takanawa', hotelDetail: 'Superior Corner King · chambre seule · deuxième nuit',
    agenda: [
      { time: '07:00–09:15', title: 'Tsukiji Food Tour With a Former Chef', detail: 'Airbnb Experience confirmée avec Ali pour 2 adultes et 1 bébé. Rendez-vous devant la statue Shinran Shonin, 3-chōme-16-13 Tsukiji. Code de confirmation : TA3TQWEF. Durée 2 h 15 : marché extérieur, commerçants, découverte du thon, histoire des aliments et dégustations libres ; fin au food court. Pas de durée individuelle fournie pour les arrêts. Nourriture et boissons à acheter selon vos envies.', kind: 'activity', paid: true, statusLabel: 'Airbnb · confirmé', bookingUrl: 'https://www.airbnb.fr/experiences/6919404' },
      { time: '09:15–13:40', title: 'Pause libre entre les visites', detail: 'Prévoir déjeuner, repos et change pour Adam, puis rejoindre le rendez-vous Hato Bus. Cette pause ne fait pas partie des excursions.', kind: 'free' },
      { time: '13:40', title: 'Rendez-vous au Hato Bus Office', detail: 'Arriver 20 min avant. 1-10-15 Marunouchi, Chiyoda-ku, à environ 2 min à gauche de la sortie Marunouchi South de Tokyo Station. Présenter le voucher sur téléphone ou imprimé.', kind: 'transport', included: true },
      { time: '14:00–18:00', title: 'Excursion panoramique de Tokyo · Hato Bus', detail: 'Quatre étapes : Imperial Palace Plaza (40 min), Asakusa et Nakamise (60 min), Kabukiza vu depuis le bus, Tokyo Tower Main Deck (40 min).', kind: 'activity', included: true, excursion: { mode: 'Bus Hato · guide anglophone', duration: '4 h · 14:00–18:00', meetingTime: '13:40', departureTime: '14:00', meetingPoint: 'Hato Bus Office / Departure Point', meetingAddress: '1-10-15 Marunouchi, Chiyoda-ku, Tokyo 100-0005', meetingDirections: 'Tokyo Station, sortie Marunouchi South : tourner immédiatement à gauche et marcher environ 2 minutes. Repérer les bus jaunes Hato.', meetingMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hato+Bus+Tokyo+Station+Marunouchi+South+Exit+1-10-15+Marunouchi+Chiyoda+Tokyo', voucherInstruction: 'Présenter le voucher sur téléphone ou imprimé.', stops: [{ name: 'Imperial Palace Plaza', duration: '40 min', detail: 'Découverte de l’esplanade extérieure et vues sur le secteur du palais impérial. Ce programme ne mentionne pas de visite de l’intérieur du palais.' }, { name: 'Asakusa Kannon & Nakamise', duration: '60 min', detail: 'Temple Sensō-ji (Asakusa Kannon) et promenade dans la rue commerçante Nakamise. Le temps indiqué couvre les deux lieux.' }, { name: 'Kabukiza', duration: 'Passage en bus', detail: 'Aperçu extérieur du théâtre de kabuki depuis le bus ; aucun arrêt ni spectacle prévu.' }, { name: 'Tokyo Tower · Main Deck', duration: '40 min', detail: 'Visite de l’observatoire Main Deck pour les vues sur Tokyo. Le programme mentionne le Main Deck, pas le Top Deck.' }], note: 'Durées annoncées : 2 h 20 au total pour les trois visites avec arrêt. Le reste des 4 h comprend les trajets et la logistique ; aucun horaire précis d’arrivée à chaque étape n’est fourni. Ordre et durées peuvent varier avec la circulation. Bus sans toilettes · repas non inclus.' } },
      { time: 'Soir', title: 'Dîner libre', detail: 'Choisir un restaurant selon le quartier de fin de visite.', kind: 'free' },
    ],
  },
  {
    id: 'oct03', dayNumber: 4, weekday: 'Samedi', dateLabel: '3 octobre 2026', shortDate: '03 OCT', city: 'Tokyo', country: 'Japon', title: 'Tokyo avec Ayano',
    breakfast: 'À l’hôtel · non inclus', lunch: 'HALAL Karemen King ou SHOUTAIAN · choix avec Ayano', dinner: 'Libre à Tokyo', transport: 'Métro + marche', transportDuration: 'Selon le rythme de la famille', airline: 'Non applicable', hotel: 'Grand Prince Hotel Takanawa', hotelDetail: 'Troisième nuit',
    agenda: [
      { time: '10:00', title: 'Retrouver Ayano dans le lobby', detail: 'Grand Prince Hotel Takanawa · visite privée réservée pour 2 adultes et Adam. Parcours proposé par Ayano, adaptable avec elle.', kind: 'activity', paid: true, bookingUrl: 'https://www.airbnb.com/l/6Zh6wlln' },
      { time: 'Après le rendez-vous', title: 'Trajet vers Akihabara', detail: 'Rejoindre Shinagawa avec Ayano puis train vers Akihabara : environ 17 min de train selon son message, hors marche depuis le lobby et attente.', kind: 'transport' },
      { time: 'Étape 1 · durée libre', title: 'Akihabara', detail: 'Électronique, anime, jeux et boutiques. Ayano adapte les arrêts à vos centres d’intérêt ; aucune durée de visite précise annoncée.', kind: 'activity' },
      { time: 'Environ 10 min à pied', title: 'Akihabara → sanctuaire de Kanda', detail: 'Temps de marche indiqué par Ayano, à adapter avec la poussette.', kind: 'transport' },
      { time: 'Étape 2 · durée libre', title: 'Kanda Shrine', detail: 'Sanctuaire historique et introduction à la culture japonaise avec Ayano. Durée sur place à convenir avec elle.', kind: 'activity' },
      { time: 'En chemin vers le déjeuner', title: 'Pont Hijiri', detail: 'Arrêt pour observer les trains sortir du tunnel en contrebas. Pause photo ; aucune durée annoncée.', kind: 'activity' },
      { time: 'Trajet indicatif', title: 'Sanctuaire → déjeuner', detail: 'Ayano annonce environ 15 min à pied ou un arrêt de train. Le trajet dépend du restaurant choisi et du passage par le pont Hijiri.', kind: 'transport' },
      { time: 'Étape 3 · durée libre', title: 'Déjeuner halal · choix avec Ayano', detail: 'Deux alternatives : HALAL Karemen King pour des ramen, ou HALAL Wagyu Yakiniku SHOUTAIAN pour du wagyu grillé. Un seul restaurant à choisir selon vos envies et les places avec Adam ; aucune réservation ni durée de repas précisée.', kind: 'food' },
      { time: 'Trajet indicatif', title: 'Déjeuner → Jimbocho', detail: 'Selon Ayano : un arrêt de train ou environ 10 min à pied. Durée à ajuster selon le restaurant retenu.', kind: 'transport' },
      { time: 'Étape 4 · durée libre', title: 'Jimbocho · ville des vieux livres', detail: 'Quartier authentique de librairies, boutiques d’art japonais et estampes sur bois. Pauses possibles en chemin selon Adam ; durée à convenir avec Ayano.', kind: 'activity' },
      { time: 'Retour flexible', title: 'Jimbocho → Shinagawa → hôtel', detail: 'Ayano annonce environ 20 min de train avec un changement, puis retour à pied à l’hôtel. Heure de fin non communiquée ; temps de marche et d’attente à ajouter.', kind: 'transport' },
    ],
  },
  {
    id: 'oct04', dayNumber: 5, weekday: 'Dimanche', dateLabel: '4 octobre 2026', shortDate: '04 OCT', city: 'Tokyo', country: 'Japon', title: 'Tokyo · journée libre',
    breakfast: 'À choisir près de l’hôtel', lunch: 'Libre à Tokyo', dinner: 'Libre près de l’hôtel', transport: 'Métro / marche selon les envies', transportDuration: 'Aucun déplacement réservé', airline: 'Non applicable', hotel: 'Grand Prince Hotel Takanawa', hotelDetail: 'Quatrième nuit',
    agenda: [
      { time: 'Journée', title: 'Temps libre à Tokyo', detail: 'Balade, shopping ou repos selon le rythme de la famille. Aucun départ en excursion prévu.', kind: 'free' },
      { time: 'Soir', title: 'Préparer le départ pour Kyoto', detail: 'Bagages et billets NOZOMI 33 pour le 5 octobre à 12:30 depuis Tokyo Station.', kind: 'free' },
    ],
  },
  {
    id: 'oct05', dayNumber: 6, weekday: 'Lundi', dateLabel: '5 octobre 2026', shortDate: '05 OCT', city: 'Kyoto', country: 'Japon', title: 'Shinkansen vers Kyoto',
    breakfast: 'À l’hôtel à Tokyo · non inclus dans le circuit', lunch: 'Bento dans le train', dinner: 'Libre à Kyoto', transport: 'Shinkansen Tokyo → Kyoto', transportDuration: '2 h 14', airline: 'Non applicable', hotel: 'Kyoto Brighton Hotel', hotelDetail: 'Kyoto · première nuit',
    agenda: [
      { time: 'Matin', title: 'Check-out à Tokyo', detail: 'Transfert vers la gare avec les bagages.', kind: 'hotel' },
      { time: '12:30–14:44', title: 'Shinkansen Tokyo → Kyoto', ticketUrl: 'https://drive.google.com/file/d/1HrZB6GsJU9OxWNpmJcnBj6_5yOO9ZnQ2/view?usp=drivesdk', detail: 'NOZOMI 33 · voiture 4 · sièges 13-A, 13-B et 13-C · 2 adultes et 1 enfant. Billets QR reçus : présenter les QR codes aux portiques signalés QR.', kind: 'transport', included: true },
      { time: 'Midi', title: 'Bento à bord', detail: 'Déjeuner prévu pendant le trajet.', kind: 'food' },
      { time: 'Après-midi', title: 'Installation à Kyoto', detail: 'Découverte tranquille des environs de l’hôtel.', kind: 'hotel' },
    ],
  },
  {
    id: 'oct06', dayNumber: 7, weekday: 'Mardi', dateLabel: '6 octobre 2026', shortDate: '06 OCT', city: 'Kyoto', country: 'Japon', title: 'Les trois temples iconiques',
    breakfast: 'À l’hôtel · non inclus dans le circuit', lunch: 'Non inclus · pause à convenir avec le guide', dinner: 'Dîner libre · kaiseki en option', transport: 'Bus d’excursion + marche', transportDuration: 'Excursion Voyage Privé · demi-journée', airline: 'Non applicable', hotel: 'Kyoto Brighton Hotel', hotelDetail: 'Kyoto · deuxième nuit',
    agenda: [
      { time: '09:40', title: 'Rendez-vous à Kyoto Station', detail: 'JR Kyoto Station, sortie Karasuma, terminal Kyoto Sightseeing « OKOSHI » Bus devant Isetan 1F. À cause des travaux, passer par Porta underground mall ; Kyoto Central Post Office sert de repère.', kind: 'transport', included: true },
      { time: '10:00–15:00', title: 'Excursion en bus · les trois temples de Kyoto', detail: 'Circuit officiel regroupé dans une seule excursion en bus.', kind: 'activity', included: true, excursion: { mode: 'Kyoto Sightseeing Bus · guide japonais + audioguide GPS en anglais', duration: '5 h · 10:00–15:00', meetingTime: '09:40', departureTime: '10:00', meetingPoint: 'Terminal Kyoto Sightseeing « OKOSHI » Bus', meetingAddress: 'JR Kyoto Station, Karasuma Exit · 600-8216 Higashishiokojicho, Shimogyo Ward, Kyoto', meetingDirections: 'Place devant l’entrée du grand magasin Isetan au 1F. Avec les travaux, passer par Porta underground mall. Le Kyoto Central Post Office, en face, sert de repère. Métro : sortie 6.', meetingMapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+Sightseeing+OKOSHI+Bus+Terminal+JR+Kyoto+Station+Karasuma+Exit', voucherInstruction: 'Arriver 20 min avant et présenter le voucher au guide. Le bus part à l’heure et n’attend pas.', stops: [{ name: 'Kinkaku-ji · Pavillon d’Or', duration: '40 min', detail: 'Découverte du pavillon doré depuis le parcours extérieur et promenade dans les jardins autour de l’étang. Temps pour admirer les vues et prendre des photos.' }, { name: 'Ginkaku-ji · Pavillon d’Argent', duration: '45 min', detail: 'Découverte du temple et de ses jardins. Promenade à adapter au rythme d’Adam ; demander au guide le parcours le plus pratique avec la poussette.' }, { name: 'Kiyomizu-dera', duration: '120 min', detail: 'Temps prévu pour le secteur du temple Kiyomizu-dera. Répartir visite, promenade et éventuelle pause repas selon les consignes du guide ; aucune répartition détaillée des deux heures n’est fournie.' }], note: 'Durées annoncées : 3 h 25 sur les sites, sur un circuit total de 5 h. Le reste correspond aux trajets et à la logistique. Horaires précis de chaque arrêt non communiqués ; suivre les rendez-vous donnés par le guide. Déjeuner non inclus : demander quand manger pendant le circuit.' } },
      { time: 'Après-midi', title: 'Temps libre à Kyoto', detail: 'Après l’excursion incluse, programme libre à adapter au rythme de la famille.', kind: 'free' },
      { time: 'Soir', title: 'Expérience kaiseki', detail: 'Dîner japonais en plusieurs services.', kind: 'food' },
    ],
  },
  {
    id: 'oct07', dayNumber: 8, weekday: 'Mercredi', dateLabel: '7 octobre 2026', shortDate: '07 OCT', city: 'Kyoto', country: 'Japon', title: 'Kyoto · Gion Food Tour',
    breakfast: 'À l’hôtel · non inclus dans le circuit', lunch: 'Yudofu (tofu bouilli)', dinner: 'Gion Food Tour · 13 dégustations dans 4 adresses', transport: 'Train local + métro + marche', transportDuration: 'Déplacements sur la journée', airline: 'Non applicable', hotel: 'Kyoto Brighton Hotel', hotelDetail: 'Kyoto · troisième nuit',
    agenda: [
      { time: 'Matin', title: 'Arashiyama', detail: 'Bambouseraie tôt le matin, pont Togetsukyo et promenade.', kind: 'activity' },
      { time: 'Midi', title: 'Déjeuner yudofu', detail: 'Tofu bouilli, spécialité adaptée à la journée temples et jardins.', kind: 'food' },
      { time: 'Après-midi', title: 'Fushimi Inari-taisha', detail: 'Montée sous les milliers de torii rouges selon le rythme de la famille.', kind: 'activity' },
      { time: '17:00–20:15', title: 'Kyoto · Gion Food Tour', detail: 'Expérience Airbnb confirmée pour 2 adultes et 1 bébé : 13 dégustations dans 4 adresses locales, entre Gion et Pontocho. Sans viande, poulet, porc ni alcool ; poisson, fruits de mer, œufs et légumes acceptés. Demande prise en compte le 10 septembre par Misato / Traveling Kyoto, qui informera les restaurants. Poussette acceptée selon les échanges ; numéros WhatsApp transmis le 12 septembre. Activité légère en anglais ou en japonais.', kind: 'food', paid: true, bookingUrl: 'https://www.airbnb.com/experiences/6643954' },
    ],
  },
  {
    id: 'oct08', dayNumber: 9, weekday: 'Jeudi', dateLabel: '8 octobre 2026', shortDate: '08 OCT', city: 'Kyoto', country: 'Japon', title: 'Excursion à Nara',
    breakfast: 'À l’hôtel · non inclus dans le circuit', lunch: 'Sushi à Nara', dinner: 'Libre à Kyoto', transport: 'Taxi + Kintetsu Limited Express', transportDuration: 'Train direct · 33 min · 10:25–10:58', airline: 'Non applicable', hotel: 'Kyoto Brighton Hotel', hotelDetail: 'Kyoto · quatrième nuit',
    agenda: [
      { time: 'Vers 09:35', title: 'Taxi vers Kintetsu Kyoto Station', detail: 'Départ conseillé du Kyoto Brighton Hotel afin d’arriver à la gare environ 25 à 30 minutes avant le train.', kind: 'transport' },
      { time: '10:25–10:58', title: 'Kintetsu Limited Express n°1007 · Kyoto → Nara', detail: 'Billet électronique confirmé. Voiture 3 · sièges 3A, 3B et 3C · quai 1 à Kyoto. Réservation A63106 · certification 54777. Le supplément Limited Express est payé ; acheter séparément les billets de base ou utiliser une carte IC.', kind: 'transport', paid: true, statusLabel: 'Payé · confirmé' },
      { time: 'Journée', title: 'Parc de Nara & daims', detail: 'Adam aura 18 mois : le garder dans la poussette ou les bras près des daims et laisser les adultes distribuer les biscuits.', kind: 'activity' },
      { time: 'Après-midi', title: 'Todai-ji et Grand Bouddha', detail: 'Visite du grand temple bouddhiste.', kind: 'activity' },
      { time: '16:30–17:00', title: 'Retour vers Kyoto', detail: 'Kintetsu-Nara → Kyoto, métro jusqu’à Karasuma-Oike, puis navette de l’hôtel.', kind: 'transport' },
    ],
    alert: 'Le e-ticket acheté couvre uniquement le supplément Limited Express. Acheter également les billets de base avant l’embarquement ou utiliser une carte IC compatible.',
  },
  {
    id: 'oct09', dayNumber: 10, weekday: 'Vendredi', dateLabel: '9 octobre 2026', shortDate: '09 OCT', city: 'Osaka', country: 'Japon', title: 'Shinkansen vers Osaka',
    breakfast: 'À l’hôtel à Kyoto · non inclus', lunch: 'Libre avant ou après le train', dinner: 'Libre à Osaka', transport: 'Shinkansen Kyoto → Shin-Osaka', transportDuration: '14 min · 12:46–13:00', airline: 'Non applicable', hotel: 'Hotel New Otani Osaka', hotelDetail: 'Superior Double · 30 m² · chambre seule · non-fumeur · première nuit',
    agenda: [
      { time: 'Matin', title: 'Check-out à Kyoto', detail: 'Le transfert hôtel–gare n’est pas inclus. Prévoir une marge pour les bagages.', kind: 'hotel' },
      { time: '12:46–13:00', title: 'Shinkansen Kyoto → Shin-Osaka', ticketUrl: 'https://drive.google.com/file/d/1TUesoxIwDx8VQ2Ay9EVP9HV-fL-ReMGy/view?usp=drivesdk', detail: 'NOZOMI 25 · voiture 4 · sièges 11-A, 11-B et 11-C · 2 adultes et 1 enfant. Billets QR reçus : présenter les QR codes aux portiques signalés QR.', kind: 'transport', included: true },
      { time: 'Après-midi', title: 'Installation à Osaka', detail: 'Rejoindre le Hotel New Otani Osaka. Transfert non inclus ; check-in généralement à partir de 15:00.', kind: 'hotel' },
      { time: 'Fin de journée', title: 'Château d’Osaka ou Dotonbori', detail: 'Programme libre selon l’heure d’installation et le rythme d’Adam.', kind: 'free' },
    ],
  },
  {
    id: 'oct10', dayNumber: 11, weekday: 'Samedi', dateLabel: '10 octobre 2026', shortDate: '10 OCT', city: 'Osaka', country: 'Japon', title: 'Osaka · lieux branchés et trésors cachés',
    breakfast: 'À Osaka · non inclus', lunch: 'Libre', dinner: 'Okonomiyaki ou Dotonbori', transport: 'Métro / JR + marche', transportDuration: 'Déplacements libres sur la journée', airline: 'Non applicable', hotel: 'Hotel New Otani Osaka', hotelDetail: 'Superior Double · chambre seule · deuxième nuit · Voyage Privé',
    agenda: [
      { time: '09:50', title: 'Rendez-vous avec Barun et Andy-Kenji', detail: 'Namba, sortie 24, en haut des escaliers. Départ strictement à 10:00. En cas de difficulté : +81 80-7012-2238. Prévoir un accès adapté à la poussette.', kind: 'transport', bookingUrl: 'https://maps.app.goo.gl/XePs7WsXwcHZfDzx7' },
      { time: '10:00–13:00', title: 'Lieux branchés et trésors cachés d’Osaka avec snack local', detail: 'Airbnb Experience confirmée pour 2 voyageurs ; présence d’Adam et snack sans porc ni alcool à confirmer avec le guide. Rendez-vous à 09:50 à Namba, sortie 24, en haut des escaliers ; départ à 10:00. Contact : +81 80-7012-2238.', kind: 'activity', paid: true, statusLabel: 'Airbnb · confirmé', bookingUrl: 'https://www.airbnb.fr/experiences/110508?checkin=2026-10-10&location=Osaka%2C+Japon&currentTab=experience_tab&adults=2&children=0&infants=0' },
      { time: 'Après-midi', title: 'Château d’Osaka et parc', detail: 'Visite libre après l’expérience, selon le rythme d’Adam. Le parc se trouve juste à côté du Hotel New Otani Osaka.', kind: 'activity' },
      { time: 'Soir', title: 'Dotonbori', detail: 'Promenade, enseignes lumineuses et dîner libre. Préparer le sac pour Universal Studios le lendemain.', kind: 'activity' },
    ],
  },
  {
    id: 'oct11', dayNumber: 12, weekday: 'Dimanche', dateLabel: '11 octobre 2026', shortDate: '11 OCT', city: 'Osaka', country: 'Japon', title: 'Universal Studios Japan · confirmé',
    breakfast: 'Petit-déjeuner tôt à Osaka · non inclus', lunch: 'Repas libre au parc', dinner: 'CityWalk ou près de l’hôtel', transport: 'JR vers Universal City', transportDuration: 'Journée complète', airline: 'Non applicable', hotel: 'Hotel New Otani Osaka', hotelDetail: 'Nuit supplémentaire du 11 au 12 · même chambre confirmée · 51 146 JPY à régler à l’hôtel sauf paiement déjà effectué',
    agenda: [
      { time: '08:00 · ouverture prévue', title: 'Entrée à Universal Studios Japan', detail: 'Trois réservations Klook confirmées pour le 11 octobre : QHV914134, ZUN226017 et GZN545241. Arrivée visée à 07:40, vingt minutes avant l’ouverture prévue à 08:00. Départ conseillé de l’hôtel à 06:40. Horaire du 11 octobre relevé sur Queue Times ; à revérifier sur le calendrier officiel USJ la veille.', kind: 'activity', paid: true, statusLabel: 'Payé · confirmé' },
      { time: '11:00–11:30', title: 'Illumination’s Villain-Con Minion Blast', detail: 'Créneau réservé pour Zakaria avec son Express Pass 5 individuel. Child Switch avec Adam à clarifier auprès du personnel.', kind: 'activity', paid: true, statusLabel: 'Payé · créneau réservé' },
      { time: '12:00', title: 'Nintendo · Soukayna', detail: 'Billet de zone à 12:00, sans Express Pass. Horaire différent de Zakaria : entrée ensemble à clarifier avec Klook.', kind: 'activity', paid: true, warning: true },
      { time: '12:20–13:20', title: 'SUPER NINTENDO WORLD · Zakaria', detail: 'Entrée à la zone 12:20–13:20 · Mario Kart 12:20–12:50 · Mine Cart Madness 12:50–13:20.', kind: 'activity', paid: true, statusLabel: 'Payé · créneaux réservés' },
      { time: 'Horaire libre', title: 'Harry Potter & The Flying Dinosaur', detail: 'Attractions incluses pour Zakaria dans son Express Pass, sans horaire imprimé. Imprimer les deux Studio Pass et garder les QR des autres billets hors ligne ; sortie du parc sans réentrée.', kind: 'activity', paid: true, statusLabel: 'Payé' },
      { time: 'Nuit', title: 'Même chambre au Hotel New Otani Osaka', detail: 'Nuit supplémentaire réservée du 11 au 12 octobre : 51 146 JPY à régler sur place sauf paiement déjà effectué. L’hôtel a confirmé que vous resterez dans la même chambre.', kind: 'hotel', statusLabel: 'Réservé · règlement à vérifier' },
    ],
  },
  {
    id: 'oct12', dayNumber: 13, weekday: 'Lundi', dateLabel: '12 octobre 2026', shortDate: '12 OCT', city: 'Seoul', country: 'Japon → Corée du Sud', title: 'Vol Osaka → Séoul',
    breakfast: 'Très tôt à Osaka · non inclus', lunch: 'À l’aéroport ou après l’arrivée', dinner: 'Libre près de l’hôtel à Séoul', transport: 'Vol Peach MM737 · KIX T2 → Seoul-Gimpo', transportDuration: '1 h 55 · 10:25–12:20', airline: 'Peach Aviation', hotel: 'The Ambassador Seoul - A Pullman Hotel', hotelDetail: 'Réservation Voyage Privé commencée le 11 · arrivée différée au 12 confirmée auprès de VIO Travel et de l’hôtel',
    agenda: [
      { time: '05:30 · conseillé', title: 'Départ du New Otani vers KIX Terminal 2', detail: 'Prévoir le check-out et les bagages avant 05:30. En taxi ou transfert privé direct vers le terminal 2 : environ 60 min selon le site du New Otani, avec 30 min de marge supplémentaires. Arrivée visée 06:30–07:00, soit 3 h 25 à 3 h 55 avant le vol de 10:25. Horaire conseillé, transfert à réserver ; estimation à confirmer avec le chauffeur.', kind: 'transport', warning: true },
      { time: 'À l’aéroport · avant 09:35', title: 'Enregistrement Peach et dépôt des bagages', detail: 'Au terminal 2 international de KIX. Présenter les passeports des trois voyageurs et la référence V62YB8. Vérifier la prise en charge de la poussette, puis passer sécurité et contrôle des passeports. 09:35 est la fermeture, pas l’heure conseillée d’arrivée.', kind: 'transport' },
      { time: 'Selon la carte', title: 'Embarquement', detail: 'Vérifier la porte et l’heure sur les cartes d’embarquement et les écrans. Aucun horaire de porte confirmé dans les documents.', kind: 'flight' },
      { time: '10:25–12:20', title: 'Vol Peach MM737 · Osaka → Séoul', detail: 'Kansai Terminal 2 → Gimpo terminal international. Référence V62YB8. Sièges : Zakaria 4B, Soukayna 4A, Adam bébé sur le siège 4A. Bagages enregistrés : 2 pour Zakaria, 1 pour Soukayna, aucun pour Adam.', kind: 'flight', included: true },
      { time: 'À partir de 12:20', title: 'Arrivée à Gimpo · formalités', detail: 'Débarquement, immigration, récupération des bagages et douane au terminal international. Durée variable ; ne pas considérer le pickup réservé à 12:30 comme une sortie garantie en dix minutes.', kind: 'transport' },
      { time: 'Après les formalités', title: 'Transfert Gimpo → The Ambassador Seoul', detail: 'Transfert Welcome Pickups réservé ; attente après immigration et contact à confirmer. La réservation hôtel commence le 11 octobre et l’arrivée effective le 12. VIO Travel et l’hôtel ont été prévenus ; la conservation de la chambre est confirmée.', kind: 'transport', statusLabel: 'Transfert réservé' },
      { time: 'Après le transfert', title: 'Installation à The Ambassador Seoul', detail: '287 Dongho-ro, Jung-gu. Chambre conservée pour votre arrivée le 12 malgré une réservation débutant le 11 ; confirmation de VIO Travel et de l’hôtel. Présenter passeports et confirmation. Heure effective d’accès à voir avec la réception.', kind: 'hotel', included: true },
      { time: 'Après-midi et soirée libres', title: 'Repos et découverte légère', detail: 'Déjeuner, sieste et balade selon l’énergie. Aucune excursion réservée ce jour-là. La visite des palais et de Gwangjang est prévue le 13 octobre : rendez-vous 08:40 devant The Plaza, City Hall sortie 6.', kind: 'free' },
    ],
  },
  {
    id: 'oct13', dayNumber: 14, weekday: 'Mardi', dateLabel: '13 octobre 2026', shortDate: '13 OCT', city: 'Seoul', country: 'Corée du Sud', title: 'Palais de Séoul & marché Gwangjang',
    breakfast: 'Tôt à l’hôtel · non inclus dans le circuit', lunch: 'Dégustations libres au marché Gwangjang', dinner: 'Bibimbap ou Korean BBQ', transport: 'Métro + excursion guidée + marche', transportDuration: 'Excursion Voyage Privé · 09:00–12:30', airline: 'Non applicable', hotel: 'The Ambassador Seoul - A Pullman Hotel', hotelDetail: 'Superior Double · chambre seule · troisième nuit',
    agenda: [
      { time: '08:40', title: 'Rendez-vous · City Hall Station, sortie 6', detail: 'Devant The Plaza Seoul. Le guide attend avec une pancarte VIP Travel. Arriver 20 minutes avant le départ.', kind: 'transport', included: true },
      { time: '09:00–12:30', title: 'Seoul Royal Palace, Bukchon Hanok Village & Gwangjang Market Feast', detail: 'Report au 13 octobre confirmé par Lens : lieu de rendez-vous et consignes du Final Voucher inchangés. Le mardi, Changdeokgung Palace et Insadong remplacent Gyeongbokgung et la relève de la garde.', kind: 'activity', included: true, statusLabel: 'Voyage Privé · confirmé', excursion: { mode: 'Visite guidée · Voyage Privé', duration: '3 h 30 · 09:00–12:30', meetingTime: '08:40', departureTime: '09:00', meetingPoint: 'City Hall Subway Station · sortie 6', meetingAddress: 'Devant The Plaza Seoul · 119 Sogong-ro, Jung-gu, Seoul', meetingDirections: 'Sortir par la sortie 6 de City Hall Station et attendre devant The Plaza Seoul. Le guide tient une pancarte VIP Travel.', meetingMapUrl: 'https://www.google.com/maps/search/?api=1&query=City+Hall+Subway+Station+Exit+6+The+Plaza+Seoul', meetingContact: '+82 10-9809-3501 · WhatsApp', voucherInstruction: 'Aucun voucher séparé requis. Arriver 15 à 20 minutes avant ; le groupe n’attend pas les retardataires.', stops: [{ name: 'Bukchon Hanok Village', duration: 'Durée non précisée', detail: 'Découverte du quartier de maisons traditionnelles coréennes avec le guide.' }, { name: 'Changdeokgung Palace · programme du mardi', duration: 'Durée non précisée', detail: 'Visite du palais prévu en remplacement de Gyeongbokgung le mardi. Le programme ne précise pas une entrée au Jardin Secret.' }, { name: 'Insadong · programme du mardi', duration: 'Durée non précisée', detail: 'Découverte du quartier culturel et de ses boutiques, au programme du mardi à la place de la relève de la garde.' }, { name: 'Korean Ginseng Center', duration: 'Durée non précisée', detail: 'Étape consacrée au ginseng coréen.' }, { name: 'Gwangjang Market · temps libre pour goûter la street food', duration: 'Durée non précisée', detail: 'Temps libre au marché. Repas non inclus ; choisir poisson, fruits de mer, œufs ou légumes avec préparations sans viande ni alcool.' }], note: 'Repas non inclus. Fin prévue vers 12:30 ; après-midi libre.' } },
      { time: 'Après-midi', title: 'Temps libre à Séoul', detail: 'Retour à l’hôtel, promenade légère ou repos avec Adam après l’excursion.', kind: 'free' },
      { time: 'Soir', title: 'Dîner libre', detail: 'Bibimbap, Korean BBQ ou repas simple près de l’hôtel.', kind: 'food' },
    ],
  },
  {
    id: 'oct14', dayNumber: 15, weekday: 'Mercredi', dateLabel: '14 octobre 2026', shortDate: '14 OCT', city: 'Seoul', country: 'Corée du Sud', title: 'Street food & quartiers historiques',
    breakfast: 'Libre près de l’hôtel · non inclus', lunch: 'Plus de 8 spécialités coréennes incluses dans l’Airbnb Experience', dinner: 'Léger ou libre après la visite', transport: 'Métro + marche', transportDuration: 'Airbnb Experience · 14:00–18:00', airline: 'Non applicable', hotel: 'The Ambassador Seoul - A Pullman Hotel', hotelDetail: 'Superior Double · chambre seule · quatrième et dernière nuit',
    agenda: [
      { time: 'Matin', title: 'Matinée libre et repos', detail: 'Garder un rythme tranquille avant les quatre heures de visite à pied.', kind: 'free' },
      { time: '14:00–18:00', title: 'Street food tour in Jongno, Heart of Seoul', detail: 'Airbnb Experience confirmée · guide Sangwoo ou Hazel pour 2 adultes et 1 bébé. Rendez-vous à la sortie 4 de Jongno 3-ga. Code : TANSFHNQ. Plus de 8 spécialités coréennes, snacks et une boisson sont inclus. Restrictions envoyées par Soukaina le 21 septembre : aucune viande, poulet, porc ni alcool ; poisson, fruits de mer, œufs et légumes acceptés. Réponse confirmant les adaptations non fournie.', kind: 'activity', paid: true, statusLabel: 'Airbnb · confirmé', bookingUrl: 'https://www.airbnb.fr/experiences/5769436?checkin=2026-10-14&checkout=2026-10-14&adults=2&infants=1' },
      { time: 'Après 18:00', title: 'Fin à Bukchon Hanok Village', detail: 'Retour libre vers l’hôtel après la visite et récupération du souvenir inclus.', kind: 'transport' },
      { time: 'Soir', title: 'Dernière soirée à Séoul', detail: 'Repas léger selon l’appétit après les dégustations.', kind: 'free' },
    ],
  },
  {
    id: 'oct15', dayNumber: 16, weekday: 'Jeudi', dateLabel: '15 octobre 2026', shortDate: '15 OCT', city: 'Seoul', country: 'Corée du Sud → France', title: 'Retour à Paris',
    breakfast: 'Très tôt à l’hôtel ou à emporter', lunch: 'Repas à bord Air France', dinner: 'Repas à bord / arrivée à Paris', transport: 'Vol direct AF267 · Séoul-Incheon → Paris-CDG', transportDuration: 'Environ 14 h 10', airline: 'Air France', hotel: 'Pas de nuit d’hôtel', hotelDetail: 'Arrivée à Paris-CDG à 18:55',
    agenda: [
      { time: '06:15', title: 'Check-out et transfert à Incheon', detail: 'Départ conseillé à 06:15 en taxi à réserver. Prévoir 1 h 30 de trajet et 30 min de marge ; arrivée visée entre 07:45 et 08:15, soit 3 h 30 à 4 h avant le vol. Transfert non inclus ; terminal à vérifier sur la carte d’embarquement.', kind: 'transport', warning: true },
      { time: 'Selon la carte', title: 'Embarquement à Séoul-Incheon', detail: 'Effectuer l’enregistrement et vérifier le terminal et l’heure sur la carte. Dossier ZV8V7L.', kind: 'flight' },
      { time: '11:45', title: 'Décollage du vol AF267', detail: 'Vol direct vers Paris-CDG.', kind: 'flight', included: true },
      { time: '18:55', title: 'Arrivée à Paris', detail: 'Fin du voyage.', kind: 'flight' },
    ],
  },
];

export const eventsOfDay: Partial<Record<DailyPlan['id'], EventOfDay | EventOfDay[]>> = {
  sep30: {
    kind: 'flight',
    title: 'Vol Air France AF186 vers Tokyo',
    schedule: 'Rendez-vous 07:00 - Début 10:10 - Fin 06:25 (+1 jour)',
    location: 'Aéroport Paris–Charles-de-Gaulle · Terminal 2E',
    detail: 'Départ conseillé de la maison à 05:45, en supposant un trajet en taxi ou voiture depuis Courbevoie. Prévoir une enveloppe de 1 h 15, trajet et marge compris, pour viser CDG terminal 2E à 07:00. Estimation sans trafic en temps réel ; vérifier le trajet avant de partir. Vol à 10:10. Prévoir l’enregistrement en ligne et garder les documents accessibles hors ligne.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Paris+Charles+de+Gaulle+Airport+Terminal+2',
    included: true,
  },
  oct01: [
    {
      kind: 'flight',
      title: 'Arrivée à Tokyo',
      schedule: 'Rendez-vous à confirmer - Début 06:25 - Fin à confirmer',
      location: 'Aéroport international de Tokyo-Haneda',
      detail: 'Immigration et récupération des bagages, puis transfert vers l’hôtel.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tokyo+Haneda+International+Airport',
      included: true,
    },
    {
      kind: 'transfer', title: 'Transfert aéroport → hôtel',
      schedule: 'Rendez-vous 06:30 - Début après les formalités - Fin à confirmer',
      location: 'Point de rendez-vous aux arrivées', mapUrl: '', confirmed: true,
    },
    {
      kind: 'hotel',
      title: 'Check-in · Grand Prince Hotel Takanawa',
      schedule: 'Rendez-vous à confirmer - Début 15:00 - Fin non applicable',
      location: 'Grand Prince Hotel Takanawa · Tokyo',
      detail: 'Première nuit confirmée dans une Superior Corner King, chambre seule et non-fumeur. Arrivée matinale : demander un early check-in, sous réserve de disponibilité et de frais éventuels selon le voucher VIO Travel.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Prince+Hotel+Takanawa',
      included: true,
    },
  ],
  oct02: [
    {
      steps: [{"name": "Rencontre avec Ali · 07:00", "detail": "Statue Shinran Shonin, 3-chōme-16-13 Tsukiji. Visite du 2 octobre pour 2 adultes et Adam, jusqu’à 09:15."}, {"name": "Découverte du thon", "detail": "Comprendre les morceaux, de l’akami maigre au toro gras, leur qualité et leurs particularités."}, {"name": "Uni · l’oursin", "detail": "Goûter l’oursin et découvrir comment saison, provenance, espèce, texture et saveur influencent la dégustation."}, {"name": "Le katsuobushi", "detail": "Découvrir la bonite fumée, fermentée et séchée, une base umami de la cuisine japonaise."}, {"name": "Rencontre avec les commerçants", "detail": "Échanger avec les propriétaires des boutiques de Tsukiji et découvrir comment leur emplacement et la fréquentation contribuent à leur succès."}, {"name": "La vraie cuisine ninja", "detail": "Découvrir les aliments historiques liés aux ninjas et distinguer les mythes de ce qui était réellement consommé."}, {"name": "Dégustation des produits du marché", "detail": "Parcourir le marché et choisir parmi des produits populaires, traditionnels et modernes, selon vos restrictions alimentaires."}, {"name": "Repas final de fruits de mer", "detail": "Terminer la visite autour de fruits de mer frais et échanger sur le voyage et les autres découvertes au Japon. Fin prévue à 09:15."}, {"name": "À prévoir · espèces", "detail": "Apporter de l’argent liquide pour acheter la nourriture au marché : les achats sont à votre charge. Durée totale 2 h 15 ; durées individuelles des étapes non précisées."}],
    kind: 'activity',
      title: 'Tsukiji Food Tour With a Former Chef',
      schedule: 'Rendez-vous 06:40 - Début 07:00 - Fin 09:15',
      location: 'Statue Shinran Shonin · 3-chōme-16-13 Tsukiji, Chuo City, Tokyo 104-0045',
      detail: 'Confirmé pour 2 adultes et 1 bébé · hôte : Ali · code TA3TQWEF. Au programme : marché extérieur, rencontre avec les commerçants, découverte du thon, aliments historiques liés aux ninjas, dégustations libres et fin au food court. Nourriture et boissons à payer sur place.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Shinran+Shonin+Statue+3-chome-16-13+Tsukiji+Chuo+City+Tokyo',
      bookingUrl: 'https://www.airbnb.fr/experiences/6919404',
      paid: true,
    },
    {
      kind: 'excursion',
      title: 'Excursion panoramique de Tokyo · Hato Bus',
      schedule: 'Rendez-vous 13:40 - Début 14:00 - Fin 18:00',
      location: 'Hato Bus Office · 1-10-15 Marunouchi, Chiyoda-ku, Tokyo',
      detail: 'Arriver 20 minutes avant. Tokyo Station, sortie Marunouchi South : tourner à gauche et marcher environ 2 minutes jusqu’aux bus jaunes Hato.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hato+Bus+Tokyo+Station+Marunouchi+South+Exit+1-10-15+Marunouchi+Chiyoda+Tokyo',
      included: true,
    },
  ],
  oct03: {
    kind: 'activity',
    title: 'Tokyo avec Ayano · culture et quartiers locaux',
    detail: 'Akihabara → Kanda Shrine → pont Hijiri → déjeuner halal (Karemen King ou SHOUTAIAN) → Jimbocho. Temps de visite flexibles, aucun horaire de fin confirmé. Voir le planning pour les étapes et trajets annoncés par Ayano.',
    schedule: 'Rendez-vous 09:40 - Début 10:00 - Fin à confirmer',
    location: 'Prise en charge au Grand Prince Hotel Takanawa',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Prince+Hotel+Takanawa+Tokyo',
    bookingUrl: 'https://www.airbnb.com/l/6Zh6wlln',
    paid: true,
  },
  oct05: [
    {
      kind: 'train',
      title: 'Shinkansen Tokyo → Kyoto', ticketUrl: 'https://drive.google.com/file/d/1HrZB6GsJU9OxWNpmJcnBj6_5yOO9ZnQ2/view?usp=drivesdk',
      schedule: 'Rendez-vous 12:10 - Début 12:30 - Fin 14:44',
      location: 'Tokyo Station · voie à consulter en gare',
      detail: 'NOZOMI 33 · voiture 4 · sièges 13-A, 13-B et 13-C · 2 adultes et 1 enfant. Billets QR reçus : présenter les QR codes aux portiques signalés QR.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tokyo+Station',
      included: true,
    },
    {
      kind: 'hotel',
      title: 'Check-in · Kyoto Brighton Hotel',
      schedule: 'Rendez-vous à confirmer - Début à partir de 15:00 - Fin non applicable',
      location: 'Kyoto Brighton Hotel',
      detail: 'Installation pour la première des quatre nuits confirmées à Kyoto.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+Brighton+Hotel',
      included: true,
    },
  ],
  oct06: {
    kind: 'excursion',
    title: 'Excursion en bus · les trois temples de Kyoto',
    schedule: 'Rendez-vous 09:40 - Début 10:00 - Fin 15:00',
    location: 'Terminal Kyoto Sightseeing « OKOSHI » Bus · JR Kyoto Station, Karasuma Exit',
    detail: 'Devant Isetan au 1F. Avec les travaux, passer par Porta underground mall. Le bus part à l’heure.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+Sightseeing+OKOSHI+Bus+Terminal+JR+Kyoto+Station+Karasuma+Exit',
    included: true,
  },
  oct07: {
    steps: [{"name": "Rendez-vous · 17:00", "detail": "Devant Starbucks Coffee Kyoto Sanjo-ohashi Bridge, 113 Nakajimachō. Visite du mercredi 7 octobre pour 2 adultes et Adam, jusqu’à 20:15."}, {"name": "La magie de Kyoto · Pontocho", "detail": "Promenade dans Pontocho Alley, quartier emblématique de Kyoto associé à la culture des geishas."}, {"name": "Découverte de l’obanzai", "detail": "Dégustation de plats de saison et de spécialités régionales de Kyoto."}, {"name": "Cuisine de rue de Kyoto", "detail": "Découverte des spécialités de rue du Kansai et de leurs particularités régionales."}, {"name": "Les délices modernes de Kyoto", "detail": "Découverte de spécialités modernes appréciées des habitants, à l’écart des parcours touristiques habituels."}, {"name": "Le côté sucré de Kyoto · taiyaki", "detail": "Dernière étape sucrée autour d’un taiyaki chaud et croustillant."}, {"name": "Organisation et adaptations", "detail": "13 plats dans 4 restaurants locaux, sur 3 h 15. Noms des restaurants et durées par étape non communiqués. Poussette acceptée selon vos échanges. Demande sans viande, poulet, porc ni alcool prise en compte par Misato le 10 septembre ; l’équipe a indiqué qu’elle informerait les restaurants. Poisson, fruits de mer, œufs et légumes acceptés."}],
    kind: 'activity',
    title: 'Kyoto · Gion Food Tour · 13 dishes & 4 Local Eateries',
    schedule: 'Rendez-vous 16:40 - Début 17:00 - Fin 20:15',
    location: 'Devant Starbucks Coffee · Kyoto Sanjo-ohashi Bridge · 113 Nakajimachō',
    detail: 'Airbnb Experience confirmée pour 2 adultes et 1 bébé. Parcours culinaire léger entre Gion et Pontocho : plats saisonniers de Kyoto, spécialités régionales, street food et taiyaki. Sans viande, poulet, porc ni alcool ; poisson, fruits de mer, œufs et légumes acceptés. Demande prise en compte le 10 septembre par Misato / Traveling Kyoto, qui informera les restaurants. Poussette acceptée selon les échanges ; numéros WhatsApp transmis le 12 septembre. Visite proposée en anglais ou en japonais.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Starbucks+Coffee+Kyoto+Sanjo-ohashi+Bridge+113+Nakajimacho+Kyoto',
    bookingUrl: 'https://www.airbnb.com/experiences/6643954',
    paid: true,
  },
  oct08: [
    {
      kind: 'train',
      title: 'Taxi · Kyoto Brighton Hotel → Kintetsu Kyoto Station',
      schedule: 'Rendez-vous 09:35 (conseillé) - Début 09:35 (estimé) - Fin 09:55 (estimée)',
      location: 'Entrée du Kyoto Brighton Hotel',
      detail: 'Option la plus simple avec Adam et la poussette. Demander au chauffeur Kintetsu Kyoto Station et viser une arrivée avant 10:00.',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kyoto+Brighton+Hotel&destination=Kintetsu+Kyoto+Station&travelmode=driving',
      planned: true,
    },
    {
      kind: 'train',
      title: 'Kintetsu Limited Express n°1007 · Kyoto → Kintetsu-Nara',
      schedule: 'Rendez-vous 10:00 (conseillé) - Début 10:25 - Fin 10:58',
      location: 'Kintetsu Kyoto Station · quai 1 · voiture 3',
      detail: 'Réservation A63106 · certification 54777 · sièges 3A, 3B et 3C. Billet pour 2 adultes et 1 enfant. Supplément Limited Express de 1 300 ¥ payé ; billets de base à acheter séparément ou à régler avec une carte IC. Afficher le e-ticket original sur le téléphone en cas de contrôle.',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kintetsu+Kyoto+Station&destination=Kintetsu-Nara+Station&travelmode=transit',
      paid: true,
    },
    {
      kind: 'activity',
      title: 'Nara Park, daims et Todai-ji',
      schedule: 'Rendez-vous libre - Début 11:10 (estimé) - Fin libre',
      location: 'Nara Park · à environ 8 min à pied de Kintetsu-Nara',
      detail: 'Le parc est gratuit et ouvert toute l’année. Les daims sont sauvages : garder Adam dans la poussette ou dans les bras à proximité et laisser les adultes donner les biscuits.',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kintetsu-Nara+Station&destination=Nara+Park&travelmode=walking',
      planned: true,
    },
    {
      kind: 'train',
      title: 'Retour Nara → Kyoto Brighton Hotel',
      schedule: 'Rendez-vous à confirmer - Début 16:30–17:00 (conseillé) - Fin à confirmer',
      location: 'Kintetsu-Nara Station → Karasuma-Oike → hôtel',
      detail: 'Reprendre Kintetsu jusqu’à Kyoto, puis le métro Karasuma jusqu’à Karasuma-Oike. La navette retour vers l’hôtel passe à :00, :20 et :40 jusqu’à 21:40.',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kintetsu-Nara+Station&destination=Kyoto+Brighton+Hotel&travelmode=transit',
      planned: true,
    },
  ],
  oct09: [
    {
      kind: 'train',
      title: 'Shinkansen Kyoto → Shin-Osaka', ticketUrl: 'https://drive.google.com/file/d/1TUesoxIwDx8VQ2Ay9EVP9HV-fL-ReMGy/view?usp=drivesdk',
      schedule: 'Rendez-vous 12:26 - Début 12:46 - Fin 13:00',
      location: 'Kyoto Station · voie à consulter en gare',
      detail: 'NOZOMI 25 · voiture 4 · sièges 11-A, 11-B et 11-C · 2 adultes et 1 enfant. Billets QR reçus : présenter les QR codes aux portiques signalés QR.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+Station+Central+Gate',
      included: true,
    },
    {
      kind: 'hotel',
      title: 'Check-in · Hotel New Otani Osaka',
      schedule: 'Rendez-vous à confirmer - Début 15:00 - Fin non applicable',
      location: 'Hotel New Otani Osaka',
      detail: 'Première nuit confirmée à Osaka. Arrivée estimée avant 15:00 après le train arrivant à 13:00 : demander un early check-in, sous réserve de disponibilité et de frais éventuels selon le voucher VIO Travel. Le transfert depuis la gare n’est pas inclus.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+New+Otani+Osaka',
      included: true,
    },
  ],
  oct10: {
    steps: [
      { name: 'Rencontre et accueil', detail: 'Présentations à l’extérieur de la sortie 24 de Namba, en haut des escaliers. Rendez-vous à 09:50 pour le départ à 10:00.' },
      { name: 'Vie locale', detail: 'Découvrir la culture locale d’Osaka et ce qui fait sa singularité avec le guide.' },
      { name: 'Visite d’un marché', detail: 'Découvrir où les chefs achètent leurs ingrédients. Le nom du marché n’est pas précisé dans le programme.' },
      { name: 'Dégustation d’un en-cas local', detail: 'Goûter une spécialité emblématique d’Osaka. Le plat n’est pas précisé : demander une option sans viande ni alcool avant la visite.' },
      { name: 'Incontournables d’Osaka', detail: 'Écouter les histoires du guide et prendre des photos des attractions présentées. Les sites exacts ne sont pas nommés.' },
      { name: 'Ruelles et lieux cachés', detail: 'Explorer les petites rues et découvrir des lieux moins connus avec le guide.' },
      { name: 'Conseils du guide', detail: 'Recevoir des conseils sur la gastronomie, les visites et la suite du séjour à Osaka. Fin prévue à 13:00 ; durées par étape non communiquées.' },
    ],
    kind: 'activity',
    title: 'Lieux branchés et trésors cachés d’Osaka avec snack local',
    schedule: 'Rendez-vous 09:40 - Début 10:00 - Fin 13:00',
    location: 'Namba Station · sortie 24 · en haut des escaliers',
    detail: 'Barun et Andy-Kenji · +81 80-7012-2238 en cas de difficulté. Le groupe part à l’heure. Accuser réception du message ; présence d’Adam, accès poussette et adaptation du snack restent à confirmer.',
    mapUrl: 'https://maps.app.goo.gl/XePs7WsXwcHZfDzx7',
    bookingUrl: 'https://www.airbnb.fr/experiences/110508?checkin=2026-10-10&location=Osaka%2C+Japon&currentTab=experience_tab&adults=2&children=0&infants=0',
    paid: true,
  },
  oct11: {
    kind: 'activity',
    title: 'Universal Studios Japan',
    schedule: 'Rendez-vous 07:40 - Début 08:00 (prévu) - Fin 22:00 (prévue)',
    location: 'Universal Studios Japan · entrée principale',
    detail: 'Ouverture du 11 octobre annoncée à 08:00 sur Queue Times (https://queue-times.com/en-US/parks/284/calendar/2026/10/11), à revérifier sur le calendrier officiel USJ la veille. Départ hôtel 06:40 : 35 min de taxi estimées et 25 min de marge pour rejoindre l’entrée à 07:40. Trois réservations Klook confirmées. Villain-Con à 11:00, puis SUPER NINTENDO WORLD et attractions réservées à partir de 12:20.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Universal+Studios+Japan+Main+Entrance',
    paid: true,
  },
  oct12: [
    {
      kind: 'flight',
      title: 'Arrivée à Séoul · vol Peach MM737',
      schedule: 'Rendez-vous 06:30–07:00 (conseillé) - Début 10:25 - Fin 12:20',
      location: 'Aéroport international de Gimpo (GMP)',
      detail: 'Référence V62YB8. Départ conseillé du New Otani à 05:30 en taxi ou transfert privé à réserver. Arrivée visée au terminal 2 entre 06:30 et 07:00, soit environ 3 h 30 à 4 h avant le départ. Estimation : 60 min de route selon le New Otani et 30 min de marge. Les comptoirs peuvent ouvrir plus tard ; fermeture de l’enregistrement à 09:35. Tous les horaires sont locaux.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gimpo+International+Airport',
      included: true,
    },
    {
      kind: 'transfer', title: 'Transfert aéroport → hôtel',
      schedule: 'Rendez-vous 12:30 - Début après les formalités - Fin à confirmer',
      location: 'Point de rendez-vous aux arrivées', mapUrl: '', confirmed: true,
    },
    {
      kind: 'hotel',
      title: 'Check-in · The Ambassador Seoul',
      schedule: 'Rendez-vous à confirmer - Début après le transfert - Fin non applicable',
      location: 'The Ambassador Seoul – A Pullman Hotel',
      detail: 'Hôtel inclus dans Voyage Privé. La réservation commence le 11 octobre et l’arrivée effective est prévue le 12. VIO Travel et l’hôtel ont été prévenus ; la conservation de la chambre est confirmée.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Ambassador+Seoul+A+Pullman+Hotel',
      included: true,
    },
  ],
  oct13: [
    {
      kind: 'excursion',
      title: 'Palais royal, Bukchon & marché Gwangjang',
      schedule: 'Rendez-vous 08:40 - Début 09:00 - Fin 12:30',
      location: 'City Hall Station · sortie 6 · devant The Plaza Seoul',
      detail: 'Report au 13 octobre confirmé par Lens : lieu de rendez-vous et consignes du Final Voucher inchangés. Le guide tient une pancarte VIP Travel. Le mardi : Changdeokgung et Insadong remplacent Gyeongbokgung et la relève de la garde. Contact : +82 10-9809-3501 (WhatsApp).',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=City+Hall+Subway+Station+Exit+6+The+Plaza+Seoul',
      included: true,
    },
  ],
  oct14: {
    steps: [{"name": "L’énergie de Jongno · rendez-vous à 14:00", "detail": "Rencontre à Jongno 3-ga, sortie 4 (종로3가역 4번 출구), avec Sangwoo ou Hazel. Début de la promenade dans ce quartier animé de Séoul."}, {"name": "Les trésors d’Ikseon-dong", "detail": "Petites boutiques appréciées des habitants pour découvrir des en-cas et douceurs traditionnelles."}, {"name": "La boisson préférée du dernier roi de Joseon", "detail": "Étape boisson annoncée par le guide. Demander une version sans alcool conformément à vos restrictions ; la nature de la boisson et son adaptation ne sont pas confirmées."}, {"name": "Palais de Changdeokgung", "detail": "Découvrir l’histoire de la dynastie Joseon autour du palais. La capture ne précise pas si une entrée à l’intérieur du palais est incluse."}, {"name": "Promenade dans Gyedong-gil", "detail": "Découverte des saveurs de rue et du quartier, entre boutiques et mode avant-gardiste."}, {"name": "Un souvenir inclus", "detail": "Un souvenir est prévu dans le billet pour garder une trace de la visite ; penser à le récupérer."}, {"name": "Fin à Bukchon Hanok Village · 18:00", "detail": "Derniers en-cas traditionnels avec les bâtiments historiques en toile de fond. Durée totale 4 h ; durées individuelles non précisées. Restrictions sans viande ni alcool envoyées le 21 septembre ; confirmation des adaptations encore attendue."}],
    kind: 'activity',
    title: 'Street food tour in Jongno, Heart of Seoul',
    schedule: 'Rendez-vous 13:40 - Début 14:00 - Fin 18:00',
    location: 'Jongno 3-ga Station · sortie 4 · Jongno-gu, Nakwon-dong 134-3, Séoul',
    detail: 'Airbnb Experience confirmée · guide Sangwoo ou Hazel pour 2 adultes et 1 bébé · code TANSFHNQ. Restrictions sans viande ni alcool transmises le 21 septembre ; confirmation des adaptations encore à obtenir. Plus de 8 spécialités coréennes, snacks et une boisson inclus. Parcours : Jongno, adresses locales d’Ikseon-dong, boisson du dernier roi, Changdeokgung, Gyedong-gil, souvenir spécial et fin à Bukchon Hanok Village. Annulation gratuite jusqu’au 13 octobre à 14:00 (heure de Séoul).',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jongno+3-ga+Station+Exit+4+134-3+Nakwon-dong+Jongno-gu+Seoul',
    bookingUrl: 'https://www.airbnb.fr/experiences/5769436?checkin=2026-10-14&checkout=2026-10-14&adults=2&infants=1',
    paid: true,
  },
  oct15: {
    kind: 'flight',
    title: 'Vol Air France AF267 vers Paris',
    schedule: 'Rendez-vous 07:45–08:15 (conseillé) - Début 11:45 - Fin 18:55',
    location: 'Aéroport international de Seoul-Incheon',
    detail: 'Départ conseillé de l’hôtel à 06:15 en taxi à réserver. Trajet estimé à 1 h 30 selon l’hôtel, plus 30 min de marge : arrivée visée à Incheon entre 07:45 et 08:15 pour le vol de 11:45. Confirmer le trajet la veille avec la réception et vérifier le terminal sur la carte d’embarquement.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Incheon+International+Airport',
    included: true,
  },
};
