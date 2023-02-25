import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import {Usuario, UsuarioSchema} from './usuario.schema'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Usuario.name, schema: UsuarioSchema}])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
