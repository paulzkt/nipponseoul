import type { RestaurantLocation } from '@/data/restaurants';

export function GoogleRating({ restaurant }: { restaurant: RestaurantLocation }) {
  if (restaurant.googleRating === undefined) return null;
  return <span className="inline-flex flex-wrap items-center justify-end gap-1 text-xs font-semibold text-[#14231d]" aria-label={`Note Google ${restaurant.googleRating} sur 5${restaurant.googleReviewCount !== undefined ? `, ${restaurant.googleReviewCount} avis` : ''}`}>
    <span className="text-amber-500" aria-hidden="true">★</span>
    {restaurant.googleRating.toFixed(1).replace('.', ',')}
    {restaurant.googleReviewCount !== undefined && <span className="font-normal text-stone-500">({restaurant.googleReviewCountApproximate ? '≈ ' : ''}{restaurant.googleReviewCount.toLocaleString('fr-FR')} avis)</span>}
  </span>;
}
