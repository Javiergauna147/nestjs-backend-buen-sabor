import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pedido } from './schemas/pedido.schema';
import { Model } from 'mongoose';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name)
    private readonly pedidoModel: Model<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    try {
      const pedido = this.pedidoModel.create(createPedidoDto);
      return pedido;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(userId: string) {
    try {
      return this.pedidoModel
        .find({ cliente: userId })
        .sort({ fecha: -1 })
        .populate([{ path: 'estado', select: 'nombre' }]);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async deletebyId(pedidoId: string) {
    return await this.pedidoModel.deleteOne({ _id: pedidoId });
  }

  async findAllAdministrator() {
    try {
      return this.pedidoModel.find().sort({ fecha: -1 }).populate([
        { path: 'cliente', select: 'email' },
        { path: 'estado', select: 'nombre' },
        {
          path: 'productos',
          populate: {
            path: 'producto',
            select: 'nombre',
          },
        },
      ]);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async updateOne(updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidoModel.updateOne(
      { _id: updatePedidoDto._id },
      { ...updatePedidoDto },
    );
    return pedido;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pedido exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pedido - Check server logs`,
    );
  }

  async findById(id: string) {
    return await this.pedidoModel.findById(id);
  }
}
