import { ContactText } from '@/components/trip/ContactText';
import { useState, type ReactNode } from 'react';
import {
  Banknote,
  BedDouble,
  BriefcaseBusiness,
  Car,
  ChevronRight,
  ExternalLink,
  Globe2,
  Info,
  Luggage,
  Martini,
  PhoneCall,
  PlaneTakeoff,
  Shirt,
  ShoppingBag,
  Smartphone,
  Soup,
  TrainFront,
  TriangleAlert,
} from 'lucide-react';
import { Badge, Button, Card, CardContent } from '@/components/ui';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'essentiel', label: 'Essentiel', icon: Globe2 },
  { id: 'hotel', label: 'Hôtel', icon: BedDouble },
  { id: 'argent', label: 'Argent', icon: Banknote },
  { id: 'connexion', label: 'Connexion', icon: Smartphone },
  { id: 'cuisine', label: 'Cuisine', icon: Soup },
  { id: 'transport', label: 'Transport', icon: TrainFront },
  { id: 'sorties', label: 'Sorties', icon: ShoppingBag },
  { id: 'bagages', label: 'Bagages', icon: Luggage },
] as const;

type CategoryId = (typeof categories)[number]['id'];

export default function GeneralInfo() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('essentiel');

  return (
    <div className="page-shell">
      <header className="overflow-hidden rounded-[28px] bg-[#14231d] p-5 text-white shadow-[0_18px_45px_rgba(20,35,29,.18)]">
        <Badge className="bg-[#f1d582] text-[#14231d]">Guide pratique</Badge>
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8dfe3]">Japon & Corée · À garder sous la main</p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-none">General Info</h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-300">Les informations essentielles du document de voyage, organisées pour retrouver une réponse en quelques secondes.</p>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <QuickFact value="110" label="Police" />
          <QuickFact value="119" label="Urgences" />
          <QuickFact value="JPY" label="Monnaie" />
        </div>
      </header>

      <nav className="mt-4 grid grid-cols-4 gap-2" aria-label="Catégories d’informations générales">
        {categories.map(category => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'flex min-h-[70px] flex-col items-center justify-center gap-1.5 rounded-2xl border px-1 text-[9px] font-bold transition-colors',
                isActive
                  ? 'border-[#32746d] bg-[#32746d] text-white shadow-sm'
                  : 'border-stone-200 bg-white text-stone-500 hover:border-[#32746d]/40 hover:bg-[#e5f0ed]',
              )}
              aria-pressed={isActive}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </nav>

      <main className="mt-4" aria-live="polite">
        {activeCategory === 'essentiel' && <EssentialInfo />}
        {activeCategory === 'hotel' && <HotelInfo />}
        {activeCategory === 'argent' && <MoneyInfo />}
        {activeCategory === 'connexion' && <ConnectionInfo />}
        {activeCategory === 'cuisine' && <FoodInfo />}
        {activeCategory === 'transport' && <TransportInfo />}
        {activeCategory === 'sorties' && <LeisureInfo />}
        {activeCategory === 'bagages' && <BaggageInfo />}
      </main>

      <p className="mt-5 px-2 text-center text-[10px] leading-relaxed text-stone-400">Informations issues du guide fourni par l’agence. Les règles, tarifs et horaires peuvent évoluer : vérifier les sources officielles avant le départ.</p>
    </div>
  );
}

function EssentialInfo() {
  return (
    <Section title="Avant de partir" eyebrow="Japon & Corée">
      <InfoCard icon={PlaneTakeoff} title="Vols · les essentiels">
        <p><strong>30 sept. · 10:10</strong> — AF186, CDG 2E. À l’aéroport vers <strong>07:00</strong>. Arrivée Haneda le 1er oct. à 06:25.</p>
        <p><strong>12 oct. · 10:25</strong> — Peach MM737, KIX T2 → Gimpo 12:20. Départ hôtel <strong>05:30</strong> ; taxi à réserver.</p>
        <p><strong>15 oct. · 11:45</strong> — AF267, Incheon → Paris 18:55. Transfert à organiser.</p>
        <p className="text-xs text-stone-500">Rendez-vous, chauffeurs et billets dans les événements du jour.</p>
      </InfoCard>
      <InfoCard icon={PhoneCall} title="Urgence · Voyage Privé" tone="alert">
        <p>7j/7 · horaires français</p>
        <LinkButton href="https://wa.me/33484390920" label="WhatsApp · +33 4 84 39 09 20" />
        <p>09:00–20:30</p>
        <LinkButton href="tel:+33970174751" label="Appeler · +33 9 70 17 47 51" />
        <p>09:00–21:00</p>
      </InfoCard>
      <InfoCard icon={PhoneCall} title="Contacts sur place">
        <p><ContactText text="VIO Travel · +66 2 028 2018 · appels / WhatsApp" /></p>
        <p><ContactText text="VIO Travel · +66 92 247 2382 · WhatsApp uniquement" /></p>
        <p><ContactText text="Séoul, 13 oct. · +82 10-9809-3501 · WhatsApp" /></p>
        <LinkButton href="tel:+818070122238" label="Guide Osaka · +81 80-7012-2238" />
      </InfoCard>
      <InfoCard icon={BriefcaseBusiness} title="À vérifier">
        <BulletList items={[
          'Passeports, cartes d’embarquement et billets accessibles hors ligne. Kintetsu : billet en ligne au contrôle.',
          'Assurance, connexion mobile, bagages et équipements bébé.',
          'Food tours sans viande ni alcool : demande prise en compte à Kyoto ; confirmation attendue à Séoul.',
        ]} />
      </InfoCard>
      <InfoCard icon={Globe2} title="Formalités">
        <p>Vérifier les formalités de chaque voyageur dans Réservations.</p>
        <div className="flex flex-wrap gap-2">
          <LinkButton href="https://www.vjw.digital.go.jp/main/#/vjwplo001" label="Visit Japan Web" />
          <LinkButton href="https://www.e-arrivalcard.go.kr/" label="e-Arrival Card · Corée" />
        </div>
      </InfoCard>
      <InfoCard icon={Shirt} title="Dans la valise">
        <p>Pour octobre : vêtements en couches, pull léger, veste et pantalon long.</p>
      </InfoCard>
    </Section>
  );
}

function HotelInfo() {
  return (
    <Section title="Hôtels & hébergements" eyebrow="À l’arrivée">
      <InfoCard icon={Banknote} title="Taxe de séjour" tone="alert">
        <p>À Tokyo, Kyoto et Osaka, une taxe peut être facturée par personne et par nuit. Elle n’est généralement pas comprise dans le forfait et se règle directement à l’hôtel au check-in ou au check-out.</p>
        <p className="font-semibold text-[#14231d]">Montant indicatif : 100 à 1 000 JPY par personne et par nuit, selon le prix de la chambre.</p>
      </InfoCard>
      <InfoCard icon={BriefcaseBusiness} title="Dépôt pour frais accessoires">
        <p>L’hôtel peut demander une préautorisation bancaire ou un dépôt en espèces pour couvrir minibar, dégâts ou services supplémentaires. La somme est libérée ou remboursée au départ si elle n’a pas été utilisée.</p>
      </InfoCard>
      <InfoCard icon={BedDouble} title="Taille des chambres">
        <p>Les chambres japonaises sont généralement plus petites que les standards occidentaux. Prévoir des bagages compacts et un espace de rangement limité.</p>
      </InfoCard>
    </Section>
  );
}

function MoneyInfo() {
  return (
    <Section title="Banques & monnaie" eyebrow="Paiements">
      <InfoCard icon={Banknote} title="Yen japonais · JPY">
        <p>La monnaie officielle est le yen japonais, symbolisé par ¥. Les cartes sont largement acceptées en ville et dans les grandes enseignes, mais les espèces restent courantes dans les zones rurales, petits commerces et marchés.</p>
        <p className="font-semibold text-[#14231d]">Toujours garder quelques yens sur soi.</p>
      </InfoCard>
      <InfoCard title="Banques, retraits & change">
        <BulletList items={[
          'Principales banques : Mitsubishi UFJ Financial Group, Sumitomo Mitsui Banking Corporation et Mizuho Financial Group.',
          'DAB largement disponibles dans les banques et konbini, notamment 7-Eleven ; les cartes internationales sont généralement acceptées.',
          'Prévenir sa banque avant le voyage.',
          'Change possible dans les banques, aéroports et bureaux de change ; les taux des aéroports sont parfois moins favorables.',
        ]} />
      </InfoCard>
    </Section>
  );
}

function ConnectionInfo() {
  return (
    <Section title="Communications" eyebrow="Rester connecté">
      <InfoCard icon={Smartphone} title="Téléphone & internet">
        <BulletList items={[
          'Réseau mobile très développé : roaming international, téléphone de location ou carte SIM locale.',
          'Principaux opérateurs : NTT Docomo, au et SoftBank.',
          'Wi-Fi courant dans les hôtels, cafés et espaces publics.',
          'Possibilité de louer un pocket Wi-Fi pour une connexion continue.',
        ]} />
      </InfoCard>
      <InfoCard icon={PhoneCall} title="Numéros d’urgence" tone="alert">
        <div className="grid grid-cols-2 gap-3">
          <EmergencyNumber number="110" label="Police" />
          <EmergencyNumber number="119" label="Pompiers & ambulance" />
        </div>
      </InfoCard>
      <InfoCard title="Poste & livraison de bagages">
        <p>Japan Post propose des services fiables de courrier, colis et envoi international dans de nombreux bureaux de poste.</p>
        <p>Voyager léger est recommandé : le métro dispose d’un nombre limité d’ascenseurs et les bagages surdimensionnés nécessitent une réservation dans certains Shinkansen.</p>
        <p>Les services de livraison de bagages coûtent environ <strong>2 000 JPY par article</strong>.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <LinkButton href="https://www.global-yamato.com/en/hands-free-travel/" label="Hands-Free Travel" />
          <LinkButton href="https://global.jr-central.co.jp/en/info/oversized-baggage/" label="Tailles Shinkansen" />
        </div>
      </InfoCard>
    </Section>
  );
}

function FoodInfo() {
  const foods = [
    ['Sushi & sashimi', 'Poisson et fruits de mer crus, souvent servis avec du riz.'],
    ['Ramen', 'Soupe de nouilles avec différents bouillons et garnitures.'],
    ['Tempura', 'Légumes et fruits de mer panés puis frits.'],
    ['Yakitori', 'Brochettes de poulet grillé.'],
    ['Okonomiyaki', 'Crêpe salée garnie de différents ingrédients.'],
    ['Kaiseki', 'Repas traditionnel en plusieurs services, centré sur les produits de saison.'],
  ];
  const drinks = [
    ['Thé vert', 'Boisson incontournable, souvent servie avec les repas.'],
    ['Saké', 'Alcool de riz servi chaud ou froid.'],
    ['Shochu', 'Spiritueux distillé à base d’orge, patate douce ou riz.'],
    ['Bière', 'Marques populaires : Asahi, Sapporo et Kirin.'],
    ['Sans alcool', 'Calpico et boissons aromatisées au matcha à essayer.'],
  ];
  return (
    <Section title="Cuisine & boissons" eyebrow="À goûter">
      <p className="mb-3 text-sm leading-relaxed text-stone-600">La cuisine japonaise privilégie la fraîcheur et la présentation, de la street food aux restaurants haut de gamme.</p>
      <InfoCard icon={Soup} title="Spécialités">
        <DefinitionList items={foods} />
      </InfoCard>
      <InfoCard icon={Martini} title="Boissons">
        <DefinitionList items={drinks} />
      </InfoCard>
    </Section>
  );
}

function TransportInfo() {
  return (
    <Section title="Se déplacer" eyebrow="Transports">
      <InfoCard icon={TrainFront} title="Suica · trains, métros & bus">
        <p>La Suica est une carte IC rechargeable utilisable dans les transports, konbini et distributeurs automatiques. Elle fonctionne à Tokyo, Osaka, Kyoto et dans la plupart des grandes villes.</p>
        <BulletList items={[
          'iPhone 8 ou plus récent : utiliser Welcome Suica Mobile ou Apple Wallet.',
          'Android international : acheter une carte physique à l’aéroport ou dans une grande gare, la plupart des appareils n’acceptant pas la Suica numérique.',
          'Recharge aux distributeurs de billets et dans les konbini.',
        ]} />
        <div className="mt-4"><LinkButton href="https://apps.apple.com/us/app/welcome-suica-mobile/6738336566" label="Welcome Suica Mobile" /></div>
      </InfoCard>
      <InfoCard icon={Car} title="Location de voiture · documents">
        <BulletList items={[
          'Conducteur âgé d’au moins 18 ans.',
          'Permis du pays d’origine et passeport à présenter au loueur.',
          'Permis international conforme à la Convention de Genève de 1949, ou traduction japonaise officielle pour certains pays non signataires, dont la France.',
          'Réserver à l’avance et vérifier durée, assurances, lieu de retrait/retour, kilométrage et carburant.',
        ]} />
        <div className="mt-4"><LinkButton href="https://english.jaf.or.jp/driving-in-japan/drive-in-japan/about-dltas" label="Règles JAF" /></div>
      </InfoCard>
      <InfoCard title="Conduite & navigation">
        <BulletList items={[
          'Conduire à gauche ; ceinture obligatoire ; téléphone au volant interdit.',
          'Limites indicatives du guide : 60 km/h en zone urbaine et 100 km/h sur autoroute ; toujours suivre la signalisation locale.',
          'Les GPS de location peuvent être disponibles en anglais. Les panneaux comportent souvent une traduction anglaise.',
          'Les Map Codes japonais permettent de saisir une destination sans adresse complète.',
          'Applications utiles : Google Maps et Japan Travel by NAVITIME.',
        ]} />
      </InfoCard>
      <InfoCard title="Péages">
        <BulletList items={[
          'Voies ETC violettes : paiement automatique avec boîtier ETC.',
          'Voies manuelles vertes : arrêt et paiement en espèces ou par carte.',
          'Voies mixtes : ETC ou paiement manuel.',
          'Voies bleues : pass autoroutiers spécifiques, comme le Hokkaido Expressway Pass.',
          'Le véhicule de location peut ne pas avoir de boîtier ETC et certains péages refusent la carte : conserver des espèces.',
        ]} />
      </InfoCard>
      <InfoCard title="Parking, assurance & carburant">
        <BulletList items={[
          'Stationnement plus cher et limité dans les centres urbains, plus simple à la campagne.',
          'Supermarchés et konbini offrent souvent un parking gratuit ou une période de grâce aux clients.',
          'Certains parkings utilisent des plateaux et ascenseurs automatisés.',
          'Envisager une assurance complémentaire, la couverture standard pouvant être limitée.',
          'Les stations peuvent demander un paiement anticipé ; libre-service fréquent. Carburants : ordinaire, premium et diesel.',
          'Espèces et cartes généralement acceptées ; vérifier les horaires des stations.',
          'Conduire avec patience, utiliser les clignotants et respecter strictement le code local.',
        ]} />
      </InfoCard>
    </Section>
  );
}

function LeisureInfo() {
  return (
    <Section title="Sorties & shopping" eyebrow="Temps libre">
      <InfoCard icon={Martini} title="Vie nocturne">
        <BulletList items={[
          'Izakayas : ambiance décontractée, boissons et petits plats à partager.',
          'Karaokés : salles privées pour chanter seul ou en groupe.',
          'Clubs : scènes animées à Tokyo et Osaka, notamment Shibuya et Roppongi.',
          'Quartiers de divertissement : Kabukicho à Tokyo et Dotonbori à Osaka.',
          'Spectacles : kabuki traditionnel, comédies musicales et humour.',
          'Restauration tardive : nombreux ramen, sushis et autres restaurants ouverts tard en ville.',
        ]} />
      </InfoCard>
      <InfoCard icon={ShoppingBag} title="Où faire ses achats">
        <BulletList items={[
          'Grands magasins : Mitsukoshi, Isetan et Takashimaya.',
          'Électronique : Bic Camera et Yodobashi Camera.',
          'Mode : Shibuya et Harajuku à Tokyo, Shinsaibashi à Osaka.',
          'Marchés traditionnels : Nishiki à Kyoto et Tsukiji Outer Market à Tokyo.',
          'Souvenirs : artisanat japonais, spécialités locales, matcha et confiseries traditionnelles.',
          'Konbini : 7-Eleven, Lawson et FamilyMart pour snacks, boissons et produits essentiels.',
        ]} />
      </InfoCard>
      <InfoCard title="Horaires & détaxe" tone="alert">
        <p>Les commerces ouvrent généralement autour de <strong>10 h à 19 h</strong>, tous les jours de la semaine.</p>
        <p>Garder son <strong>passeport</strong> lors des achats tax-free ou duty-free : il sert à vérifier l’identité, l’éligibilité et à traiter le remboursement de taxe.</p>
      </InfoCard>
    </Section>
  );
}

function BaggageInfo() {
  return (
    <Section title="Bagages & savoir-vivre" eyebrow="Règles pratiques">
      <InfoCard icon={Luggage} title="Bagage cabine">
        <BulletList items={[
          'En général : un bagage cabine et un effet personnel.',
          'Dimensions indicatives : environ 55 × 40 × 25 cm.',
          'Poids généralement compris entre 7 et 10 kg.',
          'Liquides, gels et aérosols : contenants de 100 ml maximum dans un sac transparent refermable.',
          'Toujours vérifier les règles et éventuels frais directement auprès de la compagnie aérienne.',
        ]} />
      </InfoCard>
      <InfoCard icon={BriefcaseBusiness} title="Bagage en soute">
        <BulletList items={[
          'Poids standard indicatif : 20 à 23 kg par bagage.',
          'Dimensions totales indicatives : environ 158 cm (longueur + largeur + hauteur).',
          'Des frais peuvent s’appliquer en cas de surpoids ou de format hors gabarit.',
          'Respecter les interdictions sur les matières dangereuses, produits inflammables et certains appareils électroniques.',
          'Déclarer et emballer soigneusement les objets fragiles ou de valeur.',
          'Skis, clubs de golf et autres équipements sportifs peuvent être soumis à des frais et règles spécifiques.',
        ]} />
      </InfoCard>
      <InfoCard icon={TrainFront} title="Bagages dans le Shinkansen" tone="alert">
        <p>Chaque bagage doit rester sous <strong>250 cm</strong> de dimensions cumulées, <strong>200 cm</strong> de longueur et <strong>30 kg</strong>.</p>
        <p>Les bagages dont les trois dimensions totalisent moins de <strong>160 cm</strong> peuvent être emportés sans réservation préalable. Les bagages surdimensionnés nécessitent une réservation.</p>
        <div className="mt-4"><LinkButton href="https://global.jr-central.co.jp/en/info/oversized-baggage/" label="Règles officielles JR" /></div>
      </InfoCard>
      <InfoCard title="Douane & livraison">
        <BulletList items={[
          'Respecter les franchises duty-free, notamment pour l’alcool et le tabac.',
          'Le Japon applique des règles strictes aux médicaments : vérifier les autorisations si vous transportez un traitement sur ordonnance.',
          'Les comptoirs Hands-Free Travel acheminent les bagages vers l’hôtel depuis de grands aéroports : Narita, Haneda, Kansai, Chubu Centrair, New Chitose, Fukuoka et Naha.',
        ]} />
        <div className="mt-4"><LinkButton href="https://www.global-yamato.com/en/hands-free-travel/" label="Livraison de bagages" /><LinkButton href="https://www.japan-experience.com/fr/preparer-voyage/savoir/avant-de-partir/takkyubin-expedier-vos-bagages-entre-des-destinations-au-japon" label="Guide Takkyubin · Japan Experience" /></div>
      </InfoCard>
      <InfoCard icon={TriangleAlert} title="Tatouages" tone="alert">
        <p>Les tatouages ne sont pas illégaux, mais ils ne sont pas acceptés partout. Certains temples, sanctuaires, hôtels de plage et onsens peuvent demander de les couvrir.</p>
        <p>À Hakone notamment, réserver une chambre avec onsen privé évite les restrictions des bains publics.</p>
      </InfoCard>
      <InfoCard icon={TrainFront} title="Étiquette dans les transports">
        <p>Les trains et bus sont calmes. Parler fort ou téléphoner est considéré comme impoli : limiter les conversations, mettre le téléphone en silencieux et attendre d’être descendu ou rejoindre un espace prévu pour prendre un appel.</p>
      </InfoCard>
    </Section>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section>
      <div className="px-1"><p className="eyebrow">{eyebrow}</p><h2 className="mt-1 font-display text-3xl font-bold text-[#14231d]">{title}</h2></div>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function InfoCard({ icon: Icon = Info, title, tone = 'default', children }: { icon?: typeof Info; title: string; tone?: 'default' | 'alert'; children: ReactNode }) {
  return (
    <Card className={cn('py-0 ring-0 shadow-sm', tone === 'alert' ? 'border-amber-300/80 bg-amber-50' : 'border-stone-200 bg-white')}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <span className={cn('grid size-10 shrink-0 place-items-center rounded-2xl', tone === 'alert' ? 'bg-amber-400 text-[#14231d]' : 'bg-[#e5f0ed] text-[#176158]')}><Icon className="size-5" aria-hidden="true" /></span>
          <h3 className="font-display text-xl font-bold leading-tight text-[#14231d]">{title}</h3>
        </div>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-600">{children}</div>
      </CardContent>
    </Card>
  );
}

function QuickFact({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl bg-white/10 px-2 py-3 text-center"><p className="font-display text-xl font-bold text-[#f1d582]">{value}</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-stone-300">{label}</p></div>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map(item => <li key={item} className="flex gap-2"><ChevronRight className="mt-1 size-3.5 shrink-0 text-[#d84a43]" aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  );
}

function DefinitionList({ items }: { items: string[][] }) {
  return <div className="divide-y divide-stone-100">{items.map(([term, description]) => <div key={term} className="py-2.5 first:pt-0 last:pb-0"><p className="font-semibold text-[#14231d]">{term}</p><p className="mt-0.5 text-xs">{description}</p></div>)}</div>;
}

function EmergencyNumber({ number, label }: { number: string; label: string }) {
  return <a href={`tel:${number}`} className="rounded-2xl bg-white p-3 text-center shadow-sm"><p className="font-display text-3xl font-bold text-[#d84a43]">{number}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-stone-500">{label}</p></a>;
}

function LinkButton({ href, label }: { href: string; label: string }) {
  return <Button asChild size="sm" variant="outline" className="min-h-10 rounded-full bg-white"><a href={href} target="_blank" rel="noreferrer">{label}<ExternalLink aria-hidden="true" /></a></Button>;
}
