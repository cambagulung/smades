import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { SessionsService } from './sessions/sessions.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private sessionService: SessionsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate({ sub: sessionUuid }: { sub: string }) {
    try {
      const session = await this.sessionService.findOne(sessionUuid);

      if (session) {
        if (session.user) {
          this.sessionService.update(sessionUuid, { lastSeen: new Date() });

          Object.assign(session.user, {
            activeSession: { ...session, user: undefined },
          });

          return session.user;
        }

        this.sessionService.remove(sessionUuid);
      }
    } catch {}

    throw new UnauthorizedException();
  }
}
