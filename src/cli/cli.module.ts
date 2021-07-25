import { Module } from '@nestjs/common';
import { ConsoleModule } from '@squareboat/nest-console';
import { CliService } from './cli.service';
import { InstallModule } from './install/install.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConsoleModule, InstallModule, AuthModule],
  providers: [CliService],
})
export class CliModule {}
