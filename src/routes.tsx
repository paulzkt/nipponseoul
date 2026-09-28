import { Navigate, type RouteObject } from 'react-router';
import AppLayout from '@/appLayout';
import Itinerary from '@/pages/Itinerary';
import Planner from '@/pages/Planner';
import Restaurants from '@/pages/Restaurants';
import Bookings from '@/pages/Bookings';
import GeneralInfo from '@/pages/GeneralInfo';
import Baby from '@/pages/Baby';
import NotFound from '@/pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Itinerary /> },
      { path: 'itineraire', element: <Itinerary /> },
      { path: 'restaurants', element: <Restaurants /> },
      { path: 'planning', element: <Planner /> },
      { path: 'reservations', element: <Bookings /> },
      { path: 'general-info', element: <GeneralInfo /> },
      { path: 'budget', element: <Navigate to="/general-info" replace /> },
      { path: 'baby', element: <Baby /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
