import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from '../../../auth/users/users.service';
import { UserDto } from '../../../auth/users/dto/user.dto';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, pass: string): Promise<UserDto> {
    try {
      const user = await this.usersService.findByUsername(username);

      if (user && compareSync(pass, user.password || '')) return user;
    } catch {}

    throw new UnauthorizedException();
  }
}
