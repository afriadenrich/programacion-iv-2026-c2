import { Routes } from '@angular/router';
import { logueadoGuard } from './guards/logueado-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    // canActivateChild: [logueadoGuard],
    // Debería agregar un canActivate para no poder entrar si estoy logueado
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
    canActivate: [logueadoGuard],
  },
];
