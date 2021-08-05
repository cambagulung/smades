import { IsNotEmpty, IsString } from 'class-validator';
import { Slug } from 'src/decorators/slug.decorator';
import { CategoryEntity } from '../entities/category.entity';

export class CreateCategoryDto {
  constructor(data?: Partial<CreateCategoryDto>) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @Slug(CategoryEntity)
  readonly slug: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
