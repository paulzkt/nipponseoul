import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, CirclePlus, Gift } from 'lucide-react';
import { Badge, Button, Card, CardContent, Checkbox, Input } from '@/components/ui';
import { magnetCities, statusLabels } from '@/data/trip';
import type { TaskStatus } from '@/data/trip';
import { useTripState } from '@/hooks/useTripState';

const columns: TaskStatus[] = ['todo', 'progress', 'done'];

export default function Planner() {
  const { state, updateTaskStatus, addTask, toggleMagnet } = useTripState();
  const [newTask, setNewTask] = useState<string>('');
  const magnetProgress = state.magnetsCollected.length;

  const submitTask = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addTask(newTask);
    setNewTask('');
  };

  return (
    <div className="page-shell">
      <header className="page-heading">
        <div><p className="eyebrow">Kanban de preparation</p><h1 className="page-title">Tout ce qu il reste a faire</h1></div>
        <form onSubmit={submitTask} className="flex w-full max-w-md gap-2">
          <Input value={newTask} onChange={event => setNewTask(event.target.value)} placeholder="Ajouter une tache..." className="min-h-11 bg-white" aria-label="Nouvelle tache" />
          <Button type="submit" className="min-h-11 bg-[#d84a43] hover:bg-[#bf3934]"><CirclePlus />Ajouter</Button>
        </form>
      </header>

      <section className="mt-4 overflow-hidden rounded-2xl border border-rose-900/15 bg-[#fff5f2]" aria-labelledby="magnet-todo-title">
        <div className="flex items-center justify-between gap-3 border-b border-rose-900/10 bg-[#9f2f3f] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white/10"><Gift className="size-5" aria-hidden="true" /></span>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-rose-100">Collection du voyage</p>
              <h2 id="magnet-todo-title" className="font-display text-xl">Aimants souvenirs</h2>
            </div>
          </div>
          <Badge className="bg-[#f1d582] text-[#14231d]">{magnetProgress}/{magnetCities.length}</Badge>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-5">
          {magnetCities.map(city => {
            const collected = state.magnetsCollected.includes(city.id);
            return (
              <label key={city.id} className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-rose-900/10 bg-white px-3 py-2.5 shadow-sm transition hover:border-rose-400">
                <Checkbox checked={collected} onCheckedChange={() => toggleMagnet(city.id)} aria-label={`Aimant ${city.label} acheté`} />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-[#14231d]">{city.label}</span>
                  <span className="block text-[10px] text-stone-500">{collected ? 'Aimant acheté' : 'À acheter'}</span>
                </span>
                {collected && <Check className="size-4 text-teal-700" aria-hidden="true" />}
              </label>
            );
          })}
        </div>
        <p className="px-4 pb-3 text-[10px] leading-relaxed text-stone-500">Une case cochée ici est automatiquement reprise dans le planning de la ville, et inversement.</p>
      </section>

      <div className="mt-4 grid items-start gap-3 lg:grid-cols-3">
        {columns.map((status, columnIndex) => (
          <section key={status} className="rounded-2xl border border-stone-300/70 bg-[#eee6d8]/65 p-3">
            <div className="mb-4 flex items-center justify-between px-1">
              <h2 className="font-display text-xl text-[#14231d]">{statusLabels[status]}</h2>
              <span className="grid size-7 place-items-center rounded-full bg-white text-xs text-stone-600">{state.tasks.filter(task => task.status === status).length}</span>
            </div>
            <div className="grid gap-3">
              {state.tasks.filter(task => task.status === status).map(task => (
                <Card key={task.id} className="border-stone-300/80 bg-white py-0 ring-0 shadow-sm">
                  <CardContent className="p-4">
                    <p className="font-medium leading-snug text-[#14231d]">{task.label}</p>
                    {task.due && <p className="mt-2 text-xs font-medium text-[#d84a43]">{task.due}</p>}
                    <div className="mt-4 flex gap-2">
                      {columnIndex > 0 && <Button size="sm" variant="outline" onClick={() => updateTaskStatus(task.id, columns[columnIndex - 1])}>Retour</Button>}
                      {columnIndex < columns.length - 1 && <Button size="sm" className="ml-auto bg-[#14231d] text-white hover:bg-[#253d32]" onClick={() => updateTaskStatus(task.id, columns[columnIndex + 1])}>Avancer <ArrowRight /></Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {state.tasks.every(task => task.status !== status) && <p className="rounded-xl border border-dashed border-stone-300 p-5 text-center text-sm text-stone-500">Aucune tache ici.</p>}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
