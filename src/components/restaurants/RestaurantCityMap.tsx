import { BabyFriendly } from '@/components/restaurants/BabyFriendly';
import { SevenElevenLayer } from '@/components/maps/SevenElevenLayer';
import { restaurantDisplayName } from '@/data/restaurants';
import { GoogleRating } from './GoogleRating';
import { useEffect, useMemo } from 'react';
import { divIcon, latLngBounds } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import type { RestaurantCity, RestaurantLocation, RestaurantPinKind } from '@/data/restaurants';
import { restaurantCityCenters, restaurantGoogleUrl, restaurantHotels } from '@/data/restaurants';

type MappedRestaurant = RestaurantLocation & { latitude: number; longitude: number };
const hasCoordinates = (restaurant: RestaurantLocation): restaurant is MappedRestaurant => restaurant.latitude !== undefined && restaurant.longitude !== undefined;

interface RestaurantCityMapProps {
  showSevenEleven: boolean;
  city: RestaurantCity;
  restaurants: RestaurantLocation[];
  selectedId: string | null;
  onSelect: (restaurantId: string) => void;
  userPosition: UserMapPosition | null;
  className?: string;
}

export interface UserMapPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface MapViewportProps {
  city: RestaurantCity;
  restaurants: RestaurantLocation[];
}

const hotelIcon = divIcon({
  className: 'restaurant-map-marker-shell',
  html: '<span class="restaurant-map-marker restaurant-map-marker-hotel">H</span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const userLocationIcon = divIcon({
  className: 'restaurant-map-marker-shell',
  html: '<span class="restaurant-user-location"><span></span></span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const makeRestaurantIcon = (pinKind: RestaurantPinKind, selected: boolean) => divIcon({
  className: 'restaurant-map-marker-shell',
  html: `<span class="restaurant-map-marker restaurant-map-marker-${pinKind}${selected ? ' restaurant-map-marker-selected' : ''}">${pinKind === 'halal' ? '☪' : '🐟'}</span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});


function MapViewport({ city, restaurants }: MapViewportProps) {
  const map = useMap();

  useEffect(() => {
    const hotel = restaurantHotels[city];
    const coordinates: [number, number][] = [
      [hotel.latitude, hotel.longitude],
      ...restaurants.filter(hasCoordinates).map(restaurant => [restaurant.latitude, restaurant.longitude] as [number, number]),
    ];

    if (coordinates.length > 1) {
      map.fitBounds(latLngBounds(coordinates), { padding: [28, 28], maxZoom: 13 });
    } else {
      map.setView([hotel.latitude, hotel.longitude], 14);
    }
  }, [city, map, restaurants]);

  return null;
}

function HotelFocusButton({ city }: { city: RestaurantCity }) {
  const map = useMap();
  const hotel = restaurantHotels[city];

  return (
    <button
      type="button"
      className="absolute right-3 top-3 z-[1000] min-h-11 rounded-xl border border-stone-300 bg-white px-3 text-sm font-semibold text-[#14231d] shadow-md"
      aria-label={`Voir l’hôtel : ${hotel.name}`}
      onClick={(event) => {
        event.stopPropagation();
        map.setView([hotel.latitude, hotel.longitude], 15);
      }}
      onDoubleClick={event => event.stopPropagation()}
    >
      H · Voir l’hôtel
    </button>
  );
}

function UserLocationFocus({ position }: { position: UserMapPosition | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) map.flyTo([position.latitude, position.longitude], 16, { duration: 0.8 });
  }, [map, position]);

  return null;
}

export function RestaurantCityMap({ showSevenEleven, city, restaurants, selectedId, onSelect, userPosition, className }: RestaurantCityMapProps) {
  const center = restaurantCityCenters[city];
  const hotel = restaurantHotels[city];
  const restaurantIcons = useMemo(
    () => restaurants.map(restaurant => makeRestaurantIcon(restaurant.pinKind ?? 'halal', restaurant.id === selectedId)),
    [restaurants, selectedId],
  );

  return (
    <MapContainer
      key={city}
      center={[center.latitude, center.longitude]}
      zoom={center.zoom}
      scrollWheelZoom={false}
      className={className}
      aria-label={`Carte des restaurants halal et seafood à ${city}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewport city={city} restaurants={restaurants} />
      <UserLocationFocus position={userPosition} />
      {showSevenEleven && <SevenElevenLayer city={city} />}
      <HotelFocusButton city={city} />
      <Marker position={[hotel.latitude, hotel.longitude]} icon={hotelIcon} zIndexOffset={2000} title={hotel.name}>
        <Popup>
          <strong>{hotel.name}</strong><br />Point de départ du séjour
        </Popup>
      </Marker>
      {userPosition && (
        <Marker position={[userPosition.latitude, userPosition.longitude]} icon={userLocationIcon} zIndexOffset={1000}>
          <Popup>
            <strong>Votre position</strong><br />
            Précision approximative : {Math.round(userPosition.accuracy)} m
          </Popup>
        </Marker>
      )}
      {restaurants.map((restaurant, index) => hasCoordinates(restaurant) ? (
        <Marker
          key={restaurant.id}
          position={[restaurant.latitude, restaurant.longitude]}
          icon={restaurantIcons[index]}
          eventHandlers={{ click: () => onSelect(restaurant.id) }}
        >
          <Popup>
            <div className="min-w-[190px] py-1">
              <strong className="block text-sm leading-tight text-[#14231d]">{restaurantDisplayName(restaurant)}</strong>
              <span className="mt-1 block text-xs text-stone-500">{restaurant.category} · {restaurant.halalStatus}</span>
              <BabyFriendly id={restaurant.id} />
                  <GoogleRating restaurant={restaurant} />
              <span className="mt-2 block text-[11px] text-stone-500">
                {restaurant.alcoholPolicy ? `${restaurant.alcoholPolicy} · ` : ''}{restaurant.pinKind === 'seafood' ? 'Seafood' : restaurant.pinKind === 'both' ? 'Halal + seafood' : 'Halal'}
              </span>
              <a className="mt-3 flex min-h-10 items-center justify-center rounded-xl bg-[#176158] px-3 text-xs font-bold text-white" href={restaurantGoogleUrl(restaurant)} target="_blank" rel="noreferrer">Ouvrir dans Google Maps</a>
            </div>
          </Popup>
        </Marker>
      ) : null)}
    </MapContainer>
  );
}
