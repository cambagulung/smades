import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModule as BaseUsersModule } from 'src/auth/users/users.module';
import { PermissionsModule } from 'src/auth/permissions/permissions.module';
import { RolesModule } from 'src/auth/roles/roles.module';

@Module({
  imports: [BaseUsersModule, PermissionsModule, RolesModule],
  providers: [UsersService],
})
export class UsersModule {}
