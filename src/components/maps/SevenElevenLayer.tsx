import { divIcon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import walks from '@/data/sevenElevenHotelWalks.json';
import { restaurantHotels, type RestaurantCity } from '@/data/restaurants';

const icon = divIcon({
  className: 'seven-eleven-marker',
  html: '<span class="flex size-8 items-center justify-center rounded-lg border-2 border-white bg-orange-600 text-xl font-black text-white shadow-md">7</span>',
  iconSize: [32, 32], iconAnchor: [16, 16],
});

export function SevenElevenLayer({ city }: { city: RestaurantCity }) {
  const hotel = restaurantHotels[city];
  const stores = walks.cities[city].stores.filter(store => store.walkSeconds <= walks.maxWalkSeconds);
  return <>
    {stores.map(store => <Marker key={store.id} position={[store.latitude, store.longitude]} icon={icon} title={`7-Eleven · ${Math.ceil(store.walkSeconds / 60)} min à pied de l’hôtel`} zIndexOffset={-500}>
      <Popup><div className="max-w-[230px]">
        <strong>{store.name}</strong>
        <p>Environ {Math.ceil(store.walkSeconds / 60)} min à pied · {store.walkMeters} m depuis {hotel.name}.</p>
        <p className="text-xs">Trajet piéton estimé le 27/09/2026, hors pauses. Escaliers et accessibilité poussette non vérifiés.</p>
        {store.address && <p>{store.address}</p>}
        <a className="flex min-h-11 items-center underline" href={`https://www.google.com/maps/dir/?api=1&origin=${hotel.latitude},${hotel.longitude}&destination=${store.latitude},${store.longitude}&travelmode=walking`} target="_blank" rel="noreferrer">Itinéraire depuis l’hôtel</a>
        <a href={`https://www.openstreetmap.org/${store.id}`} target="_blank" rel="noreferrer">Fiche OpenStreetMap</a>
      </div></Popup>
    </Marker>)}
  </>;
}
