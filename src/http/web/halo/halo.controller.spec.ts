import { Test, TestingModule } from '@nestjs/testing';
import { HaloController } from './halo.controller';

describe('HaloController', () => {
  let controller: HaloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HaloController],
    }).compile();

    controller = module.get<HaloController>(HaloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
