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

  async validate({ sub: sessionId }: { sub: string }) {
    try {
      const session = await this.sessionService.findOne(sessionId);

      if (session) {
        if (session.user) {
          this.sessionService.update(sessionId, { lastSeen: new Date() });

          return {
            ...session.user,
            activeSession: { ...session, user: undefined },
          };
        }

        this.sessionService.remove(session);
      }
    } catch {}

    throw new UnauthorizedException();
  }
}
