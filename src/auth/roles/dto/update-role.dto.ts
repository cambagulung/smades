import { PartialType } from '@nestjs/mapped-types';
import { PermissionEntity } from 'src/auth/permissions/entities/permission.entity';
import { CreateRoleDto } from './create-role.dto';
import { Type } from 'class-transformer';
import { PermissionDto } from 'src/auth/permissions/dto/permission.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @Type(() => PermissionDto)
  permissions?: PermissionEntity[];
}
