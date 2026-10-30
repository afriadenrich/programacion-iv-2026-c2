import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class EjemploInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    request.body = { ...request.body, algo: 'asd' };

    console.log('Antes del verbo');

    return next.handle().pipe(
      tap(() => {
        const response: Response = context.switchToHttp().getResponse();

        console.log('Después del verbo');
      }),
    );
  }
}
