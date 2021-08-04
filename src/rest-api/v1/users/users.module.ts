import { Module } from '@nestjs/common';
import { UsersModule as BaseUsersModule } from 'src/auth/users/users.module';
import { PermissionsController } from './permissions/permissions.controller';
import { RolesController } from './roles/roles.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [BaseUsersModule],
  controllers: [UsersController, PermissionsController, RolesController],
})
export class UsersModule {}
