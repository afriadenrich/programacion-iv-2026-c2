import { Routes } from '@angular/router';
import { Registro } from './pages/registro/registro';
import { Test } from './pages/test/test';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Perfil } from './pages/perfil/perfil';
import { logueadoGuard } from './guards/logueado-guard';

export const routes: Routes = [
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro').then((m) => m.Registro),
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test/test').then((m) => m.Test),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    canActivate: [logueadoGuard],
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil').then((m) => m.Perfil),
    canActivate: [logueadoGuard],
  },
];
