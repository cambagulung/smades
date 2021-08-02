import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { lorem } from 'faker';
import { IsUnique } from 'src/validator/decorators/is-unique.decorator';
import { PermissionEntity } from '../entities/permission.entity';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique(PermissionEntity)
  @ApiProperty({ example: lorem.word() })
  readonly name: string;
}
