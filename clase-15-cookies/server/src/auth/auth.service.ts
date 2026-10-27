import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

const CONTRASEÑA_DEL_SERVER =
  process.env.CONTRASEÑA_DEL_SERVER || 'ASIGNAR CONTRASEÑA';

@Injectable()
export class AuthService {
  registro(body: { user: string; pass: string }) {
    //Revisar que el usuario no exista
    // Revisar que la contraseña sea segura
    // Encriptar la contraseña para su guardado
    // Guardar el usuario en la DB
    // Devolver si fue exitoso o no el registro
    // (normalmente) Genera el tóken

    return this.generarToken(body.user);
  }

  login(body: { user: string; pass: string }) {
    return this.generarToken(body.user);
  }

  generarToken(user: string) {
    const encabezado = {
      typ: 'JWT',
      alg: 'HS256',
    };

    const fechaActual = Math.round(Date.now() / 1000);

    const payload = {
      user: user,
      iat: fechaActual,
      exp: fechaActual + 60 * 15,
      //   iss: "MI SERVER"
    };

    const token = jwt.sign(payload, CONTRASEÑA_DEL_SERVER, {
      issuer: 'MI SERVER',
    });

    return token;
  }
}
