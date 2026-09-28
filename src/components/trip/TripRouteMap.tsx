import { MapPin, Plane } from 'lucide-react';
import { Badge, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TripRouteMapProps {
  className?: string;
}

const stops = [
  { city: 'Tokyo', date: '01–05 OCT', x: 314, y: 72, active: true },
  { city: 'Kyoto', date: '05–10 OCT', x: 250, y: 132, active: false },
  { city: 'Osaka', date: '10–12 OCT', x: 214, y: 182, active: false },
  { city: 'Séoul', date: '12–15 OCT', x: 91, y: 118, active: false },
];

export function TripRouteMap({ className }: TripRouteMapProps) {
  return (
    <Card className={cn('relative overflow-hidden rounded-[30px] border-0 bg-[#173d3a] py-0 text-white ring-0', className)}>
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <svg viewBox="0 0 390 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <path d="M-30 52C45 24 88 45 118 87c24 34 52 19 80-4 38-31 73-42 111-24 31 15 50 10 101-25v230H-30Z" fill="#285a55" />
          <path d="M-20 204c72-46 135-37 176-4 39 31 83 27 122-4 35-27 74-29 132-3v70H-20Z" fill="#204b47" />
          <path d="M15 82c49-18 85-7 112 28M291 28c45 7 75 24 104 53M126 213c46-21 95-17 144 6" fill="none" stroke="#6e9691" strokeWidth="1" />
          <path className="trip-map-path" d="M314 72C294 95 274 112 250 132S229 165 214 182C177 163 132 142 91 118" fill="none" stroke="#f4e5a4" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
          {stops.map(stop => (
            <g key={stop.city}>
              <circle cx={stop.x} cy={stop.y} r={stop.active ? 10 : 7} fill={stop.active ? '#ff6a57' : '#ffffff'} stroke="#173d3a" strokeWidth="4" />
              <circle cx={stop.x} cy={stop.y} r={stop.active ? 15 : 12} fill="none" stroke="#ffffff" strokeOpacity=".18" />
              <text x={stop.x} y={stop.y - 18} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">{stop.city}</text>
              <text x={stop.x} y={stop.y + 25} textAnchor="middle" fill="#b7d2ce" fontSize="6" fontWeight="700">{stop.date}</text>
            </g>
          ))}
          <g transform="translate(173 146) rotate(32)"><path d="M0 0l18 5-18 5 4-5Z" fill="#ffffff" /></g>
        </svg>
      </div>

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge className="border border-white/10 bg-white/10 text-white">Voyage familial · 2026</Badge>
            <h1 className="mt-4 text-3xl font-bold leading-[.95] tracking-[-0.055em]">Japon<br /><span className="text-[#f4e5a4]">& Corée du Sud</span></h1>
          </div>
          <span className="grid size-11 place-items-center rounded-full bg-white text-[#173d3a] shadow-lg"><Plane className="size-5 rotate-45" aria-hidden="true" /></span>
        </div>

        <div className="mt-28 flex items-end justify-between gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b7d2ce]">Votre parcours</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold"><MapPin className="size-4 text-[#ff6a57]" />5 villes · 16 jours</p>
          </div>
          <div className="flex -space-x-2" aria-label="Zakaria, Soukayna et Adam">
            {['Z', 'S', 'A'].map((initial, index) => <span key={initial} className={cn('grid size-9 place-items-center rounded-full border-2 border-[#173d3a] text-xs font-bold', index === 0 ? 'bg-[#ff6a57]' : index === 1 ? 'bg-[#f4e5a4] text-[#173d3a]' : 'bg-[#b9d8ef] text-[#173d3a]')}>{initial}</span>)}
          </div>
        </div>
      </div>
    </Card>
  );
}
