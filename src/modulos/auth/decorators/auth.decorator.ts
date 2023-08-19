import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/usuario-role.guard';
import { RoleProtected } from './role.protected.decorator';

export function Auth(...validRoles: string[]) {
  return applyDecorators(
    RoleProtected(...validRoles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
