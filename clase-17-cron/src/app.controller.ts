import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('encender')
  encender() {
    return this.appService.encender('10Segundos');
  }

  @Post('apagar')
  apagar() {
    return this.appService.apagar('10Segundos');
  }
}
