import { describe, expect, it } from 'vitest';
import { mealsForCity, restaurantMeals } from './restaurantMeals';

describe('suggestions par ville et repas', () => {
  it('résout trois restaurants distincts de la liste principale pour chaque repas et ville', () => {
    for (const city of Object.keys(restaurantMeals)) {
      const meals = mealsForCity(city)!;
      const ids: string[] = [];
      for (const entries of Object.values(meals)) {
        expect(entries).toHaveLength(3);
        for (const pick of entries) {
          expect(pick.restaurant.city).toBe(city);
          ids.push(pick.restaurant.id);
        }
      }
      expect(new Set(ids).size).toBe(9);
    }
  });
  it('ne propose pas une autre ville pour les journées en vol', () => {
    expect(mealsForCity('Paris')).toBeUndefined();
  });
});
