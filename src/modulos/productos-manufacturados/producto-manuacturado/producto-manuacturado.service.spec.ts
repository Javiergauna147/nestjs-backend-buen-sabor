import { Test, TestingModule } from '@nestjs/testing';
import { ProductoManuacturadoService } from './producto-manuacturado.service';

describe('ProductoManuacturadoService', () => {
  let service: ProductoManuacturadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoManuacturadoService],
    }).compile();

    service = module.get<ProductoManuacturadoService>(ProductoManuacturadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
