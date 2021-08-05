import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from 'src/article/articles/articles.module';
import { CategoriesModule } from 'src/article/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/auth/permissions/permissions.module';
import { RolesModule } from 'src/auth/roles/roles.module';
import { UsersModule } from 'src/auth/users/users.module';
import { ArticlesApiController } from './controllers/articles.controller';
import { AuthApiController } from './controllers/auth.controller';
import { CategoriesApiController } from './controllers/categories.controller';
import { PermissionsApiController } from './controllers/permissions.controller';
import { RolesApiController } from './controllers/roles.controller';
import { UsersApiController } from './controllers/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ArticlesModule,
    AuthModule,
    CategoriesModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [
    ArticlesApiController,
    AuthApiController,
    CategoriesApiController,
    PermissionsApiController,
    RolesApiController,
    UsersApiController,
  ],
})
export class ApiModule {}
