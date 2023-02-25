import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './usuario.schema'

@Injectable()
export class UsuarioService {

    constructor(@InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>) {}

}
