import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from '@/routes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';

declare global {
  var SFDC_ENV: { basePath?: string } | undefined;
}

const baseElement = document.querySelector('base');
const documentBasePath = baseElement
  ? new URL(baseElement.href).pathname.replace(/\/$/, '')
  : undefined;
const rawBasePath = globalThis.SFDC_ENV?.basePath ?? documentBasePath;
const basename =
  typeof rawBasePath === 'string' ? rawBasePath.replace(/\/+$/, '') : undefined;
const router = createBrowserRouter(routes, { basename });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
