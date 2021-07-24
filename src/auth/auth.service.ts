import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './users/entities/user.entity';
import { SessionsService } from './sessions/sessions.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SessionEntity } from './sessions/entities/session.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REQUEST)
    private request: Request,
    private sessionService: SessionsService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserEntity) {
    const session = await this.sessionService.create({
      user,
      device: this.request.header('user-agent') || '',
      ip: this.request.ip,
    });

    return {
      access_token: this.jwtService.sign({
        username: session.user.username,
        sub: session.id,
      }),
    };
  }

  logout(session: SessionEntity) {
    return this.sessionService.remove(session);
  }
}
