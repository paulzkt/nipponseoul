import { transfers } from './transfers';
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
    stops: Array<{ name: string; duration?: string }>;
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
      { time: '08:10', title: 'Embarquement à Paris-CDG', detail: 'Terminal 2. Prévoir l’enregistrement en ligne entre 24 h et 1 h avant le départ. Dossier ZV8V7L. Garder les QR codes Visit Japan Web et les vouchers hors ligne.', kind: 'flight' },
      { time: '10:10', title: 'Décollage du vol AF186', detail: 'Vol direct en classe économique. Les documents indiquent deux bagages cabine.', kind: 'flight', included: true },
      { time: 'Journée', title: 'Installation à bord', detail: 'Repas et nuit dans l’avion, arrivée le lendemain matin au Japon.', kind: 'free' },
    ],
  },
  {
    id: 'oct01', dayNumber: 2, weekday: 'Jeudi', dateLabel: '1 octobre 2026', shortDate: '01 OCT', city: 'Tokyo', country: 'Japon', title: 'Arrivée & premiers néons',
    breakfast: 'Après l’arrivée · à choisir', lunch: 'Libre près de l’hôtel', dinner: 'Ramen local', transport: 'Transfert Haneda puis métro / marche', transportDuration: 'Transfert non inclus · à organiser', airline: 'Air France · vol AF186', hotel: 'Grand Prince Hotel Takanawa', hotelDetail: 'Superior Corner King · 27 m² · chambre seule · non-fumeur · première nuit',
    agenda: [
      { time: '06:25', title: 'Arrivée à Tokyo-Haneda', detail: 'Passage de l’immigration, récupération des bagages et accueil pour le transfert.', kind: 'flight', included: true },
      { time: 'À organiser', title: 'Transfert Haneda → hôtel', detail: 'Le transfert aéroport–hôtel n’est pas inclus. Rejoindre le Grand Prince Hotel Takanawa et déposer les bagages ; check-in généralement à partir de 15:00.', kind: 'hotel', warning: true },
      { time: 'Après-midi', title: 'Balade libre à Shinjuku', detail: 'Premiers quartiers animés, parc ou pause selon la fatigue du vol.', kind: 'activity' },
      { time: 'Soir', title: 'Découverte des néons', detail: 'Premier dîner japonais : ramen local.', kind: 'food' },
    ],
  },
  {
    id: 'oct02', dayNumber: 3, weekday: 'Vendredi', dateLabel: '2 octobre 2026', shortDate: '02 OCT', city: 'Tokyo', country: 'Japon', title: 'Tsukiji & bus panoramique',
    breakfast: 'Dégustations à Tsukiji · nourriture et boissons à payer sur place', lunch: 'Déjeuner léger avant le rendez-vous Hato Bus', dinner: 'Libre à Tokyo', transport: 'Métro + marche + bus Hato', transportDuration: 'Airbnb 07:00–09:15 · Hato Bus 14:00–18:00', airline: 'Non applicable', hotel: 'Grand Prince Hotel Takanawa', hotelDetail: 'Superior Corner King · chambre seule · deuxième nuit',
    agenda: [
      { time: '07:00–09:15', title: 'Tsukiji Food Tour With a Former Chef', detail: 'Airbnb Experience confirmée avec Ali pour 2 adultes et 1 bébé. Rendez-vous devant la statue Shinran Shonin, 3-chōme-16-13 Tsukiji. Code de confirmation : TA3TQWEF. Nourriture et boissons à acheter selon vos envies.', kind: 'activity', paid: true, statusLabel: 'Airbnb · confirmé', bookingUrl: 'https://www.airbnb.fr/experiences/6919404' },
      { time: '13:40', title: 'Rendez-vous au Hato Bus Office', detail: 'Arriver 20 min avant. 1-10-15 Marunouchi, Chiyoda-ku, à environ 2 min à gauche de la sortie Marunouchi South de Tokyo Station. Présenter le voucher sur téléphone ou imprimé.', kind: 'transport', included: true },
      { time: '14:00–18:00', title: 'Excursion panoramique de Tokyo · Hato Bus', detail: 'Circuit officiel de l’après-midi regroupé dans une seule excursion en bus.', kind: 'activity', included: true, excursion: { mode: 'Bus Hato · guide anglophone', duration: '4 h · 14:00–18:00', meetingTime: '13:40', departureTime: '14:00', meetingPoint: 'Hato Bus Office / Departure Point', meetingAddress: '1-10-15 Marunouchi, Chiyoda-ku, Tokyo 100-0005', meetingDirections: 'Tokyo Station, sortie Marunouchi South : tourner immédiatement à gauche et marcher environ 2 minutes. Repérer les bus jaunes Hato.', meetingMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hato+Bus+Tokyo+Station+Marunouchi+South+Exit+1-10-15+Marunouchi+Chiyoda+Tokyo', voucherInstruction: 'Présenter le voucher sur téléphone ou imprimé.', stops: [{ name: 'Imperial Palace Plaza', duration: '40 min' }, { name: 'Asakusa Kannon & Nakamise', duration: '60 min' }, { name: 'Kabukiza', duration: 'vue depuis le bus' }, { name: 'Tokyo Tower · Main Deck', duration: '40 min' }], note: 'Bus sans toilettes · repas non inclus.' } },
      { time: 'Soir', title: 'Dîner libre', detail: 'Choisir un restaurant selon le quartier de fin de visite.', kind: 'free' },
    ],
  },
  {
    id: 'oct03', dayNumber: 4, weekday: 'Samedi', dateLabel: '3 octobre 2026', shortDate: '03 OCT', city: 'Tokyo', country: 'Japon', title: 'Asakusa & Akihabara',
    breakfast: 'À l’hôtel · non inclus dans le circuit', lunch: 'Tempura à Asakusa', dinner: 'Libre à Akihabara ou près de l’hôtel', transport: 'Métro + marche', transportDuration: 'Déplacements sur la journée', airline: 'Non applicable', hotel: 'Grand Prince Hotel Takanawa', hotelDetail: 'Superior Corner King · chambre seule · troisième nuit',
    agenda: [
      { time: '10:00', title: 'Custom Tokyo tour with a well-traveled local', detail: 'Visite privée confirmée pour 2 adultes et 1 bébé (Adam).', kind: 'activity', paid: true, bookingUrl: 'https://www.airbnb.com/l/6Zh6wlln' },
      { time: 'Matin', title: 'Senso-ji et Asakusa', detail: 'Temple historique, porte Kaminarimon et rue commerçante Nakamise.', kind: 'activity' },
      { time: 'Midi', title: 'Déjeuner tempura', detail: 'Repas prévu dans le quartier d’Asakusa.', kind: 'food' },
      { time: 'Après-midi', title: 'Akihabara', detail: 'Électronique, jeux vidéo, anime et boutiques spécialisées.', kind: 'activity' },
      { time: 'Soir', title: 'Retour libre', detail: 'Option : Odaiba ou baie de Tokyo si l’énergie le permet.', kind: 'free' },
    ],
  },
  {
    id: 'oct04', dayNumber: 5, weekday: 'Dimanche', dateLabel: '4 octobre 2026', shortDate: '04 OCT', city: 'Tokyo', country: 'Japon', title: 'Mont Fuji en option',
    breakfast: 'À l’hôtel · non inclus · départ matinal', lunch: 'Hoto noodles', dinner: 'Libre près de l’hôtel', transport: 'Train + bus d’excursion', transportDuration: 'Excursion à la journée', airline: 'Non applicable', hotel: 'Grand Prince Hotel Takanawa', hotelDetail: 'Superior Corner King · chambre seule · quatrième nuit',
    agenda: [
      { time: 'Matin', title: 'Départ vers le mont Fuji', detail: 'Excursion prévue dans le planning personnel ; horaire et réservation à confirmer.', kind: 'transport', warning: true },
      { time: 'Journée', title: 'Mont Fuji et 5e station', detail: 'Panoramas, centre des visiteurs et promenade adaptée aux conditions météo.', kind: 'activity' },
      { time: 'Midi', title: 'Hoto noodles', detail: 'Spécialité locale de nouilles épaisses.', kind: 'food' },
      { time: 'Soir', title: 'Retour à Tokyo', detail: 'Préparer les bagages pour Kyoto.', kind: 'free' },
    ],
  },
  {
    id: 'oct05', dayNumber: 6, weekday: 'Lundi', dateLabel: '5 octobre 2026', shortDate: '05 OCT', city: 'Kyoto', country: 'Japon', title: 'Shinkansen vers Kyoto',
    breakfast: 'À l’hôtel à Tokyo · non inclus dans le circuit', lunch: 'Bento dans le train', dinner: 'Libre à Kyoto', transport: 'Shinkansen Tokyo → Kyoto', transportDuration: '2 h 14', airline: 'Non applicable', hotel: 'Kyoto Brighton Hotel', hotelDetail: 'Kyoto · première nuit',
    agenda: [
      { time: 'Matin', title: 'Check-out à Tokyo', detail: 'Transfert vers la gare avec les bagages.', kind: 'hotel' },
      { time: '12:30–14:44', title: 'Shinkansen Tokyo → Kyoto', ticketUrl: '/tickets/tokyo-kyoto-2026-10-05.pdf', detail: 'NOZOMI 33 · voiture 4 · sièges 13-A, 13-B et 13-C · 2 adultes et 1 enfant. Billets QR reçus : présenter les QR codes aux portiques signalés QR.', kind: 'transport', included: true },
      { time: 'Midi', title: 'Bento à bord', detail: 'Déjeuner prévu pendant le trajet.', kind: 'food' },
      { time: 'Après-midi', title: 'Installation à Kyoto', detail: 'Découverte tranquille des environs de l’hôtel.', kind: 'hotel' },
    ],
  },
  {
    id: 'oct06', dayNumber: 7, weekday: 'Mardi', dateLabel: '6 octobre 2026', shortDate: '06 OCT', city: 'Kyoto', country: 'Japon', title: 'Les trois temples iconiques',
    breakfast: 'À l’hôtel · non inclus dans le circuit', lunch: 'Libre après la visite', dinner: 'Dîner kaiseki', transport: 'Bus d’excursion + marche', transportDuration: 'Excursion Voyage Privé · demi-journée', airline: 'Non applicable', hotel: 'Kyoto Brighton Hotel', hotelDetail: 'Kyoto · deuxième nuit',
    agenda: [
      { time: '09:40', title: 'Rendez-vous à Kyoto Station', detail: 'JR Kyoto Station, sortie Karasuma, terminal Kyoto Sightseeing « OKOSHI » Bus devant Isetan 1F. À cause des travaux, passer par Porta underground mall ; Kyoto Central Post Office sert de repère.', kind: 'transport', included: true },
      { time: '10:00–15:00', title: 'Excursion en bus · les trois temples de Kyoto', detail: 'Circuit officiel regroupé dans une seule excursion en bus.', kind: 'activity', included: true, excursion: { mode: 'Kyoto Sightseeing Bus · guide japonais + audioguide GPS en anglais', duration: '5 h · 10:00–15:00', meetingTime: '09:40', departureTime: '10:00', meetingPoint: 'Terminal Kyoto Sightseeing « OKOSHI » Bus', meetingAddress: 'JR Kyoto Station, Karasuma Exit · 600-8216 Higashishiokojicho, Shimogyo Ward, Kyoto', meetingDirections: 'Place devant l’entrée du grand magasin Isetan au 1F. Avec les travaux, passer par Porta underground mall. Le Kyoto Central Post Office, en face, sert de repère. Métro : sortie 6.', meetingMapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+Sightseeing+OKOSHI+Bus+Terminal+JR+Kyoto+Station+Karasuma+Exit', voucherInstruction: 'Arriver 20 min avant et présenter le voucher au guide. Le bus part à l’heure et n’attend pas.', stops: [{ name: 'Kinkaku-ji · Pavillon d’Or', duration: '40 min' }, { name: 'Ginkaku-ji · Pavillon d’Argent', duration: '45 min' }, { name: 'Kiyomizu-dera', duration: '120 min' }], note: 'Déjeuner non inclus.' } },
      { time: 'Après-midi', title: 'Temps libre à Kyoto', detail: 'Après l’excursion incluse, programme libre à adapter au rythme de la famille.', kind: 'free' },
      { time: 'Soir', title: 'Expérience kaiseki', detail: 'Dîner japonais en plusieurs services.', kind: 'food' },
    ],
  },
  {
    id: 'oct07', dayNumber: 8, weekday: 'Mercredi', dateLabel: '7 octobre 2026', shortDate: '07 OCT', city: 'Kyoto', country: 'Japon', title: 'Bambous & torii',
    breakfast: 'À l’hôtel · non inclus dans le circuit', lunch: 'Yudofu (tofu bouilli)', dinner: 'Gion Food Tour · 13 dégustations dans 4 adresses', transport: 'Train local + métro + marche', transportDuration: 'Déplacements sur la journée', airline: 'Non applicable', hotel: 'Kyoto Brighton Hotel', hotelDetail: 'Kyoto · troisième nuit',
    agenda: [
      { time: 'Matin', title: 'Arashiyama', detail: 'Bambouseraie tôt le matin, pont Togetsukyo et promenade.', kind: 'activity' },
      { time: 'Midi', title: 'Déjeuner yudofu', detail: 'Tofu bouilli, spécialité adaptée à la journée temples et jardins.', kind: 'food' },
      { time: 'Après-midi', title: 'Fushimi Inari-taisha', detail: 'Montée sous les milliers de torii rouges selon le rythme de la famille.', kind: 'activity' },
      { time: '17:00–20:15', title: 'Kyoto · Gion Food Tour', detail: 'Expérience Airbnb confirmée pour 2 adultes et 1 bébé : 13 dégustations dans 4 adresses locales, entre Gion et Pontocho. Activité légère en anglais ou en japonais.', kind: 'food', paid: true, bookingUrl: 'https://www.airbnb.com/experiences/6643954' },
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
      { time: '12:46–13:00', title: 'Shinkansen Kyoto → Shin-Osaka', ticketUrl: '/tickets/kyoto-osaka-2026-10-09.pdf', detail: 'NOZOMI 25 · voiture 4 · sièges 11-A, 11-B et 11-C · 2 adultes et 1 enfant. Billets QR reçus : présenter les QR codes aux portiques signalés QR.', kind: 'transport', included: true },
      { time: 'Après-midi', title: 'Installation à Osaka', detail: 'Rejoindre le Hotel New Otani Osaka. Transfert non inclus ; check-in généralement à partir de 15:00.', kind: 'hotel' },
      { time: 'Fin de journée', title: 'Château d’Osaka ou Dotonbori', detail: 'Programme libre selon l’heure d’installation et le rythme d’Adam.', kind: 'free' },
    ],
  },
  {
    id: 'oct10', dayNumber: 11, weekday: 'Samedi', dateLabel: '10 octobre 2026', shortDate: '10 OCT', city: 'Osaka', country: 'Japon', title: 'Osaka · lieux branchés et trésors cachés',
    breakfast: 'À Osaka · non inclus', lunch: 'Libre', dinner: 'Okonomiyaki ou Dotonbori', transport: 'Métro / JR + marche', transportDuration: 'Déplacements libres sur la journée', airline: 'Non applicable', hotel: 'Hotel New Otani Osaka', hotelDetail: 'Superior Double · chambre seule · deuxième nuit · Voyage Privé',
    agenda: [
      { time: '10:00–13:00', title: 'Lieux branchés et trésors cachés d’Osaka avec snack local', detail: 'Airbnb Experience confirmée pour 2 voyageurs. Rendez-vous à l’extérieur de Namba Station, sortie 24.', kind: 'activity', paid: true, statusLabel: 'Airbnb · confirmé', bookingUrl: 'https://www.airbnb.fr/experiences/110508?checkin=2026-10-10&location=Osaka%2C+Japon&currentTab=experience_tab&adults=2&children=0&infants=0' },
      { time: 'Après-midi', title: 'Château d’Osaka et parc', detail: 'Visite libre après l’expérience, selon le rythme d’Adam. Le parc se trouve juste à côté du Hotel New Otani Osaka.', kind: 'activity' },
      { time: 'Soir', title: 'Dotonbori', detail: 'Promenade, enseignes lumineuses et dîner libre. Préparer le sac pour Universal Studios le lendemain.', kind: 'activity' },
    ],
  },
  {
    id: 'oct11', dayNumber: 12, weekday: 'Dimanche', dateLabel: '11 octobre 2026', shortDate: '11 OCT', city: 'Osaka', country: 'Japon', title: 'Universal Studios Japan · confirmé',
    breakfast: 'Petit-déjeuner tôt à Osaka · non inclus', lunch: 'Repas libre au parc', dinner: 'CityWalk ou près de l’hôtel', transport: 'JR vers Universal City', transportDuration: 'Journée complète', airline: 'Non applicable', hotel: 'Hotel New Otani Osaka', hotelDetail: 'Nuit supplémentaire du 11 au 12 · même chambre confirmée · payée séparément',
    agenda: [
      { time: 'Ouverture', title: 'Entrée à Universal Studios Japan', detail: 'Trois réservations Klook confirmées pour le 11 octobre : QHV914134, ZUN226017 et GZN545241. Arriver avant l’ouverture du parc.', kind: 'activity', paid: true, statusLabel: 'Payé · confirmé' },
      { time: '11:00–11:30', title: 'Illumination’s Villain-Con Minion Blast', detail: 'Créneau réservé avec l’Express Pass 5.', kind: 'activity', paid: true, statusLabel: 'Payé · créneau réservé' },
      { time: '12:20–13:20', title: 'SUPER NINTENDO WORLD', detail: 'Entrée à la zone 12:20–13:20 · Mario Kart 12:20–12:50 · Mine Cart Madness 12:50–13:20.', kind: 'activity', paid: true, statusLabel: 'Payé · créneaux réservés' },
      { time: 'Horaire libre', title: 'Harry Potter & The Flying Dinosaur', detail: 'Attractions incluses dans l’Express Pass sans horaire imprimé sur le voucher.', kind: 'activity', paid: true, statusLabel: 'Payé' },
      { time: 'Nuit', title: 'Même chambre au Hotel New Otani Osaka', detail: 'Nuit supplémentaire réservée du 11 au 12 octobre. L’hôtel a confirmé que vous resterez dans la même chambre.', kind: 'hotel', paid: true, statusLabel: 'Payé séparément · confirmé' },
    ],
  },
  {
    id: 'oct12', dayNumber: 13, weekday: 'Lundi', dateLabel: '12 octobre 2026', shortDate: '12 OCT', city: 'Seoul', country: 'Japon → Corée du Sud', title: 'Vol Osaka → Séoul',
    breakfast: 'Très tôt à Osaka · non inclus', lunch: 'À l’aéroport ou après l’arrivée', dinner: 'Libre près de l’hôtel à Séoul', transport: 'Vol Peach MM737 · KIX T2 → Seoul-Gimpo', transportDuration: '1 h 55 · 10:25–12:20', airline: 'Peach Aviation', hotel: 'The Ambassador Seoul - A Pullman Hotel', hotelDetail: 'Réservation Voyage Privé commencée le 11 · arrivée différée au 12 confirmée auprès de VIO Travel et de l’hôtel',
    agenda: [
      { time: 'Vers 07:00', title: 'Départ du New Otani vers KIX Terminal 2', detail: 'Prévoir une marge confortable avec les bagages et Adam. L’enregistrement international ferme 50 minutes avant le départ.', kind: 'transport', warning: true },
      { time: '10:25–12:20', title: 'Vol Peach MM737 · Osaka → Séoul', detail: 'Kansai Terminal 2 → Gimpo terminal international. Référence V62YB8. Sièges : Zakaria 4B, Soukayna 4A, Adam bébé sur le siège 4A. Bagages enregistrés : 2 pour Zakaria, 1 pour Soukayna, aucun pour Adam.', kind: 'flight', included: true },
      { time: 'Après 12:20', title: 'Transfert Gimpo → The Ambassador Seoul', detail: 'Le transfert n’est pas inclus. La réservation commence le 11 octobre et l’arrivée effective le 12. VIO Travel et l’hôtel ont été prévenus ; la conservation de la chambre est confirmée.', kind: 'hotel', included: true, statusLabel: 'Arrivée différée confirmée' },
    ],
  },
  {
    id: 'oct13', dayNumber: 14, weekday: 'Mardi', dateLabel: '13 octobre 2026', shortDate: '13 OCT', city: 'Seoul', country: 'Corée du Sud', title: 'Palais de Séoul & marché Gwangjang',
    breakfast: 'Tôt à l’hôtel · non inclus dans le circuit', lunch: 'Dégustations libres au marché Gwangjang', dinner: 'Bibimbap ou Korean BBQ', transport: 'Métro + excursion guidée + marche', transportDuration: 'Excursion Voyage Privé · 09:00–12:30', airline: 'Non applicable', hotel: 'The Ambassador Seoul - A Pullman Hotel', hotelDetail: 'Superior Double · chambre seule · troisième nuit',
    agenda: [
      { time: '08:40', title: 'Rendez-vous · City Hall Station, sortie 6', detail: 'Devant The Plaza Seoul. Le guide attend avec une pancarte VIP Travel. Arriver 20 minutes avant le départ.', kind: 'transport', included: true },
      { time: '09:00–12:30', title: 'Seoul Royal Palace, Bukchon Hanok Village & Gwangjang Market Feast', detail: 'Excursion Voyage Privé déplacée et confirmée le 13 octobre. Le mardi, Changdeokgung Palace et Insadong remplacent Gyeongbokgung et la relève de la garde.', kind: 'activity', included: true, statusLabel: 'Voyage Privé · confirmé', excursion: { mode: 'Visite guidée · Voyage Privé', duration: '3 h 30 · 09:00–12:30', meetingTime: '08:40', departureTime: '09:00', meetingPoint: 'City Hall Subway Station · sortie 6', meetingAddress: 'Devant The Plaza Seoul · 119 Sogong-ro, Jung-gu, Seoul', meetingDirections: 'Sortir par la sortie 6 de City Hall Station et attendre devant The Plaza Seoul. Le guide tient une pancarte VIP Travel.', meetingMapUrl: 'https://www.google.com/maps/search/?api=1&query=City+Hall+Subway+Station+Exit+6+The+Plaza+Seoul', meetingContact: '+82 10-9809-3501 · WhatsApp', voucherInstruction: 'Aucun voucher séparé requis. Arriver 15 à 20 minutes avant ; le groupe n’attend pas les retardataires.', stops: [{ name: 'Bukchon Hanok Village' }, { name: 'Changdeokgung Palace · programme du mardi' }, { name: 'Insadong · programme du mardi' }, { name: 'Korean Ginseng Center' }, { name: 'Gwangjang Market · temps libre pour goûter la street food' }], note: 'Repas non inclus. Fin prévue vers 12:30 ; après-midi libre.' } },
      { time: 'Après-midi', title: 'Temps libre à Séoul', detail: 'Retour à l’hôtel, promenade légère ou repos avec Adam après l’excursion.', kind: 'free' },
      { time: 'Soir', title: 'Dîner libre', detail: 'Bibimbap, Korean BBQ ou repas simple près de l’hôtel.', kind: 'food' },
    ],
  },
  {
    id: 'oct14', dayNumber: 15, weekday: 'Mercredi', dateLabel: '14 octobre 2026', shortDate: '14 OCT', city: 'Seoul', country: 'Corée du Sud', title: 'Street food & quartiers historiques',
    breakfast: 'Libre près de l’hôtel · non inclus', lunch: 'Plus de 8 spécialités coréennes incluses dans l’Airbnb Experience', dinner: 'Léger ou libre après la visite', transport: 'Métro + marche', transportDuration: 'Airbnb Experience · 14:00–18:00', airline: 'Non applicable', hotel: 'The Ambassador Seoul - A Pullman Hotel', hotelDetail: 'Superior Double · chambre seule · quatrième et dernière nuit',
    agenda: [
      { time: 'Matin', title: 'Matinée libre et repos', detail: 'Garder un rythme tranquille avant les quatre heures de visite à pied.', kind: 'free' },
      { time: '14:00–18:00', title: 'Street food tour in Jongno, Heart of Seoul', detail: 'Airbnb Experience confirmée avec Sangwoo pour 2 adultes et 1 bébé. Rendez-vous à la sortie 4 de Jongno 3-ga. Code : TANSFHNQ. Plus de 8 spécialités coréennes, snacks et une boisson sont inclus.', kind: 'activity', paid: true, statusLabel: 'Airbnb · confirmé', bookingUrl: 'https://www.airbnb.fr/experiences/5769436?checkin=2026-10-14&checkout=2026-10-14&adults=2&infants=1' },
      { time: 'Après 18:00', title: 'Fin à Bukchon Hanok Village', detail: 'Retour libre vers l’hôtel après la visite et récupération du souvenir inclus.', kind: 'transport' },
      { time: 'Soir', title: 'Dernière soirée à Séoul', detail: 'Repas léger selon l’appétit après les dégustations.', kind: 'free' },
    ],
  },
  {
    id: 'oct15', dayNumber: 16, weekday: 'Jeudi', dateLabel: '15 octobre 2026', shortDate: '15 OCT', city: 'Seoul', country: 'Corée du Sud → France', title: 'Retour à Paris',
    breakfast: 'Très tôt à l’hôtel ou à emporter', lunch: 'Repas à bord Air France', dinner: 'Repas à bord / arrivée à Paris', transport: 'Vol direct AF267 · Séoul-Incheon → Paris-CDG', transportDuration: 'Environ 14 h 10', airline: 'Air France', hotel: 'Pas de nuit d’hôtel', hotelDetail: 'Arrivée à Paris-CDG à 18:55',
    agenda: [
      { time: 'Matin tôt', title: 'Check-out et transfert à Incheon', detail: 'Le transfert hôtel–aéroport n’est pas inclus. Prévoir une marge importante pour rejoindre Incheon Terminal 2.', kind: 'transport', warning: true },
      { time: '09:45', title: 'Embarquement à Séoul-Incheon', detail: 'Enregistrement en ligne obligatoire. Dossier ZV8V7L.', kind: 'flight' },
      { time: '11:45', title: 'Décollage du vol AF267', detail: 'Vol direct vers Paris-CDG.', kind: 'flight', included: true },
      { time: '18:55', title: 'Arrivée à Paris', detail: 'Fin du voyage.', kind: 'flight' },
    ],
  },
];

export const eventsOfDay: Partial<Record<DailyPlan['id'], EventOfDay | EventOfDay[]>> = {
  sep30: {
    kind: 'flight',
    title: 'Vol Air France AF186 vers Tokyo',
    schedule: 'Embarquement 08:10 · départ 10:10',
    location: 'Aéroport Paris–Charles-de-Gaulle · Terminal 2',
    detail: 'Prévoir l’enregistrement en ligne et garder les documents du voyage accessibles hors ligne.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Paris+Charles+de+Gaulle+Airport+Terminal+2',
    included: true,
  },
  oct01: [
    {
      kind: 'flight',
      title: 'Arrivée à Tokyo',
      schedule: 'Arrivée 06:25',
      location: 'Aéroport international de Tokyo-Haneda',
      detail: 'Immigration et récupération des bagages, puis transfert vers l’hôtel.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tokyo+Haneda+International+Airport',
      included: true,
    },
    {
      kind: 'transfer', title: 'Transfert aéroport → hôtel',
      schedule: transfers.find(item => item.dayId === 'oct01')?.pickup ?? '',
      location: 'Point de rendez-vous aux arrivées', mapUrl: '', confirmed: true,
    },
    {
      kind: 'hotel',
      title: 'Check-in · Grand Prince Hotel Takanawa',
      schedule: 'Dépôt des bagages à l’arrivée · chambre à partir de 15:00',
      location: 'Grand Prince Hotel Takanawa · Tokyo',
      detail: 'Première nuit confirmée dans une Superior Corner King, chambre seule et non-fumeur.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Prince+Hotel+Takanawa',
      included: true,
    },
  ],
  oct02: [
    {
      kind: 'activity',
      title: 'Tsukiji Food Tour With a Former Chef',
      schedule: 'Début 07:00 · fin 09:15 · durée 2 h 15',
      location: 'Statue Shinran Shonin · 3-chōme-16-13 Tsukiji, Chuo City, Tokyo 104-0045',
      detail: 'Confirmé pour 2 adultes et 1 bébé · hôte : Ali · code TA3TQWEF. Au programme : marché extérieur, rencontre avec les commerçants, découverte du thon, aliments historiques liés aux ninjas, dégustations libres et fin au food court. Nourriture et boissons à payer sur place.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Shinran+Shonin+Statue+3-chome-16-13+Tsukiji+Chuo+City+Tokyo',
      bookingUrl: 'https://www.airbnb.fr/experiences/6919404',
      paid: true,
    },
    {
      kind: 'excursion',
      title: 'Excursion panoramique de Tokyo · Hato Bus',
      schedule: 'Rendez-vous 13:40 · départ 14:00 · retour 18:00',
      location: 'Hato Bus Office · 1-10-15 Marunouchi, Chiyoda-ku, Tokyo',
      detail: 'Arriver 20 minutes avant. Tokyo Station, sortie Marunouchi South : tourner à gauche et marcher environ 2 minutes jusqu’aux bus jaunes Hato.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hato+Bus+Tokyo+Station+Marunouchi+South+Exit+1-10-15+Marunouchi+Chiyoda+Tokyo',
      included: true,
    },
  ],
  oct03: {
    kind: 'activity',
    title: 'Visite privée personnalisée de Tokyo',
    schedule: 'Début 10:00',
    location: 'Prise en charge au Grand Prince Hotel Takanawa',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Prince+Hotel+Takanawa+Tokyo',
    bookingUrl: 'https://www.airbnb.com/l/6Zh6wlln',
    paid: true,
  },
  oct05: [
    {
      kind: 'train',
      title: 'Shinkansen Tokyo → Kyoto', ticketUrl: '/tickets/tokyo-kyoto-2026-10-05.pdf',
      schedule: 'Départ 12:30 · arrivée 14:44',
      location: 'Tokyo Station · voie à consulter en gare',
      detail: 'NOZOMI 33 · voiture 4 · sièges 13-A, 13-B et 13-C · 2 adultes et 1 enfant. Billets QR reçus : présenter les QR codes aux portiques signalés QR.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tokyo+Station',
      included: true,
    },
    {
      kind: 'hotel',
      title: 'Check-in · Kyoto Brighton Hotel',
      schedule: 'Après l’arrivée à Kyoto',
      location: 'Kyoto Brighton Hotel',
      detail: 'Installation pour la première des quatre nuits confirmées à Kyoto.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+Brighton+Hotel',
      included: true,
    },
  ],
  oct06: {
    kind: 'excursion',
    title: 'Excursion en bus · les trois temples de Kyoto',
    schedule: 'Rendez-vous 09:40 · départ 10:00 · fin 15:00',
    location: 'Terminal Kyoto Sightseeing « OKOSHI » Bus · JR Kyoto Station, Karasuma Exit',
    detail: 'Devant Isetan au 1F. Avec les travaux, passer par Porta underground mall. Le bus part à l’heure.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+Sightseeing+OKOSHI+Bus+Terminal+JR+Kyoto+Station+Karasuma+Exit',
    included: true,
  },
  oct07: {
    kind: 'activity',
    title: 'Kyoto · Gion Food Tour · 13 dishes & 4 Local Eateries',
    schedule: 'Début 17:00 · fin prévue 20:15 · durée 3 h 15',
    location: 'Devant Starbucks Coffee · Kyoto Sanjo-ohashi Bridge',
    detail: 'Airbnb Experience confirmée pour 2 adultes et 1 bébé. Parcours culinaire léger entre Gion et Pontocho : plats saisonniers de Kyoto, spécialités régionales, street food et taiyaki. Visite proposée en anglais ou en japonais.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Starbucks+Coffee+Kyoto+Sanjo-ohashi+Bridge+604-8004+Kyoto',
    bookingUrl: 'https://www.airbnb.com/experiences/6643954',
    paid: true,
  },
  oct08: [
    {
      kind: 'train',
      title: 'Taxi · Kyoto Brighton Hotel → Kintetsu Kyoto Station',
      schedule: 'Départ conseillé vers 09:35 · trajet d’environ 15–20 min',
      location: 'Entrée du Kyoto Brighton Hotel',
      detail: 'Option la plus simple avec Adam et la poussette. Demander au chauffeur Kintetsu Kyoto Station et viser une arrivée avant 10:00.',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kyoto+Brighton+Hotel&destination=Kintetsu+Kyoto+Station&travelmode=driving',
      planned: true,
    },
    {
      kind: 'train',
      title: 'Kintetsu Limited Express n°1007 · Kyoto → Kintetsu-Nara',
      schedule: 'Départ 10:25 · arrivée 10:58 · direct · 33 min',
      location: 'Kintetsu Kyoto Station · quai 1 · voiture 3',
      detail: 'Réservation A63106 · certification 54777 · sièges 3A, 3B et 3C. Billet pour 2 adultes et 1 enfant. Supplément Limited Express de 1 300 ¥ payé ; billets de base à acheter séparément ou à régler avec une carte IC. Afficher le e-ticket original sur le téléphone en cas de contrôle.',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kintetsu+Kyoto+Station&destination=Kintetsu-Nara+Station&travelmode=transit',
      paid: true,
    },
    {
      kind: 'activity',
      title: 'Nara Park, daims et Todai-ji',
      schedule: 'Arrivée au parc prévue vers 11:10 · journée libre',
      location: 'Nara Park · à environ 8 min à pied de Kintetsu-Nara',
      detail: 'Le parc est gratuit et ouvert toute l’année. Les daims sont sauvages : garder Adam dans la poussette ou dans les bras à proximité et laisser les adultes donner les biscuits.',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kintetsu-Nara+Station&destination=Nara+Park&travelmode=walking',
      planned: true,
    },
    {
      kind: 'train',
      title: 'Retour Nara → Kyoto Brighton Hotel',
      schedule: 'Départ conseillé 16:30–17:00',
      location: 'Kintetsu-Nara Station → Karasuma-Oike → hôtel',
      detail: 'Reprendre Kintetsu jusqu’à Kyoto, puis le métro Karasuma jusqu’à Karasuma-Oike. La navette retour vers l’hôtel passe à :00, :20 et :40 jusqu’à 21:40.',
      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kintetsu-Nara+Station&destination=Kyoto+Brighton+Hotel&travelmode=transit',
      planned: true,
    },
  ],
  oct09: [
    {
      kind: 'train',
      title: 'Shinkansen Kyoto → Shin-Osaka', ticketUrl: '/tickets/kyoto-osaka-2026-10-09.pdf',
      schedule: 'Départ 12:46 · arrivée 13:00',
      location: 'Kyoto Station · voie à consulter en gare',
      detail: 'NOZOMI 25 · voiture 4 · sièges 11-A, 11-B et 11-C · 2 adultes et 1 enfant. Billets QR reçus : présenter les QR codes aux portiques signalés QR.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+Station+Central+Gate',
      included: true,
    },
    {
      kind: 'hotel',
      title: 'Check-in · Hotel New Otani Osaka',
      schedule: 'Après le transfert depuis Shin-Osaka · chambre à partir de 15:00',
      location: 'Hotel New Otani Osaka',
      detail: 'Première nuit confirmée à Osaka. Le transfert depuis la gare n’est pas inclus.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+New+Otani+Osaka',
      included: true,
    },
  ],
  oct10: {
    kind: 'activity',
    title: 'Lieux branchés et trésors cachés d’Osaka avec snack local',
    schedule: 'Début 10:00 · durée environ 3 h',
    location: 'À l’extérieur de Namba Station · sortie 24 · Osaka',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Namba+Station+Exit+24+Osaka',
    bookingUrl: 'https://www.airbnb.fr/experiences/110508?checkin=2026-10-10&location=Osaka%2C+Japon&currentTab=experience_tab&adults=2&children=0&infants=0',
    paid: true,
  },
  oct11: {
    kind: 'activity',
    title: 'Universal Studios Japan',
    schedule: 'Arriver avant l’ouverture · premier créneau 11:00',
    location: 'Universal Studios Japan · entrée principale',
    detail: 'Trois réservations Klook confirmées. Villain-Con à 11:00, puis SUPER NINTENDO WORLD et attractions réservées à partir de 12:20.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Universal+Studios+Japan+Main+Entrance',
    paid: true,
  },
  oct12: [
    {
      kind: 'flight',
      title: 'Arrivée à Séoul · vol Peach MM737',
      schedule: 'Arrivée 12:20 · départ d’Osaka 10:25',
      location: 'Aéroport international de Gimpo (GMP)',
      detail: 'Référence V62YB8. Prévoir un départ de l’hôtel vers 07:00 ; l’enregistrement international ferme 50 minutes avant le vol.',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gimpo+International+Airport',
      included: true,
    },
    {
      kind: 'transfer', title: 'Transfert aéroport → hôtel',
      schedule: transfers.find(item => item.dayId === 'oct12')?.pickup ?? '',
      location: 'Point de rendez-vous aux arrivées', mapUrl: '', confirmed: true,
    },
    {
      kind: 'hotel',
      title: 'Check-in · The Ambassador Seoul',
      schedule: 'Après 12:20 · après le transfert depuis Gimpo',
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
      schedule: 'Rendez-vous 08:40 · départ 09:00 · fin vers 12:30',
      location: 'City Hall Station · sortie 6 · devant The Plaza Seoul',
      detail: 'Excursion Voyage Privé déplacée et confirmée au 13 octobre. Le guide tient une pancarte VIP Travel. Le mardi : Changdeokgung et Insadong remplacent Gyeongbokgung et la relève de la garde. Contact : +82 10-9809-3501 (WhatsApp).',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=City+Hall+Subway+Station+Exit+6+The+Plaza+Seoul',
      included: true,
    },
  ],
  oct14: {
    kind: 'activity',
    title: 'Street food tour in Jongno, Heart of Seoul',
    schedule: 'Début 14:00 · fin 18:00 · durée 4 h',
    location: 'Jongno 3-ga Station · sortie 4 · Jongno-gu, Nakwon-dong 134-3, Séoul',
    detail: 'Airbnb Experience confirmée avec Sangwoo pour 2 adultes et 1 bébé · code TANSFHNQ. Plus de 8 spécialités coréennes, snacks et une boisson inclus. Parcours : Jongno, adresses locales d’Ikseon-dong, boisson du dernier roi, Changdeokgung, Gyedong-gil, souvenir spécial et fin à Bukchon Hanok Village. Annulation gratuite jusqu’au 13 octobre à 14:00 (heure de Séoul).',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jongno+3-ga+Station+Exit+4+134-3+Nakwon-dong+Jongno-gu+Seoul',
    bookingUrl: 'https://www.airbnb.fr/experiences/5769436?checkin=2026-10-14&checkout=2026-10-14&adults=2&infants=1',
    paid: true,
  },
  oct15: {
    kind: 'flight',
    title: 'Vol Air France AF267 vers Paris',
    schedule: 'Embarquement 09:45 · départ 11:45 · arrivée 18:55',
    location: 'Aéroport international de Seoul-Incheon',
    detail: 'Prévoir une marge importante pour le transfert depuis l’hôtel et effectuer l’enregistrement en ligne.',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Incheon+International+Airport',
    included: true,
  },
};
