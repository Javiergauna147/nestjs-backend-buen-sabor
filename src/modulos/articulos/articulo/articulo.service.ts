import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { Articulo, ArticuloDocument } from './schemas/articulo.schema';
import { UpdateArticuloDto } from './dto/update-articulo.dto';

@Injectable()
export class ArticuloService {
  constructor(
    @InjectModel(Articulo.name)
    private readonly articuloModel: Model<ArticuloDocument>,
  ) {}

  async create(createArticuloDto: CreateArticuloDto) {
    createArticuloDto.denominacion =
      createArticuloDto.denominacion.toUpperCase();

    try {
      const articulo = await this.articuloModel.create(createArticuloDto);
      return articulo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return this.articuloModel
      .find()
      .populate({ path: 'rubro', select: 'nombre' });
  }

  async findOne(id: string) {
    const articulo = await this.articuloModel
      .findOne({ _id: id })
      .populate({ path: 'rubro', select: 'nombre' });
    return articulo;
  }

  async updateOne(updateArticuloDto: UpdateArticuloDto) {
    const articulo = await this.articuloModel.updateOne(
      { _id: updateArticuloDto.id },
      { ...updateArticuloDto },
    );
    return articulo;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Articulo exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Articulo - Check server logs`,
    );
  }
}
