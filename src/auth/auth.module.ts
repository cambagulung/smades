import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../http/auth/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { jwtConstants } from './constants';
import { JwtStrategy } from '../http/auth/strategies/jwt.strategy';
import { SessionsModule } from './sessions/sessions.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { BasicStrategy } from '../http/auth/strategies/basic.strategy';
@Module({
  imports: [
    UsersModule,
    SessionsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PermissionsModule,
    RolesModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
