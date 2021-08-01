import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsModule as BasePermissionsModule } from 'src/auth/permissions/permissions.module';
import { UsersModule } from 'src/auth/users/users.module';

@Module({
  imports: [BasePermissionsModule, UsersModule],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
