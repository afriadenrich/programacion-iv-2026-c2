import { Routes } from '@angular/router';
import { logueadoGuard } from './guards/logueado-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    // canActivateChild: [logueadoGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
    canActivate: [logueadoGuard],
  },
];
