import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import Itinerary from './Itinerary';

beforeEach(() => {
  localStorage.clear();
  Element.prototype.scrollIntoView = vi.fn();
});

it('opens October 4 without a primary event and allows continuing through the itinerary', () => {
  render(<Itinerary />);
  const navigation = screen.getByRole('navigation', { name: 'Choisir une journée' });
  fireEvent.click(within(navigation).getByRole('button', { name: /04 OCT/ }));
  expect(screen.getByText('Mont Fuji en option')).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Activités' })).toBeInTheDocument();
  expect(screen.getByText('Grand Prince Hotel Takanawa')).toBeInTheDocument();

  for (const button of within(navigation).getAllByRole('button')) {
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-current', 'date');
    expect(screen.getByRole('tab', { name: 'Maintenant' })).toBeInTheDocument();
  }
});
