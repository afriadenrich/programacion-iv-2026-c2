import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service.js';
import { EjemploInterceptor } from './interceptors/ejemplo/ejemplo.interceptor.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(EjemploInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }
}
