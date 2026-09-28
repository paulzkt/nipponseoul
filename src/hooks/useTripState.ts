import { useEffect, useState } from 'react';
import { initialExpenses, initialTasks } from '@/data/trip';
import type { Expense, MagnetCityId, TaskStatus, TripTask } from '@/data/trip';

interface TripState {
  tasks: TripTask[];
  completedDays: string[];
  expenses: Expense[];
  budgetLimit: number;
  magnetsCollected: MagnetCityId[];
  completedAgenda: string[];
}

const STORAGE_KEY = 'nippon-seoul-trip-state-v1';

const initialState: TripState = {
  tasks: initialTasks,
  completedDays: [],
  expenses: initialExpenses,
  budgetLimit: 3000,
  magnetsCollected: [],
  completedAgenda: [],
};

function isTripState(value: unknown): value is TripState {
  if (typeof value !== 'object' || value === null) return false;
  return (
    'tasks' in value && Array.isArray(value.tasks) &&
    'completedDays' in value && Array.isArray(value.completedDays) &&
    'expenses' in value && Array.isArray(value.expenses) &&
    'budgetLimit' in value && typeof value.budgetLimit === 'number' &&
    (!('magnetsCollected' in value) || Array.isArray(value.magnetsCollected)) &&
    (!('completedAgenda' in value) || Array.isArray(value.completedAgenda))
  );
}

function readState(): TripState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialState;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isTripState(parsed)) return initialState;
    const currentTasks = new Map(parsed.tasks.map(task => [task.id, task]));
    const tasks = initialTasks.map(task => {
      const saved = currentTasks.get(task.id);
      if (!saved) return task;
      return task.id === 'luggage' || task.id === 'seats' || task.id === 'mario'
        ? { ...saved, label: task.label, status: task.status, due: task.due }
        : { ...task, status: saved.status };
    });
    const customTasks = parsed.tasks.filter(task => !initialTasks.some(initialTask => initialTask.id === task.id));
    return {
      ...parsed,
      magnetsCollected: parsed.magnetsCollected ?? [],
      completedAgenda: parsed.completedAgenda ?? [],
      tasks: [...tasks, ...customTasks],
    };
  } catch {
    return initialState;
  }
}

export function useTripState() {
  const [state, setState] = useState<TripState>(readState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateTaskStatus = (id: string, status: TaskStatus): void => {
    setState(current => ({
      ...current,
      tasks: current.tasks.map(task => task.id === id ? { ...task, status } : task),
    }));
  };

  const addTask = (label: string): void => {
    const cleanLabel = label.trim();
    if (!cleanLabel) return;
    setState(current => ({
      ...current,
      tasks: [...current.tasks, { id: crypto.randomUUID(), label: cleanLabel, status: 'todo' }],
    }));
  };

  const toggleDay = (id: string): void => {
    setState(current => ({
      ...current,
      completedDays: current.completedDays.includes(id)
        ? current.completedDays.filter(dayId => dayId !== id)
        : [...current.completedDays, id],
    }));
  };

  const toggleMagnet = (cityId: MagnetCityId): void => {
    setState(current => ({
      ...current,
      magnetsCollected: current.magnetsCollected.includes(cityId)
        ? current.magnetsCollected.filter(id => id !== cityId)
        : [...current.magnetsCollected, cityId],
    }));
  };

  const toggleAgendaItem = (itemId: string): void => {
    setState(current => ({
      ...current,
      completedAgenda: current.completedAgenda.includes(itemId)
        ? current.completedAgenda.filter(id => id !== itemId)
        : [...current.completedAgenda, itemId],
    }));
  };

  const addExpense = (label: string, amount: number, category: string): void => {
    if (!label.trim() || amount <= 0) return;
    setState(current => ({
      ...current,
      expenses: [...current.expenses, { id: crypto.randomUUID(), label: label.trim(), amount, category }],
    }));
  };

  const deleteExpense = (id: string): void => {
    setState(current => ({ ...current, expenses: current.expenses.filter(item => item.id !== id) }));
  };

  const setBudgetLimit = (budgetLimit: number): void => {
    if (budgetLimit > 0) setState(current => ({ ...current, budgetLimit }));
  };

  const resetState = (): void => setState(initialState);

  return { state, updateTaskStatus, addTask, toggleDay, toggleMagnet, toggleAgendaItem, addExpense, deleteExpense, setBudgetLimit, resetState };
}
