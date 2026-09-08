import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Auth } from '../services/auth.service';

export const logueadoGuard: CanActivateFn = (route, state) => {
  const authS = inject(Auth);
  // Estoy exprimiendo mucho el código si solo inyecto router cuando lo necesito? para pensar
  return authS.usuarioActual() ? true : inject(Router).navigateByUrl('/login');
};
