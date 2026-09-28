export type MealKind = 'breakfast' | 'lunch' | 'dinner';
export type DiningKind = 'fish' | 'halal';

export interface NearbyMealSpot {
  name: string;
  style: string;
  walkTime: string;
  budget: '€' | '€€' | '€€€';
  order: string;
  note: string;
  mapUrl: string;
  sourceUrl: string;
  assurance?: string;
}

export interface HotelMealGuide {
  breakfast: NearbyMealSpot[];
  lunch: NearbyMealSpot[];
  dinner: NearbyMealSpot[];
  note?: string;
}

export interface HotelDiningGuide {
  fish: HotelMealGuide;
  halal: HotelMealGuide;
}

const mapsDirections = (origin: string, destination: string, travelmode: 'walking' | 'transit' | 'driving' = 'walking'): string =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${travelmode}`;

const tokyoOrigin = 'Grand Prince Hotel Takanawa';
const shimizu: NearbyMealSpot = {
  name: 'Shimizu Japanese Restaurant',
  style: 'Sushi, poisson grillé & kaiseki · hôtel',
  walkTime: '3–5 min à pied',
  budget: '€€€',
  order: 'Petit-déjeuner japonais au poisson, sushi ou poisson de saison',
  note: 'La valeur sûre la plus proche. Ouvert au petit-déjeuner, au déjeuner et au dîner ; réserver le comptoir à sushi.',
  mapUrl: mapsDirections(tokyoOrigin, 'Shimizu Japanese Restaurant Shin Takanawa'),
  sourceUrl: 'https://www.princehotels.com/shintakanawa/restaurants/shimizu-japanese-restaurant/',
};
const zakuro: NearbyMealSpot = {
  name: 'Slope Side Diner ZAKURO',
  style: 'Buffet japonais · sushi & poisson',
  walkTime: '3–5 min à pied',
  budget: '€€€',
  order: 'Poisson grillé, riz japonais et sélection de sushi selon le service',
  note: 'Option confortable dans le complexe Prince. Vérifier la sélection de poisson du jour.',
  mapUrl: mapsDirections(tokyoOrigin, 'Slope Side Diner Zakuro'),
  sourceUrl: 'https://www.princehotels.com/shintakanawa/restaurants/',
};
const toriton: NearbyMealSpot = {
  name: 'Kaiten Sushi Toriton · atré Shinagawa',
  style: 'Sushi sur tapis roulant · familial',
  walkTime: '10–12 min à pied',
  budget: '€€',
  order: 'Assortiment de nigiri, saumon, thon et poissons de saison',
  note: 'Très pratique avec un enfant, directement dans atré Shinagawa.',
  mapUrl: mapsDirections(tokyoOrigin, 'Kaiten Sushi Toriton Atre Shinagawa'),
  sourceUrl: 'https://www.atre.co.jp/shinagawa/caferestaurant/?category=washoku',
};
const oysterTokyo: NearbyMealSpot = {
  name: 'Grand Central Oyster Bar · atré Shinagawa',
  style: 'Huîtres & fruits de mer',
  walkTime: '10–12 min à pied',
  budget: '€€€',
  order: 'Huîtres, chowder et poisson du jour',
  note: 'Bon choix pour un vrai dîner seafood près de la gare ; réservation conseillée.',
  mapUrl: mapsDirections(tokyoOrigin, 'Grand Central Oyster Bar Atre Shinagawa'),
  sourceUrl: 'https://www.atre.co.jp/shinagawa/caferestaurant/',
};
const halalShinagawa: NearbyMealSpot = {
  name: 'Café & Party Garden SHINAGAWA',
  style: 'Cuisine indienne & pancakes',
  walkTime: '7–10 min à pied',
  budget: '€€',
  order: 'Curry halal, riz, naan ou pancakes à la farine de riz',
  note: 'L’adresse halal vérifiée la plus proche. Ouverture à 11:00 : convient au brunch, au déjeuner ou au dîner, pas aux départs matinaux.',
  mapUrl: mapsDirections(tokyoOrigin, 'Cafe Party Garden Shinagawa'),
  sourceUrl: 'https://www.princehotels.co.jp/shinagawa/restaurant/cafe%26partygardenshinagawa/',
  assurance: 'Certifié Japan Halal Foundation',
};
const halalSakura: NearbyMealSpot = {
  name: 'Halal Sakura · Shinagawa Seaside',
  style: 'Cuisine japonaise halal',
  walkTime: '15–20 min en taxi',
  budget: '€€',
  order: 'Ramen, curry ou plat japonais halal',
  note: 'Alternative halal dans l’arrondissement de Shinagawa. Vérifier l’horaire le jour même.',
  mapUrl: mapsDirections(tokyoOrigin, 'Halal Sakura Shinagawa Seaside', 'driving'),
  sourceUrl: 'https://www.gotokyo.org/book/wp-content/uploads/2025/03/2503_muslim_low_EN.pdf',
  assurance: 'Répertorié par GO TOKYO Muslim Travelers’ Guide',
};

const kyotoOrigin = 'Kyoto Brighton Hotel';
const hotaru: NearbyMealSpot = {
  name: 'Hotaru · Kyoto Brighton',
  style: 'Poisson de saison & kaiseki · hôtel',
  walkTime: 'Sur place',
  budget: '€€€',
  order: 'Petit-déjeuner japonais, poisson grillé ou menu kaiseki de saison',
  note: 'Le choix poisson le plus simple avec Adam, disponible du petit-déjeuner au dîner.',
  mapUrl: mapsDirections(kyotoOrigin, 'Hotaru Kyoto Brighton Hotel'),
  sourceUrl: 'https://kyoto.brightonhotels.co.jp/en/',
};
const nakauFish: NearbyMealSpot = {
  name: 'Nakau · Karasuma Imadegawa',
  style: 'Petit-déjeuner japonais · saumon',
  walkTime: '10–12 min à pied',
  budget: '€',
  order: 'Riz, saumon grillé et soupe miso',
  note: 'Option rapide dès le matin avant le métro ou une excursion.',
  mapUrl: mapsDirections(kyotoOrigin, 'Nakau Karasuma Imadegawa'),
  sourceUrl: 'https://maps.nakau.co.jp/jp/detail/2067.html',
};
const himorogi: NearbyMealSpot = {
  name: 'Himorogi · Kyoto Brighton',
  style: 'Teppanyaki de fruits de mer · hôtel',
  walkTime: 'Sur place',
  budget: '€€€',
  order: 'Poisson frais, homard ou coquillages au teppan',
  note: 'Très proche et spectaculaire ; demander une table compatible avec Adam lors de la réservation.',
  mapUrl: mapsDirections(kyotoOrigin, 'Himorogi Kyoto Brighton Hotel'),
  sourceUrl: 'https://kyoto.brightonhotels.co.jp/en/',
};
const kakanSeafood: NearbyMealSpot = {
  name: 'Kakan · Kyoto Brighton',
  style: 'Fruits de mer cantonais · hôtel',
  walkTime: 'Sur place',
  budget: '€€€',
  order: 'Homard, ormeau ou poisson cuisiné à la cantonaise',
  note: 'Option assise et familiale sans déplacement supplémentaire.',
  mapUrl: mapsDirections(kyotoOrigin, 'Kakan Kyoto Brighton Hotel'),
  sourceUrl: 'https://kyoto.brightonhotels.co.jp/en/',
};
const leTempsHalal: NearbyMealSpot = {
  name: 'Le Temps · Hotel Granvia Kyoto',
  style: 'Menu halal / Muslim Friendly',
  walkTime: '15 min en taxi',
  budget: '€€€',
  order: 'Menu halal réservé à l’avance',
  note: 'Option fiable près de Kyoto Station. Confirmer que le menu halal est proposé au service souhaité.',
  mapUrl: mapsDirections(kyotoOrigin, 'Cafe Restaurant Le Temps Hotel Granvia Kyoto', 'driving'),
  sourceUrl: 'https://kyoto.travel/en/muslim/finding-halal-food/',
  assurance: 'Muslim Friendly · contrôlé par Muslim Friendly Kyoto',
};
const rajuKyoto: NearbyMealSpot = {
  name: 'Raju · Kyodai-mae',
  style: 'Cuisine indienne halal',
  walkTime: '12–15 min en taxi',
  budget: '€€',
  order: 'Curry, biryani, riz et naan',
  note: 'L’un des restaurants entièrement halal les plus proches du Kyoto Brighton ; vérifier les horaires.',
  mapUrl: mapsDirections(kyotoOrigin, 'Raju Kyodai-mae Kyoto', 'driving'),
  sourceUrl: 'https://kyoto.travel/en/muslim/finding-halal-food/',
  assurance: 'Halal · contrôlé par Muslim Friendly Kyoto',
};
const istanbulKyoto: NearbyMealSpot = {
  name: 'Istanbul Saray',
  style: 'Cuisine turque halal',
  walkTime: '12–15 min en taxi',
  budget: '€€',
  order: 'Grillades halal, mezze et riz',
  note: 'Ouvert le soir en semaine ; le week-end, également au déjeuner.',
  mapUrl: mapsDirections(kyotoOrigin, 'Istanbul Saray Kyoto', 'driving'),
  sourceUrl: 'https://kyoto.travel/en/muslim/restaurant/2.html',
  assurance: 'Halal · contrôlé par Muslim Friendly Kyoto',
};

const osakaOrigin = 'Hotel New Otani Osaka';
const satsukiFish: NearbyMealSpot = {
  name: 'SATSUKI · New Otani Osaka',
  style: 'Buffet japonais · poisson',
  walkTime: 'Sur place',
  budget: '€€€',
  order: 'Poisson grillé, riz japonais et sélection du buffet',
  note: 'La seule option seafood réellement pratique dès le petit-déjeuner.',
  mapUrl: mapsDirections(osakaOrigin, 'Satsuki Hotel New Otani Osaka'),
  sourceUrl: 'https://www.newotani.co.jp/en/osaka/restaurant/',
};
const kenzan: NearbyMealSpot = {
  name: 'Sushi Kenzan · New Otani Osaka',
  style: 'Sushi Edo-mae · hôtel',
  walkTime: 'Sur place',
  budget: '€€€',
  order: 'Sushi de poissons et coquillages de saison',
  note: 'Le meilleur choix poisson sans quitter l’hôtel ; déjeuner et dîner.',
  mapUrl: mapsDirections(osakaOrigin, 'Sushi Kenzan Hotel New Otani Osaka'),
  sourceUrl: 'https://www.newotani.co.jp/en/osaka/restaurant/',
};
const isshin: NearbyMealSpot = {
  name: 'Isshin · New Otani Osaka',
  style: 'Sashimi, tempura & poisson grillé · hôtel',
  walkTime: 'Sur place',
  budget: '€€€',
  order: 'Sashimi, crevette et anguille tempura ou cabillaud miso',
  note: 'Déjeuner le week-end et dîner hors lundi. Réservation conseillée.',
  mapUrl: mapsDirections(osakaOrigin, 'Isshin Hotel New Otani Osaka'),
  sourceUrl: 'https://www.newotani.co.jp/en/osaka/restaurant/isshin/',
};
const newOtaniHalal: NearbyMealSpot = {
  name: 'Restaurants du New Otani · sur demande',
  style: 'Repas halal à organiser avec l’hôtel',
  walkTime: 'Sur place',
  budget: '€€€',
  order: 'Demander un menu sans porc ni alcool avec viande halal',
  note: 'Ce n’est pas une certification générale. Contacter l’hôtel à l’avance et obtenir une confirmation écrite pour chaque repas.',
  mapUrl: mapsDirections(osakaOrigin, osakaOrigin),
  sourceUrl: 'https://www.newotani.co.jp/kr/osaka/faq/restaurant/',
  assurance: 'Sur demande · non certifié globalement',
};
const alisKitchen: NearbyMealSpot = {
  name: 'Ali’s Kitchen · Shinsaibashi',
  style: 'Pakistanais & arabe halal',
  walkTime: '20–25 min en métro',
  budget: '€€',
  order: 'Biryani, kebab, curry ou poisson',
  note: 'Restaurant musulman, proche de la visite d’Osaka du 10 octobre plutôt que de l’hôtel.',
  mapUrl: mapsDirections(osakaOrigin, "Ali's Kitchen Shinsaibashi", 'transit'),
  sourceUrl: 'https://www.aliskitchen.jp/',
  assurance: 'Restaurant halal tenu par des propriétaires musulmans',
};
const naritayaOsaka: NearbyMealSpot = {
  name: 'Naritaya Osaka Minami',
  style: 'Cuisine japonaise halal',
  walkTime: '20–25 min en métro',
  budget: '€€',
  order: 'Ramen, yakiniku ou plat japonais halal',
  note: 'À combiner avec Namba ou Dotonbori ; vérifier horaires et réservation avant de partir.',
  mapUrl: mapsDirections(osakaOrigin, 'Naritaya Osaka Minami', 'transit'),
  sourceUrl: 'https://www.google.com/maps/search/?api=1&query=Naritaya+Osaka+Minami',
  assurance: 'Restaurant halal · vérifier la certification affichée sur place',
};

const seoulOrigin = 'The Ambassador Seoul - A Pullman Hotel';
const kingsSeafood: NearbyMealSpot = {
  name: 'The King’s · Ambassador Seoul',
  style: 'Buffet premium · seafood',
  walkTime: 'Sur place',
  budget: '€€€',
  order: 'Poisson, fruits de mer et préparations coréennes du buffet',
  note: 'Disponible du petit-déjeuner au dîner et équipé de vaisselle pour les moins de 5 ans.',
  mapUrl: mapsDirections(seoulOrigin, "The King's The Ambassador Seoul"),
  sourceUrl: 'https://ambatel.com/theambassador/seoul/en/diningList.do',
};
const damiPorridge: NearbyMealSpot = {
  name: 'Dami Porridge · Myeongdong',
  style: 'Porridge d’ormeau & fruits de mer',
  walkTime: '10–15 min en taxi',
  budget: '€€',
  order: 'Jeonbok-juk à l’ormeau ou porridge seafood aux champignons',
  note: 'Ouvert dès 07:00 et facile à manger avant une journée de visite.',
  mapUrl: mapsDirections(seoulOrigin, 'Dami Porridge Myeongdong', 'driving'),
  sourceUrl: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=59837',
};
const hamcho: NearbyMealSpot = {
  name: 'Hamcho Ganjang Gejang · Myeongdong',
  style: 'Crabe mariné & fruits de mer coréens',
  walkTime: '10–15 min en taxi',
  budget: '€€€',
  order: 'Ganjang-gejang, crevettes marinées, ormeau ou poulpe',
  note: 'Ouvert au déjeuner et au dîner. Certains plats disposent d’une option halal : la demander explicitement.',
  mapUrl: mapsDirections(seoulOrigin, 'Hamcho Ganjang Gejang Myeongdong', 'driving'),
  sourceUrl: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=138434',
  assurance: 'Certains plats halal · alcool servi sur place',
};
const seafoodMyeongdong: NearbyMealSpot = {
  name: 'Myeongdong Eomeonijip',
  style: 'Ragoût coréen de fruits de mer',
  walkTime: '10–15 min en taxi',
  budget: '€€',
  order: 'Haemultang ou ragoût épicé de poulpe',
  note: 'Adresse spécialisée seafood, ouverte au déjeuner et tard le soir.',
  mapUrl: mapsDirections(seoulOrigin, 'Myeongdong Eomeonijip', 'driving'),
  sourceUrl: 'https://english.visitseoul.net/restaurants/Myeongdong-Eomeonijip1/ENP013569',
};
const kampungku: NearbyMealSpot = {
  name: 'Kampungku · Myeongdong',
  style: 'Cuisine malaisienne halal',
  walkTime: '10–15 min en taxi',
  budget: '€€',
  order: 'Nasi goreng, ramen halal ou plat malaisien',
  note: 'Ouverture à 10:00 : possible en brunch, mais trop tard avant le rendez-vous de 08:40 du 13 octobre.',
  mapUrl: mapsDirections(seoulOrigin, 'Kampungku Restaurant Myeongdong', 'driving'),
  sourceUrl: 'https://english.visitkorea.or.kr/svc/contents/infoHtmlView.do?menuSn=177&vcontsId=138530',
  assurance: 'Halal auto-certifié par le propriétaire musulman',
};
const myeongdongjeong: NearbyMealSpot = {
  name: 'Myeongdongjeong',
  style: 'Cuisine royale coréenne · menu halal',
  walkTime: '8–12 min en taxi',
  budget: '€€€',
  order: 'Hanjeongsik halal, ormeau, crevettes et accompagnements coréens',
  note: 'Option coréenne raffinée pour le déjeuner ou le dîner ; pause de 15:00 à 17:00.',
  mapUrl: mapsDirections(seoulOrigin, 'Myeongdongjeong Seoul', 'driving'),
  sourceUrl: 'https://english.visitseoul.net/City-Hall-Area/Myeongdongjeong/ENPwiwz0p',
  assurance: 'Menu utilisant de la viande halal',
};

export const nearbyMealsByHotel: Record<string, HotelDiningGuide> = {
  [tokyoOrigin]: {
    fish: {
      breakfast: [shimizu, zakuro],
      lunch: [shimizu, toriton, oysterTokyo],
      dinner: [oysterTokyo, shimizu, toriton],
    },
    halal: {
      note: 'Aucune adresse halal certifiée proche n’ouvre tôt. Pour un départ matinal, acheter le petit-déjeuner la veille ou demander une solution scellée à l’hôtel.',
      breakfast: [halalShinagawa, halalSakura],
      lunch: [halalShinagawa, halalSakura],
      dinner: [halalShinagawa, halalSakura],
    },
  },
  [kyotoOrigin]: {
    fish: {
      breakfast: [hotaru, nakauFish],
      lunch: [hotaru, himorogi, kakanSeafood],
      dinner: [hotaru, himorogi, kakanSeafood],
    },
    halal: {
      note: 'Les menus halal japonais demandent souvent une réservation. Confirmer le service, les ustensiles et l’absence d’alcool dans la préparation.',
      breakfast: [leTempsHalal, rajuKyoto],
      lunch: [rajuKyoto, leTempsHalal, istanbulKyoto],
      dinner: [istanbulKyoto, rajuKyoto, leTempsHalal],
    },
  },
  [osakaOrigin]: {
    fish: {
      breakfast: [satsukiFish],
      lunch: [kenzan, isshin, satsukiFish],
      dinner: [kenzan, isshin, satsukiFish],
    },
    halal: {
      note: 'L’hôtel indique pouvoir traiter certaines demandes halal, sans certification générale. Obtenir une confirmation écrite ; sinon privilégier Ali’s Kitchen.',
      breakfast: [newOtaniHalal],
      lunch: [alisKitchen, naritayaOsaka, newOtaniHalal],
      dinner: [alisKitchen, naritayaOsaka, newOtaniHalal],
    },
  },
  [seoulOrigin]: {
    fish: {
      breakfast: [kingsSeafood, damiPorridge],
      lunch: [hamcho, seafoodMyeongdong, kingsSeafood],
      dinner: [seafoodMyeongdong, hamcho, kingsSeafood],
    },
    halal: {
      note: 'Le 13 octobre, aucun restaurant halal vérifié de cette sélection n’ouvre avant le rendez-vous de 08:40 : prévoir le petit-déjeuner la veille.',
      breakfast: [kampungku],
      lunch: [myeongdongjeong, kampungku, hamcho],
      dinner: [myeongdongjeong, kampungku, hamcho],
    },
  },
};
