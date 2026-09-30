import { Injectable, inject } from '@angular/core';
import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Redirect to login and save the requested route
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate(route, state);
};
