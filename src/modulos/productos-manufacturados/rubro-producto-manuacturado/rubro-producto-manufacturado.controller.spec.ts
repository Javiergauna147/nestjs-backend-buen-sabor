import { Test, TestingModule } from '@nestjs/testing';
import { RubroProductoManufacturadoController } from './rubro-producto-manufacturado.controller';

describe('RubroProductoManuacturadoController', () => {
  let controller: RubroProductoManufacturadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RubroProductoManufacturadoController],
    }).compile();

    controller = module.get<RubroProductoManufacturadoController>(
      RubroProductoManufacturadoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
