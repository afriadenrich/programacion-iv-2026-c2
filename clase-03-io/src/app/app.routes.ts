import { Routes } from '@angular/router';
import { Tutoriales } from './pages/tutoriales/tutoriales';

export const routes: Routes = [
  {
    path: 'tutoriales',
    component: Tutoriales,
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos'),
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios').then((m) => m.Usuarios),
  },
];
