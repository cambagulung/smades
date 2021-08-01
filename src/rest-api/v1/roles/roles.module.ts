import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesModule as BaseRolesModule } from 'src/auth/roles/roles.module';
import { UsersModule } from 'src/auth/users/users.module';

@Module({
  imports: [BaseRolesModule, UsersModule],
  controllers: [RolesController],
})
export class RolesModule {}
