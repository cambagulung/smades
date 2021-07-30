import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestApiModule } from './rest-api/rest-api.module';
import { CliModule } from './cli/cli.module';

@Module({
  imports: [TypeOrmModule.forRoot(), RestApiModule, CliModule],
})
export class AppModule {}
