import { Test, TestingModule } from '@nestjs/testing';
import { ProductoManufacturadoController } from './producto-manufacturado.controller';

describe('ProductoManuacturadoController', () => {
  let controller: ProductoManufacturadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoManufacturadoController],
    }).compile();

    controller = module.get<ProductoManufacturadoController>(ProductoManufacturadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
