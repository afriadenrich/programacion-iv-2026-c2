import { Test, TestingModule } from '@nestjs/testing';
import { MuebleService } from './mueble.service.js';

describe('MuebleService', () => {
  let service: MuebleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuebleService],
    }).compile();

    service = module.get<MuebleService>(MuebleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
