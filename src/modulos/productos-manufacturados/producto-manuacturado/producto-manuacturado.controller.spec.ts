import { Test, TestingModule } from '@nestjs/testing';
import { ProductoManuacturadoController } from './producto-manuacturado.controller';

describe('ProductoManuacturadoController', () => {
  let controller: ProductoManuacturadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoManuacturadoController],
    }).compile();

    controller = module.get<ProductoManuacturadoController>(ProductoManuacturadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
