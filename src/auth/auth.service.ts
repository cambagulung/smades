import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from './sessions/sessions.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SessionEntity } from './sessions/entities/session.entity';
import { UserDto } from './users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private sessionService: SessionsService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserDto) {
    const session = await this.sessionService.create({
      user,
      device: this.request.header('user-agent') || '',
      ip: this.request.ip,
    });

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: session.uuid,
      }),
    };
  }

  logout(session: SessionEntity) {
    return this.sessionService.remove(session.uuid);
  }
}
