import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registro')
  registro(
    @Body() body: { user: string; pass: string },
    @Res() response: Response,
  ) {
    const token = this.authService.registro(body);

    response.cookie('token', token);
    response.send(token);
  }

  @Post('/login')
  login(
    @Body() body: { user: string; pass: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = this.authService.login(body);

    response.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });
    return token;
  }
}
