import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { ProductoManufacturadoService } from './producto-manufacturado.service';
import { CreateProductoManufacturadoDto } from './dto/create-producto-manufacturado.dto';

@Controller('producto-manufacturado')
export class ProductoManufacturadoController {
  constructor(
    private readonly productoManufacturadoService: ProductoManufacturadoService,
  ) {}

  @Post('create')
  @Auth()
  create(
    @Body() createProductoManufacturadoDto: CreateProductoManufacturadoDto,
  ) {
    return this.productoManufacturadoService.create(
      createProductoManufacturadoDto,
    );
  }

  @Get('find-all')
  @Auth(...['ADMINISTRADOR'])
  findAll() {
    return this.productoManufacturadoService.findAll();
  }

  @Get('find/:id')
  @Auth(...['ADMINISTRADOR'])
  findOne(@Param('id') id: string) {
    return this.productoManufacturadoService.find(id);
  }
}
