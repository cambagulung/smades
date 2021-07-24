import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionEntity } from './entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
