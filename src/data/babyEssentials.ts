export type BabyCity = 'Tokyo' | 'Kyoto' | 'Osaka' | 'Séoul';
export type BabyEssentialKind = 'water' | 'diapers' | 'milk';

export interface BabyMapPlace {
  id: string;
  city: BabyCity;
  country: 'Japon' | 'Corée du Sud';
  kind: BabyEssentialKind;
  product: string;
  nativeName: string;
  match: string;
  detail: string;
  phrase: string;
  store: string;
  address: string;
  latitude: number;
  longitude: number;
  travelTime: string;
  hours: string;
  mapUrl: string;
  sourceUrl: string;
}

export interface BabyCityHotel {
  name: string;
  latitude: number;
  longitude: number;
}

export const babyCityHotels: Record<BabyCity, BabyCityHotel> = {
  Tokyo: { name: 'Grand Prince Hotel Takanawa', latitude: 35.6314, longitude: 139.7354 },
  Kyoto: { name: 'Kyoto Brighton Hotel', latitude: 35.0264, longitude: 135.7544 },
  Osaka: { name: 'Hotel New Otani Osaka', latitude: 34.6897, longitude: 135.5329 },
  Séoul: { name: 'The Ambassador Seoul · A Pullman', latitude: 37.5608, longitude: 127.0023 },
};

export interface BabySupplyStore {
  hotelId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  travelTime: string;
  hours: string;
  mapUrl: string;
  sourceUrl: string;
}

const directionsUrl = (origin: string, destination: string): string =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;

export const babySupplyStores: BabySupplyStore[] = [
  {
    hotelId: 'tokyo-hotel',
    name: 'Akachan Honpo · Willa Oi',
    address: 'Willa Oi 3F, 1-6-22 Katsushima, Shinagawa-ku, Tokyo',
    latitude: 35.5949,
    longitude: 139.7387,
    travelTime: 'Environ 15 min en taxi',
    hours: '10:00–21:00',
    mapUrl: directionsUrl('Grand Prince Hotel Takanawa', 'Akachan Honpo Willa Oi'),
    sourceUrl: 'https://stores.akachan.jp/293',
  },
  {
    hotelId: 'kyoto-hotel',
    name: 'Akachan Honpo · Rakuhoku Hankyu Square',
    address: 'Rakuhoku Hankyu Square 2F, 36 Takanonishibirakicho, Sakyo-ku, Kyoto',
    latitude: 35.04087,
    longitude: 135.77911,
    travelTime: 'Environ 12–15 min en taxi',
    hours: '10:00–21:00',
    mapUrl: directionsUrl('Kyoto Brighton Hotel', 'Akachan Honpo Rakuhoku Hankyu Square'),
    sourceUrl: 'https://stores.akachan.jp/274',
  },
  {
    hotelId: 'osaka-hotel',
    name: 'Akachan Honpo · Keihan City Mall',
    address: 'Keihan City Mall 2F, 1-1 Tenmabashi Kyomachi, Chuo-ku, Osaka',
    latitude: 34.69003,
    longitude: 135.51672,
    travelTime: 'Environ 8–12 min en taxi',
    hours: '10:00–21:00',
    mapUrl: directionsUrl('Hotel New Otani Osaka', 'Akachan Honpo Keihan City Mall'),
    sourceUrl: 'https://stores.akachan.jp/266',
  },
];

export const seoulBabySupplyStores: BabySupplyStore[] = [
  {
    hotelId: 'seoul-hotel',
    name: 'E-Mart · Cheonggyecheon',
    address: '400 Cheonggyecheon-ro, Jung-gu, Seoul',
    latitude: 37.57122,
    longitude: 127.0227,
    travelTime: 'Environ 8–12 min en taxi',
    hours: '10:00–23:00 · fermé le 14 octobre 2026',
    mapUrl: directionsUrl('The Ambassador Seoul - A Pullman Hotel', 'E-Mart Cheonggyecheon Seoul'),
    sourceUrl: 'https://emartapp.emart.com/branch/view.do?id=1089&mallGbn=E',
  },
  {
    hotelId: 'seoul-hotel',
    name: 'Lotte Mart Zettaplex · Seoul Station',
    address: '405 Hangang-daero, Jung-gu, Seoul',
    latitude: 37.555782,
    longitude: 126.970505,
    travelTime: 'Environ 15 min en taxi',
    hours: '10:00–24:00 · fermeture mensuelle à vérifier',
    mapUrl: directionsUrl('The Ambassador Seoul - A Pullman Hotel', 'Lotte Mart Zettaplex Seoul Station'),
    sourceUrl: 'https://english.visitseoul.net/area/Lotte-Mart-Seoul-Station/ENP000541',
  },
];

export const babyProductSources = {
  pommette: 'https://www.intermarche.com/produit/Couches%20Agility%20Dry%2C%20taille%206%20%3A%2015-30%20kg/3250393005176',
  merries: 'https://www.kao.co.jp/merries/products/',
  gallia: 'https://www.laboratoire-gallia.com/shop/produit/lot-x3-calisma-croissance-2x600g-des-12-mois/',
  meiji: 'https://www.meiji.co.jp/baby/step/when/',
  meijiEnglish: 'https://www.meiji.co.jp/smartphone/baby/step/languages/english/images/rakurakucube_eng2.pdf',
  chirumiru: 'https://www.morinagamilk.co.jp/products/babyfood/chirumiru/311.html',
  huggiesKorea: 'https://www.yuhan-kimberly.co.kr/newsroom/newsview/3363',
  maeilAbsolute: 'https://directtest.maeil.com/m/product/productView.do?productCode=R00011',
  samdasoo: 'https://www.jpdc.co.kr/samdasoo/eng/products.htm',
} as const;
