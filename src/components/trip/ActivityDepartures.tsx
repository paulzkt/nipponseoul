import { activityDepartures } from '@/data/activityDepartures';

export function ActivityDepartures({ dayId }: { dayId: string }) {
  const departures = activityDepartures.filter(item => item.dayId === dayId);
  if (!departures.length) return null;
  return <section aria-label="Départs pour les activités" className="my-3 space-y-3 rounded-2xl border border-stone-200 bg-white p-4">
    <h2 className="text-sm font-bold text-[#173d3a]">À quelle heure partir ?</h2>
    {departures.map(item => <article key={item.title} className="rounded-xl bg-stone-50 p-3">
      <h3 className="text-sm font-bold">{item.title}</h3>
      <p className="mt-1 text-xs text-stone-500">Depuis {item.hotel}</p>
      <dl className="mt-3 grid gap-2 text-sm">
        <div><dt className="text-xs text-stone-500">Départ conseillé de l’hôtel</dt><dd className="font-bold text-[#176158]">{item.leave}</dd></div>
        <div><dt className="text-xs text-stone-500">Arrivée visée au rendez-vous</dt><dd className="font-semibold">{item.meeting}</dd></div>
        <div><dt className="text-xs text-stone-500">Début de l’activité</dt><dd className="font-semibold">{item.start}</dd></div>
      </dl>
      <p className="mt-2 text-xs leading-relaxed text-stone-600">{item.note}</p>
    </article>)}
    <p className="text-xs text-stone-500">Heures locales. Durées de taxi estimées, marges incluses ; trajets non réservés. Faire confirmer le temps de trajet par la réception la veille et commander le taxi en avance.</p>
  </section>;
}
