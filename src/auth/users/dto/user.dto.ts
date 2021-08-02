import { ApiProperty } from '@nestjs/swagger';
import { datatype, internet, name } from 'faker';
import { PermissionDto } from 'src/auth/permissions/dto/permission.dto';
import { RoleDto } from 'src/auth/roles/dto/role.dto';
import { BaseDto } from 'src/base-dto';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends BaseDto<UserEntity> {
  @ApiProperty({ example: datatype.uuid() })
  readonly uuid: string;

  @ApiProperty({ example: name.firstName() + ' ' + name.lastName() })
  readonly name: string;

  @ApiProperty({ example: internet.email() })
  readonly email: string;

  @ApiProperty({ example: internet.userName() })
  readonly username: string;

  @ApiProperty({ isArray: true, type: () => RoleDto })
  readonly roles: RoleDto[];

  @ApiProperty({ isArray: true, type: () => PermissionDto })
  readonly permissions: PermissionDto[];

  readonly password?: string;

  get noPassword(): UserDto {
    return { ...this, password: undefined };
  }
}
