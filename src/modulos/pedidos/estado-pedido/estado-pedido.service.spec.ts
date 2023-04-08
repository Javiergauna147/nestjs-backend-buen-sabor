import { Test, TestingModule } from '@nestjs/testing';
import { EstadoPedidoService } from './estado-pedido.service';

describe('EstadoPedidoService', () => {
  let service: EstadoPedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoPedidoService],
    }).compile();

    service = module.get<EstadoPedidoService>(EstadoPedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
