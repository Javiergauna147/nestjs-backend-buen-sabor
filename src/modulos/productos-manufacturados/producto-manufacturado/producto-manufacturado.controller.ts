import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get('find')
  @Auth()
  find(id: string) {
    return this.productoManufacturadoService.find(id);
  }

  @Get('AllDisponibles')
  //@Auth() //el usuario tiene que ver los productos (disponibilidad true) sin necesidad de login, login requerido a la hora de comprar.
  async findDisponibles(@Query('rubro') rubro: string = null) {
    return (
      await this.productoManufacturadoService.findAllWhitFilters({ rubro })
    ).map((a) => ({
      _id: a._id,
      name: a.nombre,
      description: a.descripcion,
      precio: a.precio,
      rubro: a.rubro,
    }));
  }
}
