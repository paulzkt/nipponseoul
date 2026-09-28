import { restaurantHotels, type RestaurantLocation } from './restaurants';

export type RestaurantSort = 'distance' | 'rating' | 'price';
export const sortLabels: Record<RestaurantSort, string> = {
  distance: 'Proche de l’hôtel', rating: 'Note + avis Google', price: 'Prix croissant',
};
// Indicative prices already supplied in restaurant notes; no inferred prices.
export const restaurantBudgets: Record<string, { amount: number; basis: string }> = {
  'hotaru-brighton': { amount: 3700, basis: 'Petit-déjeuner classique / adulte' },
  'satsuki-newotani': { amount: 5520, basis: 'Petit-déjeuner / adulte, service inclus' },
  'monterey-lasoeur-breakfast': { amount: 3800, basis: 'Petit-déjeuner / adulte, service inclus' },
  'lorraine-kyobashi': { amount: 2640, basis: 'Petit-déjeuner / adulte' },
  'ciliegio-sakura': { amount: 5175, basis: 'Petit-déjeuner / adulte, service 15 % inclus' },
  'tsumugi-tsukiji': { amount: 1760, basis: 'Petit-déjeuner dès' },
  'imari-breakfast': { amount: 2600, basis: 'Petit-déjeuner, réservation par téléphone' },

  "tamai-muromachi": {
    "amount": 2000,
    "basis": "Déjeuner"
  },
  "mikoichiba-shinbashi": {
    "amount": 2000,
    "basis": "Déjeuner"
  },
  "sushi-no-kura-kyoto": {
    "amount": 22000,
    "basis": "Menu"
  },
  "gion-hikohachi": {
    "amount": 3000,
    "basis": "Fourchette Google dès"
  },
  "kizuki-kyoto-station": {
    "amount": 3000,
    "basis": "Déjeuner"
  },
  "kaz-ryu-gion": {
    "amount": 2500,
    "basis": "Déjeuner"
  },
  "iftar-seoul": {
    "amount": 15000,
    "basis": "Plat"
  },
  "cherry-garden": {
    "amount": 10000,
    "basis": "Budget minimum"
  },
  "bsj-chicken-wok": {
    "amount": 10000,
    "basis": "Budget minimum"
  },
  "gim-seonsaeng": {
    "amount": 10000,
    "basis": "Budget minimum"
  },
  "halal-kitchen-seoul": {
    "amount": 10000,
    "basis": "Budget minimum"
  },
  "busanjib-hongdae": {
    "amount": 10000,
    "basis": "Budget minimum"
  },
  "marhaba-osaka": {
    "amount": 2000,
    "basis": "Budget minimum"
  },
  "katana-sushi-osaka": {
    "amount": 2000,
    "basis": "Budget minimum"
  },
  "toribushi-ikebukuro": {
    "amount": 1000,
    "basis": "Budget minimum"
  },
  "honolu-nishiki": {
    "amount": 2000,
    "basis": "Budget minimum"
  },
  "tendon-matsuyama": {
    "amount": 2000,
    "basis": "Budget minimum"
  },
  "yang-good": {
    "amount": 20000,
    "basis": "Budget minimum"
  },
  "uobei-shibuya": {
    "amount": 1000,
    "basis": "Fourchette Google dès"
  },
  "age3-ginza": {
    "amount": 1000,
    "basis": "Fourchette Google ≤"
  },
  "poteri-bakery-tokyo": {
    "amount": 1000,
    "basis": "Fourchette Google dès"
  },
  "5w-harajuku": {
    "amount": 10000,
    "basis": "Fourchette Google dès"
  },
  "gion-ichiho": {
    "amount": 2000,
    "basis": "Fourchette Google dès"
  },
  "gion-sushi-shokichi": {
    "amount": 10000,
    "basis": "Fourchette Google dès"
  },
  "gyumon-volcano-kyoto": {
    "amount": 2000,
    "basis": "Fourchette Google dès"
  },
  "shinjukutei-gion-kyoto": {
    "amount": 2000,
    "basis": "Fourchette Google dès"
  },
  "wagyuza-kyoto": {
    "amount": 2000,
    "basis": "Fourchette Google dès"
  },
  "halal-ramen-japan-kyoto": {
    "amount": 2000,
    "basis": "Fourchette Google dès"
  },
  "wagyuza-kyoto-flagship": {
    "amount": 2000,
    "basis": "Fourchette Google dès"
  },
  "kinga-shinsekai": {
    "amount": 2000,
    "basis": "Fourchette Google dès"
  },
  "shunrakuan-obata": {
    "amount": 1000,
    "basis": "Fourchette Google dès"
  },
  "tempura-fukana": {
    "amount": 10000,
    "basis": "Fourchette Google dès"
  },
  "naniwa-tempura-ishin": {
    "amount": 10000,
    "basis": "Fourchette Google dès"
  }
};

// ECB reference rates, 25 September 2026. Units of local currency per euro.
export const budgetExchangeRates = { JPY: 179.70, KRW: 1545.16 };
export const budgetExchangeRateSource = 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html';

export function restaurantBudgetEuros(restaurant: RestaurantLocation): number | undefined {
  const budget = restaurantBudgets[restaurant.id];
  return budget ? budget.amount / budgetExchangeRates[restaurant.city === 'Seoul' ? 'KRW' : 'JPY'] : undefined;
}

export function formatRestaurantBudget(restaurant: RestaurantLocation): string {
  const budget = restaurantBudgets[restaurant.id];
  const euros = restaurantBudgetEuros(restaurant);
  if (!budget || euros === undefined) return 'Budget à renseigner';
  const currency = restaurant.city === 'Seoul' ? '₩' : '¥';
  const qualifier = budget.basis.includes('≤') ? 'jusqu’à ' : /minimum|dès/.test(budget.basis) ? 'dès ' : '';
  const euroLabel = euros.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `Budget indicatif : ${qualifier}${budget.amount.toLocaleString('fr-FR')} ${currency} (≈ ${euroLabel} €) · ${budget.basis}`;
}

export function hotelDistance(restaurant: RestaurantLocation): number | undefined {
  if (restaurant.latitude === undefined || restaurant.longitude === undefined) return undefined;
  const hotel = restaurantHotels[restaurant.city];
  const rad = (v: number) => v * Math.PI / 180;
  const a = Math.sin(rad(restaurant.latitude - hotel.latitude) / 2) ** 2
    + Math.cos(rad(hotel.latitude)) * Math.cos(rad(restaurant.latitude))
    * Math.sin(rad(restaurant.longitude - hotel.longitude) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, a)));
}

function compareOptional(a: number | undefined, b: number | undefined, descending = false): number {
  if (a === undefined) return b === undefined ? 0 : 1;
  if (b === undefined) return -1;
  return descending ? b - a : a - b;
}

export function sortRestaurants(restaurants: RestaurantLocation[], criteria: RestaurantSort[]): RestaurantLocation[] {
  return [...restaurants].sort((a, b) => {
    for (const criterion of criteria) {
      const order = criterion === 'distance'
        ? compareOptional(hotelDistance(a), hotelDistance(b))
        : criterion === 'price'
          ? compareOptional(restaurantBudgetEuros(a), restaurantBudgetEuros(b))
          : compareOptional(a.googleRating, b.googleRating, true)
            || compareOptional(a.googleReviewCount, b.googleReviewCount, true);
      if (order !== 0) return order;
    }
    return 0;
  });
}
