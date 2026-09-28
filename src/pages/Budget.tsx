import { useState } from 'react';
import type { FormEvent } from 'react';
import { PiggyBank, Plus, Trash2, WalletCards } from 'lucide-react';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useTripState } from '@/hooks/useTripState';

export default function Budget() {
  const { state, addExpense, deleteExpense, setBudgetLimit } = useTripState();
  const [label, setLabel] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Divers');
  const total = state.expenses.reduce((sum, item) => sum + item.amount, 0);
  const percentage = Math.min(100, Math.round((total / state.budgetLimit) * 100));

  const submitExpense = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addExpense(label, Number(amount), category);
    setLabel('');
    setAmount('');
  };

  return (
    <div className="page-shell">
      <header className="page-heading">
        <div><p className="eyebrow">Depenses sur place</p><h1 className="page-title">Budget du voyage</h1></div>
        <div className="flex items-center gap-2"><span className="text-sm text-stone-500">Plafond</span><Input type="number" value={state.budgetLimit} onChange={event => setBudgetLimit(Number(event.target.value))} className="w-32 bg-white" aria-label="Plafond du budget" /><span className="text-sm">€</span></div>
      </header>

      <div className="mt-4 grid gap-3 lg:grid-cols-[.75fr_1.25fr]">
        <div className="grid gap-3">
          <Card className="border-0 bg-[#14231d] text-white ring-0">
            <CardContent className="p-4 sm:p-5">
              <WalletCards className="size-7 text-[#f1d582]" />
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-stone-300">Budget prévisionnel</p>
              <p className="mt-2 font-display text-5xl">{total.toLocaleString('fr-FR')} €</p>
              <progress className="trip-progress mt-7" value={percentage} max="100" aria-label={`${percentage}% du budget utilise`} />
              <div className="mt-3 flex justify-between text-xs text-stone-300"><span>{percentage}% utilise</span><span>{Math.max(0, state.budgetLimit - total).toLocaleString('fr-FR')} € restants</span></div>
            </CardContent>
          </Card>

          <Card className="border-stone-300/70 bg-[#f1d582] ring-0">
            <CardContent className="p-4">
              <PiggyBank className="size-7 text-[#14231d]" />
              <p className="mt-6 font-display text-xl text-[#14231d]">Ajouter une enveloppe</p>
              <form onSubmit={submitExpense} className="mt-4 grid gap-3">
                <Input value={label} onChange={event => setLabel(event.target.value)} placeholder="Ex. Pocket Wi-Fi" className="bg-white/70" required />
                <div className="grid grid-cols-2 gap-3"><Input type="number" min="1" value={amount} onChange={event => setAmount(event.target.value)} placeholder="Montant €" className="bg-white/70" required /><Input value={category} onChange={event => setCategory(event.target.value)} placeholder="Categorie" className="bg-white/70" /></div>
                <Button type="submit" className="mt-1 bg-[#14231d] text-white hover:bg-[#253d32]"><Plus />Ajouter</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="border-stone-300/70 bg-white ring-0">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-end justify-between"><div><p className="eyebrow">Repartition</p><h2 className="font-display text-2xl text-[#14231d]">Enveloppes prevues</h2></div><span className="text-sm text-stone-500">{state.expenses.length} postes</span></div>
            <div className="mt-6 divide-y divide-stone-200">
              {state.expenses.map(item => (
                <div key={item.id} className="flex min-h-16 items-center gap-4 py-3">
                  <span className="size-3 rounded-full bg-[#d84a43]" />
                  <div className="min-w-0 flex-1"><p className="font-medium text-[#14231d]">{item.label}</p><p className="text-xs uppercase tracking-wider text-stone-500">{item.category}</p></div>
                  <p className="font-display text-xl">{item.amount.toLocaleString('fr-FR')} €</p>
                  <Button variant="ghost" size="icon-sm" onClick={() => deleteExpense(item.id)} aria-label={`Supprimer ${item.label}`}><Trash2 className="size-4 text-stone-500" /></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
