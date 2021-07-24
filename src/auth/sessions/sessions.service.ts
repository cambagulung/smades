import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionEntity } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  create(createSessionDto: CreateSessionDto): Promise<SessionEntity> {
    const session = new SessionEntity();

    Object.assign(session, createSessionDto);

    return this.sessionRepository.save(session);
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: string) {
    return this.sessionRepository.findOne(id, { relations: ['user'] });
  }

  update(id: string, updateSessionDto: UpdateSessionDto) {
    return this.sessionRepository.update(id, updateSessionDto);
  }

  remove(session: SessionEntity) {
    return this.sessionRepository.remove(session);
  }
}
