import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesModule as BaseRolesModule } from 'src/auth/roles/roles.module';

@Module({
  imports: [BaseRolesModule],
  controllers: [RolesController],
})
export class RolesModule {}
