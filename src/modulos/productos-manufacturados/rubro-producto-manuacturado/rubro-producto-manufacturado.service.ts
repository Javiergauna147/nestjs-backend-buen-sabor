import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RubroProductoManufacturado, RubroProductoManufacturadoDocument } from './schemas/rubro-producto-manufacturado.schema';
import { CreateRubroProductoManufacturadoDto } from './dto/create-rubro-producto-manufacturado.dto';

@Injectable()
export class RubroProductoManufacturadoService {
    constructor(
        @InjectModel(RubroProductoManufacturado.name)
        private readonly rubroProductoManufacturadoModel: Model<RubroProductoManufacturadoDocument>
    ) {}

    async create( createRubroProductoManufacturadoDto: CreateRubroProductoManufacturadoDto ) {

        createRubroProductoManufacturadoDto.nombre = createRubroProductoManufacturadoDto.nombre.toUpperCase();

        try{
            const rubroProductoManuacturado = await this.rubroProductoManufacturadoModel.create(createRubroProductoManufacturadoDto);
            return rubroProductoManuacturado;
        }catch(error){
            this.handleExceptions(error);
        }
    }

    async findAll(){
        return this.rubroProductoManufacturadoModel.find();
    }

    private handleExceptions( error: any ) {
        if ( error.code === 11000 ) {
          throw new BadRequestException(`rubroProductoManufacturado exists in db ${ JSON.stringify( error.keyValue ) }`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create rubroProductoManufacturado - Check server logs`);
      }

}
