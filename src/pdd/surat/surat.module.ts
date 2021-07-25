import { Module } from '@nestjs/common';
import { SuratService } from './surat.service';

@Module({
  providers: [SuratService],
})
export class SuratModule {}
