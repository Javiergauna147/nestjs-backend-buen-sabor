import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RubroArticulo,
  RubroArticuloDocument,
} from './schemas/rubro-articulo.schema';
import { CreateRubroArticuloDto } from './dto/create-rubro-articulo.dto';

@Injectable()
export class RubroArticuloService {
  constructor(
    @InjectModel(RubroArticulo.name)
    private readonly rubroArticuloModel: Model<RubroArticuloDocument>,
  ) {}

  async create(createRubroArticuloDto: CreateRubroArticuloDto) {
    createRubroArticuloDto.nombre = createRubroArticuloDto.nombre.toUpperCase();

    try {
      const rubroArticulo = await this.rubroArticuloModel.create(
        createRubroArticuloDto,
      );
      return rubroArticulo;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return this.rubroArticuloModel.find();
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `rubroArticulo exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create rubroArticulo - Check server logs`,
    );
  }
}
