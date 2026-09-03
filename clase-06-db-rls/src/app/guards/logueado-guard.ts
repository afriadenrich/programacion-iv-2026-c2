import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Auth } from '../services/auth.service';

export const logueadoGuard: CanActivateFn = (route, state) => {
  console.log(route, state);
  const router = inject(Router);

  const authS = inject(Auth);

  if (authS.usuarioActual() !== null) {
    return true;
  }

  return router.navigateByUrl('/auth/login');
  // const pathLogin = router.parseUrl('/auth/login');
  // return new RedirectCommand(pathLogin);
};
