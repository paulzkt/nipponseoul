import { describe, expect, it } from 'vitest';
import { formatRestaurantBudget, restaurantBudgetEuros, sortRestaurants } from './restaurantSorting';
import { restaurantHotels, type RestaurantLocation } from './restaurants';

const make = (id: string, values: Partial<RestaurantLocation> = {}): RestaurantLocation => ({ id, name: id, city: 'Tokyo', area: '', category: 'Sushi', halalStatus: 'Halal', source: 'Navito', ...values });
describe('restaurant sorting', () => {
  it('sorts rating before reviews and puts missing ratings last without mutating the list', () => {
    const list = [make('unknown', { googleReviewCount: 9999 }), make('b', { googleRating: 4.5, googleReviewCount: 200 }), make('a', { googleRating: 4.8, googleReviewCount: 2 }), make('c', { googleRating: 4.5, googleReviewCount: 300 })];
    expect(sortRestaurants(list, ['rating']).map(r => r.id)).toEqual(['a', 'c', 'b', 'unknown']);
    expect(list[0].id).toBe('unknown');
  });
  it('combines criteria in selected priority order', () => {
    const a = make('tamai-muromachi', { googleRating: 5, ...restaurantHotels.Tokyo });
    const b = make('toribushi-ikebukuro', { googleRating: 4, ...restaurantHotels.Tokyo });
    expect(sortRestaurants([a,b], ['distance','price','rating'])[0].id).toBe(b.id);
    expect(sortRestaurants([a,b], ['rating','price'])[0].id).toBe(a.id);
  });
  it('uses hotel distance and puts unknown coordinates or budgets last', () => {
    const near = make('near', { ...restaurantHotels.Tokyo });
    const far = make('far', { latitude: 35.8, longitude: 139.8 });
    expect(sortRestaurants([make('unknown'),far,near], ['distance']).map(r => r.id)).toEqual(['near','far','unknown']);
    expect(sortRestaurants([make('unknown'), make('tamai-muromachi')], ['price'])[0].id).toBe('tamai-muromachi');
    expect(sortRestaurants([far,near], []).map(r => r.id)).toEqual(['far','near']);
  });
});

it('affiche le budget utilisé pour le tri avec la bonne conversion locale', () => {
  const japan = make('tamai-muromachi');
  const korea = make('iftar-seoul', { city: 'Seoul' });
  expect(formatRestaurantBudget(japan)).toContain('2 000 ¥ (≈ 11,13 €)');
  expect(formatRestaurantBudget(korea)).toContain('15 000 ₩ (≈ 9,71 €)');
  expect(restaurantBudgetEuros(japan)).toBeCloseTo(2000 / 179.7);
  expect(sortRestaurants([make('unknown'), japan, korea], ['price']).map(r => r.id)).toEqual(['iftar-seoul', 'tamai-muromachi', 'unknown']);
  expect(formatRestaurantBudget(make('unknown'))).toBe('Budget à renseigner');
});
