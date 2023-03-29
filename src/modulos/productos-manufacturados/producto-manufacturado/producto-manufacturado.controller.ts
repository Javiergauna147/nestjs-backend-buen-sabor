import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { ProductoManufacturadoService } from './producto-manufacturado.service';
import { CreateProductoManufacturadoDto } from './dto/create-producto-manufacturado.dto';

@Controller('producto-manufacturado')
export class ProductoManufacturadoController {
    constructor( private readonly productoManufacturadoService: ProductoManufacturadoService ) {}

    @Post('create')
    @Auth()
    create(@Body() createProductoManufacturadoDto: CreateProductoManufacturadoDto){
        return this.productoManufacturadoService.create(createProductoManufacturadoDto);
    }

    @Get('find-all')
    @Auth()
    findAll() {
        return this.productoManufacturadoService.findAll();
    }
}
