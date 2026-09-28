export type LoungeAccess = 'mastercard' | 'verify' | 'not-mastercard';

export interface LoungeRecommendation {
  rank: number;
  name: string;
  terminal: string;
  hours: string;
  location: string;
  access: LoungeAccess;
  accessLabel: string;
  highlights: string;
  familyNote: string;
  sourceUrl: string;
}

export interface LoungeDayPlan {
  airport: string;
  heading: string;
  note: string;
  membershipNote: string;
  lounges: LoungeRecommendation[];
}

export const loungeRecommendations: Partial<Record<string, LoungeDayPlan>> = {
  oct15: {
    airport: 'ICN · Séoul-Incheon',
    heading: '15 octobre · Matina en premier choix',
    note: 'Les trois lounges sont après l’immigration et la sécurité au Terminal 2. Choisissez surtout en fonction de votre porte et de la file d’attente le matin du départ.',
    membershipNote: 'Vérifier dans Mastercard Travel Pass les conditions d’accès pour les deux adultes et Adam avant la visite.',
    lounges: [
      {
        rank: 1,
        name: 'Matina Lounge',
        terminal: 'Terminal 2 · international',
        hours: '06:00–22:00 · restauration jusqu’à 21:30',
        location: 'Après sécurité · niveau 4 · ascenseur puis passerelle · près de la porte 252',
        access: 'mastercard',
        accessLabel: 'Mastercard Travel Pass',
        highlights: 'Premier choix pour prendre un repas avant le vol : buffet varié et 264 places.',
        familyNote: 'Prioritaire si la file est raisonnable ; il peut être très fréquenté aux heures de pointe.',
        sourceUrl: 'https://www.walkerhill.com/transithotel/kr/lounge/Matina.jsp',
      },
      {
        rank: 2,
        name: 'Sky Hub Lounge West',
        terminal: 'Terminal 2 · international',
        hours: '24 h/24 · pause nettoyage 21:30–22:00',
        location: 'Après sécurité · niveau 4 · près de la porte 247',
        access: 'mastercard',
        accessLabel: 'Mastercard Travel Pass',
        highlights: 'Alternative côté ouest si Matina affiche une longue attente.',
        familyNote: 'À privilégier si Matina affiche une longue attente ou si votre porte se trouve côté ouest.',
        sourceUrl: 'https://www.dragonpass.com/explore/lounge/A10015/N01759',
      },
      {
        rank: 3,
        name: 'Sky Hub Lounge East',
        terminal: 'Terminal 2 · international',
        hours: '24 h/24 · pause nettoyage 21:30–22:00',
        location: 'Après sécurité · niveau 4 · zone est · près de la porte 268',
        access: 'mastercard',
        accessLabel: 'Mastercard Travel Pass',
        highlights: 'Alternative pratique côté est avec buffet, boissons, Wi-Fi et accès numérique.',
        familyNote: 'Choix logique si votre porte d’embarquement se trouve dans la partie est du terminal.',
        sourceUrl: 'https://www.dragonpass.com/explore/airport/A10015',
      },
    ],
  },
};
