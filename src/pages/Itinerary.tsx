import { TravelDocumentsLink } from '@/components/trip/TravelDocumentsLink';
import { activityDepartures } from '@/data/activityDepartures';
import { ContactText } from '@/components/trip/ContactText';
import { RestaurantMealPanel } from '@/components/trip/RestaurantMealPanel';
import { LuggageReminder } from '@/components/trip/LuggageReminder';
import { transfers } from '@/data/transfers';
import { TransferCard } from '@/components/trip/TransferCard';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Armchair,
  BedDouble,
  Building2,
  BusFront,
  Check,
  Clock3,
  ExternalLink,
  Gift,
  HouseHeart,
  Landmark,
  MapPin,
  Navigation,
  Pill,
  Plane,
  ShoppingBasket,
  Sparkles,
  TicketCheck,
  TrainFront,
  UtensilsCrossed,
  WashingMachine,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Checkbox,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { FlightCheckInCard } from '@/components/trip/FlightCheckInCard';
import { airbnbDaySuggestions } from '@/data/airbnbExperiences';
import { dailyPlans, eventsOfDay } from '@/data/dailyPlan';
import type { AgendaItem, DailyPlan, EventOfDay } from '@/data/dailyPlan';
import { loungeRecommendations } from '@/data/loungeRecommendations';
import type { LoungeDayPlan } from '@/data/loungeRecommendations';
import { dailyRecommendations } from '@/data/recommendations';
import { airFranceOptions, hotels, magnetCities } from '@/data/trip';
import type { AirFranceOption, HotelInfo } from '@/data/trip';
import { useTripState } from '@/hooks/useTripState';
import { cn } from '@/lib/utils';
import { getTripDayContext, getTripDayStatus } from '@/lib/tripDate';
import type { TripDayStatus } from '@/lib/tripDate';

const agendaIcons: Record<AgendaItem['kind'], LucideIcon> = {
  flight: Plane,
  transport: TrainFront,
  activity: Landmark,
  food: UtensilsCrossed,
  hotel: BedDouble,
  free: Clock3,
};

const assistantTabs = [
  { value: 'now', label: 'Maintenant', icon: Navigation },
  { value: 'activities', label: 'Activités', icon: Landmark },
  { value: 'transport', label: 'Transport', icon: TrainFront },
  { value: 'restaurant', label: 'Restaurant', icon: UtensilsCrossed },
  { value: 'around', label: 'Autour', icon: MapPin },
];

export default function Itinerary() {
  const [activeIndex, setActiveIndex] = useState<number>(() => getTripDayContext().index);
  const dayButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const { state, toggleMagnet } = useTripState();
  const day = dailyPlans[activeIndex];
  const hotel = hotels.find(item => item.name === day.hotel);
  const loungePlan = loungeRecommendations[day.id];
  const checkInOption = airFranceOptions.find(option => option.dayId === day.id);
  const dayStatus = getTripDayStatus(activeIndex);
  const eventOfDay = eventsOfDay[day.id];
  const rawDayEvents = eventOfDay === undefined ? [] : Array.isArray(eventOfDay) ? eventOfDay : [eventOfDay];
  const dayEvents = rawDayEvents.filter(event => (event.paid || event.included || event.confirmed || event.planned) && !event.warning);
  const visibleTabs = assistantTabs.filter(tab => {
    if (tab.value === 'around') return Boolean(hotel);
    return true;
  });
  const mainTabColumns = visibleTabs.length as 4 | 5;
  const magnetCity = day.id === 'oct08'
    ? magnetCities.find(city => city.id === 'nara')
    : magnetCities.find(city => city.city === day.city);

  useEffect(() => {
    dayButtons.current[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIndex]);

  const selectDay = (index: number): void => {
    setActiveIndex(Math.max(0, Math.min(dailyPlans.length - 1, index)));
  };

  return (
    <div className="page-shell pb-4">
      <header className="overflow-hidden rounded-[30px] bg-[#173d3a] text-white shadow-[0_18px_48px_rgba(20,35,29,.16)]">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Badge className="bg-[#ff6a57] text-white">Assistant quotidien</Badge>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#b7d2ce]">{day.weekday} · {day.dateLabel}</p>
              <h1 className="mt-1 text-3xl font-bold leading-[.95] tracking-[-0.055em]">{day.city}</h1>
              <p className="mt-2 text-sm leading-snug text-white/80">{day.title}</p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 text-lg font-bold text-[#f4e5a4]">J{day.dayNumber}</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <HeaderFact label="Statut" value={dayStatus === 'completed' ? 'Terminée' : dayStatus === 'today' ? 'Aujourd’hui' : 'À venir'} />
            <HeaderFact label="Nuit" value={day.hotel === 'Nuit en vol' ? 'En vol' : day.hotel === 'Pas de nuit d’hôtel' ? 'Paris' : day.city} />
            <HeaderFact label="Pays" value={day.country.split('→')[0].trim()} />
          </div>
        </div>
      </header>

      <nav className="-mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-1 scrollbar-none" aria-label="Choisir une journée">
        {dailyPlans.map((plan, index) => (
          <Button
            key={plan.id}
            ref={element => { dayButtons.current[index] = element; }}
            variant="ghost"
            onClick={() => selectDay(index)}
            className={cn(
              'h-auto min-w-[67px] shrink-0 rounded-2xl border px-3 py-2.5',
              activeIndex === index
                ? 'border-[#14231d] bg-[#14231d] text-white shadow-md hover:bg-[#14231d] hover:text-white'
                : 'border-stone-200 bg-white text-stone-500 hover:bg-stone-50',
            )}
            aria-current={activeIndex === index ? 'date' : undefined}
          >
            <span className="text-center">
              <span className="block text-[8px] font-bold uppercase tracking-wider">Jour {plan.dayNumber}</span>
              <span className="mt-0.5 block font-display text-sm">{plan.shortDate}</span>
              {getTripDayStatus(index) === 'completed' && <Check className="mx-auto mt-1 size-3 text-[#f4e5a4]" aria-label="Journée terminée automatiquement" />}
            </span>
          </Button>
        ))}
      </nav>

      {day.id === 'oct10' && <aside className="my-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" aria-label="Rappel hôtel de Séoul">
        <p className="font-bold">10 octobre · Appeler l’hôtel de Séoul</p>
        <p className="mt-1 text-xs leading-relaxed">The Ambassador Seoul – Pullman : reconfirmer que la chambre réservée dès le 11 octobre sera bien conservée pour notre arrivée le 12 octobre.</p>
        <a href="tel:+82222751101" className="mt-2 inline-flex min-h-11 items-center font-bold underline">Appeler · +82 2-2275-1101</a>
      </aside>}

      <Tabs key={day.id} defaultValue="now" className="mt-2 gap-0">
        <div className="sticky top-16 z-30 -mx-3 border-y border-stone-200/80 bg-[#f4f5f1]/95 px-2 py-2 backdrop-blur-xl">
          <FixedTabGrid columns={mainTabColumns} className="gap-0.5">
            {visibleTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.value} value={tab.value} className="min-h-12 min-w-0 flex-none flex-col gap-1 rounded-xl px-0.5 text-[7px] tracking-tight data-active:bg-[#173d3a] data-active:text-white sm:text-[9px]">
                  <Icon className="size-3.5" aria-hidden="true" />{tab.label}
                </TabsTrigger>
              );
            })}
          </FixedTabGrid>
        </div>

        <TabsContent value="now" className="mt-3">
          <LuggageReminder dayId={day.id} />
          <NowPanel day={day} events={dayEvents} status={dayStatus} />
          {day.id === 'oct15' && <div className="mt-3"><InfoCard icon={Armchair} eyebrow="Avant le vol · salon recommandé" title="Matina Lounge · Terminal 2" detail="Premier choix pour un repas avant le vol. Ouvert dès 06:00, niveau 4, près de la porte 252. Si la file est longue, choisir le Sky Hub le plus proche de votre porte. Détails dans Transport → Lounge." tone="green" url="https://www.walkerhill.com/transithotel/kr/lounge/Matina.jsp" /></div>}
        </TabsContent>

        <TabsContent value="activities" className="mt-3">
          <LuggageReminder dayId={day.id} />
          <ActivitiesPanel day={day} />
        </TabsContent>

        <TabsContent value="transport" className="mt-3">
          <TransportPanel day={day} hotel={hotel} checkInOption={checkInOption} loungePlan={loungePlan} />
        </TabsContent>

        <TabsContent value="restaurant" className="mt-3">
          <RestaurantMealPanel city={day.city} />
        </TabsContent>

        <TabsContent value="around" className="mt-3">
          {hotel ? (
            <NearbyPanel hotel={hotel} magnetDone={magnetCity ? state.magnetsCollected.includes(magnetCity.id) : false} onToggleMagnet={magnetCity ? () => toggleMagnet(magnetCity.id) : undefined} />
          ) : (
            <EmptyPanel icon={MapPin} title="Aucun hôtel aujourd’hui" detail="Les services de proximité apparaîtront dès la première nuit à destination." />
          )}
        </TabsContent>

      </Tabs>
    </div>
  );
}

function HeaderFact({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-white/10 px-3 py-2"><p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#b7d2ce]">{label}</p><p className="mt-1 truncate text-xs font-bold">{value}</p></div>;
}

const eventKindLabels: Record<EventOfDay['kind'], string> = {
  transfer: 'Transfert',
  activity: 'Activité',
  excursion: 'Excursion',
  train: 'Train',
  flight: 'Vol',
  hotel: 'Hôtel',
};

const eventKindIcons: Record<EventOfDay['kind'], LucideIcon> = {
  transfer: BusFront,
  activity: Landmark,
  excursion: BusFront,
  train: TrainFront,
  flight: Plane,
  hotel: BedDouble,
};

function getEventIcon(event: EventOfDay): LucideIcon {
  if (/food|fish|tsukiji|market|restaurant/i.test(event.title)) return UtensilsCrossed;
  if (event.bookingUrl) return HouseHeart;
  return eventKindIcons[event.kind];
}

function getEventTheme(event: EventOfDay): { card: string; icon: string; type: string } {
  if (event.bookingUrl) {
    return {
      card: 'border-blue-200 bg-blue-50/70',
      icon: 'bg-blue-600 text-white',
      type: 'bg-blue-600 text-white',
    };
  }
  if (event.included) {
    return {
      card: 'border-stone-300 bg-stone-50',
      icon: 'bg-[#171717] text-white',
      type: 'bg-[#171717] text-white',
    };
  }
  if (event.paid) {
    return {
      card: 'border-orange-200 bg-orange-50/70',
      icon: 'bg-[#ff5b22] text-white',
      type: 'bg-[#ff5b22] text-white',
    };
  }
  if (event.confirmed) {
    return {
      card: 'border-amber-200 bg-amber-50/70',
      icon: 'bg-amber-700 text-white',
      type: 'bg-amber-700 text-white',
    };
  }
  if (event.planned) {
    return {
      card: 'border-emerald-200 bg-emerald-50/60',
      icon: 'bg-emerald-700 text-white',
      type: 'bg-emerald-700 text-white',
    };
  }
  return {
    card: 'border-stone-200 bg-stone-50',
    icon: 'bg-[#173d3a] text-white',
    type: 'bg-[#173d3a] text-white',
  };
}

function NowPanel({ day, events, status }: { day: DailyPlan; events: EventOfDay[]; status: TripDayStatus }) {
  return (
    <section className="space-y-3">
      {day.alert && <div className="rounded-2xl border border-red-300 bg-red-50 p-3 text-xs font-semibold leading-relaxed text-red-950">⚠️ {day.alert}</div>}
      {day.note && <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950">À retenir : {day.note}</div>}
      {events.length > 0 && <Card className="overflow-hidden border-2 border-[#ff6a57] bg-white py-0 text-[#14231d] ring-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[#d84a43]">Event of the Day</p>
          <div className="mt-3 space-y-3">
            {events.map((event, index) => {
              const transfer = event.kind === 'transfer' ? transfers.find(item => item.dayId === day.id) : undefined;
              const matchingItem = day.agenda.find(item =>
                (event.bookingUrl && item.bookingUrl === event.bookingUrl) || item.title === event.title ||
                (event.kind === 'excursion' && item.excursion));
              const stops = event.steps ?? matchingItem?.excursion?.stops;
              const activityItems = day.id === 'oct03' && event.kind === 'activity'
                ? day.agenda.slice(1)
                : day.id === 'oct11' && event.kind === 'activity'
                  ? day.agenda.filter(item => item.kind === 'activity')
                  : [];
              const departure = (event.kind === 'activity' || event.kind === 'excursion')
                ? activityDepartures.filter(item => item.dayId === day.id)[day.id === 'oct02' ? index : 0]
                : day.id === 'sep30' && event.kind === 'flight' ? { leave: '05:45 · en taxi / voiture' }
                  : day.id === 'oct12' && event.kind === 'flight' ? { leave: '05:30 · taxi à réserver' }
                  : day.id === 'oct15' && event.kind === 'flight' ? { leave: '06:15 · taxi à réserver' } : undefined;
              const EventIcon = getEventIcon(event);
              const theme = getEventTheme(event);
              const isAirbnb = Boolean(event.bookingUrl);
              return (
                <article key={`${event.title}:${index}`} className={cn('rounded-3xl border p-3', theme.card)}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className={cn('grid size-10 shrink-0 place-items-center rounded-full', theme.icon)}><EventIcon className="size-4" aria-hidden="true" /></span>
                      <div className="min-w-0 flex-1">
                        {events.length > 1 && <p className="text-[8px] font-black uppercase tracking-[0.14em] text-stone-400">Étape {index + 1}</p>}
                        <h2 className="mt-0.5 text-lg font-bold leading-tight">{event.title}</h2>
                      </div>
                    </div>
                    <Badge className={cn('shrink-0 text-[8px] font-black uppercase tracking-wide', theme.type)}>{eventKindLabels[event.kind]}</Badge>
                  </div>
                  {departure && <div className="mt-3 rounded-xl bg-[#e5f0ed] px-3 py-2 text-xs text-[#173d3a]">
                    <span>{day.id === 'sep30' ? 'Départ conseillé de la maison : ' : 'Départ conseillé de l’hôtel : '}</span><strong>{departure.leave}</strong>
                    {day.id === 'oct02' && index === 1 && <span> · si retour à l’hôtel</span>}
                  </div>}
                  {event.kind === 'hotel' && (day.id === 'oct01' || day.id === 'oct09') && <div className="mt-3 rounded-xl bg-[#e5f0ed] px-3 py-2 text-xs font-bold text-[#173d3a]">Ask for early check-in</div>}
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white px-3 py-2.5 shadow-sm">
                      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-stone-400">Horaire</p>
                      <p className="mt-1 text-sm font-bold leading-snug">{event.schedule}</p>
                    </div>
                    <div className="rounded-2xl bg-white px-3 py-2.5 shadow-sm">
                      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-stone-400">Lieu / rendez-vous</p>
                      <a className="mt-1 block text-sm font-bold leading-snug text-[#176158] underline underline-offset-2 hover:text-[#102b29]" href={transfer ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(transfer.airportAddress)}` : event.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noreferrer">{transfer ? `${transfer.airport} · ${transfer.terminal} · hall des arrivées` : event.location}</a>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {event.included && <Badge className="bg-black text-[8px] text-white">Voyage Privé · inclus</Badge>}
                    {event.paid && isAirbnb && <Badge className="bg-blue-600 text-[8px] text-white">Airbnb · confirmé</Badge>}
                    {event.paid && !isAirbnb && <Badge className="bg-[#ff5b22] text-[8px] text-white">Payé · confirmé</Badge>}
                    {event.confirmed && <Badge className="bg-amber-700 text-[8px] text-white">Réservé · confirmé</Badge>}
                    {event.planned && <Badge className="bg-emerald-700 text-[8px] text-white">Programme personnel · à organiser</Badge>}
                  </div>
                  <div className={cn('mt-3 grid gap-2', (event.bookingUrl || event.ticketUrl) && 'sm:grid-cols-2')}>
                    <Button asChild variant="outline" className="min-h-11 w-full rounded-full border-stone-300 bg-white font-bold text-[#14231d] hover:bg-stone-100">
                      <a href={transfer ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(transfer.airportAddress)}` : event.mapUrl} target="_blank" rel="noreferrer">Google Maps<Navigation className="size-4" /></a>
                    </Button>

                    {event.bookingUrl && (
                      <Button asChild className="min-h-11 w-full rounded-full bg-blue-600 font-bold text-white hover:bg-blue-700">
                        <a href={event.bookingUrl} target="_blank" rel="noreferrer">Ouvrir Airbnb<ExternalLink className="size-4" /></a>
                      </Button>
                    )}
                  </div>
                  <details className="group mt-3 rounded-2xl border border-stone-200 bg-white">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-bold [&::-webkit-details-marker]:hidden">
                      Détails<span className="transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
                    </summary>
                    <div className="border-t border-stone-100 p-3">
                      {transfer ? <TransferCard transfer={transfer} /> : (
                        <>
                          {stops?.length ? <ol className="space-y-3">{stops.map((stop, i) => <li key={`${stop.name}:${i}`} className="rounded-xl bg-stone-50 p-3"><p className="text-sm font-bold">{i + 1}. {stop.name}</p>{stop.duration && <p className="mt-1 text-xs font-semibold text-[#176158]">{stop.duration}</p>}{stop.detail && <p className="mt-1 text-xs leading-relaxed text-stone-600"><ContactText text={stop.detail} /></p>}</li>)}</ol>
                            : activityItems.length ? <ol className="space-y-3">{activityItems.map((item, i) => <li key={`${item.title}:${i}`} className="rounded-xl bg-stone-50 p-3"><p className="text-xs font-semibold text-[#176158]">{item.time}</p><p className="mt-1 text-sm font-bold">{i + 1}. {item.title}</p><p className="mt-1 text-xs leading-relaxed text-stone-600"><ContactText text={item.detail} /></p></li>)}</ol>
                            : <p className="text-xs leading-relaxed text-stone-600"><ContactText text={matchingItem?.detail || event.detail || 'Programme détaillé non communiqué.'} /></p>}
                          {matchingItem?.excursion?.note && <p className="mt-3 text-xs leading-relaxed text-stone-600">{matchingItem.excursion.note}</p>}
                          {matchingItem?.excursion?.voucherInstruction && <p className="mt-2 text-xs leading-relaxed text-stone-600">{matchingItem.excursion.voucherInstruction}</p>}
                          {matchingItem?.excursion?.meetingContact && <p className="mt-2 text-xs font-semibold">Contact : <ContactText text={matchingItem.excursion.meetingContact} /></p>}
                          {event.detail && (stops?.length || activityItems.length || matchingItem?.detail) && event.detail !== matchingItem?.detail && <p className="mt-3 text-xs leading-relaxed text-stone-600"><ContactText text={event.detail} /></p>}
                        </>
                      )}
                    </div>
                  </details>
                  <TravelDocumentsLink dayId={day.id} eventTitle={event.title} />
                </article>
              );
            })}
          </div>
          <p className="mt-3 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-stone-400">{status === 'completed' ? 'Journée terminée' : status === 'today' ? 'Journée en cours' : 'Journée à venir'}</p>
        </CardContent>
      </Card>}
      <div className="grid grid-cols-2 gap-2">
        <MiniFact icon={BedDouble} label="Ce soir" value={day.hotel} />
        <MiniFact icon={TrainFront} label="Déplacement" value={day.transport} />
      </div>
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">Le statut change automatiquement à minuit</p>
    </section>
  );
}

function ActivitiesPanel({ day }: { day: DailyPlan }) {
  const baseRecommendations = dailyRecommendations[day.id];
  const airbnbSuggestion = airbnbDaySuggestions[day.id];
  const isConfirmedActivity = (item: AgendaItem): boolean =>
    (item.kind === 'activity' || item.kind === 'food') &&
    (item.paid === true || item.included === true || day.id === 'oct03');
  const activities = day.agenda
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => isConfirmedActivity(item));
  const optionalActivities: { title: string; detail: string; sourceUrl?: string }[] = day.agenda
    .filter(item => (item.kind === 'activity' || item.kind === 'food' || item.kind === 'free') && !isConfirmedActivity(item))
    .map(item => ({
      title: `${item.title} · suggestion`,
      detail: `${item.detail} Option libre ; à envisager uniquement si compatible avec les rendez-vous confirmés${day.id === 'oct07' ? ', notamment le Gion Food Tour de 17:00 à 20:15' : ''}.`,
    }));
  const recommendations = {
    ...baseRecommendations,
    activities: [...optionalActivities, ...baseRecommendations.activities],
  };
  const hasAirbnb = airbnbSuggestion.status === 'recommended' && Boolean(airbnbSuggestion.title);

  return (
    <Tabs defaultValue="planning" className="gap-3">
      <FixedTabGrid columns={2}>
        <TabsTrigger value="planning" className="h-12 min-h-12 min-w-0 gap-2 rounded-xl px-2 text-xs data-active:bg-[#173d3a] data-active:text-white">
          <TicketCheck className="size-4" aria-hidden="true" />Planning
        </TabsTrigger>
        <TabsTrigger value="suggestions" className="h-12 min-h-12 min-w-0 gap-2 rounded-xl px-2 text-xs data-active:bg-[#173d3a] data-active:text-white">
          <Sparkles className="size-4" aria-hidden="true" />Suggestions
        </TabsTrigger>
      </FixedTabGrid>

      <TabsContent value="planning" className="mt-0">
        {activities.length > 0
          ? <AgendaActivityList day={day} activities={activities} />
          : <EmptyPanel icon={Landmark} title="Aucune activité confirmée" detail="Les idées de visites sont dans Suggestions. Les trajets restent dans Transport." />}
      </TabsContent>

      <TabsContent value="suggestions" className="mt-0 grid gap-3">
        {recommendations.activities.length > 0 && (
          <section className="grid gap-2">
            <p className="px-1 text-[9px] font-bold uppercase tracking-[0.16em] text-stone-400">AI Recommendations</p>
          {recommendations.activities.map(item => (
            <InfoCard key={item.title} icon={Sparkles} eyebrow="AI Recommendations" title={item.title} detail={item.detail} tone="amber" url={item.sourceUrl} badge />
          ))}
          </section>
        )}
        {recommendations.activities.length === 0 && (
          <EmptyPanel icon={Sparkles} title="Garder du temps libre" detail={recommendations.emptyReason ?? 'Le programme couvre déjà les visites retenues pour cette journée.'} />
        )}
        {hasAirbnb && (
          <section className="grid gap-2">
            <p className="px-1 text-[9px] font-bold uppercase tracking-[0.16em] text-stone-400">Airbnb Experience</p>
            <InfoCard icon={HouseHeart} eyebrow="Airbnb Experience" title={airbnbSuggestion.title ?? ''} detail={`${airbnbSuggestion.detail ?? ''} ${airbnbSuggestion.familyNote ?? ''}`} tone="rose" url={airbnbSuggestion.url} badge />
          </section>
        )}
      </TabsContent>
    </Tabs>
  );
}

function AgendaActivityList({ day, activities }: { day: DailyPlan; activities: Array<{ item: AgendaItem; index: number }> }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="max-h-[58vh] divide-y divide-stone-100 overflow-y-auto px-4">
        {activities.map(({ item, index }) => {
          if (item.excursion) {
            return <VoyagePriveExcursionCard key={`${day.id}:${index}`} item={item} dateLabel={day.dateLabel} />;
          }
          const Icon = agendaIcons[item.kind];
          return (
            <article key={`${day.id}:${index}`} className="flex min-h-20 items-start gap-3 py-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e5f0ed] text-[#176158]"><Icon className="size-4" aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-bold uppercase tracking-wide text-[#ff6a57]">{item.time}</span>
                <span className="mt-0.5 block text-sm font-bold leading-tight">{item.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-stone-500"><ContactText text={item.detail} /></span>
                <ActivityStatusBadge included={Boolean(item.included)} paid={Boolean(item.paid)} warning={Boolean(item.warning)} label={item.statusLabel} />
                {item.ticketUrl && (
                  <Button asChild variant="outline" size="sm" className="mt-2 min-h-11 rounded-full">
                    <a href={item.ticketUrl} target="_blank" rel="noreferrer">Ouvrir les billets QR · PDF<ExternalLink className="size-3.5" /></a>
                  </Button>
                )}
                {item.bookingUrl && (
                  <Button asChild variant="outline" size="sm" className="mt-2 min-h-11 rounded-full border-rose-200 text-rose-700">
                    <a href={item.bookingUrl} target="_blank" rel="noreferrer">Ouvrir la réservation Airbnb<ExternalLink className="size-3.5" /></a>
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function VoyagePriveExcursionCard({ item, dateLabel }: { item: AgendaItem; dateLabel: string }) {
  const excursion = item.excursion;
  if (!excursion) return null;

  return (
    <article className="my-3 overflow-hidden rounded-3xl border-2 border-[#173d3a] bg-[#f4faf8] shadow-[0_10px_30px_rgba(23,61,58,.12)]">
      <div className="bg-[#173d3a] p-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f4e5a4] text-[#173d3a]"><BusFront className="size-5" aria-hidden="true" /></span>
          <Badge className="bg-[#f4e5a4] text-[9px] font-black uppercase tracking-wide text-[#173d3a]">Voyage Privé · inclus</Badge>
        </div>
        <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#b7d2ce]">{item.time} · {excursion.duration}</p>
        <h3 className="mt-1 text-xl font-bold leading-tight">{item.title}</h3>
        <p className="mt-2 text-xs font-semibold text-white/80">{excursion.mode}</p>
      </div>
      <div className="p-4">
        <div className="rounded-2xl border border-[#ff6a57] bg-white p-3 shadow-sm">
          <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#b63e35]">Rendez-vous · {dateLabel}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-[#fff0ed] px-3 py-2"><p className="text-[8px] font-black uppercase tracking-wide text-[#b63e35]">Arrivée</p><p className="font-display text-xl font-bold text-[#14231d]">{excursion.meetingTime}</p></div>
            <div className="rounded-xl bg-[#fff0ed] px-3 py-2"><p className="text-[8px] font-black uppercase tracking-wide text-[#b63e35]">Départ</p><p className="font-display text-xl font-bold text-[#14231d]">{excursion.departureTime}</p></div>
          </div>
          <div className="mt-3 flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-[#ff6a57]" /><p className="text-xs leading-relaxed text-stone-600"><span className="font-bold text-stone-900">{excursion.meetingPoint}</span><br />{excursion.meetingAddress}</p></div>
          <Button asChild className="mt-3 min-h-11 w-full rounded-full bg-[#d84a43] text-white hover:bg-[#bc3d36]"><a href={excursion.meetingMapUrl} target="_blank" rel="noreferrer">Ouvrir dans Google Maps<Navigation /></a></Button>
        </div>
        <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-stone-400">Étapes incluses dans l’excursion</p>
        <div className="mt-2 grid gap-2">
          {excursion.stops.map((stop, stopIndex) => (
            <div key={`${stop.name}:${stopIndex}`} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-sm">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#e5f0ed] text-[10px] font-black text-[#176158]">{stopIndex + 1}</span>
              <div className="min-w-0 flex-1"><p className="text-xs font-bold text-stone-800">{stop.name}</p>{stop.detail && <p className="mt-1 text-xs leading-relaxed text-stone-600"><ContactText text={stop.detail} /></p>}</div>
              {stop.duration && <span className="shrink-0 text-[9px] font-semibold text-stone-400">{stop.duration}</span>}
            </div>
          ))}
        </div>
        {excursion.note && <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-950">{excursion.note}</p>}
      </div>
    </article>
  );
}

function ActivityStatusBadge({ included, paid, warning, label }: { included: boolean; paid: boolean; warning: boolean; label?: string }) {
  if (label) return <Badge className={cn('mt-2 text-[8px] text-white', warning ? 'bg-amber-700' : 'bg-[#14231d]')}>{label}</Badge>;
  if (warning && paid) return <Badge className="mt-2 bg-red-700 text-[8px] text-white">Payé · conflit</Badge>;
  if (warning) return <Badge className="mt-2 bg-amber-700 text-[8px] text-white">À vérifier</Badge>;
  if (included) return <Badge className="mt-2 bg-[#14231d] text-[8px] text-[#f4e5a4]">Voyage Privé · inclus</Badge>;
  if (paid) return <Badge className="mt-2 bg-sky-700 text-[8px] text-white">Payé</Badge>;
  return null;
}

function MiniFact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <Card className="border-stone-200 py-0 ring-0 shadow-sm"><CardContent className="p-3"><Icon className="size-4 text-[#32746d]" aria-hidden="true" /><p className="mt-3 text-[8px] font-bold uppercase tracking-[0.14em] text-stone-400">{label}</p><p className="mt-1 line-clamp-2 text-xs font-bold leading-snug">{value}</p></CardContent></Card>;
}

function FixedTabGrid({ children, columns, className }: { children: ReactNode; columns: 2 | 3 | 4 | 5 | 6 | 7; className?: string }) {
  const columnsClass = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6', 7: 'grid-cols-7' }[columns];
  return (
      <TabsList className={cn('!grid !h-auto w-full items-stretch gap-1 overflow-hidden rounded-2xl bg-white p-1 shadow-sm', columnsClass, className)}>
        {children}
      </TabsList>
  );
}

function TransportPanel({ day, hotel, checkInOption, loungePlan }: { day: DailyPlan; hotel?: HotelInfo; checkInOption?: AirFranceOption; loungePlan?: LoungeDayPlan }) {
  const hasFlightDetails = Boolean(checkInOption || loungePlan || day.agenda.some(item => item.kind === 'flight'));
  const hasIncludedJourney = day.agenda.some(item => (item.kind === 'flight' || item.kind === 'transport') && item.included);
  const tabColumns: 2 | 3 | 4 | 5 = hotel
    ? (hasFlightDetails && loungePlan ? 5 : hasFlightDetails || loungePlan ? 4 : 3)
    : (hasFlightDetails && loungePlan ? 3 : 2);
  return (
    <Tabs defaultValue="journey" className="gap-3">
      <FixedTabGrid columns={tabColumns}>
          <TabsTrigger value="journey" className="min-h-11 min-w-0 rounded-xl px-1 text-[10px] data-active:bg-[#173d3a] data-active:text-white"><Navigation />Trajet</TabsTrigger>
          {hotel && <TabsTrigger value="metro" className="min-h-11 min-w-0 rounded-xl px-1 text-[10px] data-active:bg-[#173d3a] data-active:text-white"><TrainFront />Métro</TabsTrigger>}
          {hotel && <TabsTrigger value="bus" className="min-h-11 min-w-0 rounded-xl px-1 text-[10px] data-active:bg-[#173d3a] data-active:text-white"><BusFront />Bus</TabsTrigger>}
          {hasFlightDetails && <TabsTrigger value="flight" className="min-h-11 min-w-0 rounded-xl px-1 text-[10px] data-active:bg-[#173d3a] data-active:text-white"><Plane />Vol</TabsTrigger>}
          {loungePlan && <TabsTrigger value="lounge" className="min-h-11 min-w-0 rounded-xl px-1 text-[9px] data-active:bg-[#173d3a] data-active:text-white"><Armchair />Lounge</TabsTrigger>}
      </FixedTabGrid>
      <TabsContent value="journey"><LuggageReminder dayId={day.id} /><div className="grid gap-2">{transfers.filter(transfer => transfer.dayId === day.id).map(transfer => <TransferCard key={transfer.reference} transfer={transfer} />)}{hasIncludedJourney && <Badge className="w-fit bg-[#173d3a] px-3 py-1.5 text-[9px] font-black uppercase tracking-wide text-[#f4e5a4]">Voyage Privé · transport inclus</Badge>}<InfoCard icon={TrainFront} eyebrow="Transport du jour" title={day.transport} detail={`${day.transportDuration}. ${day.airline !== 'Non applicable' ? `Compagnie : ${day.airline}.` : ''}`} tone="green" /></div></TabsContent>
      {hotel && <TabsContent value="metro"><InfoCard icon={TrainFront} eyebrow="Métro · poussette-friendly" title={`${hotel.metroName} · ${hotel.metroWalkTime}`} detail={`${hotel.metroDetail}. ${hotel.metroAccessibility}. ${hotel.metroAccessibilityNote}`} tone="green" url={hotel.metroScheduleUrl} /></TabsContent>}
      {hotel && <TabsContent value="bus"><InfoCard icon={BusFront} eyebrow="Bus" title={`${hotel.busName} · ${hotel.busWalkTime}`} detail={`${hotel.busDetail}. ${hotel.busAccessibility}. ${hotel.busAccessibilityNote}`} tone="blue" url={hotel.busScheduleUrl} /></TabsContent>}
      {hasFlightDetails && <TabsContent value="flight"><div className="grid gap-3">{checkInOption && <FlightCheckInCard option={checkInOption} />}{!checkInOption && <InfoCard icon={Plane} eyebrow="Vol du jour" title={day.transport} detail={day.transportDuration} tone="blue" />}</div></TabsContent>}
      {loungePlan && <TabsContent value="lounge"><LoungePanel plan={loungePlan} /></TabsContent>}
    </Tabs>
  );
}

function LoungePanel({ plan }: { plan: LoungeDayPlan }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-sky-900/15 bg-[#eef6f8]">
      <div className="bg-[#173f4b] p-4 text-white"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-sky-100">Mastercard Travel Pass</p><h3 className="mt-1 font-display text-xl">{plan.heading}</h3><p className="mt-2 text-xs leading-relaxed text-sky-50/80">{plan.note}</p></div>
      <div className="flex snap-x gap-3 overflow-x-auto p-3 scrollbar-none">{plan.lounges.map(lounge => <LoungeCard key={lounge.name} lounge={lounge} />)}</div>
    </section>
  );
}

function NearbyPanel({ hotel, magnetDone, onToggleMagnet }: { hotel: HotelInfo; magnetDone: boolean; onToggleMagnet?: () => void }) {
  return (
    <Tabs defaultValue="laundry" className="gap-3">
      <FixedTabGrid columns={6}>
          <TabsTrigger value="laundry" className="min-h-12 min-w-0 flex-col gap-1 rounded-xl px-0 text-[7px] data-active:bg-[#173d3a] data-active:text-white"><WashingMachine />Laverie</TabsTrigger>
          <TabsTrigger value="market" className="min-h-12 min-w-0 flex-col gap-1 rounded-xl px-0 text-[7px] data-active:bg-[#173d3a] data-active:text-white"><ShoppingBasket />Courses</TabsTrigger>
          <TabsTrigger value="pharmacy" className="min-h-12 min-w-0 flex-col gap-1 rounded-xl px-0 text-[7px] data-active:bg-[#173d3a] data-active:text-white"><Pill />Pharma</TabsTrigger>
          <TabsTrigger value="electronics" className="min-h-12 min-w-0 flex-col gap-1 rounded-xl px-0 text-[7px] data-active:bg-[#173d3a] data-active:text-white"><Building2 />Électro</TabsTrigger>
          <TabsTrigger value="mall" className="min-h-12 min-w-0 flex-col gap-1 rounded-xl px-0 text-[7px] data-active:bg-[#173d3a] data-active:text-white"><Building2 />Mall</TabsTrigger>
          <TabsTrigger value="souvenir" className="min-h-12 min-w-0 flex-col gap-1 rounded-xl px-0 text-[7px] data-active:bg-[#173d3a] data-active:text-white"><Gift />Aimants</TabsTrigger>
      </FixedTabGrid>
      <TabsContent value="laundry"><NearbyCard icon={WashingMachine} label="Laverie automatique · aucune conciergerie" title={hotel.laundryName} walk={hotel.laundryWalkTime} hours={hotel.laundryHours} detail={`${hotel.laundryType}. ${hotel.laundryNote} ${hotel.laundryAveragePrice}`} url={hotel.laundryMapUrl} /></TabsContent>
      <TabsContent value="market"><NearbyCard icon={ShoppingBasket} label="Eau & courses" title={hotel.supermarketName} walk={hotel.supermarketWalkTime} hours={hotel.supermarketHours} detail={hotel.supermarketNote} url={hotel.supermarketMapUrl} /></TabsContent>
      <TabsContent value="pharmacy"><NearbyCard icon={Pill} label="Pharmacie" title={hotel.pharmacyName} walk={hotel.pharmacyWalkTime} hours={hotel.pharmacyHours} detail={hotel.pharmacyNote} url={hotel.pharmacyMapUrl} /></TabsContent>
      <TabsContent value="electronics"><NearbyCard icon={Building2} label="Électroménager & électronique" title={hotel.electronicsName} walk={hotel.electronicsTravelTime} hours={hotel.electronicsHours} detail={hotel.electronicsNote} url={hotel.electronicsMapUrl} /></TabsContent>
      <TabsContent value="mall"><NearbyCard icon={Building2} label={`Centre commercial · ★ ${hotel.mallRating.toFixed(1)}`} title={hotel.mallName} walk={hotel.mallTravelTime} hours={hotel.mallHours} detail={hotel.mallNote} url={hotel.mallMapUrl} /></TabsContent>
      <TabsContent value="souvenir"><NearbyCard icon={Gift} label="Aimants & souvenirs" title={hotel.souvenirName} walk={hotel.souvenirWalkTime} hours={hotel.souvenirHours} detail={hotel.souvenirNote} url={hotel.souvenirMapUrl} />{onToggleMagnet && <label className="mt-2 flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-3"><Gift className="size-5 text-rose-700" /><span className="flex-1 text-xs font-bold">{magnetDone ? 'Aimant acheté · collection à jour' : `Acheter l’aimant de ${hotel.city}`}</span><Checkbox checked={magnetDone} onCheckedChange={onToggleMagnet} /></label>}</TabsContent>
    </Tabs>
  );
}

function NearbyCard({ icon: Icon, label, title, walk, hours, detail, url }: { icon: LucideIcon; label: string; title: string; walk: string; hours: string; detail: string; url: string }) {
  return (
    <Card className="w-full border-stone-200 py-0 ring-0 shadow-sm"><CardContent className="flex min-h-[300px] flex-col p-4"><span className="grid size-11 place-items-center rounded-full bg-[#e5f0ed] text-[#176158]"><Icon className="size-5" aria-hidden="true" /></span><p className="mt-4 text-[9px] font-bold uppercase tracking-[0.15em] text-[#ff6a57]">{label}</p><h3 className="mt-1 text-lg font-bold leading-tight">{title}</h3><div className="mt-3 flex flex-wrap gap-2"><Badge variant="outline">{walk}</Badge><Badge variant="outline">{hours}</Badge></div><p className="mt-3 text-xs leading-relaxed text-stone-500">{detail}</p><Button asChild className="mt-auto min-h-11 rounded-full bg-[#173d3a] text-white hover:bg-[#102b29]"><a href={url} target="_blank" rel="noreferrer">Ouvrir l’itinéraire<Navigation className="size-4" /></a></Button></CardContent></Card>
  );
}

function InfoCard({ icon: Icon, eyebrow, title, detail, tone, url, badge = false }: { icon: LucideIcon; eyebrow: string; title: string; detail: string; tone: 'green' | 'blue' | 'amber' | 'rose'; url?: string; badge?: boolean }) {
  const toneClasses = { green: 'bg-[#e5f0ed] text-[#176158]', blue: 'bg-sky-100 text-sky-800', amber: 'bg-amber-100 text-amber-900', rose: 'bg-rose-100 text-rose-800' };
  return (
    <Card className="border-stone-200 py-0 ring-0 shadow-sm"><CardContent className="p-4"><div className="flex gap-3"><span className={cn('grid size-10 shrink-0 place-items-center rounded-full', toneClasses[tone])}><Icon className="size-4" aria-hidden="true" /></span><div className="min-w-0">{badge ? <Badge className={cn('text-[8px]', toneClasses[tone])}>{eyebrow}</Badge> : <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-stone-400">{eyebrow}</p>}<h3 className="mt-1 text-sm font-bold leading-snug">{title}</h3><p className="mt-2 text-xs leading-relaxed text-stone-500">{detail}</p>{url && <Button asChild variant="link" className="mt-1 h-auto min-h-10 p-0 text-xs text-[#176158]"><a href={url} target="_blank" rel="noreferrer">Ouvrir<ExternalLink className="size-3" /></a></Button>}</div></div></CardContent></Card>
  );
}

function LoungeCard({ lounge }: { lounge: NonNullable<(typeof loungeRecommendations)[string]>['lounges'][number] }) {
  return <Card className="w-[82%] shrink-0 snap-center border-0 py-0 ring-0 shadow-sm"><CardContent className="p-4"><div className="flex items-center justify-between gap-2"><span className="grid size-10 place-items-center rounded-full bg-[#173f4b] text-[#f4e5a4]"><Armchair className="size-4" /></span><Badge className="bg-teal-700 text-white">#{lounge.rank}</Badge></div><h4 className="mt-4 font-display text-lg">{lounge.name}</h4><p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-stone-400">{lounge.terminal}</p><p className="mt-3 text-xs font-bold text-[#173f4b]">{lounge.hours}</p><p className="mt-2 text-xs leading-relaxed text-stone-500">{lounge.location}</p><p className="mt-2 rounded-xl bg-[#f8f4ec] p-2 text-xs leading-relaxed">{lounge.familyNote}</p><Button asChild variant="link" className="mt-1 h-auto min-h-10 p-0 text-xs"><a href={lounge.sourceUrl} target="_blank" rel="noreferrer">Fiche officielle<ExternalLink className="size-3" /></a></Button></CardContent></Card>;
}

function EmptyPanel({ icon: Icon, title, detail }: { icon: LucideIcon; title: string; detail: string }) {
  return <Card className="border-dashed border-stone-300 py-0 ring-0 shadow-none"><CardContent className="p-6 text-center"><span className="mx-auto grid size-12 place-items-center rounded-full bg-stone-100 text-stone-500"><Icon className="size-5" /></span><h2 className="mt-4 font-display text-xl">{title}</h2><p className="mt-2 text-xs leading-relaxed text-stone-500">{detail}</p></CardContent></Card>;
}
