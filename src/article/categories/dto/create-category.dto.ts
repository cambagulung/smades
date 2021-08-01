import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'src/validator/decorators/is-unique.decorator';
import { CategoryEntity } from '../entities/category.entity';

export class CreateCategoryDto {
  constructor(data?: Partial<CreateCategoryDto>) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsUnique(CategoryEntity)
  readonly slud: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
