import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { ArticuloService } from './articulo.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';

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

  @Put('update')
  @Auth()
  update(@Body() updateArticuloDto: UpdateArticuloDto) {
    return this.articuloService.updateOne(updateArticuloDto);
  }
}
