import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EstadoPedido } from './schemas/estado-pedido.schema';
import { Model } from 'mongoose';
import { CreateEstadoPedidoDto } from './dto/create-estado-pedido.dto';
import { error } from 'console';

@Injectable()
export class EstadoPedidoService {
  constructor(
    @InjectModel(EstadoPedido.name)
    private readonly estadoPedidoModel: Model<EstadoPedido>,
  ) {}

  async create(createEstadoPedidoDto: CreateEstadoPedidoDto) {
    createEstadoPedidoDto.nombre = createEstadoPedidoDto.nombre.toUpperCase();
    try {
      const estadoPedido = this.estadoPedidoModel.create(createEstadoPedidoDto);
      return estadoPedido;
    } catch {
      error;
    }
    {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      return this.estadoPedidoModel.find();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findById(id: string) {
    try {
      return await this.estadoPedidoModel.findById(id);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findByName(name: string) {
    try {
      return await this.estadoPedidoModel.findOne({
        nombre: name.toUpperCase(),
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `EstadoPedido exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create EstadoPedido - Check server logs`,
    );
  }
}
