import { Routes } from '@angular/router';
import { Esenciales } from './esenciales/esenciales';
import { Instalacion } from './instalacion/instalacion';

export const documentacionRoutes: Routes = [
  {
    path: 'instalacion',
    component: Instalacion,
  },
  {
    path: 'esenciales',
    component: Esenciales,
  },
];
