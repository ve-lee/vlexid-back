import { Test, TestingModule } from '@nestjs/testing';
import { DvdsController } from './dvds.controller';
import { DvdsService } from './dvds.service';

describe('DvdsController', () => {
  let controller: DvdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DvdsController],
      providers: [DvdsService],
    }).compile();

    controller = module.get<DvdsController>(DvdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
