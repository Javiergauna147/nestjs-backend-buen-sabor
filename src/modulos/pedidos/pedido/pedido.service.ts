import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pedido } from './schemas/pedido.schema';
import { Model } from 'mongoose';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidoService {
    constructor(
        @InjectModel(Pedido.name)
        private readonly pedidoModel: Model<Pedido>
    ){}

    async create( createPedidoDto: CreatePedidoDto ) {
        try{
            const pedido = this.pedidoModel.create(createPedidoDto);
            return pedido;
        }catch(error){
            this.handleExceptions(error);
        }

    }

    async findAll(userId: string) {
        try{
            return this.pedidoModel.find({cliente: userId}).populate({path: 'estado', select: 'nombre'});
        }catch(error){
            this.handleExceptions(error);
        }
    }

    private handleExceptions( error: any ) {
        if ( error.code === 11000 ) {
          throw new BadRequestException(`Pedido exists in db ${ JSON.stringify( error.keyValue ) }`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create Pedido - Check server logs`);
    }
}
