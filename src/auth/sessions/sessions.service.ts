import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = new Session();

    Object.assign(session, createSessionDto);

    return this.sessionRepository.save(session);
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: string) {
    return this.sessionRepository.findOne(id, { relations: ['user'] });
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
