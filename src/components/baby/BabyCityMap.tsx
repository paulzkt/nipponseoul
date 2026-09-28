import { useEffect, useMemo } from 'react';
import { divIcon, latLngBounds } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import type { BabyCity, BabyEssentialKind, BabyMapPlace } from '@/data/babyEssentials';
import { babyCityHotels } from '@/data/babyEssentials';

interface BabyCityMapProps {
  city: BabyCity;
  places: BabyMapPlace[];
  selectedId: string | null;
  onSelect: (placeId: string) => void;
  userPosition: UserMapPosition | null;
  className?: string;
}

export interface UserMapPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const markerStyle: Record<BabyEssentialKind, { symbol: string; background: string; label: string }> = {
  water: { symbol: '💧', background: '#176158', label: 'Eau' },
  diapers: { symbol: '🧷', background: '#c56b45', label: 'Couches' },
  milk: { symbol: '🍼', background: '#39688a', label: 'Lait' },
};

const hotelIcon = divIcon({
  className: 'restaurant-map-marker-shell',
  html: '<span class="restaurant-map-marker restaurant-map-marker-hotel">H</span>',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const userLocationIcon = divIcon({
  className: 'restaurant-map-marker-shell',
  html: '<span class="restaurant-user-location"><span></span></span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

function makeEssentialIcon(kind: BabyEssentialKind, selected: boolean) {
  const style = markerStyle[kind];
  return divIcon({
    className: 'restaurant-map-marker-shell',
    html: `<span class="baby-map-marker${selected ? ' baby-map-marker-selected' : ''}" style="background:${style.background}" aria-label="${style.label}">${style.symbol}</span>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
}

function MapViewport({ city, places }: { city: BabyCity; places: BabyMapPlace[] }) {
  const map = useMap();

  useEffect(() => {
    const hotel = babyCityHotels[city];
    const coordinates: [number, number][] = [
      [hotel.latitude, hotel.longitude],
      ...places.map(place => [place.latitude, place.longitude] as [number, number]),
    ];
    map.fitBounds(latLngBounds(coordinates), { padding: [32, 32], maxZoom: 14 });
  }, [city, map, places]);

  return null;
}

function UserLocationFocus({ position }: { position: UserMapPosition | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) map.flyTo([position.latitude, position.longitude], 16, { duration: 0.8 });
  }, [map, position]);

  return null;
}

export function BabyCityMap({ city, places, selectedId, onSelect, userPosition, className }: BabyCityMapProps) {
  const hotel = babyCityHotels[city];
  const icons = useMemo(
    () => places.map(place => makeEssentialIcon(place.kind, place.id === selectedId)),
    [places, selectedId],
  );

  return (
    <MapContainer
      key={city}
      center={[hotel.latitude, hotel.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className={className}
      aria-label={`Carte des essentiels bébé à ${city}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewport city={city} places={places} />
      <UserLocationFocus position={userPosition} />
      <Marker position={[hotel.latitude, hotel.longitude]} icon={hotelIcon}>
        <Popup><strong>{hotel.name}</strong><br />Votre hôtel</Popup>
      </Marker>
      {userPosition && (
        <Marker position={[userPosition.latitude, userPosition.longitude]} icon={userLocationIcon} zIndexOffset={1000}>
          <Popup>
            <strong>Votre position</strong><br />
            Précision approximative : {Math.round(userPosition.accuracy)} m
          </Popup>
        </Marker>
      )}
      {places.map((place, index) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={icons[index]}
          eventHandlers={{ click: () => onSelect(place.id) }}
        >
          <Popup>
            <div className="min-w-[205px] py-1">
              <span className="text-lg" aria-hidden="true">{markerStyle[place.kind].symbol}</span>
              <strong className="mt-1 block text-sm leading-tight text-[#14231d]">{place.product}</strong>
              <span className="mt-1 block text-xs font-semibold text-[#176158]">{place.store}</span>
              <span className="mt-2 block text-[11px] leading-relaxed text-stone-500">{place.address}</span>
              <span className="mt-2 block rounded-lg bg-[#f6f0e5] px-2 py-1.5 text-[11px] text-[#14231d]">{place.travelTime} · {place.hours}</span>
              <a className="mt-3 flex min-h-10 items-center justify-center rounded-xl bg-[#176158] px-3 text-xs font-bold text-white" href={place.mapUrl} target="_blank" rel="noreferrer">Ouvrir l’itinéraire</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
