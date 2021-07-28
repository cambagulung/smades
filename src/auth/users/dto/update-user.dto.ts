import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PermissionEntity } from 'src/auth/permissions/entities/permission.entity';
import { RoleEntity } from 'src/auth/roles/entities/role.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  readonly password?: string;

  @Type(() => PermissionEntity)
  permissions?: PermissionEntity[];

  @Type(() => RoleEntity)
  roles?: RoleEntity[];
}
