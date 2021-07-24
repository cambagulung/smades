import { Module } from '@nestjs/common';
import { ConsoleModule } from '@squareboat/nest-console';
import { CliService } from './cli.service';

@Module({
  imports: [ConsoleModule],
  providers: [CliService],
})
export class CliModule {}
