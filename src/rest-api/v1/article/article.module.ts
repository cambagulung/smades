import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ArticleController } from './article.controller';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [CategoryModule, ArticlesModule],
  controllers: [ArticleController],
})
export class ArticleModule {}
