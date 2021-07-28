import { PartialType } from '@nestjs/mapped-types';
import { PermissionEntity } from 'src/auth/permissions/entities/permission.entity';
import { CreateRoleDto } from './create-role.dto';
import { Type } from 'class-transformer';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @Type(() => PermissionEntity)
  permissions?: PermissionEntity[];
}
