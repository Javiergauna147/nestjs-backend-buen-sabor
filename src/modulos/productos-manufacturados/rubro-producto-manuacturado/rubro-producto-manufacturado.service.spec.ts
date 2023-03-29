import { Test, TestingModule } from '@nestjs/testing';
import { RubroProductoManufacturadoService } from './rubro-producto-manufacturado.service';

describe('RubroProductoManuacturadoService', () => {
  let service: RubroProductoManufacturadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RubroProductoManufacturadoService],
    }).compile();

    service = module.get<RubroProductoManufacturadoService>(RubroProductoManufacturadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
