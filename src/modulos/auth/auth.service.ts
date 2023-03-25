import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor( private readonly jwtService: JwtService, @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument> ){}


    async create( createUserDto: CreateUserDto ){

        try {

            const {password, ...userData} = createUserDto;

            const user = await this.usuarioModel.create({
                ...userData,
                password: bcrypt.hashSync(password, 10)
            })
            delete user.password;

            return {
                ...user,
                token: this.getJwtToken({id: user.id})
            }

        } catch(error){
            this.handleDBErrors(error);
        }

    }


    private getJwtToken( payload: JwtPayload ) {

        const token = this.jwtService.sign( payload );
        return token;
    
      }


    private handleDBErrors( error: any ) {
        if ( error.code === '11000' ) 
          throw new BadRequestException( JSON.stringify(error.keyValue));
        console.log(error)
        throw new InternalServerErrorException('Please check server logs');
    
      }


}
