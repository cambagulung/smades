import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { SessionsService } from './sessions/sessions.service';
import { UsersService } from './users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private sessionService: SessionsService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, { sub: sessionUuid }: { sub: string }) {
    try {
      const session = await this.sessionService.findOne(sessionUuid, {
        relations: ['user'],
      });

      if (session) {
        //mencocokan ip client dengan sesi dan memastikan sesi tertaut ke user
        if (session.ip == request.ip && session.user) {
          const user = await this.usersService.findOne(session.user.uuid, {
            relations: ['roles'],
          });

          this.sessionService.update(sessionUuid, { lastSeen: new Date() });

          // memasang object sesi aktif ke object user untuk keperluan logout dll
          Object.assign(user, {
            activeSession: { ...session, user: undefined },
          });

          return user;
        }

        // menghapus sesi dari db jika diakses dari ip yang berbeda (kemungkinan token dicuri) atau tidak tertaut ke user
        this.sessionService.remove(sessionUuid);
      }
    } catch {}

    throw new UnauthorizedException();
  }
}
