import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule as BaseUsersModule } from 'src/auth/users/users.module';

@Module({
  imports: [BaseUsersModule],
  controllers: [UsersController],
})
export class UsersModule {}
