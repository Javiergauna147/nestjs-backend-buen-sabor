import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { CreateRubroArticuloDto } from './dto/create-rubro-articulo.dto';
import { RubroArticuloService } from './rubro-articulo.service';

@Controller('rubro-articulo')
export class RubroArticuloController {
  constructor(private readonly rubroArticuloService: RubroArticuloService) {}

  @Post('create')
  @Auth(...['ADMINISTRADOR'])
  create(@Body() createRubroArticuloDto: CreateRubroArticuloDto) {
    return this.rubroArticuloService.create(createRubroArticuloDto);
  }

  @Get('find-all')
  @Auth()
  findAll() {
    return this.rubroArticuloService.findAll();
  }
}
