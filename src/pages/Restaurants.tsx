import { restaurantBabyInfo } from '@/data/restaurantBaby';
import { restaurantSummary } from '@/data/restaurantSummary';
import { hotelDistance, formatRestaurantBudget, sortLabels, sortRestaurants, type RestaurantSort } from '@/data/restaurantSorting';
import { BabyFriendly } from '@/components/restaurants/BabyFriendly';
import { restaurantDisplayName } from '@/data/restaurants';
import { GoogleRating } from '@/components/restaurants/GoogleRating';
import { useMemo, useState } from 'react';
import { Baby, Crosshair, ExternalLink, Fish, Hotel, LoaderCircle, MapPinned, MoonStar, Search, Star, UtensilsCrossed } from 'lucide-react';
import { Badge, Button, Card, CardContent, Input, Tabs, TabsList, TabsTrigger } from '@/components/ui';
import { RestaurantCityMap } from '@/components/restaurants/RestaurantCityMap';
import type { UserMapPosition } from '@/components/restaurants/RestaurantCityMap';
import { cn } from '@/lib/utils';
import {
  halalRestaurants,
  navitoSelectionUrl,
  restaurantCategories,
  restaurantGoogleUrl,
  restaurantHotels,
} from '@/data/restaurants';
import type { HalalStatus, RestaurantCategory, RestaurantCity, RestaurantLocation } from '@/data/restaurants';

type PinFilter = 'all' | 'halal' | 'seafood';
type LocationStatus = 'idle' | 'loading' | 'success' | 'error';

const cities: RestaurantCity[] = ['Tokyo', 'Kyoto', 'Osaka', 'Seoul'];
const cityLabels: Record<RestaurantCity, string> = { Tokyo: 'Tokyo', Kyoto: 'Kyoto', Osaka: 'Osaka', Seoul: 'Séoul' };
const statusClasses: Record<HalalStatus, string> = {
  'Certifié halal': 'border-emerald-200 bg-emerald-50 text-emerald-800',
  Halal: 'border-teal-200 bg-teal-50 text-teal-800',
  'Halal-friendly': 'border-amber-200 bg-amber-50 text-amber-800',
  'Non halal · seafood': 'border-sky-200 bg-sky-50 text-sky-800',
  'À vérifier': 'border-stone-300 bg-stone-100 text-stone-600',
};

const formatReviewCount = (count: number): string => new Intl.NumberFormat('fr-FR').format(count);

const isRestaurantCity = (value: string): value is RestaurantCity => cities.some(city => city === value);

function rankingValue(restaurant: RestaurantLocation): number {
  return (restaurant.googleRating ?? 0) * 1_000_000 + (restaurant.googleReviewCount ?? 0);
}

function distanceFromUser(position: UserMapPosition, restaurant: RestaurantLocation): number {
  if (restaurant.latitude === undefined || restaurant.longitude === undefined) return Infinity;
  const earthRadiusKm = 6371;
  const toRadians = (degrees: number): number => degrees * Math.PI / 180;
  const latitudeDelta = toRadians(restaurant.latitude - position.latitude);
  const longitudeDelta = toRadians(restaurant.longitude - position.longitude);
  const originLatitude = toRadians(position.latitude);
  const destinationLatitude = toRadians(restaurant.latitude);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(originLatitude) * Math.cos(destinationLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function formatDistance(distanceKm: number): string {
  if (!Number.isFinite(distanceKm)) return 'Distance indisponible';
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`;
  return `${distanceKm.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`;
}

export default function Restaurants() {
  const [city, setCity] = useState<RestaurantCity>('Tokyo');
  const [sortByCity, setSortByCity] = useState<Record<RestaurantCity, RestaurantSort[]>>({ Tokyo: [], Kyoto: [], Osaka: [], Seoul: [] });
  const criteria = sortByCity[city];
  const toggleSort = (criterion: RestaurantSort) => setSortByCity(previous => ({ ...previous, [city]: previous[city].includes(criterion) ? previous[city].filter(item => item !== criterion) : [...previous[city], criterion] }));
  const [category, setCategory] = useState<RestaurantCategory | 'Tous'>('Tous');
  const [babyOnly, setBabyOnly] = useState<boolean>(false);
  const [showSevenEleven, setShowSevenEleven] = useState(true);
  const [pinFilter, setPinFilter] = useState<PinFilter>('all');
  const [query, setQuery] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<UserMapPosition | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [locationError, setLocationError] = useState<string>('');

  const cityRestaurants = useMemo(() => halalRestaurants.filter(restaurant => restaurant.city === city), [city]);
  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fr');
    const matchingRestaurants = cityRestaurants.filter(restaurant => {
      const matchesCategory = category === 'Tous' || restaurant.category === category;
      const pinKind = restaurant.pinKind ?? 'halal';
      const matchesPin = pinFilter === 'all'
        || (pinFilter === 'halal' && (pinKind === 'halal' || pinKind === 'both'))
        || (pinFilter === 'seafood' && (pinKind === 'seafood' || pinKind === 'both'));
      const matchesQuery = !normalizedQuery || `${restaurantDisplayName(restaurant)} ${restaurant.area} ${restaurant.category} ${restaurant.note ?? ""}`.toLocaleLowerCase('fr').includes(normalizedQuery);
      return matchesCategory && matchesPin && matchesQuery && (!babyOnly || restaurantBabyInfo[restaurant.id]?.status === 'yes');
    });

    return sortRestaurants(matchingRestaurants, criteria);
  }, [category, cityRestaurants, pinFilter, query, criteria, babyOnly]);

  const topTen = useMemo(
    () => [...cityRestaurants]
      .filter(restaurant => (!babyOnly || restaurantBabyInfo[restaurant.id]?.status === 'yes') && restaurant.googleRating !== undefined && restaurant.halalStatus !== 'À vérifier')
      .sort((left, right) => rankingValue(right) - rankingValue(left))
      .slice(0, 10),
    [cityRestaurants, babyOnly],
  );

  const changeCity = (value: string): void => {
    if (isRestaurantCity(value)) {
      setCity(value);
      setCategory('Tous');
      setPinFilter('all');
      setQuery('');
      setSelectedId(null);
      setUserPosition(null);
      setLocationStatus('idle');
      setLocationError('');
    }
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
        <div>
          <p className="eyebrow">Carnet gourmand</p>
          <h1 className="page-title">Restaurants</h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600">Toutes les adresses partagées, classées par ville et placées autour de chaque hôtel.</p>
        </div>
        <Badge variant="outline" className="w-fit border-[#32746d]/25 bg-white px-3 py-1.5 text-[#176158]">
          {cityRestaurants.length} adresses suivies
        </Badge>
      </header>
      <p className="mt-2 text-xs text-stone-500">R : réservation nécessaire · NR : sans réservation · AV : à vérifier.</p>

      <section className="mt-4 overflow-hidden rounded-[26px] border border-stone-200 bg-[#14231d] p-4 text-white shadow-sm" aria-labelledby="google-top-title">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#f1d582]">Sélection actuelle</p>
            <h2 id="google-top-title" className="mt-1 font-display text-2xl font-bold">Top 10 Google · {cityLabels[city]}</h2>
          </div>
          <Star className="size-6 fill-[#f1d582] text-[#f1d582]" aria-hidden="true" />
        </div>
        <div className="scrollbar-none -mx-1 mt-4 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
          {topTen.map((restaurant, index) => (
            <a
              key={restaurant.id}
              href={restaurantGoogleUrl(restaurant)}
              target="_blank"
              rel="noreferrer"
              className="min-w-[190px] snap-start rounded-2xl border border-white/10 bg-white/8 p-3 transition hover:bg-white/14"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#f1d582]">#{index + 1} · {restaurant.category}</span>
              <span className="mt-1 block text-sm font-semibold leading-snug">{restaurantDisplayName(restaurant)}</span>
              <span className="mt-2 flex items-center gap-1 text-xs text-white/75"><Star className="size-3 fill-[#f1d582] text-[#f1d582]" /> {restaurant.googleRating?.toFixed(1)}{restaurant.googleReviewCount ? ` · ${formatReviewCount(restaurant.googleReviewCount)} avis` : ' · avis à confirmer'}</span>
            </a>
          ))}
        </div>
      </section>

      <Tabs value={city} onValueChange={changeCity} className="mt-4 h-12 gap-0">
        <TabsList className="!grid !h-12 w-full grid-cols-4 overflow-hidden rounded-2xl bg-white p-1 shadow-sm">
          {cities.map(item => (
            <TabsTrigger
              key={item}
              value={item}
              className="!h-full min-h-0 rounded-xl px-1 py-0 text-xs after:hidden data-active:bg-[#32746d] data-active:text-white"
            >
              {cityLabels[item]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <section className="mt-3 overflow-hidden rounded-[26px] border border-stone-200 bg-white shadow-sm" aria-label={`Carte de ${cityLabels[city]}`}>
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e5f0ed] text-[#176158]"><Hotel className="size-5" aria-hidden="true" /></span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-stone-400">Pin hôtel</p>
              <p className="truncate text-sm font-semibold text-[#14231d]">{restaurantHotels[city].name}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button type="button" size="sm" variant="outline" onClick={locateUser} disabled={locationStatus === 'loading'} className="min-h-10 rounded-full border-[#32746d]/30 px-3 text-[#176158]">
              {locationStatus === 'loading' ? <LoaderCircle className="size-4 animate-spin" /> : <Crosshair className="size-4" />}
              <span className="hidden sm:inline">{locationStatus === 'success' ? 'Me recentrer' : 'Me localiser'}</span>
            </Button>
            <Badge className="bg-[#f1d582] text-[#14231d]">{filteredRestaurants.length} pins</Badge>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 bg-stone-50 px-4 py-3" aria-label="Légende et filtres de la carte">
          <Button type="button" size="sm" variant={pinFilter === 'halal' ? 'default' : 'outline'} aria-pressed={pinFilter === 'halal'} onClick={() => setPinFilter(pinFilter === 'halal' ? 'all' : 'halal')} className={cn('min-h-9 rounded-full', pinFilter === 'halal' && 'bg-emerald-700 hover:bg-emerald-800')}>
            <MoonStar className="size-4" /> Halal
          </Button>
          <Button type="button" size="sm" variant={pinFilter === 'seafood' ? 'default' : 'outline'} aria-pressed={pinFilter === 'seafood'} onClick={() => setPinFilter(pinFilter === 'seafood' ? 'all' : 'seafood')} className={cn('min-h-9 rounded-full', pinFilter === 'seafood' && 'bg-sky-700 hover:bg-sky-800')}>
            <Fish className="size-4" /> Poisson &amp; seafood
          </Button>
          <Button type="button" size="sm" variant={babyOnly ? 'default' : 'outline'} aria-pressed={babyOnly} onClick={() => { setBabyOnly(value => !value); setSelectedId(null); }} className={cn('min-h-11 rounded-full', babyOnly && 'bg-emerald-700 hover:bg-emerald-800')}>
            <Baby className="size-4" aria-hidden="true" /> Baby-friendly
          </Button>
          <Button type="button" size="sm" variant={showSevenEleven ? 'default' : 'outline'} aria-pressed={showSevenEleven} onClick={() => setShowSevenEleven(value => !value)} className={cn('min-h-11 rounded-full', showSevenEleven && 'bg-orange-600 hover:bg-orange-700')}>
            <span className="text-base font-black" aria-hidden="true">7</span> 7-Eleven
          </Button>
          {pinFilter !== 'all' && <Button type="button" size="sm" variant="ghost" onClick={() => setPinFilter('all')} className="min-h-9 rounded-full text-stone-500">Tous les pins</Button>}
          <p className="basis-full text-[10px] leading-relaxed text-stone-500">Vert : adresse halal, nécessaire pour les plats de viande et les ramen · bleu : options poisson, sushi, sashimi et fruits de mer, y compris dans les restaurants servant de la viande · bicolore : adresse halal proposant aussi sushi ou seafood.</p>
          {locationError && <p className="basis-full rounded-xl bg-red-50 px-3 py-2 text-[10px] font-medium leading-relaxed text-red-700" role="alert">{locationError}</p>}
        </div>
        <RestaurantCityMap showSevenEleven={showSevenEleven} city={city} restaurants={filteredRestaurants} selectedId={selectedId} onSelect={setSelectedId} userPosition={userPosition} className="h-[390px] w-full" />
      </section>

      <section className="mt-4" aria-labelledby="restaurant-list-title">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="eyebrow">{cityLabels[city]}</p>
            <h2 id="restaurant-list-title" className="section-title">Choisir une adresse</h2>
          </div>
          <a href={navitoSelectionUrl} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-1 text-xs font-semibold text-[#176158]">Source Navito <ExternalLink className="size-3.5" /></a>
        </div>

        <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-3" aria-label="Trier les restaurants">
          <p className="text-sm font-semibold">Trier · {cityLabels[city]}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(['distance', 'rating', 'price'] as const).map(criterion => (
              <Button key={criterion} type="button" variant={criteria.includes(criterion) ? 'default' : 'outline'} aria-pressed={criteria.includes(criterion)} onClick={() => toggleSort(criterion)} className="min-h-11 rounded-full">
                {criteria.includes(criterion) && <span>{criteria.indexOf(criterion) + 1} · </span>}{sortLabels[criterion]}
              </Button>
            ))}
            {criteria.length > 0 && <Button type="button" variant="ghost" className="min-h-11" onClick={() => setSortByCity(previous => ({ ...previous, [city]: [] }))}>Réinitialiser</Button>}
          </div>
          <p className="mt-2 text-xs text-stone-500" aria-live="polite">{criteria.map((criterion, index) => `${index + 1}. ${sortLabels[criterion]}`).join(' → ')}</p>
        </div>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" aria-hidden="true" />
          <Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Nom, quartier ou cuisine…" className="min-h-12 rounded-2xl bg-white pl-10" aria-label="Rechercher un restaurant" />
        </div>

        <div className="scrollbar-none -mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-1">
          {(['Tous', ...restaurantCategories] as const).map(item => (
            <Button key={item} type="button" size="sm" variant={category === item ? 'default' : 'outline'} onClick={() => setCategory(item)} className={cn('min-h-10 shrink-0 rounded-full', category === item && 'bg-[#14231d] hover:bg-[#253d32]')}>{item}</Button>
          ))}
        </div>

        <div className="mt-3 grid gap-2">
          {filteredRestaurants.map(restaurant => (
            <Card key={restaurant.id} className={cn('cursor-pointer border-stone-200 bg-white py-0 shadow-sm transition', selectedId === restaurant.id && 'border-[#32746d] ring-2 ring-[#32746d]/15')} onClick={() => setSelectedId(restaurant.id)}>
              <CardContent className="flex gap-3 p-3.5">
                <span className={cn(
                  'grid size-9 shrink-0 place-items-center rounded-full text-white',
                  (restaurant.pinKind ?? 'halal') === 'halal' && 'bg-emerald-700',
                  restaurant.pinKind === 'seafood' && 'bg-sky-700',
                  restaurant.pinKind === 'both' && 'restaurant-pin-both',
                )}>
                  {(restaurant.pinKind ?? 'halal') === 'halal' ? <MoonStar className="size-4" /> : <Fish className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-base font-bold leading-tight text-[#14231d]">{restaurantDisplayName(restaurant)}</h3>
                      <p className="mt-1 text-xs text-stone-500">{restaurant.area} · {restaurant.category}</p>
                    </div>
                    <div className="grid shrink-0 justify-items-end gap-1">
                      <GoogleRating restaurant={restaurant} />
                      {userPosition && <span className="flex items-center gap-1 text-[10px] font-bold text-sky-700"><Crosshair className="size-3" />{formatDistance(distanceFromUser(userPosition, restaurant))}</span>}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Badge variant="outline" className={statusClasses[restaurant.halalStatus]}>{restaurant.halalStatus}</Badge>
                    {restaurant.alcoholPolicy && <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-800">{restaurant.alcoholPolicy}</Badge>}
                  </div>
                  <p className="mt-2 text-xs text-stone-500">Hôtel : {hotelDistance(restaurant) === undefined ? 'distance inconnue' : `${formatDistance(hotelDistance(restaurant) ?? Infinity)} à vol d’oiseau`} · {formatRestaurantBudget(restaurant)}</p>
                  <BabyFriendly id={restaurant.id} />
                  <p className="mt-1 text-xs leading-relaxed text-stone-600">{restaurantSummary(restaurant)}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                  {restaurant.websiteUrl && <Button asChild size="sm" variant="outline" className="min-h-11 rounded-xl"><a href={restaurant.websiteUrl} target="_blank" rel="noreferrer">Infos & réservation</a></Button>}
                  <Button asChild size="sm" variant="outline" className="min-h-11 rounded-xl border-[#32746d]/25 text-[#176158]">
                    <a href={restaurantGoogleUrl(restaurant)} target="_blank" rel="noreferrer"><MapPinned className="size-4" /> Google Maps</a>
                  </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredRestaurants.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
              <UtensilsCrossed className="mx-auto size-6 text-stone-400" aria-hidden="true" />
              <p className="mt-2 text-sm text-stone-500">Aucune adresse ne correspond à ces filtres.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
