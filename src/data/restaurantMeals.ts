import { halalRestaurants } from './restaurants';
import type { RestaurantCity } from './restaurants';

export const mealLabels = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner' } as const;
export type Meal = keyof typeof mealLabels;
interface MealPick { id: string; description: string; timing?: string; proximity?: string }
export const restaurantMeals: Record<RestaurantCity, Record<Meal, MealPick[]>> = {
  Tokyo: {
    breakfast: [
      {
            "id": "patio-takanawa",
            "description": "Buffet avec coin japonais : poisson grillé, riz et œufs préparés à la demande. Choisir les garnitures sans viande.",
            "timing": "6 h 30–11 h · sans réservation",
            "proximity": "Dans le Grand Prince Hotel Takanawa"
      },
      {
            "id": "ciliegio-sakura",
            "description": "Buffet avec poisson grillé et spécialités japonaises ; demander une omelette sans jambon.",
            "timing": "6 h 30–10 h 30 · dernière commande 10 h · sans réservation",
            "proximity": "Hôtel voisin dans le même complexe Prince"
      },
      {
            "id": "zakuro-shintakanawa",
            "description": "Buffet du matin dans le complexe Prince : demander les choix japonais au poisson ou aux œufs disponibles ce jour-là.",
            "timing": "6 h 30–10 h · choix adaptés à confirmer",
            "proximity": "Hôtel voisin dans le même complexe Prince"
      }
],
    lunch: [
      { id: 'shunpudou', description: 'Ramen au wagyu ou gyukatsu à Asakusa : pour découvrir le bœuf pané japonais.' },
      { id: 'sushiken', description: 'Sushis avec assaisonnements sans alcool : une option halal à Asakusa.' },
      { id: 'itsuki-tendon', description: 'Bol de riz garni de tempura : crevettes, poisson et légumes à Ginza.' },
    ],
    dinner: [
      { id: 'shoutaian', description: 'Yakiniku au wagyu halal à Kanda : un dîner autour du barbecue japonais.' },
      { id: 'diyafa', description: 'Sukiyaki de wagyu A5 : une autre façon de goûter le bœuf japonais.' },
      { id: 'kaikaya-shibuya', description: 'Poisson et fruits de mer en cuisine japonaise fusion, avec plats à partager.' },
    ],
  },
  Kyoto: {
    breakfast: [
      {
            "id": "hotaru-brighton",
            "description": "Petit-déjeuner japonais avec saumon grillé et omelette. Demander du riz nature : la sauce du porridge contient du mirin.",
            "timing": "7 h–10 h · dernière commande 9 h 30 · formule classique sans réservation",
            "proximity": "Dans le Kyoto Brighton Hotel"
      },
      {
            "id": "yayoiken-imadegawa",
            "description": "Petit-déjeuner japonais simple : saumon ou maquereau grillé au sel et riz. Confirmer les accompagnements sans viande.",
            "timing": "Ouverture à 5 h · disponibilité de la formule matinale à confirmer",
            "proximity": "Quartier Imadegawa, au nord du Brighton · trajet à pied via le lien"
      },
      {
            "id": "nakau-imadegawa",
            "description": "Formule matinale au saumon grillé ou aux œufs ; sélectionner seulement les éléments sans viande.",
            "timing": "Ouverture à 7 h · menu breakfast proposé",
            "proximity": "Quartier Imadegawa, au nord du Brighton · trajet à pied via le lien"
      }
],
    lunch: [
      { id: 'honolu-nishiki', description: 'Ramen halal près de Nishiki : une pause chaude pendant la visite du marché.' },
      { id: 'kaz-ryu-gion', description: 'Kaisendon : bol de riz au poisson cru et fruits de mer à Gion.', timing: 'Fermeture annoncée le mercredi et certains mardis : à confirmer' },
      { id: 'gyumon-kyoto', description: 'Gyukatsu halal près de la gare : choisir le bœuf pané pour varier des ramen.' },
    ],
    dinner: [
      { id: 'kyoto-panga', description: 'Sukiyaki au wagyu halal pour un dîner japonais autour d’un plat chaud.' },
      { id: 'kikyo-sushi-kyoto', description: 'Sushis, sashimis et poisson grillé ; chaises hautes signalées pour bébé.' },
      { id: 'honke-tankuma', description: 'Kaiseki de Kyoto en plusieurs services : réserver explicitement un menu halal.', timing: 'Certains menus demandent 2 jours de préavis' },
    ],
  },
  Osaka: {
    breakfast: [
      {
            "id": "satsuki-newotani",
            "description": "Coin japonais du buffet : poisson grillé, riz, natto et œufs. Demander une omelette sans jambon.",
            "timing": "7 h–10 h",
            "proximity": "Dans le Hotel New Otani Osaka"
      },
      {
            "id": "monterey-lasoeur-breakfast",
            "description": "Buffet japonais avec poisson grillé, riz et omelette. Faire vérifier le poisson au koji et les assaisonnements.",
            "timing": "7 h–10 h · accès des non-résidents à confirmer avant de partir",
            "proximity": "Quartier Shiromi, hôtel voisin du New Otani"
      },
      {
            "id": "lorraine-kyobashi",
            "description": "Composer un petit-déjeuner japonais avec riz blanc, shirasu et légumes adaptés. Éviter le porridge au poulet et les plats de viande.",
            "timing": "7 h–10 h · dernière entrée 9 h 30 · clientèle extérieure acceptée",
            "proximity": "Gare de Kyobashi, près du quartier du New Otani"
      }
],
    lunch: [
      { id: 'tendon-matsuyama', description: 'Tendon halal : riz et tempura, pour changer des nouilles.' },
      { id: 'honolu-namba', description: 'Ramen au poulet halal à Namba, une alternative aux bouillons de wagyu.' },
      { id: 'kinga-shinsekai', description: 'Sushis à la pièce à Shinsekai : composer un assortiment de poisson et crevettes.' },
    ],
    dinner: [
      { id: 'gyumon-osaka-shinsaibashi', description: 'Sukiyaki de wagyu halal à Shinsaibashi.', timing: 'Adresse complète à confirmer avant le déplacement' },
      { id: 'zerohachi-namba', description: 'Yakiniku halal à Namba OCAT : barbecue japonais pour un repas à partager.' },
      { id: 'kani-doraku-honten', description: 'Spécialiste du crabe à Dotonbori : privilégier crabe nature ou grillé.' },
    ],
  },
  Seoul: {
    breakfast: [
      { id: 'won-daegutang-seoul', description: 'Soupe coréenne de cabillaud pour un premier repas salé et chaud.', timing: 'Option salée · service du matin à confirmer' },
      { id: 'gosame-sinchon', description: 'Poisson grillé coréen : demander le maquereau nature.', timing: 'Brunch · horaires à confirmer' },
      { id: 'chaeum-myeongdong', description: 'Repas coréen halal avec plusieurs accompagnements : une option de brunch complet.', timing: 'Brunch · ouverture annoncée à 11 h' },
    ],
    lunch: [
      { id: 'eid-itaewon', description: 'Bulgogi, bibimbap ou samgyetang : cuisine coréenne halal à Itaewon.' },
      { id: 'bsj-chicken-wok', description: 'Poulet coréen et nouilles au wok halal pour varier les textures.' },
      { id: 'jeonju-sikdang-jongno', description: 'Poisson-sabre ou maquereau grillé sur briquettes à Jongno.' },
    ],
    dinner: [
      { id: 'yang-good', description: 'Barbecue coréen d’agneau ou de poulet halal ; alcool servi séparément.' },
      { id: 'gebangsikdang', description: 'Crabe cru mariné coréen : confirmer la marinade sans alcool avant réservation.' },
      { id: 'iftar-seoul', description: 'Cuisine coréenne halal dans un hanok : bulgogi ou poulet galbi.', timing: 'Fermeture annoncée à 19 h 30 : prévoir un dîner tôt' },
    ],
  },
};

export function mealsForCity(city: string) {
  if (!Object.prototype.hasOwnProperty.call(restaurantMeals, city)) return undefined;
  const picks = restaurantMeals[city as RestaurantCity];
  return Object.fromEntries(Object.entries(picks).map(([meal, entries]) => [meal,
    entries.flatMap(pick => {
      const restaurant = halalRestaurants.find(item => item.id === pick.id && item.city === city);
      return restaurant ? [{ ...pick, restaurant }] : [];
    }),
  ])) as Record<Meal, Array<MealPick & { restaurant: typeof halalRestaurants[number] }>>;
}
