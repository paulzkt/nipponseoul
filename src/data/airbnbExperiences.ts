export interface AirbnbDaySuggestion {
  status: 'recommended' | 'skip';
  note: string;
  title?: string;
  detail?: string;
  rating?: string;
  familyNote?: string;
  url?: string;
}

export const airbnbDaySuggestions: Record<string, AirbnbDaySuggestion> = {
  sep30: { status: 'skip', note: 'Journée de vol : aucune expérience à réserver.' },
  oct01: { status: 'skip', note: 'Arrivée très matinale : garder cette journée souple pour le décalage horaire et le rythme d’Adam.' },
  oct02: { status: 'skip', note: 'Le Tsukiji Food Tour With a Former Chef est confirmé de 07:00 à 09:15, avant l’excursion Hato Bus incluse à 14:00.' },
  oct03: {
    status: 'skip',
    note: 'L’atelier sushi repéré impose un âge minimum de 4 ans : Adam n’y sera pas admissible à 18 mois. Ne pas réserver cette expérience.',
  },
  oct04: { status: 'skip', note: 'Excursion au mont Fuji sur la journée : ne pas ajouter de réservation avec horaire fixe.' },
  oct05: { status: 'skip', note: 'Changement de ville et installation à Kyoto : garder une marge pour le Shinkansen et les bagages.' },
  oct06: { status: 'skip', note: 'La visite des trois temples est incluse le matin. Garder l’après-midi libre pour récupérer ou improviser avec Adam.' },
  oct07: { status: 'skip', note: 'Le « Kyoto: Gion Food Tour 13 dishes & 4 Local Eateries » est confirmé de 17:00 à 20:15 et figure dans les événements de la journée.' },
  oct08: { status: 'skip', note: 'Excursion à Nara sur la journée : conserver un retour flexible selon le rythme d’Adam.' },
  oct09: { status: 'skip', note: 'Changement de ville et Shinkansen inclus à 12:46 : garder une marge pour les bagages et l’installation à Osaka.' },
  oct10: { status: 'skip', note: 'L’expérience Airbnb « Lieux branchés et trésors cachés d’Osaka » est confirmée à 10:00 et figure dans les événements de la journée.' },
  oct11: { status: 'skip', note: 'Journée complète à Universal Studios Japan : aucune autre expérience à réserver.' },
  oct12: { status: 'skip', note: 'Vol Peach Osaka–Séoul de 10:25 à 12:20 puis installation à l’hôtel : ne pas ajouter d’activité fixe.' },
  oct13: { status: 'skip', note: 'L’excursion Voyage Privé est confirmée de 09:00 à 12:30. L’après-midi reste libre.' },
  oct14: { status: 'skip', note: 'Le Street food tour in Jongno est confirmé de 14:00 à 18:00 et figure dans les événements de la journée.' },
  oct15: { status: 'skip', note: 'Vol retour vers Paris : aucune expérience à réserver.' },
};
