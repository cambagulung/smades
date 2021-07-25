import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesModule as BaseRoleModule } from 'src/auth/roles/roles.module';

@Module({
  imports: [BaseRoleModule],
  providers: [RolesService],
})
export class RolesModule {}
