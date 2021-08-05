import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [TypeOrmModule.forRoot(), V1Module],
})
export class ApiModule {}
