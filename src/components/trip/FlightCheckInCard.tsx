import { Armchair, CheckCircle2, Luggage, Plane } from 'lucide-react';
import { Badge, Card, CardContent } from '@/components/ui';
import type { AirFranceOption } from '@/data/trip';
import { cn } from '@/lib/utils';

interface FlightCheckInCardProps {
  option: AirFranceOption;
  className?: string;
}

export function FlightCheckInCard({ option, className }: FlightCheckInCardProps) {
  return (
    <Card className={cn('overflow-hidden border border-sky-900/15 bg-[#eaf3f7] py-0 ring-0 shadow-sm', className)}>
      <CardContent className="p-0">
        <div className="bg-[#153f4d] p-4 text-white">
          <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-[#f4e5a4]"><Plane className="size-5" aria-hidden="true" /></span><div><div className="flex flex-wrap items-center gap-2"><Badge className="bg-[#f4e5a4] text-[#153f4d]">Check-in du jour</Badge><Badge className="gap-1 bg-emerald-600 text-white"><CheckCircle2 className="size-3" />Confirmé</Badge></div><h3 className="mt-2 text-lg font-bold">{option.route}</h3><p className="mt-1 text-xs text-sky-100">{option.flight}</p></div></div>
          <p className="mt-3 rounded-xl bg-white/10 p-3 text-xs leading-relaxed text-sky-50">{option.checkIn}</p>
        </div>
        <div className="grid gap-2 p-3">
          <div className="rounded-xl bg-white p-3"><p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-stone-400"><Armchair className="size-4 text-[#32746d]" />Sièges</p><div className="mt-2 flex flex-wrap gap-2">{option.seats.map(seat => <Badge key={seat.emd} variant="outline" className="min-h-8 border-stone-200 bg-stone-50 text-[#14231d]">{seat.traveler} · {seat.seat}</Badge>)}</div></div>
          <div className="rounded-xl bg-white p-3"><p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-stone-400"><Luggage className="size-4 text-[#32746d]" />Bagages supplémentaires</p><div className="mt-2 grid gap-1.5">{option.bags.map(bag => <p key={bag.emd} className="text-xs font-semibold">{bag.traveler} · 1 bagage de 23 kg</p>)}</div></div>
        </div>
      </CardContent>
    </Card>
  );
}
