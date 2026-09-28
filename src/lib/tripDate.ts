import { dailyPlans } from '@/data/dailyPlan';

const TRIP_START = new Date(2026, 8, 30);
const TRIP_END = new Date(2026, 9, 15, 23, 59, 59);

export interface TripDayContext {
  index: number;
  hasStarted: boolean;
  hasEnded: boolean;
  isTravelDay: boolean;
}

export type TripDayStatus = 'completed' | 'today' | 'upcoming';

export function getTripDayStatus(dayIndex: number, now = new Date()): TripDayStatus {
  const localToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayDate = new Date(TRIP_START.getFullYear(), TRIP_START.getMonth(), TRIP_START.getDate() + dayIndex);
  if (dayDate.getTime() < localToday.getTime()) return 'completed';
  if (dayDate.getTime() === localToday.getTime()) return 'today';
  return 'upcoming';
}

export function getTripDayContext(now = new Date()): TripDayContext {
  const localToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const rawIndex = Math.floor((localToday.getTime() - TRIP_START.getTime()) / 86_400_000);
  return {
    index: Math.max(0, Math.min(dailyPlans.length - 1, rawIndex)),
    hasStarted: now >= TRIP_START,
    hasEnded: now > TRIP_END,
    isTravelDay: now >= TRIP_START && now <= TRIP_END,
  };
}
