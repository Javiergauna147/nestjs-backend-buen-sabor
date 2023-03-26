import { Test, TestingModule } from '@nestjs/testing';
import { ArticuloController } from './articulo.controller';

describe('ArticuloController', () => {
  let controller: ArticuloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticuloController],
    }).compile();

    controller = module.get<ArticuloController>(ArticuloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
