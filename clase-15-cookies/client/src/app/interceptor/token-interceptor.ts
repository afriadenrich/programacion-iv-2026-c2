import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const clon = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token')),
    credentials: 'include',
  });

  return next(clon);
};
