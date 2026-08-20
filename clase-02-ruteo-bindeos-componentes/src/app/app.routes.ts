import { Routes } from '@angular/router';
import { Instalacion } from './pages/documentacion/instalacion/instalacion';
import { Esenciales } from './pages/documentacion/esenciales/esenciales';
import { documentacionRoutes } from './pages/documentacion/documentacion.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida').then((archivo) => archivo.Bienvenida),
  },
  {
    path: 'tutoriales',
    loadComponent: () =>
      import('./pages/tutoriales/tutoriales').then((archivo) => archivo.Tutoriales),
  },
  {
    path: 'docs',
    loadComponent: () =>
      import('./pages/documentacion/documentacion').then((archivo) => archivo.Documentacion),
    // children: documentacionRoutes,
    loadChildren: () =>
      import('./pages/documentacion/documentacion.routes').then((a) => a.documentacionRoutes),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((archivo) => archivo.Dashboard),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error/error').then((archivo) => archivo.Error),
  },
];
