export interface BabyInfo {
  status: 'yes' | 'no';
  detail: string;
  sourceUrl: string;
  checkedAt: string;
}

// Missing information remains unknown; never infer suitability from cuisine or size alone.
export const restaurantBabyInfo: Record<string, BabyInfo> = {
  "kikyo-sushi-kyoto": {
    "status": "yes",
    "detail": "Sièges pour petits enfants et tables de 6 personnes annoncés par le restaurant. Demander une table, pas le comptoir.",
    "sourceUrl": "https://kikyo-sushi-kyoto.com/free/oseki",
    "checkedAt": "27/09/2026"
  },
  "shunpudou": {
    "status": "yes",
    "detail": "Banquettes pour les familles avec petits enfants signalées par Japan Travel. Chaise haute non confirmée.",
    "sourceUrl": "https://en.japantravel.com/tokyo/shunpudou-a-hidden-halal-restaurant-in-asakusa/72168",
    "checkedAt": "27/09/2026"
  },
  "shoutaian": {
    "status": "yes",
    "detail": "Bébés acceptés, 40 places à table et espaces semi-privés selon la fiche du restaurant. Chaise haute à demander.",
    "sourceUrl": "https://tabelog.com/en/tokyo/A1310/A131002/13196491/",
    "checkedAt": "27/09/2026"
  },
  "gebangsikdang": {
    "status": "yes",
    "detail": "Chaises hautes signalées par EatingSeoul (source secondaire) ; disponibilité à confirmer à la réservation.",
    "sourceUrl": "https://eatingseoul.com/ja/restaurants/gangnam-station/gebangsikdang",
    "checkedAt": "27/09/2026"
  },
  "kani-doraku-honten": {
    "status": "yes",
    "detail": "Enfants acceptés et salons privés avec tables horigotatsu. Demander une place adaptée au tout-petit ; chaise haute non confirmée.",
    "sourceUrl": "https://booking.ebica.jp/webrsv/search/e014006701/3148?language=en",
    "checkedAt": "27/09/2026"
  },
  "tempura-sakura": {
    "status": "no",
    "detail": "Comptoir uniquement, sièges hauts sans chaise bébé. La FAQ vise les enfants scolarisés capables de s’asseoir seuls ; TableCheck mentionne la poussette pour les bébés. Ne répond pas au critère de repas à table avec un tout-petit.",
    "sourceUrl": "https://tempura-asakusa.com/faq/",
    "checkedAt": "27/09/2026"
  }
};
