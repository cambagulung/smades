import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsModule as BasePermissionsModule } from 'src/auth/permissions/permissions.module';

@Module({
  imports: [BasePermissionsModule],
  providers: [PermissionsService],
})
export class PermissionsModule {}
