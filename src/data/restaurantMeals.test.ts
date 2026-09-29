import { describe, expect, it } from 'vitest';
import { mealsForCity, mealsForDay, restaurantMeals } from './restaurantMeals';

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

it('varie les repas au fil des jours avec trois adresses admissibles par repas', () => {
  for (const [city, start, end] of [['Tokyo', 1, 5], ['Kyoto', 5, 9], ['Osaka', 9, 12], ['Seoul', 12, 15]] as const) {
    let previous: ReturnType<typeof mealsForDay>;
    for (let day = start; day <= end; day++) {
      const meals = mealsForDay(city, `oct${String(day).padStart(2, '0')}`)!;
      const ids = Object.values(meals).flat().map(p => p.id);
      expect(new Set(ids).size).toBe(9);
      for (const meal of ['breakfast', 'lunch', 'dinner'] as const) {
        expect(meals[meal]).toHaveLength(3);
        expect(meals[meal].every(p => p.restaurant.city === city && (p.restaurant.halalStatus !== 'À vérifier' || p.restaurant.pinKind === 'seafood'))).toBe(true);
        if (previous && (meal !== 'breakfast' || city !== 'Seoul')) {
          expect(meals[meal].map(p => p.id).sort()).not.toEqual(previous[meal].map(p => p.id).sort());
        }
      }
      previous = meals;
    }
  }
});
