import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/auth/constants';
import { SessionsService } from 'src/auth/sessions/sessions.service';
import { UsersService } from 'src/auth/users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private sessionService: SessionsService,
    private readonly usersService: UsersService,
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
      const session = await this.sessionService.seen(sessionUuid);
      const user = await this.sessionService.getUser(sessionUuid);

      if (session) {
        //mencocokan ip client dengan sesi dan memastikan sesi tertaut ke user
        if (session.ip == request.ip && user) {
          // memasang property asctiveSession untuk keperluan logout dll
          Object.assign(request, { activeSession: session });

          return user;
        }

        // menghapus sesi dari db jika diakses dari ip yang berbeda (kemungkinan token dicuri) atau tidak tertaut ke user
        this.sessionService.remove(sessionUuid);
      }
    } catch {}

    throw new UnauthorizedException();
  }
}
