import { describe, expect, it } from 'vitest';
import { parseSevenElevenStores, sevenElevenQuery } from './sevenEleven';

describe('7-Eleven map data', () => {
  it('handles points and building centres, deduplicates IDs and rejects invalid or closed shops', () => {
    const node = { type: 'node', id: 1, lat: 35.7, lon: 139.7, tags: { name: '7-Eleven', shop: 'convenience' } };
    const stores = parseSevenElevenStores({ elements: [node, node,
      { type: 'way', id: 2, center: { lat: 37.5, lon: 127 }, tags: { name: '세븐일레븐', 'addr:street': 'Seoul' } },
      { ...node, id: 3, lat: 999 }, { ...node, id: 4, tags: { disused: 'yes' } },
      { type: 'node', id: 5, tags: {} }, null,
    ] });
    expect(stores).toHaveLength(2);
    expect(stores[1]).toMatchObject({ id: 'way/2', latitude: 37.5, longitude: 127, address: 'Seoul' });
  });
  it('does not turn API errors or truncated results into an empty successful map', () => {
    expect(() => parseSevenElevenStores({ elements: [], remark: 'runtime error: timeout' })).toThrow();
    expect(() => parseSevenElevenStores({ error: 'unavailable' })).toThrow();
    expect(parseSevenElevenStores({ elements: [] })).toEqual([]);
  });
  it('queries the visible bounds and includes Japanese and Korean names', () => {
    const query = sevenElevenQuery([37.4, 126.8, 37.7, 127.2]);
    expect(query).toContain('(37.40000,126.80000,37.70000,127.20000)');
    expect(query).toContain('세븐일레븐');
    expect(query).toContain('セブン');
    expect(query).toContain('out center tags');
  });
});
