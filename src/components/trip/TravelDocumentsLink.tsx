import { travelDocuments } from '@/data/travelDocuments';
export function TravelDocumentsLink({ dayId, eventTitle }: { dayId?: string; eventTitle?: string }) {
  const documents = travelDocuments.filter(item => (!dayId || item.dayId === dayId) && (!eventTitle || item.eventTitle === eventTitle));
  if (!documents.length) return null;
  return <section aria-label="Billets et réservations" className="my-3 space-y-2 rounded-2xl border border-stone-200 bg-white p-3">
    <h2 className="text-sm font-bold text-[#173d3a]">Billets et réservations</h2>
    {documents.map(item => <div key={item.url}>
      <a href={item.url} target="_blank" rel="noreferrer" className="flex min-h-11 items-center rounded-xl border border-[#173d3a]/20 px-3 py-2 text-sm font-semibold text-[#173d3a] hover:bg-stone-50">{item.title} ↗</a>
      {item.note && <p className="mt-1 text-xs text-stone-500">{item.note}</p>}
    </div>)}
  </section>;
}
