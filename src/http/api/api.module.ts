import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from 'src/article/articles/articles.module';
import { CategoriesModule } from 'src/article/categories/categories.module';
import { PermissionsModule } from 'src/auth/permissions/permissions.module';
import { RolesModule } from 'src/auth/roles/roles.module';
import { UsersModule } from 'src/auth/users/users.module';
import { ArticlesApiController } from './controllers/articles.controller';
import { CategoriesApiController } from './controllers/categories.controller';
import { PermissionsApiController } from './controllers/permissions.controller';
import { RolesApiController } from './controllers/roles.controller';
import { UsersApiController } from './controllers/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ArticlesModule,
    CategoriesModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [
    ArticlesApiController,
    CategoriesApiController,
    PermissionsApiController,
    RolesApiController,
    UsersApiController,
    UsersApiController,
  ],
})
export class ApiModule {}
