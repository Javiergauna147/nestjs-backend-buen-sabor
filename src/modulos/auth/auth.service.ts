import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { Rol, RolDocument } from './schemas/rol.schema';
import { CreateRolDto } from './dto/create-rol.dto';
import { CreateUserAdmDto } from './dto/create-user-adm.dto';
import { UpdateUserAdmDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    @InjectModel(Rol.name) private rolModel: Model<RolDocument>,
  ) {}

  async create(createUserDto: CreateUserAdmDto | CreateUserDto | any) {
    try {
      if (createUserDto.rol) {
        const userRole = await this.findRole(createUserDto.rol);
        if (!userRole) {
          throw new BadRequestException('rol-no-existe');
        }
      }
      const { password, ...userData } = createUserDto;

      const user = await this.usuarioModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      if (error.response?.message == 'rol-no-existe') {
        throw new BadRequestException('rol-no-existe');
      } else {
        this.handleDBErrors(error);
      }
    }
  }

  async updateUser(updateUserAdmDto: UpdateUserAdmDto) {
    try {
      if (updateUserAdmDto.rol) {
        const userRole = await this.findRole(updateUserAdmDto.rol);
        if (!userRole) {
          throw new BadRequestException('rol-no-existe');
        }
      }
      const user = await this.usuarioModel.findByIdAndUpdate(
        updateUserAdmDto._id,
        { rol: updateUserAdmDto.rol },
      );
      return { status: 'OK' };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async createRol(createRolDto: CreateRolDto) {
    try {
      const rol = await this.rolModel.create({
        rol: createRolDto.rol,
      });
      return rol;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAllRoles() {
    try {
      return this.rolModel.find();
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async findAllUsers() {
    try {
      return this.usuarioModel.find({}, '_id email rol');
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findOneUserById(id: string) {
    try {
      return this.usuarioModel.findById(id, '_id email rol');
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.usuarioModel.findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    console.log(user);
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private async findRole(rol: string) {
    try {
      return this.rolModel.findOne({ rol: rol });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any) {
    if (error.code === '11000')
      throw new BadRequestException(JSON.stringify(error.keyValue));
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
