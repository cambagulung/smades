import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'src/validator/decorators/is-unique.decorator';
import { PermissionEntity } from '../entities/permission.entity';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique(PermissionEntity)
  readonly name: string;
}
