import { Test, TestingModule } from '@nestjs/testing';
import { EstadoPedidoController } from './estado-pedido.controller';

describe('EstadoPedidoController', () => {
  let controller: EstadoPedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoPedidoController],
    }).compile();

    controller = module.get<EstadoPedidoController>(EstadoPedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
