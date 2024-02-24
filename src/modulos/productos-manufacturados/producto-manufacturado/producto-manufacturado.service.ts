import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductoManufacturado } from './schemas/producto-manufacturado.schema';
import { CreateProductoManufacturadoDto } from './dto/create-producto-manufacturado.dto';
import { UpdateProductoManufacturadoDto } from './dto/update-producto-manufacturado.dto';

@Injectable()
export class ProductoManufacturadoService {
  constructor(
    @InjectModel(ProductoManufacturado.name)
    private readonly productoManufacturadoModel: Model<ProductoManufacturado>,
  ) {}

  async create(createProductoManufacturadoDto: CreateProductoManufacturadoDto) {
    createProductoManufacturadoDto.nombre =
      createProductoManufacturadoDto.nombre.toUpperCase();

    // createProductoManufacturadoDto.imagen.data = Buffer.from(
    //   createProductoManufacturadoDto.imagen.data,
    // );

    try {
      const productoManufacturado = this.productoManufacturadoModel.create(
        createProductoManufacturadoDto,
      );
      return productoManufacturado;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      return this.productoManufacturadoModel.find().populate([
        {
          path: 'rubro',
          select: 'nombre',
        },
      ]);
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async findAllWhitFilters(filters) {
    const fils = { ...filters, rubro: null };
    delete fils.rubro;
    try {
      return this.productoManufacturadoModel
        .find(fils)
        .populate([
          {
            path: 'rubro',
            match: filters.rubro
              ? { nombre: filters.rubro?.toUpperCase() }
              : {},
            select: 'nombre',
          },
        ])
        .then((a) => a.filter((a) => a.rubro));
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async find(id: string) {
    const producto = await this.productoManufacturadoModel
      .findOne({ _id: id })
      .populate([
        {
          path: 'articulos',
          populate: {
            path: 'articulo',
            select:
              'nombre denominacion descripcion marca stock stockMinimo stockMaximo requiereRefrigeracion',
            populate: {
              path: 'rubro',
              select: 'nombre',
            },
          },
        },
        {
          path: 'rubro',
          select: 'nombre',
        },
      ]);
    return producto;
  }

  async updateOne(
    updateProductoManufacturadoDto: UpdateProductoManufacturadoDto,
  ) {
    const producto = await this.productoManufacturadoModel.updateOne(
      { _id: updateProductoManufacturadoDto._id },
      { ...updateProductoManufacturadoDto },
    );
    return producto;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `ProductoManufacturado exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create ProductoManufacturado - Check server logs`,
    );
  }
}
