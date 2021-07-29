import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule as BaseAuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/auth/users/users.module';

@Module({
  imports: [BaseAuthModule, UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
