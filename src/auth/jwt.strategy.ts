import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { SessionsService } from './sessions/sessions.service';
import { UsersService } from './users/users.service';

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
    });
  }

  async validate({ sub: sessionUuid }: { sub: string }) {
    try {
      const session = await this.sessionService.findOne(sessionUuid, {
        relations: ['user'],
      });

      if (session) {
        if (session.user) {
          const user = await this.usersService.findOne(session.user.uuid, {
            relations: ['roles'],
          });

          this.sessionService.update(sessionUuid, { lastSeen: new Date() });

          Object.assign(user, {
            activeSession: { ...session, user: undefined },
          });

          return user;
        }

        this.sessionService.remove(sessionUuid);
      }
    } catch {}

    throw new UnauthorizedException();
  }
}
