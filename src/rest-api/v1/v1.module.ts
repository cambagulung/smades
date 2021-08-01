import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ArticleModule,
    RolesModule,
    PermissionsModule,
  ],
})
export class V1Module {}
