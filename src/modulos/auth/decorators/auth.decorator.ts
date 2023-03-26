import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


export function Auth() {
  return applyDecorators(
    //TODO: agregar el guard para los roles
    UseGuards( AuthGuard('jwt') ),
  );
}