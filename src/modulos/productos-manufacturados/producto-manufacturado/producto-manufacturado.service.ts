import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductoManufacturado } from './schemas/producto-manufacturado.schema';
import { CreateProductoManufacturadoDto } from './dto/create-producto-manufacturado.dto';

@Injectable()
export class ProductoManufacturadoService {
    constructor(
        @InjectModel(ProductoManufacturado.name)
        private readonly productoManufacturadoModel: Model<ProductoManufacturado>
    ) {}

    async create( createProductoManufacturadoDto: CreateProductoManufacturadoDto ){

        createProductoManufacturadoDto.nombre = createProductoManufacturadoDto.nombre.toUpperCase();

        try{
            const productoManufacturado = this.productoManufacturadoModel.create(createProductoManufacturadoDto);
            return productoManufacturado;
        }catch(error){
            this.handleExceptions(error);
        }

    }

    async findAll(){
        try{
            return this.productoManufacturadoModel.find();
        }catch(error){
            this.handleExceptions(error);
        }
    }

    private handleExceptions( error: any ) {
        if ( error.code === 11000 ) {
          throw new BadRequestException(`ProductoManufacturado exists in db ${ JSON.stringify( error.keyValue ) }`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create ProductoManufacturado - Check server logs`);
    }
}
