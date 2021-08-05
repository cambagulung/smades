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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { random } from 'faker';
import { AuthService } from 'src/auth/auth.service';
import { BasicAuthGuard } from 'src/http/guards/basic-auth.guard';
import { JwtAuthGuard } from 'src/http/guards/jwt-auth.guard';
import { ActiveSession } from 'src/http/sessions/decorators/active-session.decorator';
import { SessionDto } from 'src/auth/sessions/dto/session.dto';
import { SessionEntity } from 'src/auth/sessions/entities/session.entity';
import { UserDto } from 'src/auth/users/dto/user.dto';
import { UserEntity } from 'src/auth/users/entities/user.entity';

@ApiTags('auth')
@Controller({ version: '1', path: 'auth' })
export class AuthApiController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'login, membuat sesi baru' })
  @ApiBasicAuth()
  @ApiCreatedResponse({
    description: 'respon server jika berhasil login',
    schema: {
      properties: {
        access_token: {
          type: 'string',
          example: random.alphaNumeric(256),
          description: 'token JWT',
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
  @ApiOperation({ summary: 'logout, mencabut sesi saat ini' })
  @ApiOkResponse({
    type: SessionDto,
    description: 'data sesei yang dicabut',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  logout(@ActiveSession() activeSession: SessionEntity) {
    return this.authService.logout(activeSession);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'memeriksa access_token' })
  @ApiOkResponse({
    type: UserDto,
    description: 'data user yang tertaut ke access_token',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  verify(@Request() { user }: { user: UserEntity }) {
    return new UserDto(user);
  }
}
