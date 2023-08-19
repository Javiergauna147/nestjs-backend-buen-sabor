import { Test, TestingModule } from '@nestjs/testing';
import { ProductoManufacturadoService } from './producto-manufacturado.service';

describe('ProductoManuacturadoService', () => {
  let service: ProductoManufacturadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoManufacturadoService],
    }).compile();

    service = module.get<ProductoManufacturadoService>(
      ProductoManufacturadoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
