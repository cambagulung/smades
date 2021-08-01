import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesModule as BaseCategoriesModule } from 'src/article/categories/categories.module';
import { UsersModule } from 'src/auth/users/users.module';

@Module({
  imports: [BaseCategoriesModule, UsersModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
