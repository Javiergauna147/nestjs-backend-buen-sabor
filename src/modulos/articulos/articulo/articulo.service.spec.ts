import { Test, TestingModule } from '@nestjs/testing';
import { ArticuloService } from './articulo.service';

describe('ArticuloService', () => {
  let service: ArticuloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticuloService],
    }).compile();

    service = module.get<ArticuloService>(ArticuloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
