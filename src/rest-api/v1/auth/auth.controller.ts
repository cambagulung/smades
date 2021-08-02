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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { random } from 'faker';
import { AuthService } from 'src/auth/auth.service';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActiveSession } from 'src/auth/sessions/decorators/active-session.decorator';
import { SessionDto } from 'src/auth/sessions/dto/session.dto';
import { SessionEntity } from 'src/auth/sessions/entities/session.entity';
import { UserDto } from 'src/auth/users/dto/user.dto';
import { UserEntity } from 'src/auth/users/entities/user.entity';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create new session/login' })
  @ApiBasicAuth()
  @ApiOkResponse({
    description: 'Bearer access_token',
    schema: {
      properties: {
        access_token: {
          type: 'string',
          example: random.alpha({ count: 128 }),
        },
      },
    },
  })
  @UseGuards(BasicAuthGuard)
  @Post()
  login(@Request() { user }: { user: UserDto }) {
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete active session/logout' })
  @ApiOkResponse({
    type: SessionDto,
    description: 'Deleted session',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  logout(@ActiveSession() activeSession: SessionEntity) {
    return this.authService.logout(activeSession);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify access_token' })
  @ApiOkResponse({
    type: UserDto,
    description: 'Current user',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  verify(@Request() { user }: { user: UserEntity }) {
    return new UserDto(user);
  }
}
