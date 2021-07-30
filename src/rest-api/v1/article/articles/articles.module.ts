import { Module } from '@nestjs/common';
import { UsersModule } from 'src/auth/users/users.module';
import { ArticlesModule as BaseArticlesModule } from 'src/article/articles/articles.module';
import { ArticlesController } from './articles.controller';

@Module({
  imports: [UsersModule, BaseArticlesModule],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
