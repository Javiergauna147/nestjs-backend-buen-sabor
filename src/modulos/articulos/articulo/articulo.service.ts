import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { Articulo, ArticuloDocument } from './schemas/articulo.schema';

@Injectable()
export class ArticuloService {
    constructor(
        @InjectModel(Articulo.name)
        private readonly articuloModel: Model<ArticuloDocument>
    ){}

    async create( createArticuloDto: CreateArticuloDto ) {

        createArticuloDto.denominacion = createArticuloDto.denominacion.toUpperCase();

        try {
            const articulo = await this.articuloModel.create(createArticuloDto);
            return articulo;
        } catch(error) {
            this.handleExceptions(error);
        }

    }
    


    private handleExceptions( error: any ) {
        if ( error.code === 11000 ) {
          throw new BadRequestException(`Articulo exists in db ${ JSON.stringify( error.keyValue ) }`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create Articulo - Check server logs`);
      }

}
