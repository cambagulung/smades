import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersApiController } from './controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [UsersApiController],
})
export class ApiModule {}
