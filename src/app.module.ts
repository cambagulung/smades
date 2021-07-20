import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestApiModule } from './rest-api/rest-api.module';

@Module({ imports: [TypeOrmModule.forRoot(), RestApiModule] })
export class AppModule {}
