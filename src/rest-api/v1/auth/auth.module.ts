import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule as BaseAuthModule } from 'src/auth/auth.module';

@Module({
  imports: [BaseAuthModule],
  controllers: [AuthController],
})
export class AuthModule {}
