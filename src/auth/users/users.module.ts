import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ExistsRule } from './exists.rule';
import { UniqueRule } from './unique.rule';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, ExistsRule, UniqueRule],
  exports: [UsersService],
})
export class UsersModule {}
