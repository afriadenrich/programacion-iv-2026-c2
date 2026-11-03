import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('*/10 * * * * *', { name: '10Segundos' })
  trabajoCada10Segundos() {
    this.logger.log('Cada 10 segundos');
  }

  encender(nombre: string) {
    this.schedulerRegistry.getCronJob(nombre).start();
    return { mensaje: 'No se rompió la app' };
  }

  apagar(nombre: string) {
    this.schedulerRegistry.getCronJob(nombre).stop();
    return { mensaje: 'No se rompió la app' };
  }

  @Cron('0 2 1 * *')
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  trabajoPrimeroDelMesALAS2AM() {
    console.log('Lo que pone ahi');
  }

  @Timeout(5000)
  tras5Segundos() {
    this.logger.log('Después de 5 segundos');
  }
}
