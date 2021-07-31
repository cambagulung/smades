import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsModule as BasePermissionsModule } from 'src/auth/permissions/permissions.module';

@Module({
  imports: [BasePermissionsModule],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
