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
import { Can } from 'src/auth/users/decorators/can.decorator';
import { HasRoles } from 'src/auth/users/decorators/has-roles.decorator';
import { UserEntity } from 'src/auth/users/entities/user.entity';
import { CanGuard } from 'src/auth/users/guards/can.guard';
import { HasRolesGuard } from 'src/auth/users/guards/has-roles.guard';

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
  logout(@Request() { user }: { user: UserEntity }) {
    return this.authService.logout(user.activeSession);
  }

  @UseGuards(JwtAuthGuard, CanGuard)
  @Can('delete article')
  @Get()
  verify(@Request() { user }: { user: UserEntity }) {
    return user;
  }
}
