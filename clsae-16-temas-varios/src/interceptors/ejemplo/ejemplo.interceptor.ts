import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class EjemploInterceptor implements NestInterceptor {
  logger: Logger;

  constructor() {
    this.logger = new Logger('ejemploInterceptor');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    request.body = { ...request.body, algo: 'asd' };

    this.logger.log('Antes del verbo');

    return next.handle().pipe(
      tap(() => {
        const response: Response = context.switchToHttp().getResponse();

        this.logger.log('Después del verbo');
      }),
    );
  }
}
