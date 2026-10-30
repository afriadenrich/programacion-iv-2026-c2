import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
    private mongo: MongooseHealthIndicator,
  ) {}

  @Get('/')
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'),
      () =>
        this.disk.checkStorage('disco-porcentaje', {
          path: '/',
          thresholdPercent: 0.95,
        }),
      () =>
        this.disk.checkStorage('disco-espacio', {
          path: '/',
          threshold: 1700 * 1024 * 1024 * 1024, // que no ocupe más de 1700 GB
        }),
      () => this.memory.checkHeap('memory_heap', 30 * 1024 * 1024),
      () =>
        this.mongo.pingCheck('mongo', { connection: 'mongodb://asdasdasdas' }),
    ]);
  }
}
