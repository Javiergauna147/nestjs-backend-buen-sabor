import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { ArticuloService } from './articulo.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';

@Controller('articulo')
export class ArticuloController {
  constructor(private readonly articuloService: ArticuloService) {}

  @Post('create')
  @Auth()
  create(@Body() createArticuloDto: CreateArticuloDto) {
    return this.articuloService.create(createArticuloDto);
  }

  @Get('find-all')
  @Auth(...['ADMINISTRADOR'])
  findAll() {
    return this.articuloService.findAll();
  }
  @Get('find/:id')
  @Auth(...['ADMINISTRADOR'])
  findOne(@Param('id') id: string) {
    return this.articuloService.findOne(id);
  }
}
