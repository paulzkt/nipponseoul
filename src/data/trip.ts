export type City = 'Paris' | 'Tokyo' | 'Kyoto' | 'Osaka' | 'Seoul';
export type TaskStatus = 'todo' | 'progress' | 'done';
export type MagnetCityId = 'tokyo' | 'kyoto' | 'nara' | 'osaka' | 'seoul';

export interface MagnetCity {
  id: MagnetCityId;
  label: string;
  city?: City;
}

export interface TripDay {
  id: string;
  date: string;
  dateLabel: string;
  city: City;
  title: string;
  description: string;
  food: string;
  transport: string;
  included?: boolean;
  needsConfirmation?: boolean;
}

export interface TripTask {
  id: string;
  label: string;
  status: TaskStatus;
  due?: string;
}

export interface Booking {
  id: string;
  type: 'Vol' | 'Hotel' | 'Train' | 'Visite';
  title: string;
  detail: string;
  status: 'confirme' | 'inclus' | 'a-confirmer' | 'en-confirmation';
}

export interface Expense {
  id: string;
  label: string;
  amount: number;
  category: string;
}

export interface AirFranceOption {
  dayId: 'sep30' | 'oct15';
  route: string;
  flight: string;
  checkIn: string;
  seats: Array<{ traveler: string; seat: string; emd: string }>;
  bags: Array<{ traveler: string; emd: string }>;
}

export interface HotelInfo {
  id: string;
  city: City;
  name: string;
  googleRating: number;
  googleReviewCount: number;
  googleUrl: string;
  breakfastPrice: string;
  breakfastChildPrice?: string;
  breakfastHours: string;
  breakfastNote: string;
  breakfastSourceUrl: string;
  gymStatus: 'strength' | 'limited' | 'partner' | 'none';
  gymName: string;
  gymVerdict: string;
  gymEquipment: string;
  gymHours: string;
  gymAccess: string;
  gymSourceUrl: string;
  laundryName: string;
  laundryType: string;
  laundryAddress: string;
  laundryNote: string;
  laundryMapUrl: string;
  laundryWalkTime: string;
  laundryHours: string;
  laundryDays: string;
  laundryAveragePrice: string;
  supermarketName: string;
  supermarketAddress: string;
  supermarketNote: string;
  supermarketMapUrl: string;
  supermarketWalkTime: string;
  supermarketHours: string;
  supermarketDays: string;
  pharmacyName: string;
  pharmacyAddress: string;
  pharmacyNote: string;
  pharmacyMapUrl: string;
  pharmacyWalkTime: string;
  pharmacyHours: string;
  pharmacyDays: string;
  souvenirName: string;
  souvenirAddress: string;
  souvenirNote: string;
  souvenirMapUrl: string;
  souvenirWalkTime: string;
  souvenirHours: string;
  souvenirDays: string;
  souvenirOfficialUrl: string;
  electronicsName: string;
  electronicsAddress: string;
  electronicsNote: string;
  electronicsMapUrl: string;
  electronicsTravelTime: string;
  electronicsHours: string;
  electronicsDays: string;
  electronicsOfficialUrl: string;
  mallName: string;
  mallRating: number;
  mallAddress: string;
  mallNote: string;
  mallMapUrl: string;
  mallTravelTime: string;
  mallHours: string;
  mallDays: string;
  mallWebsiteUrl: string;
  metroName: string;
  metroDetail: string;
  metroWalkTime: string;
  metroScheduleUrl: string;
  metroAccessibility: string;
  metroAccessibilityNote: string;
  metroAccessibilityUrl: string;
  busName: string;
  busDetail: string;
  busWalkTime: string;
  busScheduleUrl: string;
  busAccessibility: string;
  busAccessibilityNote: string;
}

export const departureDate = '2026-09-30T10:10:00+02:00';
export const returnDate = '2026-10-15T18:55:00+02:00';
export const adamBirthDate = '15 mars 2025';
export const adamAgeDuringTrip = '18–19 mois';

export const magnetCities: MagnetCity[] = [
  { id: 'tokyo', label: 'Tokyo', city: 'Tokyo' },
  { id: 'kyoto', label: 'Kyoto', city: 'Kyoto' },
  { id: 'nara', label: 'Nara' },
  { id: 'osaka', label: 'Osaka', city: 'Osaka' },
  { id: 'seoul', label: 'Séoul', city: 'Seoul' },
];

export const tripDays: TripDay[] = [
  { id: 'sep30', date: '2026-09-30', dateLabel: 'Mer. 30 sept.', city: 'Paris', title: 'Grand depart vers Tokyo', description: 'Arrivée conseillée à CDG vers 07:00. Vol AF186 à 10:10, terminal 2E ; embarquement selon la carte.', food: 'Repas a bord', transport: 'Avion - 13 h 15' },
  { id: 'oct01', date: '2026-10-01', dateLabel: 'Jeu. 1 oct.', city: 'Tokyo', title: 'Arrivee et premiers neon', description: 'Arrivee a Haneda a 06:25, transfert, installation puis balade douce a Shinjuku.', food: 'Premier ramen local', transport: 'Transfert + metro' },
  { id: 'oct02', date: '2026-10-02', dateLabel: 'Ven. 2 oct.', city: 'Tokyo', title: 'Tsukiji & Tokyo panoramique', description: 'Airbnb Experience a Tsukiji de 07:00 a 09:15, puis depart du bus Hato a 14:00 depuis la gare de Tokyo.', food: 'Degustations a Tsukiji', transport: 'Metro + bus Hato', included: true },
  { id: 'oct03', date: '2026-10-03', dateLabel: 'Sam. 3 oct.', city: 'Tokyo', title: 'Tokyo avec Ayano', description: '10:00 au lobby du Grand Prince Hotel Takanawa : Akihabara, Kanda Shrine, pont Hijiri, déjeuner halal et Jimbocho.', food: 'Déjeuner halal avec Ayano', transport: 'Metro' },
  { id: 'oct04', date: '2026-10-04', dateLabel: 'Dim. 4 oct.', city: 'Tokyo', title: 'Tokyo · journée libre', description: 'Journée sans réservation, à adapter au rythme de la famille. Préparer les bagages pour Kyoto.', food: 'Repas libres à Tokyo', transport: 'Métro / marche selon les envies' },
  { id: 'oct05', date: '2026-10-05', dateLabel: 'Lun. 5 oct.', city: 'Kyoto', title: 'Shinkansen vers Kyoto', description: 'Train inclus de Tokyo a Kyoto de 12:30 a 14:44, puis installation au Kyoto Brighton Hotel.', food: 'Bento dans le train', transport: 'Shinkansen - 2 h 14', included: true },
  { id: 'oct06', date: '2026-10-06', dateLabel: 'Mar. 6 oct.', city: 'Kyoto', title: 'Les temples iconiques', description: 'Rendez-vous a Kyoto Station a 09:40, puis visite en bus de 10:00 a 15:00 : Kinkaku-ji, Ginkaku-ji et Kiyomizu-dera.', food: 'Dejeuner non inclus', transport: 'Bus', included: true },
  { id: 'oct07', date: '2026-10-07', dateLabel: 'Mer. 7 oct.', city: 'Kyoto', title: 'Kyoto · Gion Food Tour', description: 'Visite gastronomique confirmée de 17:00 à 20:15. Matinée et début d’après-midi libres ; visites optionnelles dans Suggestions.', food: '13 dégustations · adaptations demandées', transport: 'Train local + marche' },
  { id: 'oct08', date: '2026-10-08', dateLabel: 'Jeu. 8 oct.', city: 'Kyoto', title: 'Echappee a Nara', description: 'Kintetsu Limited Express n°1007 confirme de 10:25 a 10:58, puis parc aux daims et Todai-ji.', food: 'Sushi a Nara', transport: 'Kintetsu Limited Express - 33 min' },
  { id: 'oct09', date: '2026-10-09', dateLabel: 'Ven. 9 oct.', city: 'Osaka', title: 'Shinkansen vers Osaka', description: 'Train inclus Kyoto-Shin-Osaka de 12:46 a 13:00, puis installation au Hotel New Otani Osaka.', food: 'Libre', transport: 'Shinkansen - 14 min', included: true },
  { id: 'oct10', date: '2026-10-10', dateLabel: 'Sam. 10 oct.', city: 'Osaka', title: 'Journee libre a Osaka', description: 'Chateau d Osaka, Osaka Business Park ou Dotonbori. Preparer la journee Universal Studios du lendemain.', food: 'Libre', transport: 'Metro / JR + marche' },
  { id: 'oct11', date: '2026-10-11', dateLabel: 'Dim. 11 oct.', city: 'Osaka', title: 'Universal Studios Japan', description: 'Billets Klook confirmes pour la journee, avec les creneaux Express Pass et Super Nintendo World. Nuit supplementaire au New Otani dans la meme chambre.', food: 'Repas libre au parc', transport: 'JR vers Universal City' },
  { id: 'oct12', date: '2026-10-12', dateLabel: 'Lun. 12 oct.', city: 'Seoul', title: 'Vol Osaka-Seoul', description: 'Départ conseillé du New Otani à 05:30 en taxi à réserver ; arrivée visée KIX T2 06:30–07:00. Vol Peach MM737 de 10:25 à 12:20 vers Gimpo, puis installation au Ambassador Seoul.', food: 'Aeroport / repas libre a Seoul', transport: 'Peach MM737 - 1 h 55', included: true },
  { id: 'oct13', date: '2026-10-13', dateLabel: 'Mar. 13 oct.', city: 'Seoul', title: 'Palais de Seoul & marche Gwangjang', description: 'Excursion Voyage Prive confirmee de 09:00 a 12:30, puis apres-midi libre.', food: 'Degustations au marche Gwangjang', transport: 'Metro + visite guidee', included: true },
  { id: 'oct14', date: '2026-10-14', dateLabel: 'Mer. 14 oct.', city: 'Seoul', title: 'Street food & quartiers historiques', description: 'Airbnb Experience confirmee de 14:00 a 18:00, au depart de la sortie 4 de Jongno 3-ga.', food: 'Plus de 8 specialites incluses', transport: 'Metro + marche' },
  { id: 'oct15', date: '2026-10-15', dateLabel: 'Jeu. 15 oct.', city: 'Seoul', title: 'Retour a Paris', description: 'Horaire d’embarquement à vérifier sur la carte à Incheon. Vol direct Air France AF267 a 11:45, arrivee a 18:55.', food: 'Repas a bord', transport: 'Avion', included: true },
];

export const initialTasks: TripTask[] = [
  { id: 'kyoto-diet-ack', label: 'Kyoto : demande sans viande ni alcool prise en compte par Misato ; restaurants à informer, WhatsApp transmis', status: 'done' },
  { id: 'osaka-ack', label: 'Accuser réception du rendez-vous Osaka : 10 octobre à 09:50, Namba sortie 24 en haut des escaliers', status: 'todo', due: 'Avant le 10 oct. 2026' },
  { id: 'flight-checkin-final', label: 'AF186 : cartes d’embarquement, CDG 2E, arrivée conseillée 07:00 le 30 septembre', status: 'todo', due: '29 sept. 2026' },
  { id: 'driver-wait-seat', label: 'Haneda : confirmer attente après immigration et siège enfant avec Mr Li', status: 'todo', due: '30 sept. 2026' },
  { id: 'early-room', label: 'Takanawa : demander arrivée anticipée / dépôt des bagages ; chambre prévue à 15:00', status: 'todo', due: '30 sept. 2026' },
  { id: 'halal-hosts', label: 'Séoul : obtenir confirmation des restrictions sans viande ni alcool transmises le 21 septembre', status: 'todo', due: 'Avant les visites' },
  { id: 'adam-arrangements', label: 'Confirmer lits bébé, sièges enfant des transferts et présence d’Adam avec le guide Osaka', status: 'todo' },
  { id: 'mobile-data', label: 'Préparer connexion mobile Japon et Corée et accès WhatsApp', status: 'todo', due: '30 sept. 2026' },
  { id: 'insurance-offline', label: 'Enregistrer assurance, numéro d’assistance et documents des trois voyageurs hors ligne', status: 'todo', due: '30 sept. 2026' },
  { id: 'baggage-rules', label: 'Vérifier poids autorisés et prise en charge poussette chez Air France et Peach', status: 'todo', due: '30 sept. 2026' },
  { id: 'usj-times', label: 'Klook : clarifier Nintendo 12:00 / 12:20 et Child Switch avec un seul Express Pass', status: 'todo', due: 'Avant le 11 oct. 2026' },
  { id: 'kix-transfer', label: 'Organiser New Otani → KIX T2 le 12 octobre ; départ conseillé 05:30 en taxi, arrivée visée 06:30–07:00, vol 10:25', status: 'todo', due: 'Avant le 12 oct. 2026' },
  { id: 'gimpo-wait', label: 'Gimpo : confirmer attente du chauffeur après arrivée de 12:20 et contact', status: 'todo', due: 'Avant le 12 oct. 2026' },
  { id: 'icn-transfer', label: 'Organiser hôtel → Incheon le 15 octobre, vol 11:45 ; terminal et horaire de prise en charge à confirmer', status: 'todo', due: 'Avant le 15 oct. 2026' },
  { id: 'korea-arrival', label: 'Remplir l’e-Arrival Card coréenne si applicable dans les 3 jours avant arrivée le 12 octobre', status: 'todo', due: '9–11 oct. 2026 (heure coréenne)' },
  { id: 'extra-night-payment', label: 'New Otani : prévoir 51 146 JPY pour la nuit du 11 au 12 ou conserver la preuve de règlement', status: 'todo', due: '12 oct. 2026' },
  { id: 'luggage', label: 'Bagages supplémentaires Air France achetés', status: 'done' },
  { id: 'seats', label: 'Sièges Air France réservés', status: 'done' },
  { id: 'guides', label: 'Confirmer les derniers détails avec les guides réservés (halal et Adam)', status: 'todo' },
  { id: 'restaurants', label: 'Selectionner les restaurants', status: 'progress' },
  { id: 'videos', label: 'Finaliser la liste de videos et bonnes adresses', status: 'progress' },
  { id: 'hotels', label: 'Hotels reserves', status: 'done' },
  { id: 'planes', label: 'Vols internationaux reserves', status: 'done' },
  { id: 'vio-whatsapp', label: 'Vérifier que le +33 6 21 13 87 12 est actif sur WhatsApp avant le 23 septembre', status: 'todo', due: '23 sept. 2026' },
  { id: 'seoul-late-arrival', label: 'Arrivée le 12 octobre signalée à VIO Travel et The Ambassador Seoul · chambre conservée', status: 'done' },
  { id: 'train-vouchers', label: 'Billets QR Shinkansen reçus · Tokyo–Kyoto et Kyoto–Shin-Osaka', status: 'done' },
  { id: 'visit-japan-web', label: 'Compléter Visit Japan Web et enregistrer les QR codes hors ligne', status: 'todo', due: 'Avant le 30 sept. 2026' },
  { id: 'offline-docs', label: 'Télécharger hors ligne tous les billets, vouchers VIO, QR USJ et adresses (l’app ne contient pas tous les PDF)', status: 'todo', due: 'Avant le 30 sept. 2026' },
];

export const bookings: Booking[] = [
  { id: 'usj-soukayna', type: 'Visite', title: 'USJ · Soukayna + entrée Super Nintendo World', detail: 'Klook · 11 oct. 2026 · Studio Pass journée · entrée garantie à Super Nintendo World à 12:00 · Have Fun in Kansai Pass', status: 'confirme' },
  { id: 'usj-zakaria-entry', type: 'Visite', title: 'USJ · Studio Pass Zakaria', detail: 'Klook · 11 oct. 2026 · Studio Pass journée', status: 'confirme' },
  { id: 'usj-zakaria-express', type: 'Visite', title: 'USJ · Express Pass 5 Race & Minecart', detail: 'Klook · 11 oct. 2026 · Zakaria · Villain-Con 11:00–11:30 · entrée Super Nintendo World 12:20–13:20 · Mario Kart 12:20–12:50 · Mine Cart Madness 12:50–13:20 · Harry Potter and the Forbidden Journey : horaire libre · The Flying Dinosaur : horaire libre', status: 'confirme' },
  { id: 'new-otani-extra-night', type: 'Hotel', title: 'Hotel New Otani Osaka · nuit supplémentaire', detail: '11–12 oct. 2026 · même chambre confirmée par l’hôtel · chambre twin supérieure non-fumeur vue château · réservation séparée · 51 146 JPY à payer à l’hôtel · repas non inclus', status: 'confirme' },
  { id: 'af186', type: 'Vol', title: 'Paris CDG -> Tokyo Haneda', detail: 'AF186 · Économique · 30 sept. · embarquement à confirmer sur la carte · départ 10:10 · terminal 2E · arrivée le 1er oct. à 06:25 · 0 bagage en soute dans le forfait de base · dossier ZV8V7L', status: 'confirme' },
  { id: 'af267', type: 'Vol', title: 'Seoul Incheon -> Paris CDG', detail: 'AF267 · Économique · 15 oct. · embarquement à confirmer sur la carte · départ 11:45 · arrivée 18:55 · terminal non communiqué · 0 bagage en soute dans le forfait de base · dossier ZV8V7L', status: 'confirme' },
  { id: 'trains', type: 'Train', title: 'Tokyo-Kyoto & Kyoto-Shin-Osaka', detail: 'Billets QR reçus et payés · 5 oct. NOZOMI 33, 12:30–14:44, voiture 4, sièges 13-A/B/C · 9 oct. NOZOMI 25, 12:46–13:00, voiture 4, sièges 11-A/B/C · 2 adultes et 1 enfant', status: 'confirme' },
  { id: 'internal-flight', type: 'Vol', title: 'Osaka-Kansai -> Seoul-Gimpo', detail: 'Peach MM737 · 12 oct. · KIX terminal 2 · depart 10:25 · arrivee 12:20 a Gimpo terminal international · reference V62YB8 · sieges 4B/4A · Adam bebe sur 4A · 3 bagages enregistres au total (2 Zakaria, 1 Soukayna)', status: 'inclus' },
];

export const airFranceOptions: AirFranceOption[] = [
  {
    dayId: 'sep30',
    route: 'Paris-CDG → Tokyo-Haneda',
    flight: 'AF186 · 30 septembre 2026',
    checkIn: 'Enregistrement en ligne : dès 30 h avant le départ · embarquement selon la carte · terminal 2E',
    seats: [
      { traveler: 'Soukayna', seat: '21K', emd: '057-4237204615' },
      { traveler: 'Zakaria', seat: '21L', emd: '057-4237204614' },
    ],
    bags: [
      { traveler: 'Soukayna', emd: '057-4240209918' },
      { traveler: 'Zakaria', emd: '057-4237615853' },
    ],
  },
  {
    dayId: 'oct15',
    route: 'Séoul-Incheon → Paris-CDG',
    flight: 'AF267 · 15 octobre 2026',
    checkIn: 'Enregistrement en ligne : dès 30 h avant le départ · embarquement et terminal selon la carte',
    seats: [
      { traveler: 'Soukayna', seat: '21B', emd: '057-4237204617' },
      { traveler: 'Zakaria', seat: '21A', emd: '057-4237204616' },
    ],
    bags: [
      { traveler: 'Soukayna', emd: '057-4240209919' },
      { traveler: 'Zakaria', emd: '057-4237615854' },
    ],
  },
];

export const hotels: HotelInfo[] = [
  {
    id: 'tokyo-hotel',
    city: 'Tokyo',
    name: 'Grand Prince Hotel Takanawa',
    googleRating: 4.3,
    googleReviewCount: 3100,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=Grand+Prince+Hotel+Takanawa',
    breakfastPrice: 'Tarif à confirmer directement auprès de l’hôtel',
    breakfastHours: '06:30 – 10:00 · horaires à reconfirmer',
    breakfastNote: 'Petit-déjeuner non inclus dans le circuit. Buffet au Grand Café PATIO ; demander le tarif 2026 et la gratuité éventuelle pour Adam, âgé de 18–19 mois.',
    breakfastSourceUrl: 'https://www.princehotels.com/takanawa/restaurants/grand-cafe-patio/',
    gymStatus: 'limited',
    gymName: 'Fitness Room · complexe Takanawa',
    gymVerdict: 'Cardio et renforcement léger sur place',
    gymEquipment: 'Salle de fitness annoncée par l’hôtel. Vérifier à la réception l’accès exact et la présence de poids libres avant une séance de musculation.',
    gymHours: 'Horaire à confirmer au check-in',
    gymAccess: 'Réservée aux clients · conditions d’âge à confirmer',
    gymSourceUrl: 'https://www.princehotels.com/takanawa/',
    laundryName: 'Coin Laundry WASH CAMP Takanawa',
    laundryType: 'Laverie automatique extérieure · libre-service',
    laundryAddress: 'Takanawa, Minato City, Tokyo · adresse exacte dans l’itinéraire',
    laundryNote: 'Option automatique à proximité : pas de conciergerie ni dépôt de linge. Vérifier la disponibilité sur Maps avant le départ.',
    laundryMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Prince+Hotel+Takanawa&destination=coin+laundry+Takanawa+Tokyo&travelmode=walking',
    laundryWalkTime: '≈ 10–15 min à pied · estimation',
    laundryHours: 'Horaires affichés dans Maps · à vérifier',
    laundryDays: 'Jours d’ouverture à vérifier',
    laundryAveragePrice: '≈ 800–1 200 ¥ (≈ 4–7 €) lavage + séchage · estimation',
    supermarketName: '7-Eleven · Grand Prince Hotel Takanawa',
    supermarketAddress: '3-13-1 Takanawa, Minato-ku, Tokyo 108-8612, Japon',
    supermarketNote: 'Sur place pour l’eau, les encas et les produits essentiels. Pour de grandes courses, utiliser Wing Takanawa près de Shinagawa.',
    supermarketMapUrl: 'https://www.princehotels.com/takanawa/facility/convenience-store-7-eleven/',
    supermarketWalkTime: 'Sur place · 0–2 min',
    supermarketHours: 'Horaires à vérifier auprès de l’hôtel',
    supermarketDays: 'Tous les jours',
    pharmacyName: 'Tomod’s · Shinagawa Intercity',
    pharmacyAddress: 'Shinagawa Intercity, Konan, Minato-ku, Tokyo',
    pharmacyNote: 'Drugstore pratique près de Shinagawa ; vérifier les médicaments disponibles et les horaires le jour même.',
    pharmacyMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Prince+Hotel+Takanawa&destination=Tomods+Shinagawa+Intercity&travelmode=walking',
    pharmacyWalkTime: '≈ 12 min à pied · estimation',
    pharmacyHours: 'Horaires à vérifier dans Maps',
    pharmacyDays: 'Jours variables',
    souvenirName: 'ecute Shinagawa · boutiques cadeaux',
    souvenirAddress: 'Dans la gare JR Shinagawa, Minato-ku, Tokyo',
    souvenirNote: 'Meilleur choix proche pour un aimant Tokyo et des souvenirs japonais. L’accès à certaines boutiques peut nécessiter de passer les portiques JR.',
    souvenirMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Prince+Hotel+Takanawa&destination=ecute+Shinagawa&travelmode=walking',
    souvenirWalkTime: '≈ 7–10 min à pied',
    souvenirHours: 'Environ 08:00 – 22:00 · selon boutique',
    souvenirDays: 'Tous les jours · selon boutique',
    souvenirOfficialUrl: 'https://www.ecute.jp/shinagawa',
    electronicsName: 'LABI LIFE SELECT Shinagawa Oimachi',
    electronicsAddress: 'Oimachi, Shinagawa-ku, Tokyo',
    electronicsNote: 'Grand magasin d’électronique et d’électroménager avec appareils de voyage, adaptateurs, beauté, informatique, jouets et détaxe.',
    electronicsMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Prince+Hotel+Takanawa&destination=LABI+LIFE+SELECT+Shinagawa+Oimachi&travelmode=transit',
    electronicsTravelTime: '≈ 15 min en train + marche',
    electronicsHours: '10:00 – 21:00 · à vérifier',
    electronicsDays: 'Tous les jours',
    electronicsOfficialUrl: 'https://www.yamada-denki.jp/store/contents/?d=247',
    mallName: 'Wing Takanawa',
    mallRating: 4.1,
    mallAddress: '4-10-18 Takanawa, Minato-ku, Tokyo',
    mallNote: 'Centre commercial directement face à la sortie Takanawa de Shinagawa : boutiques, restaurants et services, pratique avec une poussette.',
    mallMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Prince+Hotel+Takanawa&destination=Wing+Takanawa&travelmode=walking',
    mallTravelTime: '≈ 5–7 min à pied',
    mallHours: '11:00 – 21:00 · restaurants variables',
    mallDays: 'Tous les jours · fermetures exceptionnelles possibles',
    mallWebsiteUrl: 'https://www.wing-net.ne.jp/takanawa/',
    metroName: 'Takanawadai (A06)',
    metroDetail: 'Ligne Toei Asakusa · suivre le parcours ascenseur',
    metroWalkTime: '≈ 3 min à pied',
    metroScheduleUrl: 'https://www.kotsu.metro.tokyo.jp/eng/subway_stations/takanawadai.html',
    metroAccessibility: 'Poussette validée · sans escalier',
    metroAccessibilityNote: 'Station équipée d’ascenseurs ; suivre les pictogrammes plutôt que la sortie la plus courte avec escalier.',
    metroAccessibilityUrl: 'https://www.kotsu.metro.tokyo.jp/subway/stations/takanawadai.html',
    busName: 'Navette gratuite Prince · Shinagawa',
    busDetail: 'Navette entre Shinagawa Prince Hotel et le complexe Takanawa',
    busWalkTime: 'Prise en charge dans le complexe / Shinagawa',
    busScheduleUrl: 'https://www.princehotels.com/takanawa/location/',
    busAccessibility: 'Poussette pliée recommandée',
    busAccessibilityNote: 'Navette pratique pour éviter la montée depuis Shinagawa. Confirmer l’horaire et l’emplacement exact auprès de la réception.',
  },
  {
    id: 'kyoto-hotel',
    city: 'Kyoto',
    name: 'Kyoto Brighton Hotel',
    googleRating: 4.4,
    googleReviewCount: 3061,
    googleUrl: 'https://www.google.com/travel/hotels/entity/ChkIjbDz0qmy7OjnARoML2cvMTJ6N2dtdzExEAE',
    breakfastPrice: '3 700 ¥ (≈ 20 €) / adulte',
    breakfastChildPrice: '1 900 ¥ (≈ 10 €) / enfant de 4 à 12 ans · ne concerne pas Adam',
    breakfastHours: '07:00 - 10:30 (buffet Ferrie)',
    breakfastNote: 'Buffet ou petit-déjeuner japonais. Option continentale à 2 000 ¥ (≈ 11 €). Adam aura 18–19 mois : tarif bébé à confirmer.',
    breakfastSourceUrl: 'https://kyoto.brightonhotels.co.jp/restaurant/lp/breakfast',
    gymStatus: 'none',
    gymName: 'Aucune salle de fitness',
    gymVerdict: 'Pas de musculation sur place',
    gymEquipment: 'L’hôtel confirme officiellement ne disposer ni d’une salle de fitness ni d’une piscine.',
    gymHours: 'Non applicable',
    gymAccess: 'Il faudra prévoir une salle extérieure si vous souhaitez vous entraîner à Kyoto.',
    gymSourceUrl: 'https://kyoto.brightonhotels.co.jp/q_a/?cont=etc',
    laundryName: 'Sentakukan Imadegawa Shinmachi',
    laundryType: 'Laverie automatique extérieure · libre-service',
    laundryAddress: '281 Horidashicho, Kamigyo-ku, Kyoto 602-0931, Japon',
    laundryNote: 'Lavage et séchage automatiques, sans dépôt ni service de conciergerie.',
    laundryMapUrl: 'https://www.google.com/maps/search/?api=1&query=Sentakukan+Imadegawa+Shinmachi+Kyoto',
    laundryWalkTime: '≈ 8 min à pied',
    laundryHours: '24h/24',
    laundryDays: 'Tous les jours',
    laundryAveragePrice: '≈ 1 100 ¥ (≈ 6 €) lavage + séchage · estimation',
    supermarketName: 'Fresco Petit Karasuma Imadegawa',
    supermarketAddress: '313 Imadegawacho, Kamigyo-ku, Kyoto 602-0033, Japon',
    supermarketNote: 'Petit supermarché près de la station Imadegawa, adapté aux courses d’appoint.',
    supermarketMapUrl: 'https://www.google.com/maps/search/?api=1&query=Fresco+Petit+Karasuma+Imadegawa+Kyoto',
    supermarketWalkTime: '≈ 10 min à pied',
    supermarketHours: '24h/24',
    supermarketDays: 'Tous les jours',
    pharmacyName: 'Futaba Pharmacy',
    pharmacyAddress: '344-2 Haruobicho, Shinmachi-dori, Kamigyo-ku, Kyoto, Japon',
    pharmacyNote: 'Pharmacie de quartier vers Marutamachi.',
    pharmacyMapUrl: 'https://www.google.com/maps/search/?api=1&query=Futaba+Pharmacy+Haruobicho+Kyoto',
    pharmacyWalkTime: '≈ 10 min à pied',
    pharmacyHours: '09:00 – 17:30',
    pharmacyDays: 'Lun–ven · fermée sam, dim et jours fériés',
    souvenirName: 'Boutique du Kyoto Gyoen Nakadachiuri Rest House',
    souvenirAddress: '3 Kyoto Gyoen, Kamigyo-ku, Kyoto 602-0881, Japon',
    souvenirNote: 'Boutique de souvenirs du jardin impérial, avec produits originaux de Kyoto Gyoen. Demander « magnet » ou マグネット ; le stock et les motifs changent selon la saison.',
    souvenirMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kyoto+Brighton+Hotel&destination=Kyoto+Gyoen+Nakadachiuri+Rest+House&travelmode=walking',
    souvenirWalkTime: '≈ 8 min à pied',
    souvenirHours: '09:00 – 16:30 en octobre',
    souvenirDays: 'Tous les jours · fermetures exceptionnelles possibles',
    souvenirOfficialUrl: 'https://nakadachiuri.jp/shop/',
    electronicsName: 'Yodobashi Camera Multimedia Kyoto',
    electronicsAddress: '590-2 Higashishiokojicho, Shimogyo-ku, Kyoto 600-8216, Japon',
    electronicsNote: 'Très grand choix d’électroménager, photo, téléphones, accessoires et adaptateurs. Le complexe est relié à Kyoto Station et prête des poussettes à l’accueil.',
    electronicsMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Kyoto+Brighton+Hotel&destination=Yodobashi+Camera+Multimedia+Kyoto&travelmode=transit',
    electronicsTravelTime: '≈ 25 min en métro + marche · 15 min en taxi',
    electronicsHours: '09:30 – 22:00',
    electronicsDays: 'Tous les jours',
    electronicsOfficialUrl: 'https://www.yodobashi-kyoto.com/information/index.html',
    mallName: 'Kyoto BAL',
    mallRating: 4.1,
    mallAddress: '251 Yamazakicho, Kawaramachi Sanjo-sagaru, Nakagyo-ku, Kyoto 604-8032, Japon',
    mallNote: 'Sélection mieux notée et plus agréable que les petites galeries proches : Muji, Maruzen, mode, maison, cafés et plusieurs étages accessibles par ascenseur.',
    mallMapUrl: 'https://www.google.com/maps/search/?api=1&query=Kyoto+BAL',
    mallTravelTime: '≈ 10 min en taxi · 25 min en bus',
    mallHours: '11:00 – 20:00',
    mallDays: 'Tous les jours · horaires boutiques variables',
    mallWebsiteUrl: 'https://www.bal-bldg.com/kyoto/',
    metroName: 'Imadegawa (K06)',
    metroDetail: 'Ligne Karasuma · sortie 3 avec ascenseur',
    metroWalkTime: '≈ 10 min à pied',
    metroScheduleUrl: 'https://www2.city.kyoto.lg.jp/kotsu/tikadia/hyperdia/menu0216.htm',
    metroAccessibility: 'Poussette validée · sans escalier',
    metroAccessibilityNote: 'Ascenseur rue → hall à la sortie 3, puis ascenseur du hall au quai via le portillon sud. La sortie 6 annoncée par l’hôtel comporte des escaliers.',
    metroAccessibilityUrl: 'https://www.city.kyoto.lg.jp/kotsu/page/0000009419.html',
    busName: 'Horikawa Nakadachiuri',
    busDetail: 'Kyoto City Bus · lignes 9, 12, 50 et 67',
    busWalkTime: '≈ 6 min à pied',
    busScheduleUrl: 'https://www2.city.kyoto.lg.jp/kotsu/busdia/hyperdia/menu181.htm',
    busAccessibility: 'Privilégier un bus surbaissé',
    busAccessibilityNote: 'Arrêt au niveau du trottoir. Vérifier le pictogramme de bus surbaissé à l’approche ; poussette pliable conseillée aux heures de pointe.',
  },
  {
    id: 'osaka-hotel',
    city: 'Osaka',
    name: 'Hotel New Otani Osaka',
    googleRating: 4.1,
    googleReviewCount: 6000,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+New+Otani+Osaka',
    breakfastPrice: 'Tarif 2026 à confirmer auprès de l’hôtel',
    breakfastHours: '07:00 – 10:00 · à reconfirmer',
    breakfastNote: 'Petit-déjeuner non inclus dans le circuit. Plusieurs formules sont proposées ; demander le prix adulte et les conditions pour Adam, âgé de 18–19 mois.',
    breakfastSourceUrl: 'https://www.newotani.co.jp/en/osaka/restaurant/breakfast/',
    gymStatus: 'partner',
    gymName: 'Fitness Club · 4e étage',
    gymVerdict: 'Musculation possible sur place · accès payant',
    gymEquipment: 'Club membre avec appareils cardio et de musculation ; demander la liste des poids libres à la réception.',
    gymHours: 'Lun–ven 07:00–10:00 et 12:00–22:00 · sam/dim/fériés 07:00–20:00',
    gymAccess: '3 850 ¥ (≈ 21 €) par visite pour les clients · dernière entrée 1 h avant fermeture',
    gymSourceUrl: 'https://www.newotani.co.jp/en/osaka/faq/other01/',
    laundryName: 'Coin Laundry · secteur Kyobashi',
    laundryType: 'Laverie automatique extérieure · libre-service',
    laundryAddress: 'Kyobashi, Miyakojima-ku, Osaka · destination exacte dans l’itinéraire',
    laundryNote: 'L’hôtel ne possède pas de laverie automatique, uniquement un service de blanchisserie. Ce lien cherche la laverie libre-service la plus proche autour de Kyobashi.',
    laundryMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+New+Otani+Osaka&destination=coin+laundry+Kyobashi+Osaka&travelmode=walking',
    laundryWalkTime: '≈ 12–18 min à pied · estimation',
    laundryHours: 'Souvent 24h/24 · vérifier la fiche choisie',
    laundryDays: 'À vérifier avant le trajet',
    laundryAveragePrice: '≈ 800–1 200 ¥ (≈ 4–7 €) lavage + séchage · estimation',
    supermarketName: 'Seijo Ishii · Keihan Mall Kyobashi',
    supermarketAddress: '2-1-38 Higashinodamachi, Miyakojima-ku, Osaka',
    supermarketNote: 'Supermarché complet à Kyobashi. Pour une course immédiate, un 7-Eleven se trouve dans le bâtiment Yomiuri TV voisin.',
    supermarketMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+New+Otani+Osaka&destination=Seijo+Ishii+Keihan+Mall+Kyobashi&travelmode=walking',
    supermarketWalkTime: '≈ 8–10 min à pied',
    supermarketHours: '10:00 – 21:00 · à vérifier',
    supermarketDays: 'Tous les jours',
    pharmacyName: 'Matsumoto Kiyoshi · Keihan Mall Kyobashi',
    pharmacyAddress: 'Keihan Mall, Kyobashi, Osaka',
    pharmacyNote: 'Drugstore avec médicaments courants, produits bébé et hygiène.',
    pharmacyMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+New+Otani+Osaka&destination=Matsumoto+Kiyoshi+Keihan+Mall+Kyobashi&travelmode=walking',
    pharmacyWalkTime: '≈ 8–10 min à pied',
    pharmacyHours: '10:00 – 21:00 · à vérifier',
    pharmacyDays: 'Tous les jours · fermetures du centre possibles',
    souvenirName: 'Osaka Castle Museum Shop',
    souvenirAddress: '1-1 Osakajo, Chuo-ku, Osaka',
    souvenirNote: 'Choix fiable pour des aimants Osaka et château d’Osaka. Prévoir l’achat pendant la visite du secteur.',
    souvenirMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+New+Otani+Osaka&destination=Osaka+Castle+Museum+Shop&travelmode=walking',
    souvenirWalkTime: '≈ 15–20 min à pied',
    souvenirHours: '09:00 – 17:00 · dernière entrée variable',
    souvenirDays: 'Tous les jours · fermetures exceptionnelles possibles',
    souvenirOfficialUrl: 'https://www.osakacastle.net/english/',
    electronicsName: 'EDION · Keihan Mall Kyobashi',
    electronicsAddress: 'Keihan Mall, Kyobashi, Osaka',
    electronicsNote: 'Le grand magasin d’électronique le plus pratique depuis l’hôtel : électroménager, informatique, photo, accessoires, adaptateurs et détaxe.',
    electronicsMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+New+Otani+Osaka&destination=EDION+Kyobashi+Osaka&travelmode=walking',
    electronicsTravelTime: '≈ 8–12 min à pied',
    electronicsHours: '10:00 – 21:00 · à vérifier',
    electronicsDays: 'Tous les jours',
    electronicsOfficialUrl: 'https://www.edion.com/',
    mallName: 'Keihan Mall Kyobashi',
    mallRating: 4.2,
    mallAddress: '2-1-38 Higashinodamachi, Miyakojima-ku, Osaka',
    mallNote: 'Meilleur compromis proche : nombreuses boutiques, alimentation, restaurants, pharmacie et accès par ascenseur.',
    mallMapUrl: 'https://www.google.com/maps/dir/?api=1&origin=Hotel+New+Otani+Osaka&destination=Keihan+Mall+Kyobashi&travelmode=walking',
    mallTravelTime: '≈ 8–10 min à pied',
    mallHours: 'Boutiques 10:30 – 20:30 · restaurants variables',
    mallDays: 'Tous les jours · horaires variables selon l’enseigne',
    mallWebsiteUrl: 'https://keihan-mall.jp/',
    metroName: 'Osaka Business Park (N21)',
    metroDetail: 'Ligne Nagahori Tsurumi-ryokuchi · suivre le parcours ascenseur',
    metroWalkTime: '≈ 3 min à pied',
    metroScheduleUrl: 'https://subway.osakametro.co.jp/en/station_guide/N/n21/',
    metroAccessibility: 'Poussette validée · sans escalier',
    metroAccessibilityNote: 'Privilégier cette station de métro avec ascenseurs. Osaka-jō-kōen est aussi à 3 min mais certains accès comportent des escaliers.',
    metroAccessibilityUrl: 'https://subway.osakametro.co.jp/en/station_guide/N/n21/',
    busName: 'Osaka Business Park',
    busDetail: 'Arrêts urbains du quartier Osaka Castle / OBP',
    busWalkTime: '≈ 3–5 min à pied',
    busScheduleUrl: 'https://www.osakametro.co.jp/en/',
    busAccessibility: 'Privilégier un bus urbain surbaissé',
    busAccessibilityNote: 'Pour les bagages et la poussette, le métro N21 ou un taxi reste plus simple que les autocars à marches.',
  },
  {
    id: 'seoul-hotel',
    city: 'Seoul',
    name: 'The Ambassador Seoul - A Pullman Hotel',
    googleRating: 4.2,
    googleReviewCount: 3900,
    googleUrl: 'https://www.google.com/maps/search/?api=1&query=The+Ambassador+Seoul+A+Pullman+Hotel',
    breakfastPrice: 'Tarif 2026 à confirmer auprès de l’hôtel',
    breakfastChildPrice: 'Tarif bébé à confirmer · Adam aura 18–19 mois',
    breakfastHours: '06:30 – 10:00 · à reconfirmer',
    breakfastNote: 'Petit-déjeuner non inclus dans le circuit. Buffet au restaurant The King’s ; confirmer le tarif et les conditions pour Adam.',
    breakfastSourceUrl: 'https://ambatelen.com/theambassador/seoul/en/dining.do',
    gymStatus: 'strength',
    gymName: 'Wellness Center · niveau B1',
    gymVerdict: 'Meilleur choix du séjour pour la musculation',
    gymEquipment: 'Fitness, piscine intérieure, yoga et Pilates. La présence de poids libres est à confirmer à la réception.',
    gymHours: 'Horaires à confirmer au check-in',
    gymAccess: 'Accès clients selon le type de chambre · restrictions d’âge possibles',
    gymSourceUrl: 'https://ambatelen.com/theambassador/seoul/en/main.do',
    laundryName: 'Self-service coin laundry · secteur Chungmuro',
    laundryType: 'Laverie automatique extérieure · libre-service',
    laundryAddress: 'Chungmuro / Jangchung-dong, Jung-gu, Seoul · destination exacte dans Naver Map',
    laundryNote: 'Laverie automatique extérieure, sans service de conciergerie. Vérifier la fiche la plus proche dans Naver Map le jour même.',
    laundryMapUrl: 'https://map.naver.com/p/search/%EB%8F%99%EA%B5%AD%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD%20%EC%BD%94%EC%9D%B8%EC%84%B8%ED%83%81%EB%B0%A9',
    laundryWalkTime: '≈ 10–15 min à pied · estimation',
    laundryHours: '24h/24 · à confirmer sur place',
    laundryDays: 'Tous les jours · à confirmer',
    laundryAveragePrice: '≈ 8 000 ₩ (≈ 5 €) lavage + séchage · estimation',
    supermarketName: '1955 Groceria · hôtel + supérettes Jangchung-dong',
    supermarketAddress: '287 Dongho-ro, Jung-gu, Seoul 04618',
    supermarketNote: 'Épicerie sur place pour l’appoint. Pour eau et produits bébé, comparer aussi CU/GS25 autour de Dongguk University.',
    supermarketMapUrl: 'https://www.google.com/maps/search/?api=1&query=supermarket+near+The+Ambassador+Seoul+A+Pullman',
    supermarketWalkTime: 'Sur place ou ≈ 5–8 min à pied',
    supermarketHours: 'Horaires à vérifier sur place',
    supermarketDays: 'Jours variables · vérifier avant le trajet',
    pharmacyName: 'Pharmacie · Dongguk University Station',
    pharmacyAddress: 'Jangchung-dong, Jung-gu, Seoul',
    pharmacyNote: 'Pharmacie la plus pratique autour de la station ; utiliser Naver Map pour confirmer celle ouverte au moment du besoin.',
    pharmacyMapUrl: 'https://map.naver.com/p/search/%EB%8F%99%EA%B5%AD%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD%20%EC%95%BD%EA%B5%AD',
    pharmacyWalkTime: '≈ 5–8 min à pied',
    pharmacyHours: 'Horaires variables · vérifier dans Naver Map',
    pharmacyDays: 'Jours variables',
    souvenirName: 'DDP Design Store',
    souvenirAddress: 'Dongdaemun Design Plaza, 281 Eulji-ro, Jung-gu, Seoul',
    souvenirNote: 'Très bon choix pour un aimant Seoul au design coréen et des souvenirs de qualité.',
    souvenirMapUrl: 'https://map.naver.com/p/search/DDP%20Design%20Store',
    souvenirWalkTime: '≈ 18 min à pied · 7 min en taxi',
    souvenirHours: '10:00 – 20:00 · à vérifier',
    souvenirDays: 'Tous les jours',
    souvenirOfficialUrl: 'https://company.artbox.kr/OfflineStore.asp',
    electronicsName: 'Lotte Hi-Mart · Seoul Station',
    electronicsAddress: 'Seoul Station, Jung-gu / Yongsan, Seoul',
    electronicsNote: 'Grande enseigne coréenne d’électroménager et d’appareils intelligents. Magasin détaxé ; accès direct depuis la sortie 6 de Daechi Station.',
    electronicsMapUrl: 'https://map.naver.com/p/search/%EB%A1%AF%EB%8D%B0%ED%95%98%EC%9D%B4%EB%A7%88%ED%8A%B8%20%EC%84%9C%EC%9A%B8%EC%97%AD',
    electronicsTravelTime: '≈ 15 min en taxi',
    electronicsHours: 'Horaires à vérifier dans Naver Map le jour même',
    electronicsDays: 'Ouverture variable',
    electronicsOfficialUrl: 'https://english.visitkorea.or.kr/svc/whereToGo/locIntrdn/rgnContentsView.do?vcontsId=144851',
    mallName: 'Hyundai City Outlet Dongdaemun',
    mallRating: 4.2,
    mallAddress: '20 Jangchungdan-ro 13-gil, Jung-gu, Seoul',
    mallNote: 'Meilleur centre commercial proche : nombreuses boutiques, restaurants, ascenseurs et services pratiques avec une poussette.',
    mallMapUrl: 'https://map.naver.com/p/search/%ED%98%84%EB%8C%80%EC%8B%9C%ED%8B%B0%EC%95%84%EC%9A%B8%EB%A0%9B%20%EB%8F%99%EB%8C%80%EB%AC%B8%EC%A0%90',
    mallTravelTime: '≈ 8 min en taxi · 20–25 min à pied',
    mallHours: '10:30 – 21:00',
    mallDays: 'Tous les jours · certaines boutiques varient',
    mallWebsiteUrl: 'https://www.ehyundai.com/',
    metroName: 'Dongguk University (ligne 3)',
    metroDetail: 'Sortie 1 ou 6 · suivre les pictogrammes ascenseur',
    metroWalkTime: '≈ 5 min à pied',
    metroScheduleUrl: 'https://map.naver.com/p/search/%EC%8B%A0%EB%85%BC%ED%98%84%EC%97%AD',
    metroAccessibility: 'Poussette validée · ascenseurs',
    metroAccessibilityNote: 'L’hôtel indique 5 min depuis les sorties 1 ou 6. Pour la poussette, suivre le cheminement ascenseur même s’il rallonge légèrement la marche.',
    metroAccessibilityUrl: 'https://world.seoul.go.kr/service/movement/public-transportation/subway-accessibility-facilities/',
    busName: 'Dongguk University / Jangchung Culture & Sports Center',
    busDetail: 'Bus 7212, 144, 301 et 420 · limousine aéroport 6702',
    busWalkTime: '≈ 5 min à pied',
    busScheduleUrl: 'https://ambatelen.com/theambassador/seoul/en/main.do',
    busAccessibility: 'Poussette pliée dans l’autocar',
    busAccessibilityNote: 'Pour les bus urbains, privilégier un véhicule surbaissé. La limousine 6702 possède des marches : plier la poussette et la placer en soute.',
  },
];

export const initialExpenses: Expense[] = [
  { id: 'food', label: 'Repas & cafes', amount: 900, category: 'Repas' },
  { id: 'local', label: 'Transports locaux', amount: 350, category: 'Transport' },
  { id: 'activities', label: 'Activites optionnelles', amount: 600, category: 'Activites' },
  { id: 'shopping', label: 'Shopping & souvenirs', amount: 500, category: 'Shopping' },
];

export const statusLabels: Record<TaskStatus, string> = {
  todo: 'A faire',
  progress: 'En cours',
  done: 'Termine',
};

export const cityColors: Record<City, string> = {
  Paris: 'bg-stone-700',
  Tokyo: 'bg-rose-600',
  Kyoto: 'bg-amber-600',
  Osaka: 'bg-orange-600',
  Seoul: 'bg-teal-700',
};
