import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestApiModule } from './rest-api/rest-api.module';
import { CliModule } from './cli/cli.module';
import { PddModule } from './pdd/pdd.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RestApiModule,
    CliModule,
    PddModule,
    ArticleModule,
  ],
})
export class AppModule {}
