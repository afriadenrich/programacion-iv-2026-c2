import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ej1',
    loadComponent: () => import('./pages/ejemplo-01/ejemplo-01').then((m) => m.Ejemplo01),
  },
  {
    path: 'ej2',
    loadComponent: () => import('./pages/ejemplo-02/ejemplo-02').then((m) => m.Ejemplo02),
  },
];
