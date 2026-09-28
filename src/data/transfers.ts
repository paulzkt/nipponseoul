import hanedaPhoto from '@/assets/images/haneda-meeting.png';
import gimpoPhoto from '@/assets/images/gimpo-meeting.png';

export const transfers = [
  {
    dayId: 'oct01', date: '1er octobre 2026', city: 'Tokyo', reference: 'w-7292439-1',
    airport: 'Haneda Airport (HND)', airportAddress: 'Haneda Airport, Ota City, Tokyo, Japan',
    pickup: '06:30', eta: '06:52', flight: 'AF 186', terminal: 'Terminal 3',
    hotel: 'Grand Prince Hotel Takanawa', address: '3-chōme-13-1 Takanawa, Minato City, Tokyo 108-0074, Japan',
    meeting: 'Le chauffeur vous attendra à l’intérieur du hall des arrivées avec une pancarte à votre nom.',
    photo: hanedaPhoto,
  },
  {
    dayId: 'oct12', date: '12 octobre 2026', city: 'Séoul', reference: 'w-7292470-1',
    airport: 'Gimpo International Airport (GMP)', airportAddress: 'Gimpo International Airport, Seoul, South Korea',
    pickup: '12:30', eta: null, bookingCode: '420103', flight: 'Peach Aviation 737', terminal: 'Terminal I',
    hotel: 'The Ambassador Seoul - A Pullman Hotel', address: '287, Dongho-ro, Jung-gu, Jung-Gu, 04618 Seoul, South Korea',
    meeting: 'Après la douane, le chauffeur vous attendra à la porte des arrivées avec une pancarte à votre nom. Si vous ne voyez pas votre nom, vérifiez que vous êtes à la bonne porte.',
    photo: gimpoPhoto,
  },
];
export type AirportTransfer = typeof transfers[number];
