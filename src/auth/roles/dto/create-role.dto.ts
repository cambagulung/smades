import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { lorem } from 'faker';
import { IsUnique } from 'src/validator/decorators/is-unique.decorator';
import { RoleEntity } from '../entities/role.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique(RoleEntity)
  @ApiProperty({ example: lorem.word() })
  readonly name: string;
}
