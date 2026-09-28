import type { LucideIcon } from 'lucide-react';
import { Baby, BedDouble, Building2, BusFront, ChevronDown, Clock3, Coffee, Dumbbell, ExternalLink, Gift, MapPin, Pill, ShoppingBasket, Star, TrainFront, WashingMachine } from 'lucide-react';
import { Badge, Button, Card, CardContent, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui';
import type { HotelInfo } from '@/data/trip';
import { cn } from '@/lib/utils';

interface HotelDayInfoProps {
  hotel: HotelInfo;
  className?: string;
}

export function HotelDayInfo({ hotel, className }: HotelDayInfoProps) {
  return (
    <Card className={cn('overflow-hidden border-0 bg-[#173d3a] py-0 text-white ring-0 shadow-sm', className)}>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-[#f4e5a4]"><BedDouble className="size-5" aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#b7d2ce]">Votre hôtel aujourd’hui</p>
              <h3 className="mt-1 text-lg font-bold leading-tight">{hotel.name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2"><Badge className="bg-[#f4e5a4] text-[#173d3a]">{hotel.city}</Badge><span className="flex items-center gap-1 text-xs font-bold"><Star className="size-3.5 fill-[#ff6a57] text-[#ff6a57]" />{hotel.googleRating.toFixed(1)} · {hotel.googleReviewCount.toLocaleString('fr-FR')} avis</span></div>
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-white p-3 text-[#14231d]">
            <div className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#fff0ed] text-[#c83d33]"><Coffee className="size-4" aria-hidden="true" /></span><div><div className="flex flex-wrap items-center gap-2"><p className="text-[9px] font-bold uppercase tracking-[0.14em] text-stone-400">Petit-déjeuner</p><Badge variant="outline" className="border-rose-200 bg-rose-50 text-[8px] text-rose-800">Non inclus</Badge></div><p className="mt-1 text-sm font-bold">{hotel.breakfastPrice}</p>{hotel.breakfastChildPrice && <p className="mt-1 text-xs font-semibold">{hotel.breakfastChildPrice}</p>}<p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500"><Clock3 className="size-3.5" />{hotel.breakfastHours}</p></div></div>
          </div>
        </div>

        <HotelDetails icon={Dumbbell} title="Sport & musculation" summary={hotel.gymVerdict}>
          <p className="text-sm font-bold">{hotel.gymName}</p><p className="mt-1 text-xs leading-relaxed text-stone-600">{hotel.gymEquipment}</p><p className="mt-2 text-xs font-semibold text-[#176158]">{hotel.gymHours}</p><p className="mt-1 text-xs text-stone-500">{hotel.gymAccess}</p>
        </HotelDetails>

        <HotelDetails icon={MapPin} title="Services à proximité" summary="Laverie, courses, pharmacie, aimants et mall">
          <div className="divide-y divide-stone-100">
            <NearbyRow icon={WashingMachine} label="Laverie automatique" name={hotel.laundryName} walk={hotel.laundryWalkTime} hours={hotel.laundryHours} extra={hotel.laundryAveragePrice} url={hotel.laundryMapUrl} />
            <NearbyRow icon={ShoppingBasket} label="Supermarché" name={hotel.supermarketName} walk={hotel.supermarketWalkTime} hours={hotel.supermarketHours} url={hotel.supermarketMapUrl} />
            <NearbyRow icon={Pill} label="Pharmacie" name={hotel.pharmacyName} walk={hotel.pharmacyWalkTime} hours={hotel.pharmacyHours} url={hotel.pharmacyMapUrl} />
            <NearbyRow icon={Gift} label="Aimants & souvenirs" name={hotel.souvenirName} walk={hotel.souvenirWalkTime} hours={hotel.souvenirHours} url={hotel.souvenirMapUrl} />
            <NearbyRow icon={Building2} label="Centre commercial" name={hotel.mallName} walk={hotel.mallTravelTime} hours={hotel.mallHours} extra={`★ ${hotel.mallRating.toFixed(1)}`} url={hotel.mallMapUrl} />
          </div>
        </HotelDetails>

        <HotelDetails icon={TrainFront} title="Se déplacer depuis l’hôtel" summary={`${hotel.metroName} · ${hotel.metroWalkTime}`}>
          <TransitRow icon={TrainFront} label="Métro / train" name={hotel.metroName} detail={hotel.metroDetail} walk={hotel.metroWalkTime} accessibility={hotel.metroAccessibility} url={hotel.metroScheduleUrl} />
          <TransitRow icon={BusFront} label="Bus" name={hotel.busName} detail={hotel.busDetail} walk={hotel.busWalkTime} accessibility={hotel.busAccessibility} url={hotel.busScheduleUrl} />
        </HotelDetails>

        <div className="p-3"><Button asChild variant="outline" className="min-h-11 w-full rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"><a href={hotel.googleUrl} target="_blank" rel="noreferrer">Voir l’hôtel sur Google<ExternalLink /></a></Button></div>
      </CardContent>
    </Card>
  );
}

function HotelDetails({ icon: Icon, title, summary, children }: { icon: LucideIcon; title: string; summary: string; children: React.ReactNode }) {
  return (
    <Collapsible className="group border-t border-white/10 bg-white">
      <CollapsibleTrigger className="flex min-h-16 w-full items-center gap-3 px-4 text-left text-[#14231d]">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e5f0ed] text-[#176158]"><Icon className="size-4" aria-hidden="true" /></span>
        <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{title}</span><span className="mt-0.5 block truncate text-[10px] text-stone-500">{summary}</span></span>
        <ChevronDown className="size-4 text-stone-400 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t border-stone-100 bg-[#fafaf8] px-4 py-3 text-[#14231d]">{children}</CollapsibleContent>
    </Collapsible>
  );
}

interface NearbyRowProps {
  icon: LucideIcon;
  label: string;
  name: string;
  walk: string;
  hours: string;
  extra?: string;
  url: string;
}

function NearbyRow({ icon: Icon, label, name, walk, hours, extra, url }: NearbyRowProps) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <div className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#32746d]"><Icon className="size-3.5" aria-hidden="true" /></span><div className="min-w-0 flex-1"><p className="text-[8px] font-bold uppercase tracking-[0.14em] text-stone-400">{label}</p><p className="mt-0.5 text-xs font-bold leading-snug">{name}</p><p className="mt-1 text-[10px] text-stone-500">{walk} · {hours}{extra ? ` · ${extra}` : ''}</p><Button asChild variant="link" className="mt-1 h-auto min-h-8 p-0 text-[10px] text-[#176158]"><a href={url} target="_blank" rel="noreferrer">Itinéraire<ExternalLink className="size-3" /></a></Button></div></div>
    </div>
  );
}

function TransitRow({ icon: Icon, label, name, detail, walk, accessibility, url }: { icon: LucideIcon; label: string; name: string; detail: string; walk: string; accessibility: string; url: string }) {
  return (
    <div className="border-b border-stone-100 py-3 first:pt-0 last:border-0 last:pb-0">
      <div className="flex gap-3"><Icon className="mt-0.5 size-4 shrink-0 text-[#32746d]" aria-hidden="true" /><div><p className="text-[8px] font-bold uppercase tracking-[0.14em] text-stone-400">{label}</p><p className="mt-0.5 text-xs font-bold">{name}</p><p className="mt-1 text-[10px] leading-relaxed text-stone-500">{detail} · {walk}</p><p className="mt-2 flex items-center gap-1.5 rounded-lg bg-emerald-50 p-2 text-[10px] font-semibold text-emerald-900"><Baby className="size-3.5" />{accessibility}</p><Button asChild variant="link" className="mt-1 h-auto min-h-8 p-0 text-[10px] text-[#176158]"><a href={url} target="_blank" rel="noreferrer">Horaires<ExternalLink className="size-3" /></a></Button></div></div>
    </div>
  );
}
