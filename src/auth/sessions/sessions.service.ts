import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserDto } from '../users/dto/user.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionDto } from './dto/session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionEntity } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<SessionDto> {
    const session = await this.sessionRepository.save(
      new SessionEntity(createSessionDto),
    );

    return new SessionDto(session);
  }

  findAll() {
    return `This action returns all sessions`;
  }

  async findOne(uuid: string, options?: FindOneOptions<SessionDto>) {
    const session = await this.sessionRepository.findOneOrFail(uuid, options);

    return new SessionDto(session);
  }

  async getUser(uuid: string): Promise<UserDto | null> {
    const session = await this.sessionRepository.findOneOrFail(uuid, {
      relations: ['user'],
    });

    return (session.user && new UserDto(session.user)) || null;
  }

  async seen(uuid: string): Promise<SessionDto> {
    return this.update(uuid, { lastSeen: new Date() });
  }

  async update(
    uuid: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SessionDto> {
    const session = await this.sessionRepository.findOneOrFail(uuid);

    Object.assign(session, updateSessionDto);

    return this.sessionRepository
      .save(session)
      .then((session) => new SessionDto(session));
  }

  async remove(uuid: string) {
    return this.sessionRepository
      .remove(await this.sessionRepository.findOneOrFail(uuid))
      .then((session) => new SessionDto(session));
  }
}
