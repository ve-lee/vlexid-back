import { Test, TestingModule } from '@nestjs/testing';
import { CdsController } from './cds.controller';
import { CdsService } from './cds.service';

describe('CdsController', () => {
  let controller: CdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CdsController],
      providers: [CdsService],
    }).compile();

    controller = module.get<CdsController>(CdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
