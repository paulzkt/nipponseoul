import { Badge, Card, CardContent } from '@/components/ui';
import type { AirportTransfer } from '@/data/transfers';

export function TransferCard({ transfer }: { transfer: AirportTransfer }) {
  return (
    <Card className="overflow-hidden border-stone-200 bg-white py-0 ring-0 shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <Badge className="bg-[#173d3a] text-white">Transfert aéroport → hôtel</Badge>
        <h3 className="mt-3 text-lg font-bold">{transfer.city} · {transfer.date}</h3>
        <p className="mt-1 break-all text-xs text-stone-500">Réservation #{transfer.reference}</p>
        {transfer.bookingCode && <p className="mt-1 text-xs text-stone-500">Code de réservation : {transfer.bookingCode}</p>}
        <div className="mt-4 space-y-3 rounded-2xl bg-stone-50 p-3">
          <div><p className="text-sm font-bold">{transfer.pickup} · {transfer.airport}</p><p className="mt-1 text-xs text-stone-600">{transfer.airportAddress}</p></div>
          <div><p className="text-sm font-bold">{transfer.eta ? `Arrivée estimée ${transfer.eta} · ` : ''}{transfer.hotel}</p><p className="mt-1 text-xs text-stone-600">{transfer.address}</p></div>
        </div>
        <h4 className="mt-4 text-sm font-bold">Point de rendez-vous · {transfer.terminal}</h4>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{transfer.meeting}</p>
        <img src={transfer.photo} alt={`Photo du point de rendez-vous fourni pour ${transfer.airport}, ${transfer.terminal}`} width={560} height={transfer.dayId === 'oct01' ? 420 : 323} className="mt-3 h-auto w-full rounded-2xl" loading="lazy" />
      </CardContent>
    </Card>
  );
}
