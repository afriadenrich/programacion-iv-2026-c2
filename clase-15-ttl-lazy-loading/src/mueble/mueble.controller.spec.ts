import { Test, TestingModule } from '@nestjs/testing';
import { MuebleController } from './mueble.controller.js';
import { MuebleService } from './mueble.service.js';

describe('MuebleController', () => {
  let controller: MuebleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MuebleController],
      providers: [MuebleService],
    }).compile();

    controller = module.get<MuebleController>(MuebleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
