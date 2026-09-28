import { LuggageHotelServices } from '@/components/trip/LuggageReminder';
import { transfers } from '@/data/transfers';
import { TransferCard } from '@/components/trip/TransferCard';
import { Accessibility, AlertTriangle, Armchair, Baby, Building2, BusFront, CalendarDays, CarFront, CheckCircle2, CircleX, Clock3, Coffee, Coins, Dumbbell, ExternalLink, Footprints, Gift, Info, Languages, Luggage, MapPin, MessageSquareText, Navigation, PackageOpen, PawPrint, Pill, Plane, ShieldCheck, ShoppingBasket, Smartphone, Star, TicketCheck, TrainFront, Utensils, WashingMachine, type LucideIcon } from 'lucide-react';
import { Badge, Button, Card, CardContent } from '@/components/ui';
import { airFranceOptions, bookings, hotels } from '@/data/trip';
import { cn } from '@/lib/utils';

const bookingIcons = { Vol: Plane, Hotel: Star, Train: TrainFront, Visite: TicketCheck };

const circuitIncludes = [
  'Hébergement en hôtels 5* selon le descriptif',
  'Excursion d’une demi-journée à Tokyo en bus Hato',
  'Excursion d’une demi-journée à Kyoto en bus : Kinkaku-ji, Ginkaku-ji et Kiyomizu-dera',
  'Gyeongbokgung, Bukchon Hanok et marché Gwangjang en petit groupe de 10 personnes maximum',
  'Billets de train Tokyo–Kyoto et Kyoto–Osaka',
  'Vol Osaka–Séoul avec 20 kg de bagages en soute',
];

const circuitExcludes = [
  'Repas et boissons non mentionnés, petit-déjeuner compris',
  'Dépenses personnelles et pourboires',
  'Taxe de séjour à régler sur place',
  'Assurances facultatives',
  'Frais de dossier',
];

const appGuides = [
  {
    country: 'Japon',
    items: [
      { icon: Utensils, category: 'Repas & courses', name: 'Uber Eats', badge: 'Le plus simple', detail: 'Interface en anglais. Restaurants, supermarchés, supérettes et certains produits de pharmacie.', url: 'https://www.ubereats.com/jp-en/' },
      { icon: PackageOpen, category: 'Achats généraux', name: 'Amazon Japan', badge: 'Tout type d’achat', detail: 'Site en anglais pour couches, lait, produits bébé et quotidien. Demander avant si l’hôtel accepte les colis.', url: 'https://www.amazon.co.jp/-/en/' },
      { icon: CarFront, category: 'Taxi', name: 'GO Taxi', badge: 'Réseau le plus large', detail: 'Anglais, cartes internationales et Apple Pay. Très fiable, mais pas toujours moins cher qu’Uber et un supplément visiteur peut s’appliquer.', url: 'https://go.goinc.jp/en' },
    ],
  },
  {
    country: 'Corée du Sud',
    items: [
      { icon: Utensils, category: 'Repas & courses', name: 'Shuttle Delivery', badge: 'Idéal touriste', detail: 'Anglais, sans numéro coréen et avec cartes internationales. Le choix le plus fluide à Gangnam.', url: 'https://www.shuttledelivery.co.kr/en' },
      { icon: ShoppingBasket, category: 'Plus de choix', name: 'Baemin', badge: 'Alternative', detail: 'Très grand catalogue et interface multilingue. Le paiement international s’améliore, mais reste parfois moins fluide que Shuttle.', url: 'https://www.baemin.com/' },
      { icon: PackageOpen, category: 'Achats généraux', name: 'Gmarket Global', badge: 'Livraison non urgente', detail: 'Anglais et cartes internationales pour courses et produits du quotidien. Confirmer la réception des colis avec l’hôtel.', url: 'https://global.gmarket.co.kr/' },
      { icon: CarFront, category: 'Taxi', name: 'k.ride', badge: 'Recommandé', detail: 'Le réseau Kakao pensé pour les visiteurs : anglais, traduction du chat et paiement international, sans compte KakaoTalk.', url: 'https://www.kakaomobility.com/k-ride' },
    ],
  },
];

const navigationByCity = [
  {
    city: 'Tokyo',
    app: 'Citymapper',
    status: 'Couverture officielle',
    detail: 'Choix principal : itinéraires métro, train, bus et marche dans une interface entièrement disponible en anglais.',
    url: 'https://citymapper.com/tokyo',
  },
  {
    city: 'Kyoto',
    app: 'Japan Travel by NAVITIME',
    status: 'Alternative recommandée',
    detail: 'Citymapper ne couvre pas Kyoto. NAVITIME est japonais, précis pour les trains, métros et bus, et conçu en anglais pour les visiteurs.',
    url: 'https://japantravel.navitime.com/en/',
  },
  {
    city: 'Osaka',
    app: 'Japan Travel by NAVITIME',
    status: 'Alternative recommandée',
    detail: 'Citymapper ne couvre pas Osaka. NAVITIME fournit les quais, correspondances, horaires et itinéraires locaux en anglais.',
    url: 'https://japantravel.navitime.com/en/',
  },
  {
    city: 'Séoul',
    app: 'Citymapper',
    status: 'Couverture officielle',
    detail: 'Choix principal pour une utilisation simple en anglais. Garder Naver Map en secours pour les commerces, les adresses et les données locales en temps réel.',
    url: 'https://citymapper.com/seoul',
    backupName: 'Naver Map · secours local',
    backupUrl: 'https://map.naver.com/',
  },
];

export default function Bookings() {
  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page-shell">
      <header className="page-heading">
        <div><p className="eyebrow">Billets, hôtels & transports</p><h1 className="page-title">Réservations</h1></div>
      </header>

      <nav className="sticky top-16 z-30 -mx-3 mt-3 flex gap-2 overflow-x-auto border-y border-stone-200/70 bg-[#f4f5f1]/94 px-3 py-2 backdrop-blur-xl scrollbar-none sm:-mx-5 sm:px-5 lg:top-0 lg:-mx-7 lg:px-7" aria-label="Sections des réservations">
        {[
          ['hotels', 'Hôtels'],
          ['transferts', 'Transferts'],
          ['apps', 'Apps utiles'],
          ['billets', 'Billets'],
          ['pratique', 'Pratique'],
        ].map(([id, label]) => <button key={id} type="button" onClick={() => scrollToSection(id)} className="flex min-h-11 shrink-0 items-center rounded-full border border-stone-200 bg-white px-4 text-xs font-bold text-stone-600 shadow-sm transition-colors hover:border-[#14231d] hover:text-[#14231d]">{label}</button>)}
      </nav>

      <AirFranceExtras />
      <LuggageHotelServices />
      <section id="transferts" className="mt-4 scroll-mt-32">
        <h2 className="font-display text-3xl text-[#14231d]">Transferts aéroport</h2>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">{transfers.map(transfer => <TransferCard key={transfer.reference} transfer={transfer} />)}</div>
      </section>

      <section id="hotels" className="mt-4 scroll-mt-32">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="eyebrow">Séjours confirmés</p><h2 className="mt-2 font-display text-3xl text-[#14231d]">Les hôtels</h2></div>
          <div className="text-right text-xs text-stone-500">
            <p>Notes Google relevées le 4 août 2026</p>
            <p className="mt-1">Horaires relevés le 4 août 2026 · susceptibles de changer</p>
            <a className="mt-1 inline-flex items-center gap-1 underline underline-offset-2 hover:text-stone-800" href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noreferrer">Conversions indicatives : 1 € = 186,37 ¥ / 1 674,31 ₩ <ExternalLink className="size-3" aria-hidden="true" /></a>
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {hotels.map(hotel => (
            <Card key={hotel.id} className="border-stone-300/70 bg-white py-0 ring-0 shadow-sm">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-[#14231d] text-[#f1d582]">{hotel.city}</Badge>
                      <Badge variant="outline" className="gap-1 border-teal-700/25 bg-teal-50 text-[9px] text-teal-800"><TicketCheck className="size-3" aria-hidden="true" />Voyage Privé · Inclus</Badge>
                    </div>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-[#14231d]">{hotel.name}</h3>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 rounded-xl bg-[#f1d582]/55 px-4 py-3 text-[#14231d]">
                    <Star className="size-5 fill-[#d84a43] text-[#d84a43]" aria-hidden="true" />
                    <div><p className="font-display text-2xl leading-none">{hotel.googleRating.toFixed(1)}</p><p className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wide"><MessageSquareText className="size-3" />{hotel.googleReviewCount.toLocaleString('fr-FR')} avis</p></div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-stone-200 bg-[#f6f0e5] p-3">
                  <div className="flex items-start gap-3">
                    <Coffee className="mt-0.5 size-5 shrink-0 text-[#d84a43]" aria-hidden="true" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs uppercase tracking-[0.15em] text-stone-500">Petit-déjeuner</p>
                        <Badge variant="outline" className="border-[#d84a43]/30 bg-white px-2 py-0.5 text-[9px] text-[#b8332e]">Non inclus dans le circuit</Badge>
                      </div>
                      <p className="mt-1 font-display text-xl text-[#14231d]">{hotel.breakfastPrice}</p>
                      {hotel.breakfastChildPrice && <p className="mt-1 text-sm font-medium text-[#14231d]">{hotel.breakfastChildPrice}</p>}
                      <p className="mt-3 flex items-center gap-2 text-xs text-stone-600"><Clock3 className="size-4" aria-hidden="true" />{hotel.breakfastHours}</p>
                      <p className="mt-3 text-xs leading-relaxed text-stone-500">{hotel.breakfastNote}</p>
                    </div>
                  </div>
                </div>

                <HotelGym hotel={hotel} />

                <div className="mt-3 overflow-hidden rounded-xl border border-teal-800/15 bg-teal-50">
                  <div className="border-b border-teal-800/10 px-3 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-900">Services à proximité</p>
                  </div>
                  <div className="divide-y divide-teal-800/10">
                    <NearbyService
                      icon={WashingMachine}
                      label="Laverie la plus proche"
                      name={hotel.laundryName}
                      meta={hotel.laundryType}
                      address={hotel.laundryAddress}
                      note={hotel.laundryNote}
                      mapUrl={hotel.laundryMapUrl}
                      walkTime={hotel.laundryWalkTime}
                      hours={hotel.laundryHours}
                      days={hotel.laundryDays}
                      averagePrice={hotel.laundryAveragePrice}
                    />
                    <NearbyService
                      icon={ShoppingBasket}
                      label="Supermarché le plus proche"
                      name={hotel.supermarketName}
                      address={hotel.supermarketAddress}
                      note={hotel.supermarketNote}
                      mapUrl={hotel.supermarketMapUrl}
                      walkTime={hotel.supermarketWalkTime}
                      hours={hotel.supermarketHours}
                      days={hotel.supermarketDays}
                    />
                    <NearbyService
                      icon={Pill}
                      label="Pharmacie la plus proche"
                      name={hotel.pharmacyName}
                      address={hotel.pharmacyAddress}
                      note={hotel.pharmacyNote}
                      mapUrl={hotel.pharmacyMapUrl}
                      walkTime={hotel.pharmacyWalkTime}
                      hours={hotel.pharmacyHours}
                      days={hotel.pharmacyDays}
                    />
                    <NearbyService
                      icon={Gift}
                      label="Aimants & souvenirs"
                      name={hotel.souvenirName}
                      address={hotel.souvenirAddress}
                      note={hotel.souvenirNote}
                      mapUrl={hotel.souvenirMapUrl}
                      walkTime={hotel.souvenirWalkTime}
                      hours={hotel.souvenirHours}
                      days={hotel.souvenirDays}
                      officialUrl={hotel.souvenirOfficialUrl}
                    />
                    <NearbyService
                      icon={Building2}
                      label="Centre commercial recommandé"
                      name={hotel.mallName}
                      rating={hotel.mallRating}
                      address={hotel.mallAddress}
                      note={hotel.mallNote}
                      mapUrl={hotel.mallMapUrl}
                      walkTime={hotel.mallTravelTime}
                      hours={hotel.mallHours}
                      days={hotel.mallDays}
                      officialUrl={hotel.mallWebsiteUrl}
                    />
                  </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-sky-900/15 bg-sky-50">
                  <div className="border-b border-sky-900/10 px-3 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-950">Transports autour de l’hôtel</p>
                  </div>
                  <div className="divide-y divide-sky-900/10">
                    <NearbyTransport icon={TrainFront} label="Métro / train le plus proche" name={hotel.metroName} detail={hotel.metroDetail} walkTime={hotel.metroWalkTime} scheduleUrl={hotel.metroScheduleUrl} accessibility={hotel.metroAccessibility} accessibilityNote={hotel.metroAccessibilityNote} accessibilityUrl={hotel.metroAccessibilityUrl} />
                    <NearbyTransport icon={BusFront} label="Bus le plus proche" name={hotel.busName} detail={hotel.busDetail} walkTime={hotel.busWalkTime} scheduleUrl={hotel.busScheduleUrl} accessibility={hotel.busAccessibility} accessibilityNote={hotel.busAccessibilityNote} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline" className="rounded-full">
                    <a href={hotel.googleUrl} target="_blank" rel="noreferrer">Voir sur Google <ExternalLink aria-hidden="true" /></a>
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="rounded-full text-stone-600">
                    <a href={hotel.breakfastSourceUrl} target="_blank" rel="noreferrer">Tarif officiel <ExternalLink aria-hidden="true" /></a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="apps" className="mt-5 scroll-mt-32 border-t border-stone-300/70 pt-5">
        <div><p className="eyebrow">Sans barrière de langue</p><h2 className="mt-2 font-display text-3xl text-[#14231d]">Applications utiles sur place</h2></div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {navigationByCity.map(option => (
            <Card key={option.city} className="border-stone-300/70 bg-white py-0 ring-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#14231d] text-[#f1d582]"><Navigation className="size-5" aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><Badge className="bg-[#d84a43] text-white">{option.city}</Badge><Badge variant="outline" className="border-teal-700/20 bg-teal-50 text-[9px] text-teal-800">{option.status}</Badge></div>
                    <h3 className="mt-2 font-display text-xl text-[#14231d]">{option.app}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">{option.detail}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button asChild size="sm" className="min-h-10 rounded-full bg-[#14231d] text-white hover:bg-[#253d32]"><a href={option.url} target="_blank" rel="noreferrer"><Languages aria-hidden="true" />Ouvrir en anglais <ExternalLink aria-hidden="true" /></a></Button>
                      {option.backupUrl && <Button asChild size="sm" variant="outline" className="min-h-10 rounded-full"><a href={option.backupUrl} target="_blank" rel="noreferrer">{option.backupName}<ExternalLink aria-hidden="true" /></a></Button>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {appGuides.map(guide => (
            <Card key={guide.country} className="border-stone-300/70 bg-white py-0 ring-0 shadow-sm">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3"><div><p className="eyebrow">Livraison & taxi</p><h3 className="mt-1 font-display text-2xl text-[#14231d]">{guide.country}</h3></div><span className="grid size-11 place-items-center rounded-full bg-[#f1d582]/60 text-[#14231d]"><Smartphone className="size-5" aria-hidden="true" /></span></div>
                <div className="mt-3 divide-y divide-stone-200">
                  {guide.items.map(item => <AppRecommendation key={item.name} {...item} />)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </section>

      <section id="billets" className="mt-5 scroll-mt-32 border-t border-stone-300/70 pt-5">
        <div><p className="eyebrow">Billets & transports</p><h2 className="mt-2 font-display text-3xl text-[#14231d]">Réservations, vols & trains</h2></div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {bookings.map(booking => {
            const Icon = bookingIcons[booking.type];
            return (
              <Card key={booking.id} className="border-stone-300/70 bg-white py-0 ring-0 shadow-sm">
                <CardContent className="flex gap-4 p-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#14231d] text-[#f1d582]"><Icon className="size-5" aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs uppercase tracking-[0.16em] text-stone-500">{booking.type}</p><StatusBadge status={booking.status} /></div>
                    <h3 className="mt-2 font-display text-xl text-[#14231d]">{booking.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{booking.detail}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="pratique" className="mt-5 scroll-mt-32 border-t border-stone-300/70 pt-5" aria-labelledby="practical-title">
        <div><p className="eyebrow">Source Voyage Privé · 4 août 2026</p><h2 id="practical-title" className="mt-2 font-display text-3xl text-[#14231d]">Informations pratiques</h2></div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <Card className="border-emerald-800/15 bg-emerald-50 py-0 ring-0">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-emerald-900"><ShieldCheck className="size-5" aria-hidden="true" /><h3 className="font-display text-xl">Comprend</h3></div>
              <div className="mt-3 grid gap-2">
                {circuitIncludes.map(item => <p key={item} className="flex items-start gap-2 text-sm leading-relaxed text-emerald-950/80"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-700" aria-hidden="true" />{item}</p>)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-800/15 bg-rose-50 py-0 ring-0">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-rose-900"><CircleX className="size-5" aria-hidden="true" /><h3 className="font-display text-xl">Ne comprend pas</h3></div>
              <div className="mt-3 grid gap-2">
                {circuitExcludes.map(item => <p key={item} className="flex items-start gap-2 text-sm leading-relaxed text-rose-950/80"><CircleX className="mt-0.5 size-4 shrink-0 text-rose-700" aria-hidden="true" />{item}</p>)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-3 border-0 bg-[#14231d] py-0 text-white ring-0">
          <CardContent className="grid gap-3 p-4 sm:p-5 lg:grid-cols-3">
            <div className="flex gap-3"><Accessibility className="mt-0.5 size-5 shrink-0 text-[#f1d582]" aria-hidden="true" /><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f1d582]">Accessibilité</p><p className="mt-1 text-sm leading-relaxed text-stone-300">Le circuit est déclaré non accessible aux personnes à mobilité réduite.</p></div></div>
            <div className="flex gap-3"><PawPrint className="mt-0.5 size-5 shrink-0 text-[#f1d582]" aria-hidden="true" /><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f1d582]">Animaux</p><p className="mt-1 text-sm leading-relaxed text-stone-300">Les animaux de compagnie ne sont pas acceptés.</p></div></div>
            <div className="flex gap-3"><Info className="mt-0.5 size-5 shrink-0 text-[#f1d582]" aria-hidden="true" /><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f1d582]">À régler sur place</p><p className="mt-1 text-sm leading-relaxed text-stone-300">Le montant de la taxe de séjour sera communiqué sur place. Horaires et tarifs restent indicatifs.</p></div></div>
          </CardContent>
        </Card>

        <Card className="mt-3 border-amber-300 bg-amber-50 py-0 ring-0">
          <CardContent className="flex gap-3 p-4 sm:p-5">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-800" aria-hidden="true" />
            <div>
              <p className="font-display text-lg text-amber-950">Formalités avant départ</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-950/80">Chaque voyageur français, Adam compris, doit avoir son propre passeport en cours de validité. Pour ce séjour de moins de 90 jours, aucun visa n’est requis au Japon ni en Corée du Sud.</p>
              <p className="mt-2 text-sm leading-relaxed text-amber-950/80">Japon : Visit Japan Web est recommandé pour accélérer immigration et douanes. Corée : exemption de K-ETA valable jusqu’au 31 décembre 2026 ; remplir gratuitement l’e-Arrival Card dans les 3 jours précédant l’arrivée, sauf si vous détenez déjà un K-ETA valide.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline" className="rounded-full border-amber-800/20 bg-white text-amber-950"><a href="https://www.diplomatie.gouv.fr/fr/information-par-pays/japon/conseils-aux-voyageurs-entree-sejour" target="_blank" rel="noreferrer">Formalités Japon <ExternalLink aria-hidden="true" /></a></Button>
                <Button asChild size="sm" variant="outline" className="rounded-full border-amber-800/20 bg-white text-amber-950"><a href="https://www.diplomatie.gouv.fr/fr/information-par-pays/coree-du-sud/conseils-aux-voyageurs-entree-sejour" target="_blank" rel="noreferrer">Formalités Corée <ExternalLink aria-hidden="true" /></a></Button>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-amber-900/70">Règles vérifiées le 4 août 2026 ; elles peuvent évoluer avant le départ.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function AirFranceExtras() {
  return (
    <section className="mt-4" aria-labelledby="air-france-options-title">
      <Card className="overflow-hidden border-0 bg-[#14231d] py-0 text-white ring-0 shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <div className="flex flex-wrap items-center gap-2"><Badge className="bg-[#f1d582] text-[#14231d]">Air France · Confirmé</Badge><Badge variant="outline" className="border-white/20 bg-white/5 text-white">Dossier ZV8V7L</Badge></div>
              <h2 id="air-france-options-title" className="mt-3 font-display text-3xl">Sièges & bagages supplémentaires</h2>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-stone-300">Options confirmées pour Soukayna et Zakaria sur les vols aller et retour.</p>
          </div>

          <div className="grid gap-px bg-white/10 lg:grid-cols-2">
            {airFranceOptions.map(option => (
              <div key={option.route} className="bg-[#14231d] p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f1d582]">{option.flight}</p>
                <h3 className="mt-1 font-display text-xl">{option.route}</h3>

                <div className="mt-4 rounded-xl bg-white/8 p-3 ring-1 ring-white/10">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f1d582]"><Armchair className="size-4" aria-hidden="true" />Sièges réservés</p>
                  <div className="mt-2 divide-y divide-white/10">
                    {option.seats.map(seat => (
                      <div key={seat.emd} className="py-2 text-sm">
                        <div><p className="font-medium">{seat.traveler} · siège {seat.seat}</p><p className="mt-0.5 text-[10px] text-stone-400">EMD {seat.emd}</p></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2 rounded-xl bg-white/8 p-3 ring-1 ring-white/10">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f1d582]"><Luggage className="size-4" aria-hidden="true" />1 bagage supplémentaire chacun</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {option.bags.map(bag => <div key={bag.emd} className="rounded-lg bg-white/5 p-2.5 text-sm"><p className="font-medium">{bag.traveler} · 23 kg max.</p><p className="mt-0.5 text-[10px] text-stone-400">EMD {bag.emd}</p></div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 border-t border-white/10 p-4 text-xs leading-relaxed text-stone-300 sm:p-5">
            <Info className="mt-0.5 size-4 shrink-0 text-[#f1d582]" aria-hidden="true" />
            <p>Bagages confirmés pour Soukayna et Zakaria sur les deux vols : 23 kg maximum et 158 cm maximum par bagage.</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function HotelGym({ hotel }: { hotel: (typeof hotels)[number] }) {
  const styles = {
    strength: { badge: 'Musculation confirmée', shell: 'border-emerald-800/20 bg-emerald-50', icon: 'bg-emerald-900 text-white', badgeStyle: 'border-emerald-800/20 bg-white text-emerald-900' },
    limited: { badge: 'Musculation légère', shell: 'border-amber-700/20 bg-amber-50', icon: 'bg-amber-900 text-white', badgeStyle: 'border-amber-800/20 bg-white text-amber-900' },
    partner: { badge: 'Club partenaire', shell: 'border-sky-800/20 bg-sky-50', icon: 'bg-sky-950 text-white', badgeStyle: 'border-sky-800/20 bg-white text-sky-900' },
    none: { badge: 'Aucune salle', shell: 'border-rose-800/20 bg-rose-50', icon: 'bg-rose-900 text-white', badgeStyle: 'border-rose-800/20 bg-white text-rose-900' },
  }[hotel.gymStatus];

  return (
    <div className={cn('mt-3 rounded-xl border p-3', styles.shell)}>
      <div className="flex items-start gap-3">
        <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', styles.icon)}><Dumbbell className="size-5" aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#14231d]">Sport & musculation</p>
            <Badge variant="outline" className={cn('text-[9px]', styles.badgeStyle)}>{styles.badge}</Badge>
          </div>
          <p className="mt-2 font-display text-xl leading-tight text-[#14231d]">{hotel.gymName}</p>
          <p className="mt-1 text-sm font-semibold text-[#14231d]">{hotel.gymVerdict}</p>
          <p className="mt-2 text-xs leading-relaxed text-stone-700">{hotel.gymEquipment}</p>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
            <p className="flex items-start gap-2 rounded-lg bg-white/80 px-2.5 py-2 text-xs leading-relaxed text-[#14231d]"><Clock3 className="mt-0.5 size-3.5 shrink-0 text-[#d84a43]" aria-hidden="true" />{hotel.gymHours}</p>
            <p className="flex items-start gap-2 rounded-lg bg-white/80 px-2.5 py-2 text-xs leading-relaxed text-[#14231d]"><Info className="mt-0.5 size-3.5 shrink-0 text-[#d84a43]" aria-hidden="true" />{hotel.gymAccess}</p>
          </div>
          <Button asChild size="sm" variant="ghost" className="mt-2 h-8 rounded-full px-2 text-xs text-[#14231d]"><a href={hotel.gymSourceUrl} target="_blank" rel="noreferrer">Informations officielles <ExternalLink aria-hidden="true" /></a></Button>
        </div>
      </div>
    </div>
  );
}

interface NearbyTransportProps {
  icon: LucideIcon;
  label: string;
  name: string;
  detail: string;
  walkTime: string;
  scheduleUrl: string;
  accessibility: string;
  accessibilityNote: string;
  accessibilityUrl?: string;
}

function NearbyTransport({ icon: Icon, label, name, detail, walkTime, scheduleUrl, accessibility, accessibilityNote, accessibilityUrl }: NearbyTransportProps) {
  const hasStrollerLimitation = accessibility.includes('pliée') || accessibility.includes('Privilégier');

  return (
    <div className="flex items-start gap-3 p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-950 text-[#f1d582]"><Icon className="size-4" aria-hidden="true" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.14em] text-sky-800">{label}</p>
        <p className="mt-1 font-display text-lg leading-tight text-[#14231d]">{name}</p>
        <p className="mt-1 text-xs leading-relaxed text-stone-600">{detail}</p>
        <div className={cn('mt-2 rounded-lg border p-2.5', hasStrollerLimitation ? 'border-amber-700/15 bg-amber-50' : 'border-emerald-700/15 bg-emerald-50')}>
          <p className={cn('flex items-center gap-2 text-xs font-semibold', hasStrollerLimitation ? 'text-amber-950' : 'text-emerald-900')}><Baby className="size-4 shrink-0" aria-hidden="true" />{accessibility}</p>
          <p className={cn('mt-1.5 text-xs leading-relaxed', hasStrollerLimitation ? 'text-amber-950/75' : 'text-emerald-900/75')}>{accessibilityNote}</p>
          {accessibilityUrl && <Button asChild size="sm" variant="ghost" className="mt-1 h-7 rounded-full px-2 text-[11px] text-emerald-900"><a href={accessibilityUrl} target="_blank" rel="noreferrer"><Accessibility aria-hidden="true" />Plan d’accessibilité <ExternalLink aria-hidden="true" /></a></Button>}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-xs font-medium text-[#14231d]"><Footprints className="size-3.5 text-[#d84a43]" aria-hidden="true" />{walkTime}</p>
          <Button asChild size="sm" variant="outline" className="h-8 rounded-full border-sky-900/20 bg-white px-3 text-xs"><a href={scheduleUrl} target="_blank" rel="noreferrer">Horaires & itinéraire <ExternalLink aria-hidden="true" /></a></Button>
        </div>
      </div>
    </div>
  );
}

interface AppRecommendationProps {
  icon: LucideIcon;
  category: string;
  name: string;
  badge: string;
  detail: string;
  url: string;
}

function AppRecommendation({ icon: Icon, category, name, badge, detail, url }: AppRecommendationProps) {
  return (
    <div className="flex gap-3 py-3 first:pt-0 last:pb-0">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#14231d] text-[#f1d582]"><Icon className="size-4" aria-hidden="true" /></span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2"><p className="text-[10px] uppercase tracking-[0.14em] text-stone-500">{category}</p><Badge variant="outline" className="border-teal-700/20 bg-teal-50 text-[9px] text-teal-800">{badge}</Badge></div>
        <p className="mt-1 font-display text-lg text-[#14231d]">{name}</p>
        <p className="mt-1 text-xs leading-relaxed text-stone-600">{detail}</p>
        <Button asChild size="sm" variant="ghost" className="mt-1 h-8 rounded-full px-2 text-xs text-teal-800"><a href={url} target="_blank" rel="noreferrer"><Languages aria-hidden="true" />Ouvrir en anglais <ExternalLink aria-hidden="true" /></a></Button>
      </div>
    </div>
  );
}

interface NearbyServiceProps {
  icon: LucideIcon;
  label: string;
  name: string;
  meta?: string;
  address: string;
  note: string;
  mapUrl: string;
  walkTime: string;
  hours: string;
  days: string;
  averagePrice?: string;
  rating?: number;
  officialUrl?: string;
}

function NearbyService({ icon: Icon, label, name, meta, address, note, mapUrl, walkTime, hours, days, averagePrice, rating, officialUrl }: NearbyServiceProps) {
  return (
    <div className="flex items-start gap-3 p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#14231d] text-[#f1d582]"><Icon className="size-4" aria-hidden="true" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.14em] text-teal-800">{label}</p>
        <p className="mt-1 font-display text-lg leading-tight text-[#14231d]">{name}</p>
        {rating && <Badge className="mt-2 bg-[#f1d582] text-[#14231d]"><Star className="size-3 fill-[#d84a43] text-[#d84a43]" aria-hidden="true" />{rating.toFixed(1)}/5 · bien noté</Badge>}
        {meta && <Badge variant="outline" className="mt-2 border-teal-700/25 bg-white text-[9px] text-teal-800">{meta}</Badge>}
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          <p className="flex items-center gap-2 rounded-lg bg-white/80 px-2.5 py-2 text-xs font-medium text-[#14231d]"><Footprints className="size-3.5 shrink-0 text-[#d84a43]" aria-hidden="true" />{walkTime}</p>
          <p className="flex items-center gap-2 rounded-lg bg-white/80 px-2.5 py-2 text-xs font-medium text-[#14231d]"><Clock3 className="size-3.5 shrink-0 text-[#d84a43]" aria-hidden="true" />{hours}</p>
        </div>
        <p className="mt-1.5 flex items-start gap-2 text-xs leading-relaxed text-teal-900"><CalendarDays className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />{days}</p>
        {averagePrice && <p className="mt-1.5 flex items-start gap-2 rounded-lg border border-[#d84a43]/15 bg-[#fff8e7] px-2.5 py-2 text-xs font-semibold leading-relaxed text-[#14231d]"><Coins className="mt-0.5 size-3.5 shrink-0 text-[#d84a43]" aria-hidden="true" /><span><span className="block text-[9px] font-medium uppercase tracking-[0.12em] text-stone-500">Prix moyen</span>{averagePrice}</span></p>}
        <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-stone-700"><MapPin className="mt-0.5 size-3.5 shrink-0 text-[#d84a43]" aria-hidden="true" />{address}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{note}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline" className="h-8 rounded-full border-teal-800/20 bg-white px-3 text-xs"><a href={mapUrl} target="_blank" rel="noreferrer">Itinéraire <ExternalLink aria-hidden="true" /></a></Button>
          {officialUrl && <Button asChild size="sm" variant="ghost" className="h-8 rounded-full px-3 text-xs text-teal-800"><a href={officialUrl} target="_blank" rel="noreferrer">Boutiques & horaires <ExternalLink aria-hidden="true" /></a></Button>}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'confirme' | 'inclus' | 'a-confirmer' | 'en-confirmation' }) {
  if (status === 'en-confirmation') return <Badge className="bg-sky-700 text-white"><Clock3 className="size-3" />Payé · confirmation Klook en cours</Badge>;
  if (status === 'a-confirmer') return <Badge className="bg-[#f1d582] text-[#14231d]"><AlertTriangle className="size-3" />À confirmer</Badge>;
  return <Badge className="bg-teal-700 text-white"><CheckCircle2 className="size-3" />{status === 'confirme' ? 'Confirmé' : 'Inclus'}</Badge>;
}
