import { Test, TestingModule } from '@nestjs/testing';
import { DibujoController } from './dibujo.controller.js';
import { DibujoService } from './dibujo.service.js';

describe('DibujoController', () => {
  let controller: DibujoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DibujoController],
      providers: [DibujoService],
    }).compile();

    controller = module.get<DibujoController>(DibujoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
