export interface ActivityRecommendation {
  title: string;
  detail: string;
  sourceUrl?: string;
}

export interface MealRecommendations {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface DayRecommendations {
  activities: ActivityRecommendation[];
  emptyReason?: string;
  meals: MealRecommendations;
}

export const dailyRecommendations: Record<string, DayRecommendations> = {
  sep30: {
    activities: [
    ],
    emptyReason: "Journée de vol : garder du temps pour le trajet et le repos.",
    meals: {
      breakfast: 'Petit-déjeuner complet avant CDG : œufs, pain, fruit et eau pour éviter de dépendre du terminal.',
      lunch: 'À bord, privilégier le plat le plus léger et garder un encas pour décaler progressivement les horaires.',
      dinner: 'Repas léger à bord, puis sommeil dès que la cabine passe en mode nuit.',
    },
  },
  oct01: {
    activities: [
      {"title": "Sengaku-ji · premier aperçu du Japon", "detail": "Option courte dans le quartier de Takanawa : découvrir le temple des 47 rōnin avant de rentrer se reposer. Prévoir 30 à 45 min sur place, seulement si la fatigue le permet.", "sourceUrl": "https://www.gotokyo.org/book/wp-content/uploads/2024/01/2401_minatoku_kankomap_EN_low.pdf"},
    ],
    meals: {
      breakfast: 'Onigiri, soupe miso et thé vert : simple, local et digeste après l’arrivée.',
      lunch: 'Udon ou soba près de Shinjuku pour un repas rapide avant le check-in.',
      dinner: 'Ramen shoyu ou miso dans le secteur d’Otakibashi-dori, connu pour ses nombreuses adresses.',
    },
  },
  oct02: {
    activities: [
    ],
    emptyReason: "Tsukiji dès 7 h puis Hato Bus jusqu’à 18 h : garder la pause entre les deux visites pour Adam.",
    meals: {
      breakfast: 'Dégustations choisies avec Ali au marché de Tsukiji ; nourriture et boissons à payer sur place.',
      lunch: 'Déjeuner léger près de Tokyo Station avant le rendez-vous Hato Bus de 13:40.',
      dinner: 'Yakitori et petites assiettes dans une adresse familiale de Shinjuku ou d’Omoide Yokocho.',
    },
  },
  oct03: {
    activities: [
      {"title": "Yanaka Ginza · boutiques du vieux Tokyo", "detail": "Une autre facette de Tokyo après le parcours d’Ayano : petites boutiques et rues de quartier. Prévoir 45 à 60 min sur place, plus le trajet ; à garder seulement si la visite finit assez tôt. Pour un snack, confirmer les ingrédients sans porc ni alcool.", "sourceUrl": "https://www.gotokyo.org/en/spot/170/index.html"},
    ],
    meals: {
      breakfast: 'Tamagoyaki, riz et soupe miso, ou café-kissaten avec toast épais pour une matinée rapide.',
      lunch: 'Tempura légère à Asakusa, idéalement dans une maison traditionnelle avant la foule de l’après-midi.',
      dinner: 'Sushi sur tapis roulant ou izakaya familial autour d’Ueno/Akihabara.',
    },
  },
  oct04: {
    activities: [
    ],
    emptyReason: "Excursion au mont Fuji et retour à Tokyo : garder la soirée pour le repos et les bagages.",
    meals: {
      breakfast: 'Onigiri, banane et boisson chaude à emporter pour le départ matinal.',
      lunch: 'Hōtō de Yamanashi : nouilles épaisses, légumes et bouillon miso, idéal par temps frais.',
      dinner: 'Dîner libre près du Grand Prince Hotel Takanawa après le retour à Tokyo.',
    },
  },
  oct05: {
    activities: [
      {"title": "Kyoto Gyoen · promenade près du Brighton", "detail": "Après le check-in, prévoir 30 à 45 min dans le grand jardin autour du palais impérial. Une découverte de Kyoto en plein air, avec une pause pour Adam, sans organiser une nouvelle visite de temple.", "sourceUrl": "https://kyoto.travel/en/destinations/kyoto-gyoen-national-garden/"},
    ],
    meals: {
      breakfast: 'Petit-déjeuner japonais à Tokyo avant le départ, avec riz, poisson grillé et soupe miso.',
      lunch: 'Ekiben régional acheté à Tokyo Station avant de monter dans le Shinkansen.',
      dinner: 'Obanzai, les petites préparations familiales de Kyoto, dans le centre-ville.',
    },
  },
  oct06: {
    activities: [
      {"title": "Nishijin · quartier des tisserands", "detail": "Après le circuit en bus et une pause, courte balade dans les rues de Nishijin pour découvrir l’artisanat textile et les maisons traditionnelles. Prévoir 30 à 45 min ; les boutiques et le centre textile dépendent de leurs horaires.", "sourceUrl": "https://kyoto.travel/en/travel-inspiration/traditional-sweets/"},
    ],
    meals: {
      breakfast: 'Riz, soupe miso et légumes marinés : le petit-déjeuner le plus cohérent avant une journée de temples.',
      lunch: 'Yudofu ou cuisine shōjin près d’un temple pour rester dans l’esprit de la journée.',
      dinner: 'Kaiseki saisonnier sur réservation ; demander une chaise haute, accepter le repas apporté pour Adam et prévoir un service raccourci.',
    },
  },
  oct07: {
    activities: [
    ],
    emptyReason: "Arashiyama, Fushimi Inari et food tour à 17 h : préserver les pauses plutôt qu’ajouter une visite.",
    meals: {
      breakfast: 'Petit-déjeuner tôt à l’hôtel pour atteindre Arashiyama avant les grands groupes.',
      lunch: 'Yudofu ou yuba dans le secteur de Tenryu-ji, deux spécialités de tofu de Kyoto.',
      dinner: 'Yakitori, donburi ou izakaya décontracté près de Gion après Fushimi Inari.',
    },
  },
  oct08: {
    activities: [
      {"title": "Naramachi · maisons et artisanat", "detail": "Si le temps le permet après Tōdai-ji, choisir une courte boucle parmi les maisons de marchands et les boutiques artisanales. Prévoir 30 à 45 min, en gardant la marge pour rejoindre Kintetsu-Nara avant le retour prévu.", "sourceUrl": "https://www.visitnara.jp/destinations/area/naramachi/"},
    ],
    meals: {
      breakfast: 'Petit-déjeuner à Kyoto avant le train ; prévoir aussi les encas habituels d’Adam et une gourde adaptée à ses 18 mois.',
      lunch: 'Kakinoha-zushi, sushi pressé enveloppé dans une feuille de plaqueminier, spécialité de Nara.',
      dinner: 'Obanzai ou nishin soba à Kyoto pour un retour simple après la marche.',
    },
  },
  oct09: {
    activities: [
      {"title": "Nakanoshima · Osaka au bord de l’eau", "detail": "Après l’installation, une option de 30 à 45 min sur place entre rivière, jardin et bâtiments historiques. À choisir pour cette première soirée ; le château et Dotonbori figurent déjà au programme du lendemain.", "sourceUrl": "https://www.osaka-info.jp/en/spot/nakanoshima-park/"},
    ],
    meals: {
      breakfast: 'Petit-déjeuner kyotoïte avant le check-out : riz, soupe, tofu ou yuba.',
      lunch: 'Ekiben ou déjeuner rapide autour de Kyoto Station avant le Shinkansen de 12:46.',
      dinner: 'Okonomiyaki ou kushikatsu à Osaka après l’installation.',
    },
  },
  oct10: {
    activities: [
    ],
    emptyReason: "Visite guidée de Namba, château et Dotonbori sont déjà prévus. Garder une soirée raisonnable avant USJ.",
    meals: {
      breakfast: 'Petit-déjeuner tranquille près du New Otani.',
      lunch: 'Takoyaki, udon ou déjeuner près du château.',
      dinner: 'Okonomiyaki à Dotonbori puis retour suffisamment tôt pour préparer USJ.',
    },
  },
  oct11: {
    activities: [
    ],
    emptyReason: "Journée complète à Universal Studios : privilégier les pauses entre les créneaux et le retour à l’hôtel.",
    meals: {
      breakfast: 'Petit-déjeuner tôt à Osaka avant le trajet vers Universal City.',
      lunch: 'Repas à thème ou restauration rapide dans le parc entre les créneaux réservés.',
      dinner: 'CityWalk ou repas simple près du New Otani après le parc.',
    },
  },
  oct12: {
    activities: [
      {"title": "Dongdaemun Design Plaza · architecture contemporaine", "detail": "Après le check-in et une sieste, courte sortie pour découvrir les courbes du DDP et ses espaces extérieurs. Prévoir 30 à 45 min sur place ; les expositions restent facultatives.", "sourceUrl": "https://english.visitseoul.net/dongdaemunarea/Dongdaemun-Design-Plaza-en/ENP024679"},
    ],
    meals: {
      breakfast: 'Petit-déjeuner à emporter à Osaka avant le transfert vers KIX.',
      lunch: 'Repas au Terminal 2 ou après l’arrivée à Gimpo.',
      dinner: 'Premier dîner coréen simple près de The Ambassador Seoul.',
    },
  },
  oct13: {
    activities: [
      {"title": "Cheonggyecheon · balade le long de l’eau", "detail": "Après la visite et le déjeuner, une courte promenade pour changer des palais et des marchés. Prévoir 20 à 30 min, puis retour pour la sieste ; repérer un accès par rampe pour la poussette.", "sourceUrl": "https://english.visitseoul.net/editorspicks/2026-Cheonggyecheon/ENNazl2lr"},
    ],
    meals: {
      breakfast: 'Petit-déjeuner tôt à l’hôtel avant le départ vers City Hall.',
      lunch: 'Dégustations au marché Gwangjang pendant l’excursion.',
      dinner: 'Barbecue coréen ou bibimbap près de l’hôtel.',
    },
  },
  oct14: {
    activities: [
    ],
    emptyReason: "Le food tour couvre déjà Jongno, Ikseon-dong, Changdeokgung et Bukchon. Garder la matinée pour le repos avant les quatre heures de marche.",
    meals: {
      breakfast: 'Petit-déjeuner tranquille près de l’hôtel pendant la matinée libre.',
      lunch: 'Plus de huit spécialités coréennes, snacks et une boisson sont inclus dans la visite ; venir avec de l’appétit.',
      dinner: 'Repas léger après 18:00, selon l’appétit après les dégustations.',
    },
  },
  oct15: {
    activities: [
    ],
    emptyReason: "Départ matinal vers Incheon : aucune visite supplémentaire avant le vol.",
    meals: {
      breakfast: 'Juk ou petit-déjeuner à emporter de l’hôtel avant le transfert matinal.',
      lunch: 'Repas à bord ; garder de l’eau et un encas peu salé pour le long vol.',
      dinner: 'Repas léger à bord, puis collation simple après l’arrivée à Paris si nécessaire.',
    },
  },
};
