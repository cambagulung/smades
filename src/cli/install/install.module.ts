import { Module } from '@nestjs/common';
import { InstallService } from './install.service';

@Module({
  providers: [InstallService],
})
export class InstallModule {}
