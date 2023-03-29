import { Test, TestingModule } from '@nestjs/testing';
import { RubroProductoManuacturadoController } from './rubro-producto-manuacturado.controller';

describe('RubroProductoManuacturadoController', () => {
  let controller: RubroProductoManuacturadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RubroProductoManuacturadoController],
    }).compile();

    controller = module.get<RubroProductoManuacturadoController>(RubroProductoManuacturadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
