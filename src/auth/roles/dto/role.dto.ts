import { ApiProperty } from '@nestjs/swagger';
import { datatype, lorem } from 'faker';
import { PermissionDto } from 'src/auth/permissions/dto/permission.dto';
import { BaseDto } from 'src/base-dto';
import { RoleEntity } from '../entities/role.entity';

export class RoleDto extends BaseDto<RoleEntity> {
  constructor(data: RoleEntity) {
    super(data);

    if (data.permissions)
      Object.assign(this, {
        permissions: data.permissions.map(
          (permission) => new PermissionDto(permission),
        ),
      });
  }

  @ApiProperty({ example: datatype.uuid() })
  readonly uuid: string;

  @ApiProperty({ example: lorem.word() })
  readonly name: string;

  @ApiProperty({ isArray: true, type: () => PermissionDto })
  readonly permissions: PermissionDto[];
}
