import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ArticleController } from './article.controller';

@Module({
  imports: [CategoryModule],
  controllers: [ArticleController],
})
export class ArticleModule {}
