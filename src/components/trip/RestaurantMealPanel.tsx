import { formatRestaurantBudget } from '@/data/restaurantSorting';
import { MapPin } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent, Card, CardContent, Badge, Button } from '@/components/ui';
import { GoogleRating } from '@/components/restaurants/GoogleRating';
import { mealLabels, mealsForDay } from '@/data/restaurantMeals';
import type { Meal } from '@/data/restaurantMeals';
import { restaurantDisplayName, restaurantGoogleUrl, restaurantHotels } from '@/data/restaurants';

export function RestaurantMealPanel({ city, dayId }: { city: string; dayId: string }) {
  const meals = mealsForDay(city, dayId);
  if (!meals) return <p className="p-4 text-sm text-stone-500">Les suggestions apparaîtront pour Tokyo, Kyoto, Osaka et Séoul.</p>;
  return <Tabs defaultValue="breakfast" className="gap-3">
    <TabsList aria-label="Choisir un repas" className="!grid !h-auto w-full grid-cols-3 rounded-2xl bg-white p-1">
      {(Object.keys(mealLabels) as Meal[]).map(meal => <TabsTrigger key={meal} value={meal} className="min-h-11 min-w-0 rounded-xl px-1 text-xs data-active:bg-[#173d3a] data-active:text-white">{mealLabels[meal]}</TabsTrigger>)}
    </TabsList>
    {(Object.keys(mealLabels) as Meal[]).map(meal => <TabsContent key={meal} value={meal} className="space-y-3">
      <p className="text-xs text-stone-500">{meals[meal].length} idées à {city === 'Seoul' ? 'Séoul' : city} · sélection du jour.</p>
      {meal === 'breakfast' && <p className="text-xs text-stone-500">Rotation des adresses disponibles ; certains petits-déjeuners reviennent faute de choix supplémentaires dans la liste.</p>}
      {meal === 'breakfast' && city === 'Seoul' && <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900">Votre liste contient peu d’adresses de petit-déjeuner tôt. Ces options incluent des brunchs ; vérifiez l’ouverture avant de partir.</p>}
      {meals[meal].map(({ restaurant, description, timing, proximity }) => <Card key={restaurant.id} className="gap-0 rounded-2xl py-0">
        <CardContent className="space-y-2 p-4">
          <h3 className="text-sm font-bold leading-snug">{restaurantDisplayName(restaurant)}</h3>
          {restaurant.googleRating !== undefined && <div className="flex items-center gap-2"><GoogleRating restaurant={restaurant} /><span className="text-xs text-stone-500">Google</span></div>}
          <div className="flex flex-wrap items-center gap-2"><span className="text-xs text-stone-500">{restaurant.area}</span><Badge variant="secondary" className="text-[10px]">{restaurant.id === 'sunshine-umeda' ? 'Non halal · petit-déjeuner à adapter' : restaurant.halalStatus}</Badge></div>
          <p className="text-sm leading-relaxed">{description}</p>
          <p className="text-xs font-medium text-stone-600">{formatRestaurantBudget(restaurant)}</p>
          {(restaurant.pinKind === 'seafood' || restaurant.halalStatus === 'Non halal · seafood') && <p className="text-xs text-stone-500">Préparation, sauces et bouillons sans porc ni alcool à confirmer.</p>}
          {proximity && <p className="text-xs font-semibold text-[#173d3a]">{proximity}</p>}
          {timing && <p className="text-xs text-stone-500">{timing}</p>}
          {restaurant.address && <p className="text-xs text-stone-500">{restaurant.address}</p>}
          <Button asChild variant="outline" className="min-h-11 w-full rounded-xl"><a href={restaurantGoogleUrl(restaurant)} target="_blank" rel="noreferrer"><MapPin className="size-4" />Google Maps</a></Button>
          {proximity && <Button asChild variant="outline" className="min-h-11 w-full rounded-xl"><a href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(restaurantHotels[restaurant.city].name + ", " + restaurant.city)}&destination=${encodeURIComponent(restaurant.name + ", " + restaurant.address)}&travelmode=walking`} target="_blank" rel="noreferrer">À pied depuis l’hôtel</a></Button>}
        </CardContent>
      </Card>)}
    </TabsContent>)}
  </Tabs>;
}
