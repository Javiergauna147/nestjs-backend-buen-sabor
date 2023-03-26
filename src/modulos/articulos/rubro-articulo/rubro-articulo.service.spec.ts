import { Test, TestingModule } from '@nestjs/testing';
import { RubroArticuloService } from './rubro-articulo.service';

describe('RubroArticuloService', () => {
  let service: RubroArticuloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RubroArticuloService],
    }).compile();

    service = module.get<RubroArticuloService>(RubroArticuloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
