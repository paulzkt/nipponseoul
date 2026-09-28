export interface SevenElevenStore {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  hours?: string;
}

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export function parseSevenElevenStores(value: unknown): SevenElevenStore[] {
  if (!record(value) || !Array.isArray(value.elements) || value.remark) {
    throw new Error('Réponse cartographique incomplète');
  }
  const stores: SevenElevenStore[] = [];
  const seen = new Set<string>();
  for (const item of value.elements) {
    if (!record(item) || !record(item.tags)) continue;
    const tags = item.tags;
    if (tags.shop === 'disused' || tags.shop === 'vacant' || tags.disused === 'yes' || tags.abandoned === 'yes') continue;
    const coordinates = record(item.center) ? item.center : item;
    const latitude = coordinates.lat;
    const longitude = coordinates.lon;
    if (typeof latitude !== 'number' || typeof longitude !== 'number' || !Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) continue;
    if (typeof item.id !== 'number' || typeof item.type !== 'string') continue;
    const id = `${item.type}/${item.id}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const address = ['addr:housenumber', 'addr:street', 'addr:suburb', 'addr:city'].map(key => tags[key]).filter((part): part is string => typeof part === 'string').join(' ');
    stores.push({ id, latitude, longitude, address,
      name: typeof tags.name === 'string' ? tags.name : '7-Eleven',
      hours: typeof tags.opening_hours === 'string' ? tags.opening_hours : undefined,
    });
  }
  return stores;
}

export function sevenElevenQuery(bounds: [number, number, number, number]): string {
  const box = bounds.map(n => n.toFixed(5)).join(',');
  return `[out:json][timeout:12];(nwr["brand:wikidata"="Q259340"](${box});nwr["shop"="convenience"]["name"~"7.?[Ee]leven|セブン.?イレブン|세븐일레븐"](${box});nwr["shop"="convenience"]["brand"~"7.?[Ee]leven|セブン.?イレブン|세븐일레븐"](${box}););out center tags;`;
}
