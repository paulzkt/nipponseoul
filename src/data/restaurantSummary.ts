import type { RestaurantLocation } from './restaurants';

const descriptions: Partial<Record<RestaurantLocation['category'], string>> = {
  Ramen: 'Ramen japonais.', Sushi: 'Sushis japonais.', Wagyu: 'Spécialités de bœuf wagyu.',
  Yakiniku: 'Viandes grillées à table.', Burger: 'Burgers.', Donburi: 'Bols de riz garnis.', Tempura: 'Tempura japonaise.',
};
const overrides: Record<string, string> = {
  'sushi-koshikawa-akasaka': 'Sushi Edomae au comptoir, en menu omakase. Réservation conseillée.',
  'poteri-bakery-tokyo': 'Donuts frais à la crème pâtissière, au lait de Hokkaido. Boutique de Sangenjaya.',
  'age3-ginza': 'Sandwichs frits à Ginza. Options sans porc ni alcool annoncées dans votre sélection.',
};

export function restaurantSummary(restaurant: RestaurantLocation): string {
  const note = restaurant.note ?? '';
  const sentences = note.split(/(?<=[.!?])\s+/u).filter(sentence =>
    !/source|consulté|capture|relevé|google|tripadvisor|reel|publication|référencé|certification|certifié|note |avis |réservation :|adresse|horaires|instagram|^\d|repéré|sélection|statut halal|restaurant non halal|option poisson\/seafood/i.test(sentence));
  let summary = (overrides[restaurant.id]
    ?? (restaurant.id.startsWith('5w-') ? 'Wagyu, burgers et ramen halal. Enfants bienvenus selon l’enseigne.' : sentences.filter(sentence => sentence.length < 190).slice(0, 2).join(' ')))
    || `${descriptions[restaurant.category] ?? 'Restaurant'} · ${restaurant.area}.`;
  if (restaurant.pinKind === 'seafood' || restaurant.halalStatus === 'Non halal · seafood') summary += ' Préparation sans porc ni alcool à confirmer.';
  if (/fermeture définitive|fermé définitivement/i.test(note)) summary = 'Fermeture définitive signalée : ouverture à confirmer avant déplacement.';
  return summary;
}
