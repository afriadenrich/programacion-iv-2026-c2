import { HttpEvent, HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Loading } from '../services/loading';
import { tap } from 'rxjs';

const API_KEY = 'LdZOmMRAmLPaKZytloawSpntr998fw93FHg6B3xx';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // la REQ que llega por parmámetro NO ES MODIFICABLE
  // req.params.append('api_key', API_KEY);
  const loadinService = inject(Loading);
  loadinService.imagenCargando.set(true);

  // Modificamos la req
  console.log('ANTES', req);

  const reqModificada = req.clone({
    params: req.params.set('api_key', API_KEY),
  });

  console.log('DESPUES', reqModificada);
  // next(req) envia la petición a el próximo interceptor si lo hay, sinó, realiza la petición final

  // return respuesta;
  return next(reqModificada).pipe(
    tap((val: HttpEvent<any>) => {
      if (val.type === HttpEventType.Response) {
        if (val.body.media_type === 'video') {
          val.body.url = 'https://thumbs.dreamstime.com/b/error-43976249.jpg';
        }
        loadinService.imagenCargando.set(false);
      }
    }),
  );
};
