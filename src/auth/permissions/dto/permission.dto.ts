import { ApiProperty } from '@nestjs/swagger';
import { datatype, lorem } from 'faker';
import { PermissionEntity } from 'src/auth/permissions/entities/permission.entity';
import { BaseDto } from 'src/base-dto';

export class PermissionDto extends BaseDto<PermissionEntity> {
  @ApiProperty({ example: datatype.uuid() })
  readonly uuid: string;

  @ApiProperty({ example: lorem.word() })
  readonly name: string;
}
