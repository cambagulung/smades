import { Module } from '@nestjs/common';
import { HaloController } from './halo/halo.controller';

@Module({
  controllers: [HaloController],
})
export class WebModule {}
