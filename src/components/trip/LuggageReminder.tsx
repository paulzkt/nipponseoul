import { Badge, Card, CardContent } from '@/components/ui';

const luggageGuideUrl = 'https://www.japan-experience.com/fr/preparer-voyage/savoir/avant-de-partir/takkyubin-expedier-vos-bagages-entre-des-destinations-au-japon';

const legs = [
  { prepare: ['oct04'], travel: 'oct05', route: 'Tokyo → Kyoto', date: '5 octobre', from: 'Grand Prince Hotel Takanawa', departureSource: 'https://www.princehotels.co.jp/takanawa/faq/', serviceSource: 'https://princehotels-job.net/jobfind-pc/job/All/113481', serviceLabel: 'Service bagages · Prince Hotels', to: 'Kyoto Brighton Hotel', source: 'https://kyoto.brightonhotels.co.jp/q_a/' },
  { prepare: ['oct08'], travel: 'oct09', route: 'Kyoto → Osaka', date: '9 octobre', from: 'Kyoto Brighton Hotel', departureSource: 'https://kyoto.brightonhotels.co.jp/q_a/', serviceSource: 'https://www.jtb.co.jp/kokunai-hotel/htl/6230033/', serviceLabel: 'Service bagages · fiche JTB', to: 'Hotel New Otani Osaka', source: 'https://www.newotani.co.jp/en/osaka/faq/stay/' },
];

export function LuggageReminder({ dayId }: { dayId: string }) {
  const leg = legs.find(item => item.travel === dayId || item.prepare.includes(dayId));
  if (!leg) return null;
  const travelDay = leg.travel === dayId;
  return <Card className="my-3 border-amber-200 bg-amber-50 py-0 ring-0"><CardContent className="p-4">
    <Badge className="bg-[#173d3a] text-white">Takkyubin · voyager sans valises</Badge>
    <h3 className="mt-3 text-lg font-bold">{leg.route} · train du {leg.date}</h3>
    <p className="mt-2 text-sm leading-relaxed">{travelDay
      ? `Déposer les valises à la réception pour ${leg.to}. Garder le bordereau et confirmer la date de livraison.`
      : `Demander aujourd’hui à la réception de ${leg.from} l’envoi vers ${leg.to} : heure limite de dépôt, tarif et date de livraison. Faire confirmer le transporteur et organiser le dépôt avant le train de demain.`}</p>
    <p className="mt-2 text-xs leading-relaxed text-stone-600">Garder l’essentiel pour 1 à 2 nuits, dont les affaires d’Adam. Livraison le jour même non garantie.</p>
    {!travelDay && <div className="mt-3 flex flex-wrap gap-x-4">
      <a className="inline-flex min-h-11 items-center text-xs underline" href={leg.departureSource} target="_blank" rel="noreferrer">FAQ · {leg.from}</a>
      <a className="inline-flex min-h-11 items-center text-xs underline" href={leg.serviceSource} target="_blank" rel="noreferrer">{leg.serviceLabel}</a>
    </div>}
    <a className="mt-3 inline-flex min-h-11 items-center text-xs underline" href={leg.source} target="_blank" rel="noreferrer">Réception des bagages · hôtel d’arrivée</a>
    <a className="ml-4 mt-3 inline-flex min-h-11 items-center text-xs underline" href={luggageGuideUrl} target="_blank" rel="noreferrer">Guide Takkyubin</a>
  </CardContent></Card>;
}

export function LuggageHotelServices() {
  return <section className="mt-4 rounded-3xl border border-stone-200 bg-white p-4">
    <h2 className="text-xl font-bold">Takkyubin · services des hôtels</h2>
    <p className="mt-2 text-xs text-stone-500">Vérification des pages officielles le 14 septembre 2026. Aucun envoi réservé.</p>
    <ul className="mt-3 list-disc space-y-3 pl-5 text-sm">
      <li><a className="underline" href="https://www.princehotels.co.jp/takanawa/faq/" target="_blank" rel="noreferrer">Grand Prince Hotel Takanawa</a> : réception de bagages prépayés confirmée. Expédition vers Kyoto : modalités à confirmer à la réception.</li>
      <li><a className="underline" href="https://kyoto.brightonhotels.co.jp/q_a/" target="_blank" rel="noreferrer">Kyoto Brighton Hotel</a> : réception anticipée confirmée avec nom de réservation et date de séjour. Expédition vers Osaka : modalités à confirmer à la réception.</li>
      <li><a className="underline" href="https://www.newotani.co.jp/en/osaka/faq/stay/" target="_blank" rel="noreferrer">Hotel New Otani Osaka</a> : réception anticipée confirmée. <a className="underline" href="https://www.newotani.co.jp/osaka/facility/delivery/" target="_blank" rel="noreferrer">Comptoir de livraison domestique</a> au niveau du lobby, demandes acceptées 24 h/24 (ce n’est pas une garantie de collecte à toute heure).</li>
    </ul>
    <p className="mt-3 text-sm">Faire confirmer le délai pour chaque trajet : ne pas compter sur une livraison le jour même. Préparer l’envoi avant le départ du train.</p>
    <div className="mt-3 flex flex-wrap gap-4 text-xs underline"><a href={luggageGuideUrl} target="_blank" rel="noreferrer">Guide Japan Experience</a><a href="https://rokusan.fr/takkyubin-comment-utiliser-la-livraison-des-bagages-a-lhotel-au-japon/" target="_blank" rel="noreferrer">Guide Rokusan</a><a href="https://faq-en.kuronekoyamato.co.jp/app/answers/detail/a_id/6692/" target="_blank" rel="noreferrer">Conditions Yamato pour les hôtels</a></div>
  </section>;
}
