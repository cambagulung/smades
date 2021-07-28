import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesModule as BaseRoleModule } from 'src/auth/roles/roles.module';
import { PermissionsModule } from 'src/auth/permissions/permissions.module';

@Module({
  imports: [BaseRoleModule, PermissionsModule],
  providers: [RolesService],
})
export class RolesModule {}
