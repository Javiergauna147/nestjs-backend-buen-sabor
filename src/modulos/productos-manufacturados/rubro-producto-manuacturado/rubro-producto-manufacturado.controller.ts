import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { CreateRubroProductoManufacturadoDto } from './dto/create-rubro-producto-manufacturado.dto';
import { RubroProductoManufacturadoService } from './rubro-producto-manufacturado.service';

@Controller('rubro-producto-manufacturado')
export class RubroProductoManufacturadoController {
    constructor( private readonly rubroProductoManufacturadoService: RubroProductoManufacturadoService ) {}

    @Post('create')
    @Auth()
    create( @Body() createRubroProductoManufacturadoDto: CreateRubroProductoManufacturadoDto ){
        return this.rubroProductoManufacturadoService.create(createRubroProductoManufacturadoDto);
    }

    @Get('find-all')
    @Auth()
    findAll() {
        return this.rubroProductoManufacturadoService.findAll();
    }
}
