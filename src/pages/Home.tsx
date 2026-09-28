import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Baby, BedDouble, ChevronRight, Clock3, Coffee, Landmark, Plane, Soup, TicketCheck, TrainFront, UtensilsCrossed } from 'lucide-react';
import { Badge, Button, Card, CardContent, Checkbox } from '@/components/ui';
import { TripRouteMap } from '@/components/trip/TripRouteMap';
import { dailyPlans } from '@/data/dailyPlan';
import { departureDate } from '@/data/trip';
import { useTripState } from '@/hooks/useTripState';
import { getTripDayContext } from '@/lib/tripDate';
import { cn } from '@/lib/utils';

function daysUntilDeparture(): number {
  return Math.max(0, Math.ceil((new Date(departureDate).getTime() - Date.now()) / 86_400_000));
}

const agendaIcons = {
  flight: Plane,
  transport: TrainFront,
  activity: Landmark,
  food: UtensilsCrossed,
  hotel: BedDouble,
  free: Clock3,
};

export default function Home() {
  const { state, toggleAgendaItem } = useTripState();
  const context = getTripDayContext();
  const day = dailyPlans[context.index];
  const completedCount = day.agenda.filter((_, index) => state.completedAgenda.includes(`${day.id}:${index}`)).length;
  const nextAgendaIndex = day.agenda.findIndex((_, index) => !state.completedAgenda.includes(`${day.id}:${index}`));
  const nextAgenda = day.agenda[nextAgendaIndex === -1 ? day.agenda.length - 1 : nextAgendaIndex];
  const progress = Math.round((completedCount / day.agenda.length) * 100);

  return (
    <div className="page-shell space-y-3">
      <section className="overflow-hidden rounded-[30px] bg-[#173d3a] text-white shadow-[0_18px_48px_rgba(20,35,29,.16)]">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge className={context.isTravelDay ? 'bg-[#ff6a57] text-white' : 'bg-[#f4e5a4] text-[#173d3a]'}>{context.isTravelDay ? 'Aujourd’hui' : context.hasEnded ? 'Voyage terminé' : `Aperçu · J-${daysUntilDeparture()}`}</Badge>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#b7d2ce]">{day.weekday} · {day.dateLabel}</p>
              <h1 className="mt-1 text-3xl font-bold leading-[.95] tracking-[-0.055em]">{day.city}</h1>
              <p className="mt-2 max-w-xs text-sm leading-snug text-white/80">{day.title}</p>
            </div>
            <div className="text-right"><span className="grid size-12 place-items-center rounded-full bg-white/10 text-lg font-bold text-[#f4e5a4]">J{day.dayNumber}</span><p className="mt-2 text-[9px] font-bold text-[#b7d2ce]">{progress}% fait</p></div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-4 text-[#14231d] shadow-lg">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#ff6a57]">Prochaine étape</p>
            <div className="mt-2 flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e5f0ed] text-[#176158]"><Clock3 className="size-5" aria-hidden="true" /></span>
              <div className="min-w-0"><p className="text-xs font-bold text-stone-500">{nextAgenda.time}</p><h2 className="mt-0.5 text-lg font-bold leading-tight">{nextAgenda.title}</h2><p className="mt-1 text-xs leading-relaxed text-stone-500">{nextAgenda.detail}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-card p-4" aria-labelledby="today-checklist">
        <div className="flex items-end justify-between gap-3">
          <div><p className="eyebrow">Votre journée</p><h2 id="today-checklist" className="mt-1 section-title">À faire aujourd’hui</h2></div>
          <span className="text-xs font-bold text-[#32746d]">{completedCount}/{day.agenda.length}</span>
        </div>
        <div className="step-timeline mt-3">
          {day.agenda.map((item, index) => {
            const itemId = `${day.id}:${index}`;
            const checked = state.completedAgenda.includes(itemId);
            const Icon = agendaIcons[item.kind];
            return (
              <label key={itemId} className="relative flex min-h-16 cursor-pointer items-start gap-3 border-b border-stone-100 py-3 last:border-0">
                <span className={cn('relative z-10 grid size-9 shrink-0 place-items-center rounded-full border-4 border-white', checked ? 'bg-[#32746d] text-white' : 'bg-[#e5f0ed] text-[#32746d]')}><Icon className="size-3.5" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-wide text-[#ff6a57]">{item.time}</span><span className={cn('mt-0.5 block text-sm font-bold leading-tight', checked && 'text-stone-400 line-through')}>{item.title}</span><span className="mt-1 block text-xs leading-relaxed text-stone-500">{item.detail}</span></span>
                <Checkbox checked={checked} onCheckedChange={() => toggleAgendaItem(itemId)} aria-label={`Marquer ${item.title} comme terminé`} />
              </label>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="need-to-know">
        <div className="mb-2 flex items-center justify-between"><h2 id="need-to-know" className="section-title">À savoir aujourd’hui</h2><Button asChild variant="ghost" size="sm" className="min-h-11 rounded-full px-3 text-xs"><Link to="/itineraire">Tous les détails<ArrowRight /></Link></Button></div>
        <div className="grid gap-2">
          <DailyFact icon={TrainFront} label="Transport" value={day.transport} detail={day.transportDuration} />
          <DailyFact icon={BedDouble} label="Où dormir" value={day.hotel} detail={day.hotelDetail} dark />
        </div>
      </section>

      <section className="surface-card overflow-hidden" aria-labelledby="meals-today">
        <div className="border-b border-stone-100 px-4 py-3"><h2 id="meals-today" className="section-title">Repas</h2></div>
        <div className="divide-y divide-stone-100 px-4">
          <MealRow icon={Coffee} label="Petit-déjeuner" value={day.breakfast} />
          <MealRow icon={Soup} label="Déjeuner" value={day.lunch} />
          <MealRow icon={UtensilsCrossed} label="Dîner" value={day.dinner} />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2" aria-label="Raccourcis du jour">
        <QuickAction to="/reservations" icon={TicketCheck} title="Mes billets" detail="Vols, trains et hôtels" />
        <QuickAction to="/baby" icon={Baby} title="Pour Adam" detail="Eau, couches et lait" />
      </section>

      <TripRouteMap className="mt-4 shadow-[0_14px_36px_rgba(20,35,29,.14)]" />
    </div>
  );
}

interface DailyFactProps {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  dark?: boolean;
}

function DailyFact({ icon: Icon, label, value, detail, dark = false }: DailyFactProps) {
  return (
    <Card className={cn('py-0 ring-0 shadow-sm', dark ? 'border-0 bg-[#173d3a] text-white' : 'border-stone-200 bg-white')}>
      <CardContent className="flex gap-3 p-4">
        <span className={cn('grid size-10 shrink-0 place-items-center rounded-full', dark ? 'bg-white/10 text-[#f4e5a4]' : 'bg-[#e5f0ed] text-[#176158]')}><Icon className="size-5" aria-hidden="true" /></span>
        <div className="min-w-0"><p className={cn('text-[9px] font-bold uppercase tracking-[0.15em]', dark ? 'text-[#b7d2ce]' : 'text-stone-400')}>{label}</p><p className="mt-1 text-sm font-bold leading-snug">{value}</p><p className={cn('mt-1 text-xs', dark ? 'text-white/65' : 'text-stone-500')}>{detail}</p></div>
      </CardContent>
    </Card>
  );
}

function MealRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div className="flex min-h-16 items-center gap-3 py-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#fff0ed] text-[#c83d33]"><Icon className="size-4" aria-hidden="true" /></span><div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[0.14em] text-stone-400">{label}</p><p className="mt-1 text-sm font-semibold leading-snug">{value}</p></div></div>;
}

function QuickAction({ to, icon: Icon, title, detail }: { to: string; icon: LucideIcon; title: string; detail: string }) {
  return (
    <Link to={to} className="min-h-28 rounded-3xl border border-stone-200 bg-white p-4 shadow-[0_6px_18px_rgba(20,35,29,.05)]">
      <span className="grid size-10 place-items-center rounded-full bg-[#e5f0ed] text-[#176158]"><Icon className="size-5" aria-hidden="true" /></span>
      <div className="mt-3 flex items-end justify-between gap-2"><div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-[10px] leading-tight text-stone-500">{detail}</p></div><ChevronRight className="size-4 shrink-0 text-stone-400" /></div>
    </Link>
  );
}
