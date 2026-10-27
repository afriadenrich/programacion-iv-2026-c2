import { Test, TestingModule } from '@nestjs/testing';
import { DibujoService } from './dibujo.service.js';

describe('DibujoService', () => {
  let service: DibujoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DibujoService],
    }).compile();

    service = module.get<DibujoService>(DibujoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
