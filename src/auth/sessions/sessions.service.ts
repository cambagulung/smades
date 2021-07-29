import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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
    return this.sessionRepository.save(new SessionEntity(createSessionDto));
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(uuid: string, options?: FindOneOptions<SessionEntity>) {
    return this.sessionRepository.findOneOrFail(uuid, options);
  }

  async update(
    uuid: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SessionEntity> {
    const session = await this.sessionRepository.findOneOrFail(uuid);

    Object.assign(session, updateSessionDto);

    return this.sessionRepository.save(session);
  }

  async remove(uuid: string) {
    return this.sessionRepository.remove(await this.findOne(uuid));
  }
}
