import {
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiHeaders,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { BasicAuthGuard } from 'src/auth/basic-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActiveSession } from 'src/auth/sessions/decorators/active-session.decorator';
import { SessionEntity } from 'src/auth/sessions/entities/session.entity';
import { UserEntity } from 'src/auth/users/entities/user.entity';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBasicAuth()
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        access_token: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(BasicAuthGuard)
  @Post()
  login(@Request() { user }: { user: UserEntity }) {
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiHeaders([])
  @ApiResponse({
    status: 200,
    type: SessionEntity,
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  logout(@ActiveSession() activeSession: SessionEntity) {
    return this.authService.logout(activeSession);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  verify(@Request() { user }: { user: UserEntity }) {
    return user;
  }
}
