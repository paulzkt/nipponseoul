import userEvent from '@testing-library/user-event';
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
  expect(screen.getByText('Tokyo · journée libre')).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Activités' })).toBeInTheDocument();
  expect(screen.getByText('Grand Prince Hotel Takanawa')).toBeInTheDocument();

  for (const button of within(navigation).getAllByRole('button')) {
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-current', 'date');
    expect(screen.getByRole('tab', { name: 'Maintenant' })).toBeInTheDocument();
  }
});


it('keeps the booked Kyoto food tour in planning and moves optional visits to suggestions', async () => {
  const user = userEvent.setup();
  render(<Itinerary />);
  const navigation = screen.getByRole('navigation', { name: 'Choisir une journée' });
  await user.click(within(navigation).getByRole('button', { name: /07 OCT/ }));
  await user.click(screen.getByRole('tab', { name: 'Activités' }));
  expect(screen.getByText(/Gion Food Tour/, { selector: 'span' })).toBeInTheDocument();
  expect(screen.queryByText(/Arashiyama/, { selector: 'span' })).not.toBeInTheDocument();
  expect(screen.queryByText(/Fushimi/, { selector: 'span' })).not.toBeInTheDocument();
  await user.click(screen.getByRole('tab', { name: 'Suggestions' }));
  expect(screen.getByText(/Arashiyama.*suggestion/)).toBeInTheDocument();
  expect(screen.getByText(/Fushimi.*suggestion/)).toBeInTheDocument();
});
