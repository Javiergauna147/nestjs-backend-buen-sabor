import { Test, TestingModule } from '@nestjs/testing';
import { RubroArticuloController } from './rubro-articulo.controller';

describe('RubroArticuloController', () => {
  let controller: RubroArticuloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RubroArticuloController],
    }).compile();

    controller = module.get<RubroArticuloController>(RubroArticuloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
