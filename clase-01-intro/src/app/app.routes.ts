import { Routes } from '@angular/router';
import { Tutoriales } from './tutoriales/tutoriales';
import { Bienvenida } from './bienvenida/bienvenida';
import { Error } from './componentes/error/error';

export const routes: Routes = [
  {
    path: 'tutoriales', // ¿A qué ruta voy?
    component: Tutoriales, // ¿Qué muestro?
    title: 'Tutoriales',
  },
  {
    path: 'bienvenida',
    redirectTo: '',
  },
  {
    path: '',
    component: Bienvenida,
  },
  {
    path: '**', // comodín / cualquier ruta que no exista. TIENE que ir último porque busca en órden
    component: Error,
  },
];
