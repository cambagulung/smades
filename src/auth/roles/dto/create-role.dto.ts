import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'src/validator/decorators/is-unique.decorator';
import { RoleEntity } from '../entities/role.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique(RoleEntity)
  readonly name: string;
}
