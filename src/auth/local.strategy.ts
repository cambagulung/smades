import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);

    if (user && compareSync(pass, user.password)) return user;

    throw new UnauthorizedException();
  }
}
