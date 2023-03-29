import { Test, TestingModule } from '@nestjs/testing';
import { RubroProductoManuacturadoService } from './rubro-producto-manuacturado.service';

describe('RubroProductoManuacturadoService', () => {
  let service: RubroProductoManuacturadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RubroProductoManuacturadoService],
    }).compile();

    service = module.get<RubroProductoManuacturadoService>(RubroProductoManuacturadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
