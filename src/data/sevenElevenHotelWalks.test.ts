import { describe, expect, it } from 'vitest';
import walks from './sevenElevenHotelWalks.json';
import { restaurantHotels, type RestaurantCity } from './restaurants';

describe('7-Eleven walking routes from hotels', () => {
  it('only retains measured routes within 20 minutes, bound to the current hotel of each city', () => {
    for (const city of Object.keys(restaurantHotels) as RestaurantCity[]) {
      const group = walks.cities[city];
      expect(group.hotel.latitude).toBe(restaurantHotels[city].latitude);
      expect(group.hotel.longitude).toBe(restaurantHotels[city].longitude);
      expect(group.stores.length).toBeGreaterThan(0);
      expect(new Set(group.stores.map(s => s.id)).size).toBe(group.stores.length);
      for (const store of group.stores) {
        expect(store.walkSeconds).toBeGreaterThan(0);
        expect(store.walkSeconds).toBeLessThanOrEqual(1200);
        expect(store.walkMeters).toBeGreaterThan(0);
      }
    }
  });
});
