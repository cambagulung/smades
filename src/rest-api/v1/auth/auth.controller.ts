import {
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { SessionEntity } from 'src/auth/sessions/entities/session.entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  login(@Request() { user }: { user: UserEntity }) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  logout(@Request() { session }: { session: SessionEntity }) {
    return this.authService.logout(session);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  verify(@Request() { user }: { user: UserEntity }) {
    return user;
  }
}
