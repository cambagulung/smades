import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = new CategoryEntity(createCategoryDto);

    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(uuid: string) {
    return await this.categoryRepository.findOneOrFail(uuid);
  }

  async findBySlug(slug: string) {
    return await this.categoryRepository.findOneOrFail({ slug });
  }

  async update(uuid: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(uuid);

    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  async remove(uuid: string): Promise<CategoryEntity> {
    return this.categoryRepository.remove(await this.findOne(uuid));
  }
}
