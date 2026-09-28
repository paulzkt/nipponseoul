import { Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { restaurantBabyInfo } from '@/data/restaurantBaby';
import { cn } from '@/lib/utils';

export function BabyFriendly({ id }: { id: string }) {
  const info = restaurantBabyInfo[id];
  const label = info?.status === 'yes' ? 'Bébé bienvenu' : info?.status === 'no' ? 'Peu adapté avec bébé' : 'Bébé : à vérifier';
  return <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" className={cn('min-h-11 gap-1.5 px-2 text-xs', info?.status === 'yes' ? 'text-emerald-800' : info?.status === 'no' ? 'text-amber-800' : 'text-muted-foreground')} aria-label={label}>
        {info?.status === 'yes' && <Baby className="size-5" aria-hidden="true" />}
        {label}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="max-w-[calc(100vw-2rem)]">
      <p className="font-semibold">{label}</p>
      <p>{info?.detail ?? 'Pas encore d’information confirmée sur les chaises bébé ou une place adaptée à table. Ce statut ne signifie pas que les bébés sont refusés.'}</p>
      {info && <a href={info.sourceUrl} target="_blank" rel="noreferrer" className="flex min-h-11 items-center underline">Source · {info.checkedAt}</a>}
    </PopoverContent>
  </Popover>;
}
