import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

const CONTRASEÑA_DEL_SERVER =
  process.env.CONTRASEÑA_DEL_SERVER || 'ASIGNAR CONTRASEÑA';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // header "Authorization": "Bearer TOKEN"
    const req: Request = context.switchToHttp().getRequest();

    const headers = req.headers;

    // const authHeader = headers.authorization;

    const cookies = req.cookies;
    console.log(cookies);

    const token = cookies.token || '';

    // const token = authHeader?.replace('Bearer ', '');
    // const token = authHeader?.split(" ")[1];
    // const token = authHeader?.substring(7);
    // const token = req.header('authorization')?.replace('Bearer ', '');

    if (!token) return false;

    try {
      const payloadValidada = jwt.verify(token, CONTRASEÑA_DEL_SERVER);

      console.log(payloadValidada);

      return true;
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Tóken no válido');
    }
  }
}
