import { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Baby as BabyIcon, Crosshair, Droplets, ExternalLink, Hotel, LoaderCircle, MapPin, Milk, PackageOpen, ShieldCheck, Store, TriangleAlert } from 'lucide-react';
import { Badge, Button, Card, CardContent, Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { BabyCityMap } from '@/components/baby/BabyCityMap';
import type { UserMapPosition } from '@/components/baby/BabyCityMap';
import type { BabyCity, BabyEssentialKind, BabyMapPlace, BabySupplyStore } from '@/data/babyEssentials';
import { babyCityHotels, babyProductSources, babySupplyStores, seoulBabySupplyStores } from '@/data/babyEssentials';
import { cn } from '@/lib/utils';
import { adamAgeDuringTrip, adamBirthDate, hotels } from '@/data/trip';

type ActiveFilter = BabyEssentialKind | null;
type LocationStatus = 'idle' | 'loading' | 'success' | 'error';

const cityOrder: BabyCity[] = ['Tokyo', 'Kyoto', 'Osaka', 'Séoul'];
const categoryLabels: Record<BabyEssentialKind, string> = { water: 'Eau', diapers: 'Couches', milk: 'Lait' };
const categoryIcons: Record<BabyEssentialKind, LucideIcon> = { water: Droplets, diapers: PackageOpen, milk: Milk };
const categoryStyles: Record<BabyEssentialKind, { active: string; soft: string; markerOffset: number }> = {
  water: { active: 'bg-[#176158] text-white hover:bg-[#124b45]', soft: 'bg-[#dcefeb] text-[#176158]', markerOffset: 0 },
  diapers: { active: 'bg-[#c56b45] text-white hover:bg-[#a85737]', soft: 'bg-[#f7e7db] text-[#9f4f31]', markerOffset: 0 },
  milk: { active: 'bg-[#39688a] text-white hover:bg-[#2d5572]', soft: 'bg-[#ddeaf4] text-[#315c79]', markerOffset: 0.00018 },
};

const japaneseCityConfig: Array<{ city: Exclude<BabyCity, 'Séoul'>; hotelId: string }> = [
  { city: 'Tokyo', hotelId: 'tokyo-hotel' },
  { city: 'Kyoto', hotelId: 'kyoto-hotel' },
  { city: 'Osaka', hotelId: 'osaka-hotel' },
];

const waterCoordinates: Record<BabyCity, { latitude: number; longitude: number }> = {
  Tokyo: { latitude: 35.6310, longitude: 139.7356 },
  Kyoto: { latitude: 35.0301, longitude: 135.7593 },
  Osaka: { latitude: 34.6968, longitude: 135.5339 },
  Séoul: { latitude: 37.5608, longitude: 127.0023 },
};

const japaneseWater: BabyMapPlace[] = japaneseCityConfig.flatMap(({ city, hotelId }) => {
  const hotel = hotels.find(item => item.id === hotelId);
  if (!hotel) return [];
  return [{
    id: `${city.toLocaleLowerCase('fr')}-water`, city, country: 'Japon', kind: 'water',
    product: 'Suntory Tennensui', nativeName: 'サントリー天然水', match: 'Eau plate douce · dureté ≈ 30 mg/L',
    detail: 'Choisir la version naturelle non pétillante. Éviter « SPARKLING » et toute bouteille indiquée 硬水, qui signifie eau dure.',
    phrase: '「赤ちゃんのミルク用の軟水はありますか？」', store: hotel.supermarketName, address: hotel.supermarketAddress,
    latitude: waterCoordinates[city].latitude, longitude: waterCoordinates[city].longitude,
    travelTime: hotel.supermarketWalkTime, hours: hotel.supermarketHours, mapUrl: hotel.supermarketMapUrl,
    sourceUrl: 'https://www.suntory.co.jp/water/tennensui/',
  }];
});

const seoulHotel = seoulBabySupplyStores[0];
const seoulWater: BabyMapPlace[] = seoulHotel ? [{
  id: 'seoul-water', city: 'Séoul', country: 'Corée du Sud', kind: 'water', product: 'Jeju Samdasoo', nativeName: '제주삼다수',
  match: 'Eau plate douce · faible minéralisation',
  detail: 'Eau coréenne plate à faible dureté. Calcium 2,5–4 mg/L, magnésium 1,7–3,5 mg/L et sodium 4–7,2 mg/L.',
  phrase: '「아기 분유용으로 제주삼다수 있나요?」', store: seoulHotel.name, address: seoulHotel.address,
  latitude: seoulHotel.latitude, longitude: seoulHotel.longitude,
  travelTime: seoulHotel.travelTime, hours: seoulHotel.hours, mapUrl: seoulHotel.mapUrl,
  sourceUrl: babyProductSources.samdasoo,
}] : [];

function japaneseProductPlaces(kind: 'diapers' | 'milk'): BabyMapPlace[] {
  return japaneseCityConfig.flatMap(({ city, hotelId }) => {
    const store = babySupplyStores.find(item => item.hotelId === hotelId);
    if (!store) return [];
    const isDiapers = kind === 'diapers';
    return [{
      id: `${city.toLocaleLowerCase('fr')}-${kind}`, city, country: 'Japon', kind,
      product: isDiapers ? 'Merries Pants · Bigより大きい' : 'Meiji Step',
      nativeName: isDiapers ? 'メリーズ パンツ ビッグより大きい' : '明治ステップ',
      match: isDiapers ? 'XXL japonais · 15–28 kg' : 'Lait japonais · 1–3 ans',
      detail: isDiapers
        ? 'Correspondance de poids la plus proche des Pommette taille 6. Si Adam pèse moins de 15 kg, choisir Merries Big / XL, 12–22 kg.'
        : 'Équivalent de tranche d’âge de Gallia Croissance. Le format Rakuraku Cube est pratique en voyage. Alternative : Morinaga Chil Mil.',
      phrase: isDiapers ? '「メリーズのビッグより大きいサイズはありますか？」' : '「1歳からの明治ステップはありますか？」',
      store: store.name, address: store.address, latitude: store.latitude, longitude: store.longitude + categoryStyles[kind].markerOffset,
      travelTime: store.travelTime, hours: store.hours, mapUrl: store.mapUrl,
      sourceUrl: isDiapers ? babyProductSources.merries : babyProductSources.meiji,
    }];
  });
}

function seoulProductPlaces(kind: 'diapers' | 'milk'): BabyMapPlace[] {
  return seoulBabySupplyStores.map((store: BabySupplyStore, index) => {
    const isDiapers = kind === 'diapers';
    return {
      id: `seoul-${kind}-${index + 1}`, city: 'Séoul', country: 'Corée du Sud', kind,
      product: isDiapers ? 'Huggies Naturemade Pants · étape 7' : 'Maeil Absolute Myungjak · étape 3',
      nativeName: isDiapers ? '하기스 네이처메이드 팬티 7단계' : '매일 앱솔루트 명작 3단계',
      match: isDiapers ? '17–24 kg · culotte · version garçon' : 'Lait coréen · 12–24 mois · 800 g',
      detail: isDiapers
        ? 'Correspondance coréenne la plus proche des Pommette taille 6. Si Adam pèse moins de 17 kg, choisir l’étape 6, environ 12–19 kg.'
        : 'Équivalent de tranche d’âge de Gallia Croissance pour Adam à 18 mois. La composition et le dosage ne sont pas identiques.',
      phrase: isDiapers ? '「하기스 네이처메이드 팬티 7단계 남아용 있나요?」' : '「매일 앱솔루트 명작 3단계, 12개월부터 24개월용 있나요?」',
      store: store.name, address: store.address, latitude: store.latitude, longitude: store.longitude + categoryStyles[kind].markerOffset,
      travelTime: store.travelTime, hours: store.hours, mapUrl: store.mapUrl,
      sourceUrl: isDiapers ? babyProductSources.huggiesKorea : babyProductSources.maeilAbsolute,
    };
  });
}

const allPlaces: BabyMapPlace[] = [
  ...japaneseWater, ...seoulWater,
  ...japaneseProductPlaces('diapers'), ...japaneseProductPlaces('milk'),
  ...seoulProductPlaces('diapers'), ...seoulProductPlaces('milk'),
];

const isBabyCity = (value: string): value is BabyCity => cityOrder.some(city => city === value);

function distanceFromUser(position: UserMapPosition, place: BabyMapPlace): number {
  const earthRadiusKm = 6371;
  const toRadians = (degrees: number): number => degrees * Math.PI / 180;
  const latitudeDelta = toRadians(place.latitude - position.latitude);
  const longitudeDelta = toRadians(place.longitude - position.longitude);
  const originLatitude = toRadians(position.latitude);
  const destinationLatitude = toRadians(place.latitude);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(originLatitude) * Math.cos(destinationLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`;
  return `${distanceKm.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`;
}

export default function Baby() {
  const [city, setCity] = useState<BabyCity>('Tokyo');
  const [filter, setFilter] = useState<ActiveFilter>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<UserMapPosition | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [locationError, setLocationError] = useState<string>('');
  const cityPlaces = useMemo(() => allPlaces.filter(place => place.city === city), [city]);
  const visiblePlaces = useMemo(() => {
    const matchingPlaces = cityPlaces.filter(place => filter === null || place.kind === filter);
    const origin = userPosition ?? { ...babyCityHotels[city], accuracy: 0 };
    return matchingPlaces.sort(
      (left, right) => distanceFromUser(origin, left) - distanceFromUser(origin, right),
    );
  }, [city, cityPlaces, filter, userPosition]);
  const selectedPlace = visiblePlaces.find(place => place.id === selectedId) ?? null;

  const changeCity = (value: string): void => {
    if (!isBabyCity(value)) return;
    setCity(value);
    setSelectedId(null);
    setUserPosition(null);
    setLocationStatus('idle');
    setLocationError('');
  };
  const toggleFilter = (kind: BabyEssentialKind): void => {
    setFilter(current => current === kind ? null : kind);
    setSelectedId(null);
  };

  const locateUser = (): void => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('La géolocalisation n’est pas disponible sur cet appareil.');
      return;
    }

    setLocationStatus('loading');
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLocationStatus('success');
      },
      error => {
        const message = error.code === error.PERMISSION_DENIED
          ? 'Autorisez la localisation dans les réglages du navigateur pour afficher votre position.'
          : 'Votre position n’a pas pu être déterminée. Réessayez à l’extérieur ou avec le GPS activé.';
        setLocationStatus('error');
        setLocationError(message);
      },
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 60_000 },
    );
  };

  return (
    <div className="page-shell pb-8">
      <header className="page-heading">
        <div><p className="eyebrow">Le carnet d’Adam</p><h1 className="page-title">Essentiels bébé</h1><p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600">Adresses repérées, triées par distance. Disponibilité des produits à confirmer.</p></div>
        <div className="flex items-center gap-3 rounded-2xl bg-[#14231d] px-4 py-3 text-white shadow-sm">
          <span className="grid size-10 place-items-center rounded-full bg-[#f1d582] text-[#14231d]"><BabyIcon className="size-5" aria-hidden="true" /></span>
          <div><p className="font-display text-lg leading-none">Adam en voyage</p><p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-stone-300">Né le {adamBirthDate} · {adamAgeDuringTrip}</p></div>
        </div>
      </header>

      <Tabs value={city} onValueChange={changeCity} className="mt-4 h-12 gap-0">
        <TabsList className="!grid !h-12 w-full grid-cols-4 overflow-hidden rounded-2xl bg-white p-1 shadow-sm">
          {cityOrder.map(item => <TabsTrigger key={item} value={item} className="!h-full min-h-0 rounded-xl px-1 py-0 text-xs after:hidden data-active:bg-[#32746d] data-active:text-white">{item}</TabsTrigger>)}
        </TabsList>
      </Tabs>

      <div className="mt-3 grid grid-cols-3 gap-2" aria-label="Filtres des essentiels bébé">
        {(Object.keys(categoryLabels) as BabyEssentialKind[]).map(kind => {
          const Icon = categoryIcons[kind];
          const active = filter === kind;
          return <Button key={kind} type="button" variant="outline" aria-pressed={active} onClick={() => toggleFilter(kind)} className={cn('min-h-14 flex-col gap-1 rounded-2xl border-transparent text-[10px] shadow-sm sm:flex-row sm:text-xs', active ? categoryStyles[kind].active : categoryStyles[kind].soft)}><Icon className="size-5" aria-hidden="true" />{categoryLabels[kind]}</Button>;
        })}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-stone-600">{city === 'Tokyo' ? 'Eau : le 7-Eleven est dans l’hôtel. Couches et lait : le magasin spécialisé indiqué est plus éloigné ; le stock exact reste à confirmer.' : city === 'Séoul' ? 'Eau : demander d’abord à la réception la supérette la plus proche. E-Mart est une option pour regrouper les achats, pas le magasin le plus proche.' : 'Les adresses recensées ne sont pas nécessairement les plus proches. Pour l’eau, une supérette de quartier peut éviter le trajet au supermarché.'}</p>

      <section className="mt-3 overflow-hidden rounded-[26px] border border-stone-200 bg-white shadow-sm" aria-label={`Carte des essentiels bébé à ${city}`}>
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e5f0ed] text-[#176158]"><Hotel className="size-5" aria-hidden="true" /></span><div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-stone-400">Pin hôtel</p><p className="truncate text-sm font-semibold text-[#14231d]">{babyCityHotels[city].name}</p></div></div>
          <div className="flex shrink-0 items-center gap-2">
            <Button type="button" size="sm" variant="outline" onClick={locateUser} disabled={locationStatus === 'loading'} className="min-h-10 rounded-full border-[#32746d]/30 px-3 text-[#176158]" aria-label={locationStatus === 'success' ? 'Me recentrer sur la carte' : 'Me localiser sur la carte'}>
              {locationStatus === 'loading' ? <LoaderCircle className="size-4 animate-spin" /> : <Crosshair className="size-4" />}
              <span className="hidden sm:inline">{locationStatus === 'success' ? 'Me recentrer' : 'Me localiser'}</span>
            </Button>
            <Badge className="bg-[#f1d582] text-[#14231d]">{visiblePlaces.length} pins</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-stone-200 bg-stone-50 px-4 py-2.5 text-[10px] text-stone-600">
          <span>💧 Eau</span><span>🧷 Couches</span><span>🍼 Lait</span><span>H Hôtel</span>
          {filter && <button type="button" onClick={() => setFilter(null)} className="font-bold text-[#176158] underline underline-offset-2">Afficher tout</button>}
          {locationError && <p className="basis-full rounded-xl bg-red-50 px-3 py-2 text-[10px] font-medium leading-relaxed text-red-700" role="alert">{locationError}</p>}
        </div>
        <BabyCityMap city={city} places={visiblePlaces} selectedId={selectedId} onSelect={setSelectedId} userPosition={userPosition} className="h-[420px] w-full" />
      </section>

      <section className="mt-4" aria-labelledby="baby-place-list-title">
        <div className="flex items-end justify-between gap-3"><div><p className="eyebrow">{userPosition ? 'Depuis votre position · à vol d’oiseau' : 'Depuis l’hôtel · à vol d’oiseau'}</p><h2 id="baby-place-list-title" className="section-title">Où acheter</h2></div><Badge variant="outline" className="bg-white">{visiblePlaces.length} adresse{visiblePlaces.length > 1 ? 's' : ''}</Badge></div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {visiblePlaces.map(place => <EssentialPlaceCard key={place.id} place={place} selected={selectedPlace?.id === place.id} onSelect={() => setSelectedId(place.id)} distanceKm={distanceFromUser(userPosition ?? { ...babyCityHotels[city], accuracy: 0 }, place)} />)}
        </div>
      </section>
      <SafetyNote kind={filter} />
    </div>
  );
}

function EssentialPlaceCard({ place, selected, onSelect, distanceKm }: { place: BabyMapPlace; selected: boolean; onSelect: () => void; distanceKm?: number }) {
  const Icon = categoryIcons[place.kind];
  return (
    <Card className={cn('overflow-hidden border-stone-200 bg-white py-0 shadow-sm transition', selected && 'border-[#32746d] ring-2 ring-[#32746d]/15')} onClick={onSelect}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-3"><span className={cn('grid size-11 shrink-0 place-items-center rounded-2xl', categoryStyles[place.kind].soft)}><Icon className="size-5" aria-hidden="true" /></span><div className="min-w-0 flex-1"><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">{categoryLabels[place.kind]} · {place.country}</p><h3 className="mt-1 font-display text-xl leading-tight text-[#14231d]">{place.product}</h3><p className="mt-1 text-sm font-semibold text-[#176158]">{place.nativeName}</p></div></div>
        <Badge variant="outline" className="mt-3 whitespace-normal text-left text-[10px]">{place.match}</Badge>
        <p className="mt-3 text-xs leading-relaxed text-stone-600">{place.detail}</p>
        <div className="mt-3 rounded-2xl bg-[#f6f0e5] p-3"><p className="text-[9px] font-bold uppercase tracking-wide text-[#8a5b13]">À montrer en magasin</p><p className="mt-1.5 font-display text-sm leading-snug text-[#14231d]">{place.phrase}</p></div>
        <div className="mt-4 flex items-start gap-3 border-t border-stone-200 pt-4"><Store className="mt-0.5 size-4 shrink-0 text-[#176158]" aria-hidden="true" /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><p className="text-sm font-semibold text-[#14231d]">{place.store}</p>{distanceKm !== undefined && <span className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-sky-700"><Crosshair className="size-3" />{formatDistance(distanceKm)}</span>}</div><p className="mt-1 text-[10px] text-stone-500">{place.travelTime} · {place.hours}</p></div></div>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-stone-600"><MapPin className="mt-0.5 size-3.5 shrink-0 text-[#d84a43]" aria-hidden="true" />{place.address}</p>
        <div className="mt-4 grid grid-cols-2 gap-2"><Button asChild className="min-h-11 rounded-full bg-[#173d3a] text-xs text-white hover:bg-[#102b29]"><a href={place.mapUrl} target="_blank" rel="noreferrer">Itinéraire<ExternalLink /></a></Button><Button asChild variant="outline" className="min-h-11 rounded-full text-xs"><a href={place.sourceUrl} target="_blank" rel="noreferrer">Produit<ExternalLink /></a></Button></div>
      </CardContent>
    </Card>
  );
}

function SafetyNote({ kind }: { kind: ActiveFilter }) {
  const milkWarning = kind === 'milk';
  return <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-950">{milkWarning ? <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> : <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />}<p className="text-xs leading-relaxed">{milkWarning ? 'Privilégier le lait habituel emporté de France. Pour un produit local, utiliser uniquement la mesurette et les instructions de sa propre boîte.' : 'Les stocks et horaires peuvent changer. Vérifier la taille ou l’âge indiqué sur l’emballage avant d’acheter un grand format.'}</p></div>;
}
