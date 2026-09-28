import { NavLink, Outlet } from 'react-router';
import { Baby, BookOpenText, CalendarDays, Route, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { to: '/', label: 'Voyage', icon: CalendarDays, end: true },
  { to: '/baby', label: 'Adam', icon: Baby, end: false },
  { to: '/restaurants', label: 'Restaurant', icon: UtensilsCrossed, end: false },
  { to: '/general-info', label: 'General Info', icon: BookOpenText, end: false },
];

export default function AppLayout() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[520px] bg-background text-foreground shadow-[0_0_60px_rgba(20,35,29,.14)]">
      <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/92 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">
          <NavLink to="/" className="flex min-h-11 items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-[#32746d] text-white shadow-sm"><Route className="size-5" aria-hidden="true" /></span>
            <span>
              <span className="block font-display text-base font-bold leading-none text-[#14231d]">Nippon Seoul</span>
              <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.18em] text-stone-500">30.09 — 15.10.26</span>
            </span>
          </NavLink>
          <NavLink to="/" className="rounded-full bg-[#e5f0ed] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#176158]">Assistant</NavLink>
        </div>
      </header>

      <main className="pb-28"><Outlet /></main>

      <nav className="fixed inset-x-3 bottom-3 z-[2000] mx-auto max-w-[500px] rounded-[22px] border border-stone-200/80 bg-white/96 p-1.5 pb-[max(.4rem,env(safe-area-inset-bottom))] shadow-[0_12px_40px_rgba(20,35,29,.18)] backdrop-blur-xl" aria-label="Navigation principale">
        <div className="grid grid-cols-4 gap-1">
          {navigation.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => cn(
                  'relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[9px] font-semibold transition-all',
                  isActive ? 'bg-[#e5f0ed] text-[#176158]' : 'text-stone-400 hover:bg-stone-100 hover:text-[#14231d]',
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="max-w-full truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
