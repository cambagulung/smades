import { Module } from '@nestjs/common';
import { SuratModule } from './surat/surat.module';

@Module({
  imports: [SuratModule],
})
export class PddModule {}
