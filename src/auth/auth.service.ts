import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';
import { compareSync } from 'bcrypt';
import { SessionsService } from './sessions/sessions.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REQUEST)
    private request: Request,
    private usersService: UsersService,
    private sessionService: SessionsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);

    if (user && compareSync(pass, user.password)) return user;

    throw new UnauthorizedException();
  }

  async login(user: User) {
    const session = await this.sessionService.create({
      user,
      device: this.request.header('user-agent') || '',
      ip: this.request.ip,
    });

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: session.id,
      }),
    };
  }
}
