import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from 'src/article/categories/categories.service';
import { CreateCategoryDto } from 'src/article/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/article/categories/dto/update-category.dto';
import { JwtAuthGuard } from 'src/http/auth/guards/jwt-auth.guard';
import { User } from 'src/http/users/decorators/user.decorator';
import { UsersService } from 'src/auth/users/users.service';
import { EntityNotFoundError } from 'typeorm';

@Controller({ version: '1', path: 'article/categories' })
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':slug')
  async get(@Param('slug') slug: string) {
    try {
      const category = await this.categoriesService.findBySlug(slug);

      return category;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }

      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @User('uuid') userUuid: string,
    @Body() data: CreateCategoryDto,
  ) {
    const createable = await this.usersService.userCan(
      userUuid,
      'c',
      'create category',
    );

    if (createable) return await this.categoriesService.create(data);

    throw new ForbiddenException(
      'You dont have permissions to create new category',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  async update(
    @User('uuid') userUuid: string,
    @Param('uuid') uuid: string,
    @Body() data: UpdateCategoryDto,
  ) {
    const updateable = await this.usersService.userCan(
      userUuid,
      'update category',
    );

    if (updateable || userUuid == uuid) {
      try {
        return await this.categoriesService.update(uuid, data);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException(e.message);
        }

        throw e;
      }
    }

    throw new ForbiddenException(
      'You dont have permissions to update this category',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async delete(@User('uuid') userUuid: string, @Param('uuid') uuid: string) {
    const deletable = this.usersService.userCan(userUuid, 'delete category');

    if (deletable && userUuid != uuid) {
      try {
        return await this.categoriesService.remove(uuid);
      } catch (e) {
        if (e instanceof EntityNotFoundError) {
          throw new NotFoundException(e.message);
        }

        throw e;
      }
    }

    throw new ForbiddenException(
      'You dont have permissions to delete this category',
    );
  }
}
