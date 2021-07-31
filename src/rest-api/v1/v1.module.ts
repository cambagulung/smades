import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({ imports: [AuthModule, UsersModule, ArticleModule, RolesModule] })
export class V1Module {}
